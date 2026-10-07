import { test, expect } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';

const pathFor = (code: string) => (code === DEFAULT_LANGUAGE ? '/' : `/${code}/`);
const LANGUAGES = translatedCodes().map((code) => ({ code, path: pathFor(code) }));

// Пять пунктов меню на 1024 px (с этой ширины меню видно целиком). Правило
// шапки, а не какой-то секции: сломать его может любой новый пункт или
// перевод. Пункты и кнопки — whitespace-nowrap, поэтому нехватка места — это
// переполнение, а не тихий перенос строки (и это здесь тоже проверяется: без
// nowrap замер ничего не значит). Мерится запас ВНУТРИ контентной области
// шапки, при загруженном Inter: переполнение меньше 24 px пряталось бы в px-6,
// а запасной шрифт другой ширины. Требуется не меньше 17 px — столько обычная
// полоса прокрутки Windows (Chrome, Edge, Firefox) отнимает у ширины, а
// headless её прячет.
const SCROLLBAR = 17;

test.describe('шапка на 1024 px', () => {
  for (const { code, path } of LANGUAGES) {
    test(`${code}: меню и кнопки в одну строку, запас под полосу прокрутки`, async ({ browser }) => {
      // Язык браузера совпадает с языком страницы, иначе инлайновый редирект
      // увёл бы `/` на `/en/` (важно только для ru).
      const context = await browser.newContext({ viewport: { width: 1024, height: 768 }, locale: code });
      const page = await context.newPage();
      await page.goto(path);

      // Таблица Google Fonts подключается с media=print и включается по
      // onload — до этого в document.fonts нет ни одного начертания Inter, и
      // document.fonts.load() молча вернул бы пустой список.
      await expect.poll(
        () => page.evaluate(() => [...document.fonts].some((f) => f.family.replace(/"/g, '') === 'Inter')),
        { message: 'Inter с fonts.googleapis.com не подключился — нет сети до Google Fonts с этой машины?', timeout: 10_000 },
      ).toBe(true);
      // Грузим ровно то, что рисует шапка: пункты меню — 400, логотип и
      // кнопки — 600; текст шапки выбирает нужные unicode-range (кириллица и т. п.).
      const font = await page.evaluate(async () => {
        const text = document.querySelector('header')?.textContent ?? '';
        try {
          const loaded = [
            ...(await document.fonts.load('400 14px Inter', text)),
            ...(await document.fonts.load('600 14px Inter', text)),
          ];
          await document.fonts.ready;
          return { faces: loaded.length, error: '' };
        } catch (e) {
          return { faces: 0, error: String(e) };
        }
      });
      expect(
        font.faces,
        `Inter не загрузился${font.error ? ` (${font.error})` : ''} — замер шёл бы по запасному шрифту`,
      ).toBeGreaterThan(0);

      const m = await page.evaluate(() => {
        const bar = document.querySelector('header > div') as HTMLElement;
        const style = getComputedStyle(bar);
        const content = bar.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const used = [...bar.children].reduce((sum, el) => sum + (el as HTMLElement).getBoundingClientRect().width, 0);
        const links = [...document.querySelectorAll('header nav a')] as HTMLElement[];
        // Кнопки десктопного блока — прямого потомка полосы шапки; мобильное
        // меню при закрытом состоянии не отрисовано вовсе.
        const ctas = [
          ...bar.querySelectorAll(':scope > div [data-cta="header-login"], :scope > div [data-cta="header-start"]'),
        ] as HTMLElement[];
        return {
          room: Math.floor(content - used),
          links: links.length,
          ctas: ctas.filter((el) => el.getBoundingClientRect().width > 0).length,
          wrapping: [...links, ...ctas]
            .filter((el) => getComputedStyle(el).whiteSpace !== 'nowrap')
            .map((el) => el.textContent?.trim()),
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        };
      });

      expect(m.links).toBe(5);
      expect(m.ctas, 'на 1024 px должны быть видны обе кнопки шапки').toBe(2);
      expect(m.wrapping, 'пункты меню и кнопки шапки должны быть white-space: nowrap').toEqual([]);
      expect(m.room, `запас в шапке ${m.room} px, нужно не меньше ${SCROLLBAR}`).toBeGreaterThanOrEqual(SCROLLBAR);
      expect(
        m.scrollWidth,
        `горизонтальная прокрутка на 1024 px: ширина документа ${m.scrollWidth} px`,
      ).toBeLessThanOrEqual(m.innerWidth);

      await context.close();
    });
  }
});
