import { SITE } from '../../../scripts/site-urls.mjs';

export interface Crumb {
  name: string;
  /** Путь от корня сайта: '/', '/assistants/', '/en/assistants/raya/'. */
  path: string;
}

/** Хлебные крошки для поисковика: абсолютные адреса, позиции с единицы. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}

/** Блок вопросов страницы как FAQPage — тот же текст, что видит человек. */
export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
