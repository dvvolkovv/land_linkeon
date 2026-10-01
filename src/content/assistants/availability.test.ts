import { describe, expect, it } from 'vitest';
import { hasAssistantPages } from './availability';

// Проверяет не саму логику (она — один includes), а что define реально
// подставлен в vitest: без __ASSISTANT_PAGE_LANGUAGES__ этот файл не
// импортируется вовсе.
describe('доступность страниц ассистентов по языку', () => {
  it('русский выпущен', () => {
    expect(hasAssistantPages('ru')).toBe(true);
  });

  it('несуществующий язык — нет', () => {
    expect(hasAssistantPages('xx')).toBe(false);
  });
});
