#!/usr/bin/env node
/**
 * Забирает аватары ассистентов из кабинета в public/avatars/<slug>.webp
 * (256×256). Файлы коммитятся: страница не должна зависеть от доступности
 * my.linkeon.io. Перезапускать, когда в кабинете сменили аватар.
 * Упал на середине — перезапускать целиком: часть файлов могла остаться от
 * прошлого прогона.
 * Нужен cwebp (на маке — brew install webp): ffmpeg из brew собран без libwebp.
 */
import { mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ASSISTANTS } from '../src/content/assistants/roster.data.js';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'avatars');
const AVATAR = (id) =>
  `https://my.linkeon.io/webhook/0cdacf32-7bfd-4888-b24f-3a6af3b5f99e/agent/avatar/${id}`;

mkdirSync(outDir, { recursive: true });
// Исходники — во временном каталоге с непредсказуемым именем: файл с
// известным именем в общем /tmp могли бы заранее подложить или подменить
// симлинкой, и cwebp прочитал бы чужое.
const tmp = mkdtempSync(join(tmpdir(), 'avatars-'));
try {
  for (const a of ASSISTANTS) {
    const src = join(tmp, a.slug);
    try {
      const res = await fetch(AVATAR(a.id), { signal: AbortSignal.timeout(30_000) });
      const type = res.headers.get('content-type') ?? '';
      // На этом хосте неизвестный путь отдаёт 200 с HTML (SPA-фолбэк): код ответа
      // ничего не доказывает, смотрим тип.
      if (!res.ok || !type.startsWith('image/')) throw new Error(`${res.status} ${type}`);
      writeFileSync(src, Buffer.from(await res.arrayBuffer()));
      const out = join(outDir, `${a.slug}.webp`);
      const run = spawnSync('cwebp', ['-quiet', '-q', '82', '-resize', '256', '256', src, '-o', out]);
      if (run.error) throw new Error(`нет cwebp: brew install webp (${run.error.message})`);
      if (run.status !== 0) throw new Error(`cwebp — ${run.stderr}`);
      console.log(`✅ ${a.slug} → public/avatars/${a.slug}.webp (${statSync(out).size} байт)`);
    } catch (e) {
      throw new Error(`${a.slug}: ${e.message}`);
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
