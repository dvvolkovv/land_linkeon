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
 * Последним блоком скрипт проверяет, что тексты страниц ассистентов не
 * попали во входной бандл клиента: их место — в чанке своего языка.
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
import {
  LEGAL_SLUGS,
  sitemapUrls,
  urlFor as siteUrlFor,
  legalUrlFor as siteLegalUrlFor,
  deleteUrlFor as siteDeleteUrlFor,
  assistantsCatalogUrlFor as siteAssistantsCatalogUrlFor,
  assistantUrlFor as siteAssistantUrlFor,
} from './site-urls.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

const PUBLISHED_CODES = translatedCodes();

// Языки страниц ассистентов: выпущенные у сайта И с модулем текстов. hreflang
// этих страниц перечисляет только их — ссылка на несуществующую версию была
// бы ложным hreflang.
const ASSISTANT_CODES = assistantPageCodes();

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

const { render, renderAssistant, renderAssistantsCatalog } = await import(join(root, 'dist-ssr', 'entry-server.js'));
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

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls(PUBLISHED_CODES, DEFAULT_LANGUAGE, { codes: ASSISTANT_CODES, slugs: ASSISTANT_SLUGS })
    .map((loc) => `  <url><loc>${loc}</loc></url>`),
  '</urlset>',
].join('\n');
writeFileSync(join(dist, 'sitemap.xml'), sitemap + '\n', 'utf8');
console.log('✅ sitemap.xml');

// Тексты страниц ассистентов — во входном бандле? Им положено жить в чанке
// своего языка (src/content/assistants/load.ts): главная их не грузит вовсе.
// Один статический импорт pages/<код>.ts где-нибудь в клиентском коде — и
// каждый посетитель главной качает тексты всех страниц, а сборка, типы и тесты
// молчат. Ловится только здесь, по готовому dist/.
//
// Признак — H1 русских страниц Романа и Райи, отрендеренный тем же
// renderAssistant, что и сами страницы. Ищется во всём, что браузер грузит до
// первого кадра: входной <script type="module"> и его modulepreload.
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

  const needles = ['roman', 'raya'].map((slug) => {
    const h1 = decodeHtml(h1Of(renderAssistant(DEFAULT_LANGUAGE, slug).html).replace(/<[^>]+>/g, ''))
      .replace(SPACES, ' ')
      .trim();
    if (h1.length < 15) throw new Error(`${DEFAULT_LANGUAGE}/assistants/${slug}: H1 «${h1}» слишком короткий для проверки бандла`);
    return { slug, h1 };
  });

  const entryFiles = [
    ...template.matchAll(/<script type="module"[^>]*\ssrc="([^"]+\.js)"/g),
    ...template.matchAll(/<link rel="modulepreload"[^>]*\shref="([^"]+\.js)"/g),
  ].map(([, src]) => src.replace(/^\//, ''));
  if (!entryFiles.some((f) => f.startsWith('assets/'))) {
    throw new Error('пререндер: в dist/index.html не найден входной <script type="module" src="/assets/…"> — проверку бандла нечем делать');
  }
  for (const file of entryFiles) {
    const js = normalizeJs(readFileSync(join(dist, file), 'utf8'));
    for (const { slug, h1 } of needles) {
      if (js.includes(h1)) {
        throw new Error(
          `тексты страниц ассистентов попали во входной бандл — где-то статический импорт pages/<код>.ts ` +
            `(в ${file} нашёлся H1 страницы ${slug}: «${h1}»). Тексты грузятся только через ` +
            'src/content/assistants/load.ts (браузер) и packs.server.ts (пререндер).',
        );
      }
    }
  }

  // Проверка сама себя: H1 обязан найтись в каком-то другом чанке. Не нашёлся
  // нигде — значит, поиск слеп (иначе записанная строка, другой источник
  // текстов), и «во входном бандле нет» ничего не доказывает.
  const assets = join(dist, 'assets');
  const chunks = readdirSync(assets)
    .filter((f) => f.endsWith('.js') && !entryFiles.includes(`assets/${f}`))
    .map((f) => normalizeJs(readFileSync(join(assets, f), 'utf8')));
  for (const { slug, h1 } of needles) {
    if (!chunks.some((js) => js.includes(h1))) {
      throw new Error(
        `пререндер: H1 страницы ${slug} («${h1}») не нашёлся ни в одном чанке dist/assets — ` +
          'проверка входного бандла ослепла, её нужно поправить вместе со сборкой.',
      );
    }
  }
  console.log(`✅ тексты ассистентов не во входном бандле (${entryFiles.join(', ')})`);
}
