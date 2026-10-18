#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""由 序言.md + 00.md 生成可直接分发的 PDF 与 EPUB。

不依赖 pandoc（本机没有）：自己把极简 Markdown 转成 HTML，
PDF 交给本机 Chrome 打印，EPUB 自行打包。

用法：python3 _script/make-book.py
产物：book/里探道德经新编.pdf ／ book/里探道德经新编.epub ／ book/book.html
"""
import html
import os
import re
import shutil
import subprocess
import uuid
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'book')
TITLE = '里探《道德经》新编'
AUTHOR = '李耳（原文）· 里探（新编）'
DATE = '2026-10'
SLUG = '里探道德经新编'

CSS = """
@page { size: A5; margin: 17mm 15mm 18mm; }
* { box-sizing: border-box; }
body { margin:0; padding:0; font-family: "Songti SC","STSong","Source Han Serif SC","Noto Serif SC",serif;
       font-size: 10.8pt; line-height: 1.9; color:#141414; text-align: justify; }
h1 { font-size: 21pt; font-weight: 600; text-align:center; margin:0 0 1.4em; letter-spacing:.08em; }
h2 { font-size: 15pt; font-weight: 600; margin: 2.6em 0 .9em; padding-bottom:.28em;
     border-bottom: 1px solid #bbb; page-break-before: always; letter-spacing:.04em; }
h3 { font-size: 12.6pt; font-weight: 600; margin: 1.8em 0 .5em; letter-spacing:.04em; }
p  { margin: .55em 0; }
blockquote { margin: .5em 0 1.0em; padding: .1em 0 .1em 1.05em;
             border-left: 2px solid #c8c8c8; color:#1e1e1e; }
.src { font-size: .9em; color:#777; margin: .2em 0 .9em; letter-spacing:.02em; }
.ps  { margin: .9em 0 .4em; color:#333; }
hr { border:0; border-top:1px solid #e2e2e2; margin:1.6em 0; }
strong { font-weight: 700; }
a { color:#141414; text-decoration:none; }
.cover { text-align:center; padding-top: 30%; page-break-after: always; }
.cover h1 { font-size: 30pt; border:0; margin-bottom:.4em; }
.cover .sub { font-size: 12pt; color:#555; letter-spacing:.12em; }
.cover .meta { margin-top: 4em; font-size: 10pt; color:#666; line-height:2.1; }
.colophon { page-break-before: always; page-break-after: always; padding-top: 22%;
            font-size: 10pt; color:#333; line-height:2.2; text-align:center; }
.colophon .t { font-size: 15pt; font-weight:600; letter-spacing:.1em; margin-bottom:1.4em; }
.colophon .k { color:#777; }
.colophon .lic { margin-top: 2.2em; font-size: 9.4pt; color:#555; line-height:1.9;
                 text-align:left; border-top:1px solid #ddd; padding-top:1.1em; }
/* @page 只在打印时生效；屏显与 EPUB 阅读器需自行留边 */
@media screen { body { padding: 1.4em 1.7em; } }
"""


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    return s


def md_to_html(text):
    out, para, quote = [], [], []

    def flush_para():
        if para:
            out.append('<p>' + '<br/>'.join(inline(x) for x in para) + '</p>')
            para.clear()

    def flush_quote():
        if quote:
            out.append('<blockquote>' + '<br/>'.join(inline(x) for x in quote) + '</blockquote>')
            quote.clear()

    for raw in text.split('\n'):
        line = raw.rstrip()
        if not line.strip():
            flush_para(); flush_quote(); continue
        if line.startswith('### '):
            flush_para(); flush_quote(); out.append('<h3>%s</h3>' % inline(line[4:].strip())); continue
        if line.startswith('## '):
            flush_para(); flush_quote(); out.append('<h2>%s</h2>' % inline(line[3:].strip())); continue
        if line.startswith('# '):
            flush_para(); flush_quote(); out.append('<h1>%s</h1>' % inline(line[2:].strip())); continue
        if line.strip() == '---':
            flush_para(); flush_quote(); out.append('<hr/>'); continue
        if line.startswith('> '):
            flush_para(); quote.append(line[2:].strip()); continue
        if line.startswith('里探评说：'):
            flush_para(); flush_quote()
            out.append('<p class="ps">%s</p>' % inline(line)); continue
        if line.startswith('道源：'):
            flush_para(); flush_quote()
            out.append('<p class="src">%s</p>' % inline(line)); continue
        if line.startswith('署名：'):
            flush_para(); flush_quote()
            out.append('<p class="src">%s</p>' % inline(line)); continue
        if line.startswith('关键词：'):
            flush_para(); flush_quote()
            out.append('<p class="src">%s</p>' % inline(line)); continue
        flush_quote(); para.append(line)
    flush_para(); flush_quote()
    return '\n'.join(out)


def build_html():
    parts = []
    for name in ('序言.md', '00.md'):
        p = os.path.join(ROOT, name)
        if os.path.exists(p):
            parts.append(open(p, encoding='utf-8').read())
    body = '\n\n'.join(md_to_html(x) for x in parts)
    cover = (
        '<div class="cover"><h1>%s</h1>'
        '<div class="sub">完全使用原文　按内容逻辑重排　句末标原属章号</div>'
        '<div class="meta">原文　李耳<br/>新编　里探<br/>%s</div></div>' % (TITLE, DATE)
    )
    front = (
        '<div class="colophon"><div class="t">%s</div>'
        '<div><span class="k">原文</span>　李耳</div>'
        '<div><span class="k">新编</span>　里探</div>'
        '<div><span class="k">序</span>　DeepSeek-V4.1-Flash</div>'
        '<div><span class="k">版本</span>　第二版 · %s</div>'
        '<div><span class="k">网址</span>　https://insseek-tao.netlify.app/</div>'
        '<div class="lic" style="border:0;padding-top:.8em;margin-top:1.2em">'
        '网站收录全书：八十一章逐章五段——原文 · 解字 · 译文 · 里探评说 · 关联章句，'
        '并附「天道星图」。<br/><b>本书只收新编正文</b>：把八十一章的句子打散，按论证重排；'
        '每句括注原属章号，可回网站按章对照。</div>'
        '<div class="lic">本书可自由复制、传播、打印。<br/>'
        '转载与再分发请保留书名、作者署名与出处网址，不得删改来源，不得用于商业用途。<br/>'
        '正文完全使用《道德经》原文，不缺不补；仅调整句序与分组，句末括注为原属章号。<br/>'
        '所含原文属公有领域；新编结构、评说与天道星图 © 里探。</div></div>' % (TITLE, DATE)
    )
    back = (
        '<div class="colophon"><div class="t">%s</div>'
        '<div>原文　李耳　｜　新编　里探　｜　序　DeepSeek-V4.1-Flash</div>'
        '<div>第二版 · %s</div>'
        '<div>https://insseek-tao.netlify.app/</div>'
        '<div class="lic">自由复制传播；转载保留署名与出处，不得删改来源，不得商用。</div></div>' % (TITLE, DATE)
    )
    os.makedirs(OUT, exist_ok=True)

    doc = (
        '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"/>'
        '<title>%s</title><style>%s</style></head><body>%s%s</body></html>'
        % (TITLE, CSS, cover, front + body + back)
    )
    hp = os.path.join(OUT, 'book.html')
    open(hp, 'w', encoding='utf-8').write(doc)
    return hp


def build_pdf(hp):
    chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    pdf = os.path.join(OUT, SLUG + '.pdf')
    if not os.path.exists(chrome):
        print('  ⚠️ 未找到 Chrome，跳过 PDF'); return None
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
        '--print-to-pdf=' + pdf, 'file://' + hp
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return pdf


def build_epub(hp):
    epub = os.path.join(OUT, SLUG + '.epub')
    body = open(hp, encoding='utf-8').read()
    xhtml = body.replace('<!DOCTYPE html>', '').replace('<html lang="zh-CN">', '<?xml version="1.0" encoding="utf-8"?>\n<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">')
    xhtml = re.sub(r'<meta charset="utf-8"/>', '', xhtml)
    xhtml = xhtml.replace('<style>', '<link rel="stylesheet" type="text/css" href="style.css"/><style>', 1)
    uid = 'urn:uuid:' + str(uuid.uuid5(uuid.NAMESPACE_URL, 'insseek-tao-te-ching'))
    opf = """<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" xmlns:opf="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="bookid">
 <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>%s</dc:title>
  <dc:creator opf:role="aut">李耳</dc:creator>
  <dc:creator opf:role="edt">里探</dc:creator>
  <dc:contributor opf:role="ctb">DeepSeek-V4.1-Flash（序）</dc:contributor>
  <dc:language>zh-CN</dc:language>
  <dc:date>%s</dc:date><dc:identifier id="bookid">%s</dc:identifier>
  <dc:publisher>里探</dc:publisher>
  <dc:source>https://insseek-tao.netlify.app/</dc:source>
  <dc:rights>自由复制传播；转载保留署名与出处，不得删改来源，不得商用。</dc:rights>
 </metadata>
 <manifest>
  <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  <item id="css" href="style.css" media-type="text/css"/>
  <item id="book" href="book.xhtml" media-type="application/xhtml+xml"/>
 </manifest>
 <spine toc="ncx"><itemref idref="book"/></spine>
</package>""" % (TITLE, DATE, uid)
    ncx = """<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
 <head><meta name="dtb:uid" content="%s"/></head>
 <docTitle><text>%s</text></docTitle>
 <navMap><navPoint id="p1" playOrder="1"><navLabel><text>%s</text></navLabel>
  <content src="book.xhtml"/></navPoint></navMap>
</ncx>""" % (uid, TITLE, TITLE)
    container = """<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
 <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>"""
    with zipfile.ZipFile(epub, 'w') as z:
        z.writestr('mimetype', 'application/epub+zip', compress_type=zipfile.ZIP_STORED)
        z.writestr('META-INF/container.xml', container, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/content.opf', opf, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/toc.ncx', ncx, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/style.css', CSS, compress_type=zipfile.ZIP_DEFLATED)
        z.writestr('OEBPS/book.xhtml', xhtml, compress_type=zipfile.ZIP_DEFLATED)
    return epub


if __name__ == '__main__':
    print('· 生成 HTML …')
    hp = build_html()
    print('· 生成 PDF …')
    pdf = build_pdf(hp)
    print('· 生成 EPUB …')
    epub = build_epub(hp)
    for f in (hp, pdf, epub):
        if f and os.path.exists(f):
            print('  %-46s %8.1f KB' % (os.path.relpath(f, ROOT), os.path.getsize(f) / 1024))
