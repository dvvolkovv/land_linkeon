#!/usr/bin/env node
/**
 * Падает, если в какой-либо локали нет ключа из ru.json.
 * ru.json — источник правды; всё остальное обязано его покрывать.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { flatten, missingKeys } from './locale-utils.mjs';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';

const here = dirname(fileURLToPath(import.meta.url));
const localesDir = join(here, '..', 'src', 'i18n', 'locales');

function load(code) {
  return JSON.parse(readFileSync(join(localesDir, `${code}.json`), 'utf8'));
}

// Все ключи лендинга переводятся, исключений нет: ни админки, ни служебных
// веток, ни ключей с формами множественного числа (i18next выбирает их по
// правилам CLDR, и требовать от каждого языка все суффиксы нельзя). Появится
// такое — здесь понадобится фильтр, сейчас он был бы фикцией.
const source = flatten(load(DEFAULT_LANGUAGE));
const sourceCount = Object.keys(source).length;
let failed = false;

for (const code of SUPPORTED_CODES) {
  if (code === DEFAULT_LANGUAGE) continue;
  const missing = missingKeys(source, flatten(load(code)));
  if (missing.length === 0) {
    console.log(`✅ ${code}: ${sourceCount}/${sourceCount} ключей`);
    continue;
  }
  failed = true;
  console.error(`❌ ${code}: не хватает ${missing.length} из ${sourceCount} ключей`);
  for (const key of missing.slice(0, 20)) console.error(`   ${key}`);
  if (missing.length > 20) console.error(`   … и ещё ${missing.length - 20}`);
}

if (failed) {
  console.error(`\nЗаполните недостающие ключи в src/i18n/locales/<код>.json по ${DEFAULT_LANGUAGE}.json.`);
  process.exit(1);
}
