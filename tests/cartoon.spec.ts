import { test, expect } from '@playwright/test';

// Мультфильм на лендинге: секция с iframe на русской странице и сама
// страница-плеер в /cartoon/ (готовый dist из репозитория linkeon_cartoon).
//
// Русский HTML проверяем сырым HTTP: браузер без локали уводится с `/` на
// `/en/` (см. smoke.spec.ts). Ролик здесь не проигрывается: в Chromium от
// Playwright нет кодека H.264, клипы мультфильма в нём не играют. Прогон всего
// ролика — в linkeon_cartoon, `pnpm web:check`, настоящим Chrome.
test.describe('мультфильм', () => {
  test('ru: секция с плеером есть в сыром HTML', async ({ request }) => {
    const html = await (await request.get('/')).text();
    expect(html).toContain('id="cartoon"');
    expect(html).toMatch(/<iframe[^>]+src="\/cartoon\/"/);
  });

  test('en: секции нет — мультфильм только на русском', async ({ request }) => {
    const html = await (await request.get('/en/')).text();
    expect(html).not.toContain('src="/cartoon/"');
  });

  test('/cartoon/ отдаёт страницу плеера и настоящие клипы', async ({ request }) => {
    const html = await (await request.get('/cartoon/')).text();
    expect(html).toContain('<title>Linkeon — мультфильм</title>');
    // SPA-фолбэк отдал бы на любой путь 200 с HTML — поэтому смотрим тип и размер.
    const clip = await request.get('/cartoon/clips/s1a.mp4');
    expect(clip.headers()['content-type']).toContain('video/mp4');
    expect((await clip.body()).length).toBeGreaterThan(100_000);
  });

  test.describe('в браузере', () => {
    test.use({ locale: 'ru-RU' });

    test('плеер грузится внутри секции и показывает обложку', async ({ page }) => {
      await page.goto('/#cartoon');
      const frame = page.frameLocator('[data-testid="cartoon-frame"]');
      await expect(frame.getByText('Чем Linkeon отличается от обычного чата')).toBeVisible({ timeout: 15_000 });
    });
  });
});
