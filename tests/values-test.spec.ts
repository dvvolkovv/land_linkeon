import { test, expect, request, type Page } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { valuesTestCodes } from '../scripts/values-test-languages.js';
import { valuesTestUrlFor } from '../scripts/site-urls.mjs';
import ru from '../src/content/values/texts/ru';
import { ITEMS, VALUE_KEYS, type ValueKey } from '../src/lib/schwartz';
import { fillTemplate } from '../src/lib/chatDraft';

const PATH = '/tests/values/';
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
const h1Of = (html: string) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';

// Сырой HTTP — так страницу видит краулер. Код ответа ничего не доказывает:
// SPA-фолбэк отдаёт 200 на любой путь, поэтому смотрим на содержимое.
test.describe('тест ценностей в сыром HTML', () => {
  test('страница, метатеги, hreflang, ценности в пререндере, Вебвизор и карта кликов выключены', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get(PATH)).text();
    const codes = valuesTestCodes();

    expect(html, 'отдана не страница теста').toContain('<html lang="ru"');
    expect(h1Of(html)).toBe(ru.h1);
    expect(count(html, /rel="canonical"/g)).toBe(1);
    expect(html).toContain(`<link rel="canonical" href="${valuesTestUrlFor('ru', DEFAULT_LANGUAGE)}"`);
    expect(count(html, /hreflang="/g), 'hreflang: языки теста + x-default').toBe(codes.length + 1);
    expect(html).toContain('hreflang="ru"');
    expect(html).toContain('hreflang="x-default"');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html, 'описания ценностей — в пререндере').toContain(ru.values.universalism.text);
    expect(html, 'карточка старта — в пререндере').toContain('data-testid="values-start"');
    expect(html).toContain('webvisor:false');
    expect(html).not.toContain('webvisor:true');
    expect(html).toContain('clickmap:false');
    expect(html).not.toContain('clickmap:true');

    const home = await (await ctx.get('/')).text();
    expect(home, 'на главной Вебвизор должен остаться').toContain('webvisor:true');
    expect(home, 'на главной карта кликов должна остаться').toContain('clickmap:true');
    await ctx.dispose();
  });

  test('на тест ведут главная (раздел ассистентов и подвал) и верх страницы Оли', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const home = await (await ctx.get('/')).text();
    const footer = home.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? '';
    expect(footer, 'в подвале главной нет ссылки на тест').toContain(`href="${PATH}"`);
    const assistants = home.match(/<section[^>]*id="assistants"[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(assistants, 'в разделе ассистентов нет ссылки на тест').toContain(`href="${PATH}"`);
    const olia = await (await ctx.get('/assistants/olia/')).text();
    const hero = olia.match(/<main[^>]*>\s*<section[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(hero, 'наверху страницы Оли нет кнопки теста').toContain(`href="${PATH}"`);
    await ctx.dispose();
  });

  /** Языки hreflang-кластера, которые не ведут на свою версию этой же страницы (как в tests/assistants.spec.ts). */
  const wrongHreflang = (html: string, codes: string[]) =>
    [...codes.map((c) => [c, valuesTestUrlFor(c, DEFAULT_LANGUAGE)]), ['x-default', valuesTestUrlFor(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE)]]
      .filter(([lang, href]) => !html.includes(`hreflang="${lang}" href="${href}"`))
      .map(([lang]) => lang);

  // Каждая нерусская версия: свой язык в <html>, ровно один canonical на
  // свой адрес, кластер hreflang ведёт на свои адреса (не только счётом —
  // по каждой цели), H1 — из текстов этого языка, Вебвизор и карта кликов
  // выключены. Пока переводов нет, цикл пуст; с Task 8 обязан пройти по
  // шести языкам.
  test('нерусские версии: язык, canonical, hreflang, H1, Вебвизор и карта кликов выключены', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const codes = valuesTestCodes();
    for (const code of codes.filter((c) => c !== DEFAULT_LANGUAGE)) {
      const html = await (await ctx.get(`/${code}/tests/values/`)).text();
      expect(html, code).toContain(`<html lang="${code}"`);
      expect(count(html, /rel="canonical"/g), `${code}: ровно один canonical`).toBe(1);
      expect(html, code).toContain(`<link rel="canonical" href="${valuesTestUrlFor(code, DEFAULT_LANGUAGE)}"`);
      expect(count(html, /hreflang="/g), `${code}: hreflang`).toBe(codes.length + 1);
      expect(wrongHreflang(html, codes), `${code}: hreflang не на свой адрес`).toEqual([]);
      // Проверено (Task 7, ревью): динамический import() .ts-модуля под Playwright
      // работает и с переменным путём — модуль текстов языка доступен прямо здесь.
      const texts = (await import(`../src/content/values/texts/${code}.ts`)).default;
      expect(h1Of(html), `${code}: H1`).toBe(texts.h1);
      expect(html, code).toContain('webvisor:false');
      expect(html, code).not.toContain('webvisor:true');
      expect(html, code).toContain('clickmap:false');
      expect(html, code).not.toContain('clickmap:true');
      expect(html, `${code}: карточка старта`).toContain('data-testid="values-start"');
    }
    await ctx.dispose();
  });

  test('sitemap: тест только на выпущенных языках', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const xml = await (await ctx.get('/sitemap.xml')).text();
    for (const code of valuesTestCodes()) expect(xml).toContain(`<loc>${valuesTestUrlFor(code, DEFAULT_LANGUAGE)}</loc>`);
    expect(count(xml, /\/tests\/values\//g)).toBe(valuesTestCodes().length);
    await ctx.dispose();
  });
});

/** Пререндер не гидратируется: ждём, пока React перерисует H1 (см. hd-calculator.spec.ts). */
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
  /** Пути всех не-GET запросов (любой метод, любое происхождение) — чтобы поймать лишний канал. */
  posts: string[];
  /** Адреса всех запросов страницы — чтобы проверить, куда она ходит, а куда нет. */
  urls: string[];
}

/**
 * Чужие адреса — заглушки; Метрика и события пишутся в массивы, чтобы
 * проверить, что туда уходят только имена целей. my.linkeon.io/chat — пустая
 * страница: нужен лишь адрес, на который ушёл переход.
 */
async function stubNetwork(page: Page, baseURL: string): Promise<Captured> {
  const captured: Captured = { ym: [], events: [], posts: [], urls: [] };
  const own = new URL(baseURL).origin;
  await page.exposeFunction('__captureYm', (args: unknown[]) => void captured.ym.push(args));
  page.on('request', (req) => {
    captured.urls.push(req.url());
    if (req.method() !== 'GET') captured.posts.push(new URL(req.url()).pathname);
  });
  await page.addInitScript(() => {
    const w = window as unknown as { ym: (...a: unknown[]) => void; __captureYm: (a: unknown[]) => void };
    w.ym = (...args: unknown[]) => w.__captureYm(args);
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

/** Кнопка ответа: подписи шкалы — ответы 1…6 по порядку. */
const answerButton = (page: Page, value: number) =>
  page.getByTestId('values-question').getByRole('button', { name: ru.question.scale[value - 1], exact: true });

/** Подпись прогресса из шаблона текстов, а не захардкоженная строка. */
const progressLabel = (n: number): string => fillTemplate(ru.question.progress, { n: String(n), total: String(ITEMS.length) });

/** Ответить на утверждения с from-го по to-е (с нуля), дожидаясь каждого. */
async function answerRange(page: Page, from: number, to: number, pick: (value: ValueKey, i: number) => number) {
  for (let i = from; i < to; i += 1) {
    await expect(page.getByTestId('values-progress-label')).toHaveText(progressLabel(i + 1));
    await answerButton(page, pick(ITEMS[i].value, i)).click();
  }
}

/** VK-пиксель (счётчик Top.Mail.Ru): его скрипт и pageView идут на этот хост. */
const isVkPixel = (url: string) => new URL(url).hostname === 'top-fwz1.mail.ru';

const PERSONA: Partial<Record<ValueKey, number>> = { selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 };
const persona = (v: ValueKey) => PERSONA[v] ?? 3;
const goalsOf = (captured: Captured) => captured.ym.filter((a) => a[1] === 'reachGoal').map((a) => a[2]);

async function begin(page: Page) {
  await page.goto(PATH);
  await clientRendered(page);
  await page.getByRole('button', { name: ru.start.begin, exact: true }).click();
}

test.describe('тест в браузере', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  // Кнопки ответа заблокированы 250 мс после смены утверждения (защита от
  // двойного тапа): полный проход — не меньше 30 × 250 мс, с перезагрузкой дольше.
  test.describe.configure({ timeout: 60_000 });

  test('на чужом HTML тест не запускается: /ru/tests/values/ уводит на канонический адрес', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    // dist/ru/tests/values/ нет — сервер отдаёт главную с Вебвизором; тест на ней запускаться не должен.
    await page.goto('/ru/tests/values/');
    await page.waitForURL((url) => url.pathname === PATH);
    await clientRendered(page);
    await expect(page.getByTestId('values-start')).toBeVisible();
    const html = await page.content();
    expect(html).toContain('webvisor:false');

    // На каноническом адресе страница переинициализирует Метрику своим снипетом —
    // последний вызов init должен нести выключенные Вебвизор и карту кликов.
    const last = captured.ym[captured.ym.length - 1];
    expect(last[1]).toBe('init');
    expect(last[2]).toMatchObject({ webvisor: false, clickmap: false });
  });

  test('прохождение: ведущие ценности, ссылка к Оле с черновиком, в аналитику — только имена целей', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, ITEMS.length, persona);

    await expect(page.getByTestId('values-result')).toBeVisible();
    await expect(page.locator('#values-result-heading')).toBeFocused();
    await expect(page.getByTestId('values-top').locator('li')).toHaveCount(3);
    for (const k of ['selfDirection', 'stimulation', 'benevolence'] as const) {
      await expect(page.getByTestId('values-top')).toContainText(ru.values[k].name);
    }
    await expect(page.getByTestId('values-bottom')).toContainText(ru.values.power.name);
    await expect(page.getByTestId('values-axes')).toHaveText(`${ru.axes.change.left} ${ru.axes.focus.left}`);
    await expect(page.getByTestId('values-all').locator('li')).toHaveCount(10);

    // Вторая линия от Вебвизора; круг — картинкой с общими словами в alt.
    await expect(page.getByTestId('values-test')).toHaveClass(/\bym-hide-content\b/);
    await expect(page.getByTestId('values-circle')).toHaveAttribute('src', /^data:image\/svg\+xml/);
    await expect(page.getByTestId('values-circle')).toHaveAttribute('alt', ru.result.circleAlt);

    // Прохождение не меняет адрес лендинга: без #draft и без лишних параметров —
    // черновик собирается только в момент клика, не раньше.
    const landingUrl = new URL(page.url());
    expect(landingUrl.pathname).toBe(PATH);
    expect(landingUrl.hash).toBe('');
    expect(landingUrl.search).toBe('');

    const cta = page.locator('[data-cta="values-test-to-olia"]');
    const href = (await cta.getAttribute('href')) ?? '';
    expect(href, 'в href не должно быть черновика').not.toContain('#');
    expect(href, 'в href не должно быть черновика').not.toContain('draft');
    expect(new URL(href).searchParams.get('assistant')).toBe('2');

    await cta.click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const url = new URL(page.url());
    expect(url.searchParams.get('assistant')).toBe('2');
    expect(url.searchParams.get('utm_content')).toBe('values-test');
    expect(url.hash.startsWith('#draft=')).toBe(true);
    const draft = decodeURIComponent(url.hash.slice('#draft='.length));
    // Точный черновик для этой персоны, а не фрагменты через toContain —
    // собран из тех же текстов ru.ts, что и valuesDraft.ts.
    expect(draft).toBe(
      fillTemplate(ru.message, {
        // Склейка — литералами, а не joinAnd/joinClauses: иначе e2e повторял бы
        // проверяемый код. Русские правила: «, … и …» и «; ».
        top: `${ru.values.selfDirection.inMessage}, ${ru.values.stimulation.inMessage} и ${ru.values.benevolence.inMessage}`,
        rest: fillTemplate(ru.bottomInMessage, { bottom: ru.values.power.inMessage }),
        axes: `${ru.axesInMessage.change.left}; ${ru.axesInMessage.focus.left}`,
      }),
    );

    // Форма каждого не-init вызова Метрики: только имя цели, никаких данных со страницы.
    for (const call of captured.ym) {
      if (call[1] === 'init') continue;
      expect(call).toEqual([expect.any(Number), 'reachGoal', expect.any(String)]);
    }
    const goals = goalsOf(captured);
    expect(goals).toEqual(['values-test-start', 'values-test-complete', 'values-test-to-olia']);
    const sent = JSON.stringify(captured.ym) + captured.events.join('\n');
    for (const k of VALUE_KEYS) {
      expect(sent, `ключ «${k}» ушёл в аналитику`).not.toContain(`"${k}"`);
      expect(sent, `«${ru.values[k].name}» ушло в аналитику`).not.toContain(ru.values[k].name);
      expect(sent, `«${ru.values[k].inMessage}» ушло в аналитику`).not.toContain(ru.values[k].inMessage);
    }
    // Канал событий жив: клик к Оле дошёл как landing_cta_click — иначе проверка
    // «начало и завершение не в таблице» смотрела бы в пустой массив.
    expect(captured.events.some((e) => e.includes('landing_cta_click') && e.includes('values-test-to-olia'))).toBe(true);
    expect(captured.events.join('\n')).not.toContain('values-test-start');
    expect(captured.events.join('\n')).not.toContain('values-test-complete');
    // Единственный не-GET адрес за весь проход — канал событий; лишних путей нет.
    expect([...new Set(captured.posts)]).toEqual(['/webhook/events/track']);
    // VK-пиксель за весь проход не загружался (что перехват его видит — в тесте ниже).
    expect(captured.urls.filter(isVkPixel)).toEqual([]);
  });

  test('VK-пиксель: на главной загружается, на странице теста — нет', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    // Не вслепую: на главной запрос к пикселю есть — значит, перехват его видит.
    const homePixel = page.waitForRequest((req) => isVkPixel(req.url()));
    await page.goto('/');
    await homePixel;
    await expect(page.locator('#tmr-code')).toHaveCount(1);

    const before = captured.urls.length;
    await page.goto(PATH);
    await clientRendered(page);
    expect(captured.urls.length, 'перехват на странице теста ничего не увидел').toBeGreaterThan(before);
    expect(captured.urls.slice(before).filter(isVkPixel)).toEqual([]);
    await expect(page.locator('#tmr-code')).toHaveCount(0);
    expect(await page.evaluate(() => '_tmr' in window)).toBe(false);
  });

  test('«Назад» показывает прежний ответ; перезагрузка — «Продолжить» с того же места', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, 5, (_, i) => 6 - i);
    await expect(page.getByTestId('values-progress-label')).toHaveText(progressLabel(6));
    await page.getByRole('button', { name: ru.question.back }).click();
    await expect(page.getByTestId('values-progress-label')).toHaveText(progressLabel(5));
    await expect(answerButton(page, 2)).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await clientRendered(page);
    const resume = fillTemplate(ru.start.resume, { done: '5', total: String(ITEMS.length) });
    await page.getByRole('button', { name: resume }).click();
    await expect(page.getByTestId('values-progress-label')).toHaveText(progressLabel(5));
    await expect(answerButton(page, 2)).toHaveAttribute('aria-pressed', 'true');
  });

  test('одинаковые ответы — «приоритеты не выделились» и своё сообщение Оле', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, ITEMS.length, () => 4);
    await expect(page.getByTestId('values-flat')).toContainText(ru.result.flatHeading);
    await expect(page.getByTestId('values-top')).toHaveCount(0);
    await page.locator('[data-cta="values-test-to-olia"]').click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    expect(decodeURIComponent(new URL(page.url()).hash.slice('#draft='.length))).toBe(ru.messageFlat);
  });

  test('остальные ценности набрали поровну — ведущих без наименее важной, своё сообщение Оле', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    const restEqual: Partial<Record<ValueKey, number>> = { selfDirection: 5, stimulation: 5 };
    await answerRange(page, 0, ITEMS.length, (v) => restEqual[v] ?? 4);
    await expect(page.getByTestId('values-top').locator('li')).toHaveCount(2);
    await expect(page.getByRole('heading', { name: ru.result.topHeading, exact: true })).toBeVisible();
    await expect(page.getByTestId('values-rest-equal')).toHaveText(ru.result.restEqual);
    await expect(page.getByTestId('values-bottom')).toHaveCount(0);
    await page.locator('[data-cta="values-test-to-olia"]').click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const draft = decodeURIComponent(new URL(page.url()).hash.slice('#draft='.length));
    expect(draft).toContain(ru.restEqualInMessage);
  });

  test('полная ничья — помечена под карточками и в сообщении Оле', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    const tie: Partial<Record<ValueKey, number>> = { selfDirection: 6, stimulation: 6, benevolence: 5, universalism: 5 };
    await answerRange(page, 0, ITEMS.length, (v) => tie[v] ?? 3);
    await expect(page.getByTestId('values-top').getByTestId('values-tie')).toHaveText(
      ru.result.tiedWith.replace('{names}', ru.values.universalism.name),
    );
    await expect(page.getByTestId('values-bottom').getByTestId('values-tie')).toContainText(ru.values.hedonism.name);
    await page.locator('[data-cta="values-test-to-olia"]').click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const draft = decodeURIComponent(new URL(page.url()).hash.slice('#draft='.length));
    expect(draft).toContain(ru.tiedInMessage.replace('{names}', ru.values.universalism.inMessage));
  });

  test('пройденный тест после перезагрузки — сразу результат, цель не повторяется; «Пройти заново»', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, ITEMS.length, persona);
    await expect(page.getByTestId('values-result')).toBeVisible();

    await page.reload();
    await clientRendered(page);
    await expect(page.getByTestId('values-result')).toBeVisible();
    expect(goalsOf(captured).filter((g) => g === 'values-test-complete')).toHaveLength(1);

    await page.getByRole('button', { name: ru.result.restart }).click();
    await expect(page.getByTestId('values-progress-label')).toHaveText(progressLabel(1));
    expect(goalsOf(captured).filter((g) => g === 'values-test-start')).toHaveLength(2);
    // «Пройти заново» не трогает счётчик завершений — цель поднята из старого
    // прогресса при перезагрузке, новый проход ещё не окончен.
    expect(goalsOf(captured).filter((g) => g === 'values-test-complete')).toHaveLength(1);
  });
});
