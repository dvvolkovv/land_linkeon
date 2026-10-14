import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Header from './Header';
import Footer from './Footer';
import { createServerI18n } from '../../i18n/server';
import { ASSISTANTS } from '../../content/assistants/roster';
import { hdCalcPath } from '../../lib/hdRoute';

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

  it('ru: пункт «Расчёт Human Design» ведёт на калькулятор', () => {
    expect(render(<Footer />)).toMatch(/href="\/calculators\/human-design\/"[^>]*>Расчёт Human Design<\/a>/);
  });

  // С 14.10.2026 калькулятор выпущен на всех семи языках — пункт ведёт на
  // калькулятор своего языка.
  it('на каждом языке пункт ведёт на калькулятор своего языка', () => {
    for (const code of ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh']) {
      expect(render(<Footer />, code), code).toContain(`href="${hdCalcPath(code)}"`);
    }
  });
});

describe('подвал: язык без калькулятора', () => {
  afterEach(() => {
    vi.doUnmock('../../content/hd/availability');
    vi.resetModules();
  });

  // Ссылка на невыпущенный язык вела бы в SPA-фолбэк. Сейчас выпущены все
  // языки сайта, поэтому «невыпущенный» изображаем подменой availability.
  it('на языке без калькулятора пункта нет', async () => {
    vi.resetModules();
    vi.doMock('../../content/hd/availability', () => ({ hasHdCalculator: (code: string) => code === 'ru' }));
    const { default: MockedFooter } = await import('./Footer');
    expect(render(<MockedFooter />, 'en')).not.toContain('/calculators/human-design/');
    expect(render(<MockedFooter />, 'ru')).toContain('href="/calculators/human-design/"');
  });
});
