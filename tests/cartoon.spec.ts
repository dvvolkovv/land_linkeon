import { test, expect } from '@playwright/test';

// Мультфильм на лендинге: секция с iframe на русской странице и сама
// страница-плеер в /cartoon/ (готовый dist из репозитория linkeon_cartoon).
//
// Русский HTML проверяем сырым HTTP: браузер без локали уводится с `/` на
// `/en/` (см. smoke.spec.ts). В браузере проверяем только первые секунды
// ролика. Прогон всех 1:42 — в linkeon_cartoon, `pnpm web:check`: только он
// ловит то, что всплывает позже (например, лимит аудиотегов Remotion Player
// ронял плеер ровно на 23-й секунде).
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

    test('плеер грузится внутри секции и играет', async ({ page }) => {
      await page.goto('/#cartoon');
      const frameEl = page.locator('[data-testid="cartoon-frame"]');
      const frame = page.frameLocator('[data-testid="cartoon-frame"]');
      await expect(frame.getByText('Чем Linkeon отличается от обычного чата')).toBeVisible({ timeout: 15_000 });

      // Клик по обложке запускает ролик — время в панели плеера должно пойти.
      // Курсор держим над панелью, иначе она прячется вместе со временем.
      await frameEl.click();
      const box = (await frameEl.boundingBox())!;
      await expect
        .poll(
          async () => {
            await page.mouse.move(box.x + 40, box.y + box.height - 20);
            const m = (await frame.locator('body').innerText()).match(/(\d+):(\d\d) \/ \d+:\d\d/);
            return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
          },
          { timeout: 15_000 },
        )
        .toBeGreaterThanOrEqual(3);
    });
  });
});
