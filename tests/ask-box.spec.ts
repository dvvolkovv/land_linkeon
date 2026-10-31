import { test, expect, request, type Page } from '@playwright/test';

/**
 * Пререндер не гидратируется: main.tsx перерисовывает страницу через
 * createRoot после загрузки чанка текстов (см. тот же приём в соседних
 * *.spec.ts, например assistants.spec.ts). До этого момента поле вопроса —
 * мёртвая разметка пререндера: обработчики на него не навешаны.
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

const QUESTION = 'Как поднять цены? 100%';

test.describe('поле вопроса на первом экране (#ask=)', () => {
  // Без явной локали браузер приходит с системным en-US, и инлайн-редирект в
  // <head> уводит с `/` на `/en/` — как в smoke.spec.ts («рублёвая витрина»).
  test.use({ locale: 'ru-RU' });

  test('Enter уводит в кабинет: вопрос — во фрагменте #ask=, ассистент и метка — в адресе', async ({ page }) => {
    await page.route('https://my.linkeon.io/**', (route) => route.fulfill({ status: 200, body: 'ok' }));
    await page.goto('/');
    await clientRendered(page);

    const field = page.locator('[data-ask-box] textarea');
    await field.fill(QUESTION);
    await field.press('Enter');

    await page.waitForURL(/my\.linkeon\.io\/chat/);
    const url = new URL(page.url());
    expect(url.searchParams.get('assistant')).toBe('12');
    expect(url.searchParams.get('utm_content')).toBe('hero-ask');
    expect(url.hash.startsWith('#ask=')).toBe(true);
    expect(decodeURIComponent(url.hash.slice('#ask='.length))).toBe(QUESTION);
  });

  test('Shift+Enter переводит строку в поле и не уводит с лендинга', async ({ page }) => {
    await page.route('https://my.linkeon.io/**', (route) => route.fulfill({ status: 200, body: 'ok' }));
    await page.goto('/');
    await clientRendered(page);

    const field = page.locator('[data-ask-box] textarea');
    await field.fill(QUESTION);
    await field.press('Shift+Enter');

    await expect(page).toHaveURL(/localhost:\d+\/$/);
    expect(await field.inputValue()).toBe(`${QUESTION}\n`);
  });

  test('в сыром HTML главной текста вопроса и фрагмента #ask= нет — адрес строится только по нажатию', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get('/')).text();
    expect(html).not.toContain('#ask=');
    expect(html).not.toContain(QUESTION);
    await ctx.dispose();
  });
});
