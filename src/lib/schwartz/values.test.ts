import { describe, expect, it } from 'vitest';
import { AXES, HIGHER_ORDER_KEYS, VALUE_GROUP, VALUE_KEYS, valuesOf } from './index';

describe('ценности Шварца', () => {
  it('десять, в порядке круга', () => {
    expect(VALUE_KEYS).toEqual([
      'selfDirection', 'stimulation', 'hedonism', 'achievement', 'power',
      'security', 'conformity', 'tradition', 'benevolence', 'universalism',
    ]);
  });

  it('группы высшего порядка; гедонизм — ни в одной', () => {
    expect(valuesOf('openness')).toEqual(['selfDirection', 'stimulation']);
    expect(valuesOf('selfEnhancement')).toEqual(['achievement', 'power']);
    expect(valuesOf('conservation')).toEqual(['security', 'conformity', 'tradition']);
    expect(valuesOf('selfTranscendence')).toEqual(['benevolence', 'universalism']);
    expect(VALUE_GROUP.hedonism).toBeNull();
  });

  // Круг держится на соседстве: ценности одной группы стоят подряд, иначе
  // дуга группы на рисунке разорвалась бы.
  it('ценности одной группы на круге идут подряд', () => {
    for (const group of HIGHER_ORDER_KEYS) {
      const at = valuesOf(group).map((k) => VALUE_KEYS.indexOf(k));
      expect(at[at.length - 1] - at[0], group).toBe(at.length - 1);
    }
  });

  it('оси противопоставляют противоположные группы', () => {
    expect(AXES.change).toEqual({ left: 'openness', right: 'conservation' });
    expect(AXES.focus).toEqual({ left: 'selfTranscendence', right: 'selfEnhancement' });
  });
});
