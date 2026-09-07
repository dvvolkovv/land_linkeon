import { renderToStaticMarkup } from 'react-dom/server';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';
import ru from '../../i18n/locales/ru.json';
import zh from '../../i18n/locales/zh.json';

/** Текст <h1> из настоящего рендера Hero на заданном языке. */
function heroH1(lng: string, translation: object): string {
  const i18n = createInstance();
  void i18n.use(initReactI18next).init({
    lng,
    resources: { [lng]: { translation } },
    interpolation: { escapeValue: false },
  });
  const html = renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <Hero />
    </I18nextProvider>,
  );
  return html.replace(/[\s\S]*<h1[^>]*>|<\/h1>[\s\S]*/g, '').replace(/<[^>]*>/g, '');
}

// Заголовок склеивается из двух ключей локали, вторая часть — акцентная.
// Разделитель нужен языкам со словесным пробелом и запрещён в китайском:
// там это видимая дыра посреди самого крупного текста на странице. Ни
// locales.structure.test.ts, ни check-locales этого не видят — они сверяют
// ключи, а дефект возникает при склейке. Поймать можно только рендером.
describe('Hero: склейка h1 и h1Accent', () => {
  it('в zh части идут подряд, без пробела', () => {
    expect(heroH1('zh', zh)).toBe(`${zh.hero.h1}${zh.hero.h1Accent}`);
    expect(heroH1('zh', zh)).not.toContain(' ');
  });

  it('в ru части разделены пробелом', () => {
    expect(heroH1('ru', ru)).toBe(`${ru.hero.h1} ${ru.hero.h1Accent}`);
    expect(heroH1('ru', ru)).toContain(' ');
  });
});
