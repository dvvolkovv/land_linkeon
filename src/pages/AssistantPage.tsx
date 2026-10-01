import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, ChevronDown, Minus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import AssistantAvatar from '../components/assistants/AssistantAvatar';
import AssistantCard from '../components/assistants/AssistantCard';
import Breadcrumbs from '../components/assistants/Breadcrumbs';
import JsonLd from '../components/assistants/JsonLd';
import LanguageBanner from '../components/ui/LanguageBanner';
import { appUrl } from '../lib/appUrl';
import { assistantPath, assistantsCatalogPath, homePath } from '../lib/assistantRoute';
import { assistantBySlug, assistantName, type AssistantEntry } from '../content/assistants/roster';
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from '../content/assistants/jsonLd';
import type { AssistantPagesPack } from '../content/assistants/types';

// Строка ответа, начинающаяся с маркера списка: «— », «- », «• », «1. », «1) ».
// Такой строке нужен висячий отступ, иначе на телефоне перенос длинного пункта
// уходит под маркер и список сливается в сплошной текст.
const LIST_ITEM = /^(—|-|•|\d+[.)])\s/;

interface Props {
  entry: AssistantEntry;
  /** Тексты всех ассистентов на языке страницы: свой текст и строки соседей. */
  pack: AssistantPagesPack;
  language: string;
}

/**
 * Страница одного ассистента — вход из поиска.
 *
 * FadeIn здесь нет сознательно: в пререндере он отдаёт opacity-0, а эта
 * страница существует ради сырого HTML, который читает краулер.
 */
export default function AssistantPage({ entry, pack, language }: Props) {
  const { t } = useTranslation();
  const page = pack[entry.slug];
  const name = assistantName(entry, language);
  const home = homePath(language);
  const catalog = assistantsCatalogPath(language);
  // utm_content дописывается, только если у посетителя нет своей метки (так
  // устроен extra в appUrl): реклама остаётся атрибутированной рекламе.
  const chatHref = appUrl('/chat', { assistant: String(entry.id), utm_content: `assistant-${entry.slug}` });
  const related = entry.related
    .map((slug) => assistantBySlug(slug))
    .filter((r): r is AssistantEntry => Boolean(r));
  const paragraphs = page.example.answer.split(/\n{2,}/);
  // Одни и те же пункты — в видимых крошках и в BreadcrumbList.
  const crumbs: Crumb[] = [
    { name: t('assistantPages.home'), path: home },
    { name: t('assistantPages.nav'), path: catalog },
    { name, path: assistantPath(language, entry.slug) },
  ];

  const cta = (
    <Button href={chatHref} size="lg" dataCta="assistant-start">
      {page.cta} <ArrowRight aria-hidden="true" className="w-4 h-4" />
    </Button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Header homeHref={home} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(page.faq)]} />

      {/* Отступ под фиксированную шапку — у первой секции, а не у <main>: шапка
          прозрачна, пока страницу не прокрутили, и фон первого экрана должен
          уходить под неё, а не оставлять полосу другого оттенка (как Hero главной). */}
      <main className="flex-1">
        <section className="bg-paper-100 border-b border-paper-300 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <Breadcrumbs items={crumbs} />
            <div className="flex items-center gap-5">
              <AssistantAvatar slug={entry.slug} size="lg" />
              <p className="text-sm font-semibold text-brand-800">{t(`assistantPages.roles.${entry.slug}`)}</p>
            </div>
            {/* hyphens-auto переносит по правилам <html lang>, его ставит пререндер;
                break-words — страховка, если слово длиннее строки всё равно. */}
            <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight text-paper-900 text-balance break-words hyphens-auto">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg text-paper-800 max-w-2xl leading-relaxed">{page.lead}</p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              {cta}
              <span className="text-sm text-paper-600">{t('assistantPages.page.trust')}</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="situations-heading" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 id="situations-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {t('assistantPages.page.situations')}
          </h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-3">
            {page.situations.map((s) => (
              <li key={s} className="p-4 rounded-xl border border-paper-300 bg-paper-50 text-paper-800 leading-relaxed">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="example-heading" className="bg-paper-100 border-y border-paper-300">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <h2 id="example-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
              {t('assistantPages.page.example')}
            </h2>
            <div className="mt-6 space-y-4">
              {/* На телефоне пузырь вопроса не во всю ширину — иначе пропадает вид чата. */}
              <div className="ml-auto max-w-[85%] sm:max-w-xl rounded-2xl rounded-br-md bg-brand-800 text-white p-4">
                {/* brand-100 на brand-800 — 5.08:1; прежний белый с opacity-80 давал 4.13 при норме 4.5 для 12px. */}
                <p className="text-xs font-semibold text-brand-100 mb-1">{t('assistantPages.page.exampleYou')}</p>
                <p className="leading-relaxed">{page.example.question}</p>
              </div>
              <div className="max-w-2xl rounded-2xl rounded-bl-md bg-paper-50 border border-paper-300 p-4">
                <p className="text-xs font-semibold text-brand-800 mb-1">{name}</p>
                <div className="space-y-3">
                  {/* Строка абзаца — свой блок, пункт списка — с висячим отступом.
                      Текст строк выводится как есть; ключ — индекс: список статичен.
                      Картинка (если Кира её присылала) — сразу после первого абзаца,
                      там же, где она пришла в чате. */}
                  {paragraphs.flatMap((p, i) => {
                    const paragraph = (
                      <p key={`p-${i}`} className="text-paper-800 leading-relaxed">
                        {p.split('\n').map((line, j) => (
                          <span key={j} className={LIST_ITEM.test(line) ? 'block pl-5 -indent-5' : 'block'}>
                            {line}
                          </span>
                        ))}
                      </p>
                    );
                    if (i !== 0 || !page.example.image) return [paragraph];
                    const { image } = page.example;
                    return [
                      paragraph,
                      <img
                        key="example-image"
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full max-w-xs h-auto rounded-xl border border-paper-300"
                      />,
                    ];
                  })}
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-paper-600">{t('assistantPages.page.exampleNote')}</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper-900">{t('assistantPages.page.can')}</h2>
            <ul className="mt-5 space-y-3">
              {page.can.map((c) => (
                <li key={c} className="flex gap-3 text-paper-800 leading-relaxed">
                  <Check aria-hidden="true" className="w-5 h-5 mt-0.5 text-brand-700 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper-900">{t('assistantPages.page.cannot')}</h2>
            <ul className="mt-5 space-y-3">
              {page.cannot.map((c) => (
                <li key={c} className="flex gap-3 text-paper-800 leading-relaxed">
                  <Minus aria-hidden="true" className="w-5 h-5 mt-0.5 text-paper-600 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-heading" data-testid="assistant-faq" className="max-w-4xl mx-auto px-6 pb-12 md:pb-16">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {t('assistantPages.page.faq')}
          </h2>
          <div className="mt-4">
            {page.faq.map((f) => (
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

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="bg-paper-100 border-t border-paper-300">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-paper-900">
                {t('assistantPages.page.related')}
              </h2>
              <ul className="mt-6 grid md:grid-cols-3 gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <AssistantCard entry={r} language={language} line={pack[r.slug].card} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {t('assistantPages.page.finalTitle')}
          </h2>
          <div className="mt-6 flex flex-col items-center gap-3">
            {cta}
            <span className="text-sm text-paper-600">{t('assistantPages.page.trust')}</span>
          </div>
        </section>
      </main>

      <Footer homeHref={home} />
      {/* Как на главной: сюда приходят из поиска, и англоязычному посетителю на
          русской странице нужно то же предложение сменить язык. Ссылка ведёт на
          эту же страницу на его языке (pathForLanguage). В пререндере пусто —
          предложение считается в эффекте, по языку браузера. */}
      <LanguageBanner />
    </div>
  );
}
