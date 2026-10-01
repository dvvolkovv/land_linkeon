import type { AssistantPagesPack } from './types';

/**
 * Тексты страниц на всех языках сразу и синхронно — для пререндера и тестов.
 *
 * Пререндер рисует страницу одним проходом renderToString и ждать ленивые
 * чанки не умеет. В клиентский бандл модуль не попадает: его импортируют
 * только src/entry-server.tsx и тесты. Браузер грузит свой язык через load.ts.
 */
const modules = import.meta.glob<{ default: AssistantPagesPack }>('./pages/*.ts', { eager: true });

export const PACKS: Record<string, AssistantPagesPack> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace(/^.*\/(\w+)\.ts$/, '$1'), mod.default]),
);
