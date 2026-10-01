import type { AssistantPageText } from '../../types';

/**
 * Кира — дизайн. Перевод pages/ru/kira.ts. Картинки делает сама, но только
 * растровые (PNG и JPEG): векторных файлов у неё не бывает. Вектор на этой
 * странице не обещать.
 *
 * Пример — разговор с прода 01.10.2026 (docs/assistant-pages/examples/kira.md),
 * картинка — копия в public/examples/.
 *
 * Перевод: на картинке название кириллицей, а картинка одна на все языки.
 * Поэтому в вопросе название пекарни дано транслитерацией с переводом в
 * скобках — «Tiopli Jleb» («Pan calentito»; испанская транслитерация:
 * ё → io, ый → i, х → j), — а в alt сказано, что надпись
 * на кириллице. Переведи название в вопросе — и посетитель увидит, что
 * просили одно, а нарисовано другое.
 *
 * В «Чего не делает» к совету взять текст у Екатерины добавлено «escribe solo
 * en ruso»: она пишет только по-русски, без оговорки совет обещал бы текст на
 * испанском.
 */
const kira: AssistantPageText = {
  title: 'Diseñadora con IA: logotipos e identidad visual — Kira | Linkeon',
  description:
    'Kira, diseñadora con IA. Crea logotipos e identidad visual, tarjetas de visita, banners o presentaciones, y retoca imágenes ya hechas. Archivos PNG y JPEG, no vectoriales.',
  h1: 'Kira — diseñadora con IA: logotipos, identidad visual y diseños',
  lead: 'La inauguración es dentro de una semana y aún no hay letrero, ni menú, ni flyers. Kira le preguntará dónde va a ir cada cosa y quién la verá, y le enseñará el diseño en lugar de describírselo con palabras.',
  card: 'Logotipos, identidad visual, tarjetas de visita, banners, presentaciones. Hace diseños y retoca imágenes ya hechas; archivos PNG y JPEG.',
  cta: 'Hablar con Kira',
  situations: [
    'El logotipo se lo hizo un conocido hace tiempo, y sobre fondo oscuro casi no se ve.',
    'El banner está casi listo, pero hay que quitar un recuadro, cambiar el logotipo y mover el título a la izquierda.',
    'Necesita diez portadas para posts, y todas tienen que parecer de la misma serie.',
    'Mañana tiene una charla y las diapositivas salen de tres plantillas distintas.',
    'Ya tiene el letrero, y las tarjetas de visita, los flyers y el cartel de mesa tienen que ir en el mismo estilo.',
    'El diseñador le ha enviado una propuesta, algo no le convence, pero no sabe decir qué.',
  ],
  example: {
    question:
      'Haga un logotipo para la panadería «Tiopli Jleb» («Pan calentito»). Irá en el letrero y en bolsas de papel. Carácter: casero y cálido; colores: marrones cálidos y crema; símbolo: una espiga. Enséñeme directamente una opción en imagen, no hace falta preguntarme nada.',
    answer: `Aquí tiene la primera versión del logotipo:

Sobre el nombre hay una espiga. La tipografía es suave, con serifas; los colores, marrón oscuro, caramelo y crema. Hay pocos detalles, para que el símbolo se lea tanto de lejos en el letrero como en una bolsa de papel kraft.

Lo que conviene saber antes de imprimir:
— Formato. Solo hago archivos rasterizados (PNG o JPEG); no podré darle un archivo vectorial. Para el letrero, quien lo fabrique suele pedir un vector, así que habrá que redibujar el logotipo a partir de este diseño. Lo más sencillo es hacerlo cuando la versión esté aprobada.
— Bolsas. El papel kraft oscurece los colores, y el crema casi no se ve sobre él. Para las bolsas es mejor una versión en un solo color: el logotipo en marrón oscuro, sin fondo.

Como siguiente paso, puedo hacer esa versión en un solo color con fondo transparente o una versión horizontal para el letrero, con la espiga a la izquierda del nombre. ¿Cuál le hace más falta?`,
    image: {
      src: '/examples/kira-logo.webp',
      alt: 'Logotipo de la panadería «Tiopli Jleb» («Pan calentito»): una espiga sobre el nombre escrito en cirílico, en marrón y caramelo sobre fondo crema',
      width: 640,
      height: 640,
    },
  },
  can: [
    'Crea un logotipo desde cero o mejora el suyo, con versiones para distintos fondos y tamaños.',
    'Define la identidad visual (paleta, combinaciones de tipografías, normas de uso del logotipo) y la mantiene en toda la serie de materiales.',
    'Diseña tarjetas de visita, flyers, folletos, letreros, carteles y diplomas, banners y portadas a la medida de cada plataforma, y presentaciones con un mismo estilo.',
    'Retoca una imagen ya hecha en lugar de dibujarla de nuevo: «muévelo a la izquierda», «quita el recuadro», «cambia el logotipo»; todos los cambios de una vez, y el resto se queda como estaba.',
    'Analiza diseños ajenos: qué no funciona, por qué y qué corregir primero.',
  ],
  cannot: [
    'No hace vectores: nada de SVG, AI, EPS ni CDR, solo PNG y JPEG, también con fondo transparente. Kira se lo dirá desde el principio.',
    'No promete que el archivo esté listo para imprenta: la prueba de color, el CMYK y el sangrado los revisa la imprenta. Kira le dirá qué consultar allí.',
    'No copia logotipos ajenos ni usa fotos o tipografías sin derechos de uso. Si la licencia no está clara, se lo dirá.',
    'No escribe el texto de venta del diseño: para eso, mejor Ekaterina, la redactora (escribe solo en ruso).',
  ],
  faq: [
    {
      q: 'Ya tenemos un manual de marca. ¿Kira lo respetará?',
      a: 'Sí. Envíe el manual en un archivo o un enlace a su web, y Kira tomará de ahí los colores, las tipografías y el logotipo. Si su color es el violeta, seguirá siendo violeta, no «casi igual».',
    },
    {
      q: '¿Qué hace falta para imprimir?',
      a: 'Dígale dónde y en qué tamaño se imprimirá el diseño. Kira fijará las medidas en milímetros, ampliará la imagen si hace falta y le dirá qué comprobar: que se lea bien a tamaño real, el contraste, los márgenes.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si Ekaterina ya sabe a qué se dedica su negocio y quiénes son sus clientes, no tendrá que volver a explicárselo a Kira.',
    },
  ],
};

export default kira;
