import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ANSWER_MAX, ANSWER_MIN, ITEMS } from '../../lib/schwartz';
import { fillTemplate } from '../../lib/chatDraft';
import type { ValuesTexts } from '../../content/values/types';

interface Props {
  texts: ValuesTexts;
  index: number;
  /** Ответ, данный раньше (после «Назад»), — подсвечен. */
  chosen?: number;
  onAnswer: (value: number) => void;
  onBack: () => void;
}

/** Ответы сверху вниз — от «очень похож» к «совсем не похож». */
const OPTIONS = Array.from({ length: ANSWER_MAX - ANSWER_MIN + 1 }, (_, i) => ANSWER_MAX - i);

/**
 * Одно утверждение на экран и шесть ответов списком — так удобнее всего на
 * телефоне. Нажатие — сразу следующее утверждение (ValuesTest).
 */
export default function ValuesQuestion({ texts, index, chosen, onAnswer, onBack }: Props) {
  const q = texts.question;
  const total = ITEMS.length;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Кнопки ответов — те же DOM-узлы для следующего утверждения: нервный
    // двойной тап успевает попасть по уже другому вопросу. 250 мс — реальный
    // disabled, а не проверка по времени клика, которая тихо съела бы тап.
    setReady(false);
    const t = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(t);
  }, [index]);
  return (
    <div data-testid="values-question" className="max-w-2xl">
      <div className="flex min-h-11 items-center justify-between gap-4 text-sm text-paper-700">
        <span data-testid="values-progress-label">
          {fillTemplate(q.progress, { n: String(index + 1), total: String(total) })}
        </span>
        {index > 0 && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 items-center gap-1 px-2 font-semibold text-paper-800 hover:text-paper-900"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {q.back}
          </button>
        )}
      </div>
      <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-paper-200">
        <div className="h-full bg-brand-800 transition-[width]" style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <p
        key={index}
        id="values-statement"
        tabIndex={-1}
        className="mt-6 text-xl font-semibold leading-snug text-paper-900 focus:outline-none md:text-2xl"
      >
        {texts.statements[ITEMS[index].id]}
      </p>
      <p id="values-prompt" className="mt-2 text-paper-700">
        {q.prompt}
      </p>
      <div role="group" aria-labelledby="values-statement" aria-describedby="values-prompt" className="mt-5 grid gap-2">
        {OPTIONS.map((value) => (
          <button
            key={value}
            type="button"
            disabled={!ready}
            aria-pressed={chosen === value}
            onClick={() => onAnswer(value)}
            className={`min-h-12 rounded-xl border px-4 py-3 text-left font-semibold transition-colors ${
              chosen === value
                ? 'border-brand-800 bg-brand-800 text-white'
                : 'border-paper-300 bg-paper-50 text-paper-900 [@media(hover:hover)]:hover:border-paper-500'
            }`}
          >
            {q.scale[value - 1]}
          </button>
        ))}
      </div>
    </div>
  );
}
