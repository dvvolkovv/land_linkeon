import type { AssistantSlug } from '../../content/assistants/roster';

/**
 * Кто стоит на шести карточках секции Assistants — в порядке
 * `assistants.list` локалей. Имена в локалях написаны руками; тест
 * Assistants.test.tsx сверяет их с реестром на всех языках.
 */
export const CARD_SLUGS: AssistantSlug[] = ['roman', 'alexandra', 'alexey', 'anna', 'irina', 'misha'];
