import { useMemo } from 'react';
import { renderBodygraphSvg, type HdChart } from '../../lib/human-design';

/**
 * Схема на странице — та же строка SVG, что отдаст бэкенд второго этапа
 * (renderBodygraphSvg), но картинкой (data:), а не вставленной разметкой.
 *
 * Внутри ym-hide-content сериализатор Вебвизора подменяет только текстовые
 * узлы и src картинок — атрибуты SVG (data-gate, data-source, data-center,
 * fill, aria-label) он пишет как есть. Набор активных ворот восстанавливает
 * дату рождения почти до дня, ради этого блок и прятали (ревью). img[src]
 * Вебвизор маскирует целиком, поэтому подпись — только в figcaption
 * (текстовый узел, который он тоже подменяет), а не в aria-label/alt.
 */
export default function Bodygraph({ chart, label }: { chart: HdChart; label: string }) {
  const src = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderBodygraphSvg(chart, { label }))}`,
    [chart, label],
  );
  return (
    <figure data-testid="hd-bodygraph" className="mx-auto w-full max-w-[360px]">
      <img src={src} alt="" className="h-auto w-full" />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
