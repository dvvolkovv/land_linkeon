import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Button from '../ui/Button';
import ValuesQuestion from './ValuesQuestion';
import ValuesResult from './ValuesResult';
import { ITEMS, scoreAnswers } from '../../lib/schwartz';
import {
  EMPTY_PROGRESS,
  answer,
  back,
  clearProgress,
  isComplete,
  loadProgress,
  saveProgress,
  type Progress,
} from '../../lib/valuesProgress';
import { reachGoal } from '../../lib/goal';
import { fillTemplate } from '../../lib/chatDraft';
import type { ValuesTexts } from '../../content/values/types';

/**
 * Тест: карточка старта → 30 утверждений → результат.
 *
 * Прогресс — в sessionStorage вкладки (valuesProgress.ts): перезагрузка не
 * обнуляет, закрытая вкладка стирает. В пререндере окна нет — там карточка
 * старта; клиент поднимается через createRoot, без гидратации, поэтому
 * чтение хранилища в начальном состоянии ничего не ломает.
 *
 * Цели Метрики — только имена: начало с первого утверждения по клику
 * («Начать», «Начать заново», «Пройти заново») и 30-й ответ. Результат,
 * поднятый из хранилища после перезагрузки, цель не повторяет.
 *
 * ym-hide-content на контейнере — вторая линия: Вебвизор на этой странице
 * выключен при пререндере (по кликам и полосе прогресса ответы
 * восстанавливались бы), но настройку могут когда-нибудь вернуть.
 */
export default function ValuesTest({ texts }: { texts: ValuesTexts }) {
  const [saved] = useState(() => (typeof window === 'undefined' ? null : loadProgress()));
  const [progress, setProgress] = useState<Progress>(saved ?? EMPTY_PROGRESS);
  const [started, setStarted] = useState(saved !== null && isComplete(saved));
  // Фокус и прокрутка — только после действия человека, не при загрузке.
  const acted = useRef(false);
  const result = useMemo(() => (isComplete(progress) ? scoreAnswers(progress.answers) : null), [progress]);

  useEffect(() => {
    if (!acted.current || !started) return;
    if (result) {
      // Без фокуса скринридер не объявит результат, а Tab повёл бы мимо него.
      document.getElementById('values-test')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('values-result-heading')?.focus({ preventScroll: true });
    } else {
      document.getElementById('values-statement')?.focus({ preventScroll: true });
      const box = document.getElementById('values-test');
      const rect = box?.getBoundingClientRect();
      // Шапка фиксированная (h-16, 64px). Блок уходит под неё (после «Пройти заново»
      // из низа длинного результата) или не помещается снизу (после «Начать» блок стоит
      // под вступлением) — подтягиваем его к верху, чтобы утверждение и ответы были на экране.
      if (box && rect && (rect.top < 64 || rect.bottom > window.innerHeight)) box.scrollIntoView({ block: 'start' });
    }
  }, [progress, started, result]);

  const update = (next: Progress) => {
    acted.current = true;
    setProgress(next);
    saveProgress(next);
  };

  const begin = () => {
    clearProgress();
    reachGoal('values-test-start');
    setStarted(true);
    update(EMPTY_PROGRESS);
  };

  const resume = () => {
    acted.current = true;
    setStarted(true);
  };

  const onAnswer = (value: number) => {
    const next = answer(progress, value);
    if (isComplete(next)) reachGoal('values-test-complete');
    update(next);
  };

  let body: ReactNode;
  if (!started) {
    body = (
      <div data-testid="values-start" className="max-w-2xl rounded-2xl border border-paper-300 bg-paper-100 p-6">
        <p className="text-paper-800">{texts.start.meta}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {saved && !isComplete(saved) ? (
            <>
              <Button size="lg" onClick={resume}>
                {fillTemplate(texts.start.resume, { done: String(saved.answers.length), total: String(ITEMS.length) })}
              </Button>
              <Button size="lg" variant="outline" onClick={begin}>
                {texts.start.restart}
              </Button>
            </>
          ) : (
            <Button size="lg" onClick={begin}>
              {texts.start.begin}
            </Button>
          )}
        </div>
      </div>
    );
  } else if (result) {
    body = <ValuesResult texts={texts} result={result} onRestart={begin} />;
  } else {
    body = (
      <ValuesQuestion
        texts={texts}
        index={progress.index}
        chosen={progress.answers[progress.index]}
        onAnswer={onAnswer}
        onBack={() => update(back(progress))}
      />
    );
  }

  return (
    <div id="values-test" data-testid="values-test" className="ym-hide-content scroll-mt-20">
      {body}
    </div>
  );
}
