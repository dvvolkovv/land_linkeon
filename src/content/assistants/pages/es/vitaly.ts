import type { AssistantPageText } from '../../types';

/** Виталий — финансовый директор. Перевод pages/ru/vitaly.ts. Пример разговора — docs/assistant-pages/examples/vitaly.md. */
const vitaly: AssistantPageText = {
  title: 'Director financiero online y modelo financiero — Vitali | Linkeon',
  description:
    'Vitali, director financiero online. Crea el modelo financiero y la previsión de flujo de caja, calcula economía unitaria y punto de equilibrio y ayuda con el presupuesto personal.',
  h1: 'Vitali — director financiero online: modelo financiero, flujo de caja y finanzas personales',
  lead: 'La facturación crece, pero no hay dinero en la cuenta; o lleva tres años sin conseguir ahorrar un colchón. Vitali hace estas cuentas con sus cifras y le muestra dos o tres escenarios, cada uno con sus supuestos y su riesgo principal.',
  card: 'Finanzas de empresa y personales: flujo de caja, economía unitaria, modelo financiero, régimen fiscal, colchón y ahorro.',
  cta: 'Hablar con Vitali',
  situations: [
    'El banco o un inversor le pide un modelo financiero y usted solo tiene la facturación mes a mes.',
    'La facturación ha crecido y toca decidir: seguir en el régimen simplificado (USN) al 6%, pasarse al 15% o crear una sociedad limitada.',
    'La publicidad trae compradores, pero no sabe si cada uno de ellos sale rentable.',
    'No sabe de qué forma pagarse: con un sueldo, con dividendos o dejando el dinero en el negocio.',
    'Tiene dinero disponible y una tarjeta de crédito al 30%, y no sabe qué hacer primero: liquidar la deuda o invertir.',
  ],
  example: {
    question:
      'Tengo una tienda online: la facturación crece, pero nunca hay dinero en la cuenta. ¿Cómo averiguo adónde se va?',
    answer: `Casi siempre la causa es que el beneficio y el dinero en la cuenta son cosas distintas. En un comercio minorista que crece, el dinero suele irse al stock y al desfase entre lo que se paga al proveedor y lo que se cobra al cliente. Se puede comprobar en una tarde.

Paso 1. Estado de flujos de caja de 6–12 meses

Descargue los extractos de todas las cuentas y asigne cada pago a una partida. …

Paso 2. Dónde suele perderse el dinero en una tienda online

1. El stock. Cuando crece, compra pensando en las ventas futuras, y el beneficio se convierte en mercancía en el almacén. …
2. El ciclo de caja. Se calcula así: días de rotación del inventario + días de espera del cobro del marketplace o de la pasarela de pago − días de aplazamiento del pago al proveedor. Por ejemplo, 60 + 14 − 0 = 74 días. Cada rublo de facturación queda congelado 74 días, así que cuanto más rápido crece, más dinero necesita.
…

Paso 3. Tres comprobaciones rápidas

— El valor del stock (a precio de compra) ahora y hace un año. Si ha crecido más o menos en la misma cantidad que el dinero «desaparecido», ahí tiene la respuesta.
…

Envíeme el extracto de la cuenta (Excel o PDF) y el informe de stock de los últimos seis meses. Asignaré los pagos a sus partidas, calcularé su ciclo de caja y le mostraré cuánto dinero está ya congelado y cuánto lo estará al ritmo de crecimiento actual. …`,
  },
  can: [
    'Elabora la previsión de flujo de caja, el presupuesto y el modelo financiero, y analiza la cuenta de pérdidas y ganancias.',
    'Calcula la economía unitaria, el punto de equilibrio y el retorno de la inversión: cuánto le cuesta un comprador y con qué ticket medio empieza a ganar dinero.',
    'Compara regímenes fiscales y formas jurídicas con su facturación, y le ayuda a decidir si pagarse un sueldo o dividendos.',
    'Ordena las finanzas personales: presupuesto familiar, colchón para 3–12 meses, ahorro para una vivienda o para estudios, deducciones fiscales.',
    'Hace los cálculos con código, no «a ojo», y le da un escenario base, uno optimista y uno pesimista.',
    'Lee de un archivo el extracto bancario, la cuenta de resultados (P&L) o el libro de ingresos y gastos, y traza gráficos: flujo de caja, estructura de gastos, comparación de escenarios.',
  ],
  cannot: [
    'No le recomienda comprar una acción o un fondo concretos: Vitali no es asesor de inversiones. Habla de principios: clases de activos, distribución, riesgo, horizonte.',
    'No garantiza resultados: cualquier previsión es un modelo con supuestos, y Vitali le dice cuál es el principal.',
    'No trabaja con esquemas de evasión fiscal: solo con optimización legal.',
  ],
  faq: [
    {
      q: '¿Para qué país hace los cálculos Vitali?',
      a: 'Por defecto, para Rusia: régimen simplificado, patente, autoempleo, cuentas de inversión individuales (IIS), deducciones fiscales. También puede calcular en dólares o en euros. Si su negocio está en otro país, dígale cuál: el flujo de caja se calcula igual, pero los impuestos locales compruébelos con un especialista de ese país.',
    },
    {
      q: '¿En qué se diferencia Vitali de un contable?',
      a: 'La contabilidad (asientos, declaraciones, nóminas) es cosa de la contable Anna. Vitali se ocupa de las decisiones de futuro: qué supone una operación para el flujo de caja y hacia dónde avanzar. Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿Quién verá mis cifras?',
      a: 'No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default vitaly;
