import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH, chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';

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

  it('шаблон: незнакомый ключ остаётся как есть — опечатку видно', () => {
    expect(fillTemplate('{a} {b}', { a: '1' })).toBe('1 {b}');
  });
});
