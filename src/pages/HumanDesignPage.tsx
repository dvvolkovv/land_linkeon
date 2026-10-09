import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/assistants/Breadcrumbs';
import JsonLd from '../components/assistants/JsonLd';
import HdForm, { type HdResultData } from '../components/hd/HdForm';
import HdResult from '../components/hd/HdResult';
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from '../content/assistants/jsonLd';
import { homePath } from '../lib/assistantRoute';
import { hdCalcPath } from '../lib/hdRoute';
import { HD_TYPES } from '../lib/human-design';
import type { HdTexts } from '../content/hd/types';

interface Props {
  texts: HdTexts;
  language: string;
}

/**
 * Калькулятор Human Design — вход из поиска. В пререндере: вводный текст,
 * пустая форма, пять типов и вопросы; форма и расчёт оживают в браузере.
 * FadeIn нет сознательно: в пререндере он отдаёт opacity-0.
 *
 * Без LanguageBanner сознательно: калькулятор пока только по-русски, а
 * баннер предложил бы чужую (не русскую) главную.
 */
export default function HumanDesignPage({ texts, language }: Props) {
  const { t } = useTranslation();
  const home = homePath(language);
  const [result, setResult] = useState<HdResultData | null>(null);
  const crumbs: Crumb[] = [
    { name: t('assistantPages.home'), path: home },
    { name: texts.breadcrumb, path: hdCalcPath(language) },
  ];

  useEffect(() => {
    if (!result) return;
    // Скролла одного недостаточно: без программного фокуса скринридер не
    // объявляет появление результата, а Tab после кнопки «Рассчитать» ведёт
    // мимо него. tabIndex={-1} у заголовка — в HdResult.
    document.getElementById('hd-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('hd-result-heading')?.focus({ preventScroll: true });
  }, [result]);

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Header homeHref={home} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(texts.faq)]} />

      <main className="flex-1">
        <section className="bg-paper-100 border-b border-paper-300 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-paper-900 text-balance break-words hyphens-auto">
              {texts.h1}
            </h1>
            <div className="mt-5 space-y-4 max-w-2xl">
              {texts.intro.map((p) => (
                <p key={p} className="text-lg text-paper-800 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="hd-form-heading" className="max-w-4xl mx-auto px-6 py-10 md:py-12">
          <h2 id="hd-form-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {texts.form.heading}
          </h2>
          <div className="mt-6 max-w-2xl">
            <HdForm texts={texts} onResult={setResult} />
          </div>
        </section>

        {result && <HdResult texts={texts} result={result} />}

        <section aria-labelledby="hd-types-heading" data-testid="hd-types" className="bg-paper-100 border-y border-paper-300">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <h2 id="hd-types-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
              {texts.typesSection.heading}
            </h2>
            <p className="mt-3 text-paper-800 leading-relaxed max-w-2xl">{texts.typesSection.lead}</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {HD_TYPES.map((type) => (
                <li key={type} className="rounded-xl border border-paper-300 bg-paper-50 p-4">
                  <p className="font-semibold text-paper-900">{texts.types[type].name}</p>
                  <p className="mt-1 text-sm text-paper-700">{texts.types[type].strategy}</p>
                  <p className="mt-2 text-paper-800 leading-relaxed">{texts.types[type].text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="hd-faq-heading" data-testid="hd-faq" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 id="hd-faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {texts.faqHeading}
          </h2>
          <div className="mt-4">
            {texts.faq.map((f) => (
              <details key={f.q} className="group border-b border-paper-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 min-h-[60px]">
                  <span className="text-paper-900 font-semibold pr-4">{f.q}</span>
                  <ChevronDown aria-hidden="true" className="w-5 h-5 text-paper-600 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="pb-5 text-paper-800 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-12 space-y-2 text-xs text-paper-600">
          <p>{texts.disclaimer}</p>
          <p data-testid="hd-credits">
            {texts.credits}{' '}
            <a href="https://www.geonames.org/" className="underline hover:text-paper-900" rel="noopener noreferrer" target="_blank">
              GeoNames
            </a>
            ,{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="underline hover:text-paper-900"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC BY 4.0
            </a>
            .{' '}
            <a href="/licenses.txt" className="underline hover:text-paper-900">
              {texts.licenses}
            </a>
          </p>
        </section>
      </main>

      <Footer homeHref={home} />
    </div>
  );
}
