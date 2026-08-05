import { test, expect, request } from '@playwright/test';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';

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

    test(`${code}: страница живая и CTA ведёт в приложение`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const cta = page.locator('[data-cta="hero-start"]');
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io/);
    });
  }

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

  test('sitemap перечисляет ровно выпущенные версии', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    for (const { code } of LANGUAGES) {
      expect(xml).toContain(`<loc>https://linkeon.io${pathFor(code)}</loc>`);
    }
    expect((xml.match(/<loc>/g) ?? []).length, 'лишних URL в sitemap нет').toBe(LANGUAGES.length);
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
