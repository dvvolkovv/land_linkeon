import { describe, expect, it } from 'vitest';
import { assistantPageCodes } from './assistant-page-languages.js';
import { translatedCodes } from './translated-languages.js';

describe('языки страниц ассистентов', () => {
  it('русский выпущен всегда', () => {
    expect(assistantPageCodes()).toContain('ru');
  });

  // Модуль текстов без выпущенной локали сайта не публикуется: страница
  // ассистента на языке, которого нет у остального сайта, вела бы в никуда.
  it('только из выпущенных языков сайта', () => {
    const site = translatedCodes();
    for (const code of assistantPageCodes()) expect(site).toContain(code);
  });
});
