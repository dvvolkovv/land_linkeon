import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { createServerI18n } from './i18n/server';

/**
 * Вызывается scripts/prerender.mjs на сборке. Возвращает разметку и
 * метаданные страницы для подстановки в шаблон.
 *
 * Заметьте: клиент поднимается через createRoot, а не hydrateRoot. Это
 * сознательно — сегментные хиро (?seg=biz) рендерятся из query-параметра,
 * которого на сборке нет, так что гидратация гарантированно расходилась бы
 * с разметкой. Пререндер здесь нужен поисковику и первому кадру, а не для
 * экономии клиентского рендера.
 */
export function render(language: string): { html: string; title: string; description: string } {
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
  return {
    html,
    title: i18n.t('meta.title'),
    description: i18n.t('meta.description'),
  };
}
