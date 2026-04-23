import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Youtube, MessageCircle } from 'lucide-react';
import LangSwitcher from '../ui/LangSwitcher';
import LegalModal, { type LegalType } from './LegalModal';

interface LinkItem {
  label: string;
  href: string;
}

function isLegalHash(hash: string): LegalType | null {
  const v = hash.replace(/^#/, '');
  return v === 'privacy' || v === 'offer' || v === 'pdn' ? v : null;
}

function FooterLink({ href, label, onLegalClick }: LinkItem & { onLegalClick?: (t: LegalType) => void }) {
  const external = href.startsWith('http');
  const disabled = href === '#';
  const legal = href.startsWith('#') ? isLegalHash(href) : null;

  if (legal && onLegalClick) {
    return (
      <a
        href={href}
        className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          onLegalClick(legal);
          // Mirror the hash so the URL is shareable / back-button works.
          if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', href);
          }
        }}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-disabled={disabled || undefined}
    >
      {label}
    </a>
  );
}

const SOCIALS = [
  { label: 'Telegram', href: '#', Icon: Send },
  { label: 'VK', href: '#', Icon: MessageCircle },
  { label: 'YouTube', href: '#', Icon: Youtube },
] as const;

export default function Footer() {
  const { t } = useTranslation();
  const [legal, setLegal] = useState<LegalType | null>(null);

  const openLegal = useCallback((type: LegalType) => setLegal(type), []);
  const closeLegal = useCallback(() => {
    setLegal(null);
    if (typeof window !== 'undefined' && /^#(privacy|offer|pdn)$/.test(window.location.hash)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Open modal if page loads with #privacy / #offer / #pdn.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const initial = isLegalHash(window.location.hash);
    if (initial) setLegal(initial);
    const onHashChange = () => {
      const next = isLegalHash(window.location.hash);
      if (next) setLegal(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const col = (items: LinkItem[]) => (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.href + it.label}>
          <FooterLink {...it} onLegalClick={openLegal} />
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-white font-semibold mb-3">
            <span>LINKEON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-sm text-slate-400 mb-6">{t('footer.tagline')}</p>
          <div className="flex items-center gap-1 -ml-2.5">
            {SOCIALS.map(({ label, href, Icon }) => {
              const disabled = href === '#';
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  aria-disabled={disabled || undefined}
                  tabIndex={disabled ? -1 : undefined}
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ${disabled ? 'pointer-events-none opacity-40' : ''}`}
                >
                  <Icon aria-hidden="true" className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.product')}</h3>
          {col([
            { label: t('footer.product.assistants'), href: '#features' },
            { label: t('footer.product.dozvon'), href: '#dozvon' },
            { label: t('footer.product.profile'), href: '#profile' },
            { label: t('footer.product.networking'), href: '#networking' },
            { label: t('footer.product.pricing'), href: '#pricing' },
          ])}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.company')}</h3>
          {col([
            { label: t('footer.company.about'), href: '#' },
            { label: t('footer.company.blog'), href: '#' },
            { label: t('footer.company.referral'), href: 'https://my.linkeon.io/referral' },
            { label: t('footer.company.support'), href: 'https://my.linkeon.io/support' },
          ])}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.legal')}</h3>
          {col([
            { label: t('footer.legal.privacy'), href: '#privacy' },
            { label: t('footer.legal.offer'), href: '#offer' },
            { label: t('footer.legal.pdn'), href: '#pdn' },
          ])}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-slate-400">© {new Date().getFullYear()} LINKEON.IO · {t('footer.rights')}</span>
        <LangSwitcher />
      </div>

      <LegalModal type={legal} onClose={closeLegal} />
    </footer>
  );
}
