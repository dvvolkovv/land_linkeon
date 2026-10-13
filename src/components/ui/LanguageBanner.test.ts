import { describe, expect, it, vi } from 'vitest';

// jsdom в репозитории не настроен (нет jsdom/happy-dom в зависимостях, другие
// страницы проверяются renderToStaticMarkup без эффектов), поэтому сам баннер
// не рендерится — проверяется только чистый выбор bannerOffer, который эффект
// компонента вызывает.
vi.mock('../../i18n/translatedLanguages', () => ({
  TRANSLATED_LANGUAGES: [
    { code: 'en', nativeName: 'English', flag: '🇺🇸', ogLocale: 'en_US' },
    { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪', ogLocale: 'de_DE' },
  ],
}));

import { bannerOffer } from './LanguageBanner';

describe('bannerOffer', () => {
  it('текущий язык страницы совпадает с предпочитаемым — ничего не предлагает', () => {
    expect(bannerOffer('en', 'en')).toBeNull();
  });

  it('предпочитаемый язык не переведён — ничего не предлагает', () => {
    expect(bannerOffer('ru', 'fr')).toBeNull();
  });

  it('без available — подходит любой переведённый язык', () => {
    expect(bannerOffer('ru', 'en')?.code).toBe('en');
  });

  // РЕГРЕССИЯ: на тесте ценностей баннер без фильтра предлагал язык страницы,
  // на которой самого теста нет (pathForLanguage увёл бы на главную этого
  // языка) — see available в LanguageBanner.tsx.
  it('available отклоняет невыпущенный на этой странице язык', () => {
    expect(bannerOffer('ru', 'de', (code) => code === 'ru' || code === 'en')).toBeNull();
  });

  it('available пропускает выпущенный язык', () => {
    expect(bannerOffer('ru', 'en', (code) => code === 'ru' || code === 'en')?.code).toBe('en');
  });
});
