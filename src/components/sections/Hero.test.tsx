import { renderToStaticMarkup } from 'react-dom/server';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';
import ru from '../../i18n/locales/ru.json';
import zh from '../../i18n/locales/zh.json';

/**
 * Текст <h1> из настоящего рендера Hero: `lng` — запрошенный язык, `loaded` —
 * локали, ресурсы которых уже доехали. Разводить их обязательно: в проде это
 * разные вещи (см. кейс окна фолбэка ниже).
 */
function heroH1(lng: string, loaded: Record<string, object>): string {
  const i18n = createInstance();
  void i18n.use(initReactI18next).init({
    lng,
    fallbackLng: 'ru',
    resources: Object.fromEntries(
      Object.entries(loaded).map(([code, translation]) => [code, { translation }]),
    ),
    interpolation: { escapeValue: false },
  });
  const html = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <Hero />
    </I18nextProvider>,
  );
  return html
    .replace(/[\s\S]*<h1[^>]*>|<\/h1>[\s\S]*/g, '')
    .replace(/<[^>]*>/g, '')
    // renderToStaticMarkup экранирует апострофы: без раскодировки первый же
    // кейс на fr или en (there's, l'idée) упал бы на &#x27;. &amp; — последним,
    // иначе раскодировка съест собственное экранирование.
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&');
}

// Заголовок склеивается из двух ключей локали, вторая часть — акцентная. Ни
// locales.structure.test.ts, ни check-locales этого не видят: они сверяют
// ключи, а дефект возникает при склейке. Поймать можно только рендером.
describe('Hero: склейка h1 и h1Accent', () => {
  it('в zh части идут подряд: пробел был бы дырой посреди заголовка', () => {
    expect(heroH1('zh', { zh })).toBe(`${zh.hero.h1}${zh.hero.h1Accent}`);
  });

  it('в ru части разделены пробелом', () => {
    expect(heroH1('ru', { ru })).toBe(`${ru.hero.h1} ${ru.hero.h1Accent}`);
  });

  // main.tsx рендерит синхронно, пока ./i18n ещё грузит чанк локали, и в
  // бандле лежит только ru. В этом окне запрошенный язык — уже zh, а текст
  // ещё русский: разделитель обязан идти по resolvedLanguage, иначе русский
  // заголовок склеивается без пробела на каждой загрузке /zh/ — и навсегда,
  // если чанк не доедет.
  it('запрошен zh, загружен только ru: русский заголовок остаётся с пробелом', () => {
    expect(heroH1('zh', { ru })).toBe(`${ru.hero.h1} ${ru.hero.h1Accent}`);
  });
});
