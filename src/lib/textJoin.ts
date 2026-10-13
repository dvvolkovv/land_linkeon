/**
 * Склейка частей текста по правилам языка страницы. Русские правила —
 * «, … и …», «; » и пробел между предложениями — не универсальны: китайскому
 * не подходят (там «、», «和» без пробелов, полноширинная «；» и предложения
 * подряд без пробела), французскому нужен неразрывный пробел перед «;».
 */

// Английские тексты сайта — британские (favourite, recognise): перечень без оксфордской запятой.
const LIST_LOCALE: Record<string, string> = { en: 'en-GB' };

// Фолбэк без Intl.ListFormat (Safari < 14.1, см. ниже): союз — руками, по
// карте языков. Язык без записи в карте (и не zh) — просто через запятую,
// без союза (joinComma): лучше без «и», чем с английским «and» не по месту.
const AND_WORD: Record<string, string> = { ru: 'и', en: 'and', es: 'y', de: 'und', fr: 'et', pt: 'e' };

/**
 * «а, б и в» — перечень с союзом языка. Intl.ListFormat нет в Safari до 14.1
 * (iOS 14.0–14.4), а сборка нацелена на safari14: там союз берётся из AND_WORD,
 * чтобы кнопка «Разобрать с Олей» не умирала молча.
 */
export function joinAnd(items: string[], language: string): string {
  if (typeof Intl.ListFormat === 'function') {
    return new Intl.ListFormat(LIST_LOCALE[language] ?? language, { style: 'long', type: 'conjunction' }).format(items);
  }
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  const head = items.slice(0, -1);
  if (language === 'zh') return `${head.join('、')}和${last}`;
  const and = AND_WORD[language];
  return and ? `${head.join(', ')} ${and} ${last}` : joinComma(items, language);
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

/** Название и пояснение через тире: в китайском «——» без пробелов. */
export function dashSeparator(language: string): string {
  return language === 'zh' ? '——' : ' — ';
}

/**
 * Тот же dashSeparator(), разложенный под разметку «имя␠<span>—␠пояснение</span>»:
 * gap — что поставить после имени СНАРУЖИ span (пробел или ''), dash — что
 * поставить первым ВНУТРИ span. Для ru/остальных пробел уходит в gap, внутри
 * span остаётся «— » с уже нужным пробелом перед текстом; для zh — везде пусто.
 */
export function dashParts(language: string): { gap: string; dash: string } {
  const sep = dashSeparator(language);
  return sep.startsWith(' ') ? { gap: ' ', dash: sep.trimStart() } : { gap: '', dash: sep };
}

/** Склейка внутри одной фразы (например, ценность и скобка ничьи): пробел, в zh — без него. */
export function joinInline(parts: string[], language: string): string {
  return joinSentences(parts, language);
}
