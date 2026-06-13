// Минимальный трекер ЛЕНДИНГА. Лендинг (linkeon.io) и приложение
// (my.linkeon.io) — разные домены, поэтому раньше заходы на лендинг не
// учитывались вообще (видели только переходы лендинг→app). Из-за этого
// VK-клики на лендинг были «слепым пятном». Теперь лендинг шлёт landing_view с
// source на бэкенд приложения (CORS открыт), props.site='landing' — чтобы
// отличать верх воронки (клик по рекламе) от перехода в приложение.
import { getAttribution } from './attribution';

const BACKEND = 'https://my.linkeon.io';

// Метки берём из persistAttribution() (URL → localStorage), а не из «живого»
// URL: иначе при перезагрузке/скролле/внутреннем якоре метка терялась.
const getSource = (): string => {
  const a = getAttribution();
  if (a.ref) return `referral:${a.ref}`;
  if (a.utm_source || a.utm_campaign) {
    let s = `utm:${a.utm_source || a.utm_campaign}`;
    if (a.utm_medium) s += `/${a.utm_medium}`;
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
  const a = getAttribution();
  const c = [a.utm_campaign, a.utm_content].filter(Boolean).join('/');
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

// Клик по CTA лендинга (кнопка «Начать» и пр.) — пишем в НАШУ БД, чтобы видеть
// шаг «загрузка лендинга → клик по кнопке» (раньше клики уходили только в Я.Метрику,
// и провал лендинг→app нельзя было разложить). Это закрывает пробел в воронке.
export const trackLandingCta = (cta: string): void => {
  try {
    const sid = sessionStorage.getItem('lp_sid') || 'lp_unknown';
    void fetch(`${BACKEND}/webhook/events/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'landing_cta_click',
        sessionId: sid,
        source: getSource(),
        props: { site: 'landing', cta, campaign: getCampaign() },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* трекинг не ломает лендинг */ }
};
