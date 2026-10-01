import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import LegalPage from './LegalPage';
import DeleteAccountPage from './DeleteAccountPage';
import { createServerI18n } from '../i18n/server';

const render = (ui: ReactElement, language: string) =>
  renderToStaticMarkup(<I18nextProvider i18n={createServerI18n(language)}>{ui}</I18nextProvider>);

/** Только подвал: в тексте документа своих ссылок хватает. */
const footerOf = (html: string) => html.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? '';

// РЕГРЕССИЯ: подвал на этих страницах рисовался без homeHref, и ссылки
// раздела «Продукт» вели на якоря (#pricing и др.), которых здесь нет, —
// клик не делал ничего. Они должны вести на разделы главной языка страницы.
describe('подвал документов и страницы удаления аккаунта', () => {
  const cases: [string, string, ReactElement][] = [
    ['документ, ru', 'ru', <LegalPage doc="offer" />],
    ['документ, en', 'en', <LegalPage doc="privacy" />],
    ['удаление аккаунта, ru', 'ru', <DeleteAccountPage />],
    ['удаление аккаунта, de', 'de', <DeleteAccountPage />],
  ];

  for (const [label, language, ui] of cases) {
    it(`${label}: разделы продукта — на главную своего языка`, () => {
      const footer = footerOf(render(ui, language));
      const home = language === 'ru' ? '/' : `/${language}/`;
      expect(footer).toContain(`href="${home}#pricing"`);
      expect(footer).toContain(`href="${home}#assistants"`);
      expect(footer).not.toContain('href="#pricing"');
      // Документы по-прежнему открываются модалкой на месте.
      expect(footer).toContain('href="#privacy"');
    });
  }
});
