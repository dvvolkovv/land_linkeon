/**
 * Сегменты пути — без пустых и без хвостового `index.html`.
 *
 * Пререндер кладёт каждую страницу в dist/ каталогом с index.html, и nginx
 * отдаёт файл и по явному адресу: `/assistants/raya/index.html`,
 * `/legal/offer/index.html`. Не срежь разбор этот хвост — адрес счёлся бы
 * «не нашим», и клиент нарисовал бы поверх отданной страницы главную.
 */
export function pathSegments(pathname: string): string[] {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[parts.length - 1] === 'index.html') parts.pop();
  return parts;
}
