import { readFileSync } from 'node:fs';
import { test, expect, request, type Page } from '@playwright/test';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';
import { sitemapUrls } from '../scripts/site-urls.mjs';
import { assistantPageCodes } from '../scripts/assistant-page-languages.js';
import { hdCalcCodes } from '../scripts/hd-calc-languages.js';
import { valuesTestCodes } from '../scripts/values-test-languages.js';
import { ASSISTANT_SLUGS } from '../src/content/assistants/roster.data.js';

// Подпись кнопки поля вопроса — из той же локали, что и страница. Через
// readFileSync, а не import ".json": в tests/ так ещё не делали (ни
// tsconfig.app.json, ни tsconfig.node.json эту папку не включают), а приём
// уже проверен в scripts/check-locales.mjs и .superpowers/add-ask-keys.mjs.
const askButton = (code: string): string => JSON.parse(readFileSync(`src/i18n/locales/${code}.json`, 'utf8')).ask.button;

/**
 * Пререндер не гидратируется: main.tsx перерисовывает страницу через
 * createRoot после загрузки чанка текстов (см. тот же приём в соседних
 * *.spec.ts). До этого момента поле вопроса — мёртвая разметка пререндера.
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

// Список берётся из того же источника, что и сборка: выпускаются только языки
// с непустой локалью. Захардкоженный массив здесь означал бы тесты страниц,
// которых нет (и падения ровно в тот момент, когда переводы наконец доедут).
const pathFor = (code: string) => (code === DEFAULT_LANGUAGE ? '/' : `/${code}/`);

const PUBLISHED = translatedCodes();
const LANGUAGES = PUBLISHED.map((code) => ({ code, path: pathFor(code) }));
const UNPUBLISHED = SUPPORTED_CODES.filter((code) => !PUBLISHED.includes(code));

test.describe('языковые версии', () => {
  for (const { code, path } of LANGUAGES) {
    // Сырой HTTP, без браузера: именно так страницу видит краулер.
    test(`${code}: контент есть в сыром HTML`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const res = await ctx.get(path);
      expect(res.status()).toBe(200);
      const html = await res.text();

      expect(html).toContain(`<html lang="${code}"`);

      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      expect(h1, 'в сыром HTML нет <h1> — пререндер сломан').not.toBeNull();
      expect(h1![1].replace(/<[^>]*>/g, '').trim().length).toBeGreaterThan(10);

      for (const other of LANGUAGES) {
        expect(html).toContain(`hreflang="${other.code}"`);
      }
      expect(html).toContain('hreflang="x-default"');

      const canonical = `https://linkeon.io${pathFor(code)}`;
      expect(html).toContain(`<link rel="canonical" href="${canonical}"`);

      // Регрессия C2: повторный (неидемпотентный) прогон пререндера
      // дублирует head — эти счётчики ловят это напрямую, без завязки
      // на то, что именно продублировалось.
      const count = (re: RegExp) => (html.match(re) ?? []).length;
      expect(count(/rel="canonical"/g), 'ровно один rel="canonical"').toBe(1);
      expect(count(/property="og:url"/g), 'ровно один og:url').toBe(1);
      // og:locale:alternate — отдельный тег, не должен попасть в счёт.
      expect(count(/property="og:locale"/g), 'ровно один og:locale').toBe(1);
      expect(
        count(/hreflang="/g),
        `${LANGUAGES.length} выпущенных языков + x-default`,
      ).toBe(LANGUAGES.length + 1);

      await ctx.dispose();
    });

    // Поле вопроса заменило кнопку «Начать» (проба без входа, spec
    // 2026-10-30-guest-trial) — проверяем его и подпись кнопки на языке
    // страницы; href больше нет (адрес строится по нажатию), поэтому
    // «CTA ведёт в приложение» теперь проверяет оставшуюся ссылку шапки.
    // locale: code, как в header.spec.ts: без него инлайн-редирект в <head>
    // увёл бы ru с `/` на `/en/`, если локаль браузера по умолчанию не
    // русская, — тогда и подпись кнопки, и вообще вся страница были бы
    // английскими (ровно так и обнаружилось: «Ask» вместо «Спросить»).
    test(`${code}: страница живая, поле вопроса на своём языке, CTA шапки ведёт в приложение`, async ({ browser }) => {
      const context = await browser.newContext({ locale: code });
      const page = await context.newPage();
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      await expect(page.locator('[data-ask-box]')).toBeVisible();
      await expect(page.locator('[data-cta="hero-ask"]')).toContainText(askButton(code));

      const headerStart = page.locator('[data-cta="header-start"]');
      await expect(headerStart).toBeVisible();
      await expect(headerStart).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io/);
      await context.close();
    });
  }

  // Полный переход (Enter → кабинет с вопросом во фрагменте #ask=) — как в
  // ask-box.spec.ts, но на языковой странице. Настоящая навигация — дорогая
  // проверка, одного языка (не ru, он уже покрыт ask-box.spec.ts) достаточно,
  // чтобы поймать разметку/проводку отдельно от переводов (их покрывает цикл выше).
  test('en: поле вопроса в первом экране ведёт в кабинет с вопросом во фрагменте #ask=', async ({ page }) => {
    await page.route('https://my.linkeon.io/**', (route) => route.fulfill({ status: 200, body: 'ok' }));
    await page.goto('/en/');
    await clientRendered(page);

    const field = page.locator('[data-ask-box] textarea');
    await field.fill('Test question');
    await field.press('Enter');

    await page.waitForURL(/my\.linkeon\.io\/chat/);
    const url = new URL(page.url());
    expect(url.searchParams.get('assistant')).toBe('12');
    expect(url.searchParams.get('utm_content')).toBe('hero-ask');
    expect(url.hash.startsWith('#ask=')).toBe(true);
    expect(decodeURIComponent(url.hash.slice('#ask='.length))).toBe('Test question');
  });

  // C2/I1: пререндер подменяет <title> и meta description на каждом языке.
  // Не завязываемся на точный текст (он может меняться) — только на факт
  // различия с ru и характерный английский фрагмент, которого в ru-версии
  // нет ни при каких обстоятельствах.
  test('en: title и description отличаются от ru и локализованы', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const [ruRes, enRes] = await Promise.all([ctx.get('/'), ctx.get('/en/')]);
    const [ruHtml, enHtml] = await Promise.all([ruRes.text(), enRes.text()]);

    const ruTitle = ruHtml.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const enTitle = enHtml.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const ruDescription = ruHtml.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const enDescription = enHtml.match(/<meta name="description" content="([^"]*)"/)?.[1];

    expect(ruTitle, 'ru: <title> не найден').toBeTruthy();
    expect(enTitle, 'en: <title> не найден').toBeTruthy();
    expect(ruDescription, 'ru: meta description не найден').toBeTruthy();
    expect(enDescription, 'en: meta description не найден').toBeTruthy();

    expect(enTitle).not.toBe(ruTitle);
    expect(enDescription).not.toBe(ruDescription);
    expect(enTitle).toContain('AI team');

    await ctx.dispose();
  });

  // Ожидание строится из того же модуля, из которого пререндер пишет sitemap,
  // поэтому новый раздел сайта не роняет тест на ровном месте. Проверяется
  // именно «ровно»: множества сравниваются целиком, так что и пропавший адрес,
  // и лишний (например, версия невыпущенного языка) видны одинаково.
  test('sitemap перечисляет ровно выпущенные версии', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();

    const actual = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const expected = sitemapUrls(
      PUBLISHED,
      DEFAULT_LANGUAGE,
      { codes: assistantPageCodes(), slugs: ASSISTANT_SLUGS },
      { codes: hdCalcCodes() },
      { codes: valuesTestCodes() },
    );

    expect(new Set(actual).size, 'в sitemap есть дубли').toBe(actual.length);
    expect([...actual].sort()).toEqual([...expected].sort());

    await ctx.dispose();
  });

  // Главное свойство: язык с пустой локалью нигде не всплывает — иначе это
  // индексируемый URL с русским текстом под чужим <html lang>.
  test('непереведённые языки не публикуются', async ({ baseURL }) => {
    test.skip(UNPUBLISHED.length === 0, 'переведены все языки реестра — проверять нечего');

    const ctx = await request.newContext({ baseURL });
    const [html, xml] = await Promise.all([
      ctx.get('/').then((r) => r.text()),
      ctx.get('/sitemap.xml').then((r) => r.text()),
    ]);

    for (const code of UNPUBLISHED) {
      expect(html, `${code}: hreflang на невыпущенную версию`).not.toContain(`hreflang="${code}"`);
      expect(xml, `${code}: невыпущенная версия в sitemap`).not.toContain(
        `<loc>https://linkeon.io/${code}/</loc>`,
      );
    }

    await ctx.dispose();
  });
});
