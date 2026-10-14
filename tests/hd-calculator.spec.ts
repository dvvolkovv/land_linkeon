import { test, expect, request, type Page } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { hdCalcCodes } from '../scripts/hd-calc-languages.js';
import { hdCalcUrlFor } from '../scripts/site-urls.mjs';
import ru from '../src/content/hd/texts/ru';
import type { HdTexts } from '../src/content/hd/types';
import { fillTemplate } from '../src/lib/chatDraft';

const PATH = '/calculators/human-design/';
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
// renderToString экранирует ', ", <, > и & — без раскодирования апостроф во
// французском H1 или подписи ложно не совпал бы с текстом .ts-модуля (как в
// values-test.spec.ts). &amp; — последним, чтобы не раскодировать &amp;lt; дважды.
const decodeHtmlEntities = (s: string): string =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const h1Of = (html: string) => decodeHtmlEntities(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
const creditsOf = (html: string) => html.match(/<p[^>]*data-testid="hd-credits"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '';

/** Языки hreflang-кластера, которые не ведут на свою версию калькулятора (как в values-test.spec.ts). */
const wrongHreflang = (html: string, codes: string[]) =>
  [...codes.map((c) => [c, hdCalcUrlFor(c, DEFAULT_LANGUAGE)]), ['x-default', hdCalcUrlFor(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE)]]
    .filter(([lang, href]) => !html.includes(`hreflang="${lang}" href="${href}"`))
    .map(([lang]) => lang);

// Сырой HTTP — так страницу видит краулер. Код ответа ничего не доказывает:
// SPA-фолбэк отдаёт 200 на любой путь, поэтому смотрим на содержимое.
test.describe('калькулятор Human Design в сыром HTML', () => {
  test('страница, метатеги, hreflang только по выпущенным языкам', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get(PATH)).text();
    const codes = hdCalcCodes();
    // Калькулятор выпущен на всех семи языках сайта: без этого счёт hreflang
    // ниже мог бы тихо сойтись и на одном русском (1 + x-default).
    expect(codes, 'калькулятор — на всех семи языках').toHaveLength(7);

    expect(html, 'отдана не страница калькулятора').toContain('<html lang="ru"');
    expect(h1Of(html)).toBe(ru.h1);
    expect(count(html, /rel="canonical"/g)).toBe(1);
    expect(html).toContain(`<link rel="canonical" href="${hdCalcUrlFor('ru', DEFAULT_LANGUAGE)}"`);
    expect(count(html, /hreflang="/g), 'hreflang: языки калькулятора + x-default').toBe(codes.length + 1);
    expect(wrongHreflang(html, codes), 'hreflang не на свой адрес').toEqual([]);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html, 'описания пяти типов — в пререндере').toContain(ru.types.reflector.text);
    expect(html, 'подпись GeoNames').toContain('href="https://www.geonames.org/"');
    expect(html).toContain('href="/licenses.txt"');
    await ctx.dispose();
  });

  // Каждая нерусская версия: свой язык в <html>, ровно один canonical на свой
  // адрес, кластер hreflang ведёт на свои адреса (по каждой цели, не только
  // счётом), H1 и подпись GeoNames — из текстов этого языка, со ссылками на
  // GeoNames, лицензию CC BY 4.0 и файл лицензий.
  test('нерусские версии: язык, canonical, hreflang, H1, кредиты GeoNames', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const codes = hdCalcCodes();
    const nonRu = codes.filter((c) => c !== DEFAULT_LANGUAGE);
    // Цикл не должен молча оказаться пустым — иначе ни один expect() в нём не
    // выполнится, а тест будет зелёным.
    expect(nonRu, 'переводы есть — цикл не должен быть пустым').toHaveLength(6);
    for (const code of nonRu) {
      const html = await (await ctx.get(`/${code}${PATH}`)).text();
      expect(html, code).toContain(`<html lang="${code}"`);
      expect(count(html, /rel="canonical"/g), `${code}: ровно один canonical`).toBe(1);
      expect(html, code).toContain(`<link rel="canonical" href="${hdCalcUrlFor(code, DEFAULT_LANGUAGE)}"`);
      expect(count(html, /hreflang="/g), `${code}: hreflang`).toBe(codes.length + 1);
      expect(wrongHreflang(html, codes), `${code}: hreflang не на свой адрес`).toEqual([]);
      const texts: HdTexts = (await import(`../src/content/hd/texts/${code}.ts`)).default;
      expect(h1Of(html), `${code}: H1`).toBe(texts.h1);
      const credits = creditsOf(html);
      expect(decodeHtmlEntities(credits), `${code}: подпись GeoNames на языке страницы`).toContain(texts.credits);
      expect(credits, `${code}: ссылка на GeoNames`).toContain('href="https://www.geonames.org/"');
      expect(credits, `${code}: ссылка на CC BY 4.0`).toContain('href="https://creativecommons.org/licenses/by/4.0/"');
      expect(credits, `${code}: ссылка на файл лицензий`).toContain('href="/licenses.txt"');
      expect(decodeHtmlEntities(credits), `${code}: подпись ссылки на лицензии`).toContain(texts.licenses);
    }
    await ctx.dispose();
  });

  test('лицензии — текстом, с MIT astronomy-engine и GeoNames', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/licenses.txt');
    expect(res.headers()['content-type'] ?? '').toContain('text/plain');
    const text = await res.text();
    expect(text).toContain('Astronomy Engine');
    expect(text).toContain('MIT License');
    expect(text).toContain('GeoNames');
    expect(text).toContain('CC BY 4.0');
    await ctx.dispose();
  });

  test('на калькулятор ведут подвал главной и FAQ Райи', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const home = await (await ctx.get('/')).text();
    const footer = home.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? '';
    expect(footer, 'в подвале главной нет ссылки на калькулятор').toContain(`href="${PATH}"`);
    const raya = await (await ctx.get('/assistants/raya/')).text();
    const faq = raya.match(/<section[^>]*data-testid="assistant-faq"[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(faq, 'в FAQ Райи нет ссылки на калькулятор').toContain(`href="${PATH}"`);
    await ctx.dispose();
  });

  test('sitemap: калькулятор только на выпущенных языках', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const xml = await (await ctx.get('/sitemap.xml')).text();
    for (const code of hdCalcCodes()) expect(xml).toContain(`<loc>${hdCalcUrlFor(code, DEFAULT_LANGUAGE)}</loc>`);
    expect(count(xml, /\/calculators\/human-design\//g)).toBe(hdCalcCodes().length);
    await ctx.dispose();
  });
});

/** Пререндер не гидратируется: ждём, пока React перерисует H1 (см. assistants.spec.ts). */
async function clientRendered(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 !== null && Object.keys(h1).some((key) => key.startsWith('__reactFiber$'));
      }),
    )
    .toBe(true);
}

interface Captured {
  ym: unknown[][];
  events: string[];
  /** Языки баз городов, которые запросила страница, — по запросу на каждый. */
  cityBases: string[];
}

/**
 * Чужие адреса — заглушки; Метрика и события пишутся в массивы, чтобы проверить,
 * что туда уходит только факт расчёта. my.linkeon.io/chat — пустая страница:
 * нужен лишь адрес, на который ушёл переход.
 */
async function stubNetwork(page: Page, baseURL: string): Promise<Captured> {
  const captured: Captured = { ym: [], events: [], cityBases: [] };
  const own = new URL(baseURL).origin;
  await page.exposeFunction('__captureYm', (args: unknown[]) => void captured.ym.push(args));
  await page.addInitScript(() => {
    const w = window as unknown as { ym: (...a: unknown[]) => void; __captureYm: (a: unknown[]) => void };
    w.ym = (...args: unknown[]) => w.__captureYm(args);
  });
  page.on('request', (r) => {
    const base = new URL(r.url()).pathname.match(/\/assets\/cities\.([a-z]{2})-[\w-]+\.json$/);
    if (base) captured.cityBases.push(base[1]);
  });
  await page.route(
    (url) => url.origin !== own,
    (route) => {
      const url = new URL(route.request().url());
      if (url.pathname === '/webhook/events/track') captured.events.push(route.request().postData() ?? '');
      if (url.origin === 'https://my.linkeon.io' && url.pathname === '/chat') {
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>чат</title>' });
      }
      const type = route.request().resourceType();
      return route.fulfill({
        status: 200,
        contentType: type === 'stylesheet' ? 'text/css' : type === 'script' ? 'text/javascript' : 'text/plain',
        body: '',
        headers: { 'access-control-allow-origin': '*' },
      });
    },
  );
  return captured;
}

async function pickCity(page: Page, typed: string, name: string) {
  await page.locator('#hd-city').fill(typed);
  await page.getByRole('option', { name: new RegExp(`^${name}`) }).first().click();
}

/**
 * Ввод и результат спрятаны от Вебвизора — на любом языке: поля —
 * ym-disable-keys, строки с данными и весь блок результата — ym-hide-content.
 * Зовётся после расчёта, когда на странице уже есть и строка пояса, и результат.
 */
async function expectHiddenFromWebvisor(page: Page) {
  for (const id of ['#hd-date', '#hd-time', '#hd-city']) {
    await expect(page.locator(id)).toHaveClass(/\bym-disable-keys\b/);
  }
  await expect(page.getByTestId('hd-zone-line')).toHaveClass(/\bym-hide-content\b/);
  await expect(page.getByTestId('hd-data-line')).toHaveClass(/\bym-hide-content\b/);
  // Весь блок результата скрыт от Вебвизора, а схема — картинкой: атрибуты
  // разметки (data-gate, fill) Вебвизор пишет даже внутри ym-hide-content.
  // svg ищем только в схеме: стрелка на кнопке к Райе — тоже svg, но без данных.
  const resultBlock = page.getByTestId('hd-result');
  await expect(resultBlock).toHaveClass(/\bym-hide-content\b/);
  expect(await resultBlock.locator('[data-testid="hd-bodygraph"] svg, [data-gate], [data-source], [data-center]').count()).toBe(0);
  await expect(resultBlock.locator('[data-testid="hd-bodygraph"] img')).toHaveCount(1);
}

/** Метрика и наша таблица событий получили только имена целей — без даты, времени и города. */
function expectNoBirthDataInAnalytics(captured: Captured, secrets: string[]) {
  const goals = captured.ym.filter((a) => a[1] === 'reachGoal').map((a) => a[2]);
  expect(goals).toEqual(expect.arrayContaining(['hd-calc-submit', 'hd-calc-to-raya']));
  const sent = JSON.stringify(captured.ym) + captured.events.join('\n');
  for (const secret of secrets) expect(sent, `«${secret}» ушло в аналитику`).not.toContain(secret);
  // Канал событий жив: клик к Райе дошёл как landing_cta_click — иначе
  // «расчёт не попал в таблицу» проверял бы пустой массив.
  expect(captured.events.some((e) => e.includes('landing_cta_click') && e.includes('hd-calc-to-raya'))).toBe(true);
  // Расчёт — только цель Метрики: в нашей таблице событий landing_cta_click —
  // шаг «Нажал „Начать“» воронки, а расчёт не переход в приложение.
  expect(captured.events.join('\n')).not.toContain('hd-calc-submit');
}

test.describe('калькулятор в браузере', () => {
  test('известное рождение: тип и профиль, ссылка к Райе с черновиком, без утечек', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);

    // База городов — только по фокусу на поле города, одна и русская.
    expect(captured.cityBases, 'города загрузились без фокуса').toEqual([]);
    await page.locator('#hd-date').fill('1990-03-12');
    await page.locator('#hd-time').fill('14:25');
    await page.locator('#hd-city').focus();
    await pickCity(page, 'Каза', 'Казань');
    expect(captured.cityBases).toEqual(['ru']);
    await expect(page.getByTestId('hd-zone-line')).toHaveText('Казань (Республика Татарстан, Россия), UTC+3 на дату рождения');

    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByTestId('hd-type')).toHaveText(ru.types.manifestor.name);
    await expect(page.getByTestId('hd-profile')).toContainText('5/2');
    await expect(page.getByTestId('hd-data-line')).toHaveText('12.03.1990, 14:25, Казань (UTC+3)');

    // Поля, строки с данными и весь блок результата спрятаны от Вебвизора.
    await expectHiddenFromWebvisor(page);
    // После расчёта фокус — на заголовке результата: скринридер его объявит.
    await expect(page.locator('#hd-result-heading')).toBeFocused();

    const cta = page.locator('[data-cta="hd-calc-to-raya"]');
    const href = (await cta.getAttribute('href')) ?? '';
    expect(href, 'в href не должно быть черновика').not.toContain('#');
    expect(href).not.toContain('1990');
    expect(new URL(href).searchParams.get('assistant')).toBe('14');

    await cta.click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const url = new URL(page.url());
    expect(url.searchParams.get('assistant')).toBe('14');
    expect(url.searchParams.get('utm_content')).toBe('hd-calc');
    expect(url.hash.startsWith('#draft=')).toBe(true);
    const draft = decodeURIComponent(url.hash.slice('#draft='.length));
    for (const part of ['12.03.1990', '14:25', 'Казань', 'UTC+3', ru.types.manifestor.name, '5/2', ru.authorities.emotional.inMessage]) {
      expect(draft).toContain(part);
    }

    expectNoBirthDataInAnalytics(captured, ['1990', '14:25', 'Казань']);
  });

  test('час перевода стрелок: спрашиваем «до или после»', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);
    await page.locator('#hd-date').fill('2014-10-26');
    await page.locator('#hd-time').fill('01:30');
    await page.locator('#hd-city').focus();
    await pickCity(page, 'Москв', 'Москва');
    await expect(page.getByTestId('hd-dst')).toBeVisible();
    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByRole('alert')).toHaveText(ru.form.dstChoose);
    await expect(page.getByTestId('hd-result')).toHaveCount(0);
    await page.getByRole('radio').last().check();
    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByTestId('hd-result')).toBeVisible();
    await expect(page.getByTestId('hd-data-line')).toHaveText('26.10.2014, 01:30, Москва (UTC+3)');
  });

  test('после перезагрузки форма пустая', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);
    await page.locator('#hd-date').fill('1990-03-12');
    await page.reload();
    await clientRendered(page);
    await expect(page.locator('#hd-date')).toHaveValue('');
  });
});

/**
 * Полный проход не только по-русски: то же рождение (12.03.1990, 14:25), но
 * на /zh/ и /en/ с городом из базы своего языка. Ожидаемые дата, строка данных
 * и пояс — литералами, а не вызовом formatBirthDate/formatOffset: иначе e2e
 * повторял бы проверяемый код и не заметил бы его регрессии. Пояс проверен
 * прогоном: Пекин в марте 1990-го — UTC+8 (летнее время Китая началось
 * 15 апреля), Лондон — UTC+0 (BST с 25 марта).
 */
const FOREIGN_CASES = [
  {
    code: 'zh',
    locale: 'zh-CN',
    typed: '北京',
    city: '北京',
    country: '中国',
    offset: 'UTC+8',
    date: '1990年3月12日',
    dataLine: '1990年3月12日 14:25，北京（UTC+8）',
  },
  {
    code: 'en',
    locale: 'en-GB',
    typed: 'London',
    city: 'London',
    country: 'United Kingdom',
    offset: 'UTC+0',
    date: '12 March 1990',
    dataLine: '12 March 1990, 14:25, London (UTC+0)',
  },
] as const;

for (const c of FOREIGN_CASES) {
  test.describe(`калькулятор в браузере — ${c.code}`, () => {
    // locale контекста — язык страницы: иначе LanguageBanner предложил бы
    // сменить язык (см. values-test.spec.ts) — лишний баннер над формой.
    test.use({ locale: c.locale });

    test(`полный проход: база городов ${c.code}, дата месяцем словом, к Райе с lang=${c.code}, без утечек`, async ({
      page,
      baseURL,
    }) => {
      const texts: HdTexts = (await import(`../src/content/hd/texts/${c.code}.ts`)).default;
      const captured = await stubNetwork(page, baseURL!);
      await page.goto(`/${c.code}${PATH}`);
      await clientRendered(page);
      await expect(page.locator('html')).toHaveAttribute('lang', c.code);

      // База городов — по фокусу, одна и на языке страницы (не русская).
      expect(captured.cityBases, 'города загрузились без фокуса').toEqual([]);
      await page.locator('#hd-date').fill('1990-03-12');
      await page.locator('#hd-time').fill('14:25');
      await page.locator('#hd-city').focus();
      // До выбора города: с чужой базой подсказки «北京»/«London» просто не
      // нашлись бы, и тест упал бы на таймауте клика, а не на причине.
      await expect.poll(() => captured.cityBases, { message: 'база городов не на языке страницы' }).toEqual([c.code]);
      await pickCity(page, c.typed, c.city);
      const zoneLine = page.getByTestId('hd-zone-line');
      await expect(zoneLine).toContainText(c.city);
      // Страна — из той же базы: «中国» / «United Kingdom», а не «Китай» / «Великобритания».
      await expect(zoneLine).toContainText(c.country);
      await expect(zoneLine).toContainText(c.offset);

      await page.getByRole('button', { name: texts.form.submit }).click();
      await expect(page.getByTestId('hd-result')).toBeVisible();
      const type = (await page.getByTestId('hd-type').textContent()) ?? '';
      expect(Object.values(texts.types).map((t) => t.name), 'тип — не из текстов языка страницы').toContain(type);
      const profile = ((await page.getByTestId('hd-profile').textContent()) ?? '').split(' · ')[0];
      expect(profile).toMatch(/^[1-6]\/[1-6]$/);
      const authorityName = (await page.getByTestId('hd-authority').textContent()) ?? '';
      const authority = Object.values(texts.authorities).find((a) => a.name === authorityName);
      expect(authority, `авторитет «${authorityName}» — не из текстов языка страницы`).toBeDefined();
      const authorityInMessage = authority?.inMessage ?? '';
      await expect(page.getByTestId('hd-data-line')).toHaveText(c.dataLine);

      await expectHiddenFromWebvisor(page);

      const cta = page.locator('[data-cta="hd-calc-to-raya"]');
      const href = (await cta.getAttribute('href')) ?? '';
      expect(href, 'в href не должно быть черновика').not.toContain('#');
      expect(href).not.toContain('1990');
      expect(new URL(href).searchParams.get('lang')).toBe(c.code);

      await cta.click();
      await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
      const url = new URL(page.url());
      expect(url.searchParams.get('assistant')).toBe('14');
      expect(url.searchParams.get('utm_content')).toBe('hd-calc');
      expect(url.searchParams.get('lang'), 'Райя должна ответить на языке страницы').toBe(c.code);
      expect(url.hash.startsWith('#draft=')).toBe(true);
      const draft = decodeURIComponent(url.hash.slice('#draft='.length));
      for (const part of [c.date, '14:25', c.city, c.offset, type, profile, authorityInMessage]) {
        expect(draft).toContain(part);
      }
      // И целиком — шаблон языка страницы, а не русский с подставленными данными.
      expect(draft).toBe(
        fillTemplate(texts.message, {
          date: c.date,
          time: '14:25',
          city: c.city,
          offset: c.offset,
          type,
          profile,
          authority: authorityInMessage,
        }),
      );

      // Больше баз городов страница не тянула.
      expect(captured.cityBases).toEqual([c.code]);
      expectNoBirthDataInAnalytics(captured, ['1990', '14:25', c.city]);
    });
  });
}
