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
      const section = html.match(/<section id="sites"[\s\S]*?<\/section>/)?.[0];

      expect(section, 'в пререндере нет секции #sites').toBeTruthy();
      expect(section).toContain('data-testid="sites-card-site"');
      expect(section).toContain('data-testid="sites-card-bot"');
      expect(section).toContain('href="https://my.linkeon.io/studio?tab=products&amp;utm_content=sites');
      if (code === DEFAULT_LANGUAGE) expect(section).toContain('₽');
      else expect(section).not.toContain('₽');

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

// Пять пунктов меню на 1024 px (с этой ширины меню видно целиком). Пункты и
// кнопки — whitespace-nowrap, поэтому нехватка места — это переполнение, а не
// тихий перенос строки. Мерится запас ВНУТРИ контентной области шапки, при
// загруженном Inter: переполнение меньше 24 px пряталось бы в px-6, а
// запасной шрифт другой ширины. Требуется не меньше 15 px — столько
// обычная полоса прокрутки (Windows) отнимает у ширины, а headless её прячет.
const SCROLLBAR = 15;

test.describe('шапка на 1024 px', () => {
  for (const { code, path } of LANGUAGES) {
    test(`${code}: меню и кнопки в одну строку, запас под полосу прокрутки`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1024, height: 768 },
        locale: code === 'zh' ? 'zh-CN' : code,
      });
      const page = await context.newPage();
      await page.goto(path);

      // Таблица Google Fonts подключается с media=print и включается по
      // onload — до этого в document.fonts нет ни одного начертания Inter, и
      // document.fonts.load() молча вернул бы пустой список.
      await page.waitForFunction(() =>
        [...document.fonts].some((f) => f.family.replace(/"/g, '') === 'Inter'),
      );
      // Грузим ровно то, что рисует шапка: пункты меню — 400, логотип и
      // кнопки — 600; текст шапки выбирает нужные unicode-range (кириллица и т. п.).
      const faces = await page.evaluate(async () => {
        const text = document.querySelector('header')?.textContent ?? '';
        const loaded = [
          ...(await document.fonts.load('400 14px Inter', text)),
          ...(await document.fonts.load('600 14px Inter', text)),
        ];
        await document.fonts.ready;
        return loaded.length;
      });
      expect(faces, 'Inter не загрузился — замер шёл бы по запасному шрифту').toBeGreaterThan(0);

      const m = await page.evaluate(() => {
        const bar = document.querySelector('header > div') as HTMLElement;
        const style = getComputedStyle(bar);
        const content = bar.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const used = [...bar.children].reduce((sum, el) => sum + (el as HTMLElement).getBoundingClientRect().width, 0);
        const links = [...document.querySelectorAll('header nav a')] as HTMLElement[];
        return {
          room: Math.floor(content - used),
          links: links.length,
          heights: links.map((a) => Math.round(a.getBoundingClientRect().height)),
        };
      });

      expect(m.links).toBe(5);
      expect(m.room, `запас в шапке ${m.room} px, нужно не меньше ${SCROLLBAR}`).toBeGreaterThanOrEqual(SCROLLBAR);
      expect(new Set(m.heights).size, 'пункт меню перенёсся на вторую строку').toBe(1);

      await context.close();
    });
  }
});
