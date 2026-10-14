import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HdResult from './HdResult';
import { CENTER_IDS, chartFromUtc, type HdChart } from '../../lib/human-design';
import { HD_TEXTS } from '../../content/hd/texts.server';

const texts = HD_TEXTS.ru;
const chart = chartFromUtc('1990-03-12T11:25:00Z');
const html = renderToStaticMarkup(
  <HdResult
    texts={texts}
    language="ru"
    result={{
      chart,
      date: '1990-03-12',
      time: '14:25',
      city: { name: 'Казань', region: 'Татарстан', country: 'Россия', zone: 'Europe/Moscow' },
      offsetSeconds: 3 * 3600,
    }}
  />,
);

describe('результат расчёта', () => {
  it('тип, профиль и их описания', () => {
    expect(html).toContain(texts.types[chart.type].name);
    expect(html).toContain(texts.types[chart.type].text);
    expect(html).toContain(`${chart.profile} · ${texts.profiles['5/2'].name}`);
    expect(html).toContain(texts.authorities[chart.authority].text);
    expect(html).toContain(texts.definitions[chart.definition].text);
  });

  it('строка с данными рождения скрыта от Вебвизора', () => {
    expect(html).toMatch(/class="ym-hide-content[^"]*" data-testid="hd-data-line">12\.03\.1990, 14:25, Казань \(UTC\+3\)</);
  });

  // По набору ворот дату рождения можно восстановить примерно до дня:
  // от Вебвизора скрыт весь блок — схема, строки, описания (решение владельца).
  it('весь блок результата скрыт от Вебвизора', () => {
    const tag = html.match(/<section[^>]*data-testid="hd-result"[^>]*>/)?.[0] ?? '';
    const classes = tag.match(/class="([^"]*)"/)?.[1].split(/\s+/) ?? [];
    expect(classes).toContain('ym-hide-content');
  });

  // Весь результат — одна секция: ym-hide-content на корне прячет всё
  // содержимое; вложенный ym-show-content снова включил бы запись внутри
  // спрятанного блока.
  it('весь результат — одна секция, без ym-show-content', () => {
    expect(html.startsWith('<section')).toBe(true);
    expect(html.match(/<section[\s>]/g)).toHaveLength(1);
    expect(html).not.toContain('ym-show-content');
  });

  it('по строке на каждый определённый центр и канал', () => {
    for (const c of chart.definedCenters) expect(html).toContain(texts.centers[c].defined);
    for (const c of chart.openCenters) expect(html).toContain(texts.centers[c].open);
    expect(html).toContain(`7-31 · ${texts.channels['7-31'].name}`);
    expect(html).toContain(`12-22 · ${texts.channels['12-22'].name}`);
  });

  // Подпись схемы перечисляет определённые центры текстом (figcaption) — не
  // только у Рефлектора (см. тест ниже), но и в обычном случае.
  it('подпись схемы перечисляет определённые центры', () => {
    expect(chart.definedCenters.length).toBeGreaterThan(0);
    const centers = chart.definedCenters.map((c) => texts.centers[c].name).join(', ');
    expect(html).toContain(`Бодиграф: ${texts.types[chart.type].name}. Определённые центры: ${centers}`);
  });

  // Критично (ревью): внутри ym-hide-content Вебвизор подменяет текстовые
  // узлы и src картинок, но пишет как есть атрибуты SVG — data-gate,
  // data-source, data-center, fill. По набору ворот дата рождения
  // восстанавливается почти до дня. Схема обязана быть картинкой (img),
  // а не вставленной разметкой <svg>.
  //
  // Проверку <svg> ограничиваем фигурой схемы: у кнопки «Разобрать с Райей»
  // свой инлайновый <svg> — иконка ArrowRight из lucide-react, не связанная
  // с картой; глобальный not.toContain('<svg') ловил бы и её.
  it('схема — картинкой, в атрибутах нет ворот и центров', () => {
    const figure = html.match(/<figure[^>]*data-testid="hd-bodygraph"[\s\S]*?<\/figure>/)?.[0] ?? '';
    expect(figure).not.toBe('');
    expect(figure).not.toContain('<svg');
    expect(html).not.toMatch(/data-(gate|source|center|defined)=/);

    // Подпись — только текстом в figcaption: Вебвизор внутри ym-hide-content
    // подменяет текстовые узлы, но не alt/aria-label/title.
    expect(figure).toContain('alt=""');
    expect(html).not.toMatch(/(?:alt|aria-label|title)="[^"]*Бодиграф/);
  });

  // Заголовок результата — цель программного фокуса: после расчёта его
  // фокусирует HumanDesignPage (вместо одного только scrollIntoView), чтобы
  // скринридер объявил появление блока и Tab не уводил мимо.
  it('заголовок результата — цель фокуса после расчёта', () => {
    expect(html).toContain('id="hd-result-heading" tabindex="-1"');
  });

  // Черновик собирается в момент клика: в разметке, которую читает Вебвизор,
  // данных рождения нет.
  it('кнопка к Райе: цель Метрики, ссылка без черновика', () => {
    const tag = html.match(/<a[^>]*data-cta="hd-calc-to-raya"[^>]*>/)?.[0] ?? '';
    expect(tag).toContain('href="https://my.linkeon.io/chat?assistant=14&amp;utm_content=hd-calc');
    expect(tag).not.toContain('#');
    expect(tag).not.toContain('1990');
    expect(html).toContain(texts.result.ctaNote);

    // Строго: href — только assistant/utm_content (+ опциональный lang от
    // appUrl), без фрагмента черновика и без посторонних параметров.
    const url = new URL((tag.match(/href="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&'));
    expect(url.hash).toBe('');
    expect([...url.searchParams.keys()].filter((k) => k !== 'lang')).toEqual(['assistant', 'utm_content']);
  });

  // Обратный случай: все девять центров определены, открытых нет — ветка
  // noOpenCenters (синтетическая карта: таких рождений среди 300 карт
  // эталона не нашлось, но ветка в коде есть и должна быть проверена).
  it('ветка «открытых центров нет», когда определены все центры', () => {
    const allDefinedChart: HdChart = { ...chart, definedCenters: [...CENTER_IDS], openCenters: [] };
    const allDefinedHtml = renderToStaticMarkup(
      <HdResult
        texts={texts}
        language="ru"
        result={{
          chart: allDefinedChart,
          date: '1990-03-12',
          time: '14:25',
          city: { name: 'Казань', region: 'Татарстан', country: 'Россия', zone: 'Europe/Moscow' },
          offsetSeconds: 3 * 3600,
        }}
      />,
    );
    expect(allDefinedHtml).toContain(texts.result.noOpenCenters);
  });

  // У Рефлектора открыты все девять центров, определённых нет. Подпись схемы
  // обязана переключиться на отдельный шаблон bodygraphLabelEmpty — иначе из
  // bodygraphLabel с фолбэком `|| r.noDefinedCenters` в {centers} вышло бы
  // «Определённые центры: Определённых центров нет». У bodygraphLabelEmpty
  // своя короткая формулировка — «Определённые центры: нет». Момент —
  // настоящий из эталона Swiss Ephemeris
  // (src/lib/human-design/__fixtures__/reference.json), а не придуманный.
  // Подпись теперь не в aria-label, а в figcaption картинки (см. Bodygraph).
  it('подпись схемы у Рефлектора — без списка центров', () => {
    const reflectorChart = chartFromUtc('1941-09-12T04:08:00.000Z');
    expect(reflectorChart.type).toBe('reflector');
    expect(reflectorChart.definedCenters).toEqual([]);
    const reflectorHtml = renderToStaticMarkup(
      <HdResult
        texts={texts}
        language="ru"
        result={{
          chart: reflectorChart,
          date: '1941-09-12',
          time: '07:08',
          city: { name: 'Казань', region: 'Татарстан', country: 'Россия', zone: 'Europe/Moscow' },
          offsetSeconds: 3 * 3600,
        }}
      />,
    );
    expect(reflectorHtml).toContain('>Бодиграф: Рефлектор. Определённые центры: нет</figcaption>');
  });

  // Склейка по языку страницы (textJoin.ts): в zh тире между именем и
  // пояснением — «——» без пробелов, перечень центров в подписи схемы — через
  // «、». Тексты берём русские — здесь проверяем не слова, а разделители.
  it('zh: тире без пробелов и перечень центров через «、»', () => {
    const zhHtml = renderToStaticMarkup(
      <HdResult
        texts={texts}
        language="zh"
        result={{
          chart,
          date: '1990-03-12',
          time: '14:25',
          city: { name: 'Казань', region: 'Татарстан', country: 'Россия', zone: 'Europe/Moscow' },
          offsetSeconds: 3 * 3600,
        }}
      />,
    );
    expect(chart.definedCenters.length).toBeGreaterThanOrEqual(2);
    expect(chart.channels.length).toBeGreaterThanOrEqual(1);

    // Нет «пробел-тире-пробел» вообще — ни у центров, ни у каналов.
    expect(zhHtml).not.toContain(' — ');

    // Сразу после имени — «——» без пробелов: у определённого центра, у
    // открытого центра и у канала.
    expect(zhHtml).toContain(`${texts.centers[chart.definedCenters[0]].name}</strong>——`);
    expect(zhHtml).toContain(`${texts.centers[chart.openCenters[0]].name}</strong>——`);
    expect(zhHtml).toContain(`${texts.channels['7-31'].name}</strong>——`);

    // Подпись схемы — перечень центров через «、», без запятых.
    const centers = chart.definedCenters.map((c) => texts.centers[c].name).join('、');
    expect(zhHtml).toContain(`Определённые центры: ${centers}`);
  });
});
