import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Bodygraph from './Bodygraph';
import { chartFromUtc, renderBodygraphSvg } from '../../lib/human-design';

const chart = chartFromUtc('1990-03-12T11:25:00Z');

describe('схема на странице', () => {
  // Подпись — НЕ дефолт renderBodygraphSvg («Бодиграф»): совпадение с
  // внутренним умолчанием спрятало бы пропажу прокидывания пропа label.
  it('картинка data: с той же строкой renderBodygraphSvg, подпись — в figcaption', () => {
    const html = renderToStaticMarkup(<Bodygraph chart={chart} label="Схема для теста" />);
    expect(html).toContain('data-testid="hd-bodygraph"');
    expect(html).toContain(encodeURIComponent(renderBodygraphSvg(chart, { label: 'Схема для теста' })));
    expect(html).toContain('>Схема для теста</figcaption>');
  });
});
