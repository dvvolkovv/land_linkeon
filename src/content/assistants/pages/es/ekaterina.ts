import type { AssistantPageText } from '../../types';

/**
 * Екатерина — тексты и продвижение. Перевод pages/ru/ekaterina.ts.
 *
 * Раньше Екатерина по своей инструкции писала тексты только по-русски, и эта
 * страница подавала её как копирайтера для русскоязычной аудитории, с лишним
 * первым пунктом о языке в «Чего не делает». 06.10.2026 инструкцию исправили:
 * теперь она пишет на языке человека (проверено на проде), оговорка снята.
 * Пример разговора — настоящий, на русском, и показан в переводе; подпись об
 * этом остаётся верной.
 */
const ekaterina: AssistantPageText = {
  title: 'Redactora publicitaria con IA: textos de venta — Ekaterina | Linkeon',
  description:
    'Ekaterina, redactora publicitaria con IA: escribe posts de Telegram, newsletters, landing pages y eslóganes, pule borradores y prepara el plan de contenido.',
  h1: 'Ekaterina — redactora publicitaria con IA: textos de venta, posts y newsletters',
  lead: 'El lanzamiento es el lunes y todavía no tiene el anuncio. Cuéntele a Ekaterina con sus palabras qué vende y a quién: le devolverá un texto terminado y una versión más corta.',
  card: 'Posts, newsletters, landing pages y eslóganes. Convierte una idea o un borrador en un texto terminado y propone varias versiones.',
  cta: 'Hablar con Ekaterina',
  situations: [
    'Toca avisar a los clientes de los nuevos precios y no quiere que el mensaje suene a excusa.',
    'Tiene el borrador de un post, pero es largo y enrevesado, y no le apetece publicarlo.',
    'Su canal va a trompicones: tres posts en un día y luego un mes de silencio.',
    'Necesita el texto de una landing page y no sabe qué beneficios poner en la primera pantalla.',
    'Dentro de dos semanas empiezan las ventas de su curso y quiere preparar antes a sus seguidores.',
    'Su marca escribe unas veces en tono formal y otras en broma, y sus seguidores no reconocen su voz.',
  ],
  example: {
    question:
      'Escriba un post para nuestro canal de Telegram sobre el lanzamiento de nuestro nuevo servicio: limpieza de muebles a domicilio.',
    answer: `Aquí tiene el post terminado. Entre corchetes van los huecos para sus datos.

🛋 ¡Limpieza de muebles, ahora en su casa!

El sofá donde se derramó el café. El sillón favorito del gato. El colchón que hace tiempo pide un repaso.

Antes había que llevar los muebles a limpiar o vivir con las manchas. Ahora es más fácil: vamos nosotros a su casa.

✨ Qué limpiamos:
— sofás y sillones
— colchones
— sillas y pufs
— alfombras y moquetas
— tapicería de coche (si lo ofrecen)

🧼 Por qué con nosotros está en buenas manos:
✔️ Equipos profesionales y productos hipoalergénicos: seguros para niños y mascotas
✔️ Eliminamos manchas, olores, polvo y ácaros
✔️ Los muebles se secan en [4–6] horas
…

🎁 Regalo de lanzamiento: hasta el [fecha], un [20]% de descuento en el primer pedido con la palabra «LIMPIO».

📲 Reservas y presupuestos: [teléfono / @usuario / enlace]
Envíenos una foto de sus muebles y le calculamos el precio en 5 minutos.

Su sofá merece una segunda oportunidad 💙

Versión corta (para un anuncio o para repetir):

🛋 ¡Nuevo servicio: limpieza de muebles a domicilio!
Vamos a su casa y limpiamos allí mismo el sofá, los sillones, el colchón o la alfombra. Productos seguros; se seca en unas horas.
…

Si me dice la ciudad, los precios, el nombre de la empresa y su público (familias con niños, oficinas, dueños de mascotas), afinaré el texto. …`,
  },
  can: [
    'Escribe textos de cualquier formato: posts, guiones de stories, mensajes para canales de Telegram, textos de landing pages, eslóganes, newsletters.',
    'Toma un texto en bruto y lo deja más limpio, más lógico y más convincente.',
    'Propone versiones (corta y extendida, emocional y experta) y adapta el estilo a sus lectores.',
    'Arma el plan de contenido y las secciones fijas, y desarrolla una serie de posts que prepara a los seguidores para la compra.',
    'Ayuda a presentar el producto: propuesta de valor, beneficios, argumentos que generan confianza, llamada a la acción.',
    'Le aconseja dónde y cómo promocionarse, le ayuda a encontrar la voz de su marca y explica los principios del marketing con palabras sencillas.',
  ],
  cannot: [
    'No conoce su negocio por dentro y puede atribuirle una ventaja que no tiene. Antes de publicar, revise precios, plazos y promesas a los clientes.',
    'No lanza publicidad ni compra espacios. Ekaterina le sugiere canales y el orden de los pasos, pero darlos le toca a usted.',
    'No promete alcance ni ventas: en el resultado influyen también el producto, el precio y dónde se lea el texto.',
  ],
  faq: [
    {
      q: '¿Puedo enviarle mi borrador?',
      a: 'Sí, como texto en un mensaje o en un archivo. Ekaterina lo dejará más limpio y convincente y, si hace falta, le propondrá una versión corta y otra extendida.',
    },
    {
      q: '¿Qué tengo que contarle para que el texto dé en el clavo?',
      a: 'Qué vende, a quién y dónde se publicará el texto. Si falta algo, Ekaterina se lo preguntará.',
    },
    {
      q: '¿En qué se diferencia Ekaterina de Alexandra, la experta en marketing?',
      a: 'Alexandra empieza por el mercado: a quién vender, cómo destacar frente a la competencia, cómo medir el resultado. Ekaterina se encarga de los textos en sí (del post y la newsletter a la landing page) y del plan de contenido que los acompaña.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Al registrarse recibe 25.000 tokens, sin necesidad de tarjeta bancaria. Después, packs de tokens sin suscripción; los tokens no caducan.',
    },
    {
      q: '¿En qué se diferencia de un chatbot corriente?',
      a: 'Los asistentes de Linkeon comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Si Alexandra ya sabe quiénes son sus clientes, no tendrá que volver a explicárselo a Ekaterina.',
    },
  ],
};

export default ekaterina;
