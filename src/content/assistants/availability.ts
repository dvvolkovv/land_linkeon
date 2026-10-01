/**
 * Языки, на которых выпущены страницы ассистентов. Список считается на сборке
 * (scripts/assistant-page-languages.js) и подставляется литералом через define:
 * браузер в каталог pages/ заглянуть не может.
 */
export const ASSISTANT_PAGE_CODES: string[] = __ASSISTANT_PAGE_LANGUAGES__;

export const hasAssistantPages = (language: string): boolean =>
  ASSISTANT_PAGE_CODES.includes(language);
