import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('how.steps', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Section id="how" ariaLabelledby="how-heading" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('how.eyebrow')}</Eyebrow>
        <h2 id="how-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('how.h2')}
        </h2>
      </FadeIn>

      <div className="relative">
        <div aria-hidden="true" className="hidden md:block absolute top-8 left-0 right-0 border-t border-slate-200" />
        <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 100}>
              <div className="text-6xl font-semibold text-indigo-600 tabular-nums leading-none mb-4">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn delay={500} className="text-center mt-12">
        <a href="https://my.linkeon.io" data-cta="how-start" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold" target="_blank" rel="noopener noreferrer">
          {t('how.cta')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </a>
      </FadeIn>
    </Section>
  );
}
