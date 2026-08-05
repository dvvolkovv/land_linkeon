#!/usr/bin/env node
/**
 * Рендерит лендинг на каждом языке в статический HTML.
 *
 * Зачем: без этого поисковик видит пустой <div id="root"> и шесть языковых
 * версий не индексируются вообще. Клиент всё равно перерисует страницу
 * (createRoot), так что эта разметка — для краулера и первого кадра.
 *
 * Запускается из pnpm build ПОСЛЕ обеих сборок vite.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

const SITE = 'https://linkeon.io';
const DEFAULT_LANGUAGE = 'ru';
// Продублировано из src/i18n/languages.ts: тот файл — TypeScript, node его
// не исполнит. За расхождением следит scripts/prerender.test.mjs.
const CODES = ['ru', 'en', 'es', 'de', 'fr', 'zh'];
const OG_LOCALES = {
  ru: 'ru_RU', en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR', zh: 'zh_CN',
};

const urlFor = (code) => (code === DEFAULT_LANGUAGE ? `${SITE}/` : `${SITE}/${code}/`);

const { render } = await import(join(root, 'dist-ssr', 'entry-server.js'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

function headFor(code, title, description) {
  const alternates = CODES.map(
    (c) => `    <link rel="alternate" hreflang="${c}" href="${urlFor(c)}" />`,
  ).join('\n');
  const ogAlternates = CODES.filter((c) => c !== code)
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
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
}

for (const code of CODES) {
  const { html, title, description } = render(code);

  let page = template;
  page = page.replace('<html lang="ru">', `<html lang="${code}">`);
  page = localizeMeta(page, title, description);
  page = page.replace('</head>', `${headFor(code, title, description)}\n  </head>`);
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

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
  ...CODES.map((c) => `  <url><loc>${urlFor(c)}</loc></url>`),
  '</urlset>',
].join('\n');
writeFileSync(join(dist, 'sitemap.xml'), sitemap + '\n', 'utf8');
console.log('✅ sitemap.xml');
