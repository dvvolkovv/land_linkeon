import { describe, expect, it } from 'vitest';
import { hasValuesTest } from './availability';

// Проверяет не логику (она — один includes), а что define подставлен в
// vitest: без __VALUES_TEST_LANGUAGES__ этот файл не импортируется вовсе.
describe('доступность теста ценностей по языку', () => {
  it('русский выпущен', () => {
    expect(hasValuesTest('ru')).toBe(true);
  });

  it('несуществующий язык — нет', () => {
    expect(hasValuesTest('xx')).toBe(false);
  });
});
