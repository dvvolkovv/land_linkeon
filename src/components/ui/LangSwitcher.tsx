import { useTranslation } from 'react-i18next';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('en') ? 'en' : 'ru';

  const setLang = (lng: 'ru' | 'en') => {
    if (lng !== current) i18n.changeLanguage(lng);
  };

  const base = 'px-2.5 py-1 text-xs font-semibold rounded-md transition-colors';
  const active = 'bg-indigo-600 text-white';
  const inactive = 'text-slate-500 hover:text-slate-900';

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5" data-testid="lang-switcher">
      <button type="button" onClick={() => setLang('ru')} className={`${base} ${current === 'ru' ? active : inactive}`}>RU</button>
      <button type="button" onClick={() => setLang('en')} className={`${base} ${current === 'en' ? active : inactive}`}>EN</button>
    </div>
  );
}
