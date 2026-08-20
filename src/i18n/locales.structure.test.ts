import { describe, expect, it } from 'vitest';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages.data.js';
import ru from './locales/ru.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

// check-locales.mjs сверяет только плоские ключи, а массив для его flatten() —
// лист. Локаль с одним сценарием вместо трёх (или тремя шагами вместо
// четырёх) прошла бы ту проверку молча и обрезала бы секцию на чужом языке.
// Здесь сверяем ФОРМУ: длины массивов и набор полей внутри элементов.
const LOCALES: Record<string, unknown> = { en, es, de, fr, pt, zh };

type Shape =
  | { kind: 'leaf' }
  | { kind: 'array'; length: number; items: Shape[] }
  | { kind: 'object'; fields: Record<string, Shape> };

function shapeOf(value: unknown): Shape {
  if (Array.isArray(value)) {
    return { kind: 'array', length: value.length, items: value.map(shapeOf) };
  }
  if (value && typeof value === 'object') {
    const fields: Record<string, Shape> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      fields[key] = shapeOf(inner);
    }
    return { kind: 'object', fields };
  }
  return { kind: 'leaf' };
}

/** Расхождения формы, путями от корня — чтобы падение называло виновный ключ. */
function diff(source: Shape, target: Shape, path = ''): string[] {
  const at = path || '(корень)';
  if (source.kind !== target.kind) {
    return [`${at}: ожидался ${source.kind}, получен ${target.kind}`];
  }
  if (source.kind === 'array' && target.kind === 'array') {
    if (source.length !== target.length) {
      return [`${at}: ожидалось элементов ${source.length}, получено ${target.length}`];
    }
    return source.items.flatMap((item, i) => diff(item, target.items[i], `${path}[${i}]`));
  }
  if (source.kind === 'object' && target.kind === 'object') {
    return Object.entries(source.fields).flatMap(([key, inner]) => {
      const next = path ? `${path}.${key}` : key;
      const other = target.fields[key];
      if (!other) return [`${next}: ключа нет`];
      return diff(inner, other, next);
    });
  }
  return [];
}

describe('структура локалей повторяет ru.json', () => {
  const source = shapeOf(ru);

  // Реестр языков и набор импортов обязаны совпадать: иначе новый язык
  // появится в сборке, но останется без этой проверки.
  it('проверяются все языки реестра', () => {
    expect(Object.keys(LOCALES).sort()).toEqual(
      SUPPORTED_CODES.filter((code) => code !== DEFAULT_LANGUAGE).sort(),
    );
  });

  for (const [code, locale] of Object.entries(LOCALES)) {
    it(`${code}: та же форма, что у ru`, () => {
      expect(diff(source, shapeOf(locale))).toEqual([]);
    });
  }
});
