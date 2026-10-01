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
});
