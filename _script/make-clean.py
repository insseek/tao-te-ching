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
head = '''> **工作底本，非成品。** 本文件由 `_script/make-clean.py` 从 [00.md](00.md) 生成，
> 唯一区别是删去了原文句尾的（章号）。**一切以 [00.md](00.md) 为准**——
> 改动请改 00.md，再重跑脚本；不要直接在此文件上长期维护，否则两者必然漂移。
> 用途：让原文连续成篇，便于通读、检验是否顺畅，供下一版改造。

---

'''
# 去掉原文件标题与说明，避免与上面的说明重复
body = re.sub(r'^# 里探《道德经》新编\n\n原文：李耳。新编：里探。\n\n完全使用原文[^\n]*\n\n', '', body)
(root / '98.md').write_text(head + body.lstrip('\n'), encoding='utf-8')
print(f'98.md 已生成；删除章号 {removed} 处')
