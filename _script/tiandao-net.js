/* ============================================================
   天网恢恢，疏而不失 · 里探《道德经》新编 关系图
   「天网恢恢，疏而不失」——道生一，一生二，二生三，三生万物
   点节点即读原文、评说与牵连；顺着连线可走遍全网。
   ============================================================ */
(function () {
  var DATA = {"depts": [{"key": "一", "name": "道生万物论（宇宙起源）"}, {"key": "二", "name": "道的属性和规律（自然规律）"}, {"key": "三", "name": "修身成圣（尊道不争）"}, {"key": "四", "name": "治国取天下（尊道无为）"}], "nodes": [{"id": "A1", "name": "道生万物", "dept": "一", "chs": [1, 4, 6, 25, 40, 42, 51, 52], "n": 14}, {"id": "B1", "name": "道法自然", "dept": "二", "chs": [6, 7, 14, 16, 21, 25, 34, 37, 39, 40, 58], "n": 12}, {"id": "B2", "name": "无之以为用", "dept": "二", "chs": [4, 5, 11, 45], "n": 4}, {"id": "B3", "name": "似或存（寂寥、惚恍）", "dept": "二", "chs": [4, 14, 21, 35], "n": 6}, {"id": "B4", "name": "道隐无名（不彰显）", "dept": "二", "chs": [27, 32, 41, 45, 67, 78], "n": 7}, {"id": "B5", "name": "玄德（生而不有，养而不为主，利而不害）", "dept": "二", "chs": [2, 8, 10, 21, 34, 41, 51, 81], "n": 10}, {"id": "B6", "name": "玄同（包容 无相 中和）", "dept": "二", "chs": [4, 5, 32, 55, 56, 62, 79], "n": 9}, {"id": "B7", "name": "柔弱胜刚强（由下向上）", "dept": "二", "chs": [2, 22, 26, 32, 36, 39, 43, 45, 55, 61, 63, 64, 66, 73, 76, 78], "n": 23}, {"id": "B8", "name": "满招损（由上向下）", "dept": "二", "chs": [9, 12, 23, 24, 30, 42, 55, 77, 81], "n": 12}, {"id": "C1", "name": "守道抱一", "dept": "三", "chs": [10, 15, 20, 23, 41, 52, 54, 70], "n": 18}, {"id": "C2", "name": "知常全生", "dept": "三", "chs": [16, 33, 50, 52, 55, 56, 72, 81], "n": 14}, {"id": "C3", "name": "知足知止", "dept": "三", "chs": [15, 24, 29, 32, 33, 42, 44, 46, 47, 52, 53, 58, 77], "n": 16}, {"id": "C4", "name": "常善救人", "dept": "三", "chs": [27, 49, 79], "n": 6}, {"id": "C5", "name": "不争之得：柔弱胜刚强", "dept": "三", "chs": [7, 13, 22, 28, 63, 66, 67, 71], "n": 18}, {"id": "D1", "name": "守道不失", "dept": "四", "chs": [25, 32, 35, 59, 62], "n": 6}, {"id": "D2", "name": "无为而治：无事、希言", "dept": "四", "chs": [2, 5, 10, 13, 17, 23, 29, 37, 43, 48, 57, 58, 60, 64], "n": 19}, {"id": "D3", "name": "不崇德、不尚贤、不见可欲", "dept": "四", "chs": [12, 18, 19, 38], "n": 8}, {"id": "D4", "name": "愚民", "dept": "四", "chs": [3, 65], "n": 5}, {"id": "D5", "name": "小国寡民", "dept": "四", "chs": [80], "n": 1}, {"id": "D6", "name": "谦下之得：柔弱胜刚强", "dept": "四", "chs": [26, 36, 39, 42, 61, 75, 78], "n": 9}, {"id": "D7", "name": "不滥杀、不用威", "dept": "四", "chs": [72, 74], "n": 2}, {"id": "D8", "name": "不以兵强天下（不得已而用）", "dept": "四", "chs": [30, 31, 46, 68, 69], "n": 9}], "radial": [["A1", "C1"], ["A1", "D1"], ["B1", "C2"], ["B1", "D2"], ["B4", "D3"], ["B5", "D8"], ["B6", "C4"], ["B7", "C5"], ["B7", "D6"], ["B8", "C3"], ["B8", "D7"]], "chord": [{"a": "A1", "b": "B1", "w": 3, "chs": [6, 25, 40]}, {"a": "A1", "b": "C3", "w": 2, "chs": [42, 52]}, {"a": "B1", "b": "B3", "w": 2, "chs": [14, 21]}, {"a": "B1", "b": "B5", "w": 2, "chs": [21, 34]}, {"a": "B1", "b": "D2", "w": 2, "chs": [37, 58]}, {"a": "B2", "b": "B6", "w": 2, "chs": [4, 5]}, {"a": "B4", "b": "B7", "w": 3, "chs": [32, 45, 78]}, {"a": "B5", "b": "C1", "w": 2, "chs": [10, 41]}, {"a": "B5", "b": "D2", "w": 2, "chs": [2, 10]}, {"a": "B6", "b": "B7", "w": 2, "chs": [32, 55]}, {"a": "B6", "b": "C2", "w": 2, "chs": [55, 56]}, {"a": "B6", "b": "D1", "w": 2, "chs": [32, 62]}, {"a": "B7", "b": "C5", "w": 3, "chs": [22, 63, 66]}, {"a": "B7", "b": "D2", "w": 3, "chs": [2, 43, 64]}, {"a": "B7", "b": "D6", "w": 5, "chs": [26, 36, 39, 61, 78]}, {"a": "B8", "b": "C2", "w": 2, "chs": [55, 81]}, {"a": "B8", "b": "C3", "w": 3, "chs": [24, 42, 77]}, {"a": "C1", "b": "C3", "w": 2, "chs": [15, 52]}, {"a": "C1", "b": "D2", "w": 2, "chs": [10, 23]}, {"a": "C2", "b": "C3", "w": 2, "chs": [33, 52]}, {"a": "C3", "b": "D2", "w": 2, "chs": [29, 58]}], "core": {"不争": ["B5", "C5", "D2", "D6", "D8"], "无为": ["B1", "D2"], "生而不有": ["A1", "B5", "C1"], "玄德": ["B5", "C1", "D8"], "玄同": ["B6", "C2", "C4"], "柔弱": ["B7", "C5", "D6"], "损有余而补不足": ["B8", "C3", "D7"], "道隐无名": ["B4", "D3"], "无之以为用": ["B2"], "似或存": ["B3"], "知常": ["C2"], "知足知止": ["C3"], "贵以贱为本": ["B7", "D6"], "愚民": ["D4"], "小国寡民": ["D5"], "用兵": ["D8"]}};

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

    var W = 2560, H = 1290;
    var svg = el('svg', {
      viewBox: (-W / 2) + ' ' + (-H / 2) + ' ' + W + ' ' + H,
      class: 'tdn-svg', preserveAspectRatio: 'xMidYMid meet'
    });
    var defs = el('defs');
    defs.innerHTML =
      '<radialGradient id="tdn-bg" cx="50%" cy="50%" r="55%">' +
        '<stop offset="0%" stop-color="#16244d"/><stop offset="45%" stop-color="#0a1128"/>' +
        '<stop offset="100%" stop-color="#04060f"/></radialGradient>' +
      '<filter id="tdn-glow" x="-90%" y="-90%" width="280%" height="280%">' +
        '<feGaussianBlur stdDeviation="7" result="b"/><feMerge>' +
        '<feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="tdn-soft" x="-60%" y="-60%" width="220%" height="220%">' +
        '<feGaussianBlur stdDeviation="3.4"/></filter>';
    svg.appendChild(defs);
    svg.appendChild(el('rect', { x: -W / 2, y: -H / 2, width: W, height: H, fill: 'url(#tdn-bg)' }));

    var gRing = el('g'), gChord = el('g'), gRadial = el('g'), gPulse = el('g'), gNode = el('g');
    [gRing, gChord, gRadial, gPulse, gNode].forEach(function (g) { svg.appendChild(g); });

    order.forEach(function (d) {
      var R = RING[d], c = COLOR[d];
      gRing.appendChild(el('ellipse', {
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
      gRadial.appendChild(path);
      var dot = el('circle', { r: 4.8, fill: COLOR[byId[pair[1]].dept], filter: 'url(#tdn-glow)', opacity: 0.95 });
      var am = el('animateMotion', { dur: '3.6s', repeatCount: 'indefinite', begin: (i * 0.32) + 's' });
      var mp = el('mpath'); mp.setAttribute('href', '#' + id);
      am.appendChild(mp); dot.appendChild(am); gPulse.appendChild(dot);
    });

    var nodeEls = {};
    DATA.nodes.forEach(function (n) {
      var p = pos[n.id], c = COLOR[n.dept], r = p.r;
      var g = el('g', { class: 'tdn-node', 'data-id': n.id, style: 'cursor:pointer' });
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r + 9, fill: c, opacity: 0.14, filter: 'url(#tdn-soft)' }));
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r, fill: '#0a1128', stroke: c, 'stroke-width': 2.4 }));
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r * 0.42, fill: c, filter: 'url(#tdn-glow)' }));
      var cos = Math.cos(p.a), vertical = Math.abs(cos) < 0.34, anchor, lx, ly;
      if (vertical) { anchor = 'middle'; lx = p.x; ly = p.y < 0 ? p.y - r - 40 : p.y + r + 26; }
      else if (cos > 0) { anchor = 'start'; lx = p.x + r + 16; ly = p.y + 6; }
      else { anchor = 'end'; lx = p.x - r - 16; ly = p.y + 6; }
      g.appendChild(tx(lx, ly, n.id, {
        fill: '#e8eefc', 'font-size': 26, 'font-weight': 700, 'text-anchor': anchor,
        style: 'paint-order:stroke;stroke:#04060f;stroke-width:5'
      }));
      g.appendChild(tx(lx, ly + 26, n.name.length > 16 ? n.name.slice(0, 16) + '…' : n.name, {
        fill: c, 'font-size': 21, 'text-anchor': anchor, 'fill-opacity': 0.95,
        style: 'paint-order:stroke;stroke:#04060f;stroke-width:5'
      }));
      gNode.appendChild(g); nodeEls[n.id] = g;
    });

    var gc = el('g');
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 56, fill: 'none', stroke: '#f8fafc', 'stroke-opacity': .38, 'stroke-width': 1.4 }));
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 34, fill: '#f8fafc', opacity: .13, filter: 'url(#tdn-glow)' }));
    gc.appendChild(tx(0, 16, '道', {
      fill: '#f8fafc', 'font-size': 56, 'font-weight': 700, 'text-anchor': 'middle', filter: 'url(#tdn-glow)'
    }));
    gNode.appendChild(gc);

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

    function close() { drawer.classList.remove('open'); }
    drawer.querySelector('.tdn-x').onclick = close;
    drawer.querySelector('.tdn-mask').onclick = close;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    function open(id) {
      var n = byId[id], c = COLOR[n.dept];
      head.innerHTML =
        '<span class="tdn-badge" style="--c:' + c + '">' + n.dept + '部　' + SHORT[n.dept] + '</span>' +
        '<h3>' + esc(id) + '　' + esc(n.name) + '</h3>' +
        '<p class="tdn-meta">收录 <b>' + n.chs.length + '</b> 章 · <b>' + n.n + '</b> 句　' +
        n.chs.map(function (x) { return '<a class="tdn-ch" href="index.html#/' + pad(x) + '">' + pad(x) + '</a>'; })
          .join('<span class="tdn-sep">·</span>') + '</p>';
      body.innerHTML = '<p class="tdn-loading">正在读取原文…</p>';
      drawer.classList.add('open');
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
      DATA.nodes.forEach(function (n) { ctx.nodeEls[n.id].style.opacity = (!on || set[n.id]) ? 1 : 0.12; });
      Array.prototype.forEach.call(ctx.gRadial.querySelectorAll('path'), function (p) {
        var s = p.getAttribute('data-rad').split('|');
        p.setAttribute('stroke-opacity', (!on || set[s[0]] || set[s[1]]) ? 0.8 : 0.04);
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
    all.className = 'tdn-chip on'; all.textContent = '全 网';
    bar.appendChild(all);
    var words = Object.keys(DATA.core);
    words.forEach(function (w) {
      var b = document.createElement('button');
      b.className = 'tdn-chip'; b.textContent = w; bar.appendChild(b);
    });
    var readout = document.createElement('div');
    readout.className = 'tdn-readout';
    var DEF = '点任一组，读它的原文、评说与牵连；或点上方核心词，点亮全网。';
    readout.innerHTML = DEF;

    var legend = document.createElement('div');
    legend.className = 'tdn-legend';
    legend.innerHTML = '<span class="tdn-title">天网恢恢，疏而不失</span>' +
      ['一', '二', '三', '四'].map(function (d) {
        return '<button class="tdn-leg" data-dept="' + d + '" style="--c:' + COLOR[d] + '">' +
          '<b>' + d + '</b>' + SHORT[d] + '<i>' + DATA.nodes.filter(function (n) { return n.dept === d; }).length + ' 组</i></button>';
      }).join('');

    function reset() {
      Array.prototype.forEach.call(bar.children, function (x) { x.classList.remove('on'); });
      all.classList.add('on');
    }
    function clearLeg() {
      Array.prototype.forEach.call(legend.querySelectorAll('.tdn-leg'), function (x) { x.classList.remove('on'); });
    }
    function resetAll() { reset(); clearLeg(); }
    all.onclick = function () { resetAll(); highlight(null); close(); readout.innerHTML = DEF; };

    Array.prototype.forEach.call(legend.querySelectorAll('.tdn-leg'), function (btn) {
      btn.onclick = function () {
        var d = btn.getAttribute('data-dept');
        var on = btn.classList.contains('on');
        reset(); close();
        if (on) { clearLeg(); highlight(null); readout.innerHTML = DEF; return; }
        clearLeg(); btn.classList.add('on');
        var ids = DATA.nodes.filter(function (n) { return n.dept === d; }).map(function (n) { return n.id; });
        highlight(ids);
        readout.innerHTML = '<b style="color:' + COLOR[d] + '">' + d + '部　' + SHORT[d] + '</b>' +
          '　共 ' + ids.length + ' 组：' +
          ids.map(function (i) {
            var n = byId[i];
            return '<button class="tdn-jump" data-id="' + i + '" style="--c:' + COLOR[n.dept] + '">' + i + ' ' + esc(n.name) + '</button>';
          }).join('');
        Array.prototype.forEach.call(readout.querySelectorAll('.tdn-jump'), function (x) {
          x.onclick = function () { open(x.getAttribute('data-id')); };
        });
      };
    });
    words.forEach(function (w, k) {
      bar.children[k + 1].onclick = function () {
        Array.prototype.forEach.call(bar.children, function (x) { x.classList.remove('on'); });
        bar.children[k + 1].classList.add('on');
        close();
        var ids = DATA.core[w];
        highlight(ids);
        readout.innerHTML = '<b style="color:#dbe7ff">「' + w + '」</b> 落在 ' + ids.length + ' 组：' +
          ids.map(function (i) {
            var n = byId[i];
            return '<button class="tdn-jump" data-id="' + i + '" style="--c:' + COLOR[n.dept] + '">' + i + ' ' + esc(n.name) + '</button>';
          }).join('');
        Array.prototype.forEach.call(readout.querySelectorAll('.tdn-jump'), function (x) {
          x.onclick = function () { open(x.getAttribute('data-id')); };
        });
      };
    });
    host.insertBefore(bar, ctx.stage);
    host.insertBefore(legend, ctx.stage);
    host.insertBefore(readout, ctx.stage);

    Object.keys(ctx.nodeEls).forEach(function (id) {
      var g = ctx.nodeEls[id], n = byId[id];
      g.style.transition = 'opacity .25s';
      g.addEventListener('mouseenter', function () {
        highlight([id]);
        readout.innerHTML = '<b style="color:' + COLOR[n.dept] + '">' + id + '　' + esc(n.name) + '</b>' +
          '　收录 <b>' + n.chs.length + '</b> 章 / <b>' + n.n + '</b> 句　·　点它读原文';
      });
      g.addEventListener('mouseleave', function () {
        if (!drawer.classList.contains('open')) { highlight(null); resetAll(); readout.innerHTML = DEF; }
      });
      g.addEventListener('click', function () { open(id); });
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
