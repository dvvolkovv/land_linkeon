#!/usr/bin/env node
/**
 * Сверяет реестр страниц ассистентов с живым приложением: имена на всех
 * языках, категории, ассистентов без страницы и страницы без ассистента.
 *
 * Сеть нужна, поэтому в сборку не встроен — сборка не должна зависеть от
 * прода. Запускать перед каждым выкатом лендинга: pnpm check-assistants.
 */
import { ASSISTANTS } from '../src/content/assistants/roster.data.js';
import { SUPPORTED_CODES } from '../src/i18n/languages.data.js';

const APP = process.env.APP_URL ?? 'https://my.linkeon.io';
const problems = [];

for (const code of SUPPORTED_CODES) {
  try {
    const res = await fetch(`${APP}/webhook/agents?lang=${code}`, { signal: AbortSignal.timeout(20_000) });
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.includes('application/json')) {
      problems.push(`${code}: ответ ${res.status} ${type}`);
      continue;
    }
    const live = await res.json();
    if (!Array.isArray(live)) {
      problems.push(`${code}: неожиданный ответ — не массив`);
      continue;
    }
    const byId = new Map(live.map((a) => [a.id, a]));
    for (const a of ASSISTANTS) {
      const l = byId.get(a.id);
      if (!l) {
        problems.push(`${code}: ${a.slug} (id ${a.id}) в приложении нет — снят или скрыт`);
        continue;
      }
      if (l.displayName !== a.names[code]) {
        problems.push(`${code}: ${a.slug} в приложении «${l.displayName}», в реестре «${a.names[code]}»`);
      }
      if (l.category !== a.category) {
        problems.push(`${code}: ${a.slug} — категория ${l.category}, в реестре ${a.category}`);
      }
    }
    for (const l of live) {
      if (!ASSISTANTS.some((a) => a.id === l.id)) {
        problems.push(`${code}: в приложении есть ${l.displayName} (id ${l.id}), страницы нет`);
      }
    }
  } catch (err) {
    problems.push(`${code}: сетевая ошибка — ${err.message}`);
    continue;
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`✅ ${ASSISTANTS.length} ассистентов совпадают с ${APP} на ${SUPPORTED_CODES.length} языках`);
