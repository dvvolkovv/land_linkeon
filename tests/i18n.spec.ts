import { test, expect, request } from '@playwright/test';

const LANGUAGES = [
  { code: 'ru', path: '/' },
  { code: 'en', path: '/en/' },
  { code: 'es', path: '/es/' },
  { code: 'de', path: '/de/' },
  { code: 'fr', path: '/fr/' },
  { code: 'zh', path: '/zh/' },
];

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

      const canonical = code === 'ru' ? 'https://linkeon.io/' : `https://linkeon.io/${code}/`;
      expect(html).toContain(`<link rel="canonical" href="${canonical}"`);

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

  test('sitemap перечисляет все шесть версий', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    for (const { code } of LANGUAGES) {
      const url = code === 'ru' ? 'https://linkeon.io/' : `https://linkeon.io/${code}/`;
      expect(xml).toContain(`<loc>${url}</loc>`);
    }
    await ctx.dispose();
  });
});
