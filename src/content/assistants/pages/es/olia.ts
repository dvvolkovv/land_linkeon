import type { AssistantPageText } from '../../types';

/**
 * Оля — исследование ценностей. Перевод pages/ru/olia.ts. Одобренный образец: docs/assistant-pages/samples-ru.md.
 *
 * Правки владельца применены: Leadership Development Profile назван один раз (в
 * FAQ) и с пометкой «по мотивам, не официальный тест»; в «Что умеет» — просто
 * «логика действий», без названия методики. Пункт о помощи детям в «Чего не
 * делает» оставлен, как в образце, но без российского номера.
 *
 * Перевод: российские телефоны помощи заменены на местные линии без номеров
 * (кризисная линия, экстренная служба, линия помощи детям). В примере Оля, как
 * и в русском ответе, говорит на «ты» — tú; остальная страница — usted.
 */
const olia: AssistantPageText = {
  title: 'Mapa de valores y dinámica espiral online — Olia | Linkeon',
  description:
    'Olia guía una exploración de sus valores: héroe favorito, tiempo, dinero, cinco frases sin terminar y colores de la dinámica espiral. Al final, su mapa personal de valores.',
  h1: 'Mapa de valores y dinámica espiral: una exploración guiada por Olia',
  lead: 'Olia hace las preguntas de una en una y se fija en lo que hay detrás de sus respuestas. Al final arma su mapa de valores: qué le mueve, cuál es su lógica de acción y hacia dónde puede crecer.',
  card: 'Cinco pasos de conversación, del héroe favorito a los colores de la dinámica espiral. Al final, un mapa personal de valores.',
  cta: 'Hablar con Olia',
  situations: [
    'Todo parece en orden (el trabajo, los planes, las amistades), pero no sabe qué es realmente suyo y qué son expectativas ajenas.',
    'Tiene una decisión por delante (cambiar de profesión, mudarse, emprender) y quiere apoyarse en lo que le importa de verdad a usted.',
    'Nota que habla de una cosa, pero el tiempo y el dinero se le van en otra.',
    'Ha leído sobre la dinámica espiral y quiere saber qué niveles le quedan más cerca.',
    'Dirige a otras personas y quiere entender en qué se apoya cuando toma decisiones.',
  ],
  example: {
    question: 'Quiero entender cuáles son de verdad mis valores. ¿Cómo funciona su exploración?',
    answer: `¡Hola! Soy Olia. Me alegra que quieras aclarar cuáles son tus valores. Es un trabajo valioso y muy personal.

Cómo funciona. No es un test con respuestas correctas, sino una conversación tranquila. Tú te observas, y yo te ayudo a notar lo que hay detrás de tus palabras. Daremos varios pasos, con una pregunta cada vez:

1. El héroe. Hablaremos de un personaje que sientas cercano y de lo que reconoces en él.
2. El tiempo. Veremos en qué empleas tu tiempo libre cuando eliges tú.
3. El dinero. Recordaremos en qué gastas el dinero más allá de los gastos obligatorios y qué te aporta.
4. Cinco frases sin terminar. Las completarás como lo sientas.
5. Los colores. Elegirás qué formas de vivir sientes más cercanas ahora.

Al final lo reuniré todo en tu mapa personal de valores. Verás qué te mueve, cuál es tu lógica de acción y hacia dónde puedes seguir creciendo.

Responde como quieras, en pocas palabras o con detalle. Aquí no hay forma de equivocarse.

Empecemos. Piensa en tu héroe favorito: una persona famosa o un personaje de un libro, una película o un cuento. ¿Quién es y qué te atrae de él?`,
  },
  can: [
    'Guía la exploración paso a paso: el héroe favorito, el tiempo libre, los gastos más allá de lo obligatorio, cinco frases sin terminar, los colores de la dinámica espiral.',
    'Hace una pregunta cada vez y profundiza: qué reconoce usted en el héroe, por qué le importa precisamente eso.',
    'Le muestra, sin juzgar, qué valores asoman en sus respuestas.',
    'Al final arma el mapa de valores: valores principales, lógica de acción, el rango de valores según la dinámica espiral y el siguiente paso de desarrollo.',
  ],
  cannot: [
    'No es psicoterapia: Olia no diagnostica ni trata.',
    'No es un servicio de emergencias. Si ahora lo está pasando muy mal, llame a la línea de atención en crisis de su país; si hay peligro para la vida, al número de emergencias. Para niños y adolescentes existen líneas de ayuda específicas.',
  ],
  faq: [
    {
      q: '¿Qué es la dinámica espiral?',
      a: 'Un modelo de Don Beck y Chris Cowan en el que las formas de vivir se identifican con colores, del beige (supervivencia) al turquesa (unidad). Olia le pedirá que elija los dos colores que siente más cercanos ahora y que nombre los que ya ha superado o está empezando a descubrir.',
    },
    {
      q: '¿Qué significa «lógica de acción»?',
      a: 'Es un concepto de un modelo de desarrollo adulto: cómo una persona toma decisiones y da sentido a lo que le ocurre. Olia guía la conversación inspirándose en el Leadership Development Profile; no es el test oficial. Por ejemplo, para la lógica Expert lo principal es hacer las cosas bien y seguir las reglas; para Achiever, el resultado; para Strategist, el sistema y la influencia.',
    },
    {
      q: '¿Cuánto dura la exploración?',
      a: 'Cinco pasos, con las preguntas de una en una. Puede responder de forma breve o detallada, y de eso depende cuánto dure la conversación.',
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

export default olia;
