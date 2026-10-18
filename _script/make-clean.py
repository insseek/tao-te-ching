#!/usr/bin/env python3
"""从 00.md 生成 98.md（纯净版：去掉原文句尾章号的连续正文）。
只做一件事：删去引用块（原文）行尾的（章号）。
部组名里的括注、（尽）等夹注、（xiàn）等注音一律保留——它们不是纯汉字数字。
题头与文末说明由本脚本写死，不从 00.md 继承——否则 00.md 改版式时 98.md 会跟着漂。
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

# 纯净版题头：标题点明「纯净版」，体例只留与纯净版有关的两句（章号与本版无关，故删）
head = '''# 里探《道德经》新编（纯净版）

原文：李耳｜新编：里探｜修订于 2026/10/17

完全使用原文，不缺不补；按内容逻辑重排。每组下方「道源：」标明该组自哪几组派生。

道源行用，尊道之人，其言行规范，皆自「道」出。

'''
# 说明放末尾（用户定）：这是给读者连续通读的版本，不是工作底本
tail = '''
---

> **本文件是纯净版。** 正文与 [00.md](00.md) **完全相同**，只是删去了原文句尾的（章号），
> 便于连续通读、检验是否顺畅。由 `_script/make-clean.py` 从 [00.md](00.md) 生成。
> **一切以 [00.md](00.md) 为准**——要改请看 00.md，改完重跑本脚本；请勿直接维护此文件，
> 否则两者必然漂移。
'''

# 正文从「## 前言」起：00.md 的标题、版本行、体例段一律丢掉，由上面的 head 取代
marker = '\n## 前言\n'
assert marker in body, '00.md 里找不到「## 前言」——结构变了，请检查'
body = body[body.index(marker) + 1:]

(root / '98.md').write_text(head + body.rstrip() + '\n' + tail, encoding='utf-8')
print(f'98.md 已生成；删除章号 {removed} 处')
