import type { HdTexts } from '../types';

/**
 * Калькулятор Human Design на французском. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-14-hd-calculator-languages.md, «Правила переводов»;
 * термины — docs/hd-calculator/glossary-languages.md.
 */
const fr: HdTexts = {
  title: "Calculateur Human Design — bodygraph par date de naissance | Linkeon",
  description:
    "Calculateur Human Design (design humain) gratuit et sans inscription : bodygraph selon la date, l'heure et la ville de naissance — type, stratégie, autorité et profil expliqués.",
  h1: "Calculateur Human Design en ligne — bodygraph gratuit",
  breadcrumb: "Calcul du Human Design",
  intro: [
    "Pour établir le bodygraph, il faut la date, l'heure exacte et la ville de naissance. Le calculateur affiche le type, la stratégie, l'autorité, le profil et la définition, puis, plus bas, les centres et les canaux. Chaque élément s'accompagne d'une courte description : la façon dont il se manifeste généralement chez les gens.",
    "Le Human Design décrit une personne par un schéma de neuf centres, 64 portes et 36 canaux. Ce qui y est défini dépend de la position du Soleil, de la Lune, des nœuds lunaires et des planètes au moment de la naissance et environ 88 jours avant. De là découlent le type, la stratégie et l'autorité : des repères sur la manière la plus simple pour chacun de prendre ses décisions et de dépenser son énergie.",
    "Ici, le Human Design est un outil de connaissance de soi, pas une prévision : les descriptions parlent de tendances, pas d'événements, et mieux vaut les confronter à votre propre expérience. La carte est calculée directement dans le navigateur, sans inscription : la date, l'heure et la ville de naissance ne sont pas envoyées au serveur.",
  ],
  form: {
    heading: "Vos données de naissance",
    date: "Date de naissance",
    time: "Heure de naissance",
    timeHint: "L'heure est obligatoire : sans elle, le type pourrait être différent.",
    city: "Ville de naissance",
    cityPlaceholder: "Commencez à saisir une ville",
    cityHint: "Votre ville n'y est pas ? Choisissez la grande ville la plus proche dans le même fuseau horaire.",
    cityLoading: "Chargement de la liste des villes…",
    cityLoadError: "La liste des villes n'a pas pu être chargée. Vérifiez votre connexion et cliquez à nouveau sur le champ.",
    cityNotFound: "Cette ville ne figure pas dans la liste : choisissez la grande ville la plus proche dans le même fuseau horaire.",
    zoneLine: "{city}, {offset} à la date de naissance",
    zoneUnknown: "Le navigateur ne connaît pas le fuseau horaire de cette ville : choisissez une grande ville voisine.",
    dstGap: "Cette nuit-là, les horloges ont été avancées : l'heure {time} n'a pas existé. Comment l'heure de naissance a-t-elle été notée ?",
    dstAmbiguous: "Cette nuit-là, les horloges ont été reculées : l'heure {time} a existé deux fois. Laquelle des deux ?",
    dstBefore: "Avant le changement d'heure ({offset})",
    dstAfter: "Après le changement d'heure ({offset})",
    dstChoose: "Indiquez si c'était avant ou après le changement d'heure.",
    missing: "Renseignez la date et l'heure, et choisissez une ville dans la liste.",
    futureDate: "Vérifiez la date : elle doit se situer entre 1900 et aujourd'hui.",
    submit: "Calculer",
  },
  result: {
    heading: "Votre bodygraph",
    dataLine: "{date}, {time}, {city} ({offset})",
    bodygraphLabel: "Bodygraph : {type}. Centres définis : {centers}",
    bodygraphLabelEmpty: "Bodygraph : {type}. Centres définis : aucun",
    legendPersonality: "Personnalité — moment de la naissance",
    legendDesign: "Design — environ 88 jours avant la naissance",
    typeLabel: "Type",
    strategyLabel: "Stratégie",
    authorityLabel: "Autorité",
    profileLabel: "Profil",
    definitionLabel: "Définition",
    definedCenters: "Centres définis",
    noDefinedCenters: "Aucun centre défini",
    openCenters: "Centres ouverts",
    noOpenCenters: "Aucun centre ouvert",
    channels: "Canaux",
    noChannels: "Aucun canal défini",
    cta: "Analyser avec Raya",
    ctaNote: "Analyse personnelle et expérience de 7 jours avec Raya — 25 000 jetons offerts à l'inscription",
  },
  types: {
    generator: {
      name: "Générateur",
      strategy: "Répondre",
      text: "Le Générateur a le centre sacral défini : une énergie stable pour ce qui le passionne. La stratégie « répondre » : ne pas partir de zéro à force de volonté, mais attendre que la vie propose quelque chose (une question, une demande, une tâche) et sentir s'il y a en soi un « oui » clair. Une activité choisie ainsi apporte en général de la satisfaction ; menée contre la réponse, de la frustration et de la fatigue.",
    },
    manifestingGenerator: {
      name: "Générateur manifesteur",
      strategy: "Répondre, puis informer",
      text: "Chez le Générateur manifesteur, le centre sacral est défini, et l'énergie, reliée à la Gorge, passe vite à l'action. La stratégie « répondre, puis informer » : attendre un « oui » clair à ce que la vie propose et, avant d'agir, prévenir brièvement ceux que la décision concerne. Ces personnes mènent souvent plusieurs choses de front et sautent des étapes, puis y reviennent plus tard.",
    },
    manifestor: {
      name: "Manifesteur",
      strategy: "Informer",
      text: "Le Manifesteur a le centre sacral ouvert, mais une autre source d'énergie (le centre du Cœur, le plexus solaire ou la Racine) est reliée à la Gorge : il peut initier seul, sans attendre que la vie le sollicite. La stratégie « informer » : prévenir brièvement les personnes concernées avant d'agir. Ce n'est pas demander la permission : on lui résiste alors généralement moins, et il vit moins de colère et plus de paix.",
    },
    projector: {
      name: "Projecteur",
      strategy: "Attendre l'invitation",
      text: "Le Projecteur a le centre sacral ouvert : il n'a généralement pas l'énergie durable du Générateur. Mais il voit souvent avec justesse comment fonctionnent les gens et les processus, et ce qu'on peut y améliorer. La stratégie « attendre l'invitation » vaut pour les grandes choses (travail, relations, déménagement) : un conseil non sollicité est souvent ignoré ; donné sur invitation, le même tombe à point.",
    },
    reflector: {
      name: "Réflecteur",
      strategy: "Attendre un cycle lunaire — environ 28 jours",
      text: "Chez le Réflecteur, les neuf centres sont ouverts : c'est un type rare. Ces personnes reflètent finement leur entourage : leur état montre parfois comment va une famille ou une équipe ; où et avec qui vivre et travailler compte donc beaucoup pour elles. Leurs grandes décisions gagnent à mûrir pendant environ 28 jours : la Lune traverse alors les 64 portes, et la décision se montre sous différents angles.",
    },
  },
  authorities: {
    emotional: {
      name: "Émotionnelle (plexus solaire)",
      inMessage: "autorité émotionnelle",
      text: "L'autorité émotionnelle concerne tous ceux dont le plexus solaire est défini, quels que soient leurs autres centres définis. Les sentiments suivent une vague émotionnelle, de l'élan au creux, et à tout moment une décision peut sembler évidente. La clarté vient généralement une fois la vague apaisée : pour ce qui compte, mieux vaut laisser la nuit porter conseil et voir si la réponse tient un jour ou deux plus tard.",
    },
    sacral: {
      name: "Sacrale",
      inMessage: "autorité sacrale",
      text: "L'autorité sacrale concerne les Générateurs et les Générateurs manifesteurs dont le plexus solaire est ouvert. La réponse vient tout de suite et de l'intérieur : un « oui » ou un « non » clair, parfois un simple son (« mm-hmm » pour oui, « hun-hun » pour non), avant que le mental ait le temps d'intervenir. Cette réponse s'entend le plus facilement quand la question est simple et qu'on peut y répondre en un mot.",
    },
    splenic: {
      name: "Splénique",
      inMessage: "autorité splénique",
      text: "L'autorité splénique concerne ceux dont le centre splénique est défini, avec le plexus solaire et le centre sacral ouverts. C'est une intuition discrète, dans l'instant : elle parle une fois, tout de suite, et ne se répète pas. Le raisonnement l'étouffe facilement ; avec cette autorité, on gagne donc à se fier à sa première sensation, surtout quand il s'agit de sécurité et de ce qui convient sur le moment.",
    },
    ego: {
      name: "Ego (centre du Cœur)",
      inMessage: "autorité de l'ego",
      text: "L'autorité de l'ego concerne ceux dont le centre du Cœur est défini, avec le plexus solaire, le centre sacral et le centre splénique ouverts. Une décision se vérifie par une question simple : la personne le veut-elle vraiment, et qu'y gagnera-t-elle ? Chez le Manifesteur, la réponse s'entend d'ordinaire dans ce qu'il dit spontanément ; chez le Projecteur, elle s'éclaircit en parlant à des gens de confiance.",
    },
    selfProjected: {
      name: "Auto-projetée",
      inMessage: "autorité auto-projetée",
      text: "L'autorité auto-projetée concerne les Projecteurs dont le centre G défini est relié à la Gorge, avec le plexus solaire, le centre splénique et le centre du Cœur ouverts. La clarté vient de sa propre voix : formuler la question à voix haute à une personne de confiance et écouter ce que l'on dit soi-même. L'autre est là pour écouter, pas pour conseiller, et la bonne réponse sonne souvent comme « c'est tout moi ».",
    },
    mental: {
      name: "Mentale (environnementale)",
      inMessage: "autorité mentale",
      text: "L'autorité mentale concerne les Projecteurs dont seuls la Tête, l'Ajna et la Gorge, ou certains d'entre eux, sont définis. Pas de signal intérieur « oui » ou « non » ici : la clarté vient de l'extérieur, d'échanges avec diverses personnes de confiance et de la façon dont on se sent dans un lieu donné. Mieux vaut ne pas presser la décision : avec le temps, ce qui est juste s'entend dans ses propres paroles.",
    },
    lunar: {
      name: "Lunaire",
      inMessage: "autorité lunaire",
      text: "L'autorité lunaire ne concerne que les Réflecteurs : ils n'ont ni centre défini ni signal intérieur constant. Pour ce qui compte, mieux vaut se donner un cycle lunaire, environ 28 jours, pour décider : en parler avec diverses personnes, observer comment son ressenti évolue de jour en jour et attendre que la réponse se stabilise. La hâte gêne généralement ; le temps aide à voir la question dans son ensemble.",
    },
  },
  profiles: {
    "1/3": {
      name: "Investigateur / Martyr",
      text: "La première ligne cherche un appui dans le savoir : avant d'agir, on a envie de comprendre les bases. La troisième teste tout par l'expérience, par essais et erreurs. Ensemble, cela donne une personne qui étudie d'abord, puis essaie concrètement, et pour qui les échecs sont des découvertes plus que des revers : c'est ainsi qu'elle apprend sur quoi s'appuyer vraiment.",
    },
    "1/4": {
      name: "Investigateur / Opportuniste",
      text: "La première ligne cherche un appui dans le savoir : on se sent le plus sûr de soi quand on a compris les bases. La quatrième repose sur les relations : les occasions arrivent généralement par les connaissances, les amis et les collègues. Avec ce profil, on gagne à étudier en profondeur ce qui intéresse et à le partager avec son cercle : c'est là, en général, qu'on est écouté.",
    },
    "2/4": {
      name: "Ermite / Opportuniste",
      text: "La deuxième ligne, c'est un talent naturel que la personne elle-même ne remarque souvent pas, et le besoin d'être seule, de se consacrer à ses affaires loin des regards. La quatrième relie aux autres : c'est généralement le cercle proche qui voit ce talent et invite à l'exprimer. Avec ce profil, on gagne à préserver du temps pour soi et à répondre aux invitations des gens que l'on connaît.",
    },
    "2/5": {
      name: "Ermite / Hérétique",
      text: "La deuxième ligne, c'est un talent naturel et un besoin de solitude. La cinquième attire les attentes des autres : on attend souvent de cette personne une solution pratique, voire qu'elle sauve une situation difficile. Il arrive qu'on l'appelle à l'aide plus souvent qu'elle ne le souhaite ; avec ce profil, on gagne donc à préserver du temps pour soi et à ne s'engager que dans ce qui est vraiment à sa portée.",
    },
    "3/5": {
      name: "Martyr / Hérétique",
      text: "La troisième ligne apprend par l'expérience : elle essaie, se trompe et trouve ce qui fonctionne. La cinquième attire les attentes des autres : on attend de la personne des solutions pratiques. Dans cette combinaison, les erreurs deviennent l'expérience d'où naissent ces solutions, et la réputation est protégée par l'habitude de ne pas promettre plus que ce qu'on a testé soi-même.",
    },
    "3/6": {
      name: "Martyr / Modèle",
      text: "La troisième ligne apprend par l'expérience, par essais et erreurs. La sixième se décrit généralement en trois étapes : beaucoup d'essais dans la jeunesse, comme la troisième ligne, puis un temps d'observation en retrait, et plus tard le rôle d'exemple. Les personnes de ce profil ont souvent une expérience très riche, d'où naissent fréquemment avec le temps un calme et une sagesse qui servent de repère aux autres.",
    },
    "4/6": {
      name: "Opportuniste / Modèle",
      text: "La quatrième ligne repose sur les relations : amis et connaissances sont la principale source d'occasions et de soutien. La sixième se décrit généralement en trois étapes : d'abord beaucoup d'essais, puis un temps de recul, et plus tard une expérience qui sert de repère aux autres. Les personnes de ce profil sont souvent écoutées dans leur cercle, surtout quand elles joignent le geste à la parole.",
    },
    "4/1": {
      name: "Opportuniste / Investigateur",
      text: "La quatrième ligne repose sur les gens de son cercle, la première sur un savoir solide. Les personnes de ce profil ont tendance à garder leur cap : sous la pression des autres, elles changent à contrecœur, et il leur est généralement plus simple de trouver leur propre entourage que de s'adapter à celui des autres. Leurs bases solides en font souvent un appui fiable pour leurs proches.",
    },
    "5/1": {
      name: "Hérétique / Investigateur",
      text: "La cinquième ligne attire les attentes des autres : on attend de la personne une solution pratique. La première donne une base à ces solutions : avant de proposer quoi que ce soit, la personne étudie les fondements. On fait souvent appel aux gens de ce profil quand les choses se compliquent, et leur réputation repose sur des solutions vérifiées et qui fonctionnent.",
    },
    "5/2": {
      name: "Hérétique / Ermite",
      text: "La cinquième ligne attire les attentes des autres : on attend de la personne qu'elle trouve une issue. La deuxième, c'est un talent naturel et un besoin de solitude. Il arrive qu'on l'appelle pour régler les problèmes des autres justement quand elle a envie d'être seule ; avec ce profil, on gagne donc à choisir à quels appels répondre et à préserver du temps pour soi.",
    },
    "6/2": {
      name: "Modèle / Ermite",
      text: "La sixième ligne se décrit généralement en trois étapes : beaucoup d'essais et d'erreurs dans la jeunesse, puis un temps d'observation en retrait, et plus tard le rôle d'exemple pour les autres. La deuxième ajoute un talent naturel et un besoin de solitude. Les personnes de ce profil se tiennent souvent un peu à l'écart, et ce sont les autres qui remarquent leur exemple et leur talent.",
    },
    "6/3": {
      name: "Modèle / Martyr",
      text: "La sixième ligne se décrit généralement en trois étapes : d'abord beaucoup d'essais, puis un temps de recul, et plus tard le rôle d'exemple. La troisième ajoute des essais et des erreurs jusque dans les étapes suivantes ; chez ces personnes, l'expérience est donc rarement linéaire. Mais il en naît souvent une sagesse pratique, vécue, que les autres apprécient justement parce qu'elle a fait ses preuves.",
    },
  },
  definitions: {
    none: {
      name: "Aucune définition",
      text: "Cela n'arrive que chez le Réflecteur : aucun canal n'est défini. La définition n'apparaît que temporairement, au contact de l'entourage et au fil du transit de la Lune. Aussi les jours se suivent-ils sans se ressembler. Le temps aide à distinguer ce qui vient de soi de ce qui vient de l'extérieur.",
    },
    single: {
      name: "Simple",
      text: "Tous les centres définis sont reliés entre eux en un seul ensemble. Les personnes avec cette définition ont généralement un sentiment stable d'unité : elles n'ont besoin de personne pour les « compléter », et elles traitent l'information seules et assez vite. Il leur est parfois difficile de comprendre pourquoi les autres ont besoin de plus de temps pour la même chose.",
    },
    split: {
      name: "Double",
      text: "Les centres définis forment deux groupes distincts, comme s'il manquait un pont entre eux. On peut avoir le sentiment qu'il manque quelque chose, et se sentir attiré par les personnes qui servent de pont : à leurs côtés, tout se rejoint en un seul ensemble. Les décisions gagnent généralement à laisser aux deux parties le temps de s'accorder.",
    },
    triple: {
      name: "Triple",
      text: "Les centres définis forment trois groupes distincts. Les personnes avec cette définition ont généralement besoin de plus de temps pour tout bien peser, et des échanges variés leur font du bien : dans les lieux animés et en mouvement, les différentes parties semblent se relier. Si l'on ne presse pas les décisions, le regard devient nuancé et équilibré.",
    },
    quadruple: {
      name: "Quadruple",
      text: "Les centres définis forment quatre groupes distincts : c'est une combinaison rare. Les personnes avec cette définition traitent généralement l'expérience lentement et en profondeur, et la hâte les gêne plutôt. Mieux vaut décider sans pression, en se donnant du temps ; les opinions ainsi formées sont en général stables et changent peu sous l'influence des autres.",
    },
  },
  centers: {
    head: {
      name: "Centre de la Tête",
      defined:
        "un flux constant de questions et d'idées venu de l'intérieur : on a généralement matière à réflexion. Les personnes qui l'ont défini inspirent souvent les autres, et à leur contact, l'entourage se pose aussi des questions.",
      open: "les questions et l'inspiration viennent des autres et s'amplifient à leur contact. Il arrive qu'on se creuse la tête sur les questions des autres ; il est alors utile de se demander lesquelles sont vraiment les siennes.",
    },
    ajna: {
      name: "Ajna",
      defined:
        "une manière stable de penser : opinions et conclusions suivent leur propre logique interne et dépendent peu de l'interlocuteur. Les personnes qui l'ont défini sont généralement sûres de leur façon de comprendre les choses, et il leur est parfois difficile d'admettre que la logique des autres fonctionne autrement.",
      open: "un esprit souple, qui voit facilement une question sous différents angles et se glisse volontiers dans le point de vue des autres. On peut être tenté d'afficher une certitude qu'on n'a pas, alors que c'est justement l'ouverture aux différentes opinions qui fait ici la force.",
    },
    throat: {
      name: "Centre de la Gorge",
      defined:
        "une manière constante et reconnaissable de parler et de se manifester dans l'action. Les personnes qui l'ont défini n'ont généralement pas à chercher l'attention, et leur façon de s'exprimer dépend des centres auxquels la Gorge est reliée.",
      open: "la façon de parler change selon les personnes présentes, et l'on peut avoir envie de prendre la parole en premier pour être remarqué. Pourtant, la parole porte généralement davantage quand on a été sollicité.",
    },
    g: {
      name: "Centre G (identité)",
      defined:
        "un sentiment stable de soi et de sa direction : les personnes qui l'ont défini savent généralement qui elles sont et où elles vont, et cela dépend peu de l'entourage. À leurs côtés, les autres trouvent parfois plus facilement leur propre chemin.",
      open: "le sentiment de soi et de sa direction est souple et dépend beaucoup du lieu et des personnes autour. C'est pourquoi le lieu où l'on vit et travaille, et avec qui, compte particulièrement : le bon entourage indique de lui-même la direction.",
    },
    heart: {
      name: "Centre du Cœur (ego)",
      defined:
        "un accès constant à la volonté et au sentiment de sa propre valeur. Les personnes qui l'ont défini peuvent généralement promettre et tenir parole quand cela compte vraiment pour elles, mais pour durer, la volonté a aussi besoin de pauses.",
      open: "la volonté est inconstante, et la valeur d'une personne ne dépend pas de ce qu'elle a réussi à s'imposer. Il arrive qu'on fasse des promesses pour prouver quelque chose, et elles sont alors particulièrement difficiles à tenir.",
    },
    spleen: {
      name: "Centre splénique",
      defined:
        "une intuition constante qui, dans l'instant, indique ce qui est sûr et ce qui convient. Elle parle doucement et une seule fois, et l'entourage perçoit souvent le bien-être stable des personnes qui l'ont défini.",
      open: "une sensibilité à l'état des autres : on remarque bien qui, autour de soi, se sent mal à l'aise. On peut avoir tendance à s'accrocher à ce qui est familier (des personnes, des relations, des habitudes) même quand cela ne fait plus de bien, simplement parce que c'est plus rassurant.",
    },
    solarPlexus: {
      name: "Plexus solaire",
      defined:
        "un rythme émotionnel propre : les hauts et les bas arrivent à leur heure et ne sont pas toujours liés à ce qui se passe autour. L'humeur des personnes qui l'ont défini se transmet nettement à leur entourage.",
      open: "une réceptivité fine aux émotions des autres : à leur contact, les émotions s'amplifient et semblent être les siennes. Il arrive qu'on évite les conflits et les conversations désagréables pour ne pas être pris dans la tempête d'un autre.",
    },
    sacral: {
      name: "Centre sacral",
      defined:
        "une énergie vitale et une capacité de travail qui se renouvellent quand l'activité plaît. Les personnes qui l'ont défini transmettent généralement de l'énergie à leur entourage : à leurs côtés, les autres se mettent plus facilement au travail.",
      open: "il n'y a pas d'accès constant à l'énergie de travail, et auprès de personnes au centre sacral défini, on a l'impression d'avoir plus de forces qu'en réalité. Mieux vaut alors sentir quand c'en est assez et ne pas calquer sa charge de travail sur celle des gens dont ce centre est défini.",
    },
    root: {
      name: "Centre Racine",
      defined:
        "une pression intérieure régulière qui aide à se mettre à l'ouvrage et à tenir les délais. Les personnes qui l'ont défini supportent généralement la hâte et la tension avec calme et travaillent à leur rythme.",
      open: "une sensibilité à la pression et à la précipitation ambiantes : la tension des autres s'amplifie et se vit comme la sienne. Il arrive qu'on se dépêche de tout terminer juste pour se débarrasser de la tension, alors que beaucoup de choses pourraient attendre.",
    },
  },
  channels: {
    "1-8": {
      name: "Inspiration",
      text: "relie le centre G à la Gorge : la singularité de la personne cherche à s'exprimer en paroles et en actes. Les personnes avec ce canal inspirent souvent les autres non par des conseils, mais en faisant tout à leur manière, et leur contribution créative est mieux reçue quand on les a remarquées et invitées.",
    },
    "2-14": {
      name: "Pulsation",
      text: "relie le centre G au centre sacral : les personnes avec ce canal ont la force d'aller dans leur propre direction, même si elle ne ressemble pas à celle des autres. Elles fixent souvent le cap et trouvent les ressources pour une entreprise dont elles sont sûres, et les autres suivent.",
    },
    "3-60": {
      name: "Mutation",
      text: "relie le centre Racine au centre sacral : l'énergie arrive par impulsions, et dans les pauses on peut se sentir morose, sans savoir où aller. Mais de ces pauses naît souvent, chez les personnes avec ce canal, quelque chose de vraiment nouveau, si on le laisse mûrir sans le presser.",
    },
    "4-63": {
      name: "Logique",
      text: "relie le centre de la Tête à l'Ajna : le doute pousse à chercher des régularités et des réponses logiques. Les personnes avec ce canal repèrent généralement les incohérences d'un raisonnement, et leurs conclusions sont surtout utiles quand on les vérifie dans les faits au lieu de les croire sur parole.",
    },
    "5-15": {
      name: "Rythme",
      text: "relie le centre sacral au centre G : les personnes avec ce canal ont généralement leur propre rythme naturel pour travailler, se reposer et se lancer dans du nouveau. Quand elles le suivent plutôt qu'un emploi du temps imposé, les choses se font plus facilement, et à leurs côtés les autres trouvent aussi leur rythme.",
    },
    "6-59": {
      name: "Intimité",
      text: "relie le plexus solaire au centre sacral : c'est une énergie de rapprochement qui aide à briser la glace et à créer la confiance. L'intimité compte généralement beaucoup pour les personnes avec ce canal, et à leurs côtés les autres s'ouvrent plus facilement, surtout si l'on ne brusque pas les sentiments.",
    },
    "7-31": {
      name: "Alpha",
      text: "relie le centre G à la Gorge : c'est un leadership qui repose sur la reconnaissance. Les personnes avec ce canal sont souvent choisies pour guider, et leur influence est plus forte quand on les a invitées à mener que lorsqu'elles ont pris ce rôle d'elles-mêmes.",
    },
    "9-52": {
      name: "Concentration",
      text: "relie le centre Racine au centre sacral : l'énergie est rassemblée en un point, et la personne peut rester longtemps et calmement attentive à une tâche et à ses détails. Quand l'activité est choisie en suivant la réponse, cette concentration apporte de la satisfaction ; sans occupation, elle tourne souvent à l'agitation.",
    },
    "10-20": {
      name: "Éveil",
      text: "relie le centre G à la Gorge : ici, l'essentiel est d'être soi-même dans l'instant, de parler et d'agir selon ses convictions. Les personnes avec ce canal éveillent souvent les autres non par des leçons de morale, mais par l'exemple d'une vie menée à leur façon.",
    },
    "10-34": {
      name: "Exploration",
      text: "relie le centre G au centre sacral : l'énergie sert à vivre selon ses convictions. Les personnes avec ce canal suivent généralement leur propre chemin et supportent mal les consignes des autres ; leur indépendance, quand elle vient de la réponse et non de l'entêtement, peut servir d'exemple aux autres.",
    },
    "10-57": {
      name: "Forme parfaite",
      text: "relie le centre G au centre splénique : l'intuition du moment indique comment agir pour rester soi-même. Les personnes avec ce canal ont souvent le sens de la forme et du style, et il leur est plus simple de se fier à leur intuition qu'à un plan réfléchi à l'avance.",
    },
    "11-56": {
      name: "Curiosité",
      text: "relie l'Ajna à la Gorge : idées et impressions prennent la forme d'histoires. Les personnes avec ce canal cherchent souvent la nouveauté pour le plaisir de chercher, et leurs récits éveillent chez les autres des pensées qu'on a envie de méditer.",
    },
    "12-22": {
      name: "Ouverture",
      text: "relie le plexus solaire à la Gorge : les émotions cherchent à s'exprimer par les mots, l'intonation, la création. L'humeur compte beaucoup : au bon moment, les personnes avec ce canal savent toucher les autres par la parole ; quand l'humeur n'y est pas, mieux vaut pour elles se taire.",
    },
    "13-33": {
      name: "Le Prodigue",
      text: "relie le centre G à la Gorge : c'est l'art d'écouter, de retenir puis de donner un sens au vécu, le sien comme celui des autres. On confie souvent histoires et secrets aux personnes avec ce canal, et après une pause en retrait, leur expérience se transforme en leçons utiles aux autres.",
    },
    "16-48": {
      name: "Longueur d'onde",
      text: "relie le centre splénique à la Gorge : ici, la profondeur du savoir rencontre l'art de le montrer. Chez les personnes avec ce canal, la maîtrise naît généralement de la répétition et de la pratique, et un talent travaillé se voit sans qu'il soit besoin de mots.",
    },
    "17-62": {
      name: "Acceptation",
      text: "relie l'Ajna à la Gorge : les pensées prennent la forme d'opinions étayées par des faits et des détails. Les personnes avec ce canal savent généralement bien expliquer et organiser, et leur avis est mieux accepté quand on le leur a demandé.",
    },
    "18-58": {
      name: "Jugement",
      text: "relie le centre Racine au centre splénique : c'est un besoin insatiable de repérer ce qui peut être corrigé, et la joie quand les choses s'améliorent. Les personnes avec ce canal voient souvent les points faibles des projets et des systèmes, et leurs remarques sont plus utiles quand on les a demandées que lorsqu'elles sonnent comme un reproche.",
    },
    "19-49": {
      name: "Synthèse",
      text: "relie le centre Racine au plexus solaire : c'est une sensibilité aux besoins des gens, qu'il s'agisse de proximité, d'un toit ou d'un sentiment d'appartenance. Les personnes avec ce canal tiennent aux principes et à un échange honnête dans les relations, et elles remarquent souvent les premières ce qui manque à chacun.",
    },
    "20-34": {
      name: "Charisme",
      text: "relie le centre sacral à la Gorge : l'énergie passe directement à l'action, sans longue préparation. Les personnes avec ce canal sont généralement occupées et agissent vite, et cette rapidité est un atout quand l'activité est choisie en suivant la réponse, et non prise au hasard.",
    },
    "20-57": {
      name: "Onde cérébrale",
      text: "relie le centre splénique à la Gorge : l'intuition se déclenche instantanément et trouve aussitôt ses mots. Les personnes avec ce canal saisissent souvent l'essentiel d'une situation avant les autres, et leur première impression se révèle souvent juste, si le raisonnement ne vient pas la contredire.",
    },
    "21-45": {
      name: "Argent",
      text: "relie le centre du Cœur à la Gorge : c'est la volonté de gérer les ressources et de veiller à ce que les siens ne manquent de rien. Les personnes avec ce canal tiennent généralement à diriger elles-mêmes leur part de l'activité, et elles organisent bien les autres quand ce rôle leur est reconnu.",
    },
    "23-43": {
      name: "Structuration",
      text: "relie l'Ajna à la Gorge : des idées fulgurantes et inattendues cherchent des mots clairs. Les personnes avec ce canal ont souvent des idées en avance sur leur temps, et on les entend mieux quand l'auditeur a lui-même posé la question et que l'explication est simple.",
    },
    "24-61": {
      name: "Conscience",
      text: "relie le centre de la Tête à l'Ajna : l'esprit revient sans cesse à la même énigme, jusqu'à ce que la compréhension arrive. Les personnes avec ce canal ont parfois du mal à lâcher une question, et le déclic vient généralement de lui-même, dans le calme, et non sous la pression.",
    },
    "25-51": {
      name: "Initiation",
      text: "relie le centre G au centre du Cœur, d'où le désir d'être le premier et le courage d'entrer dans l'inconnu. Chez les personnes avec ce canal, les chocs et les virages brusques marquent souvent le début de quelque chose de nouveau, et leur exemple pousse parfois les autres à faire leur propre pas.",
    },
    "26-44": {
      name: "Transmission",
      text: "relie le centre splénique au centre du Cœur : l'intuition indique ce dont les gens ont besoin maintenant, et la volonté aide à le leur transmettre. Les personnes avec ce canal réussissent souvent les négociations : elles savent présenter une idée de façon à donner envie de l'adopter, et se souviennent de ce qui a fonctionné.",
    },
    "27-50": {
      name: "Préservation",
      text: "relie le centre sacral au centre splénique : c'est une énergie de soin, le désir de protéger et de soutenir les siens et de préserver ce qui compte pour eux. Les personnes avec ce canal prennent souvent beaucoup de monde sous leur responsabilité, et elles gagnent à choisir de qui prendre soin pour ne pas porter plus qu'elles ne le souhaitent.",
    },
    "28-38": {
      name: "Lutte",
      text: "relie le centre Racine au centre splénique : c'est la ténacité dans la quête de sens. Les personnes avec ce canal sont prêtes à se battre pour ce qui compte pour elles, et les difficultés les endurcissent plutôt qu'elles ne les arrêtent, si la lutte sert leur propre cause et non la lutte pour elle-même.",
    },
    "29-46": {
      name: "Découverte",
      text: "relie le centre sacral au centre G : quand le « oui » vient de la réponse, l'énergie suffit pour vivre l'expérience jusqu'au bout. Les personnes avec ce canal réussissent souvent là où d'autres abandonnent ; ce à quoi elles disent oui compte donc particulièrement.",
    },
    "30-41": {
      name: "Reconnaissance",
      text: "relie le centre Racine au plexus solaire : c'est la soif de nouvelles expériences et des désirs forts, portés par des rêves. Pour les personnes avec ce canal, une expérience apporte généralement davantage quand on s'y engage une fois l'émotion apaisée, et non à son apogée.",
    },
    "32-54": {
      name: "Transformation",
      text: "relie le centre Racine au centre splénique : c'est l'ambition et le flair pour ce qui va durer. Les personnes avec ce canal cherchent généralement à s'élever et à changer de situation, et elles avancent plus facilement quand d'autres remarquent et soutiennent leurs efforts.",
    },
    "34-57": {
      name: "Puissance",
      text: "relie le centre sacral au centre splénique : force et intuition agissent ensemble, dans l'instant. Les personnes avec ce canal réagissent souvent à une situation avant d'avoir eu le temps d'y réfléchir, et cette réaction, si elle vient de la réponse, se révèle généralement juste.",
    },
    "35-36": {
      name: "Transitoire",
      text: "relie le plexus solaire à la Gorge : c'est l'attrait pour les impressions nouvelles et l'expérience pour elle-même. Les personnes avec ce canal ont envie de goûter à beaucoup de choses, et les élans et les déceptions vécus deviennent avec le temps une sagesse qu'elles transmettent aux autres.",
    },
    "37-40": {
      name: "Communauté",
      text: "relie le centre du Cœur au plexus solaire : c'est le canal des accords — qui fait quoi pour la cause commune et ce qu'il reçoit en retour. Les personnes avec ce canal tiennent à la loyauté et à un échange honnête, ainsi qu'à du temps pour elles afin de reprendre des forces.",
    },
    "39-55": {
      name: "Émotivité",
      text: "relie le centre Racine au plexus solaire : l'humeur change ici fortement et fréquemment, et de ces variations naît souvent la créativité. Les personnes avec ce canal n'ont pas à chercher à chaque tristesse une cause extérieure : l'humeur peut venir et repartir d'elle-même.",
    },
    "42-53": {
      name: "Maturation",
      text: "relie le centre Racine au centre sacral : c'est l'énergie des cycles — commencer, traverser et terminer. Il est important pour les personnes avec ce canal de mener à terme ce qu'elles commencent, et une expérience vécue jusqu'au bout devient, pour elles comme pour les autres, une source de maturité.",
    },
    "47-64": {
      name: "Abstraction",
      text: "relie le centre de la Tête à l'Ajna : images et souvenirs tourbillonnent dans la tête jusqu'à ce qu'un sens s'en dégage. Les personnes avec ce canal connaissent une confusion qui, avec le temps, se change d'elle-même en clarté, et leurs conclusions sur le vécu sont souvent précieuses pour les autres.",
    },
  },
  typesSection: {
    heading: "Les cinq types du Human Design",
    lead: "Le type dépend des centres définis et de la façon dont ils sont reliés entre eux. Aucun type n'est meilleur qu'un autre : chacun a sa stratégie, un repère sur la façon la plus simple de lancer les choses et de prendre des décisions, pour dépenser moins d'énergie à lutter contre les résistances.",
  },
  faqHeading: "Questions",
  faq: [
    {
      q: "Pourquoi faut-il l'heure de naissance exacte ?",
      a: "La Lune se déplace vite et passe à la porte suivante en une demi-journée environ. Quand elle change de porte, des canaux peuvent apparaître ou disparaître : les centres définis changent alors, et parfois le type et l'autorité. Le profil dépend des lignes du Soleil : celui-ci avance plus lentement, mais près de la limite d'une ligne, quelques heures suffisent à changer le profil. Si vous ne connaissez l'heure qu'approximativement, calculez deux ou trois variantes : vous pouvez vous appuyer sur ce qui est commun à toutes.",
    },
    {
      q: "Ma ville n'est pas dans la liste : que faire ?",
      a: "Choisissez la grande ville la plus proche dans le même fuseau horaire, de préférence dans la même région : les limites des fuseaux ont changé au fil du temps. La ville ne sert qu'à connaître le fuseau et l'heure d'été l'année de la naissance : c'est avec eux que l'heure locale de naissance est convertie en UTC. Les coordonnées n'entrent pas dans le calcul : une ville voisine du même fuseau donne donc la même carte, et une erreur d'une heure sur le fuseau équivaut à une erreur d'une heure sur l'heure de naissance.",
    },
    {
      q: "Mes données sont-elles conservées ?",
      a: "Non. La carte est calculée directement dans votre navigateur : la date, l'heure et la ville de naissance ne sont pas envoyées au serveur, et après un rechargement de la page, le formulaire est vide. Si vous cliquez sur « Analyser avec Raya », un brouillon de message contenant ces données attend dans votre navigateur le temps que vous vous connectiez à Linkeon, puis s'efface dès qu'il apparaît dans le champ de message ou que vous vous déconnectez. Raya ne les verra que si vous lui envoyez vous-même le message.",
    },
    {
      q: "En quoi est-ce différent d'une analyse avec Raya ?",
      a: "Le calculateur est gratuit et fonctionne sans inscription : il établit la carte et décrit comment chacune de ses parties se manifeste généralement chez les gens. Raya analyse la carte dans son ensemble : comment les parties sont liées entre elles et ce que cela signifie en pratique. Elle répond à vos questions et propose une expérience de 7 jours ; elle explique aussi la croix d'incarnation et analyse les cartes de vos proches. Pour parler avec Raya, il faut se connecter à Linkeon ; 25 000 jetons offerts à l'inscription.",
    },
    {
      q: "Pourquoi un autre site affiche-t-il un résultat différent ?",
      a: "Comparez d'abord le décalage par rapport à UTC à la date de naissance : chez nous, il s'affiche sous le champ de la ville. Dans une même ville, le fuseau et les règles de l'heure d'été ont varié selon les années, et tous les sites n'en tiennent pas compte ; une erreur d'une heure déplace la Lune, et avec elle parfois les canaux et le type. Autre cause : le nœud lunaire. Nous prenons le nœud vrai ; avec le nœud moyen, les nœuds peuvent tomber sur une autre ligne, plus rarement sur une autre porte. Enfin, une planète tout près de la limite d'une ligne peut être placée d'un côté ou de l'autre selon les logiciels.",
    },
  ],
  disclaimer:
    "Le Human Design est un outil de connaissance de soi : ce n'est pas une prévision, et il ne remplace pas un médecin, un juriste ou un conseiller financier.",
  credits: "Villes et fuseaux horaires :",
  licenses: "Licences des composants tiers",
  message:
    "Salut Raya ! Voici mes données de naissance : {date}, {time}, {city} ({offset}). Le calculateur indique : {type}, profil {profile}, {authority}. Dis-moi ce que cela signifie pour moi",
};

export default fr;
