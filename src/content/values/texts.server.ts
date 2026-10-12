import type { ValuesTexts } from './types';

/**
 * Тексты теста на всех языках сразу и синхронно — для пререндера и тестов
 * (как texts.server.ts калькулятора). В клиентский бандл не попадает: его
 * импортируют только src/entry-server.tsx и тесты.
 */
const modules = import.meta.glob<{ default: ValuesTexts }>('./texts/*.ts', { eager: true });

export const VALUES_TEXTS: Record<string, ValuesTexts> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace(/^.*\/(\w+)\.ts$/, '$1'), mod.default]),
);
