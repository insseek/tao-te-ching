#!/usr/bin/env python3
"""从 00.md 生成 98.md（净本·工作底本）。
只做一件事：删去引用块（原文）行尾的（章号）。
部组名里的括注、（尽）等夹注、（xiàn）等注音一律保留——它们不是纯汉字数字。
用法：python3 _script/make-clean.py
"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = (root / '00.md').read_text(encoding='utf-8')
CHAP = re.compile(r'（[一二三四五六七八九十]+）')
out, removed = [], 0
for line in src.split('\n'):
    if line.startswith('> '):
        new, k = CHAP.subn('', line)
        removed += k
        out.append(re.sub(r'[ \t]+$', '', new) if k else line)
    else:
        out.append(line)
body = '\n'.join(out)
# 说明放末尾（用户定）：这是**读本**，不是"工作底本"；只是删了句尾章号，正文与 00.md 全同
tail = '''
---

> **本文件是读本。** 正文与 [00.md](00.md) **完全相同**，只是删去了原文句尾的（章号），
> 便于连续通读、检验是否顺畅。由 `_script/make-clean.py` 从 [00.md](00.md) 生成。
> **一切以 [00.md](00.md) 为准**——要改请看 00.md，改完重跑本脚本；请勿直接维护此文件，
> 否则两者必然漂移。
'''
# 去掉原文件标题与说明，避免与上面的说明重复
body = re.sub(r'^# 里探《道德经》新编\n\n原文：李耳。新编：里探。\n\n完全使用原文[^\n]*\n\n', '', body)
# 读本无章号：把体例句里"句末（）内为原属章号，"删掉，其余（含道源一句）保留
body = body.replace('；句末（）内为原属章号，可回查原文', '。可回查原文').replace(
    '；句末（）内为原属章号，可回查原文'.replace('；',''), '。可回查原文')
(root / '98.md').write_text(body.lstrip('\n').rstrip() + '\n' + tail, encoding='utf-8')
print(f'98.md 已生成；删除章号 {removed} 处')
