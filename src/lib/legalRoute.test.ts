import { describe, expect, it } from 'vitest';

import { legalPath, parseLegalPath } from './legalRoute';
import { pathForLanguage } from '../i18n/urlLanguage';

describe('parseLegalPath', () => {
  it('русский документ живёт в корне', () => {
    expect(parseLegalPath('/legal/offer')).toEqual({ language: 'ru', doc: 'offer' });
    expect(parseLegalPath('/legal/privacy')).toEqual({ language: 'ru', doc: 'privacy' });
    expect(parseLegalPath('/legal/pdn')).toEqual({ language: 'ru', doc: 'pdn' });
  });

  it('остальные языки под префиксом', () => {
    expect(parseLegalPath('/en/legal/offer')).toEqual({ language: 'en', doc: 'offer' });
    expect(parseLegalPath('/zh/legal/privacy')).toEqual({ language: 'zh', doc: 'privacy' });
  });

  // Сервер статики нередко добавляет хвостовой слэш сам, и /legal/offer/
  // обязан вести туда же, а не показывать лендинг.
  it('хвостовой слэш не мешает', () => {
    expect(parseLegalPath('/legal/offer/')).toEqual({ language: 'ru', doc: 'offer' });
    expect(parseLegalPath('/de/legal/pdn/')).toEqual({ language: 'de', doc: 'pdn' });
  });

  it('всё прочее — обычный лендинг', () => {
    expect(parseLegalPath('/')).toBeNull();
    expect(parseLegalPath('/en/')).toBeNull();
    expect(parseLegalPath('/legal')).toBeNull();
    expect(parseLegalPath('/legal/offer/extra')).toBeNull();
    expect(parseLegalPath('/pricing')).toBeNull();
  });

  // Незнакомый документ не должен подставлять первый попавшийся: адрес
  // /legal/refunds обязан вести на лендинг, а не молча показать оферту.
  it('неизвестный документ не подставляется', () => {
    expect(parseLegalPath('/legal/refunds')).toBeNull();
    expect(parseLegalPath('/en/legal/terms')).toBeNull();
  });

  // Незнакомый языковой префикс трактуется как часть пути, а не как язык,
  // иначе /xx/legal/offer тихо отдал бы русскую редакцию под чужим кодом.
  it('незнакомый языковой префикс не проходит', () => {
    expect(parseLegalPath('/xx/legal/offer')).toBeNull();
  });
});

describe('legalPath', () => {
  it('строит адрес обратно', () => {
    expect(legalPath('ru', 'offer')).toBe('/legal/offer');
    expect(legalPath('en', 'privacy')).toBe('/en/legal/privacy');
  });

  it('разбор и сборка сходятся', () => {
    for (const path of ['/legal/offer', '/en/legal/privacy', '/fr/legal/pdn']) {
      const parsed = parseLegalPath(path);
      expect(parsed).not.toBeNull();
      expect(legalPath(parsed!.language, parsed!.doc)).toBe(path);
    }
  });
});

describe('pathForLanguage на страницах документов', () => {
  // РЕГРЕССИЯ: переключатель игнорировал путь и всегда вёл на главную.
  // Человек, читавший политику по-английски, при смене языка терял место.
  it('остаётся на том же документе', () => {
    expect(pathForLanguage('en', '/legal/privacy')).toBe('/en/legal/privacy');
    expect(pathForLanguage('ru', '/en/legal/privacy')).toBe('/legal/privacy');
    expect(pathForLanguage('de', '/fr/legal/offer')).toBe('/de/legal/offer');
  });

  it('с лендинга по-прежнему ведёт на лендинг', () => {
    expect(pathForLanguage('en', '/')).toBe('/en/');
    expect(pathForLanguage('ru', '/en/')).toBe('/');
  });
});
