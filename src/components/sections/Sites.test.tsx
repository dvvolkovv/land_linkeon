import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Sites from './Sites';
import { createServerI18n } from '../../i18n/server';
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../../i18n/languages';
import { rentInterpolation } from '../../content/products';

const count = (html: string, needle: string) => html.split(needle).length - 1;

// Текст через тот же рендер, что и страница: апострофы в en/fr экранируются (&#x27;).
const esc = (s: string) => renderToStaticMarkup(<>{s}</>);

describe('секция «Сайты и боты»', () => {
  for (const code of SUPPORTED_CODES) {
    describe(code, () => {
      // Один экземпляр и для рендера, и для ожиданий: ожидаемый текст берётся
      // из той же локали, что и разметка.
      const i18n = createServerI18n(code);
      const html = renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
          <Sites />
        </I18nextProvider>,
      );

      it('две карточки по три пункта и четыре условия', () => {
        expect(count(html, 'data-testid="sites-card-site"')).toBe(1);
        expect(count(html, 'data-testid="sites-card-bot"')).toBe(1);
        expect(count(html, 'data-testid="sites-point"')).toBe(6);
        expect(count(html, 'data-testid="sites-term"')).toBe(4);
      });

      it('якоря, заголовок и содержимое карточек на своих местах', () => {
        expect(html).toContain('<section id="sites" aria-labelledby="sites-heading"');
        expect(html).toContain('id="sites-heading"');
        expect(html).toContain(`>${esc(i18n.t('sites.h2'))}</h2>`);
        const [, site, bot] = html.split(/data-testid="sites-card-(?:site|bot)"/);
        expect(site).toContain(`>${esc(i18n.t('sites.site.title'))}</h3>`);
        expect(bot).toContain(`>${esc(i18n.t('sites.bot.title'))}</h3>`);
        for (const p of i18n.t('sites.site.points', { returnObjects: true }) as unknown as string[]) {
          expect(site).toContain(`<span>${esc(p)}</span>`);
        }
        for (const p of i18n.t('sites.bot.points', { returnObjects: true }) as unknown as string[]) {
          expect(bot).toContain(`<span>${esc(p)}</span>`);
        }
        // Иллюстрации — для глаз: всё, что в них есть, сказано текстом рядом.
        expect(html.match(/<div aria-hidden="true"/g)?.length).toBe(2);
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
