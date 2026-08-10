import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import LegalPage from './pages/LegalPage';
import type { LegalType } from './components/layout/LegalModal';
import { createServerI18n } from './i18n/server';
import * as legalRu from './content/legal/ru';
import * as legalEn from './content/legal/en';

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
export function render(
  language: string,
  legalDoc?: LegalType,
): { html: string; title: string; description: string } {
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      {legalDoc ? <LegalPage doc={legalDoc} /> : <App />}
    </I18nextProvider>,
  );
  if (legalDoc) {
    // Заголовок документа берём из того же модуля, что и его текст, — иначе
    // название страницы и её содержимое могли бы разъехаться.
    const pack = language === 'ru' ? legalRu : legalEn;
    return {
      html,
      title: `${pack.titles[legalDoc]} — Linkeon`,
      description: pack.titles[legalDoc],
    };
  }
  return {
    html,
    title: i18n.t('meta.title'),
    description: i18n.t('meta.description'),
  };
}
