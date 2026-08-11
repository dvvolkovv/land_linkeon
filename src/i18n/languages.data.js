/**
 * Реестр языков — единственный источник правды.
 *
 * Обычный .js, а не .ts, по той же причине, что и src/theme/colors.js: этот
 * файл читают не только бандлер и TypeScript, но и node-скрипты сборки
 * (scripts/prerender.mjs, scripts/check-locales.mjs, vite.config.ts). Node не
 * исполняет TypeScript, а держать список в трёх местах и сторожить дубли
 * grep-тестами — хуже, чем один .js с соседним .d.ts.
 *
 * Типы — в languages.data.d.ts, публичный вход для приложения — languages.ts.
 *
 * Список кодов совпадает со spirits_front/src/i18n/languages.ts: репозитории
 * раздельные, общего пакета нет, файл дублируется осознанно. `ogLocale` —
 * добавка лендинга, приложению она не нужна.
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'ru', nativeName: 'Русский', flag: '🇷🇺', ogLocale: 'ru_RU' },
  { code: 'en', nativeName: 'English', flag: '🇺🇸', ogLocale: 'en_US' },
  { code: 'es', nativeName: 'Español', flag: '🇪🇸', ogLocale: 'es_ES' },
  { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪', ogLocale: 'de_DE' },
  { code: 'fr', nativeName: 'Français', flag: '🇫🇷', ogLocale: 'fr_FR' },
  { code: 'zh', nativeName: '中文', flag: '🇨🇳', ogLocale: 'zh_CN' },
  // Португальский — европейский (pt-PT), не бразильский: витрина в App Store
  // заведена как Portugal, и текст локали написан под неё («utilizador»,
  // «ecrã», «telemóvel»). Код при этом голый `pt` — он корень BCP-47, до
  // которого схлопывается и pt-BR: бразильцу европейский текст понятнее
  // английского.
  { code: 'pt', nativeName: 'Português', flag: '🇵🇹', ogLocale: 'pt_PT' },
];

export const DEFAULT_LANGUAGE = 'ru';

export const SUPPORTED_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);
