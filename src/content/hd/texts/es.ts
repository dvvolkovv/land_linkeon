import type { HdTexts } from '../types';

/**
 * Калькулятор Human Design на испанском. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-14-hd-calculator-languages.md, «Правила переводов»;
 * термины — docs/hd-calculator/glossary-languages.md.
 */
const es: HdTexts = {
  title: 'Calculadora de Diseño Humano gratis — carta y bodygraph | Linkeon',
  description:
    'Calcule gratis y sin registro su carta de Diseño Humano: el bodygraph por fecha, hora y ciudad de nacimiento, con tipo, estrategia, autoridad y perfil explicados.',
  h1: 'Calculadora de Diseño Humano online — bodygraph gratis',
  breadcrumb: 'Calculadora de Diseño Humano',
  intro: [
    'Para trazar el bodygraph hacen falta la fecha, la hora exacta y la ciudad de nacimiento. La calculadora le mostrará el tipo, la estrategia, la autoridad, el perfil y la definición y, más abajo, los centros y los canales. Cada parte lleva una breve descripción: cómo suele manifestarse en las personas.',
    'El Diseño Humano (Human Design) describe a la persona con un esquema de nueve centros, 64 puertas y 36 canales. Lo que queda definido en él depende de la posición del Sol, la Luna, los nodos lunares y los planetas en el momento del nacimiento y unos 88 días antes. De ahí salen el tipo, la estrategia y la autoridad: pistas sobre cómo le resulta más fácil a cada persona tomar decisiones y administrar sus fuerzas.',
    'Aquí el Diseño Humano es una herramienta de autoconocimiento, no una predicción: las descripciones hablan de tendencias, no de acontecimientos, y conviene comprobarlas con la propia experiencia. La carta se calcula directamente en el navegador y sin registro: la fecha, la hora y la ciudad de nacimiento no se envían a ningún servidor.',
  ],
  form: {
    heading: 'Sus datos de nacimiento',
    date: 'Fecha de nacimiento',
    time: 'Hora de nacimiento',
    timeHint: 'La hora es obligatoria: sin ella, el tipo podría ser otro.',
    city: 'Ciudad de nacimiento',
    cityPlaceholder: 'Empiece a escribir la ciudad',
    cityHint: '¿No encuentra su ciudad? Elija la ciudad grande más cercana del mismo huso horario.',
    cityLoading: 'Cargando la lista de ciudades…',
    cityLoadError: 'No se ha podido cargar la lista de ciudades. Compruebe la conexión y vuelva a pulsar en el campo.',
    cityNotFound: 'Esa ciudad no está en la lista: elija la ciudad grande más cercana del mismo huso horario.',
    zoneLine: '{city}, {offset} en la fecha de nacimiento',
    zoneUnknown: 'El navegador no conoce el huso horario de esta ciudad: elija otra ciudad grande cercana.',
    dstGap: 'Esa noche se adelantaron los relojes: la hora {time} nunca llegó a marcarse. ¿Cómo se anotó la hora de nacimiento?',
    dstAmbiguous: 'Esa noche se atrasaron los relojes: la hora {time} se marcó dos veces. ¿Cuál de las dos?',
    dstBefore: 'Antes del cambio de hora ({offset})',
    dstAfter: 'Después del cambio de hora ({offset})',
    dstChoose: 'Elija si fue antes o después del cambio de hora.',
    missing: 'Indique la fecha y la hora y elija una ciudad de la lista.',
    futureDate: 'Compruebe la fecha: debe estar entre el año 1900 y el día de hoy.',
    submit: 'Calcular',
  },
  result: {
    heading: 'Su bodygraph',
    dataLine: '{date}, {time}, {city} ({offset})',
    bodygraphLabel: 'Bodygraph: {type}. Centros definidos: {centers}',
    bodygraphLabelEmpty: 'Bodygraph: {type}. Centros definidos: ninguno',
    legendPersonality: 'Personalidad — momento del nacimiento',
    legendDesign: 'Diseño — unos 88 días antes del nacimiento',
    typeLabel: 'Tipo',
    strategyLabel: 'Estrategia',
    authorityLabel: 'Autoridad',
    profileLabel: 'Perfil',
    definitionLabel: 'Definición',
    definedCenters: 'Centros definidos',
    noDefinedCenters: 'No hay centros definidos',
    openCenters: 'Centros abiertos',
    noOpenCenters: 'No hay centros abiertos',
    channels: 'Canales',
    noChannels: 'No hay canales definidos',
    cta: 'Analizarlo con Raya',
    ctaNote: 'Análisis personal y experimento de 7 días con Raya: al registrarse, 25.000 tokens de regalo',
  },
  types: {
    generator: {
      name: 'Generador',
      strategy: 'Responder',
      text: 'El Generador tiene el Centro Sacral definido: una reserva estable de energía para lo que le apasiona. Su estrategia es «responder»: no empezar de cero por pura voluntad, sino esperar a que la vida le proponga algo (una pregunta, una petición, una tarea) y notar si dentro surge un «sí» claro. Lo elegido siguiendo la respuesta suele traer satisfacción; lo emprendido en contra de ella, irritación y cansancio.',
    },
    manifestingGenerator: {
      name: 'Generador Manifestante',
      strategy: 'Responder y luego informar',
      text: 'El Generador Manifestante tiene el Centro Sacral definido y su energía conectada con el Centro de la Garganta, así que pasa rápido a la acción. Su estrategia es «responder y luego informar»: esperar un «sí» claro ante lo que propone la vida y, antes de actuar, avisar brevemente a quienes afectará la decisión. Suele llevar varias cosas a la vez y saltarse pasos, y luego vuelve a lo que se saltó.',
    },
    manifestor: {
      name: 'Manifestador',
      strategy: 'Informar',
      text: 'El Manifestador tiene el Centro Sacral abierto, pero otra fuente de energía (el Centro del Corazón, el Plexo Solar o el Centro Raíz) conecta con el Centro de la Garganta, así que puede empezar por su cuenta, sin esperar propuestas. Su estrategia es «informar»: avisar brevemente a quienes afectará la decisión antes de actuar. No es pedir permiso: así los demás suelen resistirse menos, y él siente menos ira y más paz.',
    },
    projector: {
      name: 'Proyector',
      strategy: 'Esperar la invitación',
      text: 'El Proyector tiene el Centro Sacral abierto y no suele tener la energía estable del Generador para un trabajo largo. A cambio, a menudo ve con acierto cómo funcionan las personas y los procesos y qué se puede mejorar. Su estrategia, «esperar la invitación», vale para lo grande (trabajo, relaciones, una mudanza): un consejo que nadie pidió suele caer en saco roto, y el mismo consejo, por invitación, resulta oportuno.',
    },
    reflector: {
      name: 'Reflector',
      strategy: 'Esperar un ciclo lunar (unos 28 días)',
      text: 'El Reflector tiene abiertos los nueve centros: es un tipo poco común. Refleja con sutileza su entorno: su bienestar puede mostrar cómo están la familia o el equipo, así que le importa mucho con quién y dónde vive y trabaja. Le conviene decidir lo importante sin prisa, tras convivir unos 28 días con la pregunta: en ese tiempo la Luna recorre las 64 puertas y la decisión se muestra desde distintos ángulos.',
    },
  },
  authorities: {
    emotional: {
      name: 'Emocional (Plexo Solar)',
      inMessage: 'autoridad emocional',
      text: 'Tienen autoridad emocional todas las personas con el Plexo Solar definido, sean cuales sean sus otros centros definidos. Las emociones vienen en olas, de la subida a la bajada, y en cualquier punto una decisión puede parecer evidente. La claridad suele llegar cuando la ola se calma; por eso, ante lo importante conviene «consultarlo con la almohada» y ver si la respuesta sigue igual al cabo de un día o dos.',
    },
    sacral: {
      name: 'Sacral',
      inMessage: 'autoridad sacral',
      text: 'La autoridad sacral se da en Generadores y Generadores Manifestantes cuando el Plexo Solar está abierto. La respuesta llega de inmediato y desde dentro, como un «sí» o un «no» claros, a veces como un sonido del tipo «ajá» o «mm-mm», antes de que la mente tenga tiempo de intervenir. Esa respuesta se oye con más facilidad cuando la pregunta es sencilla y se puede contestar con una sola palabra.',
    },
    splenic: {
      name: 'Esplénica',
      inMessage: 'autoridad esplénica',
      text: 'La autoridad esplénica se da cuando el Centro del Bazo está definido y el Plexo Solar y el Centro Sacral están abiertos. Es un instinto silencioso del momento: avisa una sola vez, en el acto, y no se repite. Es fácil acallarlo con razonamientos, por eso a las personas con esta autoridad les conviene confiar en la primera sensación, sobre todo cuando se trata de la seguridad y de lo que encaja justo ahora.',
    },
    ego: {
      name: 'Ego (Centro del Corazón)',
      inMessage: 'autoridad del Ego',
      text: 'La autoridad del Ego se da cuando el Centro del Corazón está definido y el Plexo Solar, el Centro Sacral y el Centro del Bazo están abiertos. La decisión se pone a prueba con una pregunta sencilla: si la persona de verdad lo quiere y qué le aportará. En el Manifestador, la respuesta suele oírse en lo que dice de forma espontánea; en el Proyector, se aclara al hablar con personas de su confianza.',
    },
    selfProjected: {
      name: 'Autoproyectada',
      inMessage: 'autoridad autoproyectada',
      text: 'La autoridad autoproyectada se da en Proyectores con el Centro G definido y conectado con el Centro de la Garganta, y con el Plexo Solar, el Centro del Bazo y el Centro del Corazón abiertos. La claridad llega por la propia voz: plantear la cuestión en voz alta ante alguien de confianza y escucharse. El interlocutor está para escuchar, no para aconsejar, y la respuesta correcta suele sonar a «esto va conmigo».',
    },
    mental: {
      name: 'Mental (a través del entorno)',
      inMessage: 'autoridad mental',
      text: 'La autoridad mental se da en Proyectores que solo tienen definidos el Centro de la Cabeza, el Ajna y el Centro de la Garganta, o algunos de ellos. Aquí no hay una señal interna de «sí» o «no»: la claridad llega de fuera, de conversaciones con distintas personas de confianza y de cómo se siente uno en cada lugar. Conviene no apresurar las decisiones: con el tiempo, en las propias palabras se oye lo correcto.',
    },
    lunar: {
      name: 'Lunar',
      inMessage: 'autoridad lunar',
      text: 'La autoridad lunar solo la tienen los Reflectores: no hay centros definidos ni tampoco una señal interna constante. Lo importante conviene decidirlo a lo largo de un ciclo lunar, unos 28 días: hablar del tema con distintas personas, notar cómo cambia la actitud hacia él de un día a otro y esperar a que la respuesta se asiente. Aquí la prisa suele estorbar, y el tiempo ayuda a ver la cuestión en su conjunto.',
    },
  },
  profiles: {
    '1/3': {
      name: 'Investigador / Mártir',
      text: 'La primera línea busca apoyo en el conocimiento: antes de actuar, quiere entender las bases. La tercera lo comprueba todo con la propia experiencia, por ensayo y error. Juntas describen a alguien que primero estudia y luego lo prueba en la práctica, y para quien los tropiezos son más hallazgos que fracasos: así descubre en qué puede apoyarse de verdad.',
    },
    '1/4': {
      name: 'Investigador / Oportunista',
      text: 'La primera línea busca apoyo en el conocimiento: la persona se siente más segura cuando ha entendido las bases. La cuarta se apoya en la gente: las oportunidades suelen llegar a través de conocidos, amigos y colegas. Con este perfil conviene estudiar a fondo lo que interesa y compartirlo con el propio círculo, que es donde se le suele escuchar.',
    },
    '2/4': {
      name: 'Ermitaño / Oportunista',
      text: 'La segunda línea es un talento natural que la propia persona a menudo no ve, y la necesidad de estar a solas, de dedicarse a lo suyo sin miradas ajenas. La cuarta conecta con la gente: suele ser el círculo cercano el que ve ese talento y la invita a mostrarlo. Con este perfil conviene reservar tiempo para uno mismo y responder a las invitaciones de quienes uno conoce.',
    },
    '2/5': {
      name: 'Ermitaño / Hereje',
      text: 'La segunda línea es un talento natural y la necesidad de soledad. La quinta atrae las expectativas ajenas: de estas personas se espera a menudo una solución práctica, o incluso que salven una situación difícil. A veces las llaman para ayudar más de lo que querrían, así que con este perfil conviene reservar tiempo para uno mismo y asumir solo lo que de verdad está a su alcance.',
    },
    '3/5': {
      name: 'Mártir / Hereje',
      text: 'La tercera línea aprende de la experiencia: prueba, se equivoca y encuentra lo que funciona. La quinta atrae las expectativas de los demás: de la persona se esperan soluciones prácticas. En esta combinación los errores se convierten en la experiencia de la que nacen esas soluciones, y la reputación se protege con la costumbre de no prometer más de lo que uno ha comprobado en sí mismo.',
    },
    '3/6': {
      name: 'Mártir / Modelo a seguir',
      text: 'La tercera línea aprende de la experiencia, por ensayo y error. La sexta suele describirse en tres etapas: en la juventud, muchas pruebas, como en la tercera línea; después, un tiempo para observar desde fuera, y más tarde, ser un ejemplo para los demás. Quienes tienen este perfil suelen acumular mucha experiencia, de la que con los años a menudo nacen una calma y una sabiduría que sirven de referencia a otros.',
    },
    '4/6': {
      name: 'Oportunista / Modelo a seguir',
      text: 'La cuarta línea se apoya en la gente: los amigos y conocidos son la principal fuente de oportunidades y de apoyo. La sexta suele describirse en tres etapas: primero muchas pruebas, después una mirada desde fuera y, más tarde, una experiencia que sirve de referencia a otros. A las personas con este perfil se las suele escuchar en su círculo, sobre todo cuando predican con el ejemplo.',
    },
    '4/1': {
      name: 'Oportunista / Investigador',
      text: 'La cuarta línea se apoya en las personas de su círculo; la primera, en un conocimiento sólido. Las personas con este perfil tienden a mantener su rumbo: bajo la presión ajena cambian de mala gana y suelen preferir encontrar su propio entorno a adaptarse al de otros. Sus bases firmes a menudo las convierten en un apoyo fiable para quienes las rodean.',
    },
    '5/1': {
      name: 'Hereje / Investigador',
      text: 'La quinta línea atrae las expectativas ajenas: de la persona se espera una solución práctica. La primera da a esas soluciones una base: antes de proponer algo, la persona estudia los fundamentos. A quienes tienen este perfil se los suele llamar cuando las cosas se ponen difíciles, y su reputación se sostiene en que sus soluciones están comprobadas y funcionan.',
    },
    '5/2': {
      name: 'Hereje / Ermitaño',
      text: 'La quinta línea atrae las expectativas de los demás: se espera que la persona encuentre una salida. La segunda es un talento natural y la necesidad de soledad. A veces la llaman para resolver asuntos ajenos justo cuando quiere estar a solas, por eso con este perfil conviene elegir a qué llamadas responder y reservar tiempo para uno mismo.',
    },
    '6/2': {
      name: 'Modelo a seguir / Ermitaño',
      text: 'La sexta línea suele describirse en tres etapas: en la juventud, mucho ensayo y error; después, un tiempo para observar desde fuera, y más tarde, ser un ejemplo para los demás. La segunda añade un talento natural y la necesidad de soledad. Las personas con este perfil suelen mantenerse un poco al margen, y son otros quienes notan su ejemplo y su talento.',
    },
    '6/3': {
      name: 'Modelo a seguir / Mártir',
      text: 'La sexta línea suele describirse en tres etapas: primero muchas pruebas, después una mirada desde fuera y, más tarde, ser un ejemplo para otros. La tercera añade ensayo y error también en las etapas siguientes, por eso la experiencia de las personas con este perfil rara vez es sencilla. A cambio, de ella suele salir una sabiduría práctica y vivida, que los demás valoran precisamente porque está comprobada.',
    },
  },
  definitions: {
    none: {
      name: 'Sin definición',
      text: 'Ocurre únicamente en el Reflector: no hay ningún canal definido. La definición aparece solo de forma pasajera, por las personas cercanas y por el paso de la Luna. Por eso un día no se parece al siguiente. El tiempo ayuda a separar lo propio de lo que llega de fuera.',
    },
    single: {
      name: 'Simple',
      text: 'Todos los centros definidos están conectados entre sí en un solo grupo. Las personas con esta definición suelen tener una sensación estable de unidad: no necesitan a nadie que las «complete» y procesan la información por sí mismas y con bastante rapidez. A veces les cuesta entender por qué otros necesitan más tiempo para lo mismo.',
    },
    split: {
      name: 'Partida (doble)',
      text: 'Los centros definidos forman dos grupos separados, y entre ellos parece faltar un puente. Puede aparecer la sensación de que algo se echa en falta, y uno se siente atraído por quienes tienden ese puente: a su lado, todo se une en un solo conjunto. A las decisiones suele venirles bien un tiempo para que ambas partes se pongan de acuerdo.',
    },
    triple: {
      name: 'Triple',
      text: 'Los centros definidos forman tres grupos separados. Las personas con esta definición suelen necesitar más tiempo para pensarlo todo, y les sienta bien el trato con gente variada: en lugares concurridos y en movimiento, las distintas partes parecen conectarse. Si no se apresuran las decisiones, la visión resulta rica en matices y equilibrada.',
    },
    quadruple: {
      name: 'Cuádruple',
      text: 'Los centros definidos forman cuatro grupos separados: es una combinación poco común. Las personas con esta definición suelen procesar la experiencia despacio y a fondo, y la prisa más bien les estorba. Les conviene decidir sin presión, dándose tiempo, y las opiniones que se forman así suelen ser estables y cambian poco por influencia ajena.',
    },
  },
  centers: {
    head: {
      name: 'Centro de la Cabeza',
      defined:
        'un flujo constante de preguntas e ideas que nace desde dentro: a la mente no suele faltarle en qué pensar. Quienes lo tienen definido a menudo inspiran a otros, y a su lado a los demás también les surgen preguntas.',
      open: 'las preguntas y la inspiración llegan de otras personas y se intensifican a su lado. A veces uno se devana los sesos con preguntas ajenas, y entonces conviene preguntarse cuáles son de verdad propias.',
    },
    ajna: {
      name: 'Ajna',
      defined:
        'una forma estable de pensar: las opiniones y conclusiones se forman según su propia lógica interna y dependen poco del interlocutor. Quienes lo tienen definido suelen estar seguros de cómo entienden las cosas, y a veces les cuesta aceptar que otros razonan de otra manera.',
      open: 'una mente flexible, que ve con facilidad una cuestión desde distintos ángulos y prueba a adoptar puntos de vista ajenos. Puede aparecer la tentación de aparentar una seguridad que no se tiene, aunque precisamente la apertura a opiniones distintas es aquí el punto fuerte.',
    },
    throat: {
      name: 'Centro de la Garganta',
      defined:
        'una forma constante y reconocible de hablar y de actuar. Quienes lo tienen definido no suelen tener que esforzarse por hacerse notar, y cómo suenan exactamente depende de con qué centros esté conectado el Centro de la Garganta.',
      open: 'la manera de hablar cambia según las personas de alrededor, y a veces surgen ganas de hablar primero para hacerse notar. Las palabras de estas personas suelen tener más peso cuando son otros quienes se dirigen a ellas.',
    },
    g: {
      name: 'Centro G (identidad)',
      defined:
        'una sensación estable de uno mismo y de la propia dirección: estas personas suelen saber quiénes son y adónde van, y eso depende poco del entorno. A su lado, a otros les resulta más fácil sentir su propio camino.',
      open: 'la sensación de uno mismo y de la dirección es flexible y depende mucho del lugar y de las personas de alrededor. Por eso a estas personas les importa especialmente dónde y con quién viven y trabajan: el entorno adecuado indica por sí solo la dirección.',
    },
    heart: {
      name: 'Centro del Corazón (Ego)',
      defined:
        'un acceso constante a la fuerza de voluntad y a la sensación del propio valor. Estas personas suelen poder prometer algo y cumplirlo si de verdad les importa, y su fuerza de voluntad, para durar, también necesita pausas.',
      open: 'la fuerza de voluntad no es constante, y el valor de una persona no depende de cuánto haya logrado obligarse a hacer. A veces se hacen promesas para demostrar algo, y entonces cumplirlas cuesta especialmente.',
    },
    spleen: {
      name: 'Centro del Bazo',
      defined:
        'un instinto constante que, en el momento, indica qué es seguro y qué conviene. Habla en voz baja y una sola vez, y la sensación estable de bienestar de quienes lo tienen definido a menudo la perciben también quienes están cerca.',
      open: 'sensibilidad al estado de los demás: la persona percibe bien quién a su alrededor está intranquilo. Puede haber tendencia a aferrarse a lo conocido (personas, relaciones, costumbres) incluso cuando ya no le hace bien, simplemente porque así se está más tranquilo.',
    },
    solarPlexus: {
      name: 'Plexo Solar',
      defined:
        'un ritmo propio de las emociones: las subidas y bajadas siguen su curso y no siempre tienen que ver con lo que pasa alrededor. El estado de ánimo de quienes lo tienen definido se contagia de forma notable a los demás.',
      open: 'una fina sensibilidad a las emociones ajenas: junto a otras personas, las emociones se intensifican y parecen propias. A veces la persona evita conflictos y conversaciones incómodas para no verse arrastrada por la tormenta de otro.',
    },
    sacral: {
      name: 'Centro Sacral',
      defined:
        'una fuerza vital y de trabajo que se recarga cuando uno hace lo que le gusta. Quienes lo tienen definido suelen contagiar energía a los demás: a su lado, a otros también les resulta más fácil ponerse manos a la obra.',
      open: 'no hay un acceso constante a la energía de trabajo, y junto a personas con el Centro Sacral definido parece haber más energía de la que realmente hay. A estas personas les conviene notar cuándo ya es suficiente y no medir su carga por la de quienes tienen este centro definido.',
    },
    root: {
      name: 'Centro Raíz',
      defined:
        'una presión interna estable que ayuda a ponerse en marcha y a cumplir los plazos. Quienes lo tienen definido suelen llevar con calma la prisa y la tensión y trabajan a su propio ritmo.',
      open: 'sensibilidad a la presión y a la prisa del entorno: la tensión ajena se intensifica y se vive como propia. A veces la persona se apresura a terminarlo todo solo para librarse de la tensión, aunque muchas cosas pueden esperar.',
    },
  },
  channels: {
    '1-8': {
      name: 'Inspiración',
      text: 'conecta el Centro G con el Centro de la Garganta: la singularidad de la persona busca expresarse en palabras y en actos. Quienes tienen este canal a menudo inspiran a otros no con consejos, sino haciéndolo todo a su manera, y su aportación creativa se recibe mejor cuando antes se los ha reconocido e invitado.',
    },
    '2-14': {
      name: 'El Compás',
      text: 'conecta el Centro G con el Centro Sacral: quienes tienen este canal cuentan con energía para seguir su propia dirección, aunque no se parezca a la de otros. A menudo marcan el rumbo y encuentran recursos para aquello en lo que confían, y los demás se van sumando detrás.',
    },
    '3-60': {
      name: 'Mutación',
      text: 'conecta el Centro Raíz con el Centro Sacral: la energía llega a impulsos, y en las pausas puede haber melancolía y desorientación. A cambio, en quienes tienen este canal, de esas pausas a menudo nace algo realmente nuevo, si se le deja madurar sin prisas.',
    },
    '4-63': {
      name: 'Lógica',
      text: 'conecta el Centro de la Cabeza con el Ajna: la duda empuja a buscar patrones y respuestas lógicas. Quienes tienen este canal suelen notar dónde falla un razonamiento, y sus conclusiones son especialmente útiles cuando se comprueban en la práctica en lugar de aceptarse a ciegas.',
    },
    '5-15': {
      name: 'Ritmo',
      text: 'conecta el Centro Sacral con el Centro G: quienes tienen este canal suelen tener su propio ritmo natural para trabajar, descansar y emprender algo nuevo. Cuando viven según ese ritmo y no según un horario impuesto, las cosas fluyen mejor, y a su lado también los demás encuentran su ritmo.',
    },
    '6-59': {
      name: 'Intimidad',
      text: 'conecta el Plexo Solar con el Centro Sacral: es una energía de acercamiento que ayuda a romper el hielo y a crear confianza. Para quienes tienen este canal la cercanía suele ser importante, y a su lado a otros les resulta más fácil abrirse, sobre todo si se da tiempo a los sentimientos.',
    },
    '7-31': {
      name: 'El Alfa',
      text: 'conecta el Centro G con el Centro de la Garganta: es un liderazgo que se sostiene en el reconocimiento. A quienes tienen este canal se los elige a menudo para guiar, y su influencia es mayor cuando se los ha invitado a liderar que cuando se atribuyen ellos mismos ese papel.',
    },
    '9-52': {
      name: 'Concentración',
      text: 'conecta el Centro Raíz con el Centro Sacral: la energía se reúne en un solo punto, y la persona puede mantener la atención en una tarea y en sus detalles durante mucho tiempo y con calma. Cuando la actividad se elige siguiendo la respuesta, esa concentración trae satisfacción; sin nada que hacer, a menudo se convierte en inquietud.',
    },
    '10-20': {
      name: 'Despertar',
      text: 'conecta el Centro G con el Centro de la Garganta: lo importante es ser uno mismo aquí y ahora, hablar y actuar según las propias convicciones. Quienes tienen este canal a menudo despiertan a otros no con sermones, sino con el ejemplo de cómo se puede vivir a su manera.',
    },
    '10-34': {
      name: 'Exploración',
      text: 'conecta el Centro G con el Centro Sacral: la energía se dedica a vivir según las propias convicciones. Quienes tienen este canal suelen seguir su propio camino y llevan mal las indicaciones ajenas, y su independencia, cuando nace de la respuesta y no de la terquedad, puede servir de ejemplo a otros.',
    },
    '10-57': {
      name: 'Forma Perfeccionada',
      text: 'conecta el Centro G con el Centro del Bazo: la intuición del momento indica cómo actuar para seguir siendo uno mismo. Quienes tienen este canal suelen tener sentido de la forma y del estilo, y les conviene más confiar en su instinto interior que en un plan pensado de antemano.',
    },
    '11-56': {
      name: 'Curiosidad',
      text: 'conecta el Ajna con el Centro de la Garganta: las ideas y las impresiones se convierten en historias. Quienes tienen este canal a menudo buscan lo nuevo por el placer de buscar, y sus relatos despiertan en otros ideas que invitan a la reflexión.',
    },
    '12-22': {
      name: 'Apertura',
      text: 'conecta el Plexo Solar con el Centro de la Garganta: los sentimientos buscan salida en las palabras, la entonación y la creación. Mucho depende del estado de ánimo: en el momento adecuado, quienes tienen este canal logran conmover a otros con sus palabras, y cuando no están de humor les conviene callar.',
    },
    '13-33': {
      name: 'El Pródigo',
      text: 'conecta el Centro G con el Centro de la Garganta: es la capacidad de escuchar, recordar y luego dar sentido a lo vivido, propio y ajeno. A quienes tienen este canal a menudo les confían historias y secretos, y tras una pausa y un tiempo a solas su experiencia se convierte en conclusiones útiles para otros.',
    },
    '16-48': {
      name: 'La Longitud de Onda',
      text: 'conecta el Centro del Bazo con el Centro de la Garganta: aquí la profundidad del conocimiento se une a la capacidad de mostrarlo. En quienes tienen este canal, la maestría suele crecer con la repetición y la práctica, y un talento pulido se hace visible para otros sin necesidad de palabras.',
    },
    '17-62': {
      name: 'Aceptación',
      text: 'conecta el Ajna con el Centro de la Garganta: los pensamientos se convierten en opiniones respaldadas por hechos y detalles. Quienes tienen este canal suelen explicar y ordenar bien las cosas, y su opinión se acepta mejor cuando se la han pedido.',
    },
    '18-58': {
      name: 'Juicio',
      text: 'conecta el Centro Raíz con el Centro del Bazo: aquí hay un impulso insaciable de ver lo que se puede corregir y alegría cuando algo mejora. Quienes tienen este canal a menudo detectan los puntos débiles de proyectos y sistemas, y sus observaciones son más útiles cuando se las han pedido que cuando suenan a reproche.',
    },
    '19-49': {
      name: 'Síntesis',
      text: 'conecta el Centro Raíz con el Plexo Solar: es una sensibilidad hacia lo que necesitan las personas (cercanía, un techo, un lugar entre los suyos). Para quienes tienen este canal son importantes los principios y un intercambio justo en las relaciones, y a menudo son los primeros en notar a quién le falta algo.',
    },
    '20-34': {
      name: 'Carisma',
      text: 'conecta el Centro Sacral con el Centro de la Garganta: la energía pasa de inmediato a la acción, sin largos preparativos. Quienes tienen este canal suelen estar ocupados en algo y actúan con rapidez, y esa rapidez les favorece cuando la tarea se elige siguiendo la respuesta y no porque surgió sin más.',
    },
    '20-57': {
      name: 'La Onda Cerebral',
      text: 'conecta el Centro del Bazo con el Centro de la Garganta: la intuición actúa al instante y encuentra enseguida las palabras. Quienes tienen este canal a menudo captan la esencia de una situación antes que los demás, y su primera impresión suele ser acertada si no la rebaten con razonamientos.',
    },
    '21-45': {
      name: 'El Dinero',
      text: 'conecta el Centro del Corazón con el Centro de la Garganta: aquí está la voluntad de gestionar los recursos y de procurar que a los suyos no les falte nada. Para quienes tienen este canal suele ser importante dirigir ellos mismos su parte del trabajo, y organizan bien a otros cuando se les reconoce ese papel.',
    },
    '23-43': {
      name: 'Estructuración',
      text: 'conecta el Ajna con el Centro de la Garganta: las revelaciones inesperadas buscan palabras comprensibles. A quienes tienen este canal a menudo se les ocurren ideas adelantadas a su tiempo, y se les escucha mejor cuando el interlocutor ha preguntado y la explicación es sencilla.',
    },
    '24-61': {
      name: 'Consciencia',
      text: 'conecta el Centro de la Cabeza con el Ajna: la mente vuelve una y otra vez al mismo enigma hasta que llega la comprensión. A quienes tienen este canal les cuesta a veces soltar una pregunta, y la revelación suele llegar sola, en silencio, y no bajo presión.',
    },
    '25-51': {
      name: 'Iniciación',
      text: 'conecta el Centro G con el Centro del Corazón, de ahí el deseo de ser el primero y el valor de adentrarse en lo desconocido. En quienes tienen este canal, las sacudidas y los giros bruscos a menudo se convierten en el comienzo de algo nuevo, y su ejemplo puede animar a otros a dar su propio paso.',
    },
    '26-44': {
      name: 'Transmisión',
      text: 'conecta el Centro del Bazo con el Centro del Corazón: el instinto indica qué necesitan ahora las personas, y la voluntad ayuda a hacérselo llegar. A quienes tienen este canal a menudo se les dan bien las negociaciones: saben presentar una idea de modo que den ganas de aceptarla y recuerdan lo que funcionó antes.',
    },
    '27-50': {
      name: 'Preservación',
      text: 'conecta el Centro Sacral con el Centro del Bazo: es una energía de cuidado, el deseo de proteger y apoyar a los suyos y de preservar lo que para ellos es valioso. Quienes tienen este canal a menudo asumen la responsabilidad de muchas personas, y les conviene elegir a quién cuidar para no cargar con más de lo que desean.',
    },
    '28-38': {
      name: 'Lucha',
      text: 'conecta el Centro Raíz con el Centro del Bazo: aquí está la tenacidad en la búsqueda de sentido. Quienes tienen este canal están dispuestos a luchar por lo que les importa, y las dificultades más bien los fortalecen que los detienen, siempre que luchen por su propia causa y no por luchar.',
    },
    '29-46': {
      name: 'Descubrimiento',
      text: 'conecta el Centro Sacral con el Centro G: si el «sí» nace de la respuesta, hay energía para vivir la experiencia hasta el final. Quienes tienen este canal a menudo consiguen lo que se proponen donde otros se rinden, por eso para ellos es especialmente importante a qué dicen que sí.',
    },
    '30-41': {
      name: 'Reconocimiento',
      text: 'conecta el Centro Raíz con el Plexo Solar: es la sed de vivencias nuevas y los deseos intensos detrás de los cuales hay sueños. A quienes tienen este canal la experiencia suele aportarles más si entran en ella cuando la emoción se ha asentado, y no en su punto álgido.',
    },
    '32-54': {
      name: 'Transformación',
      text: 'conecta el Centro Raíz con el Centro del Bazo: aquí hay ambición y olfato para lo que perdurará. Quienes tienen este canal suelen aspirar a ascender y cambiar su posición, y avanzan con más facilidad cuando otros reconocen y apoyan su esfuerzo.',
    },
    '34-57': {
      name: 'Poder',
      text: 'conecta el Centro Sacral con el Centro del Bazo: la fuerza y la intuición actúan juntas y en el momento. Quienes tienen este canal a menudo reaccionan a una situación antes de tener tiempo de pensarla, y esa reacción, cuando nace de la respuesta, suele ser acertada.',
    },
    '35-36': {
      name: 'Transitoriedad',
      text: 'conecta el Plexo Solar con el Centro de la Garganta: es el anhelo de impresiones nuevas y de experiencia por la experiencia misma. Quienes tienen este canal quieren probar muchas cosas, y con el tiempo los momentos de euforia y las decepciones que han vivido se convierten en una sabiduría que comparten.',
    },
    '37-40': {
      name: 'Comunidad',
      text: 'conecta el Centro del Corazón con el Plexo Solar: es el canal de los acuerdos (quién hace qué por la causa común y qué recibe a cambio). Para quienes tienen este canal son importantes la lealtad y el intercambio justo, y también el tiempo para sí mismos, para recuperar fuerzas.',
    },
    '39-55': {
      name: 'Emotividad',
      text: 'conecta el Centro Raíz con el Plexo Solar: aquí el estado de ánimo cambia mucho y a menudo, y de esos cambios suele nacer la creatividad. Quienes tienen este canal no necesitan buscar fuera la causa de cada tristeza: el estado de ánimo puede llegar e irse por sí solo.',
    },
    '42-53': {
      name: 'Maduración',
      text: 'conecta el Centro Raíz con el Centro Sacral: es la energía de los ciclos (empezar, recorrer y terminar). Para quienes tienen este canal es importante llevar hasta el final lo que empiezan, y la experiencia vivida por completo se convierte, para ellos y para otros, en fuente de madurez.',
    },
    '47-64': {
      name: 'Abstracción',
      text: 'conecta el Centro de la Cabeza con el Ajna: en la mente giran imágenes y recuerdos hasta que de ellos surge un sentido. Quienes tienen este canal conocen bien la confusión que con el tiempo se convierte por sí sola en claridad, y sus conclusiones sobre lo vivido pueden ser valiosas para otros.',
    },
  },
  typesSection: {
    heading: 'Los cinco tipos del Diseño Humano',
    lead: 'El tipo depende de qué centros están definidos y de cómo se conectan entre sí. Ningún tipo es mejor que otro: cada uno tiene su estrategia, una pista sobre cómo empezar las cosas y tomar decisiones con más facilidad, para gastar menos energía en resistencias.',
  },
  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Por qué hace falta la hora exacta de nacimiento?',
      a: 'La Luna se mueve rápido y pasa a la puerta vecina en aproximadamente medio día. Con el cambio de puerta pueden aparecer o desaparecer canales, y entonces cambian los centros definidos y, a veces, el tipo y la autoridad. El perfil depende de las líneas del Sol: este avanza más despacio, pero cerca del límite de una línea bastan unas horas para cambiar el perfil. Si solo conoce la hora aproximada, calcule dos o tres variantes: puede apoyarse en lo que coincida en todas.',
    },
    {
      q: 'Mi ciudad no está en la lista, ¿qué hago?',
      a: 'Elija la ciudad grande más cercana del mismo huso horario, mejor de la misma región: los límites de los husos han cambiado con los años. La ciudad solo se necesita por el huso horario y el horario de verano del año de nacimiento: con ellos, la hora local de nacimiento se pasa a UTC. Las coordenadas no entran en el cálculo, así que una ciudad vecina del mismo huso da la misma carta, y un error de una hora en el huso equivale a un error de una hora en la hora de nacimiento.',
    },
    {
      q: '¿Se guardan mis datos?',
      a: 'No. La carta se calcula directamente en su navegador: la fecha, la hora y la ciudad de nacimiento no se envían a ningún servidor, y al recargar la página el formulario aparece vacío. Si pulsa «Analizarlo con Raya», el borrador del mensaje con esos datos esperará en su navegador mientras inicia sesión en Linkeon y se borrará en cuanto aparezca en el campo de mensaje o cierre la sesión. Raya solo los verá si es usted quien le envía el mensaje.',
    },
    {
      q: '¿En qué se diferencia del análisis con Raya?',
      a: 'La calculadora es gratuita y funciona sin registro: traza la carta y describe cómo suele manifestarse cada parte en las personas. Raya analiza la carta en su conjunto: cómo se relacionan las partes entre sí y qué significa eso en la práctica. Responde a sus preguntas y le propone un experimento de 7 días; además, explica la cruz de encarnación y analiza las cartas de sus seres queridos. Para hablar con Raya hay que iniciar sesión en Linkeon; al registrarse, 25.000 tokens de regalo.',
    },
    {
      q: '¿Por qué otra web me dio un resultado distinto?',
      a: 'Primero compare la diferencia con UTC en la fecha de nacimiento: aquí aparece debajo del campo de la ciudad. En una misma ciudad, el huso horario y las reglas del horario de verano han cambiado de un año a otro, y no todas las webs lo tienen en cuenta; un error de una hora desplaza la Luna y, con ella, a veces los canales y el tipo. Otra causa es el nodo lunar: aquí se usa el nodo verdadero, y con el nodo medio los nodos pueden caer en otra línea y, rara vez, en otra puerta. Además, un planeta justo en el límite de una línea puede quedar a un lado u otro según el programa.',
    },
  ],
  disclaimer:
    'El Diseño Humano es una herramienta de autoconocimiento, no una predicción, y no sustituye a un médico, un abogado ni un asesor financiero.',
  credits: 'Ciudades y husos horarios —',
  licenses: 'Licencias de componentes de terceros',
  message:
    '¡Hola, Raya! Mis datos de nacimiento: {date}, {time}, {city} ({offset}). La calculadora me ha dado: {type}, perfil {profile}, {authority}. Cuéntame qué significa para mí',
};

export default es;
