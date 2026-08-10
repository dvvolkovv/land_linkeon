import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

import Footer from '../components/layout/Footer';
import type { LegalType } from '../components/layout/LegalModal';
import * as legalRu from '../content/legal/ru';
import * as legalEn from '../content/legal/en';
import { DEFAULT_LANGUAGE } from '../i18n/languages';

/**
 * Юридический документ отдельной страницей с собственным адресом.
 *
 * Существует ради того, чтобы на документ можно было СОСЛАТЬСЯ: из
 * веб-кабинета, из мобильного приложения, из Play Console, из письма. Пока
 * документы были только модалкой по хешу, каждому потребителю приходилось
 * везти свою копию текста — так и разошлись три редакции одной оферты.
 *
 * Текст берётся из того же модуля, что и модалка на лендинге: две точки
 * показа, один источник.
 */
export default function LegalPage({ doc }: { doc: LegalType }) {
  const { i18n } = useTranslation();
  // Русская редакция — единственная, имеющая юридическую силу. Для всех
  // остальных языков показываем английский перевод.
  const pack = i18n.language === DEFAULT_LANGUAGE ? legalRu : legalEn;
  const home = i18n.language === DEFAULT_LANGUAGE ? '/' : `/${i18n.language}/`;
  const back = i18n.language === DEFAULT_LANGUAGE ? 'На главную' : 'Back to home';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 mx-auto w-full max-w-3xl px-5 py-10">
        <a
          href={home}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          {back}
        </a>

        {/* h1, а не h3: это самостоятельная страница, и без заголовка первого
            уровня пререндер справедливо считает её пустой. */}
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          {pack.titles[doc]}
        </h1>

        <div className="mt-6 text-[15px] leading-relaxed text-gray-700 space-y-4">
          {pack.renderLegal(doc)}
        </div>
      </main>

      <Footer />
    </div>
  );
}
