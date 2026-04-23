import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import LangSwitcher from '../ui/LangSwitcher';

const LINKS = [
  { href: '#features', key: 'header.nav.features' },
  { href: '#how', key: 'header.nav.how' },
  { href: '#pricing', key: 'header.nav.pricing' },
  { href: '#faq', key: 'header.nav.faq' },
] as const;

const LOGIN_URL = 'https://my.linkeon.io';

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight text-slate-900" aria-label="LINKEON.IO">
          <span>LINKEON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          <Button variant="ghost" size="md" href={LOGIN_URL} dataCta="header-login">{t('header.cta.login')}</Button>
          <Button variant="primary" size="md" href={LOGIN_URL} dataCta="header-start">{t('header.cta.start')}</Button>
        </div>

        <button
          type="button"
          aria-label="Меню"
          className="lg:hidden p-2 text-slate-700"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
            <span className="font-semibold">LINKEON</span>
            <button type="button" aria-label="Закрыть" onClick={() => setMobileOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-6 p-6">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-xl font-semibold text-slate-900">
                {t(l.key)}
              </a>
            ))}
            <div className="mt-auto flex flex-col gap-3">
              <LangSwitcher />
              <Button variant="outline" size="lg" href={LOGIN_URL} dataCta="header-login">{t('header.cta.login')}</Button>
              <Button variant="primary" size="lg" href={LOGIN_URL} dataCta="header-start">{t('header.cta.start')}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
