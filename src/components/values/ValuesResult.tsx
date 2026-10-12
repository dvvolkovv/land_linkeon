import { useMemo, type MouseEvent } from 'react';
import { ArrowRight, ChevronDown, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import ValuesCircle from './ValuesCircle';
import {
  AXIS_KEYS,
  GROUP_COLORS,
  HIGHER_ORDER_KEYS,
  VALUE_KEYS,
  type ValueKey,
  type ValuesResult as Result,
} from '../../lib/schwartz';
import { oliaChatHref, oliaChatUrlWithDraft, valuesMessage } from '../../lib/valuesDraft';
import { fillTemplate } from '../../lib/chatDraft';
import type { ValuesTexts } from '../../content/values/types';

interface Props {
  texts: ValuesTexts;
  result: Result;
  onRestart: () => void;
}

/** Карточка ценности; tiedWith — полная ничья на срезе (те же три ответа), помечается честно. */
function ValueCard({ texts, value, tiedWith = [] }: { texts: ValuesTexts; value: ValueKey; tiedWith?: ValueKey[] }) {
  const v = texts.values[value];
  return (
    <li className="rounded-xl border border-paper-300 bg-paper-50 p-4">
      <p className="font-semibold text-paper-900">{v.name}</p>
      <p className="mt-1 text-sm text-paper-700">{v.line}</p>
      <p className="mt-2 leading-relaxed text-paper-800">{v.text}</p>
      {tiedWith.length > 0 && (
        <p data-testid="values-tie" className="mt-2 text-sm text-paper-700">
          {fillTemplate(texts.result.tiedWith, { names: tiedWith.map((k) => texts.values[k].name).join(', ') })}
        </p>
      )}
    </li>
  );
}

/**
 * Результат: круг, ведущие и наименее важная ценности, напряжения, переход
 * к Оле, все десять в личном порядке. Данных в атрибутах нет: круг —
 * картинкой, черновик Оле собирается только в момент клика. Единственное
 * исключение на всём тесте — aria-pressed у прежнего ответа в ValuesQuestion
 * (нужен для доступности; пока Вебвизор выключен, безвреден — см. ValuesTest.tsx).
 */
export default function ValuesResult({ texts, result, onRestart }: Props) {
  const r = texts.result;
  const labels = useMemo(
    () => Object.fromEntries(VALUE_KEYS.map((k) => [k, texts.values[k].name])) as Record<ValueKey, string>,
    [texts],
  );

  // В href кнопки черновика нет: его читают Вебвизор и отслеживание ссылок
  // Метрики. Средний клик и «открыть в новой вкладке» из меню идут по чистому
  // href без черновика — осознанно, как у калькулятора.
  const toOlia = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = oliaChatUrlWithDraft(valuesMessage(texts, result));
    if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(url, '_blank', 'noopener');
    else window.location.assign(url);
  };

  return (
    <div data-testid="values-result">
      <h2
        id="values-result-heading"
        tabIndex={-1}
        className="text-2xl font-semibold tracking-tight text-paper-900 focus:outline-none md:text-3xl"
      >
        {r.heading}
      </h2>

      <div className="mt-6">
        <ValuesCircle result={result} labels={labels} alt={r.circleAlt} />
        <ul aria-label={r.legend} className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-paper-700">
          {HIGHER_ORDER_KEYS.map((g) => (
            <li key={g}>
              <span
                aria-hidden="true"
                className="mr-1 inline-block h-3 w-3 rounded-full align-middle"
                style={{ backgroundColor: GROUP_COLORS[g] }}
              />
              {texts.higherOrder[g]}
            </li>
          ))}
        </ul>
      </div>

      {result.flat ? (
        <div data-testid="values-flat" className="mt-8 max-w-2xl">
          <h3 className="text-xl font-semibold text-paper-900">{r.flatHeading}</h3>
          <p className="mt-2 leading-relaxed text-paper-800">{r.flatText}</p>
        </div>
      ) : (
        <>
          <h3 className="mt-8 text-xl font-semibold text-paper-900">
            {result.top.length === 1 ? r.topHeadingOne : r.topHeading}
          </h3>
          <ol data-testid="values-top" className="mt-3 grid gap-3 md:grid-cols-3">
            {result.top.map((k, i) => (
              <ValueCard key={k} texts={texts} value={k} tiedWith={i === result.top.length - 1 ? result.topTies : []} />
            ))}
          </ol>
          {result.bottom ? (
            <>
              <h3 className="mt-8 text-xl font-semibold text-paper-900">{r.bottomHeading}</h3>
              <ul data-testid="values-bottom" className="mt-3 grid gap-3 md:grid-cols-3">
                <ValueCard texts={texts} value={result.bottom} tiedWith={result.bottomTies} />
              </ul>
            </>
          ) : (
            // Выделились одна-три ценности, остальные набрали поровну (restEqual).
            <p data-testid="values-rest-equal" className="mt-6 max-w-2xl leading-relaxed text-paper-800">
              {r.restEqual}
            </p>
          )}
          <h3 className="mt-8 text-xl font-semibold text-paper-900">{r.axesHeading}</h3>
          <p data-testid="values-axes" className="mt-3 max-w-2xl leading-relaxed text-paper-800">
            {AXIS_KEYS.map((k) => texts.axes[k][result.axes[k].lean]).join(' ')}
          </p>
        </>
      )}

      <div className="mt-10 rounded-2xl border border-paper-300 bg-paper-100 p-6">
        <Button href={oliaChatHref()} size="lg" dataCta="values-test-to-olia" onClick={toOlia}>
          {r.cta} <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
        <p className="mt-3 text-sm text-paper-700">{r.ctaNote}</p>
      </div>

      <details className="group mt-8 border-y border-paper-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between py-5">
          <span className="pr-4 font-semibold text-paper-900">{r.allHeading}</span>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 flex-shrink-0 text-paper-600 transition-transform group-open:rotate-180"
          />
        </summary>
        <ol data-testid="values-all" className="space-y-4 pb-5">
          {result.ranking.map((k) => (
            <li key={k}>
              <p className="font-semibold text-paper-900">
                {texts.values[k].name} <span className="font-normal text-paper-700">— {texts.values[k].line}</span>
              </p>
              <p className="mt-1 leading-relaxed text-paper-800">{texts.values[k].text}</p>
            </li>
          ))}
        </ol>
      </details>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-paper-800 underline underline-offset-4 hover:text-paper-900"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        {r.restart}
      </button>
    </div>
  );
}
