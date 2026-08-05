import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { languageFromPath, pathForLanguage } from '../../i18n/urlLanguage';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const current = typeof window !== 'undefined'
    ? languageFromPath(window.location.pathname)
    : i18n.language;
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === current) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Ссылка, а не changeLanguage: языковая версия должна быть отдельным URL,
  // которым можно поделиться и который проиндексируется.
  const hrefFor = (code: string) =>
    typeof window === 'undefined'
      ? pathForLanguage(code, '/')
      : pathForLanguage(code, window.location.pathname, window.location.search, window.location.hash);

  return (
    <div className="relative" ref={boxRef} data-testid="lang-switcher">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={currentLang.nativeName}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-3 min-h-[40px] rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        <Globe aria-hidden="true" className="w-4 h-4" />
        <span className="uppercase">{currentLang.code}</span>
        <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === current}>
              <a
                href={hrefFor(lang.code)}
                hrefLang={lang.code}
                data-testid={`lang-option-${lang.code}`}
                className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                  lang.code === current ? 'font-semibold text-gray-900' : 'text-gray-700'
                }`}
              >
                <span aria-hidden="true">{lang.flag}</span>
                <span className="flex-1">{lang.nativeName}</span>
                {lang.code === current && <Check aria-hidden="true" className="w-4 h-4 text-brand-700" />}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
