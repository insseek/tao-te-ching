/**
 * Docsify Starter — 可选微信公众号二维码
 *
 * 默认不显示。在 index.html 中填写 `wechat.qrcode` 后，
 * 右下角会出现二维码按钮，悬停 / 聚焦 / 点击展开公众号卡片。
 *
 * 配置示例：
 * wechat: {
 *   qrcode: '_media/wechat-qrcode.png',
 *   text: '微信扫码　关注公众号',
 * }
 *
 * `enabled: false` 也可以显式关闭。
 */
(() => {
  'use strict';

  const config = window.$docsify && window.$docsify.wechat;
  if (!config || config.enabled === false || !config.qrcode) {
    return;
  }

  const QRCODE = config.qrcode;
  const TEXT =
    typeof config.text === 'string' && config.text
      ? config.text
      : '微信扫码　关注公众号';

  const QR_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect width="5" height="5" x="3" y="3" rx="1"></rect>' +
    '<rect width="5" height="5" x="16" y="3" rx="1"></rect>' +
    '<rect width="5" height="5" x="3" y="16" rx="1"></rect>' +
    '<path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>' +
    '<path d="M21 21v.01"></path>' +
    '<path d="M12 7v3a2 2 0 0 1-2 2H7"></path>' +
    '<path d="M3 12h.01"></path>' +
    '<path d="M12 3h.01"></path>' +
    '<path d="M12 16v.01"></path>' +
    '<path d="M16 12h1"></path>' +
    '<path d="M21 12v.01"></path>' +
    '<path d="M12 21v-1"></path>' +
    '</svg>';

  const controls = document.getElementById('app-controls');
  if (!controls || document.getElementById('wechat-toggle')) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'wechat-control';

  const button = document.createElement('button');
  button.id = 'wechat-toggle';
  button.type = 'button';
  button.className = 'app-control';
  button.innerHTML = QR_ICON;
  button.setAttribute('aria-label', '微信公众号二维码');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'wechat-panel');

  const panel = document.createElement('div');
  panel.id = 'wechat-panel';
  panel.className = 'wechat-panel';
  panel.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.className = 'wechat-qrcode';
  image.src = QRCODE;
  image.alt = '微信公众号二维码';
  image.decoding = 'async';

  const text = document.createElement('p');
  text.className = 'wechat-text';
  text.textContent = TEXT;

  panel.append(image, text);
  wrapper.append(button, panel);
  controls.appendChild(wrapper);

  let pinned = false;

  /** 同步展开状态（CSS 负责显示，JS 负责 aria 与触屏 / 键盘状态）。 */
  function setOpen(open) {
    wrapper.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
  }

  // 悬停 / 聚焦临时展开；点击按钮固定展开，方便扫码时移开鼠标。
  button.addEventListener('click', () => {
    pinned = !pinned;
    setOpen(pinned);
  });
  wrapper.addEventListener('mouseenter', () => setOpen(true));
  wrapper.addEventListener('mouseleave', () => {
    if (!pinned) {
      setOpen(false);
    }
  });
  wrapper.addEventListener('focusin', () => setOpen(true));
  wrapper.addEventListener('focusout', event => {
    if (!pinned && !wrapper.contains(event.relatedTarget)) {
      setOpen(false);
    }
  });

  // Esc 在任意焦点位置都能收起。
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && wrapper.classList.contains('is-open')) {
      pinned = false;
      setOpen(false);
    }
  });

  // 点击卡片外部时收起。
  document.addEventListener('click', event => {
    if (!wrapper.contains(event.target)) {
      pinned = false;
      setOpen(false);
    }
  });

  // 路由切换时收起，避免浮层停留在新页面上。
  window.addEventListener('hashchange', () => {
    pinned = false;
    setOpen(false);
  });
})();
