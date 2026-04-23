import { useTranslation } from 'react-i18next';
import { Send, Youtube, MessageCircle } from 'lucide-react';
import LangSwitcher from '../ui/LangSwitcher';

interface LinkItem {
  label: string;
  href: string;
}

function FooterLink({ href, label }: LinkItem) {
  const external = href.startsWith('http');
  const disabled = href === '#';
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

  const col = (items: LinkItem[]) => (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.href + it.label}>
          <FooterLink {...it} />
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
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                aria-disabled={href === '#' || undefined}
                className="text-slate-400 hover:text-slate-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.product')}</h3>
          {col([
            // TODO: revisit anchors after Tasks 8-15 land actual section ids
            { label: t('footer.product.assistants'), href: '#features' },
            { label: t('footer.product.dozvon'), href: '#features' },
            { label: t('footer.product.profile'), href: '#features' },
            { label: t('footer.product.networking'), href: '#features' },
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
            { label: t('footer.legal.privacy'), href: '#' },
            { label: t('footer.legal.offer'), href: '#' },
            { label: t('footer.legal.pdn'), href: '#' },
          ])}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-slate-400">© {new Date().getFullYear()} LINKEON.IO · {t('footer.rights')}</span>
        <LangSwitcher />
      </div>
    </footer>
  );
}
