// Минимальный трекер ЛЕНДИНГА. Лендинг (linkeon.io) и приложение
// (my.linkeon.io) — разные домены, поэтому раньше заходы на лендинг не
// учитывались вообще (видели только переходы лендинг→app). Из-за этого
// VK-клики на лендинг были «слепым пятном». Теперь лендинг шлёт landing_view с
// source на бэкенд приложения (CORS открыт), props.site='landing' — чтобы
// отличать верх воронки (клик по рекламе) от перехода в приложение.
const BACKEND = 'https://my.linkeon.io';

const getSource = (): string => {
  const p = new URLSearchParams(window.location.search);
  if (p.get('ref')) return `referral:${p.get('ref')}`;
  if (p.get('utm_source') || p.get('utm_campaign')) {
    let s = `utm:${p.get('utm_source') || p.get('utm_campaign')}`;
    const m = p.get('utm_medium');
    if (m) s += `/${m}`;
    return s;
  }
  if (document.referrer) {
    try {
      const h = new URL(document.referrer).hostname.replace(/^www\./, '');
      return h && h !== window.location.hostname ? `ref-site:${h}` : 'direct';
    } catch { return 'direct'; }
  }
  return 'direct';
};

const getCampaign = (): string | null => {
  const p = new URLSearchParams(window.location.search);
  const c = [p.get('utm_campaign'), p.get('utm_content')].filter(Boolean).join('/');
  return c || null;
};

// Один landing_view на сессию вкладки.
export const trackLandingVisit = (): void => {
  try {
    const KEY = 'lp_landing_tracked';
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, '1');
    let sid = sessionStorage.getItem('lp_sid');
    if (!sid) {
      sid = `lp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem('lp_sid', sid);
    }
    const body = JSON.stringify({
      name: 'landing_view',
      sessionId: sid,
      source: getSource(),
      props: { site: 'landing', campaign: getCampaign(), referrer: document.referrer || null },
    });
    void fetch(`${BACKEND}/webhook/events/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch { /* трекинг никогда не ломает лендинг */ }
};
