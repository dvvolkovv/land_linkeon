import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import { createServerI18n } from '../../i18n/server';
import AskBox from './AskBox';

const render = (lang = 'ru') =>
  renderToStaticMarkup(
    <I18nextProvider i18n={createServerI18n(lang)}>
      <AskBox assistantId={12} cta="hero-ask" utmContent="hero-ask" placeholder="Подсказка" />
    </I18nextProvider>,
  );

describe('поле вопроса', () => {
  it('подпись, кнопка и строка под полем — из локали', () => {
    const html = render();
    expect(html).toContain('Ваш вопрос ассистенту');
    expect(html).toContain('Спросить');
    expect(html).toContain('Ответ сразу — без регистрации и карты');
  });

  it('поле скрыто от Вебвизора и ограничено 600 знаками', () => {
    const tag = render().match(/<textarea[^>]*>/)?.[0] ?? '';
    expect(tag).toContain('ym-disable-keys');
    expect(tag).toContain('maxLength="600"');
  });

  it('кнопка — цель воронки; в разметке нет ни адреса с вопросом, ни ссылок', () => {
    const html = render();
    expect(html).toContain('data-cta="hero-ask"');
    expect(html).toContain('data-ask-box');
    expect(html).not.toContain('#ask=');
    expect(html).not.toContain('href=');
  });
});
