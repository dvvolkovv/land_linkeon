import type { AssistantPageText } from '../../types';

/**
 * Ирина — карьера самого человека. Перевод pages/ru/irina.ts.
 *
 * Не рекрутер: по инструкции вакансий не подбирает и людей на работу не ищет.
 * Найм, вакансии и вопросы к собеседованию на этой странице не обещать.
 */
const irina: AssistantPageText = {
  title: 'Orientadora profesional online: cambiar de profesión — Irina | Linkeon',
  description:
    'Irina, orientadora profesional online y asistente de IA de Linkeon. Si quiere cambiar de profesión, le ayuda a ver adónde ir: fortalezas, motivaciones y valores en el trabajo.',
  h1: 'Irina — orientadora profesional online: cambio de profesión y orientación vocacional para adultos',
  lead: 'Quiere dejar su trabajo, pero no sabe hacia dónde ir. Irina le hace las preguntas de una en una y le ayuda a ver qué le daba energía en el trabajo, qué se la quitaba y qué dirección se desprende de ahí.',
  card: 'Repasa su experiencia, sus fortalezas y sus motivaciones, y le ayuda a ver hacia dónde avanzar en su vida profesional.',
  cta: 'Hablar con Irina',
  situations: [
    'Lleva muchos años en la misma profesión, cada vez le quedan menos fuerzas para ella y no sabe a qué dedicarse en su lugar.',
    'Le ofrecen un ascenso a un puesto de responsable y no tiene claro si quiere tener personas a su cargo.',
    'Tiene currículum, pero no sabe explicar cuáles son sus puntos fuertes ni por qué dejó sus trabajos anteriores.',
    'Se plantea dejar la oficina para hacerse freelance o emprender, y quiere saber si ese formato encaja con usted.',
    'Vuelve a trabajar después de un largo parón y no sabe por dónde empezar.',
    'Ha cambiado tres veces de trabajo en dos años y quiere entender qué falló cada vez.',
  ],
  example: {
    question:
      'Llevo ocho años trabajando de contable y siento que estoy quemada. Quiero cambiar de profesión, pero no sé hacia qué.',
    answer: `Gracias por contármelo. Ocho años en una misma profesión son mucha experiencia. Estar quemada a menudo no indica que usted «no esté en su sitio», sino que algo importante del trabajo ha dejado de llenarla.

No nos precipitemos al elegir una nueva profesión. Primero veamos qué es exactamente lo que la agota y qué le sigue dando fuerzas. Así la dirección se verá más clara y no se llevará el mismo cansancio al nuevo trabajo.

Empecemos con una pregunta sencilla:

Piense en su último año o dos de trabajo. ¿Hubo tareas o momentos en los que sintiera interés, implicación o, simplemente, que «el tiempo volaba»? ¿Cuáles fueron?

Si casi no hubo momentos así, dígalo tal cual. También es importante.`,
  },
  can: [
    'Repasa su experiencia con una pregunta cada vez: qué tareas le daban energía, qué le cansaba, por qué cambió de trabajo.',
    'Le ayuda a ver sus fortalezas (competencias profesionales y cualidades personales) sin juicios ni etiquetas.',
    'Aclara qué le mueve en el trabajo y qué no encaja con usted en absoluto: valores, motivaciones, entorno laboral, forma de relacionarse con la gente.',
    'Si le envía su currículum, destaca las competencias clave y le pregunta por lo que no se ve en él: por qué tomó unas decisiones y no otras.',
    'Hace la síntesis final: un retrato suyo como profesional y varias direcciones que vale la pena considerar, con posibles puestos y formatos de trabajo.',
  ],
  cannot: [
    'No es una reclutadora: no busca ofertas de empleo ni ayuda a contratar personal. Irina trabaja con su propia carrera.',
    'No decide por usted. Le propone direcciones para que las valore; la elección sigue siendo suya.',
    'No sustituye a un psicólogo ni a un médico: si el cansancio dura meses y afecta a su salud, es motivo para acudir a ellos.',
  ],
  faq: [
    {
      q: '¿Cómo es la conversación?',
      a: 'Irina hace las preguntas de una en una y primero escucha: sobre su último trabajo, sobre las tareas que le daban energía y sobre lo que le cansaba. Después concreta los detalles y lo reúne todo en una visión de conjunto: fortalezas, motivaciones, lo que no encaja con usted y qué direcciones vale la pena considerar.',
    },
    {
      q: '¿Hace falta currículum?',
      a: 'No. Si lo tiene, envíelo en un archivo: Irina empezará por ahí y le preguntará por lo que no aparece en él. Si no, empezará por su experiencia más reciente y sus objetivos.',
    },
    {
      q: '¿En qué se diferencia Irina de un reclutador?',
      a: 'Un reclutador busca a una persona para una vacante. Irina va en sentido contrario: le ayuda a entender qué trabajo encaja con usted. No ofrece vacantes.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿Quién verá mis respuestas?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si ya ha explorado sus valores con Olia, Irina no tendrá que empezar de cero. No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default irina;
