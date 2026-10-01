import { useTranslation } from 'react-i18next';
import type { Crumb } from '../../content/assistants/jsonLd';

/**
 * Хлебные крошки раздела ассистентов по образцу APG: нумерованный список,
 * разделитель «/» скрыт от скринридера, последний пункт — текущая страница
 * текстом с aria-current. Страница передаёт сюда тот же массив, что и в
 * BreadcrumbList, — видимые крошки совпадают с разметкой для поисковика.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useTranslation();
  const last = items.length - 1;
  return (
    <nav aria-label={t('assistantPages.breadcrumbsLabel')} className="text-sm text-paper-600 mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) =>
          i < last ? (
            // Разделитель — внутри пункта, в его конце: при переносе «/» остаётся
            // в конце строки, а не начинает следующую.
            <li key={c.path}>
              <a href={c.path} className="hover:text-paper-900">{c.name}</a>
              <span aria-hidden="true" className="ml-2">/</span>
            </li>
          ) : (
            <li key={c.path} aria-current="page" className="font-medium text-paper-900">
              {c.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
