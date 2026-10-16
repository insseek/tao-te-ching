#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""由 00.md 重建全部派生文档与网页数据。

**00.md 是唯一权威。** 任何组名、收录章、句数、源→用之变，都改 00.md，
再跑本脚本；不要手改派生文件，否则必然漂移。

从 00.md 导出：
  88.md    分组总表（组名／收录章／句数／合计）
           表一 源→用（取自每组下方「道源正行：」标注，方向取反）
           表二 共章弦（两组收录章交集 ≥2 章）
           表三 章→组（出现在 3 组以上的章）
           承重句总表（各句现落在哪些组）
  天网     DATA 的 nodes(name/chs/n)、radial（源→用）、chord（共章弦）
  en.md    英文导览的组名对照

用法：  python3 _script/sync-from-00.py [--check]
        --check 只报告差异，不写文件
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHECK = '--check' in sys.argv


# ---------------------------------------------------------------- 解析 00.md
def cn2num(s):
    """中文数字转阿拉伯数字：十、十六、二十五、五十二……"""
    N = {c: i for i, c in enumerate('零一二三四五六七八九')}
    if s == '十':
        return 10
    a = u = 0
    for x in s:
        if x == '十':
            a = (u or 1) * 10
            u = 0
        else:
            u = N[x]
    return a + u


def num2cn(n):
    """阿拉伯数字转两位中文数字写法，用于 88.md 的收录章列（01 04 06 …）"""
    return '%02d' % n


def parse_00():
    lines = (ROOT / '00.md').read_text(encoding='utf-8').split('\n')
    depts = []          # [(部名, [组号…]), …]
    names, dept_of, chs, n, ps, src = {}, {}, {}, {}, {}, {}
    order, cur, curdept = [], None, None
    warn = []
    for l in lines:
        m = re.match(r'^## (.+)$', l)
        if m:
            curdept = m.group(1).strip()
            depts.append((curdept, []))
            cur = None
            continue
        # 组标题：分隔符规范是全角空格「　」，但也容忍半角空格（并报警）。
        # 曾因只认全角，把 `### C6 无之以为用（…）` 整组静默丢掉。
        m = re.match(r'^### ([A-D]\d+)([　\s]+)(.+)$', l)
        if m:
            cur = m.group(1)
            if m.group(2) != '\u3000':
                warn.append('组标题分隔符不是全角空格：%s（当前用 %r）'
                            % (cur, m.group(2)))
            names[cur] = m.group(3).strip()
            dept_of[cur] = curdept
            chs[cur], n[cur], ps[cur] = set(), 0, []
            order.append(cur)
            if depts:
                depts[-1][1].append(cur)
            continue
        if l.startswith('### '):
            cur = None
            continue
        if not cur:
            continue
        if l.startswith('> '):
            n[cur] += 1
            for x in re.findall(r'（([一二三四五六七八九十]+)）', l):
                chs[cur].add(cn2num(x))
        elif l.startswith('里探评说：'):
            ps[cur].append(l[len('里探评说：'):].strip())
        else:
            # 标注行的写法：现为「道源：」，旧版为「道源正行：」，两种都认
            m2 = re.match(r'^道源(?:正行)?：(.+)$', l.strip())
            if m2:
                src[cur] = re.findall(r'([A-D]\d+)', m2.group(1))
    depts = [(d, gs) for d, gs in depts if gs]
    return dict(depts=depts, names=names, dept_of=dept_of, chs=chs,
                n=n, ps=ps, src=src, order=order, warn=warn)


def short(name):
    return re.sub(r'（[^）]*）', '', name).strip()


def build_derived(D):
    order, chs = D['order'], D['chs']
    edges = sorted({(t, g) for g, ts in D['src'].items() for t in ts})
    chords = []
    for i in range(len(order)):
        for j in range(i + 1, len(order)):
            sh = sorted(chs[order[i]] & chs[order[j]])
            if len(sh) >= 2:
                chords.append((len(sh), order[i], order[j], sh))
    chords.sort(key=lambda x: (-x[0], x[1], x[2]))
    ch2g = {}
    for g in order:
        for c in chs[g]:
            ch2g.setdefault(c, set()).add(g)
    multi = sorted([(len(v), c, sorted(v)) for c, v in ch2g.items() if len(v) >= 3],
                   key=lambda x: (-x[0], x[1]))
    return dict(edges=edges, chords=chords, multi=multi)


# ---------------------------------------------------------------- 表格工具
def replace_table(text, header_re, body_lines):
    """把 header_re 命中的表头（含分隔行）之后的表体换成 body_lines。"""
    m = re.search(header_re, text)
    if not m:
        raise SystemExit('找不到表头：' + header_re)
    start = m.end()          # 表体起始（表头正则已含其后的换行）
    end = text.find('\n\n', start)
    if end < 0:
        end = len(text)
    return text[:start] + '\n'.join(body_lines) + text[end:]


# ---------------------------------------------------------------- 88.md
def sync_88(D, V):
    p = ROOT / '88.md'
    t = p.read_text(encoding='utf-8')
    order, names, chs, n = D['order'], D['names'], D['chs'], D['n']

    # —— 分组总表
    rows = []
    for dept, gs in D['depts']:
        for k, g in enumerate(gs):
            head = dept if k == 0 else ''
            rows.append('| %s | | %s | %s | %s | %d |' % (
                head, g, names[g], ' '.join(num2cn(x) for x in sorted(chs[g])), n[g]))
    t = replace_table(t, r'\| 部 \| 组 \| 组名 \| 收录章 \| 句数 \|\n\|[-|]+\|\n', rows)

    # 标题行与合计行
    t = re.sub(r'\*\*4 部 \d+ 组，81 章全覆盖。\*\*',
               '**4 部 %d 组，81 章全覆盖。**' % len(order), t)
    per = []
    for dept, gs in D['depts']:
        d = dept.split('、')[0]
        per.append('%s部 %d' % (d, sum(n[g] for g in gs)))
    total = sum(n.values())
    t = re.sub(r'\*\*各组句数合计 \d+ 句\*\*（[^）]*）',
               '**各组句数合计 %d 句**（%s）' % (total, ' ／'.join(per)), t)

    # —— 表一 源→用
    fed = {}
    for a, b in V['edges']:
        fed.setdefault(a, []).append(b)
    rows = []
    for g in order:
        if D['dept_of'][g].startswith(('三', '四')):
            continue
        cs = [b for b in fed.get(g, []) if b.startswith('C')]
        ds = [b for b in fed.get(g, []) if b.startswith('D')]

        def render(ids):
            out = []
            for i in ids:
                q = D['ps'][i][0] if D['ps'][i] else ''
                out.append('%s %s——「%s」' % (i, short(names[i]), q))
            return '；'.join(out) if out else '（无）'
        c_cell, d_cell = render(cs), render(ds)
        rows.append('| **%s** %s | %s | %s |' % (g, short(names[g]), c_cell, d_cell))
    t = replace_table(t,
                      r'### 表一　[^\n]*\n\n[^\n]*\n\n\| 二部·源 \| 三部·修身 \| 四部·治国 \|\n\|[-|]+\|\n',
                      rows)

    # —— 表二 共章弦
    rows = []
    mx = V['chords'][0][0] if V['chords'] else 0
    for c, a, b, s in V['chords']:
        if c == mx:
            rows.append('| **%d** | **%s ↔ %s** | %s |' % (c, a, b, ' '.join(num2cn(x) for x in s)))
        else:
            rows.append('| %d | %s ↔ %s | %s |' % (c, a, b, ' '.join(num2cn(x) for x in s)))
    t = replace_table(t, r'\| 共章 \| 组对 \| 章 \|\n\|[-|]+\|\n', rows)

    # —— 表三 章→组
    rows = []
    mx3 = V['multi'][0][0] if V['multi'] else 0
    for c, ch, gs in V['multi']:
        head = '**%d**' % c if c >= 4 else str(c)
        tag = '（**%d 组**）' % c if c == mx3 else '（%d 组）' % c
        rows.append('| %s | %s%s |' % (head, ' '.join(gs), tag))
    t = replace_table(t,
                      r'\| 章 \| 落点组 \|\n\|[-|]+\|\n', rows)

    # —— 撤掉核心词一节（用户定：每个分组本身就是核心词，冗余）
    t = re.sub(r'### 核心词 → 落点组[^\n]*\n\n(?:\|[^\n]*\n)+\n?', '', t)

    # —— 承重句总表
    #    句单与「说明」是人工策展的，固化在下面的 SENTENCES／SENT_NOTE 里；
    #    各句现落在哪些组由 00.md 实时算出。句单一旦从表里删掉就再也读不回来，
    #    故不能反过来从 88.md 抓（本脚本第一版就吃了这个亏）。
    doc00 = (ROOT / '00.md').read_text(encoding='utf-8')
    segs = {}
    for g in order:
        m = re.search(r'^### ' + g + r'　.*?(?=^### |^## |\Z)', doc00, re.M | re.S)
        segs[g] = m.group(0).replace(' ', '') if m else ''
    rows, cross, left = [], 0, []
    for s in SENTENCES:
        got = [g for g in order if s.replace(' ', '') in segs[g]]
        note = SENT_NOTE.get(s, '')
        if len(got) >= 2:
            cross += 1
        else:
            note = (note + '　**（已不再跨组）**').strip()
            left.append((s, got))
        rows.append('| %s | %s | %s |' % (s, ' '.join(got) if got else '（无）', note))
    t = replace_table(t, r'\| 句 \| 组 \| 说明 \|\n\|[-|]+\|\n', rows)
    t = re.sub(r'\*\*\d+ 句跨组重复\*\*', '**%d 句跨组重复**' % cross, t)
    t = re.sub(r'\n\*\*已不再跨组\*\*[^\n]*\n', '\n', t)
    if left:
        t = t.replace('\n---\n\n## 〇之四',
                      '\n\n**已不再跨组**（现只落一组，仍可能是重要句，待人工处置）：'
                      + '；'.join('%s（%s）' % (s, ' '.join(g) or '无') for s, g in left)
                      + '。\n\n---\n\n## 〇之四', 1)
    # 表三引言原提「核心词」——核心词功能已撤（用户定：每个分组本身就是核心词）
    t = t.replace('「任何一个核心词能把整张网拎起来」——这些章就是网眼最密处。',
                  '这些章同时落在三个以上的组，是全网网眼最密处。')
    # —— 各处旧简称换成现名
    for old, new in OLD_SHORT:
        t = t.replace('**' + old + '**', '**' + new + '**')
    if not CHECK:
        p.write_text(t, encoding='utf-8')
    return t


# ---------------------------------------------------------------- 天网 DATA
def sync_net(D, V):
    p = ROOT / '_script' / 'tiandao-net.js'
    js = p.read_text(encoding='utf-8')
    m = re.search(r'(var DATA = )(\{.*?\})(;\s*\n)', js, re.S)
    data = json.loads(m.group(2))
    # 先去掉 00.md 里已不存在的组；**再补上新增的组**——
    # 只做过滤不补新增，新组就会整组缺席（C6 就这样漏了一版）。
    data['nodes'] = [x for x in data['nodes'] if x['id'] in D['names']]
    have = {x['id'] for x in data['nodes']}
    for g in D['order']:
        if g not in have:
            data['nodes'].append({'id': g, 'name': D['names'][g],
                                  'dept': D['dept_of'][g][0],
                                  'chs': [], 'n': 0})
    for x in data['nodes']:
        g = x['id']
        x['name'] = D['names'][g]
        x['dept'] = D['dept_of'][g][0]
        x['chs'] = sorted(D['chs'][g])
        x['n'] = D['n'][g]
    # 节点顺序按 00.md（部内次序），渲染与图例读起来才顺
    idx = {g: i for i, g in enumerate(D['order'])}
    data['nodes'].sort(key=lambda x: idx[x['id']])
    data['radial'] = [[a, b] for a, b in V['edges']]
    data['chord'] = [{'a': a, 'b': b, 'w': c, 'chs': s} for c, a, b, s in V['chords']]
    data['core'] = {}
    out = js[:m.start(2)] + json.dumps(data, ensure_ascii=False,
                                       separators=(', ', ': ')) + js[m.end(2):]
    if not CHECK:
        p.write_text(out, encoding='utf-8')
    return data


# ---------------------------------------------------------------- en.md
def sync_en(D):
    """整表重建英文导览的组表。

    中文名列取自 00.md；英文释义是人工写的，固化在 EN_GLOSS 里。
    两张表必须**同时重写**——早先只改中文列，结果 B 组编号一变，
    释义就整体错行（B3 道隐无名配上了「似或存」的释义）。
    """
    p = ROOT / 'en.md'
    e = p.read_text(encoding='utf-8')
    order = D['order']
    rows = []
    for g in order:
        rows.append('| **%s** %s | %s | |' % (g, short(D['names'][g]), EN_GLOSS.get(g, '')))
    e = replace_table(e, r'\| \| \| \|\n\|[-|]+\|\n', rows)
    e = re.sub(r'^## The \d+ groups$', '## The %d groups' % len(order), e, flags=re.M)
    if not CHECK:
        p.write_text(e, encoding='utf-8')
    return e


# 旧简称 → 现简称（88.md 散文里可能残留）
EN_GLOSS = {
    'A1': 'The Dao gives birth to all things',
    'B1': 'The Dao follows what is so of itself',
    'B2': 'The usefulness of emptiness — elusive, as if present',
    'B3': 'The Dao hides, unnamed',
    'B4': 'Mysterious virtue: gives life, does not possess',
    'B5': 'Mysterious sameness: inclusive, impartial',
    'B6': 'The soft overcomes the hard — rising from below',
    'B7': 'Fullness invites loss — falling from above',
    'C1': 'Keeping to the Dao, embracing the One',
    'C2': "Knowing the constant, living out one's years",
    'C3': 'Always able to save people — no one discarded',
    'C4': 'Knowing contentment, knowing when to stop',
    'C5': 'The virtue of not contending',
    'C6': 'The usefulness of emptiness',
    'D1': 'Holding the Dao without losing it',
    'D2': 'Ruling by non-action: no busyness, few words',
    'D3': 'Not exalting virtue or worthies',
    'D4': 'Keeping the people simple',
    'D5': 'A small state with few people',
    'D6': 'The virtue of humility — the soft overcoming the hard',
    'D7': 'Not killing wantonly, not ruling by fear',
    'D8': 'Not forcing the world by arms',
}

SENTENCES = [
    '天下有始，以为天下母。',
    '人法地，地法天，天法道，道法自然。',
    '归根曰静，是谓复命，复命曰常。',
    '大盈若冲，其用不穷。',
    '故贵以贱为本，高以下为基。',
    '轻则失本，躁则失君。',
    '牝常以静胜牡，以静为下。',
    '天下之至柔，驰骋天下之至坚，无有入无间。',
    '图难于其易，为大于其细。',
    '天下难事必作于易，天下大事必作于细。',
    '企者不立，跨者不行。',
    '自见者不明，自是者不彰，自伐者无功，自矜者不长。',
    '其在道也，曰余食赘行，物或恶之，故有道者不处。',
    '物壮则老，是谓不道，不道早已。',
    '物壮则老，谓之不道，不道早已。',
]

SENT_NOTE = {
    '天下有始，以为天下母。': '生成论 → 修身守母',
    '人法地，地法天，天法道，道法自然。': '道法自然 → 王侯法道',
    '归根曰静，是谓复命，复命曰常。': '万物归根 → 知常全生',
    '大盈若冲，其用不穷。': '无之为用 → 大若不足',
    '故贵以贱为本，高以下为基。': '由下向上 → 谦下取国',
    '轻则失本，躁则失君。': '静胜躁 → 万乘之主不轻身',
    '牝常以静胜牡，以静为下。': '静胜动 → 大国处下',
    '天下之至柔，驰骋天下之至坚，无有入无间。': '至柔克至坚 → 无为有益',
    '图难于其易，为大于其细。': '由下向上 → 从易细起步',
    '天下难事必作于易，天下大事必作于细。': '同上',
    '企者不立，跨者不行。': '满招损 → 知足知止',
    '自见者不明，自是者不彰，自伐者无功，自矜者不长。': '同上',
    '其在道也，曰余食赘行，物或恶之，故有道者不处。': '同上',
    '物壮则老，是谓不道，不道早已。': '盛极则反 → 不以兵强',
    '物壮则老，谓之不道，不道早已。': '盛极则反 → 不厚生',
}

OLD_SHORT = [
    ('无之以为用', '道冲'),
    ('似或存', '道隐无名'),
    ('柔弱胜刚强', '弱者道之用'),
]


def main():
    D = parse_00()
    V = build_derived(D)
    print('00.md：%d 组｜引文行 %d｜道源正行 %d 组 → 源→用 %d 条｜共章弦 %d 条｜≥3 组的章 %d 个'
          % (len(D['order']), sum(D['n'].values()), len(D['src']),
             len(V['edges']), len(V['chords']), len(V['multi'])))
    for w in D.get('warn', []):
        print('  ⚠️  ' + w)
    sync_88(D, V)
    sync_net(D, V)
    sync_en(D)
    print('%s：88.md、_script/tiandao-net.js、en.md%s'
          % ('仅检查' if CHECK else '已重建', '' if CHECK else '（98.md 请另跑 make-clean.py）'))


if __name__ == '__main__':
    main()
