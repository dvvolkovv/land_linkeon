import { describe, expect, it } from 'vitest';
import { breadcrumbJsonLd, faqJsonLd } from './jsonLd';

describe('разметка schema.org', () => {
  it('хлебные крошки: абсолютные адреса, позиции с единицы', () => {
    const data = breadcrumbJsonLd([
      { name: 'Главная', path: '/' },
      { name: 'Ассистенты', path: '/assistants/' },
      { name: 'Райя', path: '/assistants/raya/' },
    ]);
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(data.itemListElement[2].item).toBe('https://linkeon.io/assistants/raya/');
  });

  it('вопросы: тот же текст, что видит человек', () => {
    const data = faqJsonLd([{ q: 'Сколько стоит?', a: 'Первые разговоры за наш счёт.' }]);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Сколько стоит?',
      acceptedAnswer: { '@type': 'Answer', text: 'Первые разговоры за наш счёт.' },
    });
  });

  // У некоторых вопросов (например, у ссылки Райи на калькулятор) есть
  // кнопка-ссылка — на странице она рисуется отдельно от текста ответа.
  // В FAQPage ей не место ни в самом тексте, ни отдельным полем: это
  // разметка для человека, а не часть ответа для поисковика.
  it('ссылка из FAQ не попадает в FAQPage — ни в тексте, ни отдельным полем', () => {
    const faq = [
      {
        q: 'Чем это отличается от калькулятора или обычного чат-бота?',
        a: 'Калькулятор строит карту и даёт общие описания — такой есть и у нас.',
        link: { text: 'Рассчитать бодиграф бесплатно', href: '/calculators/human-design/' },
      },
    ];
    const data = faqJsonLd(faq);
    expect(data.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: faq[0].q,
      acceptedAnswer: { '@type': 'Answer', text: faq[0].a },
    });
  });
});
