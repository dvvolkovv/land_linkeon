import { describe, expect, it } from 'vitest';
import { hasHdCalculator } from './availability';

// Проверяет не саму логику (она — один includes), а что define реально
// подставлен в vitest: без __HD_CALC_LANGUAGES__ этот файл не импортируется вовсе.
describe('доступность калькулятора Human Design по языку', () => {
  it('русский выпущен', () => {
    expect(hasHdCalculator('ru')).toBe(true);
  });

  it('несуществующий язык — нет', () => {
    expect(hasHdCalculator('xx')).toBe(false);
  });
});
