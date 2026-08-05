import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

import * as legalRu from '../../content/legal/ru';
import * as legalEn from '../../content/legal/en';

export type LegalType = 'privacy' | 'offer' | 'pdn';

interface LegalModalProps {
  type: LegalType | null;
  onClose: () => void;
}

/**
 * Legal documents for linkeon.io (offer / privacy policy / personal-data consent).
 *
 * Content source: mirrors the modals shown in my.linkeon.io
 * (`src/components/onboarding/LegalModal.tsx` in spirits_front). The SPA there
 * only surfaces these docs as modals (not as addressable URLs), so we ship the
 * same text on the landing so footer links actually resolve to real content
 * instead of dead `#` anchors.
 */
export default function LegalModal({ type, onClose }: LegalModalProps) {
  const { i18n } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  // Русская редакция — единственная, имеющая юридическую силу. Для всех
  // языков кроме ru показываем английский перевод.
  const lng = i18n.language;
  const pack = lng === 'ru' ? legalRu : legalEn;
  const showFallbackNotice = lng !== 'ru' && lng !== 'en';

  useEffect(() => {
    if (!type) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Prevent background scroll while modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog for accessibility.
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [type, onClose]);

  if (!type) return null;

  const title = pack.titles[type];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={lng === 'ru' ? 'Закрыть' : 'Close'}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X aria-hidden="true" className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 text-[15px] leading-relaxed text-gray-700 space-y-4">
          {showFallbackNotice && (
            <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
              This document is available in Russian and English only. The Russian
              version is the legally binding one.
            </p>
          )}
          {pack.renderLegal(type)}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-brand-800 hover:bg-brand-900 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {lng === 'ru' ? 'Закрыть' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
