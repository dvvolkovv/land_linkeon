import type { HdTexts } from './types';

/**
 * Тексты калькулятора на всех языках сразу и синхронно — для пререндера и
 * тестов (как packs.server.ts у страниц ассистентов). В клиентский бандл не
 * попадает: его импортируют только src/entry-server.tsx и тесты.
 */
const modules = import.meta.glob<{ default: HdTexts }>('./texts/*.ts', { eager: true });

export const HD_TEXTS: Record<string, HdTexts> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace(/^.*\/(\w+)\.ts$/, '$1'), mod.default]),
);
