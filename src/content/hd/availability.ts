/**
 * Языки, на которых выпущен калькулятор. Считается на сборке
 * (scripts/hd-calc-languages.js) и подставляется через define: браузер в
 * каталог texts/ заглянуть не может.
 */
export const HD_CALC_CODES: string[] = __HD_CALC_LANGUAGES__;

export const hasHdCalculator = (language: string): boolean => HD_CALC_CODES.includes(language);
