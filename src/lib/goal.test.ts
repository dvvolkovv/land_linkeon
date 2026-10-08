import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Цель лендинга уходит и в Метрику, и в нашу таблицу событий — одним именем.
 * Окружение браузера подменяется: vitest здесь идёт в node (как в track.test.ts).
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
  it('Метрика и таблица событий получают только имя цели', async () => {
    const { ym, fetch } = stubBrowser();
    const { METRIKA_ID, reachGoal } = await import('./goal');
    reachGoal('hd-calc-submit');
    expect(ym).toHaveBeenCalledWith(METRIKA_ID, 'reachGoal', 'hd-calc-submit');
    const body = JSON.parse(fetch.mock.calls[0][1]!.body as string);
    expect(body.name).toBe('landing_cta_click');
    expect(body.props.cta).toBe('hd-calc-submit');
    expect(body.props.path).toBe('/calculators/human-design/');
  });

  it('без Метрики (заблокирована) — не падает', async () => {
    stubBrowser();
    vi.stubGlobal('window', { location: { pathname: '/', search: '', hostname: 'linkeon.io' } });
    const { reachGoal } = await import('./goal');
    expect(() => reachGoal('hd-calc-to-raya')).not.toThrow();
  });
});
