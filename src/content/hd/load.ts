import type { HdTexts } from './types';

/** Тексты калькулятора для браузера — отдельный чанк на язык. */
const loaders = import.meta.glob<{ default: HdTexts }>('./texts/*.ts');

export async function loadHdTexts(language: string): Promise<HdTexts | null> {
  const load = loaders[`./texts/${language}.ts`];
  return load ? (await load()).default : null;
}
