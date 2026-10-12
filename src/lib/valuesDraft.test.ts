import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH } from './chatDraft';
import { OLIA_ID, oliaChatHref, oliaChatUrlWithDraft, valuesMessage } from './valuesDraft';
import { ITEMS, VALUE_KEYS, scoreAnswers, type AxisKey, type AxisLean, type ValueKey, type ValuesResult } from './schwartz';
import { VALUES_TEXTS } from '../content/values/texts.server';
import { assistantBySlug } from '../content/assistants/roster';

const ru = VALUES_TEXTS.ru;
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

describe('сообщение Оле', () => {
  it('ведущие, наименее важная и обе оси', () => {
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));
    expect(valuesMessage(ru, r)).toBe(
      'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — самостоятельность, стимуляция и доброта, на последнем — власть. Мне ближе перемены, чем сохранение привычного; забота о других для меня важнее личного успеха. Помоги разобраться, что это значит для меня',
    );
  });

  it('полная ничья — в скобках после третьей ведущей и после наименее важной', () => {
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 5, universalism: 5 }));
    expect(valuesMessage(ru, r)).toBe(
      'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — самостоятельность, стимуляция и доброта (с тем же результатом — универсализм), на последнем — традиция (с тем же результатом — гедонизм, достижение, власть, безопасность и конформность). Мне ближе перемены, чем сохранение привычного; забота о других для меня важнее личного успеха. Помоги разобраться, что это значит для меня',
    );
  });

  it('остальные набрали поровну — без наименее важной', () => {
    const r = scoreAnswers(by({ selfDirection: 5, stimulation: 5 }, 4));
    expect(valuesMessage(ru, r)).toBe(
      'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — самостоятельность и стимуляция, остальные — поровну. Мне ближе перемены, чем сохранение привычного; забота о других и личный успех у меня в равновесии. Помоги разобраться, что это значит для меня',
    );
  });

  it('приоритеты не выделились — своё сообщение', () => {
    expect(valuesMessage(ru, scoreAnswers(by({}, 4)))).toBe(ru.messageFlat);
  });

  it('самый длинный возможный случай — в лимите кабинета', () => {
    for (const [code, t] of Object.entries(VALUES_TEXTS)) {
      const longest = [...VALUE_KEYS].sort((a, b) => t.values[b].inMessage.length - t.values[a].inMessage.length);
      const longestLean = (axis: AxisKey): AxisLean =>
        (['left', 'right', 'balance'] as const).reduce((best, lean) =>
          t.axesInMessage[axis][lean].length > t.axesInMessage[axis][best].length ? lean : best,
        );
      const worst: ValuesResult = {
        scores: Object.fromEntries(VALUE_KEYS.map((k) => [k, 0])) as Record<ValueKey, number>,
        ranking: longest,
        flat: false,
        restEqual: false,
        top: longest.slice(0, 3),
        topTies: longest.slice(4, 7),
        bottom: longest[3],
        bottomTies: longest.slice(7),
        axes: { change: { lean: longestLean('change'), diff: 0 }, focus: { lean: longestLean('focus'), diff: 0 } },
      };
      expect(valuesMessage(t, worst).length, code).toBeLessThanOrEqual(DRAFT_MAX_LENGTH);
      expect(t.messageFlat.length, code).toBeLessThanOrEqual(DRAFT_MAX_LENGTH);
    }
  });
});

describe('ссылка к Оле', () => {
  it('id Оли — тот же, что в реестре ассистентов', () => {
    expect(OLIA_ID).toBe(assistantBySlug('olia')?.id);
  });

  it('в href — ассистент и метка теста, без черновика', () => {
    const href = oliaChatHref();
    expect(new URL(href).searchParams.get('assistant')).toBe(String(OLIA_ID));
    expect(new URL(href).searchParams.get('utm_content')).toBe('values-test');
    expect(href).not.toContain('#');
  });

  it('черновик — во фрагменте', () => {
    const url = new URL(oliaChatUrlWithDraft('Оля, привет!'));
    expect(url.searchParams.get('assistant')).toBe(String(OLIA_ID));
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toBe('Оля, привет!');
  });
});
