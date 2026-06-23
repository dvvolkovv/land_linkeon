import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Card from '../ui/Card';
import FadeIn from '../ui/FadeIn';

// Реальные отзывы пользователей. Атрибуция — по роли (без имён/данных клиентов,
// по этическим правилам). Меняются только через реальные новые отзывы.
export default function Testimonials() {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as { quote: string; author: string }[];

  return (
    <Section ariaLabelledby="testimonials-heading">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('testimonials.eyebrow')}</Eyebrow>
        <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('testimonials.h2')}
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6">
        {(Array.isArray(items) ? items : []).map((it, i) => (
          <FadeIn key={i} delay={i * 100}>
            <Card className="p-6 h-full flex flex-col">
              <Quote aria-hidden="true" className="w-8 h-8 text-indigo-200 mb-4" />
              <p className="text-slate-700 mb-5 flex-1 leading-relaxed">«{it.quote}»</p>
              <p className="text-sm font-medium text-slate-500">{it.author}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
