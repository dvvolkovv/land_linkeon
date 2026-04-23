import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <Section id="faq" ariaLabelledby="faq-heading">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('faq.eyebrow')}</Eyebrow>
        <h2 id="faq-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('faq.h2')}
        </h2>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="max-w-3xl mx-auto">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-slate-200 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer list-none py-5 min-h-[60px]">
                <span className="text-slate-900 font-semibold pr-4">{item.q}</span>
                <ChevronDown aria-hidden="true" className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <p className="mt-0 pb-5 text-slate-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
