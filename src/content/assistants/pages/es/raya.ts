import type { AssistantPageText } from '../../types';

/** Райя — дизайн человека. Перевод pages/ru/raya.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const raya: AssistantPageText = {
  title: 'Diseño Humano: lectura del bodygraph online — Raya | Linkeon',
  description:
    'Raya calcula su Diseño Humano a partir de la fecha, la hora y el lugar de nacimiento con Swiss Ephemeris y le explica qué significan su tipo, estrategia, autoridad y perfil.',
  h1: 'Lectura de Diseño Humano: Raya calcula e interpreta su bodygraph',
  lead: 'Hacen falta la fecha, la hora exacta y la ciudad de nacimiento. Raya calcula la carta con Swiss Ephemeris y le explica qué significan en la práctica su tipo, su estrategia y su autoridad.',
  card: 'Calcula el bodygraph a partir de la fecha, la hora y el lugar de nacimiento y explica el tipo, la estrategia y la autoridad.',
  cta: 'Hablar con Raya',
  situations: [
    'Ha oído hablar del Diseño Humano y quiere conocer su tipo y su estrategia.',
    'Ya sacó su carta en una calculadora gratuita, pero no entiende qué significan los centros y los canales.',
    'Le cuesta tomar decisiones y quiere entender su autoridad: en qué apoyarse a la hora de elegir.',
    'Solo conoce su hora de nacimiento aproximada y quiere saber en qué influye eso.',
    'Quiere analizar la carta de su hijo o de su pareja.',
  ],
  example: {
    question: 'Calcule mi Diseño Humano: 14 de marzo de 1990, 07:30, Kazán. ¿Cuál es mi tipo y mi estrategia?',
    answer: `Lo he calculado con Swiss Ephemeris. He pasado la hora a UTC así: en marzo de 1990, en Kazán regía la hora de invierno de Moscú, UTC+3, de modo que las 07:30 locales = 04:30 UTC.

Su carta

Tipo — Manifestador
Estrategia — Informar a las personas a las que afectará su decisión antes de actuar
Autoridad — Emocional (Plexo Solar)
Perfil — 1/3: Investigador / Mártir

…

Qué significa en la práctica
— Informar no es pedir permiso. Es un breve «voy a hacer X». Eso elimina la resistencia de los demás, con la que los Manifestadores se encuentran a menudo.
— Autoridad emocional: no decida en el pico de la emoción, ni en la subida ni en la bajada. La decisión correcta llega cuando la ola se ha calmado. Ayuda la regla de «consultarlo con la almohada».
…

Experimento de 7 días
Antes de cada acción relevante, ya sea una decisión de trabajo, una compra o una conversación importante, avise brevemente a quienes les afecte. Pero solo cuando la emoción se haya asentado, como mínimo al día siguiente. Por la noche, anote cuánta resistencia y cuánta ira hubo en comparación con lo habitual.

Si ya ha mirado su carta en jovianarchive.com o mybodygraph.com, dígame qué le salió y lo cotejo.`,
  },
  can: [
    'Calcula la carta con Swiss Ephemeris, no «a ojo»: pasa la hora de nacimiento a UTC teniendo en cuenta el huso horario y el horario de verano de aquellos años.',
    'Explica el tipo, la estrategia, la autoridad, el perfil y la definición: qué centros están abiertos, qué aportan los canales clave, hacia dónde apunta la cruz de encarnación.',
    'Le propone un experimento de siete días basado en su estrategia y su autoridad.',
    'Si le envía su carta de jovianarchive.com o mybodygraph.com, la coteja con su propio cálculo y le dice claramente si los resultados no coinciden.',
    'Analiza la carta de la persona por la que pregunta (la suya, la de su hijo, la de su pareja) y no la confunde con otras.',
  ],
  cannot: [
    'No predice el destino ni acontecimientos: aquí el Human Design es una herramienta de autoconocimiento, no una predicción.',
    'No da recomendaciones médicas ni financieras y no sustituye a un médico, un abogado ni un asesor financiero.',
    'No se inventa la hora de nacimiento: si no la tiene, le dirá que no se puede hacer un cálculo exacto.',
  ],
  faq: [
    {
      q: '¿Qué hace falta para el cálculo?',
      a: 'La fecha, la hora exacta y la ciudad de nacimiento. Una diferencia de solo 15–30 minutos puede cambiar el perfil y, a veces, el tipo y la autoridad.',
    },
    {
      q: '¿Es astrología?',
      a: 'No, aunque el cálculo también se basa en la posición de los planetas. Aquí eso es solo un sistema de coordenadas; la interpretación se hace a través de 64 puertas, 9 centros y 36 canales. Raya trabaja en la escuela clásica de Ra Uru Hu.',
    },
    {
      q: '¿En qué se diferencia de una calculadora o de un chatbot corriente?',
      a: 'Una calculadora genera la carta y da descripciones genéricas. Raya analiza su propia carta y le propone un experimento basado en su estrategia. Además, los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos.',
    },
    {
      q: '¿Y si tengo dudas sobre el Human Design?',
      a: 'Raya no intentará hacerle cambiar de opinión. Le propondrá un experimento de siete días: poner a prueba la estrategia con su propia experiencia y sacar sus propias conclusiones.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
  ],
};

export default raya;
