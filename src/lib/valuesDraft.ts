import { chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';
import { joinAnd, joinClauses, joinSentences } from './textJoin';
import { AXIS_KEYS, type ValueKey, type ValuesResult } from './schwartz';
import type { ValuesTexts } from '../content/values/types';

/** id Оли в приложении (таблица agents; тот же — в src/content/assistants/roster.data.js). */
export const OLIA_ID = 2;
const UTM_CONTENT = 'values-test';

export const oliaChatHref = (): string => chatHref(OLIA_ID, UTM_CONTENT);
export const oliaChatUrlWithDraft = (message: string): string => chatUrlWithDraft(OLIA_ID, UTM_CONTENT, message);

type MessageTexts = Pick<
  ValuesTexts,
  'values' | 'axesInMessage' | 'tiedInMessage' | 'bottomInMessage' | 'restEqualInMessage' | 'message' | 'messageFlat'
>;

/**
 * Первое сообщение Оле: ведущие, наименее важная и обе оси; полная ничья —
 * в скобках после ценности («с тем же результатом — …»); остальные набрали поровну —
 * «остальные — поровну» вместо наименее важной. Приоритеты не выделились —
 * своё сообщение без ценностей. Ответов в нём нет — только итог, который
 * человек и так видит на экране. Перечни и оси склеиваются по правилам языка
 * страницы (src/lib/textJoin.ts).
 */
export function valuesMessage(texts: MessageTexts, result: ValuesResult, language: string): string {
  if (result.flat) return texts.messageFlat;
  const name = (k: ValueKey) => texts.values[k].inMessage;
  const list = (keys: ValueKey[]) => joinAnd(keys.map(name), language);
  const withTies = (head: string, ties: ValueKey[]) =>
    ties.length ? joinSentences([head, fillTemplate(texts.tiedInMessage, { names: list(ties) })], language) : head;
  return fillTemplate(texts.message, {
    top: withTies(list(result.top), result.topTies),
    rest: result.bottom
      ? fillTemplate(texts.bottomInMessage, { bottom: withTies(name(result.bottom), result.bottomTies) })
      : texts.restEqualInMessage,
    axes: joinClauses(
      AXIS_KEYS.map((k) => texts.axesInMessage[k][result.axes[k].lean]),
      language,
    ),
  });
}
