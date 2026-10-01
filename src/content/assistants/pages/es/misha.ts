import type { AssistantPageText } from '../../types';

/**
 * Миша — коучинг по стандартам ICF. Перевод pages/ru/misha.ts. Пример разговора — целиком, без правок:
 * docs/assistant-pages/examples/misha.md.
 *
 * Российский номер 112 в «Чего не делает» заменён на номер экстренной службы
 * своей страны — без цифр.
 */
const misha: AssistantPageText = {
  title: 'Sesión de coaching online según los estándares ICF — Misha | Linkeon',
  description:
    'Misha, coach con IA según los estándares ICF. Sin consejos ni juicios: hace preguntas, le ayuda a ver qué le frena y a elegir el primer paso. 25.000 tokens al registrarse.',
  h1: 'Sesión de coaching online: Misha, coach según los estándares ICF',
  lead: 'Una conversación que lleva tres meses aplazando, o una decisión a la que da vueltas sin parar. Misha no le dirá qué es lo correcto: él hace las preguntas, y la respuesta y el primer paso los encuentra usted.',
  card: 'Sesión de coaching según los estándares ICF: preguntas en lugar de consejos y, al final, un paso que elige usted.',
  cta: 'Hablar con Misha',
  situations: [
    'Una conversación importante se aplaza semana tras semana y no sabe qué le frena.',
    'Apuntó su objetivo del año en enero y todavía no se ha puesto con él.',
    'Le ofrecen un ascenso, pero no siente alegría y no sabe si de verdad lo quiere.',
    'Tiene dos opciones y da vueltas entre ellas, eligiendo de nuevo cada vez.',
    'Ya ha oído bastantes consejos; lo que busca es entender qué quiere usted de verdad.',
  ],
  example: {
    question:
      'Llevo tres meses aplazando una conversación importante con mi socio. Ayúdeme a entender qué me frena.',
    answer: `¡Hola! Soy Misha, coach. Qué bien que haya decidido ocuparse de esto. Si una conversación lleva tres meses aplazándose, casi siempre hay algo detrás, y vale la pena entenderlo.

Le cuento brevemente cómo trabajo. Una sesión de coaching es una conversación en la que es usted quien busca las respuestas. No doy consejos, no juzgo ni digo qué es lo correcto. Hago preguntas que ayudan a ver la situación con más amplitud y a darse cuenta de lo que por ahora se le escapa. Normalmente, la persona sale de la sesión con claridad y con un siguiente paso concreto que ha elegido ella misma.

Aquí puede hablar con sinceridad, sin prisas y a su ritmo.

Antes de empezar, ¿cómo quiere que le llame?`,
  },
  can: [
    'Al principio explica cómo funciona una sesión de coaching y qué esperar de ella.',
    'Le ayuda a acordar el tema y el resultado: de qué quiere hablar y con qué quiere salir al final.',
    'Hace preguntas abiertas, de una en una, y va a su ritmo. Si la conversación se adentra en los sentimientos, les deja espacio.',
    'Le ayuda a ver qué le mantiene estancado, qué opciones tiene y en qué fortalezas propias puede apoyarse.',
    'Al final le ayuda a elegir el primer paso y a definir cómo notará que ha avanzado.',
  ],
  cannot: [
    'No da consejos, listas ni soluciones hechas, y no juzga. Misha trabaja solo con lo que usted trae.',
    'No es psicólogo ni psiquiatra: el coaching no es psicoterapia. Si la conversación toca un trauma, una depresión o un riesgo para usted o para otras personas, Misha le propondrá acudir a un especialista. Si hay peligro para la vida, llame al número de emergencias de su país.',
  ],
  faq: [
    {
      q: '¿Cómo es una sesión?',
      a: 'Primero Misha le preguntará de qué quiere hablar y qué sería para usted un buen resultado. Después vienen las preguntas, de una en una: qué es lo más importante aquí, qué le frena, qué opciones ve. Al final, un paso que elegirá usted y un breve resumen: qué ideas se lleva.',
    },
    {
      q: '¿Misha es un coach certificado?',
      a: 'No, Misha es un asistente de IA. Dirige la sesión según los estándares de la ICF, la Federación Internacional de Coaching: no aconseja, no juzga, hace preguntas abiertas y sigue el tema que usted marque.',
    },
    {
      q: '¿Con qué tema puedo acudir?',
      a: 'Con cualquiera en el que la decisión sea suya: el trabajo, un cambio, un objetivo que no avanza, una conversación que se aplaza. El tema lo elige usted, y Misha lo sigue en lugar de imponerle el suyo.',
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

export default misha;
