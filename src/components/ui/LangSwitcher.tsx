import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { languageFromPath, pathForLanguage } from '../../i18n/urlLanguage';

// Зазор от края вьюпорта, который оставляем при расчёте направления и при
// ограничении высоты списка в зажатом случае.
const VIEWPORT_MARGIN = 8;

// В браузере — настоящий useLayoutEffect: замер и переворот дропдауна должны
// произойти до отрисовки, иначе список мигнёт не в ту сторону. В Node
// (пререндер, scripts/prerender.mjs) layout-эффекты не выполняются вовсе, и
// React ругается в stderr на каждый рендер — берём useEffect, чтобы не
// засорять лог сборки. На разметку это не влияет: дропдаун закрыт, эффект
// всё равно выходит по `!open`.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  // Компонент стоит в трёх местах (десктоп-шапка, мобильное меню, подвал) —
  // ни одно из них не должно знать, куда открывается список. Меряем реальное
  // место под кнопкой и над ней после открытия и решаем сторону сами; в
  // мобильном меню кнопка прижата к низу панели через mt-auto, и раньше
  // список из шести пунктов открывался вниз и уезжал за край экрана.
  useIsomorphicLayoutEffect(() => {
    if (!open || !buttonRef.current || !listRef.current) return;
    const buttonEl = buttonRef.current;
    const listEl = listRef.current;

    // Меряем натуральную высоту списка в обход React-состояния: если с
    // прошлого открытия остался maxHeight от зажатого случая, offsetHeight
    // отразил бы его, а не то, сколько всего пунктов реально нужно.
    const previousMaxHeight = listEl.style.maxHeight;
    listEl.style.maxHeight = 'none';
    const listHeight = listEl.offsetHeight;
    listEl.style.maxHeight = previousMaxHeight;

    const buttonRect = buttonEl.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow >= listHeight + VIEWPORT_MARGIN) {
      setDirection('down');
      setMaxHeight(undefined);
    } else if (spaceAbove >= listHeight + VIEWPORT_MARGIN) {
      setDirection('up');
      setMaxHeight(undefined);
    } else {
      // Не помещается ни сверху, ни снизу — оставляем вниз, но со своим
      // скроллом, чтобы список не уезжал за вьюпорт целиком.
      setDirection('down');
      setMaxHeight(Math.max(spaceBelow - VIEWPORT_MARGIN, 120));
    }
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
        ref={buttonRef}
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
          ref={listRef}
          role="listbox"
          style={maxHeight !== undefined ? { maxHeight } : undefined}
          className={`absolute right-0 z-50 min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg ${
            direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
          } ${maxHeight !== undefined ? 'overflow-y-auto' : ''}`}
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
