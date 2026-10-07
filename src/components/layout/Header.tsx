import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import LangSwitcher from '../ui/LangSwitcher';
import { appUrl } from '../../lib/appUrl';

const LINKS = [
  { href: '#features', key: 'header.nav.features' },
  { href: '#sites', key: 'header.nav.sites' },
  { href: '#how', key: 'header.nav.how' },
  { href: '#pricing', key: 'header.nav.pricing' },
  { href: '#faq', key: 'header.nav.faq' },
] as const;


interface Props {
  /**
   * Главная своего языка — на подстраницах (ассистенты). Без него пункты меню —
   * якоря текущей страницы, как на самой главной; на подстранице такие якоря
   * никуда не ведут.
   */
  homeHref?: string;
}

export default function Header({ homeHref }: Props = {}) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navHref = (anchor: string) => (homeHref ? `${homeHref}${anchor}` : anchor);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href={homeHref ?? '#top'}
          onClick={homeHref ? undefined : scrollToTop}
          className="flex items-center gap-2 font-semibold tracking-tight text-gray-900"
          aria-label={t('header.a11y.logo')}
        >
          <span>LINKEON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        </a>

        {/* Пять пунктов на 1024 px: с gap-8 французской строке не оставалось
            места под обычную полосу прокрутки, поэтому до xl — gap-6.
            whitespace-nowrap здесь и на кнопках превращает нехватку места в
            переполнение, а не в перенос строк; запас на 1024 px во всех
            языках мерит tests/sites.spec.ts. */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={navHref(l.href)} className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap">
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          <Button variant="ghost" size="md" href={appUrl()} dataCta="header-login" className="whitespace-nowrap">{t('header.cta.login')}</Button>
          <Button variant="primary" size="md" href={appUrl()} dataCta="header-start" className="whitespace-nowrap">{t('header.cta.start')}</Button>
        </div>

        <button
          type="button"
          aria-label={t('header.a11y.openMenu')}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(true)}
        >
          <Menu aria-hidden="true" className="w-6 h-6" />
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t('header.a11y.openMenu')}
          className="lg:hidden fixed inset-0 bg-white z-[60] flex flex-col"
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <span className="font-semibold">LINKEON</span>
            <button
              type="button"
              aria-label={t('header.a11y.closeMenu')}
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto">
            {LINKS.map((l) => (
              <a key={l.href} href={navHref(l.href)} onClick={() => setMobileOpen(false)} className="text-xl font-semibold text-gray-900">
                {t(l.key)}
              </a>
            ))}
            <div className="mt-auto flex flex-col gap-3">
              <LangSwitcher />
              <Button variant="outline" size="lg" href={appUrl()} dataCta="header-login">{t('header.cta.login')}</Button>
              <Button variant="primary" size="lg" href={appUrl()} dataCta="header-start">{t('header.cta.start')}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
