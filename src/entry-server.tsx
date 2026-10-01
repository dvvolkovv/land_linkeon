import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import LegalPage from './pages/LegalPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import AssistantPage from './pages/AssistantPage';
import AssistantsCatalogPage from './pages/AssistantsCatalogPage';
import type { LegalType } from './components/layout/LegalModal';
import { createServerI18n } from './i18n/server';
import { legalFor } from './content/legal';
import { PACKS } from './content/assistants/packs.server';
import { assistantBySlug } from './content/assistants/roster';

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
  legalDoc?: LegalType | 'delete-account',
): { html: string; title: string; description: string } {
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      {legalDoc === 'delete-account' ? (
        <DeleteAccountPage />
      ) : legalDoc ? (
        <LegalPage doc={legalDoc} />
      ) : (
        <App />
      )}
    </I18nextProvider>,
  );
  if (legalDoc === 'delete-account') {
    const title = language === 'ru' ? 'Удаление аккаунта Linkeon' : 'Deleting your Linkeon account';
    return { html, title, description: title };
  }
  if (legalDoc) {
    // Заголовок документа берём из того же модуля, что и его текст, — иначе
    // название страницы и её содержимое могли бы разъехаться.
    const pack = legalFor(language);
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

/** Страница ассистента для пререндера. Падает громко: молча отдать пустоту хуже. */
export function renderAssistant(
  language: string,
  slug: string,
): { html: string; title: string; description: string } {
  const entry = assistantBySlug(slug);
  const pack = PACKS[language];
  if (!entry || !pack) throw new Error(`нет страницы ассистента ${language}/${slug}`);
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <AssistantPage entry={entry} pack={pack} language={language} />
    </I18nextProvider>,
  );
  const page = pack[entry.slug];
  return { html, title: page.title, description: page.description };
}

/** Каталог ассистентов для пререндера. */
export function renderAssistantsCatalog(language: string): { html: string; title: string; description: string } {
  const pack = PACKS[language];
  if (!pack) throw new Error(`нет текстов ассистентов на ${language}`);
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <AssistantsCatalogPage pack={pack} language={language} />
    </I18nextProvider>,
  );
  return {
    html,
    title: i18n.t('assistantPages.catalog.title'),
    description: i18n.t('assistantPages.catalog.description'),
  };
}
