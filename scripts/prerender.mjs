#!/usr/bin/env node
/**
 * Рендерит лендинг на каждом ВЫПУЩЕННОМ языке в статический HTML.
 *
 * Зачем: без этого поисковик видит пустой <div id="root"> и языковые версии
 * не индексируются вообще. Клиент всё равно перерисует страницу (createRoot),
 * так что эта разметка — для краулера и первого кадра.
 *
 * Выпущенный ≠ поддерживаемый: язык с пустой локалью отдал бы русский текст
 * под своим <html lang>, своим canonical и своей строкой в sitemap — четыре
 * индексируемых дубля одного контента плюс ложный hreflang. Поэтому и
 * страницы, и hreflang-кластер, и og:locale:alternate, и sitemap строятся
 * из translatedLanguages(), а не из реестра.
 *
 * Раздел ассистентов (/assistants/ и /assistants/<slug>/) строится по своему
 * списку — assistantPageCodes() из assistant-page-languages.js: язык выпущен
 * у сайта И у него есть модуль текстов src/content/assistants/pages/<код>.ts.
 * Из него же — hreflang/og:locale:alternate этих страниц и их строки в
 * sitemap: язык, выпущенный у главной, но ещё без переведённых страниц, в
 * раздел ассистентов не попадает.
 *
 * Калькулятор Human Design (/calculators/human-design/) — по своему списку
 * языков, hdCalcCodes() из hd-calc-languages.js, тем же способом.
 *
 * Тест ценностей (/tests/values/) — по своему списку языков,
 * valuesTestCodes() из values-test-languages.js. На его странице Вебвизор и
 * карта кликов выключены: подстановки webvisor:true → webvisor:false и
 * clickmap:true → clickmap:false только в её HTML.
 *
 * Последним блоком скрипт проверяет, что тексты страниц ассистентов и код
 * калькулятора не попали во входной бандл клиента: их место — в своих чанках.
 *
 * Запускается из pnpm build ПОСЛЕ обеих сборок vite.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { ASSISTANTS, ASSISTANT_SLUGS } from '../src/content/assistants/roster.data.js';
import { translatedCodes } from './translated-languages.js';
import { assistantPageCodes } from './assistant-page-languages.js';
import { hdCalcCodes } from './hd-calc-languages.js';
import { valuesTestCodes } from './values-test-languages.js';
import {
  LEGAL_SLUGS,
  sitemapUrls,
  urlFor as siteUrlFor,
  legalUrlFor as siteLegalUrlFor,
  deleteUrlFor as siteDeleteUrlFor,
  assistantsCatalogUrlFor as siteAssistantsCatalogUrlFor,
  assistantUrlFor as siteAssistantUrlFor,
  hdCalcUrlFor as siteHdCalcUrlFor,
  valuesTestUrlFor as siteValuesTestUrlFor,
} from './site-urls.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

const PUBLISHED_CODES = translatedCodes();

// Языки страниц ассистентов: выпущенные у сайта И с модулем текстов. hreflang
// этих страниц перечисляет только их — ссылка на несуществующую версию была
// бы ложным hreflang.
const ASSISTANT_CODES = assistantPageCodes();

// Языки калькулятора Human Design — так же: выпущенные у сайта И с текстами.
const HD_CALC_CODES = hdCalcCodes();

// Языки теста ценностей — так же.
const VALUES_TEST_CODES = valuesTestCodes();

const OG_LOCALES = Object.fromEntries(SUPPORTED_LANGUAGES.map((l) => [l.code, l.ogLocale]));

// Правила адресов — из общего модуля: их же читает тест на sitemap. Здесь
// только связывание с DEFAULT_LANGUAGE, чтобы остальной файл звал их как
// раньше, одним аргументом.
const urlFor = (code) => siteUrlFor(code, DEFAULT_LANGUAGE);
const legalUrlFor = (code, slug) => siteLegalUrlFor(code, slug, DEFAULT_LANGUAGE);
const deleteUrlFor = (code) => siteDeleteUrlFor(code, DEFAULT_LANGUAGE);

// Каталоги в dist остаются здесь: они знают про сборку, а не про публичные
// адреса, и тесту не нужны.
const legalDirFor = (code, slug) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'legal', slug) : join(dist, code, 'legal', slug);
const deleteDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'delete-account') : join(dist, code, 'delete-account');
const assistantsCatalogUrlFor = (code) => siteAssistantsCatalogUrlFor(code, DEFAULT_LANGUAGE);
const assistantUrlFor = (code, slug) => siteAssistantUrlFor(code, slug, DEFAULT_LANGUAGE);
const assistantsDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'assistants') : join(dist, code, 'assistants');
const hdCalcUrlFor = (code) => siteHdCalcUrlFor(code, DEFAULT_LANGUAGE);
const hdCalcDirFor = (code) =>
  code === DEFAULT_LANGUAGE
    ? join(dist, 'calculators', 'human-design')
    : join(dist, code, 'calculators', 'human-design');
const valuesTestUrlFor = (code) => siteValuesTestUrlFor(code, DEFAULT_LANGUAGE);
const valuesTestDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'tests', 'values') : join(dist, code, 'tests', 'values');

const { render, renderAssistant, renderAssistantsCatalog, renderHdCalculator, renderValuesTest } = await import(
  join(root, 'dist-ssr', 'entry-server.js')
);
const template = readFileSync(join(dist, 'index.html'), 'utf8');

// Скрипт перезаписывает dist/index.html (итерация DEFAULT_LANGUAGE), а шаблон
// читает из того же файла. Без этой проверки повторный запуск без
// предшествующего `vite build` берёт уже пререндеренную страницу как шаблон
// и накладывает head второй раз — молча, с кодом выхода 0 (два canonical,
// 14 hreflang вместо 7 и т.п., см. историю C2).
if (template.includes('rel="canonical"')) {
  throw new Error(
    'dist/index.html уже пререндерен (в шаблоне есть rel="canonical") — ' +
      'сначала запустите `vite build`, повторный запуск prerender.mjs по тому же dist/ не поддерживается.',
  );
}

// Каждая из девяти подстановок (lang, шесть метатегов, head, root) обязана
// реально найти своё место в шаблоне. Обычный String#replace/RegExp#replace fail-silent:
// если паттерн не найден, он просто возвращает исходную строку без изменений
// и без ошибки — страница молча уедет с русским lang/title. Эта обёртка
// проверяет факт совпадения ДО замены (а не сравнивает html до/после: для
// code === DEFAULT_LANGUAGE замена лога `lang="ru"` на `lang="ru"` — валидный
// no-op с точки зрения результата, но должна остаться найденной).
//
// Замена ВСЕГДА передаётся функцией, а не строкой. У String#replace со
// строкой-заменой последовательности $&, $`, $', $1 внутри подставляемого
// текста — это не текст, а команды подстановки. Сейчас $ в локалях нет, но
// первая же цена вида «$100» в переводе или в отрендеренной разметке тихо
// испортила бы страницу без единой ошибки. Функция возвращает строку как есть.
function mustReplace(html, pattern, replace, label) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!found) {
    throw new Error(
      `пререндер: подстановка «${label}» не нашла место для замены в dist/index.html — ` +
        'разметка шаблона изменилась? scripts/prerender.mjs нужно поправить вместе с index.html.',
    );
  }
  return html.replace(pattern, replace);
}

function headFor(code, title, description, slug, urlBuilder, codes = PUBLISHED_CODES) {
  const url = (c) => (urlBuilder ? urlBuilder(c) : slug ? legalUrlFor(c, slug) : urlFor(c));
  const alternates = codes.map(
    (c) => `    <link rel="alternate" hreflang="${c}" href="${url(c)}" />`,
  ).join('\n');
  const ogAlternates = codes.filter((c) => c !== code)
    .map((c) => `    <meta property="og:locale:alternate" content="${OG_LOCALES[c]}" />`)
    .join('\n');
  return [
    `    <link rel="canonical" href="${url(code)}" />`,
    alternates,
    `    <link rel="alternate" hreflang="x-default" href="${url(DEFAULT_LANGUAGE)}" />`,
    `    <meta property="og:locale" content="${OG_LOCALES[code]}" />`,
    ogAlternates,
    `    <meta property="og:url" content="${url(code)}" />`,
  ].join('\n');
}

// Заголовок и описание есть в шаблоне в нескольких местах (title, description,
// og:title, og:description, twitter:*) — подменяем все.
function localizeMeta(html, title, description) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  // (_, before, after) => …: скобки в паттерне оставляют на месте сам тег и
  // закрывающую кавычку, а текст подставляется функцией — см. mustReplace.
  const attr = (before, value, after) => `${before}${esc(value)}${after}`;
  let out = html;
  out = mustReplace(out, /<title>[\s\S]*?<\/title>/, () => `<title>${esc(title)}</title>`, '<title>');
  out = mustReplace(
    out,
    /(<meta name="description" content=")[^"]*(")/,
    (_, before, after) => attr(before, description, after),
    'meta description',
  );
  out = mustReplace(
    out,
    /(<meta property="og:title" content=")[^"]*(")/,
    (_, before, after) => attr(before, title, after),
    'meta og:title',
  );
  out = mustReplace(
    out,
    /(<meta property="og:description" content=")[^"]*(")/,
    (_, before, after) => attr(before, description, after),
    'meta og:description',
  );
  out = mustReplace(
    out,
    /(<meta name="twitter:title" content=")[^"]*(")/,
    (_, before, after) => attr(before, title, after),
    'meta twitter:title',
  );
  out = mustReplace(
    out,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    (_, before, after) => attr(before, description, after),
    'meta twitter:description',
  );
  return out;
}

const skipped = SUPPORTED_LANGUAGES.map((l) => l.code).filter((c) => !PUBLISHED_CODES.includes(c));
if (skipped.length > 0) {
  console.log(`⏭  локали пусты, версии не выпускаются: ${skipped.join(', ')}`);
}

for (const code of PUBLISHED_CODES) {
  const { html, title, description } = render(code);

  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, title, description);
  page = mustReplace(page, '</head>', () => `${headFor(code, title, description)}\n  </head>`, '</head>');
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${html}</div>`, '<div id="root">');

  if (!page.includes('<h1')) {
    throw new Error(`${code}: в разметке нет <h1> — пререндер отдал пустую страницу`);
  }

  const outDir = code === DEFAULT_LANGUAGE ? dist : join(dist, code);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page, 'utf8');
  console.log(`✅ ${code} → ${join(outDir, 'index.html').replace(root + '/', '')}`);
}

for (const code of PUBLISHED_CODES) {
  for (const slug of LEGAL_SLUGS) {
    const { html, title, description } = render(code, slug);

    let page = template;
    page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
    page = localizeMeta(page, title, description);
    page = mustReplace(
      page,
      '</head>',
      () => `${headFor(code, title, description, slug)}\n  </head>`,
      '</head>',
    );
    page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${html}</div>`, '<div id="root">');

    // Защита строже, чем у лендинга. Проверки на <h1> здесь мало: заголовок
    // документа рисуется самой страницей и остаётся на месте, даже если текст
    // не отрендерился вовсе. Проверено экспериментом — при выпавшем
    // renderLegal() страница усыхала с 24 КБ до 12 КБ, сохраняя и <h1>,
    // и <title>. На эти адреса ссылаются из магазинов приложений, и пустой
    // документ там хуже отсутствующего.
    if (!page.includes('<h1')) {
      throw new Error(`${code}/${slug}: в разметке нет <h1> — пререндер отдал пустую страницу`);
    }
    // Реквизиты есть в каждом из трёх документов на обоих языках: это самый
    // надёжный признак того, что текст на месте, а не только каркас.
    if (!html.includes('463404496646')) {
      throw new Error(
        `${code}/${slug}: в документе нет реквизитов Исполнителя — текст не отрендерился`,
      );
    }

    const outDir = legalDirFor(code, slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), page, 'utf8');
    console.log(`✅ ${code}/${slug} → ${join(outDir, 'index.html').replace(root + '/', '')}`);
  }
}

for (const code of PUBLISHED_CODES) {
  const { html, title, description } = render(code, 'delete-account');
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, title, description);
  page = mustReplace(page, '</head>', () => `${headFor(code, title, description, null, deleteUrlFor)}\n  </head>`, '</head>');
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${html}</div>`, '<div id="root">');
  if (!page.includes('<h1')) throw new Error(`${code}/delete-account: пустая страница`);
  // Признак живого содержимого, а не каркаса: страница обязана называть
  // адрес поддержки, иначе она бесполезна и для Play, и для человека.
  if (!html.includes('support@linkeon.io')) {
    throw new Error(`${code}/delete-account: нет контакта поддержки — текст не отрендерился`);
  }
  const outDir = deleteDirFor(code);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page, 'utf8');
  console.log(`✅ ${code}/delete-account → ${join(outDir, 'index.html').replace(root + '/', '')}`);
}

/** Страница раздела ассистентов: шаблон, язык, метатеги, head, разметка. */
function assistantsPage(code, { html, title, description }, urlBuilder) {
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, title, description);
  page = mustReplace(
    page,
    '</head>',
    () => `${headFor(code, title, description, null, urlBuilder, ASSISTANT_CODES)}\n  </head>`,
    '</head>',
  );
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${html}</div>`, '<div id="root">');
  return page;
}

function writePage(dir, page) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page, 'utf8');
}

const h1Of = (html) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
const mainOf = (html) => html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
const canonicalOf = (page) => page.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
// Путь от корня сайта — из того же правила, что canonical и sitemap. Клиент
// строит ссылки своим кодом (src/lib/assistantRoute.ts), так что сверка с этим
// путём — перекрёстная, а не сравнение функции с самой собой.
const assistantPathFor = (code, slug) => new URL(assistantUrlFor(code, slug)).pathname;

/**
 * Все объекты schema.org из разметки: каждый <script type="application/ld+json">
 * разбирается JSON.parse, массивы и @graph раскрываются. Битый JSON — ошибка
 * сборки: поисковик его тоже не прочтёт, а страница при этом выглядит целой.
 */
function jsonLdOf(html, where) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) throw new Error(`${where}: нет разметки schema.org`);
  return blocks.flatMap(([, json], i) => {
    let data;
    try {
      data = JSON.parse(json);
    } catch (e) {
      throw new Error(`${where}: JSON-LD №${i + 1} не разбирается — ${e.message}`);
    }
    return (Array.isArray(data) ? data : [data]).flatMap((d) =>
      Array.isArray(d?.['@graph']) ? d['@graph'] : [d],
    );
  });
}

function oneOfType(ld, type, where) {
  const found = ld.filter((d) => d?.['@type'] === type);
  if (found.length !== 1) throw new Error(`${where}: в JSON-LD ${found.length} блоков ${type}, нужен ровно один`);
  return found[0];
}

/**
 * BreadcrumbList: нужное число пунктов, и последний — канонический адрес
 * страницы, буква в букву как в <link rel="canonical">. Иначе поисковик
 * получает крошку, ведущую на редирект или на чужой язык.
 */
function checkBreadcrumbs(ld, page, expected, where) {
  const items = oneOfType(ld, 'BreadcrumbList', where).itemListElement ?? [];
  if (items.length !== expected) {
    throw new Error(`${where}: в BreadcrumbList ${items.length} пунктов, ожидалось ${expected}`);
  }
  const canonical = canonicalOf(page);
  if (!canonical || items.at(-1)?.item !== canonical) {
    throw new Error(
      `${where}: последний пункт BreadcrumbList — ${items.at(-1)?.item}, а canonical — ${canonical}`,
    );
  }
}

for (const code of ASSISTANT_CODES) {
  const catalog = renderAssistantsCatalog(code);
  if (!h1Of(catalog.html)) throw new Error(`${code}/assistants: в каталоге нет <h1>`);
  // Каталог обязан перечислить всех — ссылкой с точным языковым префиксом.
  // Ссылки ищутся только в <main>: подвал любой страницы раздела сам ссылается
  // на всех ассистентов, и по всей разметке проверка проходила даже на
  // каталоге без единой карточки (проверено нарочной поломкой). Без префикса
  // она же зеленела бы на английском каталоге, ведущем на русские страницы.
  const cards = mainOf(catalog.html);
  for (const a of ASSISTANTS) {
    const href = `href="${assistantPathFor(code, a.slug)}"`;
    if (!cards.includes(href)) {
      throw new Error(`${code}/assistants: в каталоге нет ссылки ${href} на ${a.slug}`);
    }
  }
  const catalogPage = assistantsPage(code, catalog, assistantsCatalogUrlFor);
  checkBreadcrumbs(jsonLdOf(catalog.html, `${code}/assistants`), catalogPage, 2, `${code}/assistants`);
  writePage(assistantsDirFor(code), catalogPage);

  for (const a of ASSISTANTS) {
    const where = `${code}/assistants/${a.slug}`;
    const rendered = renderAssistant(code, a.slug);
    // Имя проверяется в H1, а не во всей странице: имена всех ассистентов
    // есть в подвале любой страницы, и такая проверка зеленела бы на чужой.
    if (!h1Of(rendered.html).includes(a.names[code])) {
      throw new Error(`${where}: в <h1> нет имени «${a.names[code]}»`);
    }
    const page = assistantsPage(code, rendered, (c) => assistantUrlFor(c, a.slug));

    // Наличие блока и строки application/ld+json не доказывает ничего: они на
    // месте у любой отрендеренной страницы, даже с пустым FAQPage. Сверяется
    // содержимое — FAQPage перечисляет ровно те вопросы, что видит человек.
    const ld = jsonLdOf(rendered.html, where);
    const faqSection = rendered.html.match(/<section[^>]*data-testid="assistant-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    if (faqSection === undefined) throw new Error(`${where}: нет блока вопросов — текст не отрендерился`);
    const shown = (faqSection.match(/<details[\s>]/g) ?? []).length;
    const listed = oneOfType(ld, 'FAQPage', where).mainEntity?.length ?? 0;
    if (listed !== shown) {
      throw new Error(
        `${where}: в FAQPage ${listed} вопросов, а на странице ${shown} <details> — разметка schema.org разошлась с видимым текстом`,
      );
    }
    if (shown < 4) throw new Error(`${where}: вопросов ${shown}, нужно не меньше 4`);
    checkBreadcrumbs(ld, page, 3, where);

    writePage(join(assistantsDirFor(code), a.slug), page);
  }
  console.log(`✅ ${code}/assistants: каталог и ${ASSISTANTS.length} страниц`);
}

// Калькулятор Human Design. Форма и расчёт работают только в браузере; в
// пререндере — вводный текст, пять типов и вопросы. Проверяется содержимое:
// FAQPage ровно о видимых вопросах, пять описаний типов, крошки до canonical.
for (const code of HD_CALC_CODES) {
  const where = `${code}/calculators/human-design`;
  const rendered = renderHdCalculator(code);
  if (!h1Of(rendered.html)) throw new Error(`${where}: нет <h1>`);
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, rendered.title, rendered.description);
  page = mustReplace(
    page,
    '</head>',
    () => `${headFor(code, rendered.title, rendered.description, null, hdCalcUrlFor, HD_CALC_CODES)}\n  </head>`,
    '</head>',
  );
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${rendered.html}</div>`, '<div id="root">');

  const ld = jsonLdOf(rendered.html, where);
  const faqSection = rendered.html.match(/<section[^>]*data-testid="hd-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  if (faqSection === undefined) throw new Error(`${where}: нет блока вопросов — текст не отрендерился`);
  const shown = (faqSection.match(/<details[\s>]/g) ?? []).length;
  const listed = oneOfType(ld, 'FAQPage', where).mainEntity?.length ?? 0;
  if (listed !== shown) {
    throw new Error(`${where}: в FAQPage ${listed} вопросов, а на странице ${shown} <details>`);
  }
  if (shown < 4) throw new Error(`${where}: вопросов ${shown}, нужно не меньше 4`);
  const types = rendered.html.match(/<section[^>]*data-testid="hd-types"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  const typeCount = (types.match(/<li[\s>]/g) ?? []).length;
  if (typeCount !== 5) throw new Error(`${where}: описаний типов ${typeCount}, нужно 5`);
  checkBreadcrumbs(ld, page, 2, where);

  writePage(hdCalcDirFor(code), page);
  console.log(`✅ ${where}`);
}

// Тест ценностей. Тест работает только в браузере; в пререндере — вступление,
// карточка старта, десять ценностей и вопросы. Вебвизор и карта кликов на
// странице выключены (спека 2026-10-12, «Приватность»): порядок утверждений
// общий для всех, и по последовательности кликов по шести кнопкам
// восстанавливаются ответы, среди них — о вере. Цели и посещаемость остаются.
for (const code of VALUES_TEST_CODES) {
  const where = `${code}/tests/values`;
  const rendered = renderValuesTest(code);
  if (!h1Of(rendered.html)) throw new Error(`${where}: нет <h1>`);
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, rendered.title, rendered.description);
  page = mustReplace(
    page,
    '</head>',
    () => `${headFor(code, rendered.title, rendered.description, null, valuesTestUrlFor, VALUES_TEST_CODES)}\n  </head>`,
    '</head>',
  );
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${rendered.html}</div>`, '<div id="root">');
  page = mustReplace(page, 'webvisor:true', () => 'webvisor:false', 'webvisor (тест ценностей)');
  page = mustReplace(page, 'clickmap:true', () => 'clickmap:false', 'clickmap (тест ценностей)');
  const init = page.match(/ym\(105902201,\s*'init',\s*\{([^}]*)\}/)?.[1] ?? '';
  if (!/\bwebvisor:false\b/.test(init) || !/\bclickmap:false\b/.test(init)) {
    throw new Error(`${where}: в инициализации Метрики Вебвизор или карта кликов не выключены`);
  }
  const head = page.slice(0, page.indexOf('</head>'));
  if (/(webvisor|clickmap):\s*(true|!0)/.test(head)) {
    throw new Error(`${where}: в <head> осталось включённое webvisor/clickmap — второй счётчик или повторный init`);
  }

  const ld = jsonLdOf(rendered.html, where);
  const faqSection = rendered.html.match(/<section[^>]*data-testid="values-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  if (faqSection === undefined) throw new Error(`${where}: нет блока вопросов — текст не отрендерился`);
  const shown = (faqSection.match(/<details[\s>]/g) ?? []).length;
  const listed = oneOfType(ld, 'FAQPage', where).mainEntity?.length ?? 0;
  if (listed !== shown) {
    throw new Error(`${where}: в FAQPage ${listed} вопросов, а на странице ${shown} <details>`);
  }
  if (shown < 4) throw new Error(`${where}: вопросов ${shown}, нужно не меньше 4`);
  const model = rendered.html.match(/<section[^>]*data-testid="values-model"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  const valueCount = (model.match(/<li[\s>]/g) ?? []).length;
  if (valueCount !== 10) throw new Error(`${where}: описаний ценностей ${valueCount}, нужно 10`);
  if (!rendered.html.includes('data-testid="values-start"')) throw new Error(`${where}: нет карточки старта`);
  if (!rendered.html.includes('data-testid="values-test"')) {
    throw new Error(`${where}: нет контейнера теста (data-testid="values-test") — main.tsx не запустит тест`);
  }
  checkBreadcrumbs(ld, page, 2, where);

  writePage(valuesTestDirFor(code), page);
  console.log(`✅ ${where} (Вебвизор и карта кликов выключены)`);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls(
    PUBLISHED_CODES,
    DEFAULT_LANGUAGE,
    { codes: ASSISTANT_CODES, slugs: ASSISTANT_SLUGS },
    { codes: HD_CALC_CODES },
    { codes: VALUES_TEST_CODES },
  ).map((loc) => `  <url><loc>${loc}</loc></url>`),
  '</urlset>',
].join('\n');
writeFileSync(join(dist, 'sitemap.xml'), sitemap + '\n', 'utf8');
console.log('✅ sitemap.xml');

// Тексты страниц ассистентов и код калькулятора — во входном бандле? Им
// положено жить в своих чанках (src/content/assistants/load.ts, динамический
// импорт HumanDesignPage в main.tsx): главная их не грузит вовсе.
// Один статический импорт pages/<код>.ts где-нибудь в клиентском коде — и
// каждый посетитель главной качает тексты всех страниц, а сборка, типы и тесты
// молчат. Ловится только здесь, по готовому dist/.
//
// Признак — характерная строка, которой положено жить в другом чанке: H1
// страниц ассистентов (здесь — Роман и Райя, просто пример, не единственные
// выпущенные), отрендеренный тем же renderAssistant, что и сами страницы; для
// калькулятора — его H1, начало таблицы ворот и строка из самой
// astronomy-engine. Ищется во всём, что браузер грузит до первого кадра:
// входной <script type="module"> и его modulepreload.
{
  const decodeHtml = (s) =>
    s
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
      .replace(/&amp;/g, '&');
  // Минификатор вправе записать строку экранированной (\u0420, \xA0, \')
  // и с любым видом пробела — приводим обе стороны к одному виду, иначе
  // проверка ослепла бы на первой смене настроек сборки.
  const SPACES = /[\s\u00a0\u202f]+/g;
  const normalizeJs = (s) =>
    s
      .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\(['"`])/g, '$1')
      .replace(SPACES, ' ');

  const textOf = (html) => decodeHtml(h1Of(html).replace(/<[^>]+>/g, '')).replace(SPACES, ' ').trim();
  const needles = ['roman', 'raya'].map((slug) => {
    const h1 = textOf(renderAssistant(DEFAULT_LANGUAGE, slug).html);
    if (h1.length < 15) throw new Error(`${DEFAULT_LANGUAGE}/assistants/${slug}: H1 «${h1}» слишком короткий для проверки бандла`);
    return { slug, needle: h1 };
  });
  // Калькулятор: H1 — из чанка текстов; начало таблицы ворот (литерал массива
  // GATE_ORDER, минификатор пишет его без пробелов) и строка самой
  // astronomy-engine (её точно не перепутать с чужим источником текста) —
  // из чанка расчёта.
  if (HD_CALC_CODES.includes(DEFAULT_LANGUAGE)) {
    needles.push({ slug: 'калькулятор (H1)', needle: textOf(renderHdCalculator(DEFAULT_LANGUAGE).html) });
    needles.push({ slug: 'калькулятор (таблица ворот)', needle: '41,19,13,49,30,55,37,63,22,36' });
    needles.push({
      slug: 'калькулятор (astronomy-engine)',
      needle: 'Argument must be a Date object, an AstroTime object, or a numeric UTC Julian date.',
    });
  }

  // Тест ценностей: H1 — из чанка текстов СВОЕГО языка, сообщение об ошибке
  // расчёта — из общего чанка страницы (src/lib/schwartz/score.ts). H1 здесь
  // собираются по каждому языку отдельно (не только DEFAULT_LANGUAGE): у
  // ValuesTestPage один чанк на все языки, а тексты — свои на каждый
  // (src/content/values/texts/<код>.ts); H1 другого языка в чанке страницы
  // значил бы, что его тексты туда затянулись статическим импортом — тогда
  // первый посетитель страницы на любом языке качал бы тексты всех сразу.
  const valuesH1Needles = VALUES_TEST_CODES.map((code) => {
    const valuesH1 = textOf(renderValuesTest(code).html);
    if (valuesH1.length < 15) {
      throw new Error(`${code}/tests/values: H1 «${valuesH1}» слишком короткий для проверки бандла`);
    }
    return { slug: `тест ценностей (H1 ${code})`, needle: valuesH1 };
  });
  needles.push(...valuesH1Needles);
  if (VALUES_TEST_CODES.length > 0) needles.push({ slug: 'тест ценностей (расчёт)', needle: 'тест ценностей: нужно' });

  const entryFiles = [
    ...template.matchAll(/<script type="module"[^>]*\ssrc="([^"]+\.js)"/g),
    ...template.matchAll(/<link rel="modulepreload"[^>]*\shref="([^"]+\.js)"/g),
  ].map(([, src]) => src.replace(/^\//, ''));
  if (!entryFiles.some((f) => f.startsWith('assets/'))) {
    throw new Error('пререндер: в dist/index.html не найден входной <script type="module" src="/assets/…"> — проверку бандла нечем делать');
  }
  for (const file of entryFiles) {
    const js = normalizeJs(readFileSync(join(dist, file), 'utf8'));
    for (const { slug, needle } of needles) {
      if (js.includes(needle)) {
        throw new Error(
          `во входной бандл попало то, что должно жить в своём чанке (в ${file} нашлось «${needle}» — ${slug}). ` +
            'Тексты ассистентов грузятся через src/content/assistants/load.ts, калькулятор — ' +
            'динамическим импортом HumanDesignPage и ValuesTestPage в src/main.tsx; статический импорт их в клиентский код недопустим.',
        );
      }
    }
  }

  // Проверка сама себя: игла обязана найтись в каком-то другом чанке. Не
  // нашлась нигде — значит, поиск слеп (иначе записанная строка, другой
  // источник текста), и «во входном бандле нет» ничего не доказывает.
  const assets = join(dist, 'assets');
  const assetFiles = readdirSync(assets).filter((f) => f.endsWith('.js'));
  const chunks = assetFiles
    .filter((f) => !entryFiles.includes(`assets/${f}`))
    .map((f) => normalizeJs(readFileSync(join(assets, f), 'utf8')));
  for (const { slug, needle } of needles) {
    if (!chunks.some((js) => js.includes(needle))) {
      throw new Error(
        `пререндер: игла «${slug}» (${needle}) не нашлась ни в одном чанке dist/assets — ` +
          'проверка входного бандла ослепла, её нужно поправить вместе со сборкой.',
      );
    }
  }
  console.log(`✅ тексты ассистентов, калькулятор и тест ценностей не во входном бандле (${entryFiles.join(', ')})`);

  // Тест ценностей многоязычен, а страница — одна на все языки: чанк
  // ValuesTestPage-*.js грузится независимо от языка (src/main.tsx, динамический
  // import()), поэтому H1 конкретного языка обязан жить только в своём чанке
  // текстов (src/content/values/texts/<код>.ts), не в общей странице. Статический
  // импорт текстов одного языка в ValuesTestPage.tsx дал бы той же странице
  // тянуть тексты всех языков сразу — ловится только здесь, по готовому dist/.
  if (valuesH1Needles.length > 0) {
    const pageChunkFiles = assetFiles.filter((f) => f.startsWith('ValuesTestPage-'));
    if (pageChunkFiles.length === 0) {
      throw new Error('пререндер: чанк ValuesTestPage-*.js не найден в dist/assets — проверку текстов по языкам нечем делать');
    }
    const pageChunks = pageChunkFiles.map((f) => normalizeJs(readFileSync(join(assets, f), 'utf8')));
    for (const { slug, needle } of valuesH1Needles) {
      if (pageChunks.some((js) => js.includes(needle))) {
        throw new Error(
          `в общий чанк теста ценностей (${pageChunkFiles.join(', ')}) попал текст одного языка ` +
            `(нашлось «${needle}» — ${slug}) — тексты теста ценностей должны жить только в своём чанке ` +
            'src/content/values/texts/<код>.ts, не в общей ValuesTestPage; статический импорт в неё недопустим.',
        );
      }
    }
    console.log(`✅ тест ценностей: H1 каждого языка — в своём чанке, не в общем ValuesTestPage (${pageChunkFiles.join(', ')})`);
  }
}
