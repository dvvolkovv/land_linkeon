/**
 * JSON-LD в разметке страницы. `<` экранируется: текст страницы не должен
 * суметь закрыть </script> раньше времени.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
