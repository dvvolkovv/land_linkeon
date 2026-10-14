/**
 * Названия стран по CLDR (Intl.DisplayNames) для баз городов калькулятора
 * Human Design. Зовёт scripts/build-hd-cities.py, сам по себе не нужен.
 *
 * stdin:  {"locales": {"en": "en-GB", …}, "codes": ["AD", "AE", …]}
 * stdout: {"en": {"AD": "Andorra", …}, …}
 *
 * Кода, которого CLDR не знает (вернул сам код или «Неизвестный регион»), в
 * выводе нет — сборка возьмёт название из GeoNames. Названия зависят от
 * версии ICU в Node, на которой собирали: версия печатается в stderr.
 */
import { readFileSync } from 'node:fs';

const { locales, codes } = JSON.parse(readFileSync(0, 'utf8'));
const out = {};
for (const [lang, locale] of Object.entries(locales)) {
  // Node без полного ICU молча отдал бы английские названия — лучше упасть.
  if (Intl.DisplayNames.supportedLocalesOf([locale]).length === 0) {
    throw new Error(`Node не знает локаль ${locale}: нужен полный ICU`);
  }
  const names = new Intl.DisplayNames([locale], { type: 'region' });
  const unknown = names.of('ZZ');
  out[lang] = {};
  for (const cc of codes) {
    let name;
    try {
      name = names.of(cc);
    } catch {
      continue;
    }
    if (name && name !== cc && name !== unknown) out[lang][cc] = name;
  }
}
console.error(`CLDR ${process.versions.cldr}, ICU ${process.versions.icu}, Node ${process.versions.node}`);
process.stdout.write(JSON.stringify(out));
