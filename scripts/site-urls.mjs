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

/**
 * Полный список адресов в sitemap — в том же порядке, в каком его пишет
 * пререндер. Источник ожиданий и для генерации, и для проверки.
 */
export function sitemapUrls(publishedCodes, defaultLanguage) {
  return [
    ...publishedCodes.map((c) => urlFor(c, defaultLanguage)),
    ...publishedCodes.flatMap((c) =>
      LEGAL_SLUGS.map((slug) => legalUrlFor(c, slug, defaultLanguage)),
    ),
    ...publishedCodes.map((c) => deleteUrlFor(c, defaultLanguage)),
  ];
}
