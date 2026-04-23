import { useTranslation } from 'react-i18next';
import { Clock, Users, Layers } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

const ICONS = [Clock, Users, Layers];

export default function Problem() {
  const { t } = useTranslation();
  const items = t('problem.items', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Section id="problem" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-16">
        <Eyebrow className="mb-4">{t('problem.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance max-w-3xl mx-auto">
          {t('problem.h2')}
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-12">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <FadeIn key={it.title} delay={i * 100}>
              <div className="inline-flex p-3 rounded-xl bg-slate-100 mb-4">
                <Icon className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{it.title}</h3>
              <p className="text-slate-600 leading-relaxed">{it.text}</p>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={400} className="mt-16 text-center max-w-2xl mx-auto text-lg text-slate-600">
        {t('problem.footer')}
      </FadeIn>
    </Section>
  );
}
