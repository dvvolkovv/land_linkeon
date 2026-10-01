import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AssistantCard from '../components/assistants/AssistantCard';
import Breadcrumbs from '../components/assistants/Breadcrumbs';
import JsonLd from '../components/assistants/JsonLd';
import LanguageBanner from '../components/ui/LanguageBanner';
import { assistantsCatalogPath, homePath } from '../lib/assistantRoute';
import { ASSISTANTS, type AssistantCategory } from '../content/assistants/roster';
import { breadcrumbJsonLd, type Crumb } from '../content/assistants/jsonLd';
import type { AssistantPagesPack } from '../content/assistants/types';

// Роман первым и отдельно: он универсал и берётся за задачи любого профиля — с него проще начать.
const GROUPS: AssistantCategory[] = ['assistant', 'business', 'personal'];

export default function AssistantsCatalogPage({ pack, language }: { pack: AssistantPagesPack; language: string }) {
  const { t } = useTranslation();
  const home = homePath(language);
  // Одни и те же пункты — в видимых крошках и в BreadcrumbList.
  const crumbs: Crumb[] = [
    { name: t('assistantPages.home'), path: home },
    { name: t('assistantPages.nav'), path: assistantsCatalogPath(language) },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Header homeHref={home} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      {/* Отступ под фиксированную шапку — у первой секции, как на странице ассистента. */}
      <main className="flex-1">
        <section className="bg-paper-100 border-b border-paper-300 pt-16">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <Breadcrumbs items={crumbs} />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-paper-900 text-balance break-words hyphens-auto">
              {t('assistantPages.catalog.h1')}
            </h1>
            <p className="mt-5 text-lg text-paper-800 max-w-2xl leading-relaxed">{t('assistantPages.catalog.lead')}</p>
          </div>
        </section>

        {GROUPS.map((group) => (
          <section key={group} aria-labelledby={`group-${group}`} className="max-w-6xl mx-auto px-6 py-10">
            <h2 id={`group-${group}`} className="text-2xl font-semibold tracking-tight text-paper-900">
              {t(`assistantPages.catalog.groups.${group}`)}
            </h2>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ASSISTANTS.filter((a) => a.category === group).map((a) => (
                <li key={a.slug}>
                  <AssistantCard entry={a} language={language} line={pack[a.slug].card} />
                </li>
              ))}
            </ul>
          </section>
        ))}
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
