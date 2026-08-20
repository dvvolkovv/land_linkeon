import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Paperclip, FileDown } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import Button from '../ui/Button';
import { appUrl } from '../../lib/appUrl';

interface Case {
  tab: string;
  file: string;
  ask: string;
  steps: string[];
  result: string;
}

export default function Agentic() {
  const { t } = useTranslation();
  const cases = t('agentic.cases', { returnObjects: true }) as Case[];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = cases[active];

  // Паттерн WAI-ARIA tabs: в табстрипе Tab'ом достижим только активный таб,
  // между табами ходят стрелками. Без этого с клавиатуры видно один сценарий.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight'
        ? (active + 1) % cases.length
        : (active - 1 + cases.length) % cases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // Секция идёт по фону страницы (gray-50), а не белой плашкой: соседняя
  // Problem белая, и две белые подряд слились бы в одну полосу — на всём
  // лендинге такой пары нет. Глубину даёт не фон секции, а карточки внутри:
  // белая карточка запроса и брендовая карточка результата.
  return (
    <Section id="agentic" ariaLabelledby="agentic-heading">
      <FadeIn className="text-center mb-12">
        <Eyebrow className="mb-4">{t('agentic.eyebrow')}</Eyebrow>
        <h2
          id="agentic-heading"
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 text-balance max-w-3xl mx-auto"
        >
          {t('agentic.h2')}
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t('agentic.sub')}
        </p>
      </FadeIn>

      <div
        role="tablist"
        aria-label={t('agentic.h2')}
        onKeyDown={onKeyDown}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {cases.map((c, i) => (
          <button
            key={c.tab}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`agentic-tab-${i}`}
            aria-selected={i === active}
            aria-controls="agentic-panel"
            tabIndex={i === active ? 0 : -1}
            data-testid={`agentic-tab-${i}`}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 ${
              i === active
                ? 'bg-brand-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="agentic-panel"
        aria-labelledby={`agentic-tab-${active}`}
        data-testid="agentic-panel"
        className="max-w-2xl mx-auto"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            {t('agentic.youLabel')}
          </p>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-3">
            <Paperclip aria-hidden="true" className="w-4 h-4 text-gray-500" />
            {current.file}
          </p>
          <p className="text-gray-700 leading-relaxed">«{current.ask}»</p>
        </div>

        <ol className="my-6 pl-1 space-y-3">
          {current.steps.map((step, i) => (
            <FadeIn key={step} delay={i * 120}>
              <li className="flex items-start gap-3 text-gray-600">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                <span className="leading-relaxed">{step}</span>
              </li>
            </FadeIn>
          ))}
        </ol>

        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-3">
            {t('agentic.assistantLabel')}
          </p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <FileDown aria-hidden="true" className="w-4 h-4 text-brand-700" />
            {current.result}
          </p>
        </div>
      </div>

      <FadeIn delay={200} className="mt-10 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 mb-6">{t('agentic.note')}</p>
        <Button variant="primary" size="lg" href={appUrl()} dataCta="agentic-start">
          {t('agentic.cta')}
        </Button>
      </FadeIn>
    </Section>
  );
}
