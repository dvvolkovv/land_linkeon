import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import FAQ from './FAQ';
import { createServerI18n } from '../../i18n/server';
import { SUPPORTED_CODES } from '../../i18n/languages';
import { rentInterpolation } from '../../content/products';

const render = (language: string) =>
  renderToStaticMarkup(
    <I18nextProvider i18n={createServerI18n(language)}>
      <FAQ />
    </I18nextProvider>,
  );

describe('FAQ', () => {
  for (const code of SUPPORTED_CODES) {
    it(`${code}: девять вопросов, числа аренды подставлены`, () => {
      const html = render(code);
      expect(html.split('<details').length - 1).toBe(9);
      expect(html).not.toContain('{{');
      expect(html).toContain(rentInterpolation(code).tokens);
    });
  }

  it('ru: в ответе о цене — рубли из прайса', () => {
    expect(render('ru')).toContain(`${rentInterpolation('ru').price} ₽`);
  });
});
