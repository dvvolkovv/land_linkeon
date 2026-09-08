import { useTranslation } from 'react-i18next';
import { Clock, Users, Layers } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

const ICONS = [Clock, Users, Layers];

export default function Problem() {
  const { t } = useTranslation();
  const raw = t('problem.items', { returnObjects: true }) as { title: string; text: string }[];
  // Локаль — данные снаружи компонента: потерянный ключ здесь снимал бы всю
  // страницу, error boundary в App.tsx нет.
  const items = Array.isArray(raw) ? raw : [];

  return (
    <Section id="problem" ariaLabelledby="problem-heading" className="bg-paper-50 border-y border-paper-300">
      <FadeIn className="text-center mb-16">
        <Eyebrow className="mb-4">{t('problem.eyebrow')}</Eyebrow>
        <h2 id="problem-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 text-balance max-w-3xl mx-auto">
          {t('problem.h2')}
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <FadeIn key={it.title} delay={i * 100}>
              <div className="inline-flex p-3 rounded-xl bg-paper-200 mb-4">
                <Icon aria-hidden="true" className="w-6 h-6 text-paper-700" />
              </div>
              <h3 className="text-xl font-semibold text-paper-900 mb-2">{it.title}</h3>
              <p className="text-paper-700 leading-relaxed">{it.text}</p>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={400} className="mt-16 text-center max-w-2xl mx-auto text-lg text-paper-700">
        {t('problem.footer')}
      </FadeIn>
    </Section>
  );
}
