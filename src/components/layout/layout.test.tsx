import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Header from './Header';
import Footer from './Footer';
import { createServerI18n } from '../../i18n/server';
import { ASSISTANTS } from '../../content/assistants/roster';

const render = (ui: ReactElement, language = 'ru') =>
  renderToStaticMarkup(<I18nextProvider i18n={createServerI18n(language)}>{ui}</I18nextProvider>);

describe('шапка', () => {
  it('на главной пункты меню — якоря страницы, как раньше', () => {
    expect(render(<Header />)).toContain('href="#pricing"');
  });

  // На подстранице якорь «#pricing» указывал бы на несуществующий раздел.
  it('на подстранице пункты меню ведут на разделы главной своего языка', () => {
    const html = render(<Header homeHref="/en/" />, 'en');
    expect(html).toContain('href="/en/#pricing"');
    expect(html).not.toContain('href="#pricing"');
  });

  it('пункт «Сайты и боты» ведёт к секции — на главной и с подстраницы', () => {
    expect(render(<Header />)).toContain('href="#sites"');
    expect(render(<Header homeHref="/en/" />, 'en')).toContain('href="/en/#sites"');
  });
});

describe('подвал', () => {
  it('ссылается на каталог и на страницу каждого ассистента', () => {
    const html = render(<Footer />);
    expect(html).toContain('href="/assistants/"');
    for (const a of ASSISTANTS) expect(html, a.slug).toContain(`href="/assistants/${a.slug}/"`);
  });

  it('на подстранице разделы продукта ведут на главную, документы — модалкой, как раньше', () => {
    const html = render(<Footer homeHref="/" />);
    expect(html).toContain('href="/#pricing"');
    expect(html).toContain('href="#privacy"');
  });

  it('в колонке «Продукт» есть «Сайты и боты»', () => {
    expect(render(<Footer />)).toContain('href="#sites"');
    expect(render(<Footer homeHref="/" />)).toContain('href="/#sites"');
  });
});
