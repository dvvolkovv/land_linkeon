import type { MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Bodygraph from './Bodygraph';
import type { HdResultData } from './HdForm';
import type { HdTexts, ProfileKey } from '../../content/hd/types';
import { draftMessage, fillTemplate, rayaChatHref, rayaChatUrlWithDraft } from '../../lib/hdDraft';
import { formatOffset } from '../../lib/human-design';

function Row({ label, value, text, testId }: { label: string; value: string; text?: string; testId?: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-paper-600">{label}</dt>
      <dd className="mt-1">
        <span className="text-lg font-semibold text-paper-900" data-testid={testId}>
          {value}
        </span>
        {text && <p className="mt-1 text-paper-800 leading-relaxed">{text}</p>}
      </dd>
    </div>
  );
}

/**
 * Результат: схема, пять характеристик с абзацем смысла, центры и каналы по
 * строке, переход к Райе.
 *
 * От Вебвизора скрыт весь блок (ym-hide-content на контейнере секции): по
 * набору активных ворот дату рождения можно восстановить примерно до дня, а
 * не только по строке с датой, временем и городом (решение владельца).
 */
export default function HdResult({ texts, result }: { texts: HdTexts; result: HdResultData }) {
  const r = texts.result;
  const { chart } = result;
  const type = texts.types[chart.type];
  const authority = texts.authorities[chart.authority];
  const profile = texts.profiles[chart.profile as ProfileKey];
  const definition = texts.definitions[chart.definition];
  const offset = formatOffset(result.offsetSeconds);
  const [y, m, d] = result.date.split('-');
  const dataLine = fillTemplate(r.dataLine, { date: `${d}.${m}.${y}`, time: result.time, city: result.city.name, offset });
  // Рефлектор: определённых центров нет. bodygraphLabel с пустой строкой
  // центров дал бы «Определённые центры: Определённых центров нет» — вместо
  // этого отдельный шаблон bodygraphLabelEmpty без списка центров вовсе.
  const centerNames = chart.definedCenters.map((c) => texts.centers[c].name);
  const label = centerNames.length
    ? fillTemplate(r.bodygraphLabel, { type: type.name, centers: centerNames.join(', ') })
    : fillTemplate(r.bodygraphLabelEmpty, { type: type.name });

  // Черновик Райе собирается только здесь, в момент клика: в href кнопки
  // данных рождения нет — его читают Вебвизор и отслеживание ссылок Метрики.
  const toRaya = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = rayaChatUrlWithDraft(
      draftMessage(texts.message, {
        date: result.date,
        time: result.time,
        city: result.city.name,
        offset,
        type: type.name,
        profile: chart.profile,
        authority: authority.inMessage,
      }),
    );
    if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(url, '_blank', 'noopener');
    else window.location.assign(url);
  };

  return (
    <section
      id="hd-result"
      aria-labelledby="hd-result-heading"
      data-testid="hd-result"
      className="ym-hide-content max-w-4xl mx-auto px-6 pb-12 scroll-mt-20"
    >
      <h2 id="hd-result-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
        {r.heading}
      </h2>
      <p className="ym-hide-content mt-2 text-sm text-paper-600" data-testid="hd-data-line">
        {dataLine}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,360px)_1fr]">
        <div>
          <Bodygraph chart={chart} label={label} />
          <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-paper-700">
            <span>
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-paper-900 align-middle mr-1" />
              {r.legendPersonality}
            </span>
            <span>
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-rose-700 align-middle mr-1" />
              {r.legendDesign}
            </span>
          </p>
        </div>
        <dl className="space-y-5">
          <Row label={r.typeLabel} value={type.name} text={type.text} testId="hd-type" />
          <Row label={r.strategyLabel} value={type.strategy} />
          <Row label={r.authorityLabel} value={authority.name} text={authority.text} testId="hd-authority" />
          <Row label={r.profileLabel} value={`${chart.profile} · ${profile.name}`} text={profile.text} testId="hd-profile" />
          <Row label={r.definitionLabel} value={definition.name} text={definition.text} testId="hd-definition" />
        </dl>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-paper-900">{r.definedCenters}</h3>
          {chart.definedCenters.length > 0 ? (
            <ul className="mt-3 space-y-2" data-testid="hd-defined-centers">
              {chart.definedCenters.map((c) => (
                <li key={c} className="text-paper-800 leading-relaxed">
                  <strong className="text-paper-900">{texts.centers[c].name}</strong> — {texts.centers[c].defined}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-paper-800">{r.noDefinedCenters}</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-paper-900">{r.openCenters}</h3>
          <ul className="mt-3 space-y-2">
            {chart.openCenters.map((c) => (
              <li key={c} className="text-paper-800 leading-relaxed">
                <strong className="text-paper-900">{texts.centers[c].name}</strong> — {texts.centers[c].open}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-semibold text-paper-900">{r.channels}</h3>
      {chart.channels.length > 0 ? (
        <ul className="mt-3 space-y-2" data-testid="hd-channels">
          {chart.channels.map((key) => (
            <li key={key} className="text-paper-800 leading-relaxed">
              <strong className="text-paper-900">
                {key} · {texts.channels[key].name}
              </strong>{' '}
              — {texts.channels[key].text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-paper-800">{r.noChannels}</p>
      )}

      <div className="mt-10 rounded-2xl border border-paper-300 bg-paper-100 p-6">
        <Button href={rayaChatHref()} size="lg" dataCta="hd-calc-to-raya" onClick={toRaya}>
          {r.cta} <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Button>
        <p className="mt-3 text-sm text-paper-700">{r.ctaNote}</p>
      </div>
    </section>
  );
}
