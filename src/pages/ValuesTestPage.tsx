import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/assistants/Breadcrumbs';
import JsonLd from '../components/assistants/JsonLd';
import ValuesTest from '../components/values/ValuesTest';
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from '../content/assistants/jsonLd';
import { homePath } from '../lib/assistantRoute';
import { valuesTestPath } from '../lib/valuesRoute';
import { VALUE_KEYS } from '../lib/schwartz';
import type { ValuesTexts } from '../content/values/types';

interface Props {
  texts: ValuesTexts;
  language: string;
}

/**
 * Тест ценностей — вход из поиска. В пререндере: вступление, карточка
 * старта, десять ценностей и вопросы; тест оживает в браузере. FadeIn нет
 * сознательно: в пререндере он отдаёт opacity-0. Без LanguageBanner: тест
 * пока только по-русски, как калькулятор.
 *
 * Вебвизор и карта кликов Метрики на этой странице выключены — подстановкой
 * в scripts/prerender.mjs; VK-пиксель (Top.Mail.Ru) здесь не загружается —
 * см. src/main.tsx.
 */
export default function ValuesTestPage({ texts, language }: Props) {
  const { t } = useTranslation();
  const home = homePath(language);
  const crumbs: Crumb[] = [
    { name: t('assistantPages.home'), path: home },
    { name: texts.breadcrumb, path: valuesTestPath(language) },
  ];

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
            {/* Над тестом — только первый абзац: человек из поиска сразу видит,
                где начать. Остальное вступление — ниже; поисковик видит его целиком. */}
            <p className="mt-5 max-w-2xl text-lg text-paper-800 leading-relaxed">{texts.intro[0]}</p>
          </div>
        </section>

        <section aria-label={texts.breadcrumb} className="max-w-4xl mx-auto px-6 py-10 md:py-12">
          <ValuesTest texts={texts} />
        </section>

        {texts.intro.length > 1 && (
          <section data-testid="values-about" className="max-w-4xl mx-auto px-6 pb-10 md:pb-12">
            <div className="space-y-4 max-w-2xl">
              {texts.intro.slice(1).map((p) => (
                <p key={p} className="text-lg text-paper-800 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        <section
          aria-labelledby="values-model-heading"
          data-testid="values-model"
          className="bg-paper-100 border-y border-paper-300"
        >
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <h2 id="values-model-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
              {texts.modelSection.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-paper-800 leading-relaxed">{texts.modelSection.lead}</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {VALUE_KEYS.map((k) => (
                <li key={k} className="rounded-xl border border-paper-300 bg-paper-50 p-4">
                  <p className="font-semibold text-paper-900">{texts.values[k].name}</p>
                  <p className="mt-1 text-sm text-paper-700">{texts.values[k].line}</p>
                  <p className="mt-2 text-paper-800 leading-relaxed">{texts.values[k].text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="values-faq-heading" data-testid="values-faq" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 id="values-faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {texts.faqHeading}
          </h2>
          <div className="mt-4">
            {texts.faq.map((f) => (
              <details key={f.q} className="group border-b border-paper-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 min-h-[60px]">
                  <span className="text-paper-900 font-semibold pr-4">{f.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="w-5 h-5 text-paper-600 group-open:rotate-180 transition-transform flex-shrink-0"
                  />
                </summary>
                <p className="pb-5 text-paper-800 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-12 text-xs text-paper-600">
          <p>{texts.disclaimer}</p>
        </section>
      </main>

      <Footer homeHref={home} />
    </div>
  );
}
