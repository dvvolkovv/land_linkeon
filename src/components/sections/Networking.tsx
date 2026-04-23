import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import ValueGraph from './ValueGraph';

const SEARCH_URL = 'https://my.linkeon.io/search';

export default function Networking() {
  const { t } = useTranslation();
  const cols = t('networking.cols', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Section id="networking" ariaLabelledby="networking-heading" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('networking.eyebrow')}</Eyebrow>
        <h2 id="networking-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
          {t('networking.h2')}
        </h2>
        <p className="text-lg text-slate-600">{t('networking.sub')}</p>
      </FadeIn>

      <FadeIn delay={160}>
        <ValueGraph />
      </FadeIn>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-600" aria-hidden="true" /> {t('networking.legend.self')}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" /> {t('networking.legend.values')}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" /> {t('networking.legend.matches')}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {cols.map((c, i) => (
          <FadeIn key={c.title} delay={i * 100}>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{c.title}</h3>
            <p className="text-slate-600">{c.text}</p>
          </FadeIn>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href={SEARCH_URL} data-cta="networking-link" className="inline-flex items-center gap-1 py-2 min-h-11 text-indigo-600 hover:text-indigo-700 font-semibold text-sm" target="_blank" rel="noopener noreferrer">
          {t('networking.cta')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}
