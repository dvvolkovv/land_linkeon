import { describe, expect, it } from 'vitest';
import { ITEMS, VALUE_KEYS, scoreAnswers, type ItemId, type ValueKey } from './index';

/** Ответы по ценностям: утверждению — число его ценности, остальным — rest. */
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

/** Поправить ответы на отдельные утверждения. */
const withItems = (answers: number[], items: Partial<Record<ItemId, number>>): number[] =>
  ITEMS.map((item, i) => items[item.id] ?? answers[i]);

describe('расчёт теста ценностей', () => {
  it('ответы проверяются: 30 целых от 1 до 6', () => {
    expect(() => scoreAnswers([])).toThrow(RangeError);
    expect(() => scoreAnswers(by({}).slice(1))).toThrow(RangeError);
    expect(() => scoreAnswers(by({}, 0))).toThrow(RangeError);
    expect(() => scoreAnswers(by({}, 7))).toThrow(RangeError);
    expect(() => scoreAnswers(by({ power: 2.5 }))).toThrow(RangeError);
    expect(() => scoreAnswers(new Array(30))).toThrow(RangeError);
  });

  it('ручной пример: балл — среднее ценности минус личное среднее', () => {
    // 3 ценности × 3 × 6 = 54, власть 3 × 1 = 3, шесть ценностей × 3 × 3 = 54:
    // всего 111, личное среднее 3,7.
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));
    expect(r.scores.selfDirection).toBeCloseTo(2.3, 10);
    expect(r.scores.power).toBeCloseTo(-2.7, 10);
    expect(r.scores.security).toBeCloseTo(-0.7, 10);
    expect(r.top).toEqual(['selfDirection', 'stimulation', 'benevolence']);
    expect(r.topTies).toEqual([]);
    expect(r.bottom).toBe('power');
    expect(r.bottomTies).toEqual([]);
    expect(r.flat).toBe(false);
    // открытость (6+6)/2 против сохранения (3+3+3)/3; забота (6+3)/2 против самоутверждения (3+1)/2
    expect(r.axes.change).toEqual({ lean: 'left', diff: 3 });
    expect(r.axes.focus).toEqual({ lean: 'left', diff: 2.5 });
  });

  it('баллы в сумме — ноль: это отклонения от личного среднего', () => {
    const r = scoreAnswers(by({ selfDirection: 5, universalism: 4, power: 1 }, 2));
    expect(VALUE_KEYS.reduce((s, k) => s + r.scores[k], 0)).toBeCloseTo(0, 10);
  });

  it('манера отвечать не меняет порядок: +1 ко всем ответам', () => {
    const base = by({ selfDirection: 5, universalism: 4, power: 1, tradition: 3 }, 2);
    const a = scoreAnswers(base);
    const b = scoreAnswers(base.map((x) => x + 1));
    expect(b.ranking).toEqual(a.ranking);
    expect(b.top).toEqual(a.top);
    expect(b.bottom).toBe(a.bottom);
    expect(b.axes).toEqual(a.axes);
    for (const k of VALUE_KEYS) expect(b.scores[k]).toBeCloseTo(a.scores[k], 10);
  });

  it('одинаковые ответы — порядок круга, и наверху, и внизу', () => {
    const r = scoreAnswers(by({ tradition: 5, benevolence: 5, security: 5 }));
    expect(r.top).toEqual(['security', 'tradition', 'benevolence']);
    expect(r.ranking).toEqual([
      'security', 'tradition', 'benevolence',
      'selfDirection', 'stimulation', 'hedonism', 'achievement', 'power', 'conformity', 'universalism',
    ]);
    expect(r.bottom).toBe('universalism');
  });

  it('ничья наверху — выше та, где сильнее «очень похож»', () => {
    const r = scoreAnswers(
      withItems(by({ selfDirection: 5, stimulation: 5 }), { universalism1: 6, universalism2: 5, universalism3: 4 }),
    );
    expect(r.top).toEqual(['universalism', 'selfDirection', 'stimulation']);
  });

  it('ничья, решённая ответами, — не помечается', () => {
    const r = scoreAnswers(
      withItems(by({ selfDirection: 5, stimulation: 5 }), { universalism1: 6, universalism2: 5, universalism3: 4 }),
    );
    // у остальных ответы {3,3,3}, а не {5,5,5}, как у «стимуляции» (третьей ведущей)
    expect(r.topTies).toEqual([]);

    const bottomR = scoreAnswers(withItems(by({ power: 2 }, 4), { achievement1: 1, achievement2: 2, achievement3: 3 }));
    // у власти ответы {2,2,2}, а не {1,2,3}, как у наименее важного «достижения»
    expect(bottomR.bottomTies).toEqual([]);
  });

  it('ничья внизу — ниже та, где сильнее «совсем не похож»', () => {
    const r = scoreAnswers(withItems(by({ power: 2 }, 4), { achievement1: 1, achievement2: 2, achievement3: 3 }));
    expect(r.bottom).toBe('achievement');
    expect(r.ranking[r.ranking.length - 1]).toBe('achievement');
  });

  it('полная ничья на срезе тройки и внизу — помечена', () => {
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 5, universalism: 5 }));
    expect(r.top).toEqual(['selfDirection', 'stimulation', 'benevolence']);
    expect(r.topTies).toEqual(['universalism']);
    expect(r.bottom).toBe('tradition');
    expect(r.bottomTies).toEqual(['hedonism', 'achievement', 'power', 'security', 'conformity']);
  });

  it('ведущая не бывает наименее важной', () => {
    const r = scoreAnswers(
      withItems(by({ selfDirection: 5 }, 4), { selfDirection3: 4, stimulation1: 6, stimulation2: 4, stimulation3: 2 }),
    );
    expect(r.top).toEqual(['selfDirection', 'stimulation', 'hedonism']);
    expect(r.bottom).toBe('universalism');
    expect(r.flat).toBe(false);
  });

  it('одинаковые ответы — приоритеты не выделились', () => {
    const r = scoreAnswers(by({}, 4));
    expect(r.flat).toBe(true);
    expect(r.top).toEqual([]);
    expect(r.topTies).toEqual([]);
    expect(r.bottom).toBeNull();
    expect(r.bottomTies).toEqual([]);
    expect(r.axes.change.lean).toBe('balance');
    expect(r.axes.focus.lean).toBe('balance');
    expect(r.ranking).toEqual([...VALUE_KEYS]);
  });

  it('граница «не выделились»: разброс в одну единицу ответа — ещё ровно, в две — уже нет', () => {
    const one = scoreAnswers(withItems(by({}, 4), { selfDirection1: 5 }));
    expect(one.flat).toBe(true);
    expect(one.axes.change.lean).toBe('balance');
    const two = scoreAnswers(withItems(by({}, 4), { selfDirection1: 5, selfDirection2: 5 }));
    expect(two.flat).toBe(false);
    expect(two.top[0]).toBe('selfDirection');
  });

  it('ось: разница меньше 0,5 — равновесие, ровно 0,5 — уже сторона', () => {
    // самостоятельность 4+4+3: открытость (11+9)/6, сохранение 27/9 — разница 1/3
    const below = scoreAnswers(withItems(by({}), { selfDirection1: 4, selfDirection2: 4 }));
    expect(below.axes.change.lean).toBe('balance');
    // 4+4+4: разница ровно 0,5
    const at = scoreAnswers(withItems(by({}), { selfDirection1: 4, selfDirection2: 4, selfDirection3: 4 }));
    expect(at.axes.change).toEqual({ lean: 'left', diff: 0.5 });
    const right = scoreAnswers(by({ security: 6, tradition: 6 }));
    expect(right.axes.change.lean).toBe('right');
    // наивная арифметика через средние (а не целые суммы) даёт здесь
    // 0.4999999999999998 вместо 0.5 — страховка от такого регресса.
    const focusAt = scoreAnswers(withItems(by({}, 2), { benevolence1: 3, achievement1: 1, power1: 1 }));
    expect(focusAt.axes.focus).toEqual({ lean: 'left', diff: 0.5 });
    const changeAt = scoreAnswers(
      withItems(by({}, 2), { selfDirection1: 3, security1: 1, conformity1: 1, tradition1: 1 }),
    );
    expect(changeAt.axes.change).toEqual({ lean: 'left', diff: 0.5 });
  });

  it('персоны', () => {
    const open = scoreAnswers(by({ selfDirection: 6, stimulation: 6, security: 2, conformity: 2, tradition: 2 }, 4));
    expect(open.axes.change.lean).toBe('left');
    expect(open.top.slice(0, 2)).toEqual(['selfDirection', 'stimulation']);

    const keep = scoreAnswers(by({ security: 6, conformity: 6, tradition: 6, selfDirection: 2, stimulation: 2 }, 4));
    expect(keep.axes.change.lean).toBe('right');
    expect(keep.top).toEqual(['security', 'conformity', 'tradition']);

    const care = scoreAnswers(by({ benevolence: 6, universalism: 6, achievement: 2, power: 2 }, 4));
    expect(care.axes.focus.lean).toBe('left');
    expect(care.top.slice(0, 2)).toEqual(['benevolence', 'universalism']);
    expect(care.bottom).toBe('power');

    const ambition = scoreAnswers(by({ achievement: 6, power: 6, benevolence: 2, universalism: 2 }, 4));
    expect(ambition.axes.focus.lean).toBe('right');
    expect(ambition.top.slice(0, 2)).toEqual(['achievement', 'power']);
  });
});
