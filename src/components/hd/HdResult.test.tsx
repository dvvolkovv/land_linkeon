import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HdResult from './HdResult';
import { chartFromUtc } from '../../lib/human-design';
import { HD_TEXTS } from '../../content/hd/texts.server';

const texts = HD_TEXTS.ru;
const chart = chartFromUtc('1990-03-12T11:25:00Z');
const html = renderToStaticMarkup(
  <HdResult
    texts={texts}
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

  it('по строке на каждый определённый центр и канал', () => {
    for (const c of chart.definedCenters) expect(html).toContain(texts.centers[c].defined);
    for (const c of chart.openCenters) expect(html).toContain(texts.centers[c].open);
    expect(html).toContain(`7-31 · ${texts.channels['7-31'].name}`);
    expect(html).toContain(`12-22 · ${texts.channels['12-22'].name}`);
  });

  // Черновик собирается в момент клика: в разметке, которую читает Вебвизор,
  // данных рождения нет.
  it('кнопка к Райе: цель Метрики, ссылка без черновика', () => {
    const tag = html.match(/<a[^>]*data-cta="hd-calc-to-raya"[^>]*>/)?.[0] ?? '';
    expect(tag).toContain('href="https://my.linkeon.io/chat?assistant=14&amp;utm_content=hd-calc');
    expect(tag).not.toContain('#');
    expect(tag).not.toContain('1990');
    expect(html).toContain(texts.result.ctaNote);
  });

  // У Рефлектора открыты все девять центров, определённых нет. Подпись схемы
  // обязана переключиться на отдельный шаблон bodygraphLabelEmpty — иначе из
  // bodygraphLabel с пустой строкой центров вышло бы «Определённые центры:
  // Определённых центров нет». Момент — настоящий из эталона Swiss Ephemeris
  // (src/lib/human-design/__fixtures__/reference.json), а не придуманный.
  it('подпись схемы у Рефлектора — без списка центров', () => {
    const reflectorChart = chartFromUtc('1941-09-12T04:08:00.000Z');
    expect(reflectorChart.type).toBe('reflector');
    expect(reflectorChart.definedCenters).toEqual([]);
    const reflectorHtml = renderToStaticMarkup(
      <HdResult
        texts={texts}
        result={{
          chart: reflectorChart,
          date: '1941-09-12',
          time: '07:08',
          city: { name: 'Казань', region: 'Татарстан', country: 'Россия', zone: 'Europe/Moscow' },
          offsetSeconds: 3 * 3600,
        }}
      />,
    );
    expect(reflectorHtml).toContain('aria-label="Бодиграф: Рефлектор. Определённых центров нет"');
  });
});
