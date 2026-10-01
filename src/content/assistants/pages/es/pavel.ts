import type { AssistantPageText } from '../../types';

/** Павел — продажи. Перевод pages/ru/pavel.ts. */
const pavel: AssistantPageText = {
  title: 'Guiones de venta y manejo de objeciones — Pável | Linkeon',
  description:
    'Pável, experto en ventas con IA. Respuestas listas para «es caro», «lo pensaré» y «envíeme una propuesta», y análisis frase a frase de sus chats. 25.000 tokens al registrarse.',
  h1: 'Guiones de venta y manejo de objeciones: Pável le dice qué responder al cliente',
  lead: 'Le llegan consultas, pero muy pocos clientes acaban pagando. Pável encuentra dónde se pierden los clientes y le da una frase que puede decirles palabra por palabra hoy mismo.',
  card: 'Guiones, respuestas a «es caro» y «lo pensaré», negociación, embudo. Le da frases para decirle al cliente palabra por palabra.',
  cta: 'Hablar con Pável',
  situations: [
    'Tras darle el precio, el cliente escribe «es caro» y desaparece.',
    'Le piden «envíeme una propuesta» y, en cuanto la envía, la conversación se corta.',
    'Hace un mes un cliente «se fue a pensarlo» y no sabe cómo escribirle sin parecer insistente.',
    'En la negociación le piden un descuento y usted cede sin recibir nada a cambio.',
    'Va a contratar a su primer vendedor y no sabe qué carga de trabajo ni qué incentivos darle.',
  ],
  example: {
    question: 'Los clientes dicen «es caro» y se van a pensarlo. ¿Cómo lo manejo?',
    answer: `«Es caro, lo pensaré» casi nunca significa que al cliente de verdad le parezca caro. Normalmente significa que no ha visto qué obtiene a cambio de su dinero, o que le queda un motivo que no ha dicho. Por eso discutir el precio no sirve de nada. Primero hay que averiguar qué quiere decir.

1. Justo en el momento del «es caro»

No se justifique ni ofrezca un descuento. Haga una pregunta:

«Entiendo. ¿Caro en comparación con qué? ¿Con otra oferta o con el presupuesto que tenía previsto?»

…

2. Si dice «lo pensaré»

No lo deje ir enseguida, pero tampoco lo presione. Hay que averiguar qué es exactamente lo que quiere pensarse:

«Claro, es una decisión importante. Para ponérselo más fácil: ¿qué es lo que más le frena ahora mismo? ¿El precio, los plazos, la duda de si funcionará en su caso, o que tiene que consultarlo con alguien?»

…

3. Si el cliente deja de responder

A los 3–5 días, no escriba «¿Qué, lo ha pensado?». Escriba algo a lo que sea fácil responder:

«Buenos días, Iván. No quiero meterle prisa. Dígame en una palabra qué se acerca más: 1) sigue en pie, necesito más tiempo; 2) el precio no me convence; 3) ya no me interesa. Cualquier respuesta me sirve».

…

Qué hacer hoy: haga una lista de quienes «se fueron a pensarlo» el último mes y envíeles el mensaje del punto 3.

¿Qué vende y en qué momento suele aparecer el «es caro»: nada más dar el precio o después de enviar la propuesta? Mándeme un fragmento real de la conversación y lo analizo frase a frase.`,
  },
  can: [
    'Le da frases listas para usar, en estilo directo: el primer mensaje, cómo decir el precio, qué responder a «es caro», «lo pensaré» y «envíeme una propuesta».',
    'Analiza su conversación con un cliente, su propuesta comercial o la transcripción de una llamada: qué se dijo y qué habría convenido decir.',
    'Encuentra dónde se rompe el embudo y calcula cuántas consultas necesita para cumplir el objetivo y qué aporta mejorar la conversión de una sola etapa.',
    'Le prepara para negociar: cómo regatear, qué pedir a cambio de una concesión, cómo llevar una venta en la que deciden varias personas.',
    'Le sugiere qué ofrecer en lugar de un descuento y cómo recuperar a un cliente que ha dejado de responder sin suplicarle.',
    'Ayuda a poner en marcha un departamento de ventas: qué carga de trabajo asignar, qué medir, qué incentivos dar al primer vendedor.',
  ],
  cannot: [
    'No enseña a presionar, a mentir sobre la escasez ni a inventarse un «solo hoy»: esas tácticas arruinan las ventas repetidas.',
    'No promete tasas de conversión. Cualquier cifra es una referencia del sector, con sus salvedades.',
    'No le trae clientes. Cómo conseguir consultas es cosa de Alexandra, la experta en marketing; Pável trabaja con los que ya han llegado.',
    'No sustituye a un abogado: el contrato, las condiciones de venta y la devolución de anticipos son cosa de Alexéi.',
  ],
  faq: [
    {
      q: '¿Para qué mercado son los consejos de Pável?',
      a: 'Por defecto, para el mercado ruso: mensajería en lugar de llamadas, largos procesos de aprobación, desconfianza hacia el pago por adelantado, licitaciones. Si vende en otro país, dígale cuál: el embudo y las respuestas a las objeciones se construyen igual, pero los hábitos de los compradores de allí conviene contrastarlos con alguien que conozca ese mercado.',
    },
    {
      q: '¿Puedo enviar mi conversación con un cliente?',
      a: 'Sí, como texto o en un archivo, y Pável la analizará frase a frase. No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
    {
      q: '¿Pável me ayudará a vender cualquier cosa?',
      a: 'No. Si el producto no resuelve el problema del cliente, Pável le dirá que el problema no está en las ventas: vender un producto así solo acelerará las devoluciones y dañará su reputación.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si Alexandra ya sabe quiénes son sus clientes, no tendrá que volver a explicárselo a Pável.',
    },
  ],
};

export default pavel;
