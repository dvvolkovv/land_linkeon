import type { AssistantPagesPack } from './types';

/**
 * Тексты страниц для браузера — отдельный чанк на язык. Главная их не грузит
 * вовсе, страница ассистента — только свой язык.
 */
const loaders = import.meta.glob<{ default: AssistantPagesPack }>('./pages/*.ts');

export async function loadPack(language: string): Promise<AssistantPagesPack | null> {
  const load = loaders[`./pages/${language}.ts`];
  return load ? (await load()).default : null;
}
