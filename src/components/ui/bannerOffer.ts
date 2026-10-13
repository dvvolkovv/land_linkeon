import type { LanguageDef } from '../../i18n/languages';
import { TRANSLATED_LANGUAGES } from '../../i18n/translatedLanguages';

/**
 * Чистый выбор баннера языка: current — язык текущей страницы, preferred —
 * язык браузера (уже сведённый к поддерживаемому через resolveLanguage).
 * available — страница выпущена не на всех языках: предлагать только те, где
 * она есть; без фильтра подходит любой переведённый язык.
 *
 * Отдельный файл, а не экспорт прямо из LanguageBanner.tsx: тот — файл
 * компонента, и правило react-refresh/only-export-components не разрешает
 * держать в нём второй, не-компонентный экспорт. Отдельно и ради юнит-теста:
 * jsdom в репозитории не настроен (другие страницы проверяются
 * renderToStaticMarkup, без эффектов), а эта логика — чистая и тестируется
 * без DOM.
 *
 * available передаётся в эффект LanguageBanner как элемент массива
 * зависимостей useEffect — обязана быть стабильной функцией, объявленной на
 * уровне модуля (как hasValuesTest), а не инлайн-стрелкой на каждый рендер:
 * иначе эффект перезапускался бы при каждом рендере компонента.
 */
export function bannerOffer(
  current: string,
  preferred: string,
  available?: (code: string) => boolean,
): LanguageDef | null {
  if (preferred === current) return null;
  // В любом случае — только переведённые языки сайта: предложить испанцу
  // /es/, где лежит русский текст, — хуже, чем не предлагать ничего.
  return TRANSLATED_LANGUAGES.find((l) => l.code === preferred && (available?.(l.code) ?? true)) ?? null;
}
