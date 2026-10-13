import type { ValuesTexts } from '../types';

/**
 * Тест ценностей на испанском. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-13-values-test-languages.md, «Правила переводов».
 */
const es: ValuesTexts = {
  title: 'Test de valores de Schwartz online gratis — mapa de valores | Linkeon',
  description:
    'Test de valores de Schwartz gratis: 30 afirmaciones, unos 5 minutos. El círculo de 10 valores de Shalom Schwartz, sus valores principales y un análisis con Olia.',
  h1: 'Test de valores de Schwartz online y gratis',
  breadcrumb: 'Test de valores',
  intro: [
    'Treinta descripciones breves de personas distintas. Indique cuánto se parece a usted cada una y verá un círculo de diez valores básicos: qué ocupa el primer lugar para usted, qué queda más lejos y dónde están las principales tensiones internas.',
    'El test se inspira en la teoría de los valores básicos del psicólogo social Shalom Schwartz. Las respuestas se quedan en su dispositivo: el cálculo se hace en el propio navegador y no se envía nada a ningún servidor.',
    'El resultado no es una evaluación ni un diagnóstico, sino un punto de partida para hablar de usted. Puede continuar la conversación con Olia, la asistente que guía la exploración de valores.',
  ],
  start: {
    meta: '30 afirmaciones · unos 5 minutos · las respuestas se quedan en su dispositivo',
    begin: 'Empezar',
    resume: 'Continuar ({done} de {total})',
    restart: 'Empezar de nuevo',
  },
  question: {
    prompt: '¿Cuánto se parece a usted esta persona?',
    progress: '{n} de {total}',
    back: 'Atrás',
    scale: [
      'No se parece nada a mí',
      'No se parece a mí',
      'Se parece un poco',
      'Se parece en parte',
      'Se parece a mí',
      'Se parece mucho a mí',
    ],
  },
  statements: {
    selfDirection1: 'A esta persona le importa la independencia: elegir su camino a su manera, sin órdenes de arriba.',
    selfDirection2: 'Esta persona se pone con gusto a construir, componer o inventar algo propio, solo por curiosidad.',
    selfDirection3: 'Para esta persona es importante pensar por su cuenta y llegar a sus propias conclusiones.',
    stimulation1: 'Esta persona se lanza con facilidad: una ciudad desconocida, una afición nueva, un viaje repentino, todo le hace feliz.',
    stimulation2: 'Para esta persona, una vida sin cambios ni variedad se vuelve insípida enseguida.',
    stimulation3: 'A esta persona le atrae lo que no se sabe cómo va a acabar: los proyectos audaces y los retos arriesgados.',
    hedonism1: 'A esta persona le importa que en su vida haya muchas cosas agradables: buena comida, descanso, pequeños placeres.',
    hedonism2: 'Esta persona se da gustos con facilidad y no necesita ningún motivo para ello.',
    hedonism3: 'Esta persona valora los placeres sencillos: un baño caliente, su plato favorito, una velada sin ninguna preocupación.',
    achievement1: 'A esta persona le importa crecer en su campo: ponerse metas altas y alcanzarlas.',
    achievement2: 'Para esta persona es importante lucir su maestría ante quienes entienden del tema.',
    achievement3: 'Esta persona aspira a estar entre los mejores de su campo.',
    power1: 'Para esta persona es importante influir en los demás y decidir cómo se usan el dinero y los recursos comunes.',
    power2: 'Para esta persona es importante una riqueza que muestre su posición en la sociedad.',
    power3: 'A esta persona le importan un estatus alto y la autoridad, tener peso a ojos de los demás.',
    security1: 'Esta persona elige la prudencia: revisar una vez más, ir sobre seguro, no poner en riesgo su salud.',
    security2: 'A esta persona le importa vivir en un país donde las calles sean tranquilas y las leyes se cumplan.',
    security3: 'A esta persona le importa la estabilidad: un trabajo seguro, ahorros para tiempos difíciles, un mañana previsible.',
    conformity1: 'Para esta persona, las normas no son una formalidad: se cumplen, gusten o no.',
    conformity2: 'Esta persona se contiene en público: no levanta la voz ni se permite palabras bruscas.',
    conformity3: 'Esta persona se viste y se comporta como es costumbre allí donde está.',
    tradition1: 'Para esta persona, las costumbres familiares —los pasteles de las fiestas, las historias de los antepasados, las fechas señaladas— son algo que hay que conservar.',
    tradition2: 'Para esta persona, la fe y sus fiestas ocupan un lugar importante en la vida.',
    tradition3: 'Esta persona acepta su destino con serenidad: lo que le toca, hay que vivirlo con dignidad.',
    benevolence1: 'Esta persona acude enseguida a ayudar cuando a sus seres queridos les pasa algo.',
    benevolence2: 'Esta persona es alguien a quien los amigos confían sus secretos y que nunca les falla.',
    benevolence3: 'A esta persona le importa que sus seres queridos estén bien, y para ello no escatima tiempo ni esfuerzo.',
    universalism1: 'Esta persona se preocupa por quienes sufren guerras y catástrofes en cualquier parte del mundo, y ayuda en lo que puede.',
    universalism2: 'Esta persona procura dañar lo menos posible la naturaleza: ahorra recursos, no tira basura, piensa en las consecuencias.',
    universalism3: 'Para esta persona es importante que en el mundo haya sitio para distintas opiniones, culturas y formas de vida.',
  },
  values: {
    selfDirection: {
      name: 'Autodirección',
      inMessage: 'la autodirección',
      line: 'libertad para pensar, elegir y crear algo propio',
      text: 'La autodirección es la necesidad de pensar por cuenta propia, elegir el camino y crear algo suyo. A quienes la ponen en los primeros puestos les agobian los marcos rígidos y las instrucciones ajenas: necesitan entender para qué hacen las cosas y dejar en ellas su sello personal.',
    },
    stimulation: {
      name: 'Estimulación',
      inMessage: 'la estimulación',
      line: 'novedad, emoción y cambios',
      text: 'La estimulación es la atracción por la novedad, la emoción y el cambio. Cuando es importante, la persona busca lugares, actividades y retos nuevos, se entusiasma con facilidad y se cansa pronto de la rutina. Una vida tranquila y previsible le parece entonces insípida.',
    },
    hedonism: {
      name: 'Hedonismo',
      inMessage: 'el hedonismo',
      line: 'placer y alegría de vivir',
      text: 'El hedonismo es el valor del placer y la alegría aquí y ahora. Para quienes es importante, la vida no son solo tareas y deberes: la buena comida, el descanso, las cosas bonitas y una compañía agradable no importan menos que las ocupaciones.',
    },
    achievement: {
      name: 'Logro',
      inMessage: 'el logro',
      line: 'éxito y reconocimiento de las propias capacidades',
      text: 'El logro es el afán de un éxito que los demás ven y reconocen. Las personas que lo ponen en los primeros puestos se fijan metas altas, se comparan con los mejores de su campo y valoran que se note lo que saben hacer.',
    },
    power: {
      name: 'Poder',
      inMessage: 'el poder',
      line: 'estatus, influencia y recursos',
      text: 'El poder es el valor del estatus, la influencia y los recursos. Quienes lo consideran importante quieren tener la situación bajo control, tomar decisiones y ocupar una posición que los demás tengan en cuenta. El dinero y la autoridad son, para estas personas, una forma de influir en lo que pasa.',
    },
    security: {
      name: 'Seguridad',
      inMessage: 'la seguridad',
      line: 'estabilidad, orden y protección',
      text: 'La seguridad es la necesidad de estabilidad y protección para la propia persona, sus seres queridos y la sociedad. Cuando ocupa los primeros puestos, la persona piensa con antelación, valora la fiabilidad y el orden, evita los riesgos innecesarios y se procura reservas para los imprevistos.',
    },
    conformity: {
      name: 'Conformidad',
      inMessage: 'la conformidad',
      line: 'contención y respeto a las normas',
      text: 'La conformidad es la contención y el respeto a las normas aceptadas en el entorno. Las personas con este valor procuran no herir a los demás, cumplen su palabra y respetan lo acordado y lo establecido, incluso cuando preferirían actuar de otro modo.',
    },
    tradition: {
      name: 'Tradición',
      inMessage: 'la tradición',
      line: 'respeto por las costumbres, la fe y las raíces',
      text: 'La tradición es el respeto por las costumbres, la fe y las raíces de la familia y la cultura. Quienes la consideran importante se apoyan en lo que ha pasado la prueba de varias generaciones: las fiestas, los ritos, la modestia y la capacidad de aceptar la vida tal como es.',
    },
    benevolence: {
      name: 'Benevolencia',
      inMessage: 'la benevolencia',
      line: 'cuidado y lealtad hacia los seres queridos',
      text: 'La benevolencia es el cuidado de quienes están cerca: la familia, los amigos, los compañeros. Las personas que la ponen en los primeros puestos son de fiar y están dispuestas a ayudar y a ceder por el bien de la relación; para ellas, la lealtad y la confianza importan más que el propio beneficio.',
    },
    universalism: {
      name: 'Universalismo',
      inMessage: 'el universalismo',
      line: 'justicia para todos y cuidado del mundo',
      text: 'El universalismo es la preocupación por todas las personas y por la naturaleza, no solo por el propio círculo. Quienes lo consideran importante valoran la justicia, la igualdad, la tolerancia hacia otras opiniones y el cuidado del mundo.',
    },
  },
  higherOrder: {
    openness: 'Apertura al cambio',
    selfEnhancement: 'Autopromoción',
    conservation: 'Conservación',
    selfTranscendence: 'Autotrascendencia',
  },
  axes: {
    change: {
      left: 'Se identifica más con la apertura al cambio —la autodirección y la novedad— que con la conservación del orden habitual.',
      right: 'Se identifica más con la conservación de lo habitual —la seguridad, las normas y las tradiciones— que con la apertura al cambio.',
      balance: 'En usted, la apertura al cambio y la conservación de lo habitual están en equilibrio: ninguna de las dos pesa claramente más.',
    },
    focus: {
      left: 'Para usted, el cuidado de los demás —sus seres queridos y el mundo que le rodea— es más importante que el éxito personal y la influencia.',
      right: 'Para usted, el éxito personal y la influencia son más importantes que el cuidado de los demás y del mundo que le rodea.',
      balance: 'Mantiene en equilibrio el cuidado de los demás y el éxito personal.',
    },
  },
  axesInMessage: {
    change: {
      left: 'Me atrae más el cambio que conservar lo conocido',
      right: 'Me atrae más conservar lo conocido que el cambio',
      balance: 'Entre el cambio y conservar lo conocido, me mantengo en equilibrio',
    },
    focus: {
      left: 'el cuidado de los demás me importa más que el éxito personal',
      right: 'el éxito personal me importa más que el cuidado de los demás',
      balance: 'el cuidado de los demás y el éxito personal me importan por igual',
    },
  },
  result: {
    heading: 'Su círculo de valores',
    circleAlt: 'Círculo de valores',
    legend: 'Grupos de valores',
    topHeading: 'Valores principales',
    bottomHeading: 'Valor menos importante',
    axesHeading: 'Tensiones principales',
    flatHeading: 'No se destacan prioridades',
    flatText:
      'Ha valorado casi todas las afirmaciones por igual, así que no se pueden señalar valores principales. Pruebe a hacer el test otra vez comparando las descripciones entre sí, o descubra con Olia qué es lo que de verdad le importa.',
    cta: 'Analizarlo con Olia',
    ctaNote: 'Análisis personal de valores con Olia: al registrarse, 25.000 tokens de regalo',
    allHeading: 'Los 10 valores, en su orden',
    restart: 'Repetir el test',
    tiedWith: 'Con el mismo resultado: {names}',
    topHeadingOne: 'Valor principal',
    restEqual: 'Los demás valores han obtenido la misma puntuación, así que no se puede señalar el menos importante.',
  },
  modelSection: {
    heading: 'Los diez valores de Schwartz',
    lead: 'Schwartz describió diez valores que se encuentran en culturas de todo el mundo. Se disponen en círculo: los vecinos conviven sin dificultad y los opuestos tiran en direcciones contrarias, como el deseo de novedad y el de conservar lo conocido.',
  },
  faqHeading: 'Preguntas sobre el test',
  faq: [
    {
      q: '¿Cuánto tiempo lleva el test?',
      a: 'Unos cinco minutos: 30 afirmaciones y, para cada una, una respuesta en una escala de seis opciones. Mientras la pestaña esté abierta, las respuestas se guardan en ella, así que una recarga accidental no le hará perder el progreso.',
    },
    {
      q: '¿Es un test científico?',
      a: 'Se basa en la teoría de los valores básicos de Shalom Schwartz, uno de los modelos de valores ampliamente estudiados en psicología. Las afirmaciones las hemos escrito nosotros inspirándonos en esa teoría: no es el cuestionario oficial PVQ ni un método clínico, sino una herramienta de autoconocimiento.',
    },
    {
      q: '¿Se guardan mis respuestas?',
      a: 'No. El cálculo se hace en el navegador; las respuestas no se envían a ningún servidor ni llegan a la analítica. Solo se guardan en esta pestaña, para que no se pierdan si la página se recarga por accidente.',
    },
    {
      q: '¿Por qué el resultado es un orden de valores y no una puntuación?',
      a: 'Según Schwartz, lo importante no son las puntuaciones en sí, sino qué valores pesan más que otros. Por eso el test tiene en cuenta su manera de responder: aunque dé puntuaciones altas a todas las afirmaciones, el círculo mostrará igualmente qué es lo más importante para usted.',
    },
    {
      q: '¿Qué hago con el resultado?',
      a: 'Fíjese en los valores principales y en las tensiones principales: dónde sus decisiones, su tiempo y su dinero coinciden con lo que le importa y dónde no. Puede analizarlo a fondo con Olia: ella guía la exploración de valores en una conversación y arma un mapa personal de valores.',
    },
  ],
  disclaimer:
    'Test de autoconocimiento inspirado en la teoría de los valores básicos de Shalom Schwartz. No es un método clínico ni oficial.',
  tiedInMessage: '(con el mismo resultado: {names})',
  bottomInMessage: 'en último lugar, {bottom}',
  restEqualInMessage: 'los demás, empatados',
  message:
    '¡Hola, Olia! Mi resultado en el test de valores de Schwartz: en primer lugar, {top}; {rest}. {axes}. Ayúdame a entender qué significa esto para mí',
  messageFlat:
    '¡Hola, Olia! En el test de valores de Schwartz no me salió ninguna prioridad clara: valoré casi todo por igual. Ayúdame a entender qué es lo que de verdad me importa',
};

export default es;
