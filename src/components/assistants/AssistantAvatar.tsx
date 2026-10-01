import type { AssistantSlug } from '../../content/assistants/roster';

const SIZES = {
  sm: 'w-12 h-12 rounded-xl',
  lg: 'w-20 h-20 md:w-24 md:h-24 rounded-2xl',
} as const;

/**
 * Аватар из public/avatars/ — копия из кабинета (scripts/fetch-avatars.mjs).
 * alt пустой: имя всегда стоит рядом текстом, и скринридер прочёл бы его дважды.
 */
export default function AssistantAvatar({ slug, size = 'sm' }: { slug: AssistantSlug; size?: keyof typeof SIZES }) {
  return (
    <img
      src={`/avatars/${slug}.webp`}
      alt=""
      width={256}
      height={256}
      loading={size === 'lg' ? 'eager' : 'lazy'}
      className={`${SIZES[size]} object-cover bg-paper-200 flex-shrink-0`}
    />
  );
}
