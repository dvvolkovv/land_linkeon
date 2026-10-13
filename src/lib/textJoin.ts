/**
 * Склейка частей текста по правилам языка страницы. Русские правила —
 * «, … и …», «; » и пробел между предложениями — китайскому не подходят:
 * там «、», «和» без пробелов, полноширинная «；» и предложения подряд.
 */

/** «а, б и в» — перечень с союзом языка. */
export function joinAnd(items: string[], language: string): string {
  return new Intl.ListFormat(language, { style: 'long', type: 'conjunction' }).format(items);
}

/** «а, б, в» — перечень без союза. */
export function joinComma(items: string[], language: string): string {
  return items.join(language === 'zh' ? '、' : ', ');
}

/** Части одной фразы через точку с запятой. */
export function joinClauses(parts: string[], language: string): string {
  return parts.join(language === 'zh' ? '；' : '; ');
}

/** Предложения подряд в одном абзаце. */
export function joinSentences(parts: string[], language: string): string {
  return parts.join(language === 'zh' ? '' : ' ');
}
