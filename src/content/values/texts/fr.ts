import type { ValuesTexts } from '../types';

/**
 * Тест ценностей на французском. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-13-values-test-languages.md, «Правила переводов».
 */
const fr: ValuesTexts = {
  title: 'Test des valeurs de Schwartz gratuit — carte des valeurs | Linkeon',
  description:
    'Test des valeurs de Schwartz gratuit : 30 affirmations, environ 5 minutes. Le cercle des 10 valeurs, vos valeurs dominantes et leur analyse avec Olia.',
  h1: 'Test des valeurs de Schwartz en ligne — gratuit',
  breadcrumb: 'Test des valeurs',
  intro: [
    'Trente courtes descriptions de personnes différentes. Indiquez à quel point chacune vous ressemble, et vous verrez le cercle des dix valeurs fondamentales : ce qui passe en premier pour vous, ce qui compte le moins et où se situent vos principales tensions intérieures.',
    'Le test s’inspire de la théorie des valeurs fondamentales du psychologue social Shalom Schwartz. Vos réponses restent sur votre appareil : le calcul se fait directement dans le navigateur, et aucune réponse n’est envoyée au serveur.',
    'Le résultat n’est ni une note ni un diagnostic, mais un point de départ pour parler de vous. Vous pouvez poursuivre avec Olia, l’assistante qui mène l’exploration des valeurs.',
  ],
  start: {
    meta: '30 affirmations · environ 5 minutes · vos réponses restent sur votre appareil',
    begin: 'Commencer',
    resume: 'Continuer ({done} sur {total})',
    restart: 'Recommencer',
  },
  question: {
    prompt: 'À quel point cette personne vous ressemble-t-elle ?',
    progress: '{n} sur {total}',
    back: 'Retour',
    scale: [
      'Ne me ressemble pas du tout',
      'Ne me ressemble pas',
      'Me ressemble un peu',
      'Me ressemble en partie',
      'Me ressemble',
      'Me ressemble beaucoup',
    ],
  },
  statements: {
    selfDirection1: 'Pour cette personne, l’indépendance est importante : choisir son chemin à sa façon, sans directives venues d’en haut.',
    selfDirection2: 'Cette personne bricole, écrit ou invente volontiers quelque chose de personnel, juste par curiosité.',
    selfDirection3: 'Pour cette personne, penser par soi-même et tirer ses propres conclusions, c’est important.',
    stimulation1: 'Cette personne part facilement à l’aventure : une ville inconnue, une nouvelle passion, un voyage imprévu, ce n’est que du bonheur.',
    stimulation2: 'Pour cette personne, une vie sans changement ni variété devient vite fade.',
    stimulation3: 'Cette personne va volontiers là où l’issue est incertaine : vers les projets audacieux et les défis risqués.',
    hedonism1: 'Pour cette personne, une vie pleine de moments agréables est importante : bonne cuisine, repos, petites joies.',
    hedonism2: 'Cette personne s’accorde facilement des plaisirs, sans chercher de prétexte.',
    hedonism3: 'Cette personne apprécie les plaisirs simples : un bain chaud, son plat préféré, une soirée sans le moindre souci.',
    achievement1: 'Pour cette personne, progresser dans son domaine est important : se fixer des objectifs élevés et les atteindre.',
    achievement2: 'Pour cette personne, briller par son savoir-faire devant des connaisseurs, c’est important.',
    achievement3: 'Cette personne cherche à compter parmi les meilleurs de son domaine.',
    power1: 'Pour cette personne, influencer les autres et décider de l’usage de l’argent et des ressources communes, c’est important.',
    power2: 'Pour cette personne, l’aisance matérielle qui montre sa place dans la société est importante.',
    power3: 'Pour cette personne, un statut élevé et l’autorité comptent : avoir du poids aux yeux des autres.',
    security1: 'Cette personne choisit la prudence : vérifier deux fois, prendre ses précautions, ne pas risquer sa santé.',
    security2: 'Pour cette personne, vivre dans un pays où les rues sont calmes et où les lois s’appliquent, c’est important.',
    security3: 'Pour cette personne, la stabilité est importante : un emploi sûr, des économies pour les coups durs, un lendemain prévisible.',
    conformity1: 'Pour cette personne, les règles ne sont pas une formalité : on les respecte, qu’on les aime ou non.',
    conformity2: 'Cette personne se retient en public, sans hausser le ton ni se permettre de paroles dures.',
    conformity3: 'Cette personne s’habille et se comporte selon les usages de chaque endroit.',
    tradition1: 'Pour cette personne, les coutumes familiales — gâteaux des jours de fête, récits sur les ancêtres, dates commémoratives — sont à préserver.',
    tradition2: 'Pour cette personne, la foi et ses fêtes occupent une place importante dans la vie.',
    tradition3: 'Cette personne accepte son destin avec sérénité : ce que la vie apporte est à vivre dignement.',
    benevolence1: 'Cette personne vient aussitôt en aide à ses proches dès qu’un souci survient.',
    benevolence2: 'Cette personne reçoit les confidences de ses amis et ne les laisse jamais tomber.',
    benevolence3: 'Pour cette personne, le bien-être de ses proches est important, et pour cela, pas question de compter son temps ni sa peine.',
    universalism1: 'Cette personne s’inquiète pour les victimes des guerres et des catastrophes partout dans le monde, et aide dans la mesure du possible.',
    universalism2: 'Cette personne essaie de moins nuire à la nature : économiser les ressources, ne pas jeter de déchets, penser aux conséquences.',
    universalism3: 'Pour cette personne, un monde qui fait place à des opinions, des cultures et des modes de vie différents, c’est important.',
  },
  values: {
    selfDirection: {
      name: 'Autonomie',
      inMessage: 'l’autonomie',
      line: 'liberté de penser, de choisir et de créer',
      text: 'L’autonomie, c’est le besoin de penser par soi-même, de choisir sa voie et de créer. Les personnes qui la placent en tête se sentent à l’étroit dans un cadre rigide et sous les consignes des autres : elles ont besoin de comprendre pourquoi elles font les choses et d’y laisser leur propre empreinte.',
    },
    stimulation: {
      name: 'Stimulation',
      inMessage: 'la stimulation',
      line: 'nouveauté, sensations fortes et changement',
      text: 'La stimulation, c’est l’attrait pour la nouveauté, les sensations fortes et le changement. Quand elle compte, on cherche de nouveaux lieux, de nouvelles activités et de nouveaux défis, on s’enthousiasme vite et on se lasse rapidement de la routine. Une vie calme et prévisible paraît alors fade.',
    },
    hedonism: {
      name: 'Hédonisme',
      inMessage: 'l’hédonisme',
      line: 'plaisir et joie de vivre',
      text: 'L’hédonisme, c’est la valeur du plaisir et de la joie, ici et maintenant. Pour les personnes qui y tiennent, la vie ne se résume pas aux tâches et aux devoirs : la bonne cuisine, le repos, les belles choses et une compagnie agréable comptent autant que le travail.',
    },
    achievement: {
      name: 'Réussite',
      inMessage: 'la réussite',
      line: 'succès et reconnaissance du savoir-faire',
      text: 'La réussite, c’est la recherche d’un succès que les autres voient et reconnaissent. Les personnes pour qui elle passe en premier se fixent des objectifs élevés, se comparent aux meilleurs de leur domaine et apprécient que leur savoir-faire soit remarqué.',
    },
    power: {
      name: 'Pouvoir',
      inMessage: 'le pouvoir',
      line: 'statut, influence et ressources',
      text: 'Le pouvoir, c’est la valeur du statut, de l’influence et des ressources. Les personnes pour qui il compte veulent garder la situation sous contrôle, prendre les décisions et occuper une position qui pèse. L’argent et l’autorité sont pour elles un moyen d’agir sur le cours des choses.',
    },
    security: {
      name: 'Sécurité',
      inMessage: 'la sécurité',
      line: 'stabilité, ordre et protection',
      text: 'La sécurité, c’est le besoin de stabilité et de protection pour soi, pour ses proches et pour la société. Quand elle passe en premier, on anticipe, on apprécie la fiabilité et l’ordre, on évite les risques inutiles et on se constitue des réserves.',
    },
    conformity: {
      name: 'Conformité',
      inMessage: 'la conformité',
      line: 'retenue et respect des règles',
      text: 'La conformité, c’est la retenue et le respect des règles en usage autour de soi. Les personnes attachées à cette valeur évitent de froisser les autres, tiennent parole et respectent les accords et les normes, même quand elles auraient envie d’agir autrement.',
    },
    tradition: {
      name: 'Tradition',
      inMessage: 'la tradition',
      line: 'respect des coutumes, de la foi et des racines',
      text: 'La tradition, c’est le respect des coutumes, de la foi et des racines propres à la famille et à la culture. Pour les personnes qui y tiennent, l’appui se trouve dans ce qui a fait ses preuves au fil des générations : fêtes, rites, modestie et capacité d’accepter la vie telle qu’elle est.',
    },
    benevolence: {
      name: 'Bienveillance',
      inMessage: 'la bienveillance',
      line: 'soin des proches et fidélité envers eux',
      text: 'La bienveillance, c’est le souci de son entourage : la famille, les amis, les collègues. Les personnes qui la placent au premier plan sont fiables, prêtes à aider et à céder pour préserver la relation ; la fidélité et la confiance comptent plus pour elles que leur propre intérêt.',
    },
    universalism: {
      name: 'Universalisme',
      inMessage: 'l’universalisme',
      line: 'justice pour tous et souci du monde',
      text: 'L’universalisme, c’est le souci de tous les êtres humains et de la nature, pas seulement de son propre cercle. Les personnes pour qui il compte sont attachées à la justice, à l’égalité, à la tolérance envers les autres points de vue et au respect du monde qui les entoure.',
    },
  },
  higherOrder: {
    openness: 'Ouverture au changement',
    selfEnhancement: 'Affirmation de soi',
    conservation: 'Continuité',
    selfTranscendence: 'Dépassement de soi',
  },
  axes: {
    change: {
      left: 'Vous êtes plus proche de l’ouverture au changement — autonomie et nouveauté — que de la continuité et de l’ordre habituel.',
      right: 'Vous êtes plus proche de la continuité — sécurité, règles et traditions — que de l’ouverture au changement.',
      balance: 'Chez vous, ouverture au changement et continuité s’équilibrent : aucun des deux côtés ne l’emporte nettement.',
    },
    focus: {
      left: 'Le souci des autres — vos proches et le monde qui vous entoure — compte plus pour vous que la réussite et l’influence personnelles.',
      right: 'La réussite et l’influence personnelles comptent plus pour vous que le souci des autres et du monde qui vous entoure.',
      balance: 'Chez vous, le souci des autres et la réussite personnelle s’équilibrent.',
    },
  },
  axesInMessage: {
    change: {
      left: 'Je suis plus proche du changement que de la continuité et de l’ordre habituel',
      right: 'Je suis plus proche de la continuité et de l’ordre habituel que du changement',
      balance: 'Chez moi, le changement et la continuité s’équilibrent',
    },
    focus: {
      left: 'le souci des autres compte plus pour moi que la réussite personnelle',
      right: 'la réussite personnelle compte plus pour moi que le souci des autres',
      balance: 'le souci des autres et la réussite personnelle s’équilibrent chez moi',
    },
  },
  result: {
    heading: 'Votre cercle des valeurs',
    circleAlt: 'Cercle des valeurs',
    legend: 'Groupes de valeurs',
    topHeading: 'Valeurs dominantes',
    bottomHeading: 'La moins importante',
    axesHeading: 'Principales tensions',
    flatHeading: 'Aucune priorité ne ressort',
    flatText:
      'Vous avez noté presque toutes les affirmations de la même façon : impossible donc de désigner des valeurs dominantes. Refaites le test en comparant les descriptions entre elles, ou voyez avec Olia ce qui compte vraiment pour vous.',
    cta: 'Analyser avec Olia',
    ctaNote: 'Analyse personnelle de vos valeurs avec Olia — 25 000 jetons offerts à l’inscription',
    allHeading: 'Les 10 valeurs, dans votre ordre',
    restart: 'Refaire le test',
    tiedWith: 'À égalité : {names}',
    topHeadingOne: 'Valeur dominante',
    restEqual: 'Les autres valeurs ont obtenu le même score : impossible donc de désigner la moins importante.',
  },
  modelSection: {
    heading: 'Les dix valeurs selon Schwartz',
    lead: 'Schwartz a décrit dix valeurs que l’on retrouve dans des cultures du monde entier. Elles sont disposées en cercle : les valeurs voisines s’accordent facilement, les valeurs opposées tirent dans des sens contraires, comme l’attrait de la nouveauté et le désir de préserver ce qui est familier.',
  },
  faqHeading: 'Questions sur le test',
  faq: [
    {
      q: 'Combien de temps dure le test ?',
      a: 'Environ cinq minutes : 30 affirmations, et pour chacune une réponse sur une échelle de six choix. Tant que l’onglet est ouvert, vos réponses y sont conservées : un rechargement accidentel n’effacera pas votre progression.',
    },
    {
      q: 'Est-ce un test scientifique ?',
      a: 'Il repose sur la théorie des valeurs fondamentales de Shalom Schwartz, l’un des modèles de valeurs largement étudiés en psychologie. Nous avons écrit les affirmations nous-mêmes en nous inspirant de cette théorie : ce n’est ni le questionnaire officiel PVQ ni une méthode clinique, mais un outil pour mieux se connaître.',
    },
    {
      q: 'Mes réponses sont-elles enregistrées ?',
      a: 'Non. Le calcul se fait dans le navigateur : vos réponses ne sont pas envoyées au serveur et ne passent pas par les outils de statistiques. Elles restent uniquement dans cet onglet, pour ne pas disparaître en cas de rechargement accidentel.',
    },
    {
      q: 'Pourquoi le résultat est-il un ordre de valeurs et non un score ?',
      a: 'Selon Schwartz, ce ne sont pas les notes elles-mêmes qui comptent, mais les valeurs qui l’emportent sur les autres. Le test tient donc compte de votre façon de répondre : si vous donnez des notes élevées à toutes les affirmations, le cercle montrera quand même ce qui compte le plus.',
    },
    {
      q: 'Que faire du résultat ?',
      a: 'Regardez vos valeurs dominantes et les principales tensions : où vos décisions, votre temps et votre argent vont dans le sens de ce qui compte pour vous, et où ce n’est pas le cas. Pour l’analyser en détail, parlez-en avec Olia : elle mène l’exploration des valeurs en conversation et établit votre carte des valeurs personnelle.',
    },
  ],
  disclaimer:
    'Un test pour mieux se connaître, inspiré de la théorie des valeurs fondamentales de Shalom Schwartz. Ce n’est ni une méthode clinique ni une méthode officielle.',
  tiedInMessage: '(à égalité avec {names})',
  bottomInMessage: 'en dernier : {bottom}',
  restEqualInMessage: 'les autres à égalité',
  message:
    'Salut Olia ! Voici mon résultat au test des valeurs de Schwartz. En tête : {top} ; {rest}. {axes}. Aide-moi à comprendre ce que cela signifie pour moi',
  messageFlat:
    'Salut Olia ! Au test des valeurs de Schwartz, aucune priorité ne ressort chez moi : j’ai noté presque tout de la même façon. Aide-moi à comprendre ce qui compte vraiment pour moi',
};

export default fr;
