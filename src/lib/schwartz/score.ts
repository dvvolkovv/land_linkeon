import { ITEMS } from './items';
import { AXES, AXIS_KEYS, VALUE_KEYS, valuesOf, type AxisKey, type AxisLean, type ValueKey } from './values';

export const ANSWER_MIN = 1;
export const ANSWER_MAX = 6;
/** Разница групп меньше этого — «в равновесии». В единицах шкалы ответов. */
export const BALANCE_THRESHOLD = 0.5;
/** Разброс баллов ценностей меньше этого — приоритеты не выделились. */
export const FLAT_THRESHOLD = 0.5;
const PER_VALUE = 3;

export interface AxisResult {
  lean: AxisLean;
  /** Средний балл левой группы минус правой. */
  diff: number;
}

export interface ValuesResult {
  /** Балл ценности: среднее её ответов минус личное среднее по всем ответам. */
  scores: Record<ValueKey, number>;
  /**
   * Все десять по убыванию суммы её трёх ответов; ничья решается по самим
   * ответам — выше та, где сильнее максимум («очень похож на меня» хоть в
   * одном утверждении), затем минимум, — и только если три ответа совпадают
   * как мультисет, порядком круга. Наименее важная (bottom) стоит последней
   * записью — решение владельца о порядке ничьей снизу (byDisinterest) может
   * передвинуть её внутри «хвоста» с равной минимальной суммой.
   */
  ranking: ValueKey[];
  /** Приоритеты не выделились: ответы почти одинаковые. */
  flat: boolean;
  /** Три ведущие; пусто, если приоритеты не выделились. */
  top: ValueKey[];
  /**
   * Наименее важная среди тех, что не вошли в top: ничья решается в обратную
   * сторону, чем наверху — ниже та, где сильнее минимум («совсем не похож на
   * меня»), затем максимум, и только при полном совпадении ответов — дальняя
   * по кругу ценность. null, если приоритеты не выделились.
   */
  bottom: ValueKey | null;
  axes: Record<AxisKey, AxisResult>;
}

interface Stat {
  sum: number;
  max: number;
  min: number;
}

const circleIndex = (key: ValueKey): number => VALUE_KEYS.indexOf(key);

function statsByValue(answers: readonly number[]): Record<ValueKey, Stat> {
  const perValue = Object.fromEntries(VALUE_KEYS.map((k) => [k, [] as number[]])) as Record<ValueKey, number[]>;
  ITEMS.forEach((item, i) => perValue[item.value].push(answers[i]));
  return Object.fromEntries(
    VALUE_KEYS.map((k) => {
      const values = perValue[k];
      return [k, { sum: values.reduce((s, a) => s + a, 0), max: Math.max(...values), min: Math.min(...values) }];
    }),
  ) as Record<ValueKey, Stat>;
}

/**
 * Расчёт по Шварцу с поправкой на манеру отвечать: балл ценности — среднее её
 * трёх ответов минус личное среднее. Сравнения идут в целых суммах ответов,
 * а не в средних с плавающей точкой: пороги 0,5 сравниваются точно, и ответ
 * ровно на границе не уезжает в другую сторону из-за 0,49999.
 */
export function scoreAnswers(answers: readonly number[]): ValuesResult {
  if (answers.length !== ITEMS.length) {
    throw new RangeError(`тест ценностей: нужно ${ITEMS.length} ответов от ${ANSWER_MIN} до ${ANSWER_MAX}`);
  }
  for (let i = 0; i < answers.length; i += 1) {
    const a = answers[i];
    if (!Number.isInteger(a) || a < ANSWER_MIN || a > ANSWER_MAX) {
      throw new RangeError(`тест ценностей: нужно ${ITEMS.length} ответов от ${ANSWER_MIN} до ${ANSWER_MAX}`);
    }
  }
  const stats = statsByValue(answers);
  const sums = Object.fromEntries(VALUE_KEYS.map((k) => [k, stats[k].sum])) as Record<ValueKey, number>;
  const mean = answers.reduce((s, a) => s + a, 0) / answers.length;
  const scores = Object.fromEntries(VALUE_KEYS.map((k) => [k, sums[k] / PER_VALUE - mean])) as Record<ValueKey, number>;

  /** Выше та, где сильнее «очень похож на меня»: сумма, затем максимум, затем минимум ответа. */
  const byPriority = (a: ValueKey, b: ValueKey): number =>
    stats[b].sum - stats[a].sum ||
    stats[b].max - stats[a].max ||
    stats[b].min - stats[a].min ||
    circleIndex(a) - circleIndex(b);

  const ranking = [...VALUE_KEYS].sort(byPriority);
  const flat = stats[ranking[0]].sum - stats[ranking[ranking.length - 1]].sum < FLAT_THRESHOLD * PER_VALUE;
  const axes = Object.fromEntries(AXIS_KEYS.map((key) => [key, axis(key, sums)])) as Record<AxisKey, AxisResult>;

  if (flat) {
    return { scores, ranking, flat: true, top: [], bottom: null, axes };
  }

  const top = ranking.slice(0, 3);
  const topSet = new Set(top);

  /** Ниже та, где сильнее «совсем не похож на меня»: сумма, затем минимум, затем максимум ответа. */
  const byDisinterest = (a: ValueKey, b: ValueKey): number =>
    stats[a].sum - stats[b].sum ||
    stats[a].min - stats[b].min ||
    stats[a].max - stats[b].max ||
    circleIndex(b) - circleIndex(a);

  const bottom = VALUE_KEYS.filter((k) => !topSet.has(k)).sort(byDisinterest)[0];
  // bottom — минимальная сумма среди всех (иначе она попала бы в top), поэтому
  // перенос в конец лишь переставляет её внутри «хвоста» с равной минимальной
  // суммой, не трогая более высокие записи.
  const orderedRanking = [...ranking.filter((k) => k !== bottom), bottom];

  return { scores, ranking: orderedRanking, flat: false, top, bottom, axes };
}

/**
 * diff = сумма_левых/(3·n_лев) − сумма_правых/(3·n_прав). Умноженная на
 * 3·n_лев·n_прав, она целая — с ней и сравнивается порог.
 */
function axis(key: AxisKey, sums: Record<ValueKey, number>): AxisResult {
  const left = valuesOf(AXES[key].left);
  const right = valuesOf(AXES[key].right);
  const leftSum = left.reduce((s, k) => s + sums[k], 0);
  const rightSum = right.reduce((s, k) => s + sums[k], 0);
  const scaled = leftSum * right.length - rightSum * left.length;
  const unit = PER_VALUE * left.length * right.length;
  const lean: AxisLean = Math.abs(scaled) < BALANCE_THRESHOLD * unit ? 'balance' : scaled > 0 ? 'left' : 'right';
  return { lean, diff: scaled / unit };
}
