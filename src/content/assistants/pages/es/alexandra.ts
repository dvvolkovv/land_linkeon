import type { AssistantPageText } from '../../types';

/** Александра — маркетолог. Перевод pages/ru/alexandra.ts. Пример разговора — docs/assistant-pages/examples/alexandra.md. */
const alexandra: AssistantPageText = {
  title: 'Marketing con IA y análisis de la competencia — Alexandra | Linkeon',
  description:
    'Alexandra, experta en marketing con IA. Busca datos recientes de mercado y competencia, ayuda con posicionamiento, publicidad y contenido y dice qué medir y cuándo ver resultados.',
  h1: 'Alexandra — experta en marketing con IA: análisis de la competencia y plan de marketing',
  lead: 'La publicidad se come el presupuesto y las consultas de clientes no aumentan. Alexandra le preguntará primero qué vende y a quién, buscará datos recientes del mercado y la competencia y le propondrá pasos con resultados que se pueden medir.',
  card: 'Mercado y competencia con datos recientes, posicionamiento, publicidad, contenido. Le dice qué medir y cuándo esperar resultados.',
  cta: 'Hablar con Alexandra',
  situations: [
    'Abre un estudio o una tienda y quiere saber cómo diferenciarse de la competencia de la calle de al lado.',
    'Los clientes solo llegan por recomendación y no sabe con qué publicidad empezar.',
    'Lleva las redes sociales, pero las publicaciones no le traen ni una sola consulta.',
    'Lanza un producto nuevo y está eligiendo el nombre y el tono con el que hablar de él.',
    'Quiere saber qué está pasando en su nicho: precios, tendencias, qué competidores crecen y gracias a qué.',
  ],
  example: {
    question: 'Tengo un estudio de manicura en un barrio residencial. ¿Cómo consigo clientes nuevos sin un gran presupuesto?',
    answer: `Aquí Alexandra. En un barrio residencial, casi todas sus clientas viven a 10–15 minutos de usted. Por eso conviene invertir el presupuesto no en publicidad masiva, sino en hacerse visible cerca de casa y en que las clientas traigan a sus amigas.

1. Mapas: la fuente de clientes más barata
— Yandex Maps y 2GIS. Complete la ficha al 100%: fotos de los trabajos y del local, tarifas, reserva en línea, horario. Es justo ahí donde la gente busca «manicura cerca».
— Reseñas. Después de cada servicio, envíe a la clienta un enlace para dejar una reseña; también puede poner un código QR en el mostrador. …

2. Comunidades locales
— Chats de las comunidades de vecinos en Telegram y WhatsApp, grupos del barrio en VKontakte. No haga spam. Haga una oferta útil «para vecinos»: por ejemplo, un 15% de descuento en la primera visita con una palabra clave. De paso, la palabra clave le dirá de dónde ha venido la clienta.
…

4. El boca a boca, convertido en sistema
— Programa de recomendación «Trae a una amiga». Las dos reciben 500 ₽ para la próxima visita.
…

Qué medir
Pregunte a cada clienta nueva cómo llegó hasta usted y, una vez al mes, revise:
— cuántos clientes nuevos llegaron por cada canal;
— qué proporción vuelve (lo normal es a partir del 60%);
— cuánto le cuesta cada cliente nuevo.

Lo que da resultados más rápido: en 1–2 meses, lo que más se nota suelen ser los mapas con reseñas, los chats del barrio y el programa de recomendación.

Para afinar el plan, dígame qué ciudad y qué barrio son, cuántas manicuristas tiene, cuál es el ticket medio y cuántas clientas recibe ahora al mes. Así le preparo un plan paso a paso para un mes y miro qué hace la competencia cerca de usted.`,
  },
  can: [
    'Analiza el mercado y la competencia con datos recientes: busca en internet cifras actuales, tendencias y casos reales en lugar de repetir información desfasada.',
    'Ayuda con el posicionamiento y la propuesta única de venta: en qué se diferencia usted y por qué deberían elegirle.',
    'Diseña la estrategia de contenido y el embudo: redes sociales, blog, newsletters, vídeo y el recorrido del cliente desde el primer contacto hasta la compra.',
    'Analiza la publicidad en redes sociales y en buscadores, y sus métricas: coste de adquisición de cliente, LTV, ROAS, conversiones.',
    'Trabaja la marca: nombre, tono de voz, estilo visual. Propone mecánicas de crecimiento viral.',
    'Le da pasos concretos con resultados medibles: qué hacer, cómo medirlo y cuándo esperar el efecto.',
  ],
  cannot: [
    'No lanza campañas publicitarias ni gestiona el presupuesto de publicidad: eso lo hace usted o la agencia que tenga contratada.',
    'No garantiza consultas ni ventas: el resultado depende del producto, del precio y de la ejecución. Alexandra le dirá qué medir para saber a tiempo si un canal funciona.',
    'No elogia una idea floja por cortesía: le señalará sus puntos débiles con tacto, pero con honestidad.',
  ],
  faq: [
    {
      q: '¿De dónde saca Alexandra los datos del mercado?',
      a: 'Para analizar el mercado, la competencia y las tendencias, busca datos recientes en internet en lugar de fiarse de lo que el modelo aprendió durante su entrenamiento.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si Alexandra ya sabe a qué se dedica y para quién, no tendrá que volver a explicárselo a Ekaterina, la redactora.',
    },
    {
      q: '¿Quién verá mis conversaciones?',
      a: 'No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default alexandra;
