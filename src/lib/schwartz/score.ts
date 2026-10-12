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
  /** Все десять по убыванию балла; равные — в порядке круга. */
  ranking: ValueKey[];
  /** Приоритеты не выделились: ответы почти одинаковые. */
  flat: boolean;
  /** Три ведущие; пусто, если приоритеты не выделились. */
  top: ValueKey[];
  /** Наименее важная; null, если приоритеты не выделились. */
  bottom: ValueKey | null;
  axes: Record<AxisKey, AxisResult>;
}

/**
 * Расчёт по Шварцу с поправкой на манеру отвечать: балл ценности — среднее её
 * трёх ответов минус личное среднее. Сравнения идут в целых суммах ответов,
 * а не в средних с плавающей точкой: пороги 0,5 сравниваются точно, и ответ
 * ровно на границе не уезжает в другую сторону из-за 0,49999.
 */
export function scoreAnswers(answers: readonly number[]): ValuesResult {
  if (
    answers.length !== ITEMS.length ||
    answers.some((a) => !Number.isInteger(a) || a < ANSWER_MIN || a > ANSWER_MAX)
  ) {
    throw new RangeError(`тест ценностей: нужно ${ITEMS.length} ответов от ${ANSWER_MIN} до ${ANSWER_MAX}`);
  }
  const sums = Object.fromEntries(VALUE_KEYS.map((k) => [k, 0])) as Record<ValueKey, number>;
  ITEMS.forEach((item, i) => {
    sums[item.value] += answers[i];
  });
  const mean = answers.reduce((s, a) => s + a, 0) / answers.length;
  const scores = Object.fromEntries(VALUE_KEYS.map((k) => [k, sums[k] / PER_VALUE - mean])) as Record<ValueKey, number>;
  const ranking = [...VALUE_KEYS].sort((a, b) => sums[b] - sums[a] || VALUE_KEYS.indexOf(a) - VALUE_KEYS.indexOf(b));
  const flat = sums[ranking[0]] - sums[ranking[ranking.length - 1]] < FLAT_THRESHOLD * PER_VALUE;
  const axes = Object.fromEntries(AXIS_KEYS.map((key) => [key, axis(key, sums)])) as Record<AxisKey, AxisResult>;
  return {
    scores,
    ranking,
    flat,
    top: flat ? [] : ranking.slice(0, 3),
    bottom: flat ? null : ranking[ranking.length - 1],
    axes,
  };
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
