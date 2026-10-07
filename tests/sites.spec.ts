import { test, expect, request } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';

const pathFor = (code: string) => (code === DEFAULT_LANGUAGE ? '/' : `/${code}/`);
const LANGUAGES = translatedCodes().map((code) => ({ code, path: pathFor(code) }));

// Сырой HTTP, без браузера: так страницу видит краулер, и клиентский редирект
// `/` → `/en/` (headless ходит как en-US) не подменяет язык.
test.describe('секция «Сайты и боты» в сыром HTML', () => {
  for (const { code, path } of LANGUAGES) {
    test(`${code}: секция, две карточки, кнопка во вкладку продуктов`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const html = await (await ctx.get(path)).text();
      // Обрывается на первом </section>: вложенная секция сделала бы тест
      // ложно красным, но никогда — ложно зелёным.
      const section = html.match(/<section id="sites"[\s\S]*?<\/section>/)?.[0];

      expect(section, 'в пререндере нет секции #sites').toBeTruthy();
      expect(section).toContain('data-testid="sites-card-site"');
      expect(section).toContain('data-testid="sites-card-bot"');
      if (code === DEFAULT_LANGUAGE) expect(section).toContain('₽');
      else expect(section).not.toContain('₽');

      const tag = section!.match(/<a\b[^>]*\bdata-cta="sites-start"[^>]*>/)?.[0];
      expect(tag, 'в секции нет кнопки data-cta="sites-start"').toBeTruthy();
      const href = tag!.match(/\bhref="([^"]*)"/)?.[1];
      expect(href, 'у кнопки data-cta="sites-start" нет href').toBeTruthy();
      const url = new URL(href!.replace(/&amp;/g, '&'));
      expect(url.origin + url.pathname).toBe('https://my.linkeon.io/studio');
      expect(url.searchParams.get('tab')).toBe('products');
      expect(url.searchParams.get('utm_content')).toBe('sites');

      await ctx.dispose();
    });
  }
});

test.describe('секция «Сайты и боты» в браузере', () => {
  test('en: секция видна, кнопка ведёт во вкладку продуктов с языком', async ({ page }) => {
    await page.goto('/en/#sites');
    await expect(page.locator('#sites')).toBeVisible();
    await expect(page.getByTestId('sites-card-site')).toBeVisible();
    await expect(page.getByTestId('sites-card-bot')).toBeVisible();

    const cta = page.locator('[data-cta="sites-start"]');
    await expect(cta).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io\/studio\?tab=products&/);
    await expect(cta).toHaveAttribute('href', /[?&]utm_content=sites(&|$)/);
    await expect(cta).toHaveAttribute('href', /[?&]lang=en(&|$)/);
  });
});
