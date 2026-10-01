import type { AssistantPageText } from '../../types';

/**
 * Райя — дизайн человека. Перевод pages/ru/raya.ts.
 *
 * Одобренный образец: docs/assistant-pages/samples-ru.md.
 */
const raya: AssistantPageText = {
  title: "Human Design en ligne : lecture du bodygraph — Raya | Linkeon",
  description:
    "Raya calcule votre Human Design à partir de la date, de l'heure et du lieu de naissance avec Swiss Ephemeris, et explique ce que signifient type, stratégie, autorité et profil.",
  h1: "Human Design : Raya calcule et décrypte votre bodygraph",
  lead: "Il faut la date, l'heure exacte et la ville de naissance. Raya calcule la carte avec Swiss Ephemeris et vous explique ce que votre type, votre stratégie et votre autorité signifient en pratique.",
  card: "Calcule le bodygraph à partir de la date, de l'heure et du lieu de naissance, et explique type, stratégie et autorité.",
  cta: "Parler avec Raya",
  situations: [
    "Vous avez entendu parler du Human Design et voulez connaître votre type et votre stratégie.",
    "Vous avez déjà obtenu votre carte avec un calculateur gratuit, mais vous ne comprenez pas ce que signifient les centres et les canaux.",
    "Les décisions vous coûtent, et vous voulez comprendre votre autorité : sur quoi vous appuyer quand vous choisissez.",
    "Vous ne connaissez votre heure de naissance qu'à peu près et voulez savoir ce que cela change.",
    "Vous voulez étudier la carte de votre enfant ou de votre partenaire.",
  ],
  example: {
    question: "Calculez mon Human Design : 14 mars 1990, 7 h 30, Kazan. Quels sont mon type et ma stratégie ?",
    answer: `J'ai fait le calcul avec Swiss Ephemeris. J'ai converti l'heure en UTC ainsi : en mars 1990, Kazan était à l'heure d'hiver de Moscou, UTC+3, donc 7 h 30 heure locale = 4 h 30 UTC.

Votre carte

Type — Manifesteur
Stratégie — Informer les personnes que votre décision va toucher, avant d'agir
Autorité — Émotionnelle (plexus solaire)
Profil — 1/3 : Investigateur / Martyr

…

Ce que cela signifie en pratique
— Informer ne veut pas dire demander la permission. C'est un simple « je vais faire X ». Cela lève la résistance de l'entourage, à laquelle les Manifesteurs se heurtent souvent.
— Autorité émotionnelle : ne décidez pas au sommet de l'émotion, ni dans l'élan, ni dans le creux. La bonne décision vient quand la vague s'est apaisée. Ce qui aide : la règle « la nuit porte conseil ».
…

Expérience de 7 jours
Avant chaque action notable, qu'il s'agisse d'une décision professionnelle, d'un achat ou d'une conversation importante, informez-en brièvement les personnes concernées. Mais seulement une fois l'émotion retombée, au moins le lendemain. Le soir, notez s'il y a eu plus ou moins de résistance et de colère que d'habitude.

Si vous avez déjà regardé votre carte sur jovianarchive.com ou mybodygraph.com, dites-moi ce qui en est ressorti, et je comparerai.`,
  },
  can: [
    "Calcule la carte avec Swiss Ephemeris, pas « à vue de nez » : convertit l'heure de naissance en UTC en tenant compte du fuseau horaire et de l'heure d'été de l'époque.",
    "Explique le type, la stratégie, l'autorité, le profil et la définition : quels centres sont ouverts, ce qu'apportent les canaux clés, où mène la croix d'incarnation.",
    "Propose une expérience de sept jours fondée sur votre stratégie et votre autorité.",
    "Si vous envoyez une carte de jovianarchive.com ou mybodygraph.com, la compare avec son propre calcul et vous dit franchement si les résultats divergent.",
    "Étudie la carte de la personne sur laquelle vous l'interrogez (vous, votre enfant, votre partenaire) sans la confondre avec d'autres.",
  ],
  cannot: [
    "Ne prédit ni le destin ni les événements : ici, le Human Design est un outil de connaissance de soi, pas une prévision.",
    "Ne donne pas de recommandations médicales ou financières et ne remplace pas un médecin, un juriste ou un conseiller financier.",
    "N'invente pas l'heure de naissance : sans elle, Raya vous dira qu'un calcul exact est impossible.",
  ],
  faq: [
    {
      q: "Que faut-il pour le calcul ?",
      a: "La date, l'heure exacte et la ville de naissance. Un décalage de seulement 15 à 30 minutes peut changer le profil, et parfois le type et l'autorité.",
    },
    {
      q: "Est-ce de l'astrologie ?",
      a: "Non, même si le calcul repose aussi sur la position des planètes. Ici, ce n'est qu'un système de coordonnées ; l'interprétation passe par les 64 portes, les 9 centres et les 36 canaux. Raya travaille selon l'école classique de Ra Uru Hu.",
    },
    {
      q: "En quoi est-ce différent d'un calculateur ou d'un chatbot classique ?",
      a: "Un calculateur établit la carte et donne des descriptions générales. Raya étudie votre carte à vous et propose une expérience fondée sur votre stratégie. Et les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent.",
    },
    {
      q: "Et si je doute du Human Design ?",
      a: "Raya ne cherchera pas à vous convaincre. Elle vous proposera une expérience de sept jours : tester la stratégie sur votre propre vécu et décider par vous-même.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
  ],
};

export default raya;
