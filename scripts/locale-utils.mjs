/**
 * Общие операции над локалями: сведение к плоским ключам и сверка покрытия.
 * Чистые функции без ввода-вывода — тестируются без сети и файловой системы.
 *
 * Пользователь на сегодня один — scripts/check-locales.mjs (flatten,
 * missingKeys). unflatten и проверка плейсхолдеров нужны тому, кто будет
 * записывать переводы обратно в JSON, — пока такого скрипта нет, они держатся
 * тестами (scripts/locale-utils.test.mjs).
 */

export function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, path));
    } else {
      out[path] = value;
    }
  }
  return out;
}

export function unflatten(flat) {
  const out = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split('.');
    let node = out;
    for (let i = 0; i < parts.length - 1; i++) {
      node[parts[i]] ??= {};
      node = node[parts[i]];
    }
    node[parts[parts.length - 1]] = value;
  }
  return out;
}

const isBlank = (value) => value === undefined || value === null || value === '';

/**
 * Ключи источника, которых нет в цели или которые там пусты.
 * Ключи, пустые в самом источнике, не считаются недостающими: пустая строка —
 * это «здесь ничего не показываем», требовать её «перевод» бессмысленно.
 * (В ru.json лендинга таких значений сейчас нет — правило на будущее.)
 */
export function missingKeys(sourceFlat, targetFlat) {
  return Object.keys(sourceFlat).filter(
    (key) => !isBlank(sourceFlat[key]) && isBlank(targetFlat[key]),
  );
}

/**
 * Всё, что в двойных фигурных скобках, считается неделимым плейсхолдером и
 * обязано пережить перевод дословно. На лендинге это интерполяция i18next
 * (сейчас единственный случай — {{value}} в pricing.savings), но правило
 * намеренно шире: любой перевод содержимого {{…}} ломает подстановку молча,
 * поэтому фрагмент от {{ до }} не разбирается, а сравнивается целиком.
 */
export function extractPlaceholders(text) {
  if (typeof text !== 'string') return [];
  return text.match(/\{\{[^}]*\}\}/g) ?? [];
}

export function placeholdersMatch(source, translated) {
  const a = extractPlaceholders(source).slice().sort();
  const b = extractPlaceholders(translated).slice().sort();
  if (a.length !== b.length) return false;
  return a.every((value, i) => value === b[i]);
}
