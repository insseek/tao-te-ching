
/* ============================================================
   天道大网 · 里探《道德经》新编 关系图
   「天网恢恢，疏而不失」——道生一，一生二，二生三，三生万物
   ============================================================ */
(function () {
  var DATA = {"depts": [{"key": "一", "name": "道生万物论（宇宙起源）"}, {"key": "二", "name": "道的属性和规律（自然规律）"}, {"key": "三", "name": "修身成圣（尊道不争）"}, {"key": "四", "name": "治国取天下（尊道无为）"}], "nodes": [{"id": "A1", "name": "道生万物", "dept": "一", "chs": [1, 4, 6, 25, 40, 42, 51, 52], "n": 14}, {"id": "B1", "name": "道法自然", "dept": "二", "chs": [6, 7, 14, 16, 21, 25, 34, 37, 39, 40, 58], "n": 12}, {"id": "B2", "name": "无之以为用", "dept": "二", "chs": [4, 5, 11, 45], "n": 4}, {"id": "B3", "name": "似或存（寂寥、惚恍）", "dept": "二", "chs": [4, 14, 21, 35], "n": 6}, {"id": "B4", "name": "道隐无名（不彰显）", "dept": "二", "chs": [27, 32, 41, 45, 67, 78], "n": 7}, {"id": "B5", "name": "玄德（生而不有，养而不为主，利而不害）", "dept": "二", "chs": [2, 8, 10, 21, 34, 41, 51, 81], "n": 10}, {"id": "B6", "name": "玄同（包容 无相 中和）", "dept": "二", "chs": [4, 5, 32, 55, 56, 62, 79], "n": 9}, {"id": "B7", "name": "柔弱胜刚强（由下向上）", "dept": "二", "chs": [2, 22, 26, 32, 36, 39, 43, 45, 55, 61, 63, 64, 66, 73, 76, 78], "n": 23}, {"id": "B8", "name": "满招损（由上向下）", "dept": "二", "chs": [9, 12, 23, 24, 30, 42, 55, 77, 81], "n": 12}, {"id": "C1", "name": "守道抱一", "dept": "三", "chs": [10, 15, 20, 23, 41, 52, 54, 70], "n": 18}, {"id": "C2", "name": "知常全生", "dept": "三", "chs": [16, 33, 50, 52, 55, 56, 72, 81], "n": 14}, {"id": "C3", "name": "知足知止", "dept": "三", "chs": [15, 24, 29, 32, 33, 42, 44, 46, 47, 52, 53, 58, 77], "n": 16}, {"id": "C4", "name": "常善救人", "dept": "三", "chs": [27, 49, 79], "n": 6}, {"id": "C5", "name": "不争之得：柔弱胜刚强", "dept": "三", "chs": [7, 13, 22, 28, 63, 66, 67, 71], "n": 18}, {"id": "D1", "name": "守道不失", "dept": "四", "chs": [25, 32, 35, 59, 62], "n": 6}, {"id": "D2", "name": "无为而治：无事、希言", "dept": "四", "chs": [2, 5, 10, 13, 17, 23, 29, 37, 43, 48, 57, 58, 60, 64], "n": 19}, {"id": "D3", "name": "不崇德、不尚贤、不见可欲", "dept": "四", "chs": [12, 18, 19, 38], "n": 8}, {"id": "D4", "name": "愚民", "dept": "四", "chs": [3, 65], "n": 5}, {"id": "D5", "name": "小国寡民", "dept": "四", "chs": [80], "n": 1}, {"id": "D6", "name": "谦下之得：柔弱胜刚强", "dept": "四", "chs": [26, 36, 39, 42, 61, 75, 78], "n": 9}, {"id": "D7", "name": "不滥杀、不用威", "dept": "四", "chs": [72, 74], "n": 2}, {"id": "D8", "name": "不以兵强天下（不得已而用）", "dept": "四", "chs": [30, 31, 46, 68, 69], "n": 9}], "radial": [["A1", "C1"], ["A1", "D1"], ["B1", "C2"], ["B1", "D2"], ["B4", "D3"], ["B5", "D8"], ["B6", "C4"], ["B7", "C5"], ["B7", "D6"], ["B8", "C3"], ["B8", "D7"]], "chord": [{"a": "A1", "b": "B1", "w": 3, "chs": [6, 25, 40]}, {"a": "A1", "b": "C3", "w": 2, "chs": [42, 52]}, {"a": "B1", "b": "B3", "w": 2, "chs": [14, 21]}, {"a": "B1", "b": "B5", "w": 2, "chs": [21, 34]}, {"a": "B1", "b": "D2", "w": 2, "chs": [37, 58]}, {"a": "B2", "b": "B6", "w": 2, "chs": [4, 5]}, {"a": "B4", "b": "B7", "w": 3, "chs": [32, 45, 78]}, {"a": "B5", "b": "C1", "w": 2, "chs": [10, 41]}, {"a": "B5", "b": "D2", "w": 2, "chs": [2, 10]}, {"a": "B6", "b": "B7", "w": 2, "chs": [32, 55]}, {"a": "B6", "b": "C2", "w": 2, "chs": [55, 56]}, {"a": "B6", "b": "D1", "w": 2, "chs": [32, 62]}, {"a": "B7", "b": "C5", "w": 3, "chs": [22, 63, 66]}, {"a": "B7", "b": "D2", "w": 3, "chs": [2, 43, 64]}, {"a": "B7", "b": "D6", "w": 5, "chs": [26, 36, 39, 61, 78]}, {"a": "B8", "b": "C2", "w": 2, "chs": [55, 81]}, {"a": "B8", "b": "C3", "w": 3, "chs": [24, 42, 77]}, {"a": "C1", "b": "C3", "w": 2, "chs": [15, 52]}, {"a": "C1", "b": "D2", "w": 2, "chs": [10, 23]}, {"a": "C2", "b": "C3", "w": 2, "chs": [33, 52]}, {"a": "C3", "b": "D2", "w": 2, "chs": [29, 58]}], "core": {"不争": ["B5", "C5", "D2", "D6", "D8"], "无为": ["B1", "D2"], "生而不有": ["A1", "B5", "C1"], "玄德": ["B5", "C1", "D8"], "玄同": ["B6", "C2", "C4"], "柔弱": ["B7", "C5", "D6"], "损有余而补不足": ["B8", "C3", "D7"], "道隐无名": ["B4", "D3"], "无之以为用": ["B2"], "似或存": ["B3"], "知常": ["C2"], "知足知止": ["C3"], "贵以贱为本": ["B7", "D6"], "愚民": ["D4"], "小国寡民": ["D5"], "用兵": ["D8"]}};

  var COLOR = { '一': '#f6c453', '二': '#38bdf8', '三': '#34d399', '四': '#a78bfa' };
  var RING  = { '一': 178, '二': 318, '三': 458, '四': 598 };
  var NUM   = { '一': '一', '二': '二', '三': '三', '四': '四' };
  var SEQ   = { '一': '道生一', '二': '一生二', '三': '二生三', '四': '三生万物' };
  var SHORT = { '一': '道生万物论', '二': '道的属性和规律', '三': '修身成圣', '四': '治国取天下' };
  var OFF   = { '一': 0, '二': Math.PI / 8, '三': 0, '四': Math.PI / 8 };
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    return e;
  }
  function txt(x, y, s, attrs) {
    var t = el('text', Object.assign({ x: x, y: y, 'font-family': '-apple-system,"PingFang SC","Microsoft YaHei",sans-serif' }, attrs || {}));
    t.textContent = s; return t;
  }

  function build(host) {
    var byId = {};
    DATA.nodes.forEach(function (n) { byId[n.id] = n; });

    var order = ['一', '二', '三', '四'], groups = {};
    order.forEach(function (d) { groups[d] = DATA.nodes.filter(function (n) { return n.dept === d; }); });

    var pos = {};
    order.forEach(function (d) {
      var list = groups[d], R = RING[d], off = OFF[d];
      list.forEach(function (n, i) {
        var a = -Math.PI / 2 + off + (i * 2 * Math.PI) / list.length;
        pos[n.id] = { x: Math.cos(a) * R, y: Math.sin(a) * R, a: a, r: 10 + Math.sqrt(n.n) * 3.1 };
      });
    });

    var W = 1980, H = 1520;
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

    /* ---- 同心环：环上只标 一二三四，部名移入 HTML 图例 ---- */
    order.forEach(function (d, idx) {
      var R = RING[d], c = COLOR[d];
      gRing.appendChild(el('circle', {
        cx: 0, cy: 0, r: R, fill: 'none', stroke: c, 'stroke-opacity': 0.26,
        'stroke-width': 1.4, 'stroke-dasharray': '3 9'
      }));
      /* 左上角竖排图例：部序 + 部名 + 生成序列，避开图面 */
      var ly0 = -H / 2 + 78, step = 72, lx0 = -W / 2 + 54;
      gRing.appendChild(el('circle', { cx: lx0 + 12, cy: ly0 + idx * step - 12, r: 9, fill: c, filter: 'url(#tdn-glow)' }));
      gRing.appendChild(txt(lx0 + 34, ly0 + idx * step, NUM[d], {
        fill: c, 'font-size': 40, 'font-weight': 700, 'text-anchor': 'middle', filter: 'url(#tdn-glow)'
      }));
      gRing.appendChild(txt(lx0 + 66, ly0 + idx * step - 2, SHORT[d], {
        fill: c, 'font-size': 24, 'font-weight': 600, 'text-anchor': 'start'
      }));
      gRing.appendChild(txt(lx0 + 66, ly0 + idx * step + 22, SEQ[d], {
        fill: c, 'fill-opacity': 0.62, 'font-size': 17, 'text-anchor': 'start', 'letter-spacing': 2
      }));
    });

    /* ---- 共章弦 ---- */
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

    /* ---- 源 → 用 + 流动脉冲 ---- */
    DATA.radial.forEach(function (pair, i) {
      var p = pos[pair[0]], q = pos[pair[1]];
      if (!p || !q) return;
      var mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
      var dx = q.x - p.x, dy = q.y - p.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
      var cx = mx + (-dy / len) * 30, cy = my + (dx / len) * 30;
      var id = 'tdn-rad-' + i;
      gRadial.appendChild((function () {
        var path = el('path', {
          id: id, d: 'M' + p.x + ',' + p.y + ' Q' + cx + ',' + cy + ' ' + q.x + ',' + q.y,
          fill: 'none', stroke: COLOR[byId[pair[0]].dept], 'stroke-opacity': 0.5,
          'stroke-width': 1.9, 'data-rad': pair[0] + '|' + pair[1]
        });
        var t = el('title'); t.textContent = pair[0] + ' → ' + pair[1]; path.appendChild(t);
        return path;
      })());
      var dot = el('circle', { r: 4.8, fill: COLOR[byId[pair[1]].dept], filter: 'url(#tdn-glow)', opacity: 0.95 });
      var am = el('animateMotion', { dur: '3.6s', repeatCount: 'indefinite', begin: (i * 0.32) + 's' });
      var mp = el('mpath'); mp.setAttribute('href', '#' + id);
      am.appendChild(mp); dot.appendChild(am); gPulse.appendChild(dot);
    });

    /* ---- 节点 ---- */
    var nodeEls = {};
    DATA.nodes.forEach(function (n) {
      var p = pos[n.id], c = COLOR[n.dept], r = p.r;
      var g = el('g', { class: 'tdn-node', 'data-id': n.id, style: 'cursor:pointer' });
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r + 9, fill: c, opacity: 0.14, filter: 'url(#tdn-soft)' }));
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r, fill: '#0a1128', stroke: c, 'stroke-width': 2.4 }));
      g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r * 0.42, fill: c, filter: 'url(#tdn-glow)' }));

      var cos = Math.cos(p.a), vertical = Math.abs(cos) < 0.34;
      var anchor, lx, ly;
      if (vertical) { anchor = 'middle'; lx = p.x; ly = p.y < 0 ? p.y - r - 40 : p.y + r + 26; }
      else if (cos > 0) { anchor = 'start'; lx = p.x + r + 16; ly = p.y + 6; }
      else { anchor = 'end'; lx = p.x - r - 16; ly = p.y + 6; }

      g.appendChild(txt(lx, ly, n.id, {
        fill: '#e8eefc', 'font-size': 23, 'font-weight': 700, 'text-anchor': anchor,
        style: 'paint-order:stroke;stroke:#04060f;stroke-width:5'
      }));
      g.appendChild(txt(lx, ly + 26, n.name.length > 16 ? n.name.slice(0, 16) + '…' : n.name, {
        fill: c, 'font-size': 18.5, 'text-anchor': anchor, 'fill-opacity': 0.95,
        style: 'paint-order:stroke;stroke:#04060f;stroke-width:5'
      }));
      gNode.appendChild(g);
      nodeEls[n.id] = g;
    });

    /* ---- 中心：道 ---- */
    var gc = el('g');
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 56, fill: 'none', stroke: '#f8fafc', 'stroke-opacity': .38, 'stroke-width': 1.4 }));
    gc.appendChild(el('circle', { cx: 0, cy: 0, r: 34, fill: '#f8fafc', opacity: .13, filter: 'url(#tdn-glow)' }));
    gc.appendChild(txt(0, 16, '道', {
      fill: '#f8fafc', 'font-size': 50, 'font-weight': 700, 'text-anchor': 'middle', filter: 'url(#tdn-glow)'
    }));
    gNode.appendChild(gc);

    host.appendChild(svg);
    return { svg: svg, nodeEls: nodeEls, byId: byId, gChord: gChord, gRadial: gRadial, gPulse: gPulse, pos: pos };
  }

  function mount(host) {
    /* 关系图需要更宽的内容栏 */
    var content = host.closest ? host.closest('.content') : null;
    if (content) content.classList.add('tdn-wide');

    var ctx = build(host);

    var readout = document.createElement('div');
    readout.className = 'tdn-readout';
    readout.innerHTML = '悬停任一组，看它的章句与牵连；或点上方核心词，点词亮全网。';

    function highlight(ids) {
      var set = {}; (ids || []).forEach(function (i) { set[i] = 1; });
      var on = Object.keys(set).length > 0;
      DATA.nodes.forEach(function (n) {
        var g = ctx.nodeEls[n.id];
        g.style.opacity = (!on || set[n.id]) ? 1 : 0.12;
      });
      Array.prototype.forEach.call(ctx.gRadial.querySelectorAll('path'), function (p) {
        var s = p.getAttribute('data-rad').split('|');
        p.setAttribute('stroke-opacity', (!on || set[s[0]] || set[s[1]]) ? 0.8 : 0.04);
      });
      Array.prototype.forEach.call(ctx.gChord.querySelectorAll('path'), function (p) {
        var s = p.getAttribute('data-chord').split('|'), b = +(p.getAttribute('data-base') || 0.1);
        p.setAttribute('stroke-opacity', (!on || set[s[0]] || set[s[1]]) ? Math.min(b * 2.2, 0.75) : 0.012);
      });
    }

    /* 核心词 */
    var bar = document.createElement('div');
    bar.className = 'tdn-chips';
    var all = document.createElement('button');
    all.className = 'tdn-chip on'; all.textContent = '全 网';
    all.onclick = function () { reset(); highlight(null); readout.innerHTML = DEF; };
    bar.appendChild(all);
    Object.keys(DATA.core).forEach(function (w) {
      var b = document.createElement('button');
      b.className = 'tdn-chip'; b.textContent = w;
      b.onclick = function () {
        Array.prototype.forEach.call(bar.children, function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        var ids = DATA.core[w];
        highlight(ids);
        readout.innerHTML = '<b style="color:#dbe7ff">「' + w + '」</b> 落在 ' + ids.length + ' 组：' +
          ids.map(function (i) {
            var n = ctx.byId[i];
            return '<span class="tdn-tag" style="border-color:' + COLOR[n.dept] + ';color:' + COLOR[n.dept] + '">' +
              i + ' ' + n.name + '</span>';
          }).join('');
      };
      bar.appendChild(b);
    });
    host.insertBefore(bar, ctx.svg);
    host.insertBefore(readout, ctx.svg.nextSibling);

    var DEF = readout.innerHTML;
    function reset() { Array.prototype.forEach.call(bar.children, function (x) { x.classList.remove('on'); }); all.classList.add('on'); }

    Object.keys(ctx.nodeEls).forEach(function (id) {
      var g = ctx.nodeEls[id], n = ctx.byId[id];
      g.addEventListener('mouseenter', function () {
        highlight([id]);
        readout.innerHTML = '<b style="color:' + COLOR[n.dept] + '">' + id + '　' + n.name + '</b>' +
          '　收录 <b>' + n.chs.length + '</b> 章 / <b>' + n.n + '</b> 句　·　' +
          n.chs.map(function (c) { return ('0' + c).slice(-2); }).join(' ');
      });
      g.addEventListener('mouseleave', function () { highlight(null); reset(); readout.innerHTML = DEF; });
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
