import type { AssistantPageText } from '../../types';

/**
 * Полина — тренер по образу жизни: сон, питание, движение, восстановление.
 * Перевод pages/ru/polina.ts. Не врач — так сказано в её промпте. 112 в русском
 * тексте сверен в образце Оли (docs/assistant-pages/samples-ru.md, МЧС
 * «Система-112»).
 *
 * Пример — docs/assistant-pages/examples/polina.md, целиком; снят только жирный.
 *
 * Перевод: российский номер 112 заменён на номер экстренной службы своей
 * страны — без цифр.
 */
const polina: AssistantPageText = {
  title: 'Cómo dormir mejor: coach de estilo de vida — Polina | Linkeon',
  description:
    'Polina, coach de estilo de vida. Le ayuda a ordenar el sueño, la alimentación y el movimiento en una semana apretada: un pequeño cambio cada vez, sin dietas ni gimnasio.',
  h1: 'Cómo dormir mejor y ordenar su rutina: Polina, coach de estilo de vida',
  lead: 'Sueño, comida, movimiento y descanso, pensados para una semana normal y apretada, no para un horario ideal. Polina le propone un pequeño cambio y, desde el principio, su versión para un mal día.',
  card: 'Sueño, comida, movimiento y descanso para una semana apretada. Un pequeño cambio cada vez, y su versión para un mal día.',
  cta: 'Hablar con Polina',
  situations: [
    'Se acuesta pasada la medianoche, se levanta a las siete y a mediodía ya no le quedan fuerzas.',
    'De día come a la carrera, y por la noche, lo primero que encuentra en la nevera.',
    'Quiere moverse más, pero no tiene ni tiempo ni fuerzas para el gimnasio.',
    'Cada lunes empieza una nueva vida, y el jueves ya no queda nada de ella.',
    'Una fecha de entrega, una mudanza o la enfermedad de un familiar, y su rutina de siempre se ha venido abajo.',
  ],
  example: {
    question: 'Me acuesto a la una de la madrugada, me levanto a las siete y me paso el día agotada. ¿Por dónde empiezo?',
    answer: `Parece que simplemente le falta sueño: de la una de la madrugada a las siete de la mañana salen unas seis horas. A mucha gente no le basta, y el cansancio a mediodía lo confirma. Empecemos con un solo cambio.

Acostarse 15 minutos antes, a las 0:45. El despertador, a las siete, como siempre. La hora de levantarse no la tocamos: una mañana estable sostiene toda la rutina. Solo movemos la hora de acostarse. Cuando pase una semana sin problemas, la adelanta otros 15 minutos.

Para que funcione, hace falta una señal de «vamos terminando». Ponga una alarma a las 0:30 con la etiqueta «apagamos». Cuando suene, baje la luz y guarde el portátil. El móvil puede seguir usándolo, pero ya en la cama.

Si el día es malo (se ha quedado hasta tarde, no le ha dado tiempo, le apetece «vivir un poco para usted»), simplemente acuéstese a las 0:45, aunque no lo haya terminado todo. No hace falta buscar el mejor resultado. Si un día falla, por la mañana no recuperamos nada y nos levantamos a la hora de siempre.

Cómo saber si funciona. Dentro de una semana, fíjese en si le cuesta menos levantarse al menos un día sí y otro no, y si después de comer le pesa menos el cuerpo. Si no hay ninguna diferencia, seguiremos buscando.

Esta noche, ponga la alarma «apagamos» a las 0:30.

¿Qué suele tenerla despierta hasta la una: las tareas pendientes, el trabajo, o es el único rato que tiene para usted misma?`,
  },
  can: [
    'Sueño: horarios, conciliar el sueño, despertares tempranos, turnos rotativos, recuperación tras dormir poco.',
    'Alimentación como rutina, no como dieta: regularidad, qué lleva el plato, tentempiés, agua, comer a la carrera.',
    'Movimiento sin gimnasio: la dosis más pequeña que funciona y cómo volver tras un largo parón.',
    'Energía: el cansancio a media jornada, el «no tengo fuerzas para nada» de la noche, la rutina en épocas difíciles.',
    'Propone un solo cambio, no una lista, y una señal para ver al cabo de una semana si funciona.',
    'Revisa el plan de entrenamiento o las recomendaciones que le envíe en un archivo, sin contradecir al profesional que le hace el seguimiento.',
  ],
  cannot: [
    'No es médica, y ella misma se lo dirá: no diagnostica, no receta ni retira medicamentos, no interpreta análisis.',
    'No da recomendaciones en caso de embarazo, trastornos de la conducta alimentaria, diabetes o enfermedades cardíacas, renales o digestivas: le explicará por qué ahí hace falta un médico.',
    'No habla de rutinas si hay señales de alarma: dolor en el pecho, desmayos, pérdida de peso sin explicación, sangre, insomnio durante meses. En esos casos, al médico de inmediato, y si hay peligro para la vida, llame al número de emergencias de su país.',
    'No recomienda complementos alimenticios ni suplementos.',
  ],
  faq: [
    {
      q: '¿Por qué un solo cambio y no un plan para todo el mes?',
      a: 'Un hábito que se sostiene a base de fuerza de voluntad no suele llegar al mes. El que funciona es el que cabe en un mal día. Si un paso no sale, Polina no le reprocha nada: averigua qué es exactamente lo que no ha funcionado.',
    },
    {
      q: '¿Por dónde empezará Polina?',
      a: 'Por lo que más le molesta y por sus condiciones reales: a qué hora se levanta y se acuesta, cuánto tiempo tiene, qué ha probado ya. Para ella, el sueño es la base: mientras no esté en orden, hablar de alimentación y deporte sirve de poco.',
    },
    {
      q: '¿Polina me ayudará a adelgazar?',
      a: 'No promete resultados, ni kilos, ni plazos, y no fija cantidades de calorías. Su objetivo es una rutina que aguante una semana apretada. Según sus reglas, la salud no se mide por el peso.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿Quién verá mis conversaciones?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default polina;
