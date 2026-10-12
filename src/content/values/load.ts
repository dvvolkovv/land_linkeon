import type { ValuesTexts } from './types';

/** Тексты теста для браузера — отдельный чанк на язык. */
const loaders = import.meta.glob<{ default: ValuesTexts }>('./texts/*.ts');

export async function loadValuesTexts(language: string): Promise<ValuesTexts | null> {
  const load = loaders[`./texts/${language}.ts`];
  return load ? (await load()).default : null;
}
