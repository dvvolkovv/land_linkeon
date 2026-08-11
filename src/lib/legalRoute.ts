import type { LegalType } from '../components/layout/LegalModal';
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';

/**
 * Адресуемые страницы юридических документов.
 *
 * Заведены потому, что до сих пор документы существовали только как модалка
 * по хешу `#privacy`. У хеша нет адреса с точки зрения сервера: и краулер,
 * и Play Console, и любой, кому дают «ссылку на политику», получают главную
 * страницу. Отсюда же взялось дублирование — веб-кабинет и мобильное
 * приложение носили собственные копии текста, потому что ссылаться было
 * не на что.
 *
 * Теперь текст живёт здесь в одном экземпляре, а остальные на него ссылаются.
 */

export const LEGAL_SLUGS = ['offer', 'privacy', 'pdn'] as const;

export interface LegalRoute {
  language: string;
  doc: LegalType;
}

function isSlug(value: string): value is LegalType {
  return (LEGAL_SLUGS as readonly string[]).includes(value);
}

/**
 * Разбирает путь в документ и язык: `/legal/offer` и `/en/legal/offer`.
 *
 * Возвращает null для всего остального — вызывающая сторона показывает
 * обычный лендинг. Хвостовой слэш допускается: сервер статики часто
 * добавляет его сам, и `/legal/offer/` должен вести туда же.
 */
export function parseLegalPath(pathname: string): LegalRoute | null {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return null;

  const language =
    SUPPORTED_CODES.includes(parts[0]) ? parts[0] : DEFAULT_LANGUAGE;
  const rest = SUPPORTED_CODES.includes(parts[0]) ? parts.slice(1) : parts;

  if (rest.length !== 2 || rest[0] !== 'legal') return null;
  if (!isSlug(rest[1])) return null;

  return { language, doc: rest[1] };
}

/**
 * Страница удаления аккаунта. Не юридический документ, но живёт по тем же
 * правилам адресации: Play Console требует публичный адрес, доступный без
 * входа и до установки.
 */
export function parseDeleteAccountPath(pathname: string): { language: string } | null {
  const parts = pathname.split('/').filter(Boolean);
  const language = SUPPORTED_CODES.includes(parts[0]) ? parts[0] : DEFAULT_LANGUAGE;
  const rest = SUPPORTED_CODES.includes(parts[0]) ? parts.slice(1) : parts;
  if (rest.length !== 1 || rest[0] !== 'delete-account') return null;
  return { language };
}

/** Канонический путь документа. Русский живёт в корне, остальные под префиксом. */
export function legalPath(language: string, doc: LegalType): string {
  const prefix = language === DEFAULT_LANGUAGE ? '' : `/${language}`;
  return `${prefix}/legal/${doc}`;
}
