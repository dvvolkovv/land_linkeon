/**
 * Какие из языков реестра реально переведены.
 *
 * Язык может стоять в реестре раньше, чем к нему готов перевод: локаль тогда
 * пуста (`{}`). Выпускать под такой язык страницы нельзя — получаются
 * индексируемые URL с русским текстом под чужим `<html lang>`: дублирующийся
 * контент, ложный hreflang и русские слова, читаемые скринридером чужой
 * фонетикой. На сегодня переведены все языки реестра (ru, en, es, de, fr, zh,
 * pt), так что список совпадает с реестром — но полагаться на это нельзя,
 * следующий язык снова появится сначала пустым.
 *
 * Критерий машинный: локаль переведена, если её JSON содержит хотя бы один
 * ключ. Ничего включать руками не нужно — как только файлы наполнятся,
 * языки поднимутся сами, обычной пересборкой.
 *
 * Обычный .js рядом с .d.ts (как src/theme/colors.js): читают и node-скрипты
 * сборки (prerender.mjs), и vite.config.ts.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';

const here = dirname(fileURLToPath(import.meta.url));
const localesDir = join(here, '..', 'src', 'i18n', 'locales');

/**
 * Файл локали обязан существовать для каждого языка реестра: его статически
 * импортирует src/i18n/server.ts, так что отсутствие всё равно свалит сборку —
 * читаем без try/catch, чтобы падение было здесь и с внятным стеком.
 */
function hasAnyKey(code) {
  const parsed = JSON.parse(readFileSync(join(localesDir, `${code}.json`), 'utf8'));
  return Object.keys(parsed).length > 0;
}

/** Языки реестра с непустой локалью, в порядке реестра. */
export function translatedLanguages() {
  const translated = SUPPORTED_LANGUAGES.filter((lang) => hasAnyKey(lang.code));
  if (!translated.some((lang) => lang.code === DEFAULT_LANGUAGE)) {
    throw new Error(
      `локаль языка по умолчанию (${DEFAULT_LANGUAGE}) пуста — она источник правды, ` +
        'без неё выпускать нечего',
    );
  }
  return translated;
}

/** Коды тех же языков — их ждут define, sitemap и hreflang. */
export function translatedCodes() {
  return translatedLanguages().map((lang) => lang.code);
}
