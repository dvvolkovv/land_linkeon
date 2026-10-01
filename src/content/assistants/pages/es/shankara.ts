import type { AssistantPageText } from '../../types';

/**
 * Шанкара — ведическая астрология (Джйотиш), сидерический зодиак, аянамса Лахири. Перевод pages/ru/shankara.ts.
 * Не «натальная карта» в западном смысле: на странице — «карта рождения».
 *
 * Пример — docs/assistant-pages/examples/shankara.md, сокращён. Расчёт в нём
 * сверен 01.10.2026 независимо (astronomy-engine + аянамса Лахири): лагна —
 * Овен 23,7°, Бхарани; Луна — Весы 0,3°, Читра; Марс — Козерог, 10-й дом;
 * маха-даша Юпитера — 2011,5–2027,5, антар-даша Раху — до середины 2027-го.
 *
 * Перевод: «карта рождения» — «carta natal». По-испански это общее слово для
 * карты рождения в любой традиции, а не западный термин; в поисковых полях —
 * «carta natal védica», так ищут Джйотиш. В примере Шанкара, как и в русском
 * ответе, говорит на «ты» — tú.
 */
const shankara: AssistantPageText = {
  title: 'Astrología védica (Jyotish) online — Shankara | Linkeon',
  description:
    'Shankara, astrólogo védico. Calcula su carta natal védica en el zodíaco sideral y le explica el lagna, las nakshatras y los dashas: en qué periodo está y qué se deduce de ello.',
  h1: 'Astrología védica (Jyotish): Shankara analiza su carta natal',
  lead: 'Indique la fecha, la hora y la ciudad de nacimiento: Shankara calculará su carta como se hace en el Jyotish y le explicará en qué periodo se encuentra ahora y qué se deduce de ello.',
  card: 'Carta natal según el Jyotish: lagna, Luna y nakshatras, dasha actual, tránsitos y un siguiente paso.',
  cta: 'Hablar con Shankara',
  situations: [
    'En la astrología occidental es Piscis, en la védica resulta ser Acuario, y quiere entender por qué.',
    'Quiere saber en qué maha dasha está ahora y cuándo cambiará.',
    'Piensa en cambiar de trabajo o en emprender, y quiere verlo a través de su carta.',
    'Solo conoce su hora de nacimiento aproximada y no sabe en qué influye eso.',
  ],
  example: {
    question: 'Nací el 14 de marzo de 1990 a las 07:30 en Kazán. ¿Qué muestra mi carta natal?',
    answer: `Paz para ti. Soy Shankara. He calculado tu carta en el zodíaco sideral (ayanamsa Lahiri). Datos de partida: 14/03/1990, 07:30, Kazán, UTC+3.

Lo principal de la carta

1. Lagna (ascendente) — Aries, 23°, nakshatra Bharani.
Eres una persona de acción: directa, valiente, tomas la iniciativa tú misma. …

2. Lo más fuerte de la carta: Marte exaltado en la casa 10 (Capricornio).
Marte rige tu lagna y está en su mejor signo, en la casa de la carrera. Es Ruchaka yoga, uno de los cinco «yogas de la gran persona». Da una voluntad fuerte, dotes de organización y capacidad para levantar un negocio propio. …

…

En qué periodo estás

— Maha dasha de Júpiter (2011–2027); ahora transcurre el antar dasha de Rahu, hasta julio de 2027 aproximadamente. Es una época de ambición, giros inesperados y ganas de cambiar de rumbo de golpe. …
— A mediados de 2027 empieza el maha dasha de Saturno, que dura 19 años. …

…

Siguiente paso

Aprovecha el periodo hasta el verano de 2027 para preparar el nuevo rumbo: formarte, poner a prueba la idea, reunir a los primeros clientes. El lanzamiento en sí, hazlo en 2027. Upaya (práctica de apoyo) para Marte: los martes, fuerza física (deporte o trabajo manual) y el mantra «Om Angarakaya Namaha» 108 veces.

La carta muestra tendencias; las decisiones son tuyas.

¿Qué ámbito es ahora el más importante para ti: la carrera y tu propio negocio, las relaciones u otra cosa?`,
  },
  can: [
    'Calcula la carta en el zodíaco sideral con la ayanamsa Lahiri, como se hace en el Jyotish.',
    'Explica el lagna, la Luna y su nakshatra, el Sol y los planetas de las casas clave: qué significan para su trabajo y sus relaciones.',
    'Le indica el maha dasha y el antar dasha en curso y los tránsitos fuertes de Saturno, Júpiter, Rahu y Ketu para los próximos 6–18 meses.',
    'Propone un único paso siguiente: un momento propicio para una decisión importante o un upaya, una práctica de apoyo, como un mantra.',
    'Analiza la carta de la persona por la que pregunta (la suya, la de su hijo, la de su pareja) y no las confunde.',
  ],
  cannot: [
    'No predice muertes, enfermedades graves ni catástrofes: habla de tendencias y ciclos.',
    'No es una predicción del destino: la carta es un mapa del terreno, no una sentencia, y las decisiones son suyas.',
    'No sustituye a un médico, un abogado ni un asesor financiero: lo que diga sobre salud y dinero es astrología, no un diagnóstico ni un consejo financiero.',
    'No se inventa la hora de nacimiento: sin ella, levanta una carta lunar (Chandra lagna) y le advierte de que el ascendente y las casas son aproximados.',
  ],
  faq: [
    {
      q: '¿En qué se diferencia la astrología védica de la occidental?',
      a: 'La occidental cuenta los signos desde el equinoccio de primavera (zodíaco tropical); el Jyotish, según las estrellas (zodíaco sideral), con la corrección de Lahiri. Hoy la diferencia es de unos 24°, así que el signo a menudo retrocede uno: un Piscis occidental muchas veces resulta ser Acuario en el Jyotish.',
    },
    {
      q: '¿Qué hace falta para el análisis?',
      a: 'La fecha, la hora y la ciudad de nacimiento: de la hora dependen el lagna y las casas. Si falta algo, Shankara analizará lo que haya y aclarará el resto con una sola pregunta.',
    },
    {
      q: '¿Qué son las nakshatras y los maha dashas?',
      a: 'Las nakshatras son los 27 sectores lunares del zodíaco. Los maha dashas son los grandes periodos de la vida, cada uno «regido» por un planeta: según el sistema Vimshottari, cada uno dura entre 6 y 20 años.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de una calculadora o de un chatbot corriente?',
      a: 'Una calculadora da descripciones genéricas; Shankara analiza su propia carta y su periodo actual. Además, los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos.',
    },
  ],
};

export default shankara;
