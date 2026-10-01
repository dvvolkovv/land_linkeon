import type { AssistantPageText } from '../../types';

/** Роман — личный ассистент. Перевод pages/ru/roman.ts. Пример разговора — docs/assistant-pages/examples/roman.md. */
const roman: AssistantPageText = {
  title: 'Asistente personal de IA online para cualquier tarea — Román | Linkeon',
  description:
    'Román, asistente personal de IA. Un correo, una propuesta comercial, un plan o una duda que mezcla derecho, impuestos y marketing: lo resuelve él. 25.000 tokens al registrarse.',
  h1: 'Román — asistente personal de IA para cualquier tarea',
  lead: 'Una propuesta comercial para el viernes, un correo que lleva tres días aplazando, una duda que no sabe a quién plantear. Cuénteselo a Román con sus palabras: le responderá él mismo y, donde haga falta, recurrirá a lo que sabe un abogado, un contable o alguien de marketing.',
  card: 'Se encarga de cualquier tarea. Una duda sobre un contrato, impuestos o publicidad la resuelve él, con lo que sabe el especialista adecuado.',
  cta: 'Hablar con Román',
  situations: [
    'Un cliente lleva dos meses sin pagar una factura y hace falta un correo: educado, pero de los que consiguen que pague.',
    'Lanza un servicio nuevo y le llueven las preguntas: qué contrato firmar con los clientes, qué impuesto pagar, dónde buscar a los primeros compradores.',
    'Una pregunta de cinco minutos sobre una deducción fiscal, la devolución de un producto o una cláusula del contrato, y no sabe a quién hacérsela.',
    'Para la reunión necesita una presentación; para el post, una imagen. Y quiere el archivo terminado, no solo un consejo.',
    'Tiene la semana planificada al minuto y quiere organizar las tareas para que lo importante no se pierda entre pequeñeces.',
  ],
  example: {
    question:
      'Para el viernes tengo que preparar una propuesta comercial para un cliente nuevo, un estudio de yoga. ¿Por dónde empiezo?',
    answer: `El viernes ya es mañana, así que empecemos por lo principal.

Hoy, 30–40 minutos: reúna la información de partida
1. Cómo es el estudio: tamaño, número de salas y de profesores, quiénes son sus clientes, si las clases son online o presenciales.
2. Qué problemas tienen: pocos clientes nuevos, la gente no renueva el abono, caos con las reservas, redes sociales flojas.
…

Estructura de la propuesta (5–7 páginas, no más)
1. El objetivo del cliente, con sus propias palabras: «Ustedes quieren…».
…
5. Precio. Mejor 2–3 paquetes: básico, óptimo y ampliado. Así el cliente elige entre opciones en lugar de decidir «sí o no».
…

Para un estudio de yoga
— Tono tranquilo y cálido, sin venta agresiva.
…
— Demuestre que entiende su negocio: abonos, retención de clientes, estacionalidad (bajón en verano, subidas en septiembre y enero).

Para tenerlo listo el viernes: hoy reúna la información y haga un borrador; mañana por la mañana, revíselo y envíelo.

Para que el plazo no se le pase, he creado la tarea «Enviar la propuesta al estudio de yoga» para mañana a las 12:00. … Si le viene mejor otra hora, dígamelo.

Lo que puedo hacer a continuación: escríbame qué le vende al estudio (marketing, una web, equipamiento, contabilidad u otra cosa) y qué sabe ya del cliente. Le preparo el texto completo de la propuesta y, si quiere, lo maqueto como documento o presentación.`,
  },
  can: [
    'Se encarga de cualquier tarea: un correo, una propuesta comercial, un plan, un texto, una idea. Da una respuesta concreta y práctica: qué hacer y por dónde empezar.',
    'Se apoya en lo que saben los especialistas de Linkeon: derecho, impuestos, marketing, redacción, estrategia de negocio, carrera profesional, coaching.',
    'Reúne en una sola respuesta una tarea que toca varios temas: por ejemplo, el contrato, los impuestos y la publicidad de un servicio nuevo.',
    'Entrega el resultado en un archivo, crea imágenes a partir de una descripción y busca en internet cuando la tarea lo pide.',
  ],
  cannot: [
    'No sustituye a un abogado, un contable u otro especialista cuando hacen falta su firma y su responsabilidad. Las respuestas de Román son informativas; la decisión es suya.',
    'No firma documentos ni paga por usted: el contrato lo firma usted y las transferencias las hace usted.',
  ],
  faq: [
    {
      q: '¿Con qué tareas puedo acudir a Román?',
      a: 'Con cualquiera: desde un correo o el plan de la semana hasta una pregunta en la que se mezclan contrato, impuestos y publicidad. Si no sabe a qué asistente acudir, empiece por Román.',
    },
    {
      q: '¿Román sabe de derecho y de impuestos?',
      a: 'Esas preguntas las responde él mismo, con lo que sabe el especialista adecuado: las jurídicas, como lo haría el abogado Alexéi; las financieras, como la contable Anna. Si quiere hablar con ellos directamente, no tendrá que repetir nada: los asistentes de Linkeon comparten un mismo perfil, y lo que le cuenta a uno lo saben todos.',
    },
    {
      q: '¿Puedo enviar un archivo o dictar?',
      a: 'Sí. Román lee enteros los PDF, las hojas de cálculo y los documentos, y, si no quiere escribir, puede dictar.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿Quién verá mis conversaciones?',
      a: 'No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default roman;
