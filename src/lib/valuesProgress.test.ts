import { afterEach, describe, expect, it, vi } from 'vitest';
import { ITEMS } from './schwartz';
import {
  EMPTY_PROGRESS,
  PROGRESS_KEY,
  answer,
  back,
  clearProgress,
  isComplete,
  loadProgress,
  saveProgress,
  type Progress,
} from './valuesProgress';

/** sessionStorage в node — подмена, как в goal.test.ts. */
function stubStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  vi.stubGlobal('sessionStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
  return store;
}

afterEach(() => vi.unstubAllGlobals());

describe('ход теста', () => {
  it('ответ — и к следующему утверждению', () => {
    expect(answer(EMPTY_PROGRESS, 5)).toEqual({ answers: [5], index: 1 });
  });

  it('«Назад» не уходит раньше первого утверждения', () => {
    expect(back(EMPTY_PROGRESS)).toEqual(EMPTY_PROGRESS);
    expect(back({ answers: [5], index: 1 })).toEqual({ answers: [5], index: 0 });
  });

  it('после «Назад» новый ответ заменяет прежний, отвеченные дальше остаются', () => {
    let p: Progress = EMPTY_PROGRESS;
    p = answer(answer(answer(p, 5), 4), 3);
    p = back(back(p));
    expect(p).toEqual({ answers: [5, 4, 3], index: 1 });
    p = answer(p, 2);
    expect(p).toEqual({ answers: [5, 2, 3], index: 2 });
  });

  it('30 ответов — тест пройден; дальше ответ ничего не меняет', () => {
    let p: Progress = EMPTY_PROGRESS;
    for (let i = 0; i < ITEMS.length; i += 1) p = answer(p, 3);
    expect(isComplete(p)).toBe(true);
    expect(answer(p, 6)).toBe(p);
  });
});

describe('прогресс во вкладке', () => {
  it('ключ с версией', () => {
    expect(PROGRESS_KEY).toBe('values-test:v1');
  });

  it('сохраняется и читается', () => {
    stubStorage();
    saveProgress({ answers: [5, 4], index: 1 });
    expect(loadProgress()).toEqual({ answers: [5, 4], index: 1 });
    clearProgress();
    expect(loadProgress()).toBeNull();
  });

  it('ничего не отвечено — как будто записи нет', () => {
    stubStorage({ [PROGRESS_KEY]: JSON.stringify(EMPTY_PROGRESS) });
    expect(loadProgress()).toBeNull();
  });

  it('битая или чужая запись отбрасывается и стирается', () => {
    for (const raw of [
      '{oops',
      JSON.stringify({ answers: [7], index: 1 }),
      JSON.stringify({ answers: [3], index: 2 }),
      JSON.stringify({ answers: Array(31).fill(3), index: 30 }),
      JSON.stringify({ answers: [3.5], index: 1 }),
    ]) {
      const store = stubStorage({ [PROGRESS_KEY]: raw });
      expect(loadProgress(), raw).toBeNull();
      expect(store.has(PROGRESS_KEY), raw).toBe(false);
    }
  });

  it('хранилище недоступно — тест идёт без сохранения, без исключений', () => {
    const deny = () => {
      throw new Error('denied');
    };
    vi.stubGlobal('sessionStorage', { getItem: deny, setItem: deny, removeItem: deny });
    expect(loadProgress()).toBeNull();
    expect(() => saveProgress({ answers: [3], index: 1 })).not.toThrow();
    expect(() => clearProgress()).not.toThrow();
  });
});
