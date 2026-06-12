// VK Ads пиксель (top.Mail.Ru 3773048) на лендинге — фиксирует pageView, чтобы
// VK связал клик по рекламе с визитом. Цель «registration» срабатывает уже в
// приложении (my.linkeon.io). Тот же counter id на обоих доменах. (бэклог 46b21d27)
const VK_PIXEL_ID = '3773048';

declare global {
  interface Window { _tmr?: Array<Record<string, unknown>>; }
}

export function initVkPixel(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  try {
    const _tmr = (window._tmr = window._tmr || []);
    _tmr.push({ id: VK_PIXEL_ID, type: 'pageView', start: Date.now() });
    if (document.getElementById('tmr-code')) return;
    const ts = document.createElement('script');
    ts.type = 'text/javascript';
    ts.async = true;
    ts.id = 'tmr-code';
    ts.src = 'https://top-fwz1.mail.ru/js/code.js';
    const s = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(ts, s);
  } catch { /* пиксель не ломает лендинг */ }
}
