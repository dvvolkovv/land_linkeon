import { useMemo } from 'react';
import { renderBodygraphSvg, type HdChart } from '../../lib/human-design';

/**
 * Схема на странице — та же строка SVG, что отдаст бэкенд второго этапа
 * (renderBodygraphSvg, без DOM). Обёртка только вставляет её и растягивает
 * по ширине колонки.
 */
export default function Bodygraph({ chart, label }: { chart: HdChart; label: string }) {
  const svg = useMemo(() => renderBodygraphSvg(chart, { label }), [chart, label]);
  return (
    <div
      data-testid="hd-bodygraph"
      className="mx-auto w-full max-w-[360px] [&>svg]:h-auto [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
