import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Bodygraph from './Bodygraph';
import { chartFromUtc, renderBodygraphSvg } from '../../lib/human-design';

const chart = chartFromUtc('1990-03-12T11:25:00Z');

describe('схема на странице', () => {
  it('вставляет ровно строку renderBodygraphSvg', () => {
    const html = renderToStaticMarkup(<Bodygraph chart={chart} label="Бодиграф" />);
    expect(html).toContain(renderBodygraphSvg(chart, { label: 'Бодиграф' }));
    expect(html).toContain('data-testid="hd-bodygraph"');
  });
});
