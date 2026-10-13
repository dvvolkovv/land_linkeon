import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ValuesTestPage from './ValuesTestPage';
import { createServerI18n } from '../i18n/server';
import { VALUES_TEXTS } from '../content/values/texts.server';

const render = () =>
  renderToStaticMarkup(
    <I18nextProvider i18n={createServerI18n('ru')}>
      <ValuesTestPage texts={VALUES_TEXTS.ru} language="ru" />
    </I18nextProvider>,
  );

describe('баннер языка на тесте ценностей', () => {
  afterEach(() => {
    vi.doUnmock('../components/ui/LanguageBanner');
    vi.resetModules();
  });

  // РЕГРЕССИЯ: баннер стоял только на страницах ассистентов — с теста
  // ценностей не было предложения сменить язык. Сам баннер решает в эффекте,
  // которого в рендере на сервере нет (как и на страницах ассистентов),
  // поэтому здесь он подменён меткой: проверяется, что страница его ставит
  // и передаёт фильтр available (без него баннер предложил бы язык, на
  // котором этого теста нет).
  it('баннер стоит на странице и получает available', async () => {
    vi.resetModules();
    vi.doMock('../components/ui/LanguageBanner', () => ({
      default: (props: { available?: (code: string) => boolean }) => (
        <i data-testid="language-banner" data-available={String(typeof props.available === 'function')} />
      ),
    }));
    const { default: Page } = await import('./ValuesTestPage');
    const { VALUES_TEXTS: texts } = await import('../content/values/texts.server');
    const html = renderToStaticMarkup(
      <I18nextProvider i18n={createServerI18n('ru')}>
        <Page texts={texts.ru} language="ru" />
      </I18nextProvider>,
    );
    expect(html).toContain('data-testid="language-banner"');
    expect(html).toContain('data-available="true"');
  });

  // Как и на страницах ассистентов: предложение зависит от языка браузера,
  // в пререндере его быть не может — иначе краулер получил бы ссылку,
  // посчитанную для чужого языка.
  it('в пререндере не выводит ничего', () => {
    const html = render();
    expect(html).not.toContain('lang-banner-link');
    expect(html).not.toContain('aria-label="Dismiss"');
  });
});
