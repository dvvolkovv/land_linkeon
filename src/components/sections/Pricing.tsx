import { useTranslation } from 'react-i18next';
import { Coins, Lock, Mail, Gift } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';

interface Pkg {
  id: 'starter' | 'extended' | 'professional';
  tokens: number;
  price: number;
  savings?: string;
  popular?: boolean;
}

const PACKAGES: Pkg[] = [
  { id: 'starter', tokens: 50000, price: 149 },
  { id: 'extended', tokens: 200000, price: 499, savings: '15%', popular: true },
  { id: 'professional', tokens: 1000000, price: 1990, savings: '30%' },
];

const TOKENS_URL = 'https://my.linkeon.io/tokens';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const fmt = (n: number) => n.toLocaleString(i18n.language.startsWith('en') ? 'en-US' : 'ru-RU');

  return (
    <Section id="pricing" ariaLabelledby="pricing-heading" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('pricing.eyebrow')}</Eyebrow>
        <h2 id="pricing-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
          {t('pricing.h2')}
        </h2>
        <p className="text-lg text-slate-600">{t('pricing.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
        {PACKAGES.map((p, i) => {
          const perThousand = (p.price / (p.tokens / 1000)).toFixed(2);
          const msgs = Math.floor(p.tokens / 3500);
          return (
            <FadeIn key={p.id} delay={i * 100}>
              <div className={`relative h-full flex flex-col rounded-2xl p-6 ${p.popular ? 'border-2 border-indigo-600 shadow-lg shadow-indigo-500/10 lg:scale-105 bg-white' : 'border border-slate-200 bg-white'}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-4 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {t('pricing.popular')}
                  </span>
                )}
                {p.savings && (
                  <span className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {t('pricing.savings', { value: p.savings })}
                  </span>
                )}

                <h3 className="text-xl font-semibold text-slate-900 mb-2">{t(`pricing.plans.${p.id}`)}</h3>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <Coins aria-hidden="true" className="w-5 h-5 text-indigo-600" />
                  <span className="text-2xl font-bold text-slate-900">{fmt(p.tokens)}</span>
                  <span className="text-sm text-slate-500">{t('pricing.tokens')}</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">≈ {msgs} {t('pricing.messages')}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-slate-900">{p.price}</span>
                  <span className="text-xl text-slate-600 ml-1">₽</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">≈ {perThousand} ₽ {t('pricing.per1000')}</p>
                <div className="mt-auto">
                  <Button
                    variant={p.popular ? 'primary' : 'outline'}
                    size="lg"
                    href={TOKENS_URL}
                    dataCta={`pricing-${p.id}`}
                    className="w-full"
                  >
                    {t('pricing.cta')}
                  </Button>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={400} className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-slate-500">
        <span className="flex items-center gap-1.5"><Lock aria-hidden="true" className="w-4 h-4" /> {t('pricing.trust.yookassa')}</span>
        <span className="flex items-center gap-1.5"><Mail aria-hidden="true" className="w-4 h-4" /> {t('pricing.trust.email')}</span>
        <span className="flex items-center gap-1.5"><Gift aria-hidden="true" className="w-4 h-4" /> {t('pricing.trust.gift')}</span>
      </FadeIn>
    </Section>
  );
}
