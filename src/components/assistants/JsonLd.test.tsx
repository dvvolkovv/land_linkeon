import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import JsonLd from './JsonLd';

/**
 * Защита экранирования от случайной правки: текст страницы (например, ответ
 * в FAQ) не должен суметь закрыть <script> раньше времени и внести в разметку
 * посторонний тег.
 */
describe('JsonLd — экранирование', () => {
  it('текст с </script><b> не закрывает script раньше времени', () => {
    const data = { '@type': 'FAQPage', mainEntity: [{ name: '</script><b>' }] };
    const html = renderToStaticMarkup(<JsonLd data={data} />);

    expect(html).not.toContain('</script><b>');

    const matches = html.match(/<script type="application\/ld\+json">[\s\S]*<\/script>/g);
    expect(matches).toHaveLength(1);
    // Единственный тег на странице — ничего снаружи него не затесалось.
    expect(matches?.[0]).toBe(html);
  });
});
