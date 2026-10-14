import type { HdTexts } from '../types';

/**
 * Калькулятор Human Design на немецком. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-14-hd-calculator-languages.md, «Правила переводов»;
 * термины — docs/hd-calculator/glossary-languages.md.
 */
const de: HdTexts = {
  title: 'Human Design Rechner – Bodygraph kostenlos berechnen | Linkeon',
  description:
    'Kostenloser Human Design Rechner ohne Registrierung: Ihr Bodygraph aus Datum, Uhrzeit und Ort der Geburt – Typ, Strategie, Autorität und Profil mit kurzen Beschreibungen.',
  h1: 'Human Design Rechner online – Bodygraph kostenlos',
  breadcrumb: 'Human-Design-Rechner',
  intro: [
    'Für den Bodygraph brauchen Sie Datum, genaue Uhrzeit und Ort der Geburt. Der Rechner zeigt Typ, Strategie, Autorität, Profil und Definition, weiter unten Zentren und Kanäle. Zu jedem Teil gibt es eine kurze Beschreibung: wie er sich bei Menschen gewöhnlich zeigt.',
    'Human Design beschreibt den Menschen mit einem Schema aus neun Zentren, 64 Toren und 36 Kanälen. Was darin definiert ist, hängt von der Stellung von Sonne, Mond, Mondknoten und Planeten ab – zum Zeitpunkt der Geburt und etwa 88 Tage davor. Daraus ergeben sich Typ, Strategie und Autorität: Hinweise darauf, wie ein Mensch am besten Entscheidungen trifft und mit seinen Kräften haushaltet.',
    'Human Design ist hier ein Werkzeug der Selbsterkenntnis, keine Prognose: Die Beschreibungen handeln von Neigungen, nicht von Ereignissen, und Sie prüfen sie am besten an Ihrer eigenen Erfahrung. Das Chart wird direkt im Browser und ohne Registrierung berechnet: Datum, Uhrzeit und Ort der Geburt werden nicht an einen Server gesendet.',
  ],
  form: {
    heading: 'Ihre Geburtsdaten',
    date: 'Geburtsdatum',
    time: 'Geburtszeit',
    timeHint: 'Die Uhrzeit ist Pflicht: Ohne sie kann sich ein anderer Typ ergeben.',
    city: 'Geburtsort',
    cityPlaceholder: 'Geben Sie den Ort ein',
    cityHint: 'Ihr Ort fehlt? Wählen Sie die nächstgelegene größere Stadt in derselben Zeitzone.',
    cityLoading: 'Städteliste wird geladen…',
    cityLoadError: 'Die Städteliste ließ sich nicht laden. Prüfen Sie die Verbindung und klicken Sie erneut in das Feld.',
    cityNotFound: 'Dieser Ort steht nicht in der Liste – wählen Sie die nächstgelegene größere Stadt in derselben Zeitzone.',
    zoneLine: '{city}, {offset} am Tag der Geburt',
    zoneUnknown: 'Der Browser kennt die Zeitzone dieser Stadt nicht – wählen Sie eine größere Stadt in der Nähe.',
    dstGap: 'In dieser Nacht wurden die Uhren vorgestellt: Die Uhrzeit {time} gab es nicht. Wie wurde die Geburtszeit notiert?',
    dstAmbiguous: 'In dieser Nacht wurden die Uhren zurückgestellt: Die Uhrzeit {time} gab es zweimal. Welche der beiden?',
    dstBefore: 'Vor der Zeitumstellung ({offset})',
    dstAfter: 'Nach der Zeitumstellung ({offset})',
    dstChoose: 'Wählen Sie: vor oder nach der Zeitumstellung.',
    missing: 'Geben Sie Datum und Uhrzeit ein und wählen Sie einen Ort aus der Liste.',
    futureDate: 'Prüfen Sie das Datum: Es muss zwischen dem Jahr 1900 und heute liegen.',
    submit: 'Berechnen',
  },
  result: {
    heading: 'Ihr Bodygraph',
    dataLine: '{date}, {time}, {city} ({offset})',
    bodygraphLabel: 'Bodygraph: {type}. Definierte Zentren: {centers}',
    bodygraphLabelEmpty: 'Bodygraph: {type}. Definierte Zentren: keine',
    legendPersonality: 'Persönlichkeit – Zeitpunkt der Geburt',
    legendDesign: 'Design – etwa 88 Tage vor der Geburt',
    typeLabel: 'Typ',
    strategyLabel: 'Strategie',
    authorityLabel: 'Autorität',
    profileLabel: 'Profil',
    definitionLabel: 'Definition',
    definedCenters: 'Definierte Zentren',
    noDefinedCenters: 'Keine definierten Zentren',
    openCenters: 'Offene Zentren',
    noOpenCenters: 'Keine offenen Zentren',
    channels: 'Kanäle',
    noChannels: 'Keine definierten Kanäle',
    cta: 'Mit Raya besprechen',
    ctaNote: 'Persönliche Deutung und ein Experiment für 7 Tage bei Raya – bei der Registrierung 25.000 Tokens geschenkt',
  },
  types: {
    generator: {
      name: 'Generator',
      strategy: 'Reagieren',
      text: 'Beim Generator ist das Sakralzentrum definiert – ein stabiler Kraftvorrat für Dinge, die begeistern. Die Strategie „Reagieren“: nicht per Willenskraft bei null beginnen, sondern abwarten, bis das Leben etwas anbietet – eine Frage, Bitte oder Aufgabe –, und spüren, ob sich ein klares inneres „Ja“ meldet. Was aus der Reaktion heraus gewählt ist, macht meist zufrieden, was dagegen gewählt ist, eher gereizt und müde.',
    },
    manifestingGenerator: {
      name: 'Manifestierender Generator',
      strategy: 'Reagieren, dann informieren',
      text: 'Beim Manifestierenden Generator ist das Sakralzentrum definiert, seine Kraft ist mit dem Kehlzentrum verbunden und setzt sich schnell in Taten um. Die Strategie „Reagieren, dann informieren“: auf ein klares „Ja“ zu dem warten, was das Leben anbietet, und vor dem Handeln kurz die Betroffenen informieren. Solche Menschen machen oft mehreres zugleich, überspringen Schritte und holen Ausgelassenes später nach.',
    },
    manifestor: {
      name: 'Manifestor',
      strategy: 'Informieren',
      text: 'Beim Manifestor ist das Sakralzentrum offen, doch eine andere Kraftquelle (Herzzentrum, Solarplexus oder Wurzelzentrum) ist mit dem Kehlzentrum verbunden: Er kann selbst anfangen, ohne auf Angebote des Lebens zu warten. Die Strategie „Informieren“: vor dem Handeln kurz die Betroffenen informieren. Das ist keine Bitte um Erlaubnis: So sträuben sich andere meist weniger, und er hat weniger Ärger und mehr Ruhe.',
    },
    projector: {
      name: 'Projektor',
      strategy: 'Auf die Einladung warten',
      text: 'Beim Projektor ist das Sakralzentrum offen, und einen gleichmäßigen Kraftvorrat für lange Arbeit wie der Generator hat er meist nicht. Dafür sieht er oft genau, wie Menschen und Abläufe funktionieren und was sich daran verbessern lässt. Die Strategie „Auf die Einladung warten“ gilt für Großes wie Arbeit, Beziehungen oder einen Umzug: Ungefragter Rat wird oft überhört, derselbe Rat auf Einladung kommt gelegen.',
    },
    reflector: {
      name: 'Reflektor',
      strategy: 'Einen Mondzyklus abwarten – etwa 28 Tage',
      text: 'Beim Reflektor sind alle neun Zentren offen – ein seltener Typ. Reflektoren spiegeln ihr Umfeld fein wider: An ihrem Befinden sieht man oft, wie es in Familie oder Team steht, darum zählt für sie, wo und mit wem sie leben und arbeiten. Für wichtige Entscheidungen nehmen sie sich am besten etwa 28 Tage Zeit: So lange braucht der Mond für alle 64 Tore, und die Entscheidung kann sich von verschiedenen Seiten zeigen.',
    },
  },
  authorities: {
    emotional: {
      name: 'Emotional (Solarplexus)',
      inMessage: 'emotionale Autorität',
      text: 'Emotionale Autorität hat jeder, bei dem der Solarplexus definiert ist, ganz gleich, welche Zentren sonst definiert sind. Gefühle verlaufen in Wellen, vom Hoch zum Tief, und an jedem Punkt kann eine Entscheidung eindeutig erscheinen. Klarheit kommt meist, wenn sich die Welle gelegt hat: Bei Wichtigem hilft es, „eine Nacht darüber zu schlafen“ und zu prüfen, ob die Antwort nach ein, zwei Tagen noch dieselbe ist.',
    },
    sacral: {
      name: 'Sakral',
      inMessage: 'sakrale Autorität',
      text: 'Sakrale Autorität haben Generatoren und Manifestierende Generatoren, wenn der Solarplexus offen ist. Die Antwort kommt sofort und von innen – als klares „Ja“ oder „Nein“, manchmal als Laut wie „mhm“ oder „nö“, noch bevor sich der Verstand einschaltet. Diese sakrale Antwort ist am leichtesten zu hören, wenn die Frage einfach gestellt ist und sich mit einem Wort beantworten lässt.',
    },
    splenic: {
      name: 'Milz',
      inMessage: 'Milz-Autorität',
      text: 'Milz-Autorität gibt es, wenn das Milzzentrum definiert ist, Solarplexus und Sakralzentrum aber offen sind. Das ist ein leises Gespür im Hier und Jetzt: Es meldet sich einmal, sofort, und wiederholt sich nicht. Überlegungen übertönen es leicht, daher vertrauen Menschen mit dieser Autorität am besten dem ersten Gefühl – vor allem, wenn es um Sicherheit geht und darum, was gerade jetzt passt.',
    },
    ego: {
      name: 'Ego (Herzzentrum)',
      inMessage: 'Ego-Autorität',
      text: 'Ego-Autorität gibt es, wenn das Herzzentrum definiert ist, Solarplexus, Sakral- und Milzzentrum aber offen sind. Eine Entscheidung lässt sich mit einer einfachen Frage prüfen: ob man das wirklich will und was es einem bringt. Beim Manifestor ist die Antwort meist in dem zu hören, was er spontan sagt, beim Projektor wird sie im Gespräch mit Menschen klar, denen er vertraut.',
    },
    selfProjected: {
      name: 'Selbstprojiziert',
      inMessage: 'selbstprojizierte Autorität',
      text: 'Selbstprojizierte Autorität haben Projektoren, deren definiertes G-Zentrum mit dem Kehlzentrum verbunden ist, während Solarplexus, Milz- und Herzzentrum offen sind. Klarheit kommt über die eigene Stimme: die Frage mit einem vertrauten Menschen laut durchsprechen und hören, was man selbst sagt. Das Gegenüber dient dabei als Zuhörer, nicht als Ratgeber, und die stimmige Antwort klingt meist nach „Das bin ich“.',
    },
    mental: {
      name: 'Mental (über die Umgebung)',
      inMessage: 'mentale Autorität',
      text: 'Mentale Autorität haben Projektoren, bei denen nur Kopfzentrum, Ajna und Kehlzentrum oder ein Teil davon definiert sind. Ein inneres „Ja“ oder „Nein“ gibt es hier nicht, und Klarheit kommt von außen: aus Gesprächen mit verschiedenen Menschen, denen man vertraut, und daraus, wie man sich an einem Ort fühlt. Es hilft, Entscheidungen nicht zu überstürzen: Nach und nach hört man in den eigenen Worten, was stimmt.',
    },
    lunar: {
      name: 'Lunar',
      inMessage: 'lunare Autorität',
      text: 'Lunare Autorität haben nur Reflektoren: Definierte Zentren gibt es nicht und damit auch kein beständiges inneres Signal. Wichtiges entscheidet man am besten im Lauf eines Mondzyklus (etwa 28 Tage): die Frage mit verschiedenen Menschen besprechen, bemerken, wie sich die Haltung dazu von Tag zu Tag ändert, und warten, bis die Antwort stabil ist. Eile stört hier meist, Zeit hilft, die Frage als Ganzes zu sehen.',
    },
  },
  profiles: {
    '1/3': {
      name: 'Forscher / Märtyrer',
      text: 'Die erste Linie sucht Halt im Wissen: Bevor man handelt, will man die Grundlagen verstehen. Die dritte prüft alles an der eigenen Erfahrung, durch Versuch und Irrtum. Zusammen ergibt das einen Menschen, der erst forscht und dann ausprobiert. Fehlschläge sind für ihn eher Erkenntnisse als Niederlagen: So erfährt er, worauf er sich wirklich verlassen kann.',
    },
    '1/4': {
      name: 'Forscher / Opportunist',
      text: 'Die erste Linie sucht Halt im Wissen: Am sichersten fühlt man sich, wenn man die Grundlagen verstanden hat. Die vierte baut auf Menschen: Chancen kommen meist über Bekannte, Freunde und Kollegen. Mit diesem Profil liegt es nahe, sich in das zu vertiefen, was einen interessiert, und es mit dem eigenen Kreis zu teilen – dort findet man in der Regel auch Gehör.',
    },
    '2/4': {
      name: 'Eremit / Opportunist',
      text: 'Die zweite Linie steht für eine natürliche Begabung, die man selbst oft nicht bemerkt, und für das Bedürfnis, allein zu sein und ungestört dem Eigenen nachzugehen. Die vierte verbindet mit Menschen: Das nahe Umfeld sieht diese Begabung meist und ermutigt dazu, sie zu zeigen. Mit diesem Profil hilft es, Zeit für sich freizuhalten und auf Einladungen von Menschen einzugehen, die man kennt.',
    },
    '2/5': {
      name: 'Eremit / Ketzer',
      text: 'Die zweite Linie steht für natürliche Begabung und das Bedürfnis nach Rückzug. Die fünfte zieht fremde Erwartungen an: Von einem solchen Menschen erwartet man oft eine praktische Lösung oder sogar Rettung in schwieriger Lage. Manchmal wird man öfter um Hilfe gebeten, als einem lieb ist. Mit diesem Profil hilft es daher, Zeit für sich freizuhalten und nur zu übernehmen, was wirklich zu schaffen ist.',
    },
    '3/5': {
      name: 'Märtyrer / Ketzer',
      text: 'Die dritte Linie lernt aus Erfahrung: Sie probiert, irrt sich und findet heraus, was funktioniert. Die fünfte zieht die Erwartungen anderer an: Von diesem Menschen werden praktische Lösungen erwartet. In dieser Verbindung werden Fehler zu Erfahrung, aus der solche Lösungen wachsen, und den Ruf schützt die Gewohnheit, nicht mehr zu versprechen, als man an sich selbst geprüft hat.',
    },
    '3/6': {
      name: 'Märtyrer / Rollenvorbild',
      text: 'Die dritte Linie lernt aus Erfahrung, durch Versuch und Irrtum. Die sechste wird meist in drei Phasen beschrieben: in jungen Jahren viel Ausprobieren wie bei der dritten Linie, dann eine Zeit des Beobachtens mit Abstand, später ein Vorbild für andere. Menschen mit diesem Profil sammeln häufig besonders viel Erfahrung, und mit der Zeit erwachsen daraus oft Gelassenheit und Weisheit, an denen sich andere orientieren.',
    },
    '4/6': {
      name: 'Opportunist / Rollenvorbild',
      text: 'Die vierte Linie baut auf Menschen: Freunde und Bekannte sind die wichtigste Quelle für Chancen und Unterstützung. Die sechste wird meist in drei Phasen beschrieben: erst viel Ausprobieren, dann der Blick von außen, später Erfahrung, an der sich andere orientieren. Auf Menschen mit diesem Profil hört man in ihrem Kreis oft, besonders wenn sie selbst so leben, wie sie reden.',
    },
    '4/1': {
      name: 'Opportunist / Forscher',
      text: 'Die vierte Linie baut auf Menschen aus dem eigenen Kreis, die erste auf festes Wissen. Menschen mit diesem Profil halten meist an ihrem Kurs fest: Unter fremdem Druck ändern sie sich ungern, und meist fällt es ihnen leichter, ihr eigenes Umfeld zu finden, als sich einem fremden anzupassen. Ihr festes Fundament macht sie oft zu einem verlässlichen Halt für die Menschen um sie herum.',
    },
    '5/1': {
      name: 'Ketzer / Forscher',
      text: 'Die fünfte Linie zieht fremde Erwartungen an: Von diesem Menschen wird eine praktische Lösung erwartet. Die erste gibt diesen Lösungen ein Fundament: Bevor er etwas vorschlägt, setzt er sich mit den Grundlagen auseinander. Menschen mit diesem Profil werden oft gerufen, wenn es schwierig wird, und ihr Ruf beruht darauf, dass ihre Lösungen geprüft sind und funktionieren.',
    },
    '5/2': {
      name: 'Ketzer / Eremit',
      text: 'Die fünfte Linie zieht die Erwartungen anderer an: Man erwartet, dass dieser Mensch einen Ausweg findet. Die zweite steht für natürliche Begabung und das Bedürfnis nach Rückzug. Manchmal wird man gerade dann gerufen, fremde Probleme zu lösen, wenn man allein sein möchte. Mit diesem Profil hilft es daher, zu wählen, welchem Ruf man folgt, und Zeit für sich freizuhalten.',
    },
    '6/2': {
      name: 'Rollenvorbild / Eremit',
      text: 'Die sechste Linie wird meist in drei Phasen beschrieben: in jungen Jahren viel Versuch und Irrtum, dann eine Zeit des Beobachtens mit Abstand, später ein Vorbild für andere. Die zweite bringt natürliche Begabung und das Bedürfnis nach Rückzug mit. Menschen mit diesem Profil halten sich oft etwas abseits, während andere ihr Beispiel und ihre Begabung bemerken.',
    },
    '6/3': {
      name: 'Rollenvorbild / Märtyrer',
      text: 'Die sechste Linie wird meist in drei Phasen beschrieben: erst viel Ausprobieren, dann der Blick von außen, später ein Vorbild für andere. Die dritte bringt Versuch und Irrtum auch in die späteren Phasen, daher verläuft die Erfahrung von Menschen mit diesem Profil selten glatt. Dafür entsteht daraus oft eine praktische, gelebte Weisheit, die andere gerade deshalb schätzen, weil sie erprobt ist.',
    },
  },
  definitions: {
    none: {
      name: 'Keine Definition',
      text: 'Das kommt nur beim Reflektor vor: Kein Kanal ist definiert. Definition entsteht lediglich vorübergehend – durch Menschen in der Nähe und durch den Lauf des Mondes. Deshalb gleicht kein Tag dem anderen. Zeit hilft, das Eigene von dem zu unterscheiden, was von außen kommt.',
    },
    single: {
      name: 'Einfache Definition',
      text: 'Alle definierten Zentren hängen in einer Gruppe zusammen. Menschen mit dieser Definition haben meist ein stabiles Gefühl der Ganzheit: Sie brauchen niemanden, der sie „ergänzt“, und verarbeiten Informationen selbst und recht schnell. Manchmal fällt es ihnen schwer zu verstehen, warum andere für dasselbe mehr Zeit brauchen.',
    },
    split: {
      name: 'Gespaltene Definition (zweifach)',
      text: 'Die definierten Zentren bilden zwei getrennte Gruppen, zwischen denen gleichsam eine Brücke fehlt. Manchmal fühlt man sich unvollständig, und es zieht einen zu Menschen, die diese Brücke schlagen: In ihrer Nähe fügt sich alles zu einem Ganzen. Bei Entscheidungen hilft meist Zeit, in der sich beide Teile einigen können.',
    },
    triple: {
      name: 'Dreifach gespaltene Definition',
      text: 'Die definierten Zentren bilden drei getrennte Gruppen. Menschen mit dieser Definition brauchen meist mehr Zeit, um alles zu durchdenken, und profitieren von vielfältigem Austausch: An belebten Orten und in Bewegung scheinen sich die verschiedenen Teile zu verbinden. Wer Entscheidungen nicht überstürzt, kommt zu einem vielschichtigen und ausgewogenen Blick.',
    },
    quadruple: {
      name: 'Vierfach gespaltene Definition',
      text: 'Die definierten Zentren bilden vier getrennte Gruppen – eine seltene Konstellation. Menschen mit dieser Definition verarbeiten Erfahrungen meist langsam und gründlich, und Eile stört sie eher. Entscheidungen treffen sie am besten ohne Druck und mit genügend Zeit; Ansichten, die so entstehen, sind meist beständig und ändern sich unter fremdem Einfluss kaum.',
    },
  },
  centers: {
    head: {
      name: 'Kopfzentrum',
      defined:
        'ein ständiger Strom von Fragen und Ideen, der von innen kommt: Stoff zum Nachdenken gibt es meist genug. Menschen mit diesem Zentrum inspirieren oft ihr Umfeld, und in ihrer Nähe tauchen auch bei anderen Fragen auf.',
      open: 'Fragen und Inspiration kommen von anderen Menschen und werden in ihrer Nähe stärker. Manchmal zerbricht man sich den Kopf über fremde Fragen – dann hilft es, sich zu fragen, welche davon wirklich die eigenen sind.',
    },
    ajna: {
      name: 'Ajna',
      defined:
        'eine beständige Art zu denken: Meinungen und Schlüsse folgen einer eigenen inneren Logik und hängen wenig vom Gegenüber ab. Menschen mit diesem Zentrum sind sich meist sicher, wie sie die Dinge verstehen, und es fällt ihnen mitunter schwer zu akzeptieren, dass andere anders denken.',
      open: 'ein beweglicher Verstand, der eine Frage leicht von verschiedenen Seiten sieht und fremde Sichtweisen ausprobiert. Manchmal ist die Versuchung da, Gewissheit vorzutäuschen, die man nicht hat – dabei ist gerade die Offenheit für verschiedene Meinungen hier eine Stärke.',
    },
    throat: {
      name: 'Kehlzentrum',
      defined:
        'eine beständige, wiedererkennbare Art, zu sprechen und sich im Handeln zu zeigen. Menschen mit diesem Zentrum müssen meist nicht um Aufmerksamkeit kämpfen, und wie genau sie klingen, hängt davon ab, mit welchen Zentren das Kehlzentrum verbunden ist.',
      open: 'die Art zu sprechen wechselt je nachdem, wer in der Nähe ist, und manchmal drängt es einen, als Erster das Wort zu ergreifen, um bemerkt zu werden. Was solche Menschen sagen, hat meist mehr Gewicht, wenn man sie von sich aus angesprochen hat.',
    },
    g: {
      name: 'G-Zentrum (Identität)',
      defined:
        'ein beständiges Gespür für sich selbst und die eigene Richtung: Solche Menschen wissen meist, wer sie sind und wohin sie gehen, und das hängt wenig vom Umfeld ab. In ihrer Nähe fällt es anderen oft leichter, den eigenen Weg zu spüren.',
      open: 'das Gespür für sich selbst und die Richtung ist flexibel und hängt stark von Ort und Menschen ringsum ab. Deshalb ist es für solche Menschen besonders wichtig, wo und mit wem sie leben und arbeiten: Das passende Umfeld zeigt die Richtung von selbst.',
    },
    heart: {
      name: 'Herzzentrum (Ego)',
      defined:
        'ein ständiger Zugang zu Willenskraft und zum Gefühl des eigenen Werts. Solche Menschen können meist etwas versprechen und halten, wenn es ihnen wirklich wichtig ist – und damit die Willenskraft lange reicht, braucht sie auch Pausen.',
      open: 'Willenskraft ist nicht beständig, und der Wert eines Menschen hängt nicht davon ab, wie sehr er sich zu etwas zwingen konnte. Manchmal gibt man Versprechen, um etwas zu beweisen – und dann fällt es besonders schwer, sie zu halten.',
    },
    spleen: {
      name: 'Milzzentrum',
      defined:
        'ein beständiges Gespür, das im Hier und Jetzt anzeigt, was sicher ist und was passt. Es spricht leise und nur einmal, und das gleichmäßige Wohlbefinden von Menschen mit diesem Zentrum spüren oft auch die, die in ihrer Nähe sind.',
      open: 'Feingefühl für den Zustand anderer: Man merkt gut, wem in der Nähe unwohl ist. Manchmal hält man am Vertrauten fest – an Menschen, Beziehungen, Gewohnheiten –, auch wenn es nicht mehr guttut, einfach weil es beruhigt.',
    },
    solarPlexus: {
      name: 'Solarplexus',
      defined:
        'ein eigener Rhythmus der Gefühle: Hochs und Tiefs folgen einem inneren Takt und hängen nicht immer mit dem zusammen, was ringsum geschieht. Die Stimmung von Menschen mit diesem Zentrum überträgt sich spürbar auf ihr Umfeld.',
      open: 'eine feine Empfänglichkeit für die Gefühle anderer: In der Nähe von Menschen werden Emotionen stärker und fühlen sich wie die eigenen an. Manchmal geht man Konflikten und unangenehmen Gesprächen aus dem Weg, um nicht in einen fremden Sturm zu geraten.',
    },
    sacral: {
      name: 'Sakralzentrum',
      defined:
        'Lebens- und Arbeitskraft, die sich erneuert, wenn die Tätigkeit Freude macht. Menschen mit diesem Zentrum stecken ihr Umfeld meist mit Energie an: In ihrer Nähe fällt es auch anderen leichter, etwas anzupacken.',
      open: 'kein ständiger Zugang zur Arbeitsenergie, und in der Nähe von Menschen mit definiertem Sakralzentrum scheint mehr Kraft da zu sein, als tatsächlich vorhanden ist. Solchen Menschen hilft es, zu bemerken, wann es genug ist, und sich beim Pensum nicht an denen zu messen, bei denen dieses Zentrum definiert ist.',
    },
    root: {
      name: 'Wurzelzentrum',
      defined:
        'ein gleichmäßiger innerer Druck, der hilft, Dinge anzupacken und Fristen einzuhalten. Eile und Anspannung ertragen Menschen mit diesem Zentrum meist gelassen und arbeiten in ihrem eigenen Tempo.',
      open: 'Empfindlichkeit für Druck und Eile ringsum: Fremde Anspannung verstärkt sich und fühlt sich wie die eigene an. Manchmal beeilt man sich, alles zu erledigen, nur um die Anspannung loszuwerden, obwohl vieles warten könnte.',
    },
  },
  channels: {
    '1-8': {
      name: 'Inspiration',
      text: 'verbindet das G-Zentrum mit dem Kehlzentrum: Die Eigenart eines Menschen sucht ihren Ausdruck in Wort und Tat. Menschen mit diesem Kanal inspirieren andere oft nicht durch Ratschläge, sondern dadurch, dass sie alles auf ihre Weise tun, und ihr kreativer Beitrag wird besser angenommen, wenn man sie wahrgenommen und eingeladen hat.',
    },
    '2-14': {
      name: 'Der Beat',
      text: 'verbindet das G-Zentrum mit dem Sakralzentrum: Menschen mit diesem Kanal haben die Kraft, in ihre eigene Richtung zu gehen, auch wenn sie von der anderer abweicht. Nicht selten geben sie den Kurs vor und finden Mittel für eine Sache, von der sie überzeugt sind, und andere ziehen nach.',
    },
    '3-60': {
      name: 'Mutation',
      text: 'verbindet das Wurzelzentrum mit dem Sakralzentrum: Energie kommt in Schüben, und in den Pausen ist einem mitunter trüb zumute, und man weiß nicht, wohin es gehen soll. Dafür entsteht bei Menschen mit diesem Kanal aus solchen Pausen oft etwas wirklich Neues, wenn man es reifen lässt und nicht drängt.',
    },
    '4-63': {
      name: 'Logik',
      text: 'verbindet das Kopfzentrum mit dem Ajna: Der Zweifel treibt dazu an, nach Mustern und logischen Antworten zu suchen. Menschen mit diesem Kanal bemerken meist, wo eine Überlegung nicht aufgeht, und ihre Schlüsse sind besonders nützlich, wenn man sie in der Praxis prüft, statt sie einfach zu glauben.',
    },
    '5-15': {
      name: 'Rhythmus',
      text: 'verbindet das Sakralzentrum mit dem G-Zentrum: Menschen mit diesem Kanal haben meist einen eigenen natürlichen Rhythmus – in welchem Tempo sie arbeiten, sich erholen und Neues anfangen. Folgen sie ihm statt einem aufgezwungenen Zeitplan, läuft vieles leichter, und in ihrer Nähe finden auch andere in den eigenen Rhythmus.',
    },
    '6-59': {
      name: 'Nähe',
      text: 'verbindet den Solarplexus mit dem Sakralzentrum: Das ist eine Energie der Annäherung, die hilft, das Eis zu brechen und Vertrauen zu schaffen. Menschen mit diesem Kanal ist Nähe meist wichtig, und in ihrer Gegenwart können sich andere leichter öffnen, vor allem, wenn man den Gefühlen Zeit lässt.',
    },
    '7-31': {
      name: 'Das Alpha',
      text: 'verbindet das G-Zentrum mit dem Kehlzentrum: Hier geht es um Führung, die auf Anerkennung beruht. Menschen mit diesem Kanal werden oft an die Spitze gewählt, und ihr Einfluss ist stärker, wenn man sie um die Führung gebeten hat, als wenn sie diese Rolle selbst ergriffen haben.',
    },
    '9-52': {
      name: 'Konzentration',
      text: 'verbindet das Wurzelzentrum mit dem Sakralzentrum: Die Kraft ist auf einen Punkt gebündelt, und man kann lange und ruhig bei einer Sache und ihren Details bleiben. Ist die Tätigkeit aus der Reaktion heraus gewählt, bringt diese Konzentration Zufriedenheit, ohne Aufgabe schlägt sie dagegen oft in Unruhe um.',
    },
    '10-20': {
      name: 'Erwachen',
      text: 'verbindet das G-Zentrum mit dem Kehlzentrum: Wichtig ist hier, gerade jetzt ganz man selbst zu sein und nach den eigenen Überzeugungen zu sprechen und zu handeln. Menschen mit diesem Kanal wecken andere oft nicht durch Belehrungen, sondern durch ihr Beispiel, wie man auf eigene Weise leben kann.',
    },
    '10-34': {
      name: 'Erforschung',
      text: 'verbindet das G-Zentrum mit dem Sakralzentrum: Die Kraft fließt in ein Leben nach den eigenen Überzeugungen. Menschen mit diesem Kanal gehen meist ihren eigenen Weg und vertragen fremde Anweisungen schlecht, und ihre Unabhängigkeit kann anderen ein Beispiel sein, wenn sie aus der Reaktion kommt und nicht aus Sturheit.',
    },
    '10-57': {
      name: 'Vollendete Form',
      text: 'verbindet das G-Zentrum mit dem Milzzentrum: Die Intuition zeigt im jeweiligen Augenblick, wie man handeln kann, um sich selbst treu zu bleiben. Menschen mit diesem Kanal haben oft einen Sinn für Form und Stil, und es fällt ihnen leichter, dem inneren Gespür zu vertrauen als einem vorab durchdachten Plan.',
    },
    '11-56': {
      name: 'Neugier',
      text: 'verbindet das Ajna mit dem Kehlzentrum: Ideen und Eindrücke fügen sich zu Geschichten. Menschen mit diesem Kanal suchen oft Neues um der Suche willen, und ihre Erzählungen wecken bei anderen Gedanken, über die man gern weiter nachdenkt.',
    },
    '12-22': {
      name: 'Offenheit',
      text: 'verbindet den Solarplexus mit dem Kehlzentrum: Gefühle suchen Ausdruck in Worten, im Tonfall, im kreativen Schaffen. Vieles hängt von der Stimmung ab: Im richtigen Moment gelingt es Menschen mit diesem Kanal, andere mit Worten zu berühren, ohne die passende Stimmung schweigen sie lieber.',
    },
    '13-33': {
      name: 'Der verlorene Sohn',
      text: 'verbindet das G-Zentrum mit dem Kehlzentrum: Das ist die Fähigkeit, zuzuhören, sich zu erinnern und das Erlebte – eigenes wie fremdes – später zu verarbeiten. Menschen mit diesem Kanal werden oft Geschichten und Geheimnisse anvertraut, und nach einer Zeit des Rückzugs wird ihre Erfahrung zu Erkenntnissen, die anderen nützen.',
    },
    '16-48': {
      name: 'Die Wellenlänge',
      text: 'verbindet das Milzzentrum mit dem Kehlzentrum: Hier trifft tiefes Wissen auf die Fähigkeit, es zu zeigen. Die Meisterschaft von Menschen mit diesem Kanal wächst meist aus Wiederholung und Übung, und ein ausgefeiltes Talent wird für andere oft ohne viele Worte sichtbar.',
    },
    '17-62': {
      name: 'Akzeptanz',
      text: 'verbindet das Ajna mit dem Kehlzentrum: Gedanken fügen sich zu Meinungen, gestützt auf Fakten und Details. Menschen mit diesem Kanal können meist gut erklären und ordnen, und ihre Meinung wird bereitwilliger angenommen, wenn man danach gefragt hat.',
    },
    '18-58': {
      name: 'Urteilsvermögen',
      text: 'verbindet das Wurzelzentrum mit dem Milzzentrum: Hier wirken ein unstillbarer Drang, zu bemerken, was sich verbessern lässt, und die Freude, wenn es besser geworden ist. Menschen mit diesem Kanal sehen oft Schwachstellen in Abläufen und Systemen, und ihre Hinweise nützen mehr, wenn man darum gebeten hat, als wenn sie wie ein Vorwurf klingen.',
    },
    '19-49': {
      name: 'Synthese',
      text: 'verbindet das Wurzelzentrum mit dem Solarplexus: Das ist ein Gespür dafür, was Menschen brauchen – Nähe, ein Dach über dem Kopf, Zugehörigkeit. Menschen mit diesem Kanal sind Prinzipien und ein fairer Austausch in Beziehungen wichtig, und oft bemerken sie als Erste, wem es an etwas fehlt.',
    },
    '20-34': {
      name: 'Charisma',
      text: 'verbindet das Sakralzentrum mit dem Kehlzentrum: Die Kraft geht sofort in Handlung über, ohne lange Vorbereitung. Menschen mit diesem Kanal sind meist mit etwas beschäftigt und handeln schnell, und das Tempo hilft, wenn die Sache aus der Reaktion heraus gewählt ist und sich nicht bloß zufällig ergeben hat.',
    },
    '20-57': {
      name: 'Geistesblitz',
      text: 'verbindet das Milzzentrum mit dem Kehlzentrum: Die Intuition meldet sich blitzschnell und findet sofort Worte. Menschen mit diesem Kanal erfassen den Kern einer Situation oft früher als andere, und ihr erster Eindruck erweist sich häufig als zutreffend, wenn sie ihn nicht zerreden.',
    },
    '21-45': {
      name: 'Die Geld-Linie',
      text: 'verbindet das Herzzentrum mit dem Kehlzentrum: Hier wirkt der Wille, über Ressourcen zu bestimmen und dafür zu sorgen, dass die eigenen Leute alles Nötige haben. Menschen mit diesem Kanal wollen ihren Teil der Sache meist selbst lenken, und sie organisieren andere gut, wenn ihnen diese Rolle zuerkannt ist.',
    },
    '23-43': {
      name: 'Strukturierung',
      text: 'verbindet das Ajna mit dem Kehlzentrum: Unerwartete Einsichten suchen nach verständlichen Worten. Menschen mit diesem Kanal kommen oft Ideen, die ihrer Zeit voraus sind, und sie finden leichter Gehör, wenn der Zuhörer selbst gefragt hat und die Erklärung einfach ist.',
    },
    '24-61': {
      name: 'Bewusstheit',
      text: 'verbindet das Kopfzentrum mit dem Ajna: Der Verstand kehrt immer wieder zu einem Rätsel zurück, bis sich Verständnis einstellt. Menschen mit diesem Kanal fällt es mitunter schwer, eine Frage loszulassen, und die Erkenntnis kommt meist von selbst, in der Stille, nicht unter Druck.',
    },
    '25-51': {
      name: 'Einweihung',
      text: 'verbindet das G-Zentrum mit dem Herzzentrum, daher der Wunsch, der Erste zu sein, und der Mut, ins Unbekannte zu gehen. Erschütterungen und abrupte Wendungen werden bei Menschen mit diesem Kanal oft zum Anfang von etwas Neuem, und ihr Beispiel gibt anderen nicht selten den Anstoß zum eigenen Schritt.',
    },
    '26-44': {
      name: 'Hingebung',
      text: 'verbindet das Milzzentrum mit dem Herzzentrum: Das Gespür zeigt, was Menschen gerade brauchen, und der Wille hilft, es ihnen nahezubringen. Menschen mit diesem Kanal gelingen Verhandlungen oft: Sie können eine Idee so präsentieren, dass man sie annehmen möchte, und erinnern sich daran, was früher funktioniert hat.',
    },
    '27-50': {
      name: 'Erhaltung',
      text: 'verbindet das Sakralzentrum mit dem Milzzentrum: Das ist eine Energie der Fürsorge – der Wunsch, die eigenen Leute zu schützen, zu unterstützen und zu bewahren, was ihnen wertvoll ist. Menschen mit diesem Kanal übernehmen oft Verantwortung für viele, und es hilft ihnen, auszuwählen, um wen sie sich kümmern, damit sie nicht mehr tragen, als sie möchten.',
    },
    '28-38': {
      name: 'Lebenskampf',
      text: 'verbindet das Wurzelzentrum mit dem Milzzentrum: Hier wirkt Beharrlichkeit bei der Suche nach Sinn. Menschen mit diesem Kanal sind bereit, für das zu kämpfen, was ihnen wichtig ist, und Schwierigkeiten härten sie eher ab, als dass sie sie aufhalten – sofern der Kampf der eigenen Sache gilt und nicht dem Kampf selbst.',
    },
    '29-46': {
      name: 'Entdeckung',
      text: 'verbindet das Sakralzentrum mit dem G-Zentrum: Ist das „Ja“ aus der Reaktion heraus gesagt, reicht die Kraft, eine Erfahrung bis zum Ende zu durchlaufen. Menschen mit diesem Kanal erreichen ihr Ziel oft dort, wo andere aufgeben, daher ist es für sie besonders wichtig, wozu sie Ja sagen.',
    },
    '30-41': {
      name: 'Erkennen',
      text: 'verbindet das Wurzelzentrum mit dem Solarplexus: Hier geht es um den Hunger nach neuen Erlebnissen und um starke Wünsche, hinter denen Träume stehen. Menschen mit diesem Kanal bringt eine Erfahrung meist mehr, wenn sie sich darauf einlassen, nachdem sich die Emotion gelegt hat, und nicht auf ihrem Höhepunkt.',
    },
    '32-54': {
      name: 'Transformation',
      text: 'verbindet das Wurzelzentrum mit dem Milzzentrum: Hier wirken Ehrgeiz und ein Gespür dafür, was dauerhaft Bestand hat. Menschen mit diesem Kanal streben meist danach, aufzusteigen und ihre Lage zu verändern, und sie kommen leichter voran, wenn andere ihre Bemühungen bemerken und unterstützen.',
    },
    '34-57': {
      name: 'Macht',
      text: 'verbindet das Sakralzentrum mit dem Milzzentrum: Kraft und Intuition wirken zusammen, im Hier und Jetzt. Menschen mit diesem Kanal reagieren oft auf eine Situation, bevor sie darüber nachdenken können, und diese Reaktion trifft meist ins Schwarze, wenn sie aus der sakralen Antwort kommt.',
    },
    '35-36': {
      name: 'Vergänglichkeit',
      text: 'verbindet den Solarplexus mit dem Kehlzentrum: Das ist der Drang nach neuen Eindrücken und nach Erfahrung um der Erfahrung willen. Menschen mit diesem Kanal möchten vieles ausprobieren, und erlebte Höhenflüge und Enttäuschungen werden mit der Zeit zu Weisheit, die sie weitergeben.',
    },
    '37-40': {
      name: 'Gemeinschaft',
      text: 'verbindet das Herzzentrum mit dem Solarplexus: Das ist ein Kanal der Absprachen – wer was für die gemeinsame Sache tut und was er dafür bekommt. Menschen mit diesem Kanal sind Loyalität und ein fairer Austausch wichtig, außerdem Zeit für sich, um Kraft zu sammeln.',
    },
    '39-55': {
      name: 'Emotionen freisetzen',
      text: 'verbindet das Wurzelzentrum mit dem Solarplexus: Die Stimmung wechselt hier stark und oft, und aus diesen Wechseln entsteht nicht selten Kreatives. Menschen mit diesem Kanal müssen nicht für jede Traurigkeit eine äußere Ursache suchen: Stimmungen können von selbst kommen und gehen.',
    },
    '42-53': {
      name: 'Reifung',
      text: 'verbindet das Wurzelzentrum mit dem Sakralzentrum: Das ist die Energie von Zyklen – beginnen, durchlaufen, abschließen. Menschen mit diesem Kanal ist es wichtig, Begonnenes zu Ende zu bringen, und eine ganz durchlebte Erfahrung wird für sie und andere zu einer Quelle von Reife.',
    },
    '47-64': {
      name: 'Abstraktion',
      text: 'verbindet das Kopfzentrum mit dem Ajna: Im Kopf kreisen Bilder und Erinnerungen, bis sich daraus ein Sinn ergibt. Menschen mit diesem Kanal kennen Verwirrung, die sich mit der Zeit von selbst in Klarheit verwandelt, und ihre Schlüsse aus dem Erlebten sind für andere oft wertvoll.',
    },
  },
  typesSection: {
    heading: 'Die fünf Typen im Human Design',
    lead: 'Der Typ hängt davon ab, welche Zentren definiert und wie sie miteinander verbunden sind. Kein Typ ist besser als ein anderer: Jeder hat seine eigene Strategie – einen Hinweis, wie man Dinge am besten beginnt und Entscheidungen trifft, um weniger Kraft an Widerstand zu verlieren.',
  },
  faqHeading: 'Fragen',
  faq: [
    {
      q: 'Wozu braucht man die genaue Geburtszeit?',
      a: 'Der Mond bewegt sich schnell und wechselt in etwa einem halben Tag ins benachbarte Tor. Mit dem Torwechsel können Kanäle entstehen oder wegfallen – dann ändern sich die definierten Zentren und manchmal auch Typ und Autorität. Das Profil hängt von den Linien der Sonne ab: Sie ist langsamer, doch nahe einer Liniengrenze ändern schon wenige Stunden das Profil. Ist die Uhrzeit nur ungefähr bekannt, berechnen Sie zwei oder drei Varianten: Was in allen gleich ist, darauf können Sie sich verlassen.',
    },
    {
      q: 'Mein Ort steht nicht in der Liste – was tun?',
      a: 'Wählen Sie die nächstgelegene größere Stadt in derselben Zeitzone, am besten aus derselben Region: Die Grenzen der Zeitzonen haben sich früher verschoben. Der Ort wird nur wegen Zeitzone und Sommerzeit im Geburtsjahr gebraucht: Damit wird die örtliche Geburtszeit in UTC umgerechnet. Koordinaten fließen nicht in die Berechnung ein, deshalb ergibt eine Nachbarstadt in derselben Zeitzone dasselbe Chart, und ein Fehler von einer Stunde bei der Zeitzone wirkt wie ein Fehler von einer Stunde bei der Geburtszeit.',
    },
    {
      q: 'Werden meine Daten gespeichert?',
      a: 'Nein. Das Chart wird direkt in Ihrem Browser berechnet: Datum, Uhrzeit und Ort der Geburt werden nicht an einen Server gesendet, und nach dem Neuladen der Seite ist das Formular leer. Wenn Sie auf „Mit Raya besprechen“ klicken, wartet ein Nachrichtenentwurf mit diesen Daten in Ihrem Browser, während Sie sich bei Linkeon anmelden, und wird gelöscht, sobald er im Nachrichtenfeld steht oder Sie sich abmelden. Raya sieht die Daten nur, wenn Sie ihr die Nachricht selbst senden.',
    },
    {
      q: 'Worin unterscheidet sich das von einer Deutung bei Raya?',
      a: 'Der Rechner ist kostenlos und funktioniert ohne Registrierung: Er erstellt das Chart und beschreibt, wie sich jeder Teil bei Menschen gewöhnlich zeigt. Raya deutet das Chart als Ganzes: wie die Teile zusammenhängen und was das in der Praxis bedeutet. Sie beantwortet Fragen und schlägt ein Experiment für 7 Tage vor, außerdem erklärt sie das Inkarnationskreuz und deutet die Charts von Menschen, die Ihnen nahestehen. Um mit Raya zu sprechen, melden Sie sich bei Linkeon an; bei der Registrierung erhalten Sie 25.000 Tokens geschenkt.',
    },
    {
      q: 'Warum zeigt eine andere Website etwas anderes?',
      a: 'Vergleichen Sie zuerst die Abweichung von UTC am Tag der Geburt – bei uns steht sie unter dem Feld „Geburtsort“. In derselben Stadt galten in verschiedenen Jahren unterschiedliche Zeitzonen und Sommerzeitregeln, und nicht jede Website berücksichtigt das; ein Fehler von einer Stunde verschiebt den Mond und mit ihm manchmal Kanäle und Typ. Ein weiterer Grund ist der Mondknoten: Wir verwenden den wahren, mit dem mittleren können die Knoten auf einer anderen Linie liegen, selten sogar in einem anderen Tor. Und einen Planeten direkt an einer Liniengrenze ordnen verschiedene Programme mitunter verschiedenen Seiten zu.',
    },
  ],
  disclaimer: 'Human Design ist ein Werkzeug der Selbsterkenntnis, keine Prognose und kein Ersatz für Arzt, Anwalt oder Finanzberater.',
  credits: 'Städte und Zeitzonen –',
  licenses: 'Lizenzen von Drittanbietern',
  message:
    'Hallo Raya! Meine Geburtsdaten: {date}, {time}, {city} ({offset}). Der Rechner zeigt: {type}, Profil {profile}, {authority}. Erklär mir, was das für mich bedeutet',
};

export default de;
