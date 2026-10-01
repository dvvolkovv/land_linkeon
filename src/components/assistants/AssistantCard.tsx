import { useTranslation } from 'react-i18next';
import AssistantAvatar from './AssistantAvatar';
import { assistantName, type AssistantEntry } from '../../content/assistants/roster';
import { assistantPath } from '../../lib/assistantRoute';

interface Props {
  entry: AssistantEntry;
  language: string;
  /** Строка `card` из текстов страницы этого ассистента. */
  line: string;
}

/** Карточка-ссылка на страницу ассистента: каталог и «Работает в паре с». */
export default function AssistantCard({ entry, language, line }: Props) {
  const { t } = useTranslation();
  return (
    <a
      href={assistantPath(language, entry.slug)}
      className="h-full flex gap-3 p-4 rounded-xl border border-paper-300 bg-paper-50 hover:border-brand-700 transition-colors"
    >
      <AssistantAvatar slug={entry.slug} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-paper-900">{assistantName(entry, language)}</span>
        <span className="block text-xs text-paper-600 leading-snug">{t(`assistantPages.roles.${entry.slug}`)}</span>
        <span className="block mt-2 text-sm text-paper-800 leading-relaxed">{line}</span>
      </span>
    </a>
  );
}
