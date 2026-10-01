import type { AssistantPageText } from '../../types';

/**
 * Маша — трансформационная игра с метафорическими картами. Перевод pages/ru/masha.ts.
 * Говорит на «ты» — это её голос, в примере он сохранён (tú); остальная
 * страница — usted.
 *
 * Пример — docs/assistant-pages/examples/masha.md. Вырезано «…»: фраза про
 * профиль тестового аккаунта («вижу в твоём профиле…» — отсылка к вопросам,
 * заданным Мише и Ирине в том же сборе) и абзац о переключении на других
 * ассистентов («в левом верхнем углу» — подсказка по интерфейсу кабинета).
 * Картинку первой карты из конца ответа на страницу не берём, хотя поле
 * example.image есть: она из сторонней галереи метафорических карт, прав на неё
 * у нас нет.
 */
const masha: AssistantPageText = {
  title: 'Cartas metafóricas online: juego transformacional — Masha | Linkeon',
  description:
    'Masha, facilitadora de juegos, dirige un juego transformacional online con cartas metafóricas: le muestra una carta y le hace preguntas, y el sentido lo encuentra usted.',
  h1: 'Cartas metafóricas online: Masha dirige un juego transformacional',
  lead: 'Masha le muestra una carta metafórica y le pregunta qué ve en ella y qué siente. No hay respuestas correctas: el sentido lo encuentra usted, y Masha le ayuda a verlo.',
  card: 'Un juego con cartas metafóricas: Masha le muestra una imagen y le hace preguntas, y usted descubre qué le importa.',
  cta: 'Hablar con Masha',
  situations: [
    'Ha oído hablar de las cartas metafóricas y quiere probar cómo funcionan.',
    'Quiere entender qué desea de verdad, pero cuando se lo pregunta directamente solo le salen respuestas «correctas».',
    'Tiene menos energía que antes y quiere encontrar qué le sostiene y le inspira.',
    'Tiene una decisión por delante y quiere entender qué es lo que le importa a usted en ella.',
    'Ha jugado a juegos transformacionales en persona y quiere probar el formato online.',
  ],
  example: {
    question: 'Quiero probar un juego transformacional con cartas metafóricas. ¿Cómo funciona?',
    answer: `¡Hola! Soy Masha, facilitadora y especialista en juegos transformacionales. Me alegra que te hayan entrado ganas de probar.

Es muy sencillo. Te muestro una carta metafórica: una imagen, una historia o una escena sin un significado único. Tú me cuentas qué ves, qué sientes y con qué resuena en tu vida. No hay respuestas correctas ni incorrectas. La carta es como un espejo: cada uno ve en ella algo propio. Y a través de esas asociaciones aparece lo que de verdad te importa: tus valores, tus deseos, tus puntos de apoyo interiores.

No doy consejos ni interpreto las cartas por ti. Hago preguntas, te ayudo a ver los significados y a apoyarte en lo que te da fuerzas. Normalmente vemos 2–3 cartas y luego miramos qué se ha aclarado ya. Después decides tú: profundizar o hacer balance.

Puedes jugar sin más, para conocerte mejor. O puedes traer una pregunta concreta. … Con cualquier tema así las cartas también funcionan bien.

…

¿Sacamos la primera carta? Puedes decirme ya si hay un tema que quieras explorar o si prefieres ir sin un tema fijo.`,
  },
  can: [
    'Muestra cartas metafóricas en el propio chat, una tras otra.',
    'Para cada carta hace preguntas abiertas, de una en una: qué ve, qué siente, con qué lo relaciona en su vida.',
    'Le ayuda a ver qué hay detrás de las asociaciones: valores, deseos, intenciones y lo que le da fuerzas.',
    'Tras dos o tres cartas, le dice qué se ha aclarado ya y le propone elegir: profundizar o hacer balance.',
    'Al final hace balance y le propone seguir con ella o pasar a otro asistente.',
  ],
  cannot: [
    'No adivina ni predice: aquí la carta es una metáfora, no una señal del destino.',
    'No interpreta las cartas por usted ni da consejos. Masha hace preguntas, y el sentido lo encuentra usted.',
    'No es psicoterapia: el juego ayuda a conocerse mejor, pero no cura ni sustituye a un psicólogo.',
  ],
  faq: [
    {
      q: '¿Qué son las cartas metafóricas?',
      a: 'Imágenes que no tienen un único significado correcto: una figura, una historia o una escena. Cada persona ve en ellas algo propio, y a partir de esas asociaciones es más fácil darse cuenta de lo que ahora es importante para usted.',
    },
    {
      q: '¿Necesito una baraja propia?',
      a: 'No. Masha le muestra las cartas ella misma, en el propio chat.',
    },
    {
      q: '¿Cuánto dura el juego?',
      a: 'Normalmente, dos o tres cartas, con una o dos preguntas para cada una. Luego Masha le preguntará si quiere profundizar o hacer balance. No le meterá prisa.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿Quién verá mis respuestas?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. No vendemos sus conversaciones ni las usamos para publicidad. El procesamiento corre a cargo de los proveedores de IA.',
    },
  ],
};

export default masha;
