import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { resolveLanguage, type LanguageDef } from '../../i18n/languages';
import { TRANSLATED_LANGUAGES } from '../../i18n/translatedLanguages';
import { languageFromPath, pathForLanguage } from '../../i18n/urlLanguage';

const DISMISS_KEY = 'll_lang_banner_dismissed';

/**
 * Предлагает перейти на язык браузера, но НЕ редиректит: автоматический
 * редирект по Accept-Language уводит краулер с канонического корня и мешает
 * тем, кто пришёл на конкретную языковую версию осознанно.
 *
 * Ничего не импортирует из ./i18n: тот модуль читает window на уровне
 * модуля и в графе рендера на сборке оказаться не должен. Подпись —
 * самоназвание языка, перевод для неё не нужен.
 */
export default function LanguageBanner() {
  const [offer, setOffer] = useState<{ lang: LanguageDef; href: string } | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return; // приватный режим — не навязываемся
    }
    const current = languageFromPath(window.location.pathname);
    const preferred = resolveLanguage(navigator.language);
    if (preferred === current) return;
    // Только выпущенные языки: предложить испанцу /es/, где лежит русский
    // текст, — хуже, чем не предлагать ничего.
    const lang = TRANSLATED_LANGUAGES.find((l) => l.code === preferred);
    if (!lang) return;
    setOffer({
      lang,
      href: pathForLanguage(preferred, window.location.pathname, window.location.search, window.location.hash),
    });
  }, []);

  if (!offer) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* не смогли запомнить — скроем хотя бы на эту сессию */
    }
    setOffer(null);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-lg">
      <a
        href={offer.href}
        hrefLang={offer.lang.code}
        data-testid="lang-banner-link"
        className="flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-900"
      >
        <span aria-hidden="true">{offer.lang.flag}</span>
        {offer.lang.nativeName}
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
