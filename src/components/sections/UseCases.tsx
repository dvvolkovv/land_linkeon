import { useTranslation } from 'react-i18next';
import { Building2, Rocket, Target, CheckCircle2 } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Card from '../ui/Card';
import FadeIn from '../ui/FadeIn';

const ICONS = [Building2, Rocket, Target];

export default function UseCases() {
  const { t } = useTranslation();
  const items = t('useCases.items', { returnObjects: true }) as { title: string; text: string; benefits: string[] }[];

  return (
    <Section ariaLabelledby="usecases-heading">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('useCases.eyebrow')}</Eyebrow>
        <h2 id="usecases-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('useCases.h2')}
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <FadeIn key={it.title} delay={i * 100}>
              <Card className="p-6 h-full flex flex-col">
                <div className="inline-flex w-10 h-10 rounded-lg bg-indigo-50 items-center justify-center mb-4">
                  <Icon aria-hidden="true" className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{it.title}</h3>
                <p className="text-slate-600 mb-5 flex-1">{it.text}</p>
                <ul className="space-y-2">
                  {it.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="min-w-0 break-words">{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
