/**
 * Подбор 10 карт для ручной сверки с независимыми калькуляторами.
 *
 * Эталон Swiss Ephemeris колесо ворот и правила типа/авторитета не проверяет —
 * у него та же таблица. Это делают 10 карт, посчитанных на двух сторонних
 * калькуляторах (план, задача «Карты ручной сверки»). Скрипт подбирает
 * рождения так, чтобы встретились все пять типов, все семь авторитетов и все
 * виды определённости, и печатает их с НАШИМ результатом — заготовкой для
 * src/lib/human-design/manual.test.ts. Данные рождения случайные, реальных людей нет.
 *
 * tsx здесь не годится (его загрузчик не видит именованных экспортов
 * astronomy-engine), поэтому — сборкой Vite и обычным node:
 *   pnpm exec vite build --ssr scripts/hd-pick-manual.ts --outDir node_modules/.cache/hd-pick --emptyOutDir --logLevel warn
 *   node node_modules/.cache/hd-pick/hd-pick-manual.js
 */
import { HD_AUTHORITIES, HD_DEFINITIONS, HD_TYPES, calculateChart, formatOffset, type HdChart } from '../src/lib/human-design';
import { GATE_CENTER, type CenterId } from '../src/lib/human-design/bodygraph';

/** Пояс → город, который вводить в сторонний калькулятор. */
const CITY_OF: Record<string, string> = {
  'Europe/Moscow': 'Москва',
  'Asia/Yekaterinburg': 'Екатеринбург',
  'Asia/Novosibirsk': 'Новосибирск',
  'Europe/Berlin': 'Berlin',
  'America/New_York': 'New York',
  'Asia/Tokyo': 'Tokyo',
};
const ZONES = Object.keys(CITY_OF);

interface Candidate {
  date: string;
  time: string;
  zone: string;
  chart: HdChart;
  offsetSeconds: number;
}

// Детерминированный генератор: подбор воспроизводим.
let seed = 20261008;
const random = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};
const pad = (n: number) => String(n).padStart(2, '0');

function birth(date: string, time: string, zone: string): Candidate | null {
  const r = calculateChart({ date, time, zone });
  return r.kind === 'ok' ? { date, time, zone, chart: r.chart, offsetSeconds: r.offsetSeconds } : null;
}

function randomBirth(): Candidate | null {
  const d = new Date(Date.UTC(1950, 0, 1) + random() * (Date.UTC(2015, 0, 1) - Date.UTC(1950, 0, 1)));
  const date = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  return birth(date, `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`, ZONES[Math.floor(random() * ZONES.length)]);
}

/** Связаны ли два центра определёнными каналами карты — напрямую или цепочкой. */
function connected(c: HdChart, from: CenterId, to: CenterId): boolean {
  const seen = new Set<CenterId>([from]);
  const queue: CenterId[] = [from];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    for (const key of c.channels) {
      const [a, b] = key.split('-').map(Number);
      const [ca, cb] = [GATE_CENTER[a], GATE_CENTER[b]];
      const next = ca === cur ? cb : cb === cur ? ca : null;
      if (next && !seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return seen.has(to);
}

const categories = (c: HdChart) => {
  const keys = [`type:${c.type}`, `authority:${c.authority}`, `definition:${c.definition}`];
  if (c.type === 'manifestingGenerator' && !connected(c, 'sacral', 'throat')) keys.push('rule:mgOtherMotor');
  return keys;
};
const WANTED = new Set([
  ...HD_TYPES.map((t) => `type:${t}`),
  ...HD_AUTHORITIES.map((a) => `authority:${a}`),
  ...HD_DEFINITIONS.map((d) => `definition:${d}`),
  'rule:mgOtherMotor',
]);

// Пример из спеки и e2e-теста — первым и обязательно.
const picked: Candidate[] = [birth('1990-03-12', '14:25', 'Europe/Moscow')!];
const uncovered = new Set(WANTED);
for (const k of categories(picked[0].chart)) uncovered.delete(k);

// Пул: по нескольку примеров на каждую категорию, редкие (эго, четверная,
// Рефлектор) попадаются раз на сотню-другую рождений.
const pool = new Map<string, Candidate[]>();
for (let tries = 0; tries < 60_000; tries++) {
  const c = randomBirth();
  if (!c) continue;
  for (const k of categories(c.chart)) {
    const list = pool.get(k) ?? [];
    if (list.length < 5) pool.set(k, [...list, c]);
  }
}
const candidates = [...new Set([...pool.values()].flat())];

// Жадное покрытие: каждый раз — карта, закрывающая больше всего непокрытого.
while (uncovered.size > 0 && picked.length < 10) {
  const gain = (c: Candidate) => categories(c.chart).filter((k) => uncovered.has(k)).length;
  const best = candidates.reduce((a, b) => (gain(b) > gain(a) ? b : a));
  if (gain(best) === 0) break;
  picked.push(best);
  for (const k of categories(best.chart)) uncovered.delete(k);
}
// Оставшиеся места — карты с ещё не встреченными профилями.
for (const c of candidates) {
  if (picked.length >= 10) break;
  if (!picked.some((p) => p.chart.profile === c.chart.profile)) picked.push(c);
}

console.log(`// Не встретилось: ${uncovered.size ? [...uncovered].join(', ') : 'всё встретилось'}`);
for (const p of picked) {
  const c = p.chart;
  console.log(`  {
    date: '${p.date}', time: '${p.time}', zone: '${p.zone}',
    expect: { type: '${c.type}', authority: '${c.authority}', profile: '${c.profile}', definition: '${c.definition}',
      channels: [${c.channels.map((k) => `'${k}'`).join(', ')}] },
    // вводить: ${CITY_OF[p.zone]}, ${p.date} ${p.time} (${formatOffset(p.offsetSeconds)}); Солнце личности ${c.personality[0].gate}.${c.personality[0].line}, дизайна ${c.design[0].gate}.${c.design[0].line}
    checkedWith: [],
  },`);
}
