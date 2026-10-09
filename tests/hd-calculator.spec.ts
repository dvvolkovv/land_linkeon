import { test, expect, request, type Page } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { hdCalcCodes } from '../scripts/hd-calc-languages.js';
import { hdCalcUrlFor } from '../scripts/site-urls.mjs';
import ru from '../src/content/hd/texts/ru';

const PATH = '/calculators/human-design/';
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
const h1Of = (html: string) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';

// Сырой HTTP — так страницу видит краулер. Код ответа ничего не доказывает:
// SPA-фолбэк отдаёт 200 на любой путь, поэтому смотрим на содержимое.
test.describe('калькулятор Human Design в сыром HTML', () => {
  test('страница, метатеги, hreflang только по выпущенным языкам', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get(PATH)).text();
    const codes = hdCalcCodes();

    expect(html, 'отдана не страница калькулятора').toContain('<html lang="ru"');
    expect(h1Of(html)).toBe(ru.h1);
    expect(count(html, /rel="canonical"/g)).toBe(1);
    expect(html).toContain(`<link rel="canonical" href="${hdCalcUrlFor('ru', DEFAULT_LANGUAGE)}"`);
    expect(count(html, /hreflang="/g), 'hreflang: языки калькулятора + x-default').toBe(codes.length + 1);
    expect(html).toContain(`hreflang="x-default" href="${hdCalcUrlFor(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE)}"`);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html, 'описания пяти типов — в пререндере').toContain(ru.types.reflector.text);
    expect(html, 'подпись GeoNames').toContain('href="https://www.geonames.org/"');
    expect(html).toContain('href="/licenses.txt"');
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
  cityRequests: number;
}

/**
 * Чужие адреса — заглушки; Метрика и события пишутся в массивы, чтобы проверить,
 * что туда уходит только факт расчёта. my.linkeon.io/chat — пустая страница:
 * нужен лишь адрес, на который ушёл переход.
 */
async function stubNetwork(page: Page, baseURL: string): Promise<Captured> {
  const captured: Captured = { ym: [], events: [], cityRequests: 0 };
  const own = new URL(baseURL).origin;
  await page.exposeFunction('__captureYm', (args: unknown[]) => void captured.ym.push(args));
  await page.addInitScript(() => {
    const w = window as unknown as { ym: (...a: unknown[]) => void; __captureYm: (a: unknown[]) => void };
    w.ym = (...args: unknown[]) => w.__captureYm(args);
  });
  page.on('request', (r) => {
    if (/\/assets\/cities\.ru-[\w-]+\.json$/.test(new URL(r.url()).pathname)) captured.cityRequests += 1;
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

test.describe('калькулятор в браузере', () => {
  test('известное рождение: тип и профиль, ссылка к Райе с черновиком, без утечек', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);

    // База городов — только по фокусу на поле города.
    expect(captured.cityRequests, 'города загрузились без фокуса').toBe(0);
    await page.locator('#hd-date').fill('1990-03-12');
    await page.locator('#hd-time').fill('14:25');
    await page.locator('#hd-city').focus();
    await pickCity(page, 'Каза', 'Казань');
    expect(captured.cityRequests).toBe(1);
    await expect(page.getByTestId('hd-zone-line')).toHaveText('Казань (Республика Татарстан, Россия), UTC+3 на дату рождения');

    // Поля и строки с данными спрятаны от Вебвизора.
    for (const id of ['#hd-date', '#hd-time', '#hd-city']) {
      await expect(page.locator(id)).toHaveClass(/\bym-disable-keys\b/);
    }
    await expect(page.getByTestId('hd-zone-line')).toHaveClass(/\bym-hide-content\b/);

    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByTestId('hd-type')).toHaveText(ru.types.manifestor.name);
    await expect(page.getByTestId('hd-profile')).toContainText('5/2');
    await expect(page.getByTestId('hd-data-line')).toHaveClass(/\bym-hide-content\b/);
    await expect(page.getByTestId('hd-data-line')).toHaveText('12.03.1990, 14:25, Казань (UTC+3)');

    // Весь блок результата скрыт от Вебвизора, а схема — картинкой: атрибуты
    // разметки (data-gate, fill) Вебвизор пишет даже внутри ym-hide-content.
    // svg ищем только в схеме: стрелка на кнопке к Райе — тоже svg, но без данных.
    const resultBlock = page.getByTestId('hd-result');
    await expect(resultBlock).toHaveClass(/\bym-hide-content\b/);
    expect(await resultBlock.locator('[data-testid="hd-bodygraph"] svg, [data-gate], [data-source], [data-center]').count()).toBe(0);
    await expect(resultBlock.locator('[data-testid="hd-bodygraph"] img')).toHaveCount(1);
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

    // Метрика и наша таблица событий получили только имена целей.
    const goals = captured.ym.filter((a) => a[1] === 'reachGoal').map((a) => a[2]);
    expect(goals).toEqual(expect.arrayContaining(['hd-calc-submit', 'hd-calc-to-raya']));
    const sent = JSON.stringify(captured.ym) + captured.events.join('\n');
    for (const secret of ['1990', '14:25', 'Казань']) expect(sent, `«${secret}» ушло в аналитику`).not.toContain(secret);
    // Расчёт — только цель Метрики: в нашей таблице событий landing_cta_click —
    // шаг «Нажал „Начать“» воронки, а расчёт не переход в приложение.
    expect(captured.events.join('\n')).not.toContain('hd-calc-submit');
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
