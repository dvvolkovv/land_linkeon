import { describe, expect, it } from 'vitest';
import { cityDbUrl } from './cityLoader';

describe('база городов по языку страницы', () => {
  it('свой файл на каждый язык сайта', () => {
    for (const code of ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh']) {
      expect(cityDbUrl(code), code).toMatch(new RegExp(`cities\\.${code}`));
    }
  });
  it('незнакомый язык — русская база', () => {
    expect(cityDbUrl('xx')).toMatch(/cities\.ru/);
  });
});
