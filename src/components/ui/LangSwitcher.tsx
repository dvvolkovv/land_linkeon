import { useTranslation } from 'react-i18next';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('en') ? 'en' : 'ru';

  const setLang = (lng: 'ru' | 'en') => {
    if (lng !== current) void i18n.changeLanguage(lng);
  };

  const base = 'px-2.5 py-1 text-xs font-semibold rounded-md transition-colors';
  const active = 'bg-indigo-600 text-white';
  const inactive = 'text-slate-500 hover:text-slate-900';

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5"
      data-testid="lang-switcher"
    >
      <button
        type="button"
        aria-pressed={current === 'ru'}
        aria-label="Русский"
        onClick={() => setLang('ru')}
        className={`${base} ${current === 'ru' ? active : inactive}`}
      >
        RU
      </button>
      <button
        type="button"
        aria-pressed={current === 'en'}
        aria-label="English"
        onClick={() => setLang('en')}
        className={`${base} ${current === 'en' ? active : inactive}`}
      >
        EN
      </button>
    </div>
  );
}
