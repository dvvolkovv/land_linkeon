import type { AssistantPageText } from '../../types';

/** Анна — бухгалтер. Перевод pages/ru/anna.ts. Пример разговора — docs/assistant-pages/examples/anna.md. */
const anna: AssistantPageText = {
  title: 'Contable con IA: impuestos de autónomos y empresas — Anna | Linkeon',
  description:
    'Anna, contable con IA. Calcula impuestos y cotizaciones; explica el IVA, los plazos y los regímenes fiscales rusos: USN, patente, autoempleo. 25.000 tokens al registrarse.',
  h1: 'Anna — contable con IA online: los impuestos de autónomos y empresas, explicados con sencillez',
  lead: 'La carta de Hacienda llegó el viernes a última hora y su contable no responde hasta el lunes. Anna le explica con palabras sencillas qué le piden, cuánto tiene que pagar y hasta qué fecha. Por defecto trabaja con la normativa fiscal rusa; si su negocio está en otro país, dígaselo.',
  card: 'Impuestos y cotizaciones en Rusia: USN, patente, autoempleo, IVA, para autónomos y empresas. Calcula con sus cifras, sin jerga contable.',
  cta: 'Hablar con Anna',
  situations: [
    'Es autónomo en el régimen simplificado ruso (USN) y no tiene claro cuánto puede rebajar el impuesto con las cotizaciones.',
    'Se da de alta por primera vez y duda entre el régimen de autoempleo, hacerse autónomo con el USN o acogerse al régimen de patente.',
    'Hacienda le ha enviado un requerimiento para que aclare su declaración y no sabe qué responder.',
    'Va a contratar a su primer empleado y quiere saber qué retenciones del impuesto sobre la renta y qué cotizaciones tendrá que pagar por él.',
    'Sus ingresos crecen y no sabe a partir de qué cifra tendrá que pagar IVA con el USN.',
  ],
  example: {
    question:
      'Soy autónomo y tributo por el régimen simplificado sobre ingresos (USN). Este año facturaré unos 3 millones de rublos. ¿Qué impuestos y cotizaciones tengo que pagar, y cuándo?',
    answer: `Si no tiene empleados, con unos ingresos de 3 millones de rublos en 2026, las cuentas salen así.

Qué pagar

Cotizaciones fijas «por cuenta propia» — 57.390 ₽ — hasta el 28/12/2026
1% de los ingresos que superen 300.000 — (3.000.000 − 300.000) × 1% = 27.000 ₽ — hasta el 01/07/2027
USN 6% — 180.000 ₽ antes de descontar las cotizaciones — pagos a cuenta y liquidación final según el calendario de abajo

El impuesto se puede reducir en el importe de todas las cotizaciones, hasta el 100%. Lo pueden hacer los autónomos sin empleados.
Impuesto: 180.000 − 57.390 − 27.000 = 95.610 ₽.
Con las cotizaciones, la carga total ≈ 180.000 ₽, es decir, alrededor del 6% de los ingresos.

Calendario
— Los pagos a cuenta del USN vencen el 28 de abril, el 28 de julio y el 28 de octubre. …
— La notificación del pago a cuenta se presenta hasta el día 25 de ese mismo mes. La próxima, preséntela hasta el 26/10/2026 (el 25 cae en domingo) y pague hasta el 28/10/2026 lo correspondiente a 9 meses.
— El impuesto del año, hasta el 28/04/2027. La declaración, hasta el 25/04/2027. …

Importante
— No tiene que pagar IVA. En 2026, los autónomos en el USN están exentos de IVA con ingresos de hasta 20 millones de rublos. En 2027 el umbral será de 15 millones, y en 2028, de 10 millones.
…

Si quiere, puedo calcular los importes exactos de los pagos a cuenta por trimestre. Para eso, envíeme sus ingresos de cada trimestre.`,
  },
  can: [
    'Calcula impuestos y cotizaciones con sus cifras en los regímenes rusos: simplificado (USN) sobre «ingresos» y sobre «ingresos menos gastos», patente, autoempleo, régimen general.',
    'Explica el IVA, el impuesto sobre beneficios, el impuesto sobre la renta de las personas físicas y las cotizaciones sociales, también las de los empleados.',
    'Resuelve dudas de contabilidad y documentación: asientos, balance, estados contables según las normas rusas (RSBU), justificantes, gestión de caja.',
    'Le indica cómo responder a Hacienda y a los organismos de la seguridad social, y le ayuda con nóminas y personal a nivel básico.',
    'Busca formas legales de pagar menos y le avisa si una norma ha cambiado hace poco.',
    'Si la pregunta admite varias respuestas, primero le pregunta por su régimen fiscal y la forma jurídica de su negocio.',
  ],
  cannot: [
    'No presenta declaraciones ni lleva la contabilidad por usted. Anna es asesora, no auditora: sus respuestas tienen carácter informativo.',
    'No sugiere esquemas que infrinjan la legislación fiscal.',
    'No sustituye a un contable ni a un abogado en una situación complicada. Si no se puede prescindir de ellos, Anna se lo dirá sin rodeos.',
  ],
  faq: [
    {
      q: '¿Según las leyes de qué país responde Anna?',
      a: 'Por defecto, según las de Rusia: la legislación fiscal rusa y las normas contables rusas (RSBU). Si su negocio está en otro país, dígale cuál y Anna lo tendrá en cuenta.',
    },
    {
      q: '¿Puedo enviar un extracto o una declaración en un archivo?',
      a: 'Sí, en PDF, como hoja de cálculo o como documento. El archivo se lee entero, y Anna hace las cuentas con sus cifras.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si Anna ya sabe a qué se dedica y cuánto factura, no tendrá que volver a explicárselo a Vitali, el director financiero.',
    },
    {
      q: '¿Quién verá mis cifras?',
      a: 'No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default anna;
