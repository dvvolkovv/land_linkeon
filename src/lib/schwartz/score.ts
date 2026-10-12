import { ITEMS } from './items';
import { AXES, AXIS_KEYS, VALUE_KEYS, valuesOf, type AxisKey, type AxisLean, type ValueKey } from './values';

export const ANSWER_MIN = 1;
export const ANSWER_MAX = 6;
/** Разница групп меньше этого — «в равновесии». В единицах шкалы ответов. */
export const BALANCE_THRESHOLD = 0.5;
/** Разброс баллов ценностей меньше этого — приоритеты не выделились. */
export const FLAT_THRESHOLD = 0.5;
const PER_VALUE = 3;
const RANGE_ERROR_MESSAGE = `тест ценностей: нужно ${ITEMS.length} ответов от ${ANSWER_MIN} до ${ANSWER_MAX}`;

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
   * передвинуть её внутри «хвоста» с равной минимальной суммой. При
   * restEqual bottom не выбирается, и порядок остаётся как от исходного
   * сравнения — переставлять нечего.
   */
  ranking: ValueKey[];
  /** Приоритеты не выделились: ответы почти одинаковые. */
  flat: boolean;
  /**
   * Три ведущие; при restEqual — все, чья сумма больше минимальной (одна-три);
   * пусто, если приоритеты не выделились.
   */
  top: ValueKey[];
  /**
   * Полная ничья на срезе тройки: ценности вне top, у которых все три ответа
   * совпадают (сумма, максимум и минимум) с третьей ведущей (top[2]) — то
   * есть ничья решилась только порядком круга, а не ответами, и это стоит
   * показать как есть. Ранжирование отсортировано по (сумма, наибольший,
   * наименьший), поэтому совпадение с top[0] или top[1] вне тройки влечёт
   * совпадение с top[2]. Сумма top[2] здесь всегда строго больше минимальной
   * — той же, что у bottom (вне restEqual над минимумом не меньше четырёх
   * ценностей, см. ниже), — поэтому top[2] не может совпасть с bottom:
   * topTies и bottomTies не пересекаются и не содержат bottom. В порядке
   * ranking; пусто при flat и при restEqual.
   */
  topTies: ValueKey[];
  /**
   * Наименее важная среди тех, что не вошли в top: ничья решается в обратную
   * сторону, чем наверху — ниже та, где сильнее минимум («совсем не похож на
   * меня»), затем максимум, и только при полном совпадении ответов — дальняя
   * по кругу ценность. Всегда с минимальной суммой. null при flat и при
   * restEqual.
   */
  bottom: ValueKey | null;
  /**
   * Полная ничья у наименее важной: ценности вне top (и кроме самой bottom),
   * чьи три ответа совпадают (сумма, максимум и минимум) с bottom. В порядке
   * ranking; пусто при flat и при restEqual.
   */
  bottomTies: ValueKey[];
  /**
   * Выделились не больше трёх ценностей, а все остальные набрали одну и ту же
   * (минимальную) сумму — назвать среди них «наименее важную» было бы
   * произволом круга: при полностью одинаковых ответах её выбрал бы порядок
   * круга, а пометка «с тем же результатом» перечислила бы до шести других.
   * Срабатывает, когда сумму больше минимальной по всем десяти набрали одна,
   * две или три ценности; тогда top — ровно они. false при flat.
   */
  restEqual: boolean;
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
    throw new RangeError(RANGE_ERROR_MESSAGE);
  }
  for (let i = 0; i < answers.length; i += 1) {
    const a = answers[i];
    if (!Number.isInteger(a) || a < ANSWER_MIN || a > ANSWER_MAX) {
      throw new RangeError(RANGE_ERROR_MESSAGE);
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
    return { scores, ranking, flat: true, top: [], topTies: [], bottom: null, bottomTies: [], restEqual: false, axes };
  }

  // Больше минимальной суммы набрали не больше трёх ценностей — значит, все
  // остальные делят одну сумму: ведущие — только выделившиеся, а «наименее
  // важную» среди равных не назвать (решение владельца).
  const minSum = stats[ranking[ranking.length - 1]].sum;
  const above = ranking.filter((k) => stats[k].sum > minSum);

  if (above.length <= 3) {
    return { scores, ranking, flat: false, top: above, topTies: [], bottom: null, bottomTies: [], restEqual: true, axes };
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
  // bottom — минимальная сумма среди всех (над минимумом не меньше четырёх
  // ценностей, так что вне top минимальная сумма есть), поэтому
  // перенос в конец лишь переставляет её внутри «хвоста» с равной минимальной
  // суммой, не трогая более высокие записи.
  const orderedRanking = [...ranking.filter((k) => k !== bottom), bottom];

  const sameStats = (a: ValueKey, b: ValueKey): boolean =>
    stats[a].sum === stats[b].sum && stats[a].max === stats[b].max && stats[a].min === stats[b].min;
  const third = top[2];
  const topTies = orderedRanking.filter((k) => !topSet.has(k) && sameStats(k, third));
  const bottomTies = orderedRanking.filter((k) => !topSet.has(k) && k !== bottom && sameStats(k, bottom));

  return { scores, ranking: orderedRanking, flat: false, top, topTies, bottom, bottomTies, restEqual: false, axes };
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
