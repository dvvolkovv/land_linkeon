import { test, expect, request, type Page } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { ASSISTANTS } from '../src/content/assistants/roster.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';
import { assistantPageCodes } from '../scripts/assistant-page-languages.js';
import { assistantUrlFor, assistantsCatalogUrlFor } from '../scripts/site-urls.mjs';
import { CARD_SLUGS } from '../src/components/sections/assistantCards';

// Языки — из того же источника, что и сборка: перевод доехал — проверки
// включились сами.
const CODES = assistantPageCodes();
// Главная на этих языках выпущена, а страниц ассистентов на них ещё нет.
const WITHOUT_PAGES = translatedCodes().filter((code) => !CODES.includes(code));

const prefix = (code: string) => (code === DEFAULT_LANGUAGE ? '' : `/${code}`);
// Адреса — со слэшем на конце. Страница лежит в dist/ каталогом с index.html:
// без слэша vite preview подсовывает главную (SPA-фолбэк), а прод-nginx
// отвечает 301. Падение «в H1 нет имени» сразу у всех — почти наверняка слэш.
const catalogPath = (code: string) => `${prefix(code)}/assistants/`;
const pagePath = (code: string, slug: string) => `${prefix(code)}/assistants/${slug}/`;

const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
// Подвал каждой страницы ссылается на всех ассистентов: ссылки ищем только в
// своей части разметки, иначе проверка не может упасть.
const pick = (html: string, re: RegExp) => html.match(re)?.[0] ?? '';
const mainOf = (html: string) => pick(html, /<main[\s\S]*<\/main>/);
const h1Of = (html: string) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
// Секция карточек главной. Вложенных <section> в ней нет — хватает ближайшего
// закрывающего тега.
const cardsOf = (html: string) => pick(html, /<section id="assistants"[\s\S]*?<\/section>/);
const footerNavOf = (html: string) => pick(html, /<nav aria-labelledby="footer-assistants"[\s\S]*?<\/nav>/);
/** Каких ссылок нет во фрагменте — падение называет сразу все. */
const missingLinks = (fragment: string, paths: string[]) =>
  paths.filter((path) => !fragment.includes(`href="${path}"`));
/** Языки hreflang-кластера, которые не ведут на свою версию этой же страницы. */
const wrongHreflang = (html: string, url: (code: string) => string) =>
  [...CODES.map((code) => [code, url(code)]), ['x-default', url(DEFAULT_LANGUAGE)]]
    .filter(([lang, href]) => !html.includes(`hreflang="${lang}" href="${href}"`))
    .map(([lang]) => lang);

const RAYA = ASSISTANTS.find((a) => a.slug === 'raya')!;
// Ссылка в чат с ассистентом. В браузере appUrl дописывает язык и метки,
// поэтому место параметра не фиксируем — только значение, и ровно его.
const chatHref = (id: number) =>
  new RegExp(`^https://my\\.linkeon\\.io/chat\\?(?:[^#]*&)?assistant=${id}(?:[&#]|$)`);

// Сырой HTTP, без браузера: так страницу видит краулер. Код ответа ничего не
// доказывает — SPA-фолбэк отдаёт 200 на любой путь, поэтому проверяется
// содержимое.
test.describe('страницы ассистентов в сыром HTML', () => {
  for (const code of CODES) {
    test(`${code}: каталог`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const html = await (await ctx.get(catalogPath(code))).text();
      const url = (c: string) => assistantsCatalogUrlFor(c, DEFAULT_LANGUAGE);

      expect(html, 'отдан не каталог этого языка').toContain(`<html lang="${code}"`);
      expect(count(html, /rel="canonical"/g), 'ровно один rel="canonical"').toBe(1);
      expect(html, 'canonical каталога').toContain(`<link rel="canonical" href="${url(code)}"`);
      expect(count(html, /hreflang="/g), `hreflang: ${CODES.length} языков страниц + x-default`).toBe(
        CODES.length + 1,
      );
      expect(wrongHreflang(html, url), 'hreflang ведёт не на каталог своего языка').toEqual([]);
      expect(
        missingLinks(mainOf(html), ASSISTANTS.map((a) => pagePath(code, a.slug))),
        'в <main> каталога нет ссылок на этих ассистентов',
      ).toEqual([]);

      await ctx.dispose();
    });

    test(`${code}: страницы всех ассистентов`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      for (const a of ASSISTANTS) {
        const where = `${code}/${a.slug}`;
        const url = (c: string) => assistantUrlFor(c, a.slug, DEFAULT_LANGUAGE);
        const res = await ctx.get(pagePath(code, a.slug));
        expect(res.status(), where).toBe(200);
        const html = await res.text();

        expect(html, `${where}: не тот <html lang>`).toContain(`<html lang="${code}"`);
        // Имя — в H1, а не где угодно: подвал любой страницы называет всех.
        expect(h1Of(html), `${where}: в H1 нет имени — отдана чужая страница?`).toContain(a.names[code]);
        expect(count(html, /rel="canonical"/g), `${where}: ровно один rel="canonical"`).toBe(1);
        expect(html, `${where}: canonical`).toContain(`<link rel="canonical" href="${url(code)}"`);
        expect(count(html, /hreflang="/g), `${where}: hreflang — ${CODES.length} языков страниц + x-default`).toBe(
          CODES.length + 1,
        );
        expect(wrongHreflang(html, url), `${where}: hreflang ведёт не на эту страницу`).toEqual([]);
        expect(html, `${where}: нет разметки FAQPage`).toContain('"@type":"FAQPage"');
        expect(html, `${where}: нет разметки BreadcrumbList`).toContain('"@type":"BreadcrumbList"');
        expect(mainOf(html), `${where}: кнопка не ведёт в чат с ассистентом`).toMatch(
          new RegExp(`href="https://my\\.linkeon\\.io/chat\\?assistant=${a.id}&amp;`),
        );
        expect(html, `${where}: нет аватара`).toContain(`src="/avatars/${a.slug}.webp"`);
      }
      await ctx.dispose();
    });

    // Карточки и подвал — отдельными тестами: поломка одного не прячет другое.
    test(`${code}: карточки главной ведут на страницы ассистентов`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const html = await (await ctx.get(`${prefix(code)}/`)).text();
      expect(html, 'отдана не главная этого языка').toContain(`<html lang="${code}"`);

      const cards = cardsOf(html);
      expect(cards, 'на главной нет секции <section id="assistants">').not.toBe('');
      expect(
        missingLinks(cards, CARD_SLUGS.map((slug) => pagePath(code, slug))),
        'карточки главной не ведут на страницы этих ассистентов',
      ).toEqual([]);
      expect(cards, 'у карточек главной нет ссылки на каталог').toContain(`href="${catalogPath(code)}"`);

      await ctx.dispose();
    });

    test(`${code}: подвал главной ссылается на всех ассистентов`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const html = await (await ctx.get(`${prefix(code)}/`)).text();
      expect(html, 'отдана не главная этого языка').toContain(`<html lang="${code}"`);

      const footer = footerNavOf(html);
      expect(footer, 'в подвале главной нет блока <nav aria-labelledby="footer-assistants">').not.toBe('');
      expect(
        missingLinks(footer, ASSISTANTS.map((a) => pagePath(code, a.slug))),
        'в подвале главной нет ссылок на этих ассистентов',
      ).toEqual([]);
      expect(footer, 'в подвале главной нет ссылки на каталог').toContain(`href="${catalogPath(code)}"`);

      await ctx.dispose();
    });
  }

  // Ссылка на невыпущенную страницу вела бы в SPA-фолбэк: под адресом
  // ассистента человек увидел бы главную.
  test('главные языков без страниц ассистентов на них не ссылаются', async ({ baseURL }) => {
    test.skip(WITHOUT_PAGES.length === 0, 'страницы ассистентов выпущены на всех языках сайта');
    const ctx = await request.newContext({ baseURL });
    for (const code of WITHOUT_PAGES) {
      const html = await (await ctx.get(`${prefix(code)}/`)).text();
      expect(html, `${code}: отдана не главная этого языка`).toContain(`<html lang="${code}"`);
      expect(
        html.match(/href="[^"]*\/assistants\/[^"]*"/g) ?? [],
        `${code}: главная ссылается на невыпущенные страницы ассистентов`,
      ).toEqual([]);
    }
    await ctx.dispose();
  });

  // Ожидание — не из sitemapUrls(): по ней же sitemap пишет пререндер, и
  // пропади раздел из этой функции, сравнение множеств в i18n.spec.ts осталось
  // бы зелёным — обе стороны теряют одно и то же.
  test('sitemap перечисляет каталог и страницы ассистентов', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const xml = await (await ctx.get('/sitemap.xml')).text();
    const locs = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

    const expected = CODES.flatMap((code) => [
      assistantsCatalogUrlFor(code, DEFAULT_LANGUAGE),
      ...ASSISTANTS.map((a) => assistantUrlFor(code, a.slug, DEFAULT_LANGUAGE)),
    ]);
    expect(expected.filter((url) => !locs.has(url)), 'в sitemap нет этих адресов раздела ассистентов').toEqual([]);
    expect(
      [...locs].filter((url) => WITHOUT_PAGES.some((code) => url.includes(`/${code}/assistants/`))),
      'в sitemap страницы ассистентов на невыпущенных языках',
    ).toEqual([]);

    await ctx.dispose();
  });

  // Тип, а не код ответа: на отсутствующий файл SPA-фолбэк отвечает 200 и
  // HTML главной — картинки нет, а проверка по коду была бы зелёной.
  test('аватары и картинка примера отдаются картинками', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const paths = [...ASSISTANTS.map((a) => `/avatars/${a.slug}.webp`), '/examples/kira-logo.webp'];
    const wrong: string[] = [];
    for (const path of paths) {
      const res = await ctx.get(path);
      const type = res.headers()['content-type'] ?? '';
      if (!type.includes('image/webp')) wrong.push(`${path} → ${res.status()} ${type}`);
    }
    expect(wrong, 'отдаются не картинкой — файла нет, ответил SPA-фолбэк?').toEqual([]);
    await ctx.dispose();
  });
});

/**
 * Пререндер не гидратируется: main.tsx догружает чанк текстов и рисует
 * страницу заново через createRoot. Проверять надо уже клиентскую разметку —
 * иначе браузер смотрит на тот же HTML, что и проверки выше. У узлов,
 * созданных React, есть служебное свойство __reactFiber$…, у пререндера — нет.
 */
async function clientRendered(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const h1 = document.querySelector('h1');
          return h1 !== null && Object.keys(h1).some((key) => key.startsWith('__reactFiber$'));
        }),
      { message: 'React не перерисовал пререндер — чанк текстов не загрузился или рендер упал' },
    )
    .toBe(true);
}

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

test.describe('страница ассистента в браузере', () => {
  // Чужие адреса (шрифты, Метрика, пиксель VK, трекер на my.linkeon.io)
  // отвечают пустой заглушкой: их сбои и CORS писали бы ошибки в консоль, и
  // проверка «ошибок нет» зависела бы от сети ноды, а не от страницы. Заодно
  // прогон не шлёт события в боевую аналитику.
  test.beforeEach(async ({ page, baseURL }) => {
    const own = new URL(baseURL!).origin;
    await page.route(
      (url) => url.origin !== own,
      (route) => {
        const type = route.request().resourceType();
        const contentType =
          type === 'stylesheet' ? 'text/css' : type === 'script' ? 'text/javascript' : 'text/plain';
        return route.fulfill({
          status: 200,
          contentType,
          body: '',
          headers: { 'access-control-allow-origin': '*' },
        });
      },
    );
  });

  test('кнопка ведёт в чат, переключатель языка — на ту же страницу', async ({ page }) => {
    const code = CODES.find((c) => c !== DEFAULT_LANGUAGE);
    test.skip(!code, 'страницы есть только на русском — переключать не на что');
    await page.goto(pagePath(code!, RAYA.slug));
    // До клиентского рендера кнопка переключателя — мёртвая разметка
    // пререндера: клик по ней потерялся бы.
    await clientRendered(page);
    await expect(page.getByRole('heading', { level: 1 }), 'в H1 нет имени').toContainText(RAYA.names[code!]);
    await expect(
      page.locator('[data-cta="assistant-start"]').first(),
      'кнопка не ведёт в чат с ассистентом',
    ).toHaveAttribute('href', chatHref(RAYA.id));
    await page.locator('[data-testid="lang-switcher"] button').first().click();
    await expect(
      page.locator(`[data-testid="lang-option-${DEFAULT_LANGUAGE}"]`).first(),
      'переключатель языка уводит со страницы ассистента',
    ).toHaveAttribute('href', pagePath(DEFAULT_LANGUAGE, RAYA.slug));
  });

  test(`${DEFAULT_LANGUAGE}: страница ассистента после клиентского рендера, без ошибок`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(pagePath(DEFAULT_LANGUAGE, RAYA.slug));
    await clientRendered(page);
    await expect(page.getByRole('heading', { level: 1 }), 'в H1 нет имени').toContainText(
      RAYA.names[DEFAULT_LANGUAGE],
    );
    await expect(
      page.locator('[data-cta="assistant-start"]').first(),
      'кнопка не ведёт в чат с ассистентом',
    ).toHaveAttribute('href', chatHref(RAYA.id));
    expect(errors, 'ошибки в консоли браузера').toEqual([]);
  });

  test(`${DEFAULT_LANGUAGE}: каталог после клиентского рендера, без ошибок`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(catalogPath(DEFAULT_LANGUAGE));
    await clientRendered(page);
    const hrefs = await page.locator('main a').evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    const pageLink = new RegExp(`^${prefix(DEFAULT_LANGUAGE)}/assistants/[^/]+/$`);
    expect(
      hrefs.filter((href) => pageLink.test(href)).sort(),
      'в <main> каталога должно быть ровно по ссылке на каждого ассистента',
    ).toEqual(ASSISTANTS.map((a) => pagePath(DEFAULT_LANGUAGE, a.slug)).sort());
    expect(errors, 'ошибки в консоли браузера').toEqual([]);
  });
});
