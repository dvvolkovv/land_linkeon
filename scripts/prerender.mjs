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
 * Запускается из pnpm build ПОСЛЕ обеих сборок vite.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from './translated-languages.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

const SITE = 'https://linkeon.io';

const PUBLISHED_CODES = translatedCodes();

const OG_LOCALES = Object.fromEntries(SUPPORTED_LANGUAGES.map((l) => [l.code, l.ogLocale]));

const urlFor = (code) => (code === DEFAULT_LANGUAGE ? `${SITE}/` : `${SITE}/${code}/`);

const { render } = await import(join(root, 'dist-ssr', 'entry-server.js'));
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

// Каждая из восьми подстановок (lang, шесть метатегов, root) обязана реально
// найти своё место в шаблоне. Обычный String#replace/RegExp#replace fail-silent:
// если паттерн не найден, он просто возвращает исходную строку без изменений
// и без ошибки — страница молча уедет с русским lang/title. Эта обёртка
// проверяет факт совпадения ДО замены (а не сравнивает html до/после: для
// code === DEFAULT_LANGUAGE замена лога `lang="ru"` на `lang="ru"` — валидный
// no-op с точки зрения результата, но должна остаться найденной).
function mustReplace(html, pattern, replacement, label) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!found) {
    throw new Error(
      `пререндер: подстановка «${label}» не нашла место для замены в dist/index.html — ` +
        'разметка шаблона изменилась? scripts/prerender.mjs нужно поправить вместе с index.html.',
    );
  }
  return html.replace(pattern, replacement);
}

function headFor(code, title, description) {
  const alternates = PUBLISHED_CODES.map(
    (c) => `    <link rel="alternate" hreflang="${c}" href="${urlFor(c)}" />`,
  ).join('\n');
  const ogAlternates = PUBLISHED_CODES.filter((c) => c !== code)
    .map((c) => `    <meta property="og:locale:alternate" content="${OG_LOCALES[c]}" />`)
    .join('\n');
  return [
    `    <link rel="canonical" href="${urlFor(code)}" />`,
    alternates,
    `    <link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LANGUAGE)}" />`,
    `    <meta property="og:locale" content="${OG_LOCALES[code]}" />`,
    ogAlternates,
    `    <meta property="og:url" content="${urlFor(code)}" />`,
  ].join('\n');
}

// Заголовок и описание есть в шаблоне в нескольких местах (title, description,
// og:title, og:description, twitter:*) — подменяем все.
function localizeMeta(html, title, description) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  let out = html;
  out = mustReplace(out, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`, '<title>');
  out = mustReplace(
    out,
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(description)}$2`,
    'meta description',
  );
  out = mustReplace(
    out,
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${esc(title)}$2`,
    'meta og:title',
  );
  out = mustReplace(
    out,
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(description)}$2`,
    'meta og:description',
  );
  out = mustReplace(
    out,
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${esc(title)}$2`,
    'meta twitter:title',
  );
  out = mustReplace(
    out,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${esc(description)}$2`,
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
  page = mustReplace(page, '<html lang="ru">', `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, title, description);
  page = page.replace('</head>', `${headFor(code, title, description)}\n  </head>`);
  page = mustReplace(page, '<div id="root"></div>', `<div id="root">${html}</div>`, '<div id="root">');

  if (!page.includes('<h1')) {
    throw new Error(`${code}: в разметке нет <h1> — пререндер отдал пустую страницу`);
  }

  const outDir = code === DEFAULT_LANGUAGE ? dist : join(dist, code);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page, 'utf8');
  console.log(`✅ ${code} → ${join(outDir, 'index.html').replace(root + '/', '')}`);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PUBLISHED_CODES.map((c) => `  <url><loc>${urlFor(c)}</loc></url>`),
  '</urlset>',
].join('\n');
writeFileSync(join(dist, 'sitemap.xml'), sitemap + '\n', 'utf8');
console.log('✅ sitemap.xml');
