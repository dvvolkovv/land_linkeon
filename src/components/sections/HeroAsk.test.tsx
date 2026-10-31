import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import { createServerI18n } from '../../i18n/server';
import Hero from './Hero';

const html = renderToStaticMarkup(<I18nextProvider i18n={createServerI18n('ru')}><Hero /></I18nextProvider>);

describe('первый экран: поле вопроса вместо кнопки «Начать»', () => {
  it('поле к Роману есть, кнопки hero-start нет', () => {
    expect(html).toContain('data-ask-box');
    expect(html).toContain('data-cta="hero-ask"');
    expect(html).not.toContain('data-cta="hero-start"');
  });

  it('подсказка — из локали первого экрана', () => {
    expect(html).toContain('Расскажите своими словами, с чем пришли, — ассистент ответит сразу');
  });
});
