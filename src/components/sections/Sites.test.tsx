import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Sites from './Sites';
import { createServerI18n } from '../../i18n/server';
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../../i18n/languages';
import { rentInterpolation } from '../../content/products';

const render = (language: string) =>
  renderToStaticMarkup(
    <I18nextProvider i18n={createServerI18n(language)}>
      <Sites />
    </I18nextProvider>,
  );

const count = (html: string, needle: string) => html.split(needle).length - 1;

describe('секция «Сайты и боты»', () => {
  for (const code of SUPPORTED_CODES) {
    describe(code, () => {
      const html = render(code);

      it('две карточки по три пункта и четыре условия', () => {
        expect(count(html, 'data-testid="sites-card-site"')).toBe(1);
        expect(count(html, 'data-testid="sites-card-bot"')).toBe(1);
        expect(count(html, 'data-testid="sites-point"')).toBe(6);
        expect(count(html, 'data-testid="sites-term"')).toBe(4);
      });

      it('без непереведённых ключей и сырых переменных', () => {
        expect(html).not.toMatch(/sites\.(eyebrow|h2|sub|site|bot|terms|cta)/);
        expect(html).not.toContain('{{');
      });

      it('аренда — числом из константы, в формате языка', () => {
        expect(html).toContain(rentInterpolation(code).tokens);
      });

      // В пререндере у ссылки нет ?lang= — его дописывает клиент (appUrl читает
      // язык глобального i18n). Поэтому проверяется начало адреса.
      it('кнопка ведёт во вкладку продуктов кабинета с меткой', () => {
        expect(html).toContain('href="https://my.linkeon.io/studio?tab=products&amp;utm_content=sites');
        expect(html).toContain('data-cta="sites-start"');
      });

      if (code === DEFAULT_LANGUAGE) {
        it('рубли — из прайса, а не из текста', () => {
          expect(html).toContain(`${rentInterpolation(code).price} ₽`);
        });
      } else {
        it('без рублей: витрина на этом языке валютная', () => {
          expect(html).not.toContain('₽');
        });
      }
    });
  }
});
