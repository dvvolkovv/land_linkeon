/**
 * Публичные адреса лендинга: что вообще существует на linkeon.io.
 *
 * Вынесено из prerender.mjs, чтобы генератор sitemap и проверяющий его тест
 * читали ОДИН список. Пока правила жили только внутри пререндера, тест
 * держал у себя свою версию правды («в sitemap ровно семь ссылок») — и когда
 * в карту приехали юридические страницы, тест покраснел на ровном месте и
 * провисел красным три недели. Дублировать здесь нечего: добавили раздел —
 * он автоматически попал и в sitemap, и в ожидание теста.
 */

export const SITE = 'https://linkeon.io';

/**
 * Юридические документы отдельными страницами с собственными адресами.
 * Без них ссылка на политику указывает на `#privacy`, то есть на главную:
 * краулер и Play Console видят лендинг, а не документ.
 */
export const LEGAL_SLUGS = ['offer', 'privacy', 'pdn'];

/** Раздел ассистентов. Тот же литерал — в src/lib/assistantRoute.ts. */
export const ASSISTANTS_SEGMENT = 'assistants';

/** Языковой корень. У канонического языка он же корень сайта. */
export const urlFor = (code, defaultLanguage) =>
  code === defaultLanguage ? `${SITE}/` : `${SITE}/${code}/`;

export const legalUrlFor = (code, slug, defaultLanguage) =>
  code === defaultLanguage ? `${SITE}/legal/${slug}` : `${SITE}/${code}/legal/${slug}`;

/**
 * Страница удаления аккаунта. Обязательный адрес для Play Console: порядок
 * удаления должен быть виден ДО установки и БЕЗ входа.
 */
export const deleteUrlFor = (code, defaultLanguage) =>
  code === defaultLanguage ? `${SITE}/delete-account` : `${SITE}/${code}/delete-account`;

/** Каталог ассистентов — со слэшем, как языковые корни. */
export const assistantsCatalogUrlFor = (code, defaultLanguage) =>
  code === defaultLanguage
    ? `${SITE}/${ASSISTANTS_SEGMENT}/`
    : `${SITE}/${code}/${ASSISTANTS_SEGMENT}/`;

/**
 * Страница ассистента — СО слэшем. Она лежит в dist/ каталогом с index.html,
 * и nginx на адрес без слэша отвечает 301 (проверено на /legal/offer):
 * canonical и sitemap обязаны указывать на конечный адрес, а не на редирект.
 */
export const assistantUrlFor = (code, slug, defaultLanguage) =>
  code === defaultLanguage
    ? `${SITE}/${ASSISTANTS_SEGMENT}/${slug}/`
    : `${SITE}/${code}/${ASSISTANTS_SEGMENT}/${slug}/`;

/**
 * Полный список адресов в sitemap — в том же порядке, в каком его пишет
 * пререндер. Источник ожиданий и для генерации, и для проверки.
 *
 * `assistants.codes` — языки, на которых выпущены страницы ассистентов
 * (scripts/assistant-page-languages.js), `assistants.slugs` — реестр.
 */
export function sitemapUrls(publishedCodes, defaultLanguage, assistants = { codes: [], slugs: [] }) {
  return [
    ...publishedCodes.map((c) => urlFor(c, defaultLanguage)),
    ...publishedCodes.flatMap((c) =>
      LEGAL_SLUGS.map((slug) => legalUrlFor(c, slug, defaultLanguage)),
    ),
    ...publishedCodes.map((c) => deleteUrlFor(c, defaultLanguage)),
    ...assistants.codes.map((c) => assistantsCatalogUrlFor(c, defaultLanguage)),
    ...assistants.codes.flatMap((c) =>
      assistants.slugs.map((slug) => assistantUrlFor(c, slug, defaultLanguage)),
    ),
  ];
}
