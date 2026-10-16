/* ============================================================
   天道星图（对外名）· 页面题名「天网恢恢，疏而不失」
   里探《道德经》新编 · 关系图
   「天网恢恢，疏而不失」——道生一，一生二，二生三，三生万物
   点节点即读原文、评说与牵连；顺着连线可走遍全网。
   ============================================================ */
(function () {
  /* ============================================================
     数据只有 00.md 一个来源：部、组、收录章、句数、道源，全部现场解析。
     这里不写死任何一份副本——副本就是漂移的源头。
     约定（由 00.md 的标记本身定义，缺一不可）：
       ## 一、道生万物（宇宙起源）      部标题：序号、部名
       ### B3　道隐无名（不彰显）        组标题：组号、组名（分隔符全角空格，也容忍半角）
       道源：A1　道生万物；B1　道法自然   该组的道源（旧写法「道源正行：」也认）
       > 原文……（四十二）              引文行：句数按行计，章号取句末括注
       里探评说：……                    该组评说（88.md 与抽屉用）
     ============================================================ */
  function parse00(text) {
    var lines = String(text).split('\n');
    var depts = [], nodes = [], order = [], curDept = null, cur = null;
    lines.forEach(function (l) {
      var m;
      if ((m = /^##\s+(.+)$/.exec(l))) {
        var raw = m[1].trim();
        var k = /^([一二三四五六七八九十]+)、/.exec(raw);
        curDept = { key: k ? k[1] : '', name: raw.replace(/^[一二三四五六七八九十]+、/, '').trim() };
        depts.push(curDept);
        cur = null;
        return;
      }
      if ((m = /^###\s+([A-D]\d+)[\s\u3000]+(.+)$/.exec(l))) {
        cur = {
          id: m[1], name: m[2].trim(), dept: curDept ? curDept.key : '',
          chs: [], n: 0, from: [], ps: []
        };
        nodes.push(cur); order.push(cur.id);
        return;
      }
      if (/^###\s/.test(l)) { cur = null; return; }
      if (!cur) return;
      if (l.indexOf('> ') === 0) {
        cur.n += 1;
        var re = /（([一二三四五六七八九十]+)）/g, mm;
        while ((mm = re.exec(l))) {
          var v = cn2num(mm[1]);
          if (cur.chs.indexOf(v) < 0) cur.chs.push(v);
        }
        return;
      }
      if ((m = /^道源(?:正行)?：(.+)$/.exec(l.trim()))) {
        cur.from = m[1].match(/[A-D]\d+/g) || [];
        return;
      }
      if (l.indexOf('里探评说：') === 0) cur.ps.push(l.slice(5).trim());
    });

    /* ---- 以下全部由上面解析出的东西导出，不再另设来源 ---- */
    /* 只保留真正含组的部：00.md 里的「## 前言」这类小节不算部 */
    var usedDept = {};
    nodes.forEach(function (n) { usedDept[n.dept] = 1; });
    depts = depts.filter(function (d) { return usedDept[d.key]; });

    var byKey = {};
    nodes.forEach(function (n) {
      n.chs.sort(function (a, b) { return a - b; });
      byKey[n.id] = n;
    });

    /* 源→用：道源写的方向是"我出自谁"，画到图上取反（源头指向应用） */
    var radial = [];
    nodes.forEach(function (n) {
      n.from.forEach(function (f) { if (byKey[f]) radial.push([f, n.id]); });
    });
    radial.sort();

    /* 下游（谁以我为源）与代数（离根几步） */
    var to = {}, gen = {};
    nodes.forEach(function (n) {
      to[n.id] = radial.filter(function (e) { return e[0] === n.id; }).map(function (e) { return e[1]; });
    });
    var root = nodes.filter(function (n) { return !n.from.length; }).map(function (n) { return n.id; });
    (function () {
      order.forEach(function (id) { gen[id] = 99; });
      root.forEach(function (id) { gen[id] = 0; });
      for (var k = 0; k < nodes.length; k++) {
        radial.forEach(function (e) { if (gen[e[1]] > gen[e[0]] + 1) gen[e[1]] = gen[e[0]] + 1; });
      }
    })();

    /* 共章弦：两组收录章交集 ≥2 章 */
    var chord = [];
    for (var i = 0; i < order.length; i++) {
      for (var j = i + 1; j < order.length; j++) {
        var A = byKey[order[i]], B = byKey[order[j]];
        var sh = A.chs.filter(function (c) { return B.chs.indexOf(c) >= 0; });
        if (sh.length >= 2) chord.push({ a: A.id, b: B.id, w: sh.length, chs: sh });
      }
    }
    chord.sort(function (x, y) { return y.w - x.w || (x.a < y.a ? -1 : 1); });

    return {
      depts: depts, nodes: nodes, order: order, byKey: byKey,
      radial: radial, to: to, gen: gen, root: root, chord: chord
    };
  }
  window.__tdnParse00 = parse00;   /* 供验证脚本直接调用 */

  /* DATA 由 parse00(00.md) 填入；未取到之前为 null */
  var DATA = null;

  var COLOR = { '一': '#f6c453', '二': '#38bdf8', '三': '#34d399', '四': '#a78bfa' };
  /* 三环：A1「道生万物」即中央的「道」，不另设环 */
  var RING  = { '二': 318, '三': 458, '四': 598 };
  var NUM   = { '一': '一', '二': '二', '三': '三', '四': '四' };
  var SEQ   = { '一': '道生一', '二': '一生二', '三': '二生三', '四': '三生万物' };
  var SHORT = {};   /* 部简称：由 00.md 的部标题导出，见 adoptData */
  var OFF   = { '一': 0, '二': Math.PI / 8, '三': 0, '四': Math.PI / 8 };
  var AX = 1.72, AY = 1.0;   /* 横向拉宽，铺满宽屏 */
  var NS = 'http://www.w3.org/2000/svg';
  var CN = { 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  var byId = {};
  /* 上面这些是"呈现"常量（颜色、半径、角度偏移）。数据一律来自 00.md，
     由 boot() 取回并 parse00() 解析后填入下面这个对象。 */
  function adoptData(D) {
    DATA = D;
    byId = {};
    DATA.nodes.forEach(function (n) { byId[n.id] = n; });
    /* 部简称也从 00.md 的部标题导出（去掉（…））——不再另写一份 */
    DATA.depts.forEach(function (d) { SHORT[d.key] = d.name.replace(/（[^）]*）/g, '').trim(); });
  }

  function cn2num(s) {
    if (s === '十') return 10;
    var a = 0, u = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === '十') { a = (u || 1) * 10; u = 0; } else { u = CN[c] || 0; }
    }
    return a + u;
  }
  function pad(n) { return ('0' + n).slice(-2); }
  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    return e;
  }
  function tx(x, y, s, attrs) {
    var t = el('text', Object.assign({ x: x, y: y, 'font-family': '-apple-system,"PingFang SC","Microsoft YaHei",sans-serif' }, attrs || {}));
    t.textContent = s; return t;
  }
  /* docsify 的标题锚点规则：整串转小写、去掉全角空格「　」、半角空格转连字符。
     例：### D2　无为而治：无事、希言  →  id="d2-无为而治：无事、希言"
     这就是抽屉里「在新编中阅读」跳过去时用来定位的锚点。 */
  function anchorOf(id, name) {
    return (id + '-' + name).toLowerCase().replace(/\u3000/g, '').replace(/ /g, '-');
  }

  /* 节点/提示显示组名时去掉（…）括注，短而清楚 */
  function dispName(s) { return String(s).replace(/（[^）]*）/g, '').trim(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function md(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  function verseHTML(line) {
    return esc(line).replace(/（([一二三四五六七八九十]+)）/g, function (m, cn) {
      return '<a class="tdn-ch" href="index.html#/' + pad(cn2num(cn)) + '" title="第' + cn + '章 · 原文注释评说">' + m + '</a>';
    });
  }

  /* ---- 拉取 00.md：解析每组的原文（含小节）与里探评说 ---- */
  var DOCP = null;
  function loadDoc() {
    if (DOCP) return DOCP;
    DOCP = fetch('00.md', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (t) {
        var cur = null, inPS = false, out = {};
        t.split('\n').forEach(function (l) {
          var m = /^###\s+([A-D]\d+)[　\s]/.exec(l);
          if (m) { cur = m[1]; out[cur] = []; inPS = false; return; }
          if (/^##\s/.test(l) || /^#\s/.test(l)) { cur = null; inPS = false; return; }
          if (!cur) return;
          var s = l.trim();
          if (!s) return;
          if (/^---/.test(s)) { inPS = false; return; }
          var pm = /^里探评说[：:]\s*([\s\S]*)$/.exec(s);
          if (pm) { out[cur].push({ ps: pm[1] }); inPS = true; return; }
          if (inPS) {
            if (/^\d+、/.test(s) || /（[一二三四五六七八九十]+）$/.test(s)) inPS = false;
            else {                                  /* 评说续段：并到上一条 */
              var last = out[cur][out[cur].length - 1];
              if (last && last.ps !== undefined) last.ps += '\n' + s;
              else out[cur].push({ ps: s });
              return;
            }
          }
          if (/^关键词/.test(s) || /^#{1,6}\s/.test(s)) return;
          if (/^\d+、/.test(s)) out[cur].push({ sub: s });
          else out[cur].push({ v: s });
        });
        return out;
      })
      .catch(function () { return {}; });
    return DOCP;
  }

  function build(host) {
    var API = null;   /* 结尾赋值为返回对象，中央点击时用它取回调 */
    var order = ['二', '三', '四'], groups = {};
    order.forEach(function (d) { groups[d] = DATA.nodes.filter(function (n) { return n.dept === d; }); });

    var pos = {};
    order.forEach(function (d) {
      var list = groups[d], R = RING[d], off = OFF[d];
      list.forEach(function (n, i) {
        var a = -Math.PI / 2 + off + (i * 2 * Math.PI) / list.length;
        pos[n.id] = { x: Math.cos(a) * R * AX, y: Math.sin(a) * R * AY, a: a, r: 11 + Math.sqrt(n.n) * 3.4 };
      });
    });

    /* A1「道生万物」＝中央的「道」。给它原点坐标，不渲染成节点；
       这样 DATA.radial 里 A1 出发的两条、DATA.chord 里涉及 A1 的三条，
       都会自动从中央射出／牵出，无需另写分支。 */
    pos['A1'] = { x: 0, y: 0, a: 0, r: 56 };

    var W = 2760, H = 1300;
    var svg = el('svg', {
      viewBox: (-W / 2) + ' ' + (-H / 2) + ' ' + W + ' ' + H,
      class: 'tdn-svg', preserveAspectRatio: 'xMidYMid meet'
    });
    /* 星图配色：光晕与核心一律用径向渐变（比 feGaussianBlur 便宜得多，
       移动端才跑得动；滤镜只留给中央「道」） */
    var DEFS = [
      '<radialGradient id="tdn-bg" cx="50%" cy="48%" r="64%">',
      '<stop offset="0%" stop-color="#132049"/><stop offset="34%" stop-color="#0a1128"/>',
      '<stop offset="72%" stop-color="#05080f"/><stop offset="100%" stop-color="#02030a"/>',
      '</radialGradient>',
      '<radialGradient id="tdn-halo">',
      '<stop offset="0%" stop-color="#dbe7ff" stop-opacity=".60"/>',
      '<stop offset="34%" stop-color="#8fb4ff" stop-opacity=".18"/>',
      '<stop offset="100%" stop-color="#8fb4ff" stop-opacity="0"/></radialGradient>'
    ];
    ['一', '二', '三', '四'].forEach(function (d) {
      var c = COLOR[d];
      DEFS.push('<radialGradient id="tdn-halo-' + d + '">' +
        '<stop offset="0%" stop-color="' + c + '" stop-opacity=".78"/>' +
        '<stop offset="38%" stop-color="' + c + '" stop-opacity=".20"/>' +
        '<stop offset="100%" stop-color="' + c + '" stop-opacity="0"/></radialGradient>');
      DEFS.push('<radialGradient id="tdn-core-' + d + '">' +
        '<stop offset="0%" stop-color="#ffffff"/>' +
        '<stop offset="42%" stop-color="' + c + '"/>' +
        '<stop offset="100%" stop-color="' + c + '" stop-opacity=".10"/></radialGradient>');
    });
    /* 星云：几团极淡的大色斑，制造纵深 */
    [['#3b5bdb', .26], ['#7048e8', .20], ['#0ea5a5', .16], ['#8b5cf6', .17]]
      .forEach(function (n, i) {
        DEFS.push('<radialGradient id="tdn-neb' + i + '">' +
          '<stop offset="0%" stop-color="' + n[0] + '" stop-opacity="' + n[1] + '"/>' +
          '<stop offset="55%" stop-color="' + n[0] + '" stop-opacity="' + (n[1] * .34).toFixed(3) + '"/>' +
          '<stop offset="100%" stop-color="' + n[0] + '" stop-opacity="0"/></radialGradient>');
      });
    /* 中央用：深渊（压暗）与极细光圈。
       「渊兮，似万物之宗」「湛兮，似或存」——道是深、暗、静的，
       不能做成一团白光，那成灯泡了。 */
    DEFS.push('<radialGradient id="tdn-abyss">' +
      '<stop offset="0%" stop-color="#01030a" stop-opacity=".94"/>' +
      '<stop offset="55%" stop-color="#020617" stop-opacity=".58"/>' +
      '<stop offset="100%" stop-color="#020617" stop-opacity="0"/></radialGradient>');
    DEFS.push('<radialGradient id="tdn-rim">' +
      '<stop offset="0%" stop-color="#8fb4ff" stop-opacity="0"/>' +
      '<stop offset="60%" stop-color="#8fb4ff" stop-opacity="0"/>' +
      '<stop offset="79%" stop-color="#cfe0ff" stop-opacity=".075"/>' +
      '<stop offset="90%" stop-color="#cfe0ff" stop-opacity=".022"/>' +
      '<stop offset="100%" stop-color="#8fb4ff" stop-opacity="0"/></radialGradient>');
    DEFS.push('<filter id="tdn-glow" x="-90%" y="-90%" width="280%" height="280%">',
      '<feGaussianBlur stdDeviation="7" result="b"/><feMerge>',
      '<feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>');
    var defs = el('defs');
    defs.innerHTML = DEFS.join('');
    svg.appendChild(defs);

    /* 定种随机：星野位置每次刷新都一致，便于核对与复现 */
    function rng(seed) {
      return function () { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    }
    var rnd = rng(20261015);
    /* 四芒星芒：一条 path 两个子路径，比两个元素便宜 */
    function spikes(x, y, L, w, color, op) {
      w = w || L * 0.055;
      return el('path', {
        d: 'M' + x + ',' + (y - L) + ' L' + (x + w) + ',' + y + ' L' + x + ',' + (y + L) + ' L' + (x - w) + ',' + y + ' Z' +
           'M' + (x - L) + ',' + y + ' L' + x + ',' + (y - w) + ' L' + (x + L) + ',' + y + ' L' + x + ',' + (y + w) + ' Z',
        fill: color, opacity: op
      });
    }
    svg.appendChild(el('rect', { x: -W / 2, y: -H / 2, width: W, height: H, fill: 'url(#tdn-bg)' }));

    /* 星云（在星野之下） */
    var gNeb = el('g', { class: 'tdn-neb' });
    [[-0.30, -0.34, 1150, 720, 0], [0.34, 0.26, 980, 640, 1],
     [-0.38, 0.30, 860, 560, 2], [0.40, -0.28, 900, 600, 3]]
      .forEach(function (n) {
        gNeb.appendChild(el('ellipse', {
          cx: n[0] * W, cy: n[1] * H, rx: n[2], ry: n[3], fill: 'url(#tdn-neb' + n[4] + ')'
        }));
      });
    svg.appendChild(gNeb);

    /* 星野：三层，明暗与大小不同，CSS 各自呼吸 */
    function starLayer(n, rmin, rmax, omin, omax, fill) {
      var g = el('g', { class: 'tdn-stars' });
      for (var i = 0; i < n; i++) {
        g.appendChild(el('circle', {
          cx: ((rnd() - 0.5) * W * 1.04).toFixed(1),
          cy: ((rnd() - 0.5) * H * 1.04).toFixed(1),
          r: (rmin + rnd() * (rmax - rmin)).toFixed(2),
          fill: fill || '#dce8ff',
          opacity: (omin + rnd() * (omax - omin)).toFixed(3)
        }));
      }
      return g;
    }
    /* 小屏减星：900 颗星对手机偏重，按视口宽度降档 */
    var small = (window.innerWidth || 1200) < 760;
    var N1 = small ? 300 : 620, N2 = small ? 100 : 210, N3 = small ? 26 : 52, NB = small ? 5 : 9;
    var gFar = starLayer(N1, 0.5, 1.15, 0.12, 0.42);
    gFar.setAttribute('class', 'tdn-stars tdn-tw-1');
    var gMid = starLayer(N2, 1.1, 1.9, 0.25, 0.62, '#e8eeff');
    gMid.setAttribute('class', 'tdn-stars tdn-tw-2');
    var gNear = starLayer(N3, 1.9, 2.9, 0.40, 0.85, '#ffffff');
    gNear.setAttribute('class', 'tdn-stars tdn-tw-3');
    /* 亮星：带光晕与星芒 */
    var gBright = el('g', { class: 'tdn-stars' });
    for (var bi = 0; bi < NB; bi++) {
      var bx = (rnd() - 0.5) * W * 0.96, by = (rnd() - 0.5) * H * 0.96;
      var br = 2.6 + rnd() * 1.8;
      gBright.appendChild(el('circle', { cx: bx, cy: by, r: br * 9, fill: 'url(#tdn-halo)', opacity: .55 }));
      gBright.appendChild(spikes(bx, by, br * 8, br * 0.5, '#ffffff', .20));
      gBright.appendChild(el('circle', { cx: bx, cy: by, r: br, fill: '#ffffff' }));
    }
    gBright.setAttribute('class', 'tdn-stars tdn-tw-4');
    svg.appendChild(gFar); svg.appendChild(gMid); svg.appendChild(gNear); svg.appendChild(gBright);

    /* 装饰层一律不接收指针事件。
       否则「点图面空白 → 复位」会被星云与星点吞掉——
       它们的填充即便近乎透明，visiblePainted 仍算命中，
       于是 e.target 是 ellipse/circle 而不是 svg/rect，复位就不触发。 */
    [gNeb, gFar, gMid, gNear, gBright].forEach(function (g) {
      g.style.pointerEvents = 'none';
    });

    var gRing = el('g'), gChord = el('g'), gRadial = el('g'), gPulse = el('g'), gNode = el('g');
    [gRing, gChord, gRadial, gPulse].forEach(function (g) { g.style.pointerEvents = 'none'; });
    [gRing, gChord, gRadial, gPulse, gNode].forEach(function (g) { svg.appendChild(g); });

    order.forEach(function (d, di) {
      var R = RING[d], c = COLOR[d];
      gRing.appendChild(el('ellipse', {
        class: 'tdn-ring tdn-ring-' + di,
        'data-dept': d, 'data-base': 0.26,
        cx: 0, cy: 0, rx: R * AX, ry: R * AY, fill: 'none', stroke: c,
        'stroke-opacity': 0.26, 'stroke-width': 1.4, 'stroke-dasharray': '3 9'
      }));
    });

    DATA.chord.forEach(function (e) {
      var p = pos[e.a], q = pos[e.b];
      var mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, k = 0.16;
      var path = el('path', {
        d: 'M' + p.x + ',' + p.y + ' Q' + (mx * (1 - k)) + ',' + (my * (1 - k)) + ' ' + q.x + ',' + q.y,
        fill: 'none', stroke: '#cbd5e1', 'stroke-opacity': 0.05 + e.w * 0.04,
        'stroke-width': 0.9 + e.w * 0.5, 'stroke-dasharray': '5 7',
        'data-chord': e.a + '|' + e.b, 'data-base': 0.05 + e.w * 0.04
      });
      var t = el('title'); t.textContent = e.a + ' ↔ ' + e.b + '：共 ' + e.w + ' 章（' + e.chs.join(' ') + '）';
      path.appendChild(t); gChord.appendChild(path);
    });

    DATA.radial.forEach(function (pair, i) {
      var p = pos[pair[0]], q = pos[pair[1]];
      if (!p || !q) return;
      var mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
      var dx = q.x - p.x, dy = q.y - p.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
      var cx = mx + (-dy / len) * 30, cy = my + (dx / len) * 30, id = 'tdn-rad-' + i;
      var path = el('path', {
        id: id, d: 'M' + p.x + ',' + p.y + ' Q' + cx + ',' + cy + ' ' + q.x + ',' + q.y,
        fill: 'none', stroke: COLOR[byId[pair[0]].dept], 'stroke-opacity': 0.18,
        'stroke-width': 1.5, 'data-rad': pair[0] + '|' + pair[1]
      });
      var t = el('title'); t.textContent = pair[0] + ' → ' + pair[1]; path.appendChild(t);
      /* 底层柔光：同一条路径画粗、低透明度，做出光流质感（比模糊滤镜便宜） */
      gRadial.appendChild(el('path', {
        d: path.getAttribute('d'), fill: 'none', stroke: COLOR[byId[pair[0]].dept],
        'stroke-opacity': 0.07, 'stroke-width': 5, 'stroke-linecap': 'round',
        'data-rad-glow': pair[0] + '|' + pair[1]
      }));
      gRadial.appendChild(path);
      var dotC = COLOR[byId[pair[1]].dept];
      var dot = el('circle', { r: 6.2, fill: 'url(#tdn-halo-' + byId[pair[1]].dept + ')' });
      dot.appendChild(el('circle', { r: 3.1, fill: '#ffffff', opacity: .92 }));
      var am = el('animateMotion', { dur: '3.6s', repeatCount: 'indefinite', begin: (i * 0.32) + 's' });
      var mp = el('mpath'); mp.setAttribute('href', '#' + id);
      am.appendChild(mp); dot.appendChild(am); gPulse.appendChild(dot);
    });

    /* 星等：亮度编码「连接度」——这个组在网中有多中心。
       半径已经编码句数，两者各管一件事，信息不重复。 */
    var DEG = {};
    DATA.nodes.forEach(function (n) { DEG[n.id] = 0; });
    DATA.radial.forEach(function (p) { DEG[p[0]]++; DEG[p[1]]++; });
    DATA.chord.forEach(function (e) { DEG[e.a]++; DEG[e.b]++; });
    var DEG_MAX = Math.max.apply(null, DATA.nodes.map(function (n) { return DEG[n.id]; })) || 1;

    var nodeEls = {};
    DATA.nodes.forEach(function (n) {
      if (n.id === 'A1') return;          /* A1 是中央的「道」，不画成节点 */
      var p = pos[n.id], c = COLOR[n.dept], r = p.r;
      var g = el('g', { class: 'tdn-node', 'data-id': n.id, style: 'cursor:pointer' });
      /* 0.42 是"暗星"的下限，1.0 是连接度最高的那一颗 */
      g.style.setProperty('--star', (0.42 + 0.58 * (DEG[n.id] / DEG_MAX)).toFixed(3));
      /* 恒星：光晕 → 星芒 → 本体 → 白热核心 */
      g.appendChild(el('circle', {
        cx: p.x, cy: p.y, r: r * 5.4, fill: 'url(#tdn-halo-' + n.dept + ')',
        class: 'tdn-corona'
      }));
      var sp = spikes(p.x, p.y, r * 4.3, r * 0.115, c, 1);
      sp.setAttribute('class', 'tdn-spike');
      g.appendChild(sp);
      g.appendChild(el('circle', {
        cx: p.x, cy: p.y, r: r, fill: '#061024', stroke: c,
        'stroke-width': 1.6, 'stroke-opacity': .9
      }));
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r * 0.72, fill: 'url(#tdn-core-' + n.dept + ')' }));
      g.appendChild(el('circle', { class: 'tdn-hot', cx: p.x, cy: p.y, r: Math.max(2.2, r * 0.30), fill: '#ffffff' }));
      var cos = Math.cos(p.a), vertical = Math.abs(cos) < 0.34, anchor, lx, ly;
      if (vertical) { anchor = 'middle'; lx = p.x; ly = p.y < 0 ? p.y - r - 40 : p.y + r + 26; }
      else if (cos > 0) { anchor = 'start'; lx = p.x + r + 16; ly = p.y + 6; }
      else { anchor = 'end'; lx = p.x - r - 16; ly = p.y + 6; }
      g.appendChild(tx(lx, ly, n.id, {
        fill: '#ffffff', 'font-size': 31, 'font-weight': 700, 'text-anchor': anchor,
        style: 'paint-order:stroke;stroke:#04060f;stroke-width:5'
      }));
      var nm = dispName(n.name);
      g.appendChild(tx(lx, ly + 34, nm.length > 14 ? nm.slice(0, 14) + '…' : nm, {
        fill: c, 'font-size': 26, 'font-weight': 600, 'text-anchor': anchor, 'fill-opacity': 1,
        style: 'paint-order:stroke;stroke:#04060f;stroke-width:5'
      }));
      gNode.appendChild(g); nodeEls[n.id] = g;
    });

    var gc = el('g', { class: 'tdn-core' });
    /* 一圈极淡的界面之光——不是光晕，是"深潭的边缘" */
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 210, fill: 'url(#tdn-rim)' }));
    /* 压暗中央：道是渊，不是光源 */
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 162, fill: 'url(#tdn-abyss)' }));
    /* 光芒：细、长、极淡，明灭都收敛 */
    var rays = el('g', { class: 'tdn-rays' });
    for (var ri = 0; ri < 12; ri++) {
      var ra = ri * Math.PI / 6, inner = 88, outer = (ri % 2 ? 190 : 292);
      rays.appendChild(el('line', {
        x1: (Math.cos(ra) * inner).toFixed(1), y1: (Math.sin(ra) * inner).toFixed(1),
        x2: (Math.cos(ra) * outer).toFixed(1), y2: (Math.sin(ra) * outer).toFixed(1),
        stroke: '#a9c2ee', 'stroke-opacity': (ri % 2 ? 0.045 : 0.095),
        'stroke-width': (ri % 2 ? 0.9 : 1.4), 'stroke-linecap': 'round'
      }));
    }
    gc.appendChild(rays);
    /* 环：外虚内实，细而清 */
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 78, fill: 'none', stroke: '#a9c2ee', 'stroke-opacity': .14, 'stroke-width': 1, 'stroke-dasharray': '1.5 9' }));
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 56, fill: 'none', stroke: '#dbe7ff', 'stroke-opacity': .34, 'stroke-width': 1.4 }));
    /* 核心只留一点微光：「似或存」 */
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 34, fill: 'url(#tdn-halo)', opacity: .30 }));
    /* 中央「道」：要与「渊」相称——衬线、微光、不刺眼。
       位置：**字形正中压在原点**上——源→用与共章弦都从原点射出，
       字若偏上，线就从字下方穿过，看着别扭。
       （SVG 文本的 y 是基线，故基线取 +26 才让 76 号字的视觉中心落在 0。） */
    gc.appendChild(tx(0, 26, '道', {
      fill: '#eaf1ff', 'font-size': 76, 'font-weight': 500, 'text-anchor': 'middle',
      'fill-opacity': .94, filter: 'url(#tdn-glow)',
      'font-family': '"Songti SC","STSong","Source Han Serif SC","Noto Serif SC",Georgia,serif',
      style: 'paint-order:stroke;stroke:#04060f;stroke-width:4'
    }));
    /* 中央即 A1「道生万物」——把组名写在小圆下方，点它读该组原文 */
    gc.appendChild(tx(0, 92, '道生万物', {
      fill: '#c2d6f5', 'font-size': 26, 'font-weight': 500, 'text-anchor': 'middle',
      'fill-opacity': .86, 'letter-spacing': 4,
      'font-family': '"Songti SC","STSong","Source Han Serif SC","Noto Serif SC",Georgia,serif',
      style: 'paint-order:stroke;stroke:#04060f;stroke-width:4'
    }));
    /* 环着深渊的四句状道之词：渊兮、湛兮、寂兮、独立。
       【此四句与下方悬停浮文，用户已明确"可以写死"——它们是选文，不是数据，
         不必从 00.md 抽取。以后看到这两处，别当成漏网的写死项去改。】
       极淡、衬线、贴着渊的边缘——要的是"看出来"而不是"读到"。 */
    [['渊兮', -118, -78, 'end'], ['湛兮，似或存', 118, -78, 'start'],
     ['寂兮寥兮', -118, 96, 'end'], ['独立不改', 118, 96, 'start']].forEach(function (q) {
      gc.appendChild(tx(q[1], q[2], q[0], {
        fill: '#9fb6dd', 'font-size': 23, 'font-weight': 400,
        'text-anchor': q[3], 'fill-opacity': .40, 'letter-spacing': 2,
        'font-family': '"Songti SC","STSong","Source Han Serif SC","Noto Serif SC",Georgia,serif'
      }));
    });
    /* 交互圈：只有它接收指针事件。装饰用的大光晕若可命中，
       会盖住最内环的 A1 节点，真人点不到。 */
    var hit = el('circle', {
      class: 'tdn-core-hit', cx: 0, cy: 0, r: 68, fill: 'transparent',
      'aria-label': '道生一，一生二，二生三，三生万物'
    });
    gc.appendChild(hit);
    gNode.appendChild(gc);

    /* 悬停（或点击）中央：四环由内向外亮起，再返回——远曰反 */
    var rippleTimer = null, verseTimer = null;
    function rippleOn() {
      svg.classList.add('tdn-rippling');
      svg.classList.add('tdn-focus');   /* 道一出现，万物退隐：让浮文有干净的地方 */
    }
    function rippleOff() {
      svg.classList.remove('tdn-rippling');
      svg.classList.remove('tdn-focus');
    }
    hit.addEventListener('mouseenter', rippleOn);
    hit.addEventListener('mouseleave', rippleOff);
    /* 触屏无 hover：点一下放一整轮，随即自动撤下 */
    hit.addEventListener('click', function () {
      /* 丙案：悬停＝涟漪＋三段原文浮文；点击＝读 A1「道生万物」的原文与评说 */
      rippleOn();
      clearTimeout(rippleTimer);
      rippleTimer = setTimeout(rippleOff, 3600);
      if (API && API.onCoreClick) API.onCoreClick('A1');
    });

    var stage = document.createElement('div');
    stage.className = 'tdn-stage';
    stage.appendChild(svg);

    /* 原文浮文：悬停中央「道」时，在它正下方淡入。
       不用浏览器原生 title —— 那是系统方框，与星空、大道不搭。 */
    var verse = document.createElement('div');
    verse.className = 'tdn-verse';
    /* 悬停中央时浮现的三段原文。同上：属选文，用户定可写死。 */
    verse.innerHTML =
      '<i class="rule"></i>' +
      '<span>道生一，一生二，二生三，三生万物</span>' +
      '<span>寂兮寥兮，独立不改，周行而不殆</span>' +
      '<span>大曰逝，逝曰远，远曰反</span>';
    stage.appendChild(verse);

    /* 浮文落在「道」的正下方：按 SVG 实际缩放算出偏移 */
    function placeVerse() {
      var sc = Math.min(stage.clientWidth / W, stage.clientHeight / H) || 0;
      verse.style.setProperty('--tip-y', Math.round(78 * sc) + 'px');
    }
    placeVerse();
    window.addEventListener('resize', placeVerse);
    /* 布局完成后再量一次：建 stage 时它尚未排版，clientWidth/Height 还是 0，
       偏移会被算成 0，浮文就贴在中心而不是落在正下方。 */
    if (window.ResizeObserver) new ResizeObserver(placeVerse).observe(stage);
    requestAnimationFrame(placeVerse);
    setTimeout(placeVerse, 120);

    hit.addEventListener('mouseenter', function () { placeVerse(); verse.classList.add('on'); });
    hit.addEventListener('mouseleave', function () { verse.classList.remove('on'); });
    hit.addEventListener('click', function () {
      placeVerse(); verse.classList.add('on');
      clearTimeout(verseTimer);
      verseTimer = setTimeout(function () { verse.classList.remove('on'); }, 3600);
    });

    /* ---------- 图面悬停：进到 D 环之内，整张网提到中间态 ----------
       常态只是"若有若无"，全貌要看不清；但一进来就全亮又太吵。
       故取中间值：能看出网的走向，又不夺节点与中央。
       已有选中（tdn-sel）时让路——那时的亮暗由选中态决定。 */
    var HOVER_LINE = 0.45, HOVER_GLOW = 0.18, HOVER_CHORD = 0.45;
    var hoverOn = false;
    /* 线的「常态」不是一个定值，取决于鼠标在不在 D 环里。
       这三个函数是唯一的出处——highlight() 也必须走它们，
       否则离开节点时 highlight(null) 会按"图外常态"写回，
       把还在圈内的中间态抹掉（这是曾经的 bug）。 */
    /* 两个层次，别混：
       rest*＝常态下限（图外，或"选了部"时——部视图必须稳定，不随鼠标变）；
       base*＝当前鼠标位置对应的基准（图外走 rest，图内走中间态）。 */
    var REST_LINE = 0.18, REST_GLOW = 0.07;
    function restRad() { return REST_LINE; }
    function restGlow() { return REST_GLOW; }
    function restChord(b) { return b; }
    function baseRad() { return hoverOn ? HOVER_LINE : REST_LINE; }
    function baseGlow() { return hoverOn ? HOVER_GLOW : REST_GLOW; }
    function baseChord(b) { return hoverOn ? Math.min(b * 1.9, HOVER_CHORD) : b; }
    function hoverWeb() {
      if (svg.classList.contains('tdn-sel')) return;
      Array.prototype.forEach.call(gRadial.querySelectorAll('path[data-rad]'), function (p) {
        p.setAttribute('stroke-opacity', baseRad());
      });
      Array.prototype.forEach.call(gRadial.querySelectorAll('path[data-rad-glow]'), function (p) {
        p.setAttribute('stroke-opacity', baseGlow());
      });
      Array.prototype.forEach.call(gChord.querySelectorAll('path'), function (p) {
        p.setAttribute('stroke-opacity', baseChord(+(p.getAttribute('data-base') || 0.1)));
      });
    }
    /* D 环是椭圆（rx = R×AX，ry = R×AY），按椭圆方程判"圈内" */
    var D_RX = RING['四'] * AX, D_RY = RING['四'] * AY;
    function inD(e) {
      var r = svg.getBoundingClientRect();
      var sc = Math.min(r.width / W, r.height / H) || 1;
      var x = (e.clientX - (r.left + r.width / 2)) / sc;
      var y = (e.clientY - (r.top + r.height / 2)) / sc;
      return (x * x) / (D_RX * D_RX) + (y * y) / (D_RY * D_RY) <= 1;
    }
    stage.addEventListener('mousemove', function (e) {
      var inside = inD(e);
      svg.dataset.hover = inside ? '1' : '0';   /* 状态标记，便于排查 */
      if (inside === hoverOn) return;
      hoverOn = inside; hoverWeb();
    });
    stage.addEventListener('mouseleave', function () {
      if (hoverOn) { hoverOn = false; hoverWeb(); }
    });

    host.appendChild(stage);
    /* onCoreClick 由 mount 挂上——抽屉的 open() 定义在 mount 里，
       build 取不到它，只能留一个回调口子。 */
    API = {
      svg: svg, stage: stage, nodeEls: nodeEls,
      gChord: gChord, gRadial: gRadial, gPulse: gPulse,
      onCoreClick: null,
      /* 供 highlight() 取"当前常态值"——随鼠标是否在 D 环内而变 */
      baseRad: baseRad, baseGlow: baseGlow, baseChord: baseChord,
      restRad: restRad, restGlow: restGlow, restChord: restChord
    };
    return API;
  }

  function mount(host) {
    var content = host.closest ? host.closest('.content') : null;
    if (content) content.classList.add('tdn-wide');
    var ctx = build(host);
    ctx.onCoreClick = open;   /* 点中央「道」→ 读 A1「道生万物」 */

    /* ---------- 抽屉 ---------- */
    var drawer = document.createElement('div');
    drawer.className = 'tdn-drawer';
    drawer.innerHTML =
      '<div class="tdn-mask"></div>' +
      '<aside class="tdn-panel" role="dialog" aria-label="组详情">' +
        '<button class="tdn-x" aria-label="关闭">×</button>' +
        '<div class="tdn-panel-head"></div>' +
        '<div class="tdn-panel-body"></div>' +
      '</aside>';
    host.appendChild(drawer);
    var panel = drawer.querySelector('.tdn-panel');
    var head = drawer.querySelector('.tdn-panel-head');
    var body = drawer.querySelector('.tdn-panel-body');

    /* 抽屉打开时，把横屏按钮收起来（窄屏面板满宽，按钮会压住抽屉的关闭键 ×） */
    function close() {
      drawer.classList.remove('open');
      document.body.classList.remove('tdn-drawer-open');
    }
    drawer.querySelector('.tdn-x').onclick = close;
    drawer.querySelector('.tdn-mask').onclick = close;
    var escReset = function () {};   /* 由 mount 后段接管 */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (drawer.classList.contains('open')) close();
      else escReset();
    });

    function open(id) {
      var n = byId[id], c = COLOR[n.dept];
      head.innerHTML =
        '<span class="tdn-badge" style="--c:' + c + '">' + n.dept + '部　' + SHORT[n.dept] + '</span>' +
        '<h3>' + esc(id) + '　' + esc(dispName(n.name)) + '</h3>' +
        '<p class="tdn-meta">收录 <b>' + n.chs.length + '</b> 章 · <b>' + n.n + '</b> 句　' +
        n.chs.map(function (x) { return '<a class="tdn-ch" href="index.html#/' + pad(x) + '">' + pad(x) + '</a>'; })
          .join('<span class="tdn-sep">·</span>') + '</p>';
      body.innerHTML = '<p class="tdn-loading">正在读取原文…</p>';
      drawer.classList.add('open');
      document.body.classList.add('tdn-drawer-open');
      panel.scrollTop = 0;
      highlight([id]);

      var use = DATA.radial.filter(function (p) { return p[1] === id; }).map(function (p) { return p[0]; });
      var src = DATA.radial.filter(function (p) { return p[0] === id; }).map(function (p) { return p[1]; });
      var near = DATA.chord.filter(function (e) { return e.a === id || e.b === id; })
        .sort(function (a, b) { return b.w - a.w; })
        .map(function (e) { return { id: e.a === id ? e.b : e.a, w: e.w }; });
      function chips(list) {
        return list.map(function (x) {
          var o = byId[x];
          return '<button class="tdn-jump" data-id="' + x + '" style="--c:' + COLOR[o.dept] + '">' + x + ' ' + esc(o.name) + '</button>';
        }).join('') || '<span class="tdn-none">—</span>';
      }
      var relHTML =
        '<h4>牵连</h4>' +
        '<div class="tdn-rel-row"><span class="tdn-rel-k">源（我出于）</span>' + chips(use) + '</div>' +
        '<div class="tdn-rel-row"><span class="tdn-rel-k">用（我流向）</span>' + chips(src) + '</div>' +
        '<div class="tdn-rel-row"><span class="tdn-rel-k">共章相连</span>' +
          (near.map(function (e) {
            var o = byId[e.id];
            return '<button class="tdn-jump" data-id="' + e.id + '" style="--c:' + COLOR[o.dept] + '">' +
              e.id + ' ' + esc(o.name) + ' <i>' + e.w + '章</i></button>';
          }).join('') || '<span class="tdn-none">—</span>') + '</div>';

      loadDoc().then(function (doc) {
        var list = doc[id], vh = '';
        if (list && list.length) {
          var buf = [];
          var flush = function () { if (buf.length) { vh += '<ol class="tdn-verses">' + buf.join('') + '</ol>'; buf = []; } };
          list.forEach(function (it) {
            if (it.ps !== undefined) {
              flush();
              vh += '<div class="tdn-ps">' + it.ps.split('\n').map(function (x) {
                return '<p>' + md(x) + '</p>';
              }).join('') + '</div>';
            } else if (it.sub) { flush(); vh += '<p class="tdn-sub">' + esc(it.sub) + '</p>'; }
            else buf.push('<li>' + verseHTML(it.v) + '</li>');
          });
          flush();
        } else {
          vh = '<p class="tdn-none">未能读取原文，请直接看 <a href="index.html#/00">新编</a>。</p>';
        }
        body.innerHTML =
          '<h4>原文 · 评说</h4>' + vh +
          relHTML +
          '<a class="tdn-goto" href="index.html#/00?id=' + anchorOf(id, n.name) + '">' +
            '在《里探《道德经》新编》中阅读 →</a>';
        Array.prototype.forEach.call(body.querySelectorAll('.tdn-jump'), function (b) {
          b.onclick = function () { open(b.getAttribute('data-id')); };
        });
      });
    }

    /* ---------- 高亮 ---------- */
    /* preview=true 表示这是"节点悬停预览"，不是一次真正的选中。
       预览时不吃部模式——否则非相关的线会掉进 baseRad()，
       而鼠标此刻正在 D 环内（悬停节点必然在圈内），baseRad() 返回中间态 0.45，
       结果所有线一起亮起来（这是曾经的 bug）。 */
    function highlight(ids, preview) {
      var set = {}; (ids || []).forEach(function (i) { set[i] = 1; });
      var on = Object.keys(set).length > 0;
      ctx.svg.classList.toggle('tdn-sel', on);   /* 有选中时，图面悬停不再提亮全网 */
      /* 选的是"部"而不是某一组时：这一部的含义是"皆由道派生"，
         故不点亮任何连线，只把该部的圆环与中央「道」亮出来。 */
      var dsel = (SEL && SEL.leg) ? SEL.leg.getAttribute('data-dept') : null;
      /* 环始终按"选中的部"处理（悬停预览时也不灭）；
         连线则用 dOnly——预览时置空，走普通的节点预览逻辑。 */
      var dOnly = preview ? null : dsel;
      /* 选部时，除该部本身，还要把它的"道源"一并显出来（但压暗一档）。
         依据就是 DATA.radial（源→用）：凡 u → v 且 v 属于该部，则 u 是它的源。
         二部的源只有道（A1），已由中央承担，故二部自然没有额外的上游节点。 */
      var up = {}, nb = {};
      if (dOnly) {
        DATA.radial.forEach(function (pair) {
          if (set[pair[1]] && !set[pair[0]]) up[pair[0]] = 1;
        });
      } else if (on) {
        /* 节点模式：把与选中节点有线相连的那些也点亮到半亮——
           否则线是亮的，对面是谁却看不出来（用户指出的问题）。
           源→用与共章弦都算相连。 */
        DATA.radial.forEach(function (pair) {
          if (set[pair[0]] && !set[pair[1]]) nb[pair[1]] = 1;
          if (set[pair[1]] && !set[pair[0]]) nb[pair[0]] = 1;
        });
        DATA.chord.forEach(function (c) {
          if (set[c.a] && !set[c.b]) nb[c.b] = 1;
          if (set[c.b] && !set[c.a]) nb[c.a] = 1;
        });
      }
      DATA.nodes.forEach(function (n) {
        var g = ctx.nodeEls[n.id];
        /* A1「道生万物」没有节点元素——它就是中央的「道」。
           选中 A1 时让中央亮一档，而不是去碰不存在的节点。 */
        if (!g) {
          if (n.id === 'A1') ctx.svg.classList.toggle('tdn-core-on', !!(on && (set['A1'] || dOnly)));
          return;
        }
        g.style.opacity = (!on || set[n.id]) ? 1 : ((up[n.id] || nb[n.id]) ? 0.62 : 0.12);
        /* 触屏没有 hover：选中的那颗要保持全亮，否则一直是暗星 */
        g.classList.toggle('tdn-on', !!(on && (set[n.id] || nb[n.id])));
      });
      /* 注意：只取带 data-rad 的路径。辐射组里还叠着一层柔光（data-rad-glow），
         若一并取来，它的 data-rad 为空，split 会抛错。 */
      Array.prototype.forEach.call(ctx.gRadial.querySelectorAll('path[data-rad]'), function (p) {
        var a = p.getAttribute('data-rad'); if (!a) return;
        var s = a.split('|');
        /* 无选中 → 回到极淡的常态（与 DATA 里的默认值一致）；
           有选中 → 只亮该组相关的，其余更淡。 */
        var lit = on && !dOnly && (set[s[0]] || set[s[1]]);
        var upEdge = dOnly && set[s[1]] && !set[s[0]];      /* 指向该部的源→用 */
        p.setAttribute('stroke-opacity',
          !on ? ctx.baseRad() : (dOnly ? (upEdge ? 0.45 : ctx.restRad()) : (lit ? 0.92 : 0.02)));
      });
      Array.prototype.forEach.call(ctx.gRadial.querySelectorAll('path[data-rad-glow]'), function (p) {
        var a = p.getAttribute('data-rad-glow'); if (!a) return;
        var s = a.split('|');
        var lit = on && !dOnly && (set[s[0]] || set[s[1]]);
        var upEdge = dOnly && set[s[1]] && !set[s[0]];
        p.setAttribute('stroke-opacity',
          !on ? ctx.baseGlow() : (dOnly ? (upEdge ? 0.18 : ctx.restGlow()) : (lit ? 0.40 : 0.01)));
      });
      /* 环：选部时只亮该部那一个，其余压暗；没选部则都回基准 */
      Array.prototype.forEach.call(ctx.svg.querySelectorAll('.tdn-ring'), function (r) {
        var base = +(r.getAttribute('data-base') || 0.26);
        if (!dsel) { r.setAttribute('stroke-opacity', base); r.setAttribute('stroke-width', 1.4); return; }
        var mine = r.getAttribute('data-dept') === dsel;
        r.setAttribute('stroke-opacity', mine ? 0.9 : 0.05);
        r.setAttribute('stroke-width', mine ? 3 : 1.4);
      });
      Array.prototype.forEach.call(ctx.gChord.querySelectorAll('path'), function (p) {
        var s = p.getAttribute('data-chord').split('|'), b = +(p.getAttribute('data-base') || 0.1);
        var lit = on && !dOnly && (set[s[0]] || set[s[1]]);
        /* 无选中（或选的是"部"）→ 回到常态，细弦按自己的权重；
           选中某一组 → 相关的弦提亮，其余压到几乎不见。 */
        p.setAttribute('stroke-opacity', dOnly ? ctx.restChord(b) : (!on ? ctx.baseChord(b) : (lit ? Math.min(b * 2.6, 0.85) : 0.012)));
      });
    }

    var readout = document.createElement('div');
    readout.className = 'tdn-readout';
    var DEF = '点任一组，读它的原文、评说与牵连；点上方部名可点亮一部；点图面空白或按 Esc 回到全网。';
    readout.innerHTML = DEF;

    var legend = document.createElement('div');
    legend.className = 'tdn-legend';
    legend.innerHTML = '<span class="tdn-title">天网恢恢，疏而不失</span>' +
      ['二', '三', '四'].map(function (d) {
        return '<button class="tdn-leg" data-dept="' + d + '" style="--c:' + COLOR[d] + '">' +
          SHORT[d] + '<i>' + DATA.nodes.filter(function (n) { return n.dept === d; }).length + ' 组</i></button>';
      }).join('');

    /* ---------- 选中态（持久）vs 悬停预览（临时）----------
       选中态由「全网／核心词／部图例／点节点」设定，一直保持；
       悬停只作预览，移开即回到选中态——不再把选中冲掉。 */
    var SEL = { ids: null, html: DEF, leg: null, chip: null };

    function jumpHTML(ids) {
      return ids.map(function (i) {
        var n = byId[i];
        return '<button class="tdn-jump" data-id="' + i + '" style="--c:' + COLOR[n.dept] + '">' +
          i + ' ' + esc(n.name) + '</button>';
      }).join('');
    }
    function wireJumps(root) {
      Array.prototype.forEach.call(root.querySelectorAll('.tdn-jump'), function (x) {
        x.onclick = function () { openNode(x.getAttribute('data-id')); };
      });
    }
    function paintSel() {
      highlight(SEL.ids);
      readout.innerHTML = SEL.html;
      Array.prototype.forEach.call(legend.querySelectorAll('.tdn-leg'), function (x) {
        x.classList.toggle('on', x === SEL.leg);
      });
      wireJumps(readout);
    }
    function setSel(ids, html, leg, chip) {
      SEL = { ids: ids, html: html, leg: leg || null, chip: chip || null };
      paintSel();
    }
    function deptSel(d) {
      var ids = DATA.nodes.filter(function (n) { return n.dept === d; }).map(function (n) { return n.id; });
      return ids;
    }

    /* 全网（复位） */
    function resetAll() { close(); setSel(null, DEF, null, null); }
    escReset = resetAll;

    /* 点图面空白 → 复位 */
    ctx.svg.addEventListener('click', function (e) {
      var tag = e.target && e.target.tagName;
      if (tag === 'svg' || tag === 'rect') resetAll();
    });

    /* 部图例：点选 / 再点取消 */
    Array.prototype.forEach.call(legend.querySelectorAll('.tdn-leg'), function (btn) {
      btn.onclick = function () {
        var d = btn.getAttribute('data-dept');
        close();
        if (SEL.leg === btn) { setSel(null, DEF, null, null); return; }
        var ids = deptSel(d);
        setSel(ids,
          '<b style="color:' + COLOR[d] + '">' + d + '部　' + SHORT[d] + '</b>　共 ' + ids.length +
          ' 组，皆由道派生（图上亮出这一环' +
          (d === '二' ? '' : '，一并显出它们的道源') + '）：' + jumpHTML(ids),
          btn, null);
      };
    });

    host.insertBefore(legend, ctx.stage);
    host.insertBefore(readout, ctx.stage);

    /* 节点：悬停＝预览；移开＝回选中态；点击＝选中并读原文 */
    function nodeHTML(id) {
      var n = byId[id];
      return '<b style="color:' + COLOR[n.dept] + '">' + id + '　' + esc(dispName(n.name)) + '</b>' +
        '　收录 <b>' + n.chs.length + '</b> 章 / <b>' + n.n + '</b> 句　·　点它读原文';
    }
    function openNode(id) { setSel([id], nodeHTML(id), null, null); open(id); }

    Object.keys(ctx.nodeEls).forEach(function (id) {
      var g = ctx.nodeEls[id], n = byId[id];
      g.style.transition = 'opacity .25s';
      g.addEventListener('mouseenter', function () {
        highlight([id], true);                 /* 仅预览，不动 SEL */
        readout.innerHTML = nodeHTML(id);
      });
      g.addEventListener('mouseleave', function () {
        paintSel();                            /* 回到选中态 */
      });
      g.addEventListener('click', function () { openNode(id); });
    });

    var bar2 = document.createElement('div');
    bar2.className = 'tdn-chips tdn-toggles';
    [['共章弦', ctx.gChord], ['源→用', ctx.gRadial], ['流动', ctx.gPulse]].forEach(function (pair) {
      var b = document.createElement('button');
      b.className = 'tdn-chip on'; b.textContent = pair[0];
      b.onclick = function () {
        var off = b.classList.toggle('on') === false;
        pair[1].style.display = off ? 'none' : '';
        b.style.opacity = off ? 0.42 : 1;
      };
      bar2.appendChild(b);
    });
    host.appendChild(bar2);
  }

  function boot() {
    var host = document.getElementById('tiandao-net');
    if (!host || host.dataset.built) return;
    host.dataset.built = '1';
    /* 星图的全部数据取自 00.md 本身：现场取、现场解析，不存副本。 */
    fetch('00.md', { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (text) {
      adoptData(parse00(text));
      mount(host);
    }).catch(function (err) {
      host.innerHTML = '<p class="tdn-none">未能从 00.md 读取数据（' + err.message +
        '）。天网的组、章、道源都取自 00.md，请确认它可访问。</p>';
    });
  }
  window.__tdnBoot = boot;
  if (window.$docsify) {
    window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
      hook.doneEach(function () { boot(); });
    });
  } else if (document.readyState !== 'loading') { boot(); }
  else { document.addEventListener('DOMContentLoaded', boot); }
})();
