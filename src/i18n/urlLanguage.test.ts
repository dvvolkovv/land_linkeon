import { describe, it, expect, vi } from 'vitest';
import { languageFromPath, pathForLanguage } from './urlLanguage';

// Какие языки выпущены для страниц ассистентов — отдельная от этого модуля
// забота (availability.ts). Мокаем, чтобы тесты не зависели от того, что
// выпущено прямо сейчас (сейчас только ru, после переводов — все семь).
vi.mock('../content/assistants/availability', () => ({
  hasAssistantPages: (code: string) => code === 'ru' || code === 'en',
}));
vi.mock('../content/values/availability', () => ({
  hasValuesTest: (code: string) => code === 'ru' || code === 'en',
}));
vi.mock('../content/hd/availability', () => ({
  hasHdCalculator: (code: string) => code === 'ru',
}));

describe('languageFromPath', () => {
  it('корень — язык по умолчанию', () => {
    expect(languageFromPath('/')).toBe('ru');
    expect(languageFromPath('')).toBe('ru');
  });

  it('берёт язык из первого сегмента', () => {
    expect(languageFromPath('/en/')).toBe('en');
    expect(languageFromPath('/es')).toBe('es');
    expect(languageFromPath('/zh/')).toBe('zh');
  });

  it('неизвестный сегмент — язык по умолчанию', () => {
    expect(languageFromPath('/ja/')).toBe('ru');
    expect(languageFromPath('/pricing')).toBe('ru');
  });

  it('ru в пути не считается языковым префиксом: канонический ru — это корень', () => {
    expect(languageFromPath('/ru/')).toBe('ru');
  });
});

describe('pathForLanguage', () => {
  it('русский ведёт на корень', () => {
    expect(pathForLanguage('ru', '/en/')).toBe('/');
    expect(pathForLanguage('ru', '/')).toBe('/');
  });

  it('остальные — на свой префикс', () => {
    expect(pathForLanguage('es', '/')).toBe('/es/');
    expect(pathForLanguage('de', '/en/')).toBe('/de/');
  });

  it('сохраняет query и хеш', () => {
    expect(pathForLanguage('fr', '/en/', '?seg=biz', '#pricing')).toBe('/fr/?seg=biz#pricing');
    expect(pathForLanguage('ru', '/de/', '?utm_source=vk', '')).toBe('/?utm_source=vk');
  });
});

describe('pathForLanguage на страницах ассистентов', () => {
  // Без этого переключатель со страницы Райи уводил бы на главную — но только
  // когда у целевого языка страницы ассистентов вообще выпущены (мок: ru, en).
  it('остаётся на той же странице ассистента — адресом со слэшем', () => {
    expect(pathForLanguage('en', '/assistants/raya/')).toBe('/en/assistants/raya/');
    expect(pathForLanguage('ru', '/de/assistants/raya/')).toBe('/assistants/raya/');
  });

  it('остаётся в каталоге', () => {
    expect(pathForLanguage('ru', '/en/assistants/')).toBe('/assistants/');
  });

  // РЕГРЕССИЯ: slug не проверялся — с /assistants/unknown/ переключатель вёл
  // на /en/assistants/unknown/, с /assistants/index.html — на
  // /assistants/index.html/. Неизвестное — в каталог того же языка.
  it('незнакомый ассистент и лишние сегменты — в каталог', () => {
    expect(pathForLanguage('en', '/assistants/unknown/')).toBe('/en/assistants/');
    expect(pathForLanguage('en', '/assistants/raya/extra/', '?a=1', '#faq')).toBe('/en/assistants/?a=1#faq');
    expect(pathForLanguage('ru', '/en/assistants/german')).toBe('/assistants/');
  });

  it('явный index.html не считается сегментом', () => {
    expect(pathForLanguage('en', '/assistants/index.html')).toBe('/en/assistants/');
    expect(pathForLanguage('en', '/assistants/raya/index.html')).toBe('/en/assistants/raya/');
    expect(pathForLanguage('ru', '/en/assistants/alexey/index.html', '', '#faq')).toBe('/assistants/alexey/#faq');
  });

  // РЕГРЕССИЯ: у целевого языка страниц ассистентов нет (перевод ещё не
  // доехал) — такого адреса не существует (nginx отдал бы туда SPA-фолбэк),
  // переключатель обязан вести на главную этого языка, а не на несуществующую
  // страницу ассистента.
  it('у невыпущенного языка ведёт на главную, а не на несуществующую страницу', () => {
    expect(pathForLanguage('de', '/assistants/raya/', '?a=1', '#faq')).toBe('/de/?a=1#faq');
    expect(pathForLanguage('de', '/en/assistants/')).toBe('/de/');
  });
});

describe('pathForLanguage: явный index.html на прочих страницах', () => {
  it('документ — тот же, корень раздела — главная', () => {
    expect(pathForLanguage('en', '/legal/offer/index.html')).toBe('/en/legal/offer');
    expect(pathForLanguage('en', '/legal/index.html')).toBe('/en/');
    expect(pathForLanguage('de', '/en/index.html')).toBe('/de/');
  });
});

describe('pathForLanguage на тесте ценностей и калькуляторе', () => {
  // Без этого переключатель (и баннер языка) с теста уводили на главную.
  it('тест: та же страница на выпущенном языке', () => {
    expect(pathForLanguage('en', '/tests/values/')).toBe('/en/tests/values/');
    expect(pathForLanguage('ru', '/en/tests/values/', '?a=1', '#faq')).toBe('/tests/values/?a=1#faq');
    expect(pathForLanguage('en', '/tests/values/index.html')).toBe('/en/tests/values/');
  });

  it('тест: на невыпущенном языке — главная этого языка', () => {
    expect(pathForLanguage('de', '/tests/values/', '?a=1')).toBe('/de/?a=1');
  });

  it('калькулятор: та же страница только там, где выпущен', () => {
    expect(pathForLanguage('ru', '/en/calculators/human-design/')).toBe('/calculators/human-design/');
    expect(pathForLanguage('en', '/calculators/human-design/')).toBe('/en/');
  });
});
