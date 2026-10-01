import type { AssistantPageText } from '../../types';

/**
 * Андрей — запуск бизнеса. Перевод pages/ru/andrey.ts. Пример разговора — docs/assistant-pages/examples/andrey.md.
 *
 * В lead русские «неделя и сумма в рублях» переданы как «en una semana y con
 * muy poco dinero»: рублёвая сумма вне примера иностранцу ничего не говорит.
 */
const andrey: AssistantPageText = {
  title: 'Cómo abrir un negocio: asesoría para emprender — Andréi | Linkeon',
  description:
    'Andréi ayuda a abrir un negocio: validar la demanda antes de invertir, elegir forma jurídica y régimen fiscal, calcular el punto de equilibrio y planificar hasta el primer cobro.',
  h1: 'Cómo abrir un negocio: Andréi le acompaña de la idea a los primeros ingresos',
  lead: 'Tiene una idea y unos ahorros, y le da miedo invertirlos donde no debe. Andréi le preguntará primero por el presupuesto y los plazos, y después le mostrará qué se puede comprobar en una semana y con muy poco dinero.',
  card: 'Emprender: validar la demanda antes de invertir, autónomo o autoempleo, primeros clientes, punto de equilibrio, plan hasta el primer cobro.',
  cta: 'Hablar con Andréi',
  situations: [
    'Quiere dejar su empleo para tener su propio negocio y no sabe para cuántos meses le alcanzan los ahorros.',
    'Tiene la idea de un producto, pero todavía no ha hablado con ningún futuro comprador.',
    'Duda entre el régimen de autoempleo, hacerse autónomo o crear una sociedad limitada, y cada conocido le aconseja una cosa distinta.',
    'Los primeros clientes llegaron por conocidos, y no tiene claro dónde encontrar a los siguientes ni cuánto cobrarles.',
    'El negocio arrancó hace seis meses, hay pedidos, pero todavía no da beneficios.',
  ],
  example: {
    question: 'Quiero abrir una cafetería para llevar junto al metro. ¿Por dónde empiezo y cuánto dinero necesito para arrancar?',
    answer: `Cafetería para llevar junto al metro: por dónde empezar y cuánto dinero hace falta

No empiece por la cafetera, sino por la ubicación. En una cafetería para llevar, la facturación depende casi por completo del sitio. Mientras no haya contado a la gente que pasa por una salida concreta del metro, cualquier presupuesto es pura adivinanza.

Cuánto dinero hace falta para arrancar

Es una estimación según la práctica habitual. Las cifras exactas dependen de la ciudad y de la superficie del local.

Partida — Regiones — Moscú y San Petersburgo
…
Total — ~1,1–2,3 millones de rublos — ~2–4,4 millones de rublos

…

El colchón para los primeros meses es una partida obligatoria. Una cafetería suele alcanzar un flujo normal de clientes en 2–4 meses, y las que más cierran son las que para entonces se han quedado sin dinero.

Cuántas tazas hay que vender (estimación para Moscú)

— Ticket medio de unos 300 ₽. El coste de cada taza, incluida la comisión del pago con tarjeta, ronda el 30%, así que de cada taza quedan unos 200 ₽.
…
— Punto de equilibrio: unas 60 tazas al día. En una buena ubicación se venden 150–250 tazas al día; en una mala, 30–40, y entonces la cafetería pierde dinero.

…

El riesgo principal

Una mala ubicación. La señal de que hay que parar: a los 3 meses se venden menos de 40 tazas al día y la facturación no crece. A partir de ahí, solo se irá consumiendo el colchón.

Qué hacer hoy: elija dos ubicaciones junto a su estación de metro y mañana por la mañana cuente cuánta gente pasa por cada una.

¿En qué ciudad y junto a qué estación quiere abrir, y cuánto dinero está dispuesto a invertir? Con esos datos le calculo un presupuesto más preciso.`,
  },
  can: [
    'Pone a prueba la idea antes de invertir: cómo comprobar la demanda gastando poco y cuál es la versión mínima necesaria para la primera venta.',
    'Ayuda a elegir la forma jurídica y el régimen fiscal según su modelo: autoempleo, autónomo o sociedad limitada; régimen simplificado (USN), su versión automatizada (AUSN) o patente.',
    'Calcula con sus cifras el punto de equilibrio, la economía unitaria y el margen de seguridad: para cuántos meses le alcanza el dinero.',
    'Le da un plan hasta los primeros ingresos: de tres a cinco pasos con plazos y costes, el riesgo principal y la señal de que toca parar.',
    'Analiza el precio, los primeros clientes, la primera contratación y lo que ya está en marcha pero no avanza.',
    'Comprueba en internet los tipos y tarifas vigentes, los límites de cada régimen y los requisitos de plataformas y bancos.',
  ],
  cannot: [
    'No promete ingresos ni da como un hecho el plazo de recuperación de la inversión: cualquier cifra es una estimación con sus supuestos explícitos.',
    'No le anima ni le desanima. Si con sus cifras el proyecto no sale, Andréi se lo dirá de entrada.',
    'No recomienda esquemas de evasión fiscal ni dividir el negocio para tributar menos.',
    'No sustituye al contable ni al abogado: le dirá qué va a necesitar; para calcular el impuesto, acuda a la contable Anna; para redactar un contrato, al abogado Alexéi.',
  ],
  faq: [
    {
      q: '¿Para qué país asesora Andréi?',
      a: 'Por defecto, para Rusia: régimen de autoempleo, régimen simplificado automatizado (AUSN), marketplaces, cobro con tarjeta. Si va a emprender en otro país, dígale cuál: la demanda y el punto de equilibrio se calculan igual, pero la forma jurídica y los impuestos compruébelos con un especialista local.',
    },
    {
      q: '¿Puedo enviar un plan de negocio o las condiciones de una plataforma?',
      a: 'Sí, en PDF o como documento. Andréi analiza planes de negocio, propuestas comerciales y condiciones de los marketplaces; el archivo se lee entero.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Cuando Andréi le ayude a elegir el régimen, no tendrá que volver a explicarle a la contable Anna a qué se dedica.',
    },
  ],
};

export default andrey;
