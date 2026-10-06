import { describe, expect, it } from 'vitest';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages.data.js';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

/**
 * Нерусская версия главной не несёт ни кириллицы, ни рублей. Кириллица там —
 * непереведённый кусок; рубль — цена, по которой иностранец заплатить не
 * сможет (витрина на других языках валютная). Переменная {{price}} — рубли
 * аренды сайта (src/content/products.ts), поэтому вне русского её тоже нет:
 * переведённое «{{price}} RUB» прошло бы мимо проверки на «₽».
 *
 * Такая проверка уже была, но только для текстов страниц ассистентов
 * (src/content/assistants/packs.test.ts) — файлы главной она не видит.
 * Проверяется весь файл, а не отдельные ветки: на 06.10.2026 все шесть чистые.
 */
const LOCALES: Record<string, unknown> = { en, es, de, fr, pt, zh };

function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      strings(v, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

describe('нерусские локали главной: без кириллицы и рублей', () => {
  it('проверяются все языки реестра', () => {
    expect(Object.keys(LOCALES).sort()).toEqual(
      SUPPORTED_CODES.filter((code) => code !== DEFAULT_LANGUAGE).sort(),
    );
  });

  for (const [code, locale] of Object.entries(LOCALES)) {
    it(code, () => {
      const leaks = strings(locale)
        .filter(([, s]) => /[Ѐ-ӿ₽]|\{\{\s*price\s*\}\}/.test(s))
        .map(([p, s]) => `${p}: ${s}`);
      expect(leaks).toEqual([]);
    });
  }
});
