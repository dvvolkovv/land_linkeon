import { describe, expect, it } from 'vitest';
import { CALCULATORS_SEGMENT, HD_CALC_SLUG, hdCalcPath, parseHdCalcPath } from './hdRoute';
import { CALCULATORS_SEGMENT as SITE_SEGMENT, HD_CALC_SLUG as SITE_SLUG } from '../../scripts/site-urls.mjs';

describe('адрес калькулятора', () => {
  it('русский в корне, со слэшем и без, с index.html', () => {
    expect(parseHdCalcPath('/calculators/human-design/')).toEqual({ language: 'ru' });
    expect(parseHdCalcPath('/calculators/human-design')).toEqual({ language: 'ru' });
    expect(parseHdCalcPath('/calculators/human-design/index.html')).toEqual({ language: 'ru' });
  });

  it('другой язык — под префиксом', () => {
    expect(parseHdCalcPath('/en/calculators/human-design/')).toEqual({ language: 'en' });
  });

  it('чужие адреса — не наш', () => {
    expect(parseHdCalcPath('/')).toBeNull();
    expect(parseHdCalcPath('/calculators/')).toBeNull();
    expect(parseHdCalcPath('/calculators/numerology/')).toBeNull();
    expect(parseHdCalcPath('/calculators/human-design/extra')).toBeNull();
    expect(parseHdCalcPath('/xx/calculators/human-design/')).toBeNull();
    expect(parseHdCalcPath('/assistants/raya/')).toBeNull();
  });

  it('сборка адреса и разбор сходятся', () => {
    expect(hdCalcPath('ru')).toBe('/calculators/human-design/');
    expect(hdCalcPath('de')).toBe('/de/calculators/human-design/');
    expect(parseHdCalcPath(hdCalcPath('de'))).toEqual({ language: 'de' });
  });

  it('литералы те же, что у генератора sitemap', () => {
    expect(CALCULATORS_SEGMENT).toBe(SITE_SEGMENT);
    expect(HD_CALC_SLUG).toBe(SITE_SLUG);
  });
});
