import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Заход и клик пишутся в нашу таблицу событий. Без пути страницы не видно,
 * какие страницы ассистентов получают заходы из поиска — а ради этого они и
 * делались. Окружение браузера подменяется: vitest здесь идёт в node.
 */
function stubBrowser(pathname: string) {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  vi.stubGlobal('window', { location: { pathname, search: '', hostname: 'linkeon.io' } });
  vi.stubGlobal('document', { referrer: 'https://yandex.ru/' });
  vi.stubGlobal('sessionStorage', storage);
  vi.stubGlobal('localStorage', storage);
  // Сигнатура — параметром типа, а не неиспользуемыми аргументами: так
  // mock.calls типизирован, а линтер не ругается на лишние параметры.
  const fetch = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response(null));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

const bodyOf = (fetch: ReturnType<typeof stubBrowser>) =>
  JSON.parse(fetch.mock.calls[0][1]!.body as string);

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('события лендинга знают путь страницы', () => {
  it('landing_view', async () => {
    const fetch = stubBrowser('/assistants/raya/');
    const { trackLandingVisit } = await import('./track');
    trackLandingVisit();
    expect(bodyOf(fetch).props.path).toBe('/assistants/raya/');
    expect(bodyOf(fetch).source).toBe('ref-site:yandex.ru');
  });

  it('landing_cta_click', async () => {
    const fetch = stubBrowser('/en/assistants/alexey/');
    const { trackLandingCta } = await import('./track');
    trackLandingCta('assistant-start');
    expect(bodyOf(fetch).props).toMatchObject({ cta: 'assistant-start', path: '/en/assistants/alexey/' });
  });
});

/**
 * Стенд для initLandingEngagement: браузерные наблюдатели подменены
 * заглушками, которыми тест управляет вручную. Заглушка MutationObserver ведёт
 * себя как настоящий: после disconnect() колбэк больше не зовётся — поэтому
 * мутации тест пускает только через mutate().
 */
async function engagementStand() {
  type IOEntry = { isIntersecting: boolean; target: object };
  type IOCallback = (entries: IOEntry[]) => void;

  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  const fetch = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response(null));

  // Что сейчас лежит в документе под [data-cta].
  let buttons: object[] = [];
  const querySelectorAll = vi.fn(() => buttons);

  // requestAnimationFrame зовёт колбэк сразу — здесь важна только логика
  // подписки/переподписки, не реальная синхронизация с кадром.
  const raf = vi.fn((cb: () => void) => { cb(); return 0; });

  const observed: object[] = [];
  let ioCallback: IOCallback | undefined;
  class IntersectionObserverStub {
    constructor(cb: IOCallback) { ioCallback = cb; }
    observe(el: object) { observed.push(el); }
    disconnect() {}
  }

  const mo = { callback: undefined as (() => void) | undefined, target: undefined as object | undefined, connected: false };
  class MutationObserverStub {
    constructor(cb: () => void) { mo.callback = cb; }
    observe(target: object) { mo.target = target; mo.connected = true; }
    disconnect() { mo.connected = false; }
  }

  const windowListeners: Record<string, () => void> = {};
  const windowAddEventListener = vi.fn((type: string, handler: () => void) => {
    windowListeners[type] = handler;
  });

  const rootEl = { id: 'root' };
  const bodyEl = { id: 'body' };

  vi.stubGlobal('requestAnimationFrame', raf);
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  vi.stubGlobal('MutationObserver', MutationObserverStub);
  vi.stubGlobal('window', {
    location: { pathname: '/assistants/raya/', search: '', hostname: 'linkeon.io' },
    addEventListener: windowAddEventListener,
    // Код проверяет 'IntersectionObserver' in window / 'MutationObserver' in
    // window — свойства нужны и здесь, не только глобалами.
    IntersectionObserver: IntersectionObserverStub,
    MutationObserver: MutationObserverStub,
  });
  vi.stubGlobal('document', {
    referrer: '',
    documentElement: { scrollHeight: 0, clientHeight: 0, scrollTop: 0 },
    body: bodyEl,
    getElementById: (id: string) => (id === 'root' ? rootEl : null),
    addEventListener: vi.fn(),
    visibilityState: 'visible',
    querySelectorAll,
  });
  vi.stubGlobal('sessionStorage', storage);
  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal('fetch', fetch);

  return {
    observed,
    mo,
    rootEl,
    /** Содержимое документа меняется — как после root.render или открытия меню. */
    mutate(next: object[]) {
      buttons = next;
      if (mo.connected) mo.callback?.();
    },
    setButtons(next: object[]) { buttons = next; },
    intersect(target: object) { ioCallback?.([{ isIntersecting: true, target }]); },
    async start() {
      const { initLandingEngagement } = await import('./track');
      initLandingEngagement();
    },
    /** Уход со страницы — отправленное тело landing_engagement. */
    leave() {
      windowListeners.pagehide?.();
      expect(fetch).toHaveBeenCalledTimes(1);
      return JSON.parse(fetch.mock.calls[0][1]!.body as string);
    },
  };
}

describe('initLandingEngagement: «увидел кнопку» на страницах, нарисованных позже', () => {
  // «Старая» кнопка — из пререндера; «новая» — та, что появится в DOM после
  // root.render с загруженным чанком текстов; «меню» — кнопка мобильного меню,
  // которая монтируется только при его открытии.
  const buttonA = { id: 'A' };
  const buttonB = { id: 'B' };
  const menuButton = { id: 'menu' };

  // РЕГРЕССИЯ: на странице ассистента первый root.render случается только
  // после загрузки чанка текстов, и createRoot заменяет пререндеренный DOM
  // новым. IntersectionObserver остаётся висеть на отцепленных старых
  // кнопках — ctaSeen почти всегда false. MutationObserver должен подхватить
  // кнопку, появившуюся после такой перерисовки.
  it('подхватывает кнопку, нарисованную после перерисовки (чанк текстов пришёл позже)', async () => {
    const stand = await engagementStand();
    stand.setButtons([buttonA]);
    await stand.start();
    expect(stand.observed).toEqual([buttonA]);

    // «Перерисовка»: чанк текстов пришёл, createRoot заменил DOM на новый —
    // кнопка теперь другая (B), а наблюдатель всё ещё смотрит на старую (A).
    stand.mutate([buttonB]);
    expect(stand.observed).toContain(buttonB);

    stand.intersect(buttonB);
    expect(stand.leave().props.ctaSeen).toBe(true);
  });

  // РЕГРЕССИЯ: MutationObserver висел до конца визита и подхватывал и кнопки,
  // появившиеся много позже первой отрисовки, — например, header-start в
  // мобильном меню при его открытии. На телефоне «увидел кнопку» стало бы
  // значить «открыл меню», и метрика разошлась бы с историей.
  it('кнопку, появившуюся после первой отрисовки (меню), не наблюдает', async () => {
    const stand = await engagementStand();
    stand.setButtons([buttonA]);
    await stand.start();

    stand.mutate([buttonB]);
    expect(stand.mo.connected, 'после первой отрисовки с кнопками наблюдатель DOM отключается').toBe(false);

    stand.mutate([buttonB, menuButton]);
    expect(stand.observed).not.toContain(menuButton);
    expect(stand.leave().props.ctaSeen).toBe(false);
  });

  // Перерисовка без новых кнопок (кадр без [data-cta]) — ещё не та отрисовка:
  // наблюдатель ждёт дальше.
  it('мутация без новых кнопок наблюдатель не отключает', async () => {
    const stand = await engagementStand();
    stand.setButtons([buttonA]);
    await stand.start();

    stand.mutate([buttonA]);
    expect(stand.mo.connected).toBe(true);
    stand.mutate([buttonB]);
    expect(stand.observed).toContain(buttonB);
    expect(stand.mo.connected).toBe(false);
  });

  // React рисует в #root: следить за всем body незачем — туда вставляют свои
  // узлы пиксели и расширения.
  it('наблюдает #root, а не body', async () => {
    const stand = await engagementStand();
    await stand.start();
    expect(stand.mo.target).toBe(stand.rootEl);
  });

  // Кнопку уже увидели — ответ на вопрос метрики получен, DOM дальше не нужен.
  it('увидел кнопку — наблюдатель DOM отключается сразу', async () => {
    const stand = await engagementStand();
    stand.setButtons([buttonA]);
    await stand.start();
    expect(stand.mo.connected).toBe(true);

    stand.intersect(buttonA);
    expect(stand.mo.connected).toBe(false);
    expect(stand.leave().props.ctaSeen).toBe(true);
  });
});
