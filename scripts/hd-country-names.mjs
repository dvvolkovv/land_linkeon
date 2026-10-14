/**
 * Названия стран по CLDR (Intl.DisplayNames) для баз городов калькулятора
 * Human Design. Зовёт scripts/build-hd-cities.py, сам по себе не нужен.
 *
 * stdin:  {"locales": {"en": "en-GB", …}, "codes": ["AD", "AE", …]}
 * stdout: {"versions": {"cldr": "48.0", "icu": "78.2", "node": "22.22.3"},
 *          "names": {"en": {"AD": "Andorra", …}, …}}
 *
 * Кода, которого CLDR не знает (вернул сам код или «Неизвестный регион»), в
 * выводе нет — сборка возьмёт название из GeoNames. Названия зависят от
 * версии ICU в Node, на которой собирали, — она уходит в versions.
 */
import { readFileSync } from 'node:fs';

const { locales, codes } = JSON.parse(readFileSync(0, 'utf8'));
const names = {};
for (const [lang, locale] of Object.entries(locales)) {
  // Node без полного ICU молча отдал бы английские названия — лучше упасть.
  if (Intl.DisplayNames.supportedLocalesOf([locale]).length === 0) {
    throw new Error(`Node не знает локаль ${locale}: нужен полный ICU`);
  }
  const display = new Intl.DisplayNames([locale], { type: 'region' });
  const unknown = display.of('ZZ');
  names[lang] = {};
  for (const cc of codes) {
    let name;
    try {
      name = display.of(cc);
    } catch {
      continue;
    }
    if (name && name !== cc && name !== unknown) names[lang][cc] = name;
  }
}
const { cldr, icu, node } = process.versions;
process.stdout.write(JSON.stringify({ versions: { cldr, icu, node }, names }));
