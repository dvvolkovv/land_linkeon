import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Цель Метрики — только имя; в нашу таблицу событий идут только клики
 * перехода в приложение. Окружение браузера подменяется: vitest здесь идёт в
 * node (как в track.test.ts).
 */
function stubBrowser() {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  const ym = vi.fn<(id: number, action: string, goal?: string) => void>();
  vi.stubGlobal('window', { ym, location: { pathname: '/calculators/human-design/', search: '', hostname: 'linkeon.io' } });
  vi.stubGlobal('document', { referrer: '' });
  vi.stubGlobal('sessionStorage', storage);
  vi.stubGlobal('localStorage', storage);
  const fetch = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response(null));
  vi.stubGlobal('fetch', fetch);
  return { ym, fetch };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('цель лендинга', () => {
  it('расчёт — только цель Метрики: в нашу таблицу событий не пишется', async () => {
    const { ym, fetch } = stubBrowser();
    const { METRIKA_ID, reachGoal } = await import('./goal');
    reachGoal('hd-calc-submit');
    expect(ym).toHaveBeenCalledWith(METRIKA_ID, 'reachGoal', 'hd-calc-submit');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('клик перехода в приложение — в Метрику и в таблицу событий, только имя', async () => {
    const { ym, fetch } = stubBrowser();
    const { METRIKA_ID, reachCtaGoal } = await import('./goal');
    reachCtaGoal('hd-calc-to-raya');
    expect(ym).toHaveBeenCalledWith(METRIKA_ID, 'reachGoal', 'hd-calc-to-raya');
    const body = JSON.parse(fetch.mock.calls[0][1]!.body as string);
    expect(body.name).toBe('landing_cta_click');
    expect(body.props.cta).toBe('hd-calc-to-raya');
    expect(body.props.path).toBe('/calculators/human-design/');
  });

  it('без Метрики (заблокирована) — не падает', async () => {
    stubBrowser();
    vi.stubGlobal('window', { location: { pathname: '/', search: '', hostname: 'linkeon.io' } });
    const { reachCtaGoal, reachGoal } = await import('./goal');
    expect(() => reachGoal('hd-calc-submit')).not.toThrow();
    expect(() => reachCtaGoal('hd-calc-to-raya')).not.toThrow();
  });

  // Номер записан дважды — здесь и в index.html; разойдутся — цели уйдут в чужой счётчик.
  it('номер счётчика — тот же, что в index.html', async () => {
    const { METRIKA_ID } = await import('./goal');
    const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
    expect(html).toContain(`ym(${METRIKA_ID}, 'init'`);
  });
});
