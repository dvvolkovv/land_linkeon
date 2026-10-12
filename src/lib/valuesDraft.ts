import { chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';
import { AXIS_KEYS, type ValueKey, type ValuesResult } from './schwartz';
import type { ValuesTexts } from '../content/values/types';

/** id Оли в приложении (таблица agents; тот же — в src/content/assistants/roster.data.js). */
export const OLIA_ID = 2;
const UTM_CONTENT = 'values-test';

export const oliaChatHref = (): string => chatHref(OLIA_ID, UTM_CONTENT);
export const oliaChatUrlWithDraft = (message: string): string => chatUrlWithDraft(OLIA_ID, UTM_CONTENT, message);

type MessageTexts = Pick<
  ValuesTexts,
  'values' | 'axesInMessage' | 'and' | 'tiedInMessage' | 'bottomInMessage' | 'restEqualInMessage' | 'message' | 'messageFlat'
>;

/** «а, б и в»; одно название — как есть. */
const list = (names: string[], and: string): string =>
  names.length > 1 ? `${names.slice(0, -1).join(', ')} ${and} ${names[names.length - 1]}` : names.join('');

/**
 * Первое сообщение Оле: ведущие, наименее важная и обе оси; полная ничья —
 * в скобках после ценности («с тем же результатом — …»); остальные набрали поровну —
 * «остальные — поровну» вместо наименее важной. Приоритеты не выделились —
 * своё сообщение без ценностей. Ответов в нём нет — только итог, который
 * человек и так видит на экране.
 */
export function valuesMessage(texts: MessageTexts, result: ValuesResult): string {
  if (result.flat) return texts.messageFlat;
  const name = (k: ValueKey) => texts.values[k].inMessage;
  const tied = (ties: ValueKey[]) =>
    ties.length ? ` ${fillTemplate(texts.tiedInMessage, { names: list(ties.map(name), texts.and) })}` : '';
  return fillTemplate(texts.message, {
    top: list(result.top.map(name), texts.and) + tied(result.topTies),
    rest: result.bottom
      ? fillTemplate(texts.bottomInMessage, { bottom: name(result.bottom) + tied(result.bottomTies) })
      : texts.restEqualInMessage,
    axes: AXIS_KEYS.map((k) => texts.axesInMessage[k][result.axes[k].lean]).join('; '),
  });
}
