import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, Lock, Mail, Gift } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';
import { formattingLocale } from '../../i18n/languages';

interface Pkg {
  id: 'starter' | 'extended' | 'professional' | 'business' | 'maximum';
  tokens: number;
  price: number;
  savings?: string;
  popular?: boolean;
}

/**
 * Прайс продублирован из приложения (spirits_front, src/config/tokenPackages.ts):
 * лендинг — отдельный репозиторий, общего модуля у них нет. При изменении цен
 * править оба места, иначе витрина обещает не то, что покажет касса.
 *
 * Проценты экономии — ярлыки, округлённые вниз до пятёрки, как и в приложении.
 */
const PACKAGES: Pkg[] = [
  { id: 'starter', tokens: 50000, price: 149 },
  { id: 'extended', tokens: 200000, price: 499, savings: '15%' },
  { id: 'professional', tokens: 1000000, price: 1990, savings: '30%', popular: true },
  { id: 'business', tokens: 3000000, price: 4990, savings: '40%' },
  { id: 'maximum', tokens: 7000000, price: 9990, savings: '50%' },
];

/** Ответ /webhook/payments/methods — та же ручка, что у витрины в приложении. */
interface PaymentMethod {
  provider: 'yookassa' | 'priem';
  currency: 'RUB' | 'USD';
  packages: { id: string; tokens: number; usd: number }[];
}

/**
 * id валютного пакета → ключ названия в pricing.plans. Совпадает с картой
 * CRYPTO_NAME_KEY в приложении: пакеты приходят с бэкенда, фронт знает только,
 * как их подписать.
 */
const USD_PLAN_KEY: Record<string, Pkg['id']> = {
  pro_usd: 'professional',
  business_usd: 'business',
  maximum_usd: 'maximum',
  max_usd: 'maximum',
};


export default function Pricing() {
  const { t, i18n } = useTranslation();
  // Через formattingLocale, а не по голому i18n.language: в CLDR базовый `pt` —
  // это бразильские соглашения, и «50 000» на европейской странице
  // превращалось в «50.000». Регион берётся из реестра языков.
  const fmt = (n: number) => n.toLocaleString(formattingLocale(i18n.language));

  // Способ оплаты решает бэкенд по языку — ровно как в приложении: ru →
  // YooKassa в рублях, остальные → «Приём» в долларах. Рублёвый прайс лежит
  // здесь (бэкенд его не отдаёт), долларовый приезжает с той же ручки, что
  // питает витрину приложения, — чтобы цены не разъезжались.
  const isRu = (i18n.language || 'ru').toLowerCase().startsWith('ru');
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (isRu) return;
    let alive = true;
    fetch(`https://my.linkeon.io/webhook/payments/methods?lang=${encodeURIComponent(i18n.language || 'en')}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive) { if (d?.provider) setMethod(d); else setFailed(true); } })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, [i18n.language, isRu]);

  const usdPackages: Pkg[] | null =
    !isRu && method?.provider === 'priem' && method.packages.length > 0
      ? method.packages.map((p) => ({
          id: USD_PLAN_KEY[p.id] ?? 'professional',
          tokens: p.tokens,
          price: p.usd,
        }))
      : null;

  const isUsd = usdPackages !== null;
  const packages = usdPackages ?? PACKAGES;

  // Пока ответ не пришёл, на нерусской странице показывать рублёвые карточки
  // нельзя — иностранец увидел бы цену, по которой не сможет заплатить.
  // Если ручка не ответила совсем (failed), падаем на рублёвый прайс: он хотя
  // бы даёт порядок цен, а пустая секция не даёт ничего.
  const pending = !isRu && !isUsd && !failed;

  /**
   * Пять карточек в ряд — только с xl (1280px). На md их три, два старших
   * тарифа уходят во второй ряд. В пятиколоночном режиме кегли уменьшаются, а
   * не растут: колонка там уже, чем в трёх колонках на md, и «Профессиональный»
   * в text-xl не влезал в карточку. У валютной витрины пакетов три — ей
   * пятиколоночный режим не нужен.
   */
  const fiveUp = packages.length > 3;

  // Принимает строку, а не число: перевод в Number срезал бы конечные нули и
  // «≈ 2.50 ₽ за 1000» стало бы «≈ 2.5 ₽».
  const money = (value: string) => (isUsd ? `$${value}` : `${value} ₽`);

  return (
    <Section id="pricing" ariaLabelledby="pricing-heading" className="bg-white border-y border-gray-200">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('pricing.eyebrow')}</Eyebrow>
        <h2 id="pricing-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4 text-balance">
          {t('pricing.h2')}
        </h2>
        <p className="text-lg text-gray-600">{t('pricing.sub')}</p>
      </FadeIn>

      <div className={`grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto ${
        fiveUp ? 'xl:grid-cols-5 xl:max-w-7xl' : ''
      }`}>
        {pending ? [0, 1, 2].map((i) => (
          // Заглушка на время ответа бэкенда: валютных пакетов три.
          <div key={i} aria-hidden="true" className="h-full rounded-2xl border border-gray-200 bg-white p-6 animate-pulse">
            <div className="h-5 w-24 bg-gray-200 rounded mb-4" />
            <div className="h-7 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-100 rounded mb-6" />
            <div className="h-12 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-28 bg-gray-100 rounded mb-6" />
            <div className="h-11 w-full bg-gray-200 rounded-lg" />
          </div>
        )) : packages.map((p, i) => {
          // У доллара три знака: цена тысячи токенов там порядка $0.025, и с
          // двумя знаками все пакеты показывали бы одинаковые «0.03».
          const perThousand = (p.price / (p.tokens / 1000)).toFixed(isUsd ? 3 : 2);
          const msgs = Math.floor(p.tokens / 3500);
          return (
            <FadeIn key={p.id} delay={i * 100}>
              {/* min-w-0 обязателен: без него длинное слово («Профессиональный»,
                  «Professionell») задаёт колонке минимальную ширину по себе и
                  распирает трек грида, вместо того чтобы ужаться в карточке. */}
              <div className={`relative h-full flex flex-col rounded-2xl p-6 min-w-0 ${fiveUp ? 'xl:p-5' : ''} ${p.popular ? 'border-2 border-brand-700 shadow-lg shadow-brand-600/10 lg:scale-105 bg-white' : 'border border-gray-200 bg-white'}`}>
                {/*
                  Бейджи говорят о разном («этот тариф берут чаще» против «здесь
                  дешевле тысяча токенов») и на популярной карточке висят рядом,
                  поэтому различаются заливкой, а не второй краской: «Популярный» —
                  сплошной brand-800 с белым текстом (5.5:1), «Экономия» — светлая
                  подложка brand-100 с текстом brand-900 (8.8:1). Подложка сама по
                  себе почти неотличима от белой карточки (1.08:1), поэтому границу
                  пилюли держит обводка brand-700 (3.74:1 к белому — планка WCAG для
                  нетекстовых границ).
                */}
                {p.popular && (
                  <span className="absolute -top-3 left-4 bg-brand-800 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {t('pricing.popular')}
                  </span>
                )}
                {p.savings && (
                  <span className="absolute -top-3 right-4 bg-brand-100 text-brand-900 ring-1 ring-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {t('pricing.savings', { value: p.savings })}
                  </span>
                )}

                <h3 className={`text-xl font-semibold text-gray-900 mb-2 leading-tight ${fiveUp ? 'xl:text-sm' : ''}`}>{t(`pricing.plans.${p.id}`)}</h3>
                {/* flex-wrap: «7 000 000» и слово «токенов» в одну строку узкой
                    колонки не помещаются — пусть переносятся, а не вылезают. */}
                <div className="flex items-baseline flex-wrap gap-1.5 mb-1">
                  <Coins aria-hidden="true" className="w-5 h-5 shrink-0 text-brand-700" />
                  <span className={`text-2xl font-bold text-gray-900 ${fiveUp ? 'xl:text-xl' : ''}`}>{fmt(p.tokens)}</span>
                  <span className="text-sm text-gray-500">{t('pricing.tokens')}</span>
                </div>
                <p className="text-xs text-gray-400 mb-6">≈ {msgs} {t('pricing.messages')}</p>
                {/* Знак валюты с той же стороны, что и в приложении: доллар
                    перед числом, рубль после. */}
                <div className="mb-2">
                  {isUsd && <span className="text-xl text-gray-600 mr-1">$</span>}
                  <span className={`text-5xl font-bold text-gray-900 ${fiveUp ? 'xl:text-4xl' : ''}`}>{p.price}</span>
                  {!isUsd && <span className="text-xl text-gray-600 ml-1">₽</span>}
                </div>
                <p className="text-xs text-gray-500 mb-6">≈ {money(perThousand)} {t('pricing.per1000')}</p>
                <div className="mt-auto">
                  <Button
                    variant={p.popular ? 'primary' : 'outline'}
                    size="lg"
                    href={appUrl('/tokens')}
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

      {/* Плашки под витриной обещают конкретику про кассу, поэтому зависят от
          валюты: у долларового пути платёж идёт через «Приём» (карта или
          криптовалюта), а фискального чека по 54-ФЗ там нет — обещать его
          иностранцу нельзя. */}
      <FadeIn delay={400} className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-gray-500">
        <span className="flex items-center gap-1.5"><Lock aria-hidden="true" className="w-4 h-4" /> {t(isUsd ? 'pricing.trust.priem' : 'pricing.trust.yookassa')}</span>
        {!isUsd && (
          <span className="flex items-center gap-1.5"><Mail aria-hidden="true" className="w-4 h-4" /> {t('pricing.trust.email')}</span>
        )}
        <span className="flex items-center gap-1.5"><Gift aria-hidden="true" className="w-4 h-4" /> {t('pricing.trust.gift')}</span>
      </FadeIn>
    </Section>
  );
}
