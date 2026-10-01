import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Assistants from './Assistants';
import { CARD_SLUGS } from './assistantCards';
import { assistantBySlug } from '../../content/assistants/roster';
import { createServerI18n } from '../../i18n/server';
import ru from '../../i18n/locales/ru.json';
import en from '../../i18n/locales/en.json';
import es from '../../i18n/locales/es.json';
import de from '../../i18n/locales/de.json';
import fr from '../../i18n/locales/fr.json';
import pt from '../../i18n/locales/pt.json';
import zh from '../../i18n/locales/zh.json';

const LOCALES: Record<string, typeof ru> = { ru, en, es, de, fr, pt, zh };

describe('карточки ассистентов на главной', () => {
  // Имена на карточках написаны руками в локалях. Разойдись они с реестром —
  // человек кликнул бы «Алексей» и попал бы на страницу с другим написанием.
  for (const [code, locale] of Object.entries(LOCALES)) {
    it(`${code}: имена совпадают с реестром`, () => {
      expect(locale.assistants.list.map((a) => a.name)).toEqual(
        CARD_SLUGS.map((slug) => assistantBySlug(slug)!.names[code]),
      );
    });
  }

  // Роль тоже записана дважды: assistants.list[i].role — подпись карточки на
  // главной, assistantPages.roles.<slug> — страница ассистента, каталог и
  // подвал. Разойдись они — на главной «юрист», а на странице, куда ведёт
  // карточка, — другая роль.
  for (const [code, locale] of Object.entries(LOCALES)) {
    it(`${code}: роли на карточках — те же, что на страницах ассистентов`, () => {
      expect(locale.assistants.list.map((a) => a.role)).toEqual(
        CARD_SLUGS.map((slug) => locale.assistantPages.roles[slug]),
      );
    });
  }

  it('карточки ведут на страницы, рядом — ссылка на каталог, главная кнопка прежняя', () => {
    const html = renderToStaticMarkup(
      <I18nextProvider i18n={createServerI18n('ru')}>
        <Assistants />
      </I18nextProvider>,
    );
    for (const slug of CARD_SLUGS) expect(html).toContain(`href="/assistants/${slug}/"`);
    expect(html).toContain('href="/assistants/"');
    expect(html).toContain('data-cta="assistants-link"');
  });
});
