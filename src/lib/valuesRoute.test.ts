import { describe, expect, it } from 'vitest';
import { TESTS_SEGMENT, VALUES_TEST_SLUG, parseValuesTestPath, valuesTestPath } from './valuesRoute';
import { TESTS_SEGMENT as SITE_SEGMENT, VALUES_TEST_SLUG as SITE_SLUG } from '../../scripts/site-urls.mjs';

describe('адрес теста ценностей', () => {
  it('русский в корне, со слэшем и без, с index.html', () => {
    expect(parseValuesTestPath('/tests/values/')).toEqual({ language: 'ru' });
    expect(parseValuesTestPath('/tests/values')).toEqual({ language: 'ru' });
    expect(parseValuesTestPath('/tests/values/index.html')).toEqual({ language: 'ru' });
  });

  it('другой язык — под префиксом', () => {
    expect(parseValuesTestPath('/en/tests/values/')).toEqual({ language: 'en' });
  });

  it('чужие адреса — не наш', () => {
    expect(parseValuesTestPath('/')).toBeNull();
    expect(parseValuesTestPath('/tests/')).toBeNull();
    expect(parseValuesTestPath('/tests/other/')).toBeNull();
    expect(parseValuesTestPath('/tests/values/extra')).toBeNull();
    expect(parseValuesTestPath('/xx/tests/values/')).toBeNull();
    expect(parseValuesTestPath('/calculators/human-design/')).toBeNull();
  });

  it('сборка адреса и разбор сходятся', () => {
    expect(valuesTestPath('ru')).toBe('/tests/values/');
    expect(valuesTestPath('de')).toBe('/de/tests/values/');
    expect(parseValuesTestPath(valuesTestPath('de'))).toEqual({ language: 'de' });
  });

  it('литералы те же, что у генератора sitemap', () => {
    expect(TESTS_SEGMENT).toBe(SITE_SEGMENT);
    expect(VALUES_TEST_SLUG).toBe(SITE_SLUG);
  });
});
