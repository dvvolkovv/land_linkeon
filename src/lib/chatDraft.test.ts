import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH, askTarget, chatHref, chatUrlWithAsk, chatUrlWithDraft, fillTemplate } from './chatDraft';

const draftOf = (url: string) => decodeURIComponent(new URL(url).hash.slice('#draft='.length));

describe('ссылка в чат с черновиком', () => {
  it('в href — ассистент и метка, без черновика', () => {
    const href = chatHref(2, 'values-test');
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://my.linkeon.io/chat');
    expect(url.searchParams.get('assistant')).toBe('2');
    expect(url.searchParams.get('utm_content')).toBe('values-test');
    expect(href).not.toContain('#');
  });

  it('черновик — во фрагменте; знак % доходит целым', () => {
    const url = chatUrlWithDraft(2, 'values-test', 'Оля, привет! 100% так');
    expect(new URL(url).searchParams.get('assistant')).toBe('2');
    expect(draftOf(url)).toBe('Оля, привет! 100% так');
  });

  it('длиннее лимита — обрезка по границе символа', () => {
    const text = 'я'.repeat(DRAFT_MAX_LENGTH - 1) + String.fromCodePoint(0x1f600);
    expect(draftOf(chatUrlWithDraft(2, 'values-test', text))).toBe('я'.repeat(DRAFT_MAX_LENGTH - 1));
  });

  it('# & + доходят до кабинета целыми', () => {
    const text = 'a#b&c=d+e';
    expect(draftOf(chatUrlWithDraft(2, 'values-test', text))).toBe(text);
  });

  it('шаблон: незнакомый ключ остаётся как есть — опечатку видно', () => {
    expect(fillTemplate('{a} {b}', { a: '1' })).toBe('1 {b}');
  });

  it('шаблон: ключи берутся только из своих свойств, не из прототипа', () => {
    expect(fillTemplate('{constructor} {__proto__}', {})).toBe('{constructor} {__proto__}');
  });
});

describe('ссылка с вопросом (#ask=)', () => {
  const askOf = (url: string) => decodeURIComponent(new URL(url).hash.slice('#ask='.length));

  it('вопрос — во фрагменте #ask=, ассистент и метка — в адресе', () => {
    const url = chatUrlWithAsk(12, 'hero-ask', 'Как поднять цены? 100%');
    expect(new URL(url).searchParams.get('assistant')).toBe('12');
    expect(new URL(url).searchParams.get('utm_content')).toBe('hero-ask');
    expect(askOf(url)).toBe('Как поднять цены? 100%');
  });

  it('длиннее лимита — обрезка по границе символа', () => {
    const text = 'я'.repeat(DRAFT_MAX_LENGTH - 1) + String.fromCodePoint(0x1f600);
    expect(askOf(chatUrlWithAsk(12, 'hero-ask', text))).toBe('я'.repeat(DRAFT_MAX_LENGTH - 1));
  });

  it('пустое поле — обычный переход в чат, без фрагмента', () => {
    expect(askTarget(12, 'hero-ask', '   ')).toBe(chatHref(12, 'hero-ask'));
    expect(askTarget(12, 'hero-ask', ' Вопрос ')).toBe(chatUrlWithAsk(12, 'hero-ask', 'Вопрос'));
  });
});
