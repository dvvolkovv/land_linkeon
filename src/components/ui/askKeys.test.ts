import { describe, expect, it } from 'vitest';
import { submitsOnEnter } from './askKeys';

describe('submitsOnEnter', () => {
  it('Enter без Shift и не во время IME — нажимает кнопку', () => {
    expect(submitsOnEnter({ key: 'Enter', shiftKey: false })).toBe(true);
  });

  it('Shift+Enter — перевод строки, кнопку не нажимает', () => {
    expect(submitsOnEnter({ key: 'Enter', shiftKey: true })).toBe(false);
  });

  it('Enter во время набора через IME (isComposing) — не нажимает', () => {
    expect(submitsOnEnter({ key: 'Enter', shiftKey: false, isComposing: true })).toBe(false);
  });

  it('Enter с keyCode 229 (IME в Safari) — не нажимает', () => {
    expect(submitsOnEnter({ key: 'Enter', shiftKey: false, keyCode: 229 })).toBe(false);
  });

  it('другая клавиша — не нажимает', () => {
    expect(submitsOnEnter({ key: 'a', shiftKey: false })).toBe(false);
  });
});
