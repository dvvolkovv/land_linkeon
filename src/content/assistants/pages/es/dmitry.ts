import type { AssistantPageText } from '../../types';

/**
 * Дмитрий — технический директор. Перевод pages/ru/dmitry.ts.
 *
 * «Три месяца и шесть миллионов» передано как «tres meses y un presupuesto
 * abultado»: сумма без валюты в испанском читается в евро или в песо и
 * теряет смысл «крупная смета».
 */
const dmitry: AssistantPageText = {
  title: 'CTO como servicio: director técnico externo — Dmitri | Linkeon',
  description:
    'Dmitri, asistente de IA que hace de director técnico externo. Revisa el presupuesto de su proveedor y le dice si contratar programadores o usar un servicio ya existente.',
  h1: 'Dmitri — director técnico externo para quienes no son desarrolladores',
  lead: 'Necesita desarrollar algo y no sabe cuánto debería costar. Dmitri le propone dos o tres opciones, de la más barata a la más sólida, y le dice qué tendrá que sacrificar a cambio de ahorrar.',
  card: 'Arquitectura, plazos y presupuestos, proveedores, primeros desarrolladores. Habla de decisiones y de sus consecuencias, no de tecnicismos.',
  cta: 'Hablar con Dmitri',
  situations: [
    'El proveedor le pide tres meses y un presupuesto abultado, y no sabe qué parte está justificada.',
    'Necesita incorporar a su primer desarrollador y no sabe cómo evaluarlo en la entrevista.',
    'La web se cayó un viernes por la noche y resultó que nadie hacía copias de seguridad.',
    'El proveedor ha dejado de responder, y el código y los accesos al servidor los tiene él.',
    'Los desarrolladores dicen que «hay que reescribirlo todo» y no sabe si creérselo.',
  ],
  example: {
    question:
      'Quiero una aplicación para que los clientes reserven cita en mi salón. ¿Contrato desarrolladores o uso un servicio ya hecho?',
    answer: `Use un servicio ya hecho. No merece la pena encargar un desarrollo propio para un solo salón: pagará cientos de veces más y tendrá un producto peor que los que ya hay en el mercado.

Opciones

DIKIDI
Puesta en marcha — 1 día
Coste — Hay un plan gratuito; los de pago, desde unos cientos de ₽/mes
Contrapartida — Poca analítica y poca automatización. …

YCLIENTS (el estándar del sector de la belleza en Rusia)
Puesta en marcha — 2–5 días
Coste — Unos 1.500–5.000 ₽/mes para 1–3 profesionales
Contrapartida — Paga todos los meses. Tiene muchos ajustes y la primera semana tendrá que dedicarla a entenderlos

Aplicación propia a medida
Puesta en marcha — 4–8 meses
Coste — 1,5–4 millones de rublos de desarrollo + 50.000–150.000 ₽/mes de mantenimiento
Contrapartida — Dinero, tiempo y dependencia del proveedor. …

Los precios de los servicios son orientativos y las tarifas cambian. Antes de elegir, compruébelos en sus webs.

…

El riesgo principal
Toda su base de clientes quedará guardada en el servicio. Compruebe desde el principio que se puede exportar a Excel: si se puede, no queda atado al servicio para siempre. Haga una exportación una vez al mes: esa es su copia de seguridad.

Qué hacer esta semana: regístrese en DIKIDI y en la prueba gratuita de YCLIENTS, y configure en los dos sus servicios y su equipo. Envíe el enlace de reservas a 5–10 clientas habituales y vea dónde les resulta más cómodo reservar. Al cabo de una semana, quédese con el servicio que más le haya gustado.

¿Cuántos profesionales tiene? De eso depende qué plan elegir.`,
  },
  can: [
    'Analiza especificaciones técnicas y propuestas de proveedores: qué parte de la estimación está justificada y cuál no.',
    'Compara opciones (servicio ya hecho, no-code, desarrollo propio) por plazo, orden de magnitud del coste y riesgos. Si basta con un servicio ya hecho, se lo dirá, aunque usted le haya preguntado cómo desarrollarlo.',
    'Ayuda a formar el equipo: a quién contratar primero, plantilla propia o externalización, cómo evaluar a un desarrollador si usted no es programador.',
    'Le ayuda con los proveedores: especificaciones técnicas, aceptación del trabajo, derechos sobre el código y accesos, la parte técnica del contrato.',
    'Analiza la deuda técnica, la fiabilidad y la seguridad: qué arreglar ya y qué puede esperar, qué hacer cuando todo se cae, cómo guardar los datos personales y a quién dar acceso.',
  ],
  cannot: [
    'No presenta una estimación de plazos como una promesa: toda estimación es un rango con supuestos, y Dmitri le dirá qué podría desbaratarla.',
    'No sustituye una auditoría de seguridad ni garantiza la protección. Le dirá dónde están los riesgos y qué los reduce sin gastar mucho.',
    'No dirige el proyecto por usted: es usted quien asigna las tareas a los desarrolladores y quien da el visto bueno al trabajo.',
    'No sustituye a un abogado ni a un experto en finanzas: la redacción jurídica del contrato es cosa de Alexéi; la rentabilidad, de Vitali.',
  ],
  faq: [
    {
      q: '¿Hace falta saber de tecnología?',
      a: 'No. Dmitri habla de decisiones y de sus consecuencias, y cuando un término técnico es inevitable, lo explica entre paréntesis.',
    },
    {
      q: '¿Puedo enviar las especificaciones técnicas o el presupuesto de un proveedor?',
      a: 'Sí, en PDF o como documento. El archivo se lee entero. Dmitri le dirá qué está justificado en la estimación, qué falta y qué debería incluir el contrato en la parte técnica.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si Andréi ya sabe a qué se dedica su negocio, no tendrá que volver a explicárselo a Dmitri.',
    },
  ],
};

export default dmitry;
