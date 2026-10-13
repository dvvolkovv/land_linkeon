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
  // и передаёт именно hasValuesTest (не любую функцию — например,
  // «() => true» компилируется так же, но не фильтрует ничего, и баннер
  // снова предложит язык, на котором этого теста нет).
  it('баннер стоит на странице и получает именно hasValuesTest', async () => {
    vi.resetModules();
    let captured: { available?: (code: string) => boolean } = {};
    vi.doMock('../components/ui/LanguageBanner', () => ({
      default: (props: { available?: (code: string) => boolean }) => {
        captured = props;
        return <i data-testid="language-banner" />;
      },
    }));
    const { default: Page } = await import('./ValuesTestPage');
    const { VALUES_TEXTS: texts } = await import('../content/values/texts.server');
    // Тот же модуль, что видит сама страница (после общего resetModules) —
    // иначе сравнение toBe сравнивало бы две разные функции с одинаковой
    // реализацией и ничего бы не проверяло.
    const { hasValuesTest } = await import('../content/values/availability');
    const html = renderToStaticMarkup(
      <I18nextProvider i18n={createServerI18n('ru')}>
        <Page texts={texts.ru} language="ru" />
      </I18nextProvider>,
    );
    expect(html).toContain('data-testid="language-banner"');
    expect(captured.available).toBe(hasValuesTest);
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
