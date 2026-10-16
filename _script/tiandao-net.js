/* ============================================================
   天道星图（对外名）· 页面题名「天网恢恢，疏而不失」
   里探《道德经》新编 · 关系图
   「天网恢恢，疏而不失」——道生一，一生二，二生三，三生万物
   点节点即读原文、评说与牵连；顺着连线可走遍全网。
   ============================================================ */
(function () {
  var DATA = {"depts": [{"key": "一", "name": "道生万物论（宇宙起源）"}, {"key": "二", "name": "道的属性和规律（自然规律）"}, {"key": "三", "name": "修身成圣（尊道不争）"}, {"key": "四", "name": "治国取天下（尊道无为）"}], "nodes": [{"id": "A1", "name": "道生万物", "dept": "一", "chs": [1, 4, 6, 25, 40, 42, 51, 52], "n": 12}, {"id": "B1", "name": "道法自然", "dept": "二", "chs": [6, 7, 14, 16, 21, 25, 34, 37, 39, 40, 58], "n": 11}, {"id": "B2", "name": "无之以为用", "dept": "二", "chs": [4, 5, 11, 45], "n": 3}, {"id": "B3", "name": "似或存（寂寥、惚恍）", "dept": "二", "chs": [4, 14, 21, 25, 35], "n": 5}, {"id": "B4", "name": "道隐无名（不彰显）", "dept": "二", "chs": [27, 32, 41, 45, 67, 78], "n": 6}, {"id": "B5", "name": "玄德（生而不有，养而不为主，利而不害）", "dept": "二", "chs": [2, 8, 10, 21, 34, 41, 51, 81], "n": 8}, {"id": "B6", "name": "玄同（包容 无相 中和）", "dept": "二", "chs": [4, 5, 32, 55, 56, 62, 79], "n": 9}, {"id": "B7", "name": "柔弱胜刚强（由下向上）", "dept": "二", "chs": [2, 22, 26, 32, 36, 39, 43, 45, 55, 61, 63, 64, 66, 73, 76, 78], "n": 20}, {"id": "B8", "name": "满招损（由上向下）", "dept": "二", "chs": [9, 12, 23, 24, 30, 42, 55, 77, 81], "n": 11}, {"id": "C1", "name": "守道抱一", "dept": "三", "chs": [10, 15, 20, 23, 41, 52, 54, 70], "n": 18}, {"id": "C2", "name": "知常全生", "dept": "三", "chs": [16, 33, 50, 52, 55, 56, 72, 81], "n": 14}, {"id": "C3", "name": "知足知止", "dept": "三", "chs": [15, 24, 29, 32, 33, 42, 44, 46, 47, 52, 53, 58, 77], "n": 15}, {"id": "C4", "name": "常善救人", "dept": "三", "chs": [27, 49, 79], "n": 6}, {"id": "C5", "name": "不争之得：柔弱胜刚强", "dept": "三", "chs": [7, 13, 22, 28, 63, 66, 67, 71], "n": 18}, {"id": "D1", "name": "守道不失", "dept": "四", "chs": [25, 32, 35, 59, 62], "n": 5}, {"id": "D2", "name": "无为而治：无事、希言", "dept": "四", "chs": [2, 5, 10, 13, 17, 23, 29, 37, 43, 48, 57, 58, 60, 64], "n": 18}, {"id": "D3", "name": "不崇德尚贤", "dept": "四", "chs": [12, 18, 19, 38], "n": 8}, {"id": "D4", "name": "愚民", "dept": "四", "chs": [3, 65], "n": 5}, {"id": "D5", "name": "小国寡民", "dept": "四", "chs": [80], "n": 1}, {"id": "D6", "name": "谦下之得：柔弱胜刚强", "dept": "四", "chs": [26, 36, 39, 42, 61, 75, 78], "n": 9}, {"id": "D7", "name": "不滥杀、不用威", "dept": "四", "chs": [72, 74], "n": 3}, {"id": "D8", "name": "不以兵强天下（不得已而用）", "dept": "四", "chs": [30, 31, 46, 68, 69], "n": 9}], "radial": [["A1", "C1"], ["A1", "D1"], ["B1", "C2"], ["B1", "D2"], ["B4", "D3"], ["B5", "D8"], ["B6", "C4"], ["B7", "C5"], ["B7", "D6"], ["B8", "C3"], ["B8", "D7"]], "chord": [{"a": "A1", "b": "B1", "w": 3, "chs": [6, 25, 40]}, {"a": "A1", "b": "C3", "w": 2, "chs": [42, 52]}, {"a": "B1", "b": "B3", "w": 2, "chs": [14, 21]}, {"a": "B1", "b": "B5", "w": 2, "chs": [21, 34]}, {"a": "B1", "b": "D2", "w": 2, "chs": [37, 58]}, {"a": "B2", "b": "B6", "w": 2, "chs": [4, 5]}, {"a": "B4", "b": "B7", "w": 3, "chs": [32, 45, 78]}, {"a": "B5", "b": "C1", "w": 2, "chs": [10, 41]}, {"a": "B5", "b": "D2", "w": 2, "chs": [2, 10]}, {"a": "B6", "b": "B7", "w": 2, "chs": [32, 55]}, {"a": "B6", "b": "C2", "w": 2, "chs": [55, 56]}, {"a": "B6", "b": "D1", "w": 2, "chs": [32, 62]}, {"a": "B7", "b": "C5", "w": 3, "chs": [22, 63, 66]}, {"a": "B7", "b": "D2", "w": 3, "chs": [2, 43, 64]}, {"a": "B7", "b": "D6", "w": 5, "chs": [26, 36, 39, 61, 78]}, {"a": "B8", "b": "C2", "w": 2, "chs": [55, 81]}, {"a": "B8", "b": "C3", "w": 3, "chs": [24, 42, 77]}, {"a": "C1", "b": "C3", "w": 2, "chs": [15, 52]}, {"a": "C1", "b": "D2", "w": 2, "chs": [10, 23]}, {"a": "C2", "b": "C3", "w": 2, "chs": [33, 52]}, {"a": "C3", "b": "D2", "w": 2, "chs": [29, 58]}], "core": {"不争": ["B5", "C5", "D2", "D6", "D8"], "无为": ["B1", "D2"], "生而不有": ["A1", "B5", "C1"], "玄德": ["B5", "C1", "D8"], "玄同": ["B6", "C2", "C4"], "柔弱": ["B7", "C5", "D6"], "损有余而补不足": ["B8", "C3", "D7"], "道隐无名": ["B4", "D3"], "无之以为用": ["B2"], "似或存": ["B3"], "知常": ["C2"], "知足知止": ["C3"], "贵以贱为本": ["B7", "D6"], "愚民": ["D4"], "小国寡民": ["D5"], "用兵": ["D8"]}};

  var COLOR = { '一': '#f6c453', '二': '#38bdf8', '三': '#34d399', '四': '#a78bfa' };
  var RING  = { '一': 178, '二': 318, '三': 458, '四': 598 };
  var NUM   = { '一': '一', '二': '二', '三': '三', '四': '四' };
  var SEQ   = { '一': '道生一', '二': '一生二', '三': '二生三', '四': '三生万物' };
  var SHORT = { '一': '道生万物论', '二': '道的属性和规律', '三': '修身成圣', '四': '治国取天下' };
  var OFF   = { '一': 0, '二': Math.PI / 8, '三': 0, '四': Math.PI / 8 };
  var AX = 1.72, AY = 1.0;   /* 横向拉宽，铺满宽屏 */
  var NS = 'http://www.w3.org/2000/svg';
  var CN = { 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  var byId = {};
  DATA.nodes.forEach(function (n) { byId[n.id] = n; });

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
    var order = ['一', '二', '三', '四'], groups = {};
    order.forEach(function (d) { groups[d] = DATA.nodes.filter(function (n) { return n.dept === d; }); });

    var pos = {};
    order.forEach(function (d) {
      var list = groups[d], R = RING[d], off = OFF[d];
      list.forEach(function (n, i) {
        var a = -Math.PI / 2 + off + (i * 2 * Math.PI) / list.length;
        pos[n.id] = { x: Math.cos(a) * R * AX, y: Math.sin(a) * R * AY, a: a, r: 11 + Math.sqrt(n.n) * 3.4 };
      });
    });

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

    var gRing = el('g'), gChord = el('g'), gRadial = el('g'), gPulse = el('g'), gNode = el('g');
    [gRing, gChord, gRadial, gPulse].forEach(function (g) { g.style.pointerEvents = 'none'; });
    [gRing, gChord, gRadial, gPulse, gNode].forEach(function (g) { svg.appendChild(g); });

    order.forEach(function (d, di) {
      var R = RING[d], c = COLOR[d];
      gRing.appendChild(el('ellipse', {
        class: 'tdn-ring tdn-ring-' + di,
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
        fill: 'none', stroke: COLOR[byId[pair[0]].dept], 'stroke-opacity': 0.5,
        'stroke-width': 1.9, 'data-rad': pair[0] + '|' + pair[1]
      });
      var t = el('title'); t.textContent = pair[0] + ' → ' + pair[1]; path.appendChild(t);
      /* 底层柔光：同一条路径画粗、低透明度，做出光流质感（比模糊滤镜便宜） */
      gRadial.appendChild(el('path', {
        d: path.getAttribute('d'), fill: 'none', stroke: COLOR[byId[pair[0]].dept],
        'stroke-opacity': 0.13, 'stroke-width': 7, 'stroke-linecap': 'round',
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
    gc.appendChild(tx(0, 16, '道', {
      fill: '#dce8ff', 'font-size': 56, 'font-weight': 700, 'text-anchor': 'middle',
      'fill-opacity': .92, filter: 'url(#tdn-glow)'
    }));
    /* 交互圈：只有它接收指针事件。装饰用的大光晕若可命中，
       会盖住最内环的 A1 节点，真人点不到。 */
    var hit = el('circle', { class: 'tdn-core-hit', cx: 0, cy: 0, r: 68, fill: 'transparent' });
    var htitle = el('title');
    htitle.textContent = '道生一，一生二，二生三，三生万物。\n周行而不殆。\n大曰逝，逝曰远，远曰反。';
    hit.appendChild(htitle);
    gc.appendChild(hit);
    gNode.appendChild(gc);

    /* 悬停（或点击）中央：四环由内向外亮起，再返回——远曰反 */
    var rippleTimer = null;
    function rippleOn() { svg.classList.add('tdn-rippling'); }
    function rippleOff() { svg.classList.remove('tdn-rippling'); }
    hit.addEventListener('mouseenter', rippleOn);
    hit.addEventListener('mouseleave', rippleOff);
    /* 触屏无 hover：点一下放一整轮，随即自动撤下 */
    hit.addEventListener('click', function () {
      rippleOn();
      clearTimeout(rippleTimer);
      rippleTimer = setTimeout(rippleOff, 3600);
    });

    var stage = document.createElement('div');
    stage.className = 'tdn-stage';
    stage.appendChild(svg);
    host.appendChild(stage);
    return { svg: svg, stage: stage, nodeEls: nodeEls, gChord: gChord, gRadial: gRadial, gPulse: gPulse };
  }

  function mount(host) {
    var content = host.closest ? host.closest('.content') : null;
    if (content) content.classList.add('tdn-wide');
    var ctx = build(host);

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
          '<a class="tdn-goto" href="index.html#/00">在《里探《道德经》新编》中阅读 →</a>';
        Array.prototype.forEach.call(body.querySelectorAll('.tdn-jump'), function (b) {
          b.onclick = function () { open(b.getAttribute('data-id')); };
        });
      });
    }

    /* ---------- 高亮 ---------- */
    function highlight(ids) {
      var set = {}; (ids || []).forEach(function (i) { set[i] = 1; });
      var on = Object.keys(set).length > 0;
      DATA.nodes.forEach(function (n) {
        var g = ctx.nodeEls[n.id];
        g.style.opacity = (!on || set[n.id]) ? 1 : 0.12;
        /* 触屏没有 hover：选中的那颗要保持全亮，否则一直是暗星 */
        g.classList.toggle('tdn-on', !!(on && set[n.id]));
      });
      /* 注意：只取带 data-rad 的路径。辐射组里还叠着一层柔光（data-rad-glow），
         若一并取来，它的 data-rad 为空，split 会抛错。 */
      Array.prototype.forEach.call(ctx.gRadial.querySelectorAll('path[data-rad]'), function (p) {
        var a = p.getAttribute('data-rad'); if (!a) return;
        var s = a.split('|');
        p.setAttribute('stroke-opacity', (!on || set[s[0]] || set[s[1]]) ? 0.8 : 0.04);
      });
      Array.prototype.forEach.call(ctx.gRadial.querySelectorAll('path[data-rad-glow]'), function (p) {
        var a = p.getAttribute('data-rad-glow'); if (!a) return;
        var s = a.split('|');
        p.setAttribute('stroke-opacity', (!on || set[s[0]] || set[s[1]]) ? 0.30 : 0.02);
      });
      Array.prototype.forEach.call(ctx.gChord.querySelectorAll('path'), function (p) {
        var s = p.getAttribute('data-chord').split('|'), b = +(p.getAttribute('data-base') || 0.1);
        p.setAttribute('stroke-opacity', (!on || set[s[0]] || set[s[1]]) ? Math.min(b * 2.2, 0.75) : 0.012);
      });
    }

    /* ---------- 核心词 ---------- */
    var bar = document.createElement('div');
    bar.className = 'tdn-chips';
    var all = document.createElement('button');
    all.className = 'tdn-chip tdn-all on'; all.textContent = '↺ 全网';
    all.title = '复位：看全网（也可点图面空白处或按 Esc）';
    bar.appendChild(all);
    var words = Object.keys(DATA.core);
    words.forEach(function (w) {
      var b = document.createElement('button');
      b.className = 'tdn-chip'; b.textContent = w; bar.appendChild(b);
    });
    var readout = document.createElement('div');
    readout.className = 'tdn-readout';
    var DEF = '点任一组，读它的原文、评说与牵连；点上方核心词或部名可点亮一片；点图面空白、按 Esc 或点「↺ 全网」回到全网。';
    readout.innerHTML = DEF;

    var legend = document.createElement('div');
    legend.className = 'tdn-legend';
    legend.innerHTML = '<span class="tdn-title">天网恢恢，疏而不失</span>' +
      ['一', '二', '三', '四'].map(function (d) {
        return '<button class="tdn-leg" data-dept="' + d + '" style="--c:' + COLOR[d] + '">' +
          '<b>' + d + '</b>' + SHORT[d] + '<i>' + DATA.nodes.filter(function (n) { return n.dept === d; }).length + ' 组</i></button>';
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
      Array.prototype.forEach.call(bar.children, function (x) {
        if (x === all) x.classList.toggle('on', !SEL.chip && !SEL.leg);
        else x.classList.toggle('on', x === SEL.chip);
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
    all.onclick = resetAll;
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
          '<b style="color:' + COLOR[d] + '">' + d + '部　' + SHORT[d] + '</b>　共 ' + ids.length + ' 组：' + jumpHTML(ids),
          btn, null);
      };
    });

    /* 核心词 */
    words.forEach(function (w, k) {
      bar.children[k + 1].onclick = function () {
        close();
        var ids = DATA.core[w];
        setSel(ids, '<b style="color:#dbe7ff">「' + w + '」</b> 落在 ' + ids.length + ' 组：' + jumpHTML(ids),
          null, bar.children[k + 1]);
      };
    });

    host.insertBefore(bar, ctx.stage);
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
        highlight([id]);                       /* 仅预览，不动 SEL */
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
    if (host && !host.dataset.built) { host.dataset.built = '1'; mount(host); }
  }
  window.__tdnBoot = boot;
  if (window.$docsify) {
    window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
      hook.doneEach(function () { boot(); });
    });
  } else if (document.readyState !== 'loading') { boot(); }
  else { document.addEventListener('DOMContentLoaded', boot); }
})();
