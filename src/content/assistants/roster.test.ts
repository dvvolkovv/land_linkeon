import { describe, expect, it } from 'vitest';
import { ASSISTANTS, ASSISTANT_SLUGS } from './roster.data.js';
import { assistantBySlug, assistantName, isAssistantSlug } from './roster';
import { SUPPORTED_CODES } from '../../i18n/languages.data.js';

describe('реестр ассистентов', () => {
  it('id и slug не повторяются', () => {
    expect(new Set(ASSISTANTS.map((a) => a.id)).size).toBe(ASSISTANTS.length);
    expect(new Set(ASSISTANT_SLUGS).size).toBe(ASSISTANTS.length);
  });

  // slug попадает в адрес и не меняется: он — английское имя из
  // GET /webhook/agents?lang=en, приведённое к нижнему регистру.
  it('slug — английское имя в нижнем регистре', () => {
    for (const a of ASSISTANTS) expect(a.slug).toBe(a.names.en.toLowerCase());
  });

  it('категории — значения колонки agents.category', () => {
    for (const a of ASSISTANTS) expect(['assistant', 'business', 'personal']).toContain(a.category);
  });

  it('«Работает в паре с»: 2–3 разных существующих соседа, не сам', () => {
    for (const a of ASSISTANTS) {
      expect(a.related.length, a.slug).toBeGreaterThanOrEqual(2);
      expect(a.related.length, a.slug).toBeLessThanOrEqual(3);
      expect(new Set(a.related).size, a.slug).toBe(a.related.length);
      for (const r of a.related) {
        expect(ASSISTANT_SLUGS, `${a.slug} → ${r}`).toContain(r);
        expect(r, a.slug).not.toBe(a.slug);
      }
    }
  });

  it('имя есть на каждом языке реестра', () => {
    for (const a of ASSISTANTS) {
      for (const code of SUPPORTED_CODES) {
        expect(a.names[code]?.trim(), `${a.slug}/${code}`).toBeTruthy();
      }
    }
  });

  it('помощники', () => {
    expect(assistantBySlug('raya')?.id).toBe(14);
    expect(assistantBySlug('german')).toBeUndefined();
    expect(isAssistantSlug('olia')).toBe(true);
    expect(isAssistantSlug('Olia')).toBe(false);
    expect(assistantName(assistantBySlug('misha')!, 'de')).toBe('Mischa');
    // Незнакомый язык — английское написание, а не русское.
    expect(assistantName(assistantBySlug('misha')!, 'ja')).toBe('Misha');
  });
});
