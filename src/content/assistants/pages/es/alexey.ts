import type { AssistantPageText } from '../../types';

/** Алексей — юрист. Перевод pages/ru/alexey.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const alexey: AssistantPageText = {
  title: 'Abogado con IA online y revisión de contratos — Alexéi | Linkeon',
  description:
    'Alexéi, abogado con IA online. Revisa su contrato y le explica según la ley qué hacer ante un alquiler, un despido, un divorcio o una herencia. 25.000 tokens al registrarse.',
  h1: 'Alexéi — abogado con IA online: revisión de contratos y consultas legales',
  lead: 'Es tarde, el contrato se firma mañana y no hay a quién preguntar. Alexéi le explica con palabras sencillas dónde están los riesgos y qué dice la ley al respecto.',
  card: 'Contratos, alquiler, trabajo, familia, herencias. Explica la ley con palabras sencillas y le dice qué hacer, paso a paso.',
  cta: 'Hablar con Alexéi',
  situations: [
    'Un contratista le ha enviado un contrato y no sabe qué riesgo supone la cláusula de penalización.',
    'Le proponen irse «de mutuo acuerdo» y todavía no le han pagado el sueldo del mes pasado.',
    'La tienda no le devuelve el dinero de un aparato que se averió a la semana.',
    'Le ha llegado una herencia con deudas y no sabe si aceptarla o renunciar a ella.',
    'Un socio quiere salir de la sociedad limitada y exige que le paguen su parte en dinero.',
  ],
  example: {
    question:
      'El propietario quiere rescindir anticipadamente el contrato de alquiler del apartamento y no devolverme el depósito. ¿Qué puedo hacer?',
    answer: `¡Hola! Soy Alexéi. En resumen: el propietario no puede echarle sin más antes de tiempo y quedarse con el depósito. Mucho depende de lo que diga el contrato.

1. ¿Puede rescindir el contrato antes de tiempo?

Si alquila el apartamento como particular, se trata de un contrato de arrendamiento de vivienda (arts. 671–688 del Código Civil ruso).

— Unilateralmente no puede, salvo que el contrato lo permita de forma expresa (art. 310 del Código Civil ruso).
…
— Si no hay motivos, tiene derecho a seguir en el apartamento hasta que termine el plazo.

2. El depósito (pago en garantía)

El depósito se devuelve si no hay pagos pendientes ni daños en el apartamento (art. 381.1 del Código Civil ruso). … Si es el propietario quien rescinde el contrato, por regla general no tiene motivos para quedarse con el depósito. …

3. Qué hacer

1. Relea el contrato. Busque el plazo, la cláusula de rescisión anticipada y las condiciones de devolución del depósito.
2. No firme nada ni se vaya «por las buenas» hasta decidir en qué condiciones.
3. Comuníquese por escrito: por mensajería instantánea o por correo electrónico. Guarde los mensajes y los justificantes de pago.
…
5. Envíe una reclamación por carta certificada con inventario del contenido. Exija en ella la devolución del depósito (y, si quiere, que le compense los gastos de mudanza) en un plazo, por ejemplo, de 10 días.
6. Si no responde, presente una demanda. …

…

Para afinar más, responda a unas preguntas:
— ¿Por cuánto tiempo se firmó el contrato y tiene una cláusula de rescisión anticipada?
— ¿Qué dice el contrato sobre el depósito?
— ¿Qué motivo da el propietario para rescindirlo?
— ¿Necesita un modelo de reclamación? Puedo redactárselo.`,
  },
  can: [
    'Revisa y redacta contratos: encuentra las cláusulas de riesgo y explica cómo rescindir uno ya firmado.',
    'Ayuda en conflictos con una tienda o con quien le presta un servicio: qué exigir y cómo conseguir una compensación.',
    'Resuelve dudas sobre vivienda: alquiler, compra y donación de un apartamento, conflictos con la constructora por una compra sobre plano, inscripción de la propiedad.',
    'Responde sobre trabajo, familia y herencias: despido y salarios impagados, divorcio y reparto de bienes, pensión alimenticia, herencias con deudas.',
    'Ayuda a emprendedores: alta y baja como autónomo, creación y cierre de una sociedad limitada, estatutos, salida de un socio, contratos con clientes y proveedores.',
    'Cita artículos concretos del Código Civil, el Código del Trabajo y el Código de Familia de Rusia, y lo desglosa en pasos: qué hacer, en qué orden y qué documentos hacen falta.',
  ],
  cannot: [
    'No le representa ante los tribunales ni presenta documentos por usted. Alexéi es un asesor: sus respuestas tienen carácter informativo.',
    'No sustituye a un abogado colegiado en un asunto complejo, sobre todo si es penal. Si no hay más remedio que acudir en persona a un jurista o a un abogado, Alexéi se lo dirá sin rodeos.',
    'No le dice cómo saltarse la ley.',
  ],
  faq: [
    {
      q: '¿Según las leyes de qué país responde Alexéi?',
      a: 'Por defecto, según la legislación rusa: el Código Civil, el Código del Trabajo y el Código de Familia de Rusia, entre otras normas. Si su pregunta se refiere a otro país, dígale cuál y Alexéi lo tendrá en cuenta.',
    },
    {
      q: '¿Puedo enviar el contrato en un archivo?',
      a: 'Sí, en PDF o como documento. El archivo se lee entero, y Alexéi lo repasa cláusula a cláusula y le señala dónde están los riesgos.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si la contable Anna ya sabe que usted es autónomo, no tendrá que volver a explicárselo a Alexéi.',
    },
    {
      q: '¿Quién verá mis conversaciones?',
      a: 'No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default alexey;
