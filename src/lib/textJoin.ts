/**
 * Склейка частей текста по правилам языка страницы. Русские правила —
 * «, … и …», «; » и пробел между предложениями — не универсальны: китайскому
 * не подходят (там «、», «和» без пробелов, полноширинная «；» и предложения
 * подряд без пробела), французскому нужен неразрывный пробел перед «;».
 */

// Английские тексты сайта — британские (favourite, recognise): перечень без оксфордской запятой.
const LIST_LOCALE: Record<string, string> = { en: 'en-GB' };

/**
 * «а, б и в» — перечень с союзом языка. Intl.ListFormat нет в Safari до 14.1
 * (iOS 14.0–14.4), а сборка нацелена на safari14: там — перечень без союза,
 * чтобы кнопка «Разобрать с Олей» не умирала молча.
 */
export function joinAnd(items: string[], language: string): string {
  if (typeof Intl.ListFormat !== 'function') return joinComma(items, language);
  return new Intl.ListFormat(LIST_LOCALE[language] ?? language, { style: 'long', type: 'conjunction' }).format(items);
}

/** «а, б, в» — перечень без союза. */
export function joinComma(items: string[], language: string): string {
  return items.join(language === 'zh' ? '、' : ', ');
}

/** Части одной фразы через точку с запятой. Французская типографика — неразрывный пробел перед «;». */
export function joinClauses(parts: string[], language: string): string {
  if (language === 'zh') return parts.join('；');
  if (language === 'fr') return parts.join('\u00A0; ');
  return parts.join('; ');
}

/** Предложения подряд в одном абзаце. */
export function joinSentences(parts: string[], language: string): string {
  return parts.join(language === 'zh' ? '' : ' ');
}
