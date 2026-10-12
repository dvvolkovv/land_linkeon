import { useMemo } from 'react';
import { renderValuesCircleSvg, type ValueKey, type ValuesResult } from '../../lib/schwartz';

interface Props {
  result: ValuesResult;
  labels: Record<ValueKey, string>;
  alt: string;
}

/**
 * Круг — строка SVG из модуля, но картинкой (data:), а не вставленной
 * разметкой: Вебвизор пишет атрибуты разметки даже внутри ym-hide-content, а
 * src картинки маскирует целиком. alt — общие слова («Круг ценностей»):
 * ведущие ценности текстом стоят рядом, в карточках.
 */
export default function ValuesCircle({ result, labels, alt }: Props) {
  const src = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderValuesCircleSvg(result, labels))}`,
    [result, labels],
  );
  return (
    <img
      data-testid="values-circle"
      src={src}
      alt={alt}
      width={520}
      height={300}
      className="mx-auto h-auto w-full max-w-[520px]"
    />
  );
}
