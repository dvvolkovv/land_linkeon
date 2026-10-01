import type { AssistantPageText } from '../../types';

/**
 * Лиана — нумерология. Перевод pages/ru/liana.ts. Пример — docs/assistant-pages/examples/liana.md:
 * снята разметка (заголовки, жирный, таблица квадрата Пифагора), маркеры
 * списков «-» стали «—»; знаки ➕/➖ у строк «Сила / уязвимость» — её
 * собственные, оставлены как пришли.
 *
 * Перевод: школа «Сюцай» — Xiucai (пиньинь того же названия, 秀才).
 */
const liana: AssistantPageText = {
  title: 'Numeróloga online: lectura por fecha de nacimiento — Liana | Linkeon',
  description:
    'Liana, numeróloga online. Analiza su fecha de nacimiento según ocho escuelas (Xiucai, pitagórica, Ba Zi y otras): temas, fortalezas, años de activación y su próximo ciclo.',
  h1: 'Lectura numerológica por fecha de nacimiento: Liana, numeróloga online',
  lead: 'Indique el nombre, la fecha, la hora y la ciudad de nacimiento, suyos o de un ser querido. Liana calcula los números y le cuenta qué significan en ocho escuelas de numerología, de dos en dos.',
  card: 'Su fecha de nacimiento según ocho escuelas de numerología (Xiucai, pitagórica, Ba Zi y otras): fortalezas, años de activación, ciclos.',
  cta: 'Hablar con Liana',
  situations: [
    'Quiere saber qué dicen los números de su propia fecha de nacimiento, no una descripción genérica de internet.',
    'Ha oído hablar del Xiucai o del cuadrado de Pitágoras y quiere analizar su fecha.',
    'Le interesa ver cómo leen una misma fecha distintas escuelas de numerología.',
    'Siente que una etapa de su vida ha terminado y quiere ver qué ciclo empieza.',
    'Quiere analizar la fecha de su hijo o de su pareja.',
  ],
  example: {
    question: 'Hágame una lectura numerológica: Anna, 14/03/1990, 07:30, Kazán.',
    answer: `Persona: Anna, nacida el 14/03/1990, 07:30, Kazán.

1. Xiucai

Códigos: número de la conciencia 5 (día 14 → 1+4), número de la misión 9 (1+4+0+3+1+9+9+0 = 27 → 9).

Temas principales y propósito
— 5 — libertad, movimiento, comunicación, adaptación rápida, interés por muchas cosas a la vez.
— 9 — misión de servicio, de guía, de temas humanitarios y «grandes». La experiencia se convierte en sabiduría y se transmite a los demás.
— Combinación 5→9: a través de experiencias diversas, cambios y contactos, Anna llega al papel de guía o de maestra.

Fortaleza / vulnerabilidad
➕ Carisma, facilidad para relacionarse, mente flexible, capacidad de vender ideas e inspirar.
➖ Dispersión, impaciencia, aburrimiento ante la rutina, decisiones impulsivas. El 9 añade la tendencia a cargar con lo ajeno y a «salvar» a los demás.

Años de activación
— Carrera, comienzos: 2018, 2027.
— Amor, familia: 2023, 2032.
— Dinero: 2025, 2034.
— Transformación, balance: 2017, 2026.

Cierres: 2026 cierra el ciclo de 9 años que empezó en 2018.

2. Clásica (pitagórica)

Número del camino de vida: 27 → 9. Número del día de nacimiento: 14 → 5.
…

Pináculos (cimas) del camino de vida
— Hasta 2017 — 8: formación a través de lo material y el estatus.
— 2017–2026 — 6: familia, responsabilidad, cuidado, relaciones.
— 2026–2035 — 5: libertad, cambios, nuevos ámbitos, movilidad.
— Desde 2035 — 4: estructura, estabilidad, cimientos.

…

¿Sigo con la 3 y la 4 (védica y cabalística)?`,
  },
  can: [
    'Analiza la fecha según ocho escuelas: Xiucai, pitagórica, védica, cabalística, arcanos del tarot, Ba Zi, astronumerología y «Finanzas y realización».',
    'En cada escuela señala los temas principales y el propósito, las fortalezas y vulnerabilidades, los años de activación en el amor, la carrera y el dinero, y los cierres de ciclo.',
    'Entrega la lectura por partes, dos escuelas cada vez, y le pregunta si quiere seguir.',
    'Al final lo resume todo brevemente: quién es la persona según su código y qué ciclo le espera en los próximos dos años.',
    'Analiza la fecha de la persona por la que pregunta (la suya, la de su hijo, la de su pareja) y no la confunde con otras.',
  ],
  cannot: [
    'No da consejos ni decide por usted. Liana le cuenta qué significan los números; qué hacer con ello lo decide usted.',
    'No es una predicción del destino: los años de activación son una interpretación numerológica, no la promesa de que algo vaya a ocurrir.',
    'No sustituye a un médico, un abogado ni un asesor financiero. Si la lectura habla de salud o de dinero, es numerología, no un diagnóstico ni un consejo financiero.',
  ],
  faq: [
    {
      q: '¿Qué hace falta para la lectura?',
      a: 'El nombre, la fecha, la hora y la ciudad de nacimiento, como en el ejemplo de arriba. Liana repite esos datos al principio de cada respuesta para que quede claro de quién es la lectura.',
    },
    {
      q: '¿En qué se diferencian las escuelas?',
      a: 'Cada una calcula a su manera. El Xiucai, el número de la conciencia y el de la misión; la pitagórica, el cuadrado de Pitágoras y el número del camino de vida; la cabalística, las vibraciones del nombre; el Ba Zi, el elemento de la personalidad y la influencia del año.',
    },
    {
      q: '¿Qué son los años de activación?',
      a: 'Los años en los que, según el cálculo, cae uno de los temas: amor, carrera, dinero o cambios. Para la Anna del ejemplo, carrera y comienzos son 2018 y 2027.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de una calculadora de internet?',
      a: 'Una calculadora le da números y descripciones genéricas. Liana analiza su fecha según ocho escuelas y al final lo reúne todo en un solo resumen. Además, los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos.',
    },
  ],
};

export default liana;
