import type { AssistantPageText } from '../../types';

/**
 * Шанкара — ведическая астрология (Джйотиш), сидерический зодиак, аянамса Лахири.
 * Перевод pages/ru/shankara.ts.
 * Не «натальная карта» в западном смысле: на странице — «карта рождения».
 *
 * Пример — docs/assistant-pages/examples/shankara.md, сокращён. Расчёт в нём
 * сверен 01.10.2026 независимо (astronomy-engine + аянамса Лахири): лагна —
 * Овен 23,7°, Бхарани; Луна — Весы 0,3°, Читра; Марс — Козерог, 10-й дом;
 * маха-даша Юпитера — 2011,5–2027,5, антар-даша Раху — до середины 2027-го.
 */
const shankara: AssistantPageText = {
  title: "Astrologie védique (Jyotish) en ligne — Shankara | Linkeon",
  description:
    "Shankara, astrologue védique, calcule votre thème de naissance dans le zodiaque sidéral et explique lagna, nakshatras et dashas : votre période actuelle et ce qui en découle.",
  h1: "Astrologie védique (Jyotish) : Shankara étudie votre thème de naissance",
  lead: "Donnez votre date, votre heure et votre ville de naissance : Shankara calcule le thème selon les règles du Jyotish et vous explique la période que vous traversez et ce qui en découle.",
  card: "Thème de naissance selon le Jyotish : lagna, Lune et nakshatras, dasha en cours, transits et un seul prochain pas.",
  cta: "Parler avec Shankara",
  situations: [
    "En astrologie occidentale, vous êtes Poissons, mais en astrologie védique, vous voilà Verseau, et vous voulez comprendre pourquoi.",
    "Vous voulez savoir quelle maha-dasha vous traversez en ce moment et quand elle changera.",
    "Vous pensez à changer de travail ou à lancer votre propre affaire et voulez regarder la question à travers votre thème.",
    "Vous ne connaissez votre heure de naissance qu'approximativement et ne savez pas ce que cela change.",
  ],
  example: {
    question: "Je suis née le 14 mars 1990 à 7 h 30 à Kazan. Que montre mon thème de naissance ?",
    answer: `Paix à toi. Je suis Shankara. J'ai calculé ton thème dans le zodiaque sidéral (ayanamsa Lahiri). Données de départ : 14/03/1990, 7 h 30, Kazan, UTC+3.

L'essentiel de ton thème

1. Lagna (ascendant) — Bélier, 23°, nakshatra Bharani.
Tu es une personne d'action : directe, audacieuse, tu prends toi-même les initiatives. …

2. Le point le plus fort du thème : Mars exalté en maison 10 (Capricorne).
Mars est le maître de ta Lagna et se trouve dans son meilleur signe, dans la maison de la carrière. C'est le Ruchaka yoga, l'un des cinq « yogas du grand homme ». Il donne une volonté forte, un don d'organisation et la capacité de bâtir ta propre affaire. …

…

La période actuelle

— Maha-dasha de Jupiter (2011–2027), avec en ce moment l'antar-dasha de Rahu, jusqu'en juillet 2027 environ. C'est un temps d'ambition, de virages inattendus et d'envie de changer brusquement de cap. …
— À partir de la mi-2027 commence la maha-dasha de Saturne, pour 19 ans. …

…

Prochain pas

Profite de la période jusqu'à l'été 2027 pour préparer ta nouvelle voie : te former, tester l'idée, réunir tes premiers clients. Et le lancement proprement dit, fais-le en 2027. Upaya (pratique de soutien) pour Mars : le mardi, la force du corps — sport ou travail manuel — et le mantra « Om Angarakaya Namaha » 108 fois.

Le thème montre des tendances ; les décisions t'appartiennent.

Quel domaine compte le plus pour toi en ce moment : la carrière et ta propre affaire, les relations ou autre chose ?`,
  },
  can: [
    "Calcule le thème dans le zodiaque sidéral avec l'ayanamsa Lahiri, comme le veut le Jyotish.",
    "Explique la lagna, la Lune et son nakshatra, le Soleil et les planètes dans les maisons clés, et ce que cela signifie pour le travail et les relations.",
    "Indique la maha-dasha et l'antar-dasha en cours ainsi que les transits marquants de Saturne, Jupiter, Rahu et Ketu pour les 6 à 18 prochains mois.",
    "Propose un seul prochain pas : une fenêtre pour une décision importante ou un upaya, une pratique de soutien, par exemple un mantra.",
    "Étudie le thème de la personne sur laquelle vous l'interrogez (vous, votre enfant, votre partenaire) sans les confondre.",
  ],
  cannot: [
    "Ne prédit ni la mort, ni les maladies graves, ni les catastrophes : il parle de tendances et de cycles.",
    "Ce n'est pas une prédiction du destin : le thème est une carte du terrain, pas un verdict, et les décisions vous appartiennent.",
    "Ne remplace pas un médecin, un juriste ou un conseiller financier : sur la santé et l'argent, c'est de l'astrologie, pas un diagnostic ni un conseil financier.",
    "N'invente pas l'heure de naissance : sans elle, il établit un thème lunaire (Chandra lagna) et vous prévient que l'ascendant et les maisons sont approximatifs.",
  ],
  faq: [
    {
      q: "Quelle différence entre l'astrologie védique et l'astrologie occidentale ?",
      a: "L'astrologie occidentale compte les signes à partir de l'équinoxe de printemps (zodiaque tropical), le Jyotish d'après les étoiles (zodiaque sidéral), avec la correction de Lahiri. L'écart est aujourd'hui d'environ 24°, si bien que le signe recule souvent d'un cran : les Poissons occidentaux sont souvent Verseau en Jyotish.",
    },
    {
      q: "Que faut-il pour l'étude du thème ?",
      a: "La date, l'heure et la ville de naissance : la lagna et les maisons dépendent de l'heure. S'il manque quelque chose, Shankara étudie ce qui est disponible et demande le reste en une seule question.",
    },
    {
      q: "Que sont les nakshatras et les maha-dashas ?",
      a: "Les nakshatras sont les 27 secteurs lunaires du zodiaque. Les maha-dashas sont les grandes périodes de la vie, « gouvernées » par les planètes : dans le système Vimshottari, chacune dure de 6 à 20 ans.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un calculateur ou d'un chatbot classique ?",
      a: "Un calculateur donne des descriptions générales ; Shankara, lui, étudie votre thème à vous et votre période actuelle. Et les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent.",
    },
  ],
};

export default shankara;
