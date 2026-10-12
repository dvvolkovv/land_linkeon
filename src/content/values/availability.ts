/**
 * Языки, на которых выпущен тест ценностей. Считается на сборке
 * (scripts/values-test-languages.js) и подставляется через define: браузер в
 * каталог texts/ заглянуть не может.
 */
export const VALUES_TEST_CODES: string[] = __VALUES_TEST_LANGUAGES__;

export const hasValuesTest = (language: string): boolean => VALUES_TEST_CODES.includes(language);
