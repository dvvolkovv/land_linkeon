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
      props: { site: 'landing', path: window.location.pathname, campaign: getCampaign(), referrer: document.referrer || null },
    });
    void fetch(`${BACKEND}/webhook/events/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch { /* трекинг никогда не ломает лендинг */ }
};

// Разовый «итог визита» на лендинг — отправляется ОДИН раз при уходе со страницы
// (скрытие вкладки / закрытие / переход в app) через sendBeacon. Нужен, чтобы
// разложить 96%-й отвал «landing_view → не кликнул»: мы видим, что не кликают, но
// не ЗНАЕМ почему. Эти поля классифицируют отвал без A/B (на нашем малом трафике
// A/B бесполезен):
//   • dwellMs<2000 & maxScrollPct<15      → мгновенный отскок (внимание/скорость/мисматч)
//   • ctaSeen && !ctaClicked              → кнопку УВИДЕЛ, но не нажал (оффер/доверие)
//   • !ctaSeen                            → ушёл, не докрутив до кнопки (первый экран не зацепил)
export const initLandingEngagement = (): void => {
  try {
    const startedAt = Date.now();
    let maxScrollPct = 0;
    let ctaSeen = false;
    let ctaClicked = false;
    let sent = false;

    const onScroll = (): void => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? Math.round((doc.scrollTop / scrollable) * 100) : 100;
      if (pct > maxScrollPct) maxScrollPct = pct;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Увидел ли пользователь хоть одну CTA-кнопку (≥50% в вьюпорте). React
    // рендерит не сразу — навешиваем наблюдатель после двух кадров, когда DOM
    // готов.
    if ('IntersectionObserver' in window) {
      let mo: MutationObserver | undefined;
      const io = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            ctaSeen = true;
            io.disconnect();
            // Ответ получен — следить за DOM дальше незачем.
            mo?.disconnect();
            return;
          }
        }
      }, { threshold: 0.5 });
      // Кнопки, уже отданные io: по ним отличаем кнопки новой отрисовки.
      const known = new WeakSet<Element>();
      /** Подписывает io на ещё не наблюдаемые кнопки; true — нашлась новая. */
      const observeNew = (): boolean => {
        let found = false;
        // querySelectorAll по document отдаёт только подключённые к нему
        // элементы: отцепленные кнопки пререндера сюда не попадут.
        document.querySelectorAll('[data-cta]').forEach((el) => {
          if (known.has(el)) return;
          known.add(el);
          io.observe(el);
          found = true;
        });
        return found;
      };
      requestAnimationFrame(() => requestAnimationFrame(observeNew));
      // Первая отрисовка React может прийти позже двух кадров: на страницах
      // ассистентов сначала грузится чанк текстов, и createRoot заменяет
      // пререндеренный DOM новым — кнопки, за которыми следили, отцеплены и с
      // экраном уже не пересекутся. MutationObserver подхватывает кнопки ЭТОЙ
      // отрисовки и отключается, как только нашёл новые: кнопки, появившиеся
      // много позже (header-start в мобильном меню при открытии), в «увидел
      // кнопку» не идут — иначе на телефоне метрика сменила бы смысл
      // относительно истории. Наблюдаем #root — туда рисует React; посторонние
      // вставки в body (пиксели, расширения) колбэк не будят.
      if ('MutationObserver' in window) {
        mo = new MutationObserver(() => {
          if (ctaSeen || observeNew()) mo?.disconnect();
        });
        mo.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
      }
    }

    document.addEventListener('click', (e) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-cta]')) ctaClicked = true;
    }, { capture: true });

    const send = (): void => {
      if (sent) return;
      sent = true;
      const sid = sessionStorage.getItem('lp_sid') || 'lp_unknown';
      const body = JSON.stringify({
        name: 'landing_engagement',
        sessionId: sid,
        source: getSource(),
        props: {
          site: 'landing',
          path: window.location.pathname,
          dwellMs: Date.now() - startedAt,
          maxScrollPct,
          ctaSeen,
          ctaClicked,
          seg: new URLSearchParams(window.location.search).get('seg') || null,
          campaign: getCampaign(),
        },
      });
      // ВАЖНО: НЕ sendBeacon. Лендинг (linkeon.io) шлёт на my.linkeon.io — это
      // cross-origin. sendBeacon с Content-Type application/json требует CORS-
      // preflight, которого beacon делать не умеет → запрос молча дропается
      // (поймали: 20 landing_view, 0 landing_engagement). fetch+keepalive
      // проходит CORS (как landing_view) и переживает уход со страницы.
      try {
        void fetch(`${BACKEND}/webhook/events/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => {});
      } catch { /* ignore */ }
    };

    // pagehide надёжнее unload на мобильных; visibilitychange ловит уход в фон/переход.
    window.addEventListener('pagehide', send, { capture: true });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') send(); });
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
        props: { site: 'landing', cta, path: window.location.pathname, campaign: getCampaign() },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch { /* трекинг не ломает лендинг */ }
};
