#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""由 00.md 重建全部派生文档与网页数据。

**00.md 是唯一权威。** 任何组名、收录章、句数、源→用之变，都改 00.md，
再跑本脚本；不要手改派生文件，否则必然漂移。

从 00.md 导出：
  88.md    分组总表（组名／收录章／句数／合计）
           表一 源→用（取自每组下方「道源正行：」标注，方向取反）
           （共章弦、章→组反查、承重句总表已撤：新编把 81 章打散重排，
             共章共句不构成组间关系，见下方 sync_88 里的说明）
  天网     不在此脚本内——页面运行时直接 fetch 00.md 并现场解析（见 tiandao-net.js 的 parse00）
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
    # 共章弦、≥3 组的章反查：已随用户「打散重排、共章不构成关系」的决定撤除，
    # 这里不再计算，88.md 也不再有表二、表三。
    return dict(edges=edges)


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

    # —— 撤掉按"共章/共句"派生的章节
    #     用户定：新编就是把 81 章全部打散重排，共章共句不构成组间关系。
    #     故表二（共章弦）、表三（章→组反查）、承重句总表一并撤除。
    t = re.sub(r'### 表二　[^\n]*\n\n(?:\|[^\n]*\n)+\n?', '', t)
    t = re.sub(r'### 表三　[^\n]*\n\n[^\n]*\n\n(?:\|[^\n]*\n)+\n?', '', t)
    t = re.sub(r'## 〇之三、承重句总表\n.*?(?=## 〇之四)', '', t, flags=re.S)
    t = t.replace('## 〇之二、关系总表', '## 〇之二、源 → 用')
    t = t.replace('## 〇之四、评价标准', '## 〇之三、评价标准')
    t = t.replace('## 〇之五、分组规矩', '## 〇之四、分组规矩')
    t = t.replace('关系、承重句与评价标准', '源→用关系与评价标准')

    # —— 撤掉核心词一节（用户定：每个分组本身就是核心词，冗余）
    t = re.sub(r'### 核心词 → 落点组[^\n]*\n\n(?:\|[^\n]*\n)+\n?', '', t)

    # —— 各处旧简称换成现名
    for old, new in OLD_SHORT:
        t = t.replace('**' + old + '**', '**' + new + '**')
    if not CHECK:
        p.write_text(t, encoding='utf-8')
    return t


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
    print('00.md：%d 组｜引文行 %d｜有道源 %d 组 → 源→用 %d 条'
          % (len(D['order']), sum(D['n'].values()), len(D['src']), len(V['edges'])))
    for w in D.get('warn', []):
        print('  ⚠️  ' + w)
    sync_88(D, V)
    sync_en(D)
    print('%s：88.md、en.md%s（天网已自行从 00.md 解析，无需同步）'
          % ('仅检查' if CHECK else '已重建', '' if CHECK else '；98.md 请另跑 make-clean.py'))


if __name__ == '__main__':
    main()
