import type { ValuesTexts } from '../types';

/**
 * Тест ценностей на немецком. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-13-values-test-languages.md, «Правила переводов».
 */
const de: ValuesTexts = {
  title: 'Schwartz-Wertetest online kostenlos – Ihre Wertekarte | Linkeon',
  description:
    'Kostenloser Wertetest nach Shalom Schwartz: 30 Aussagen, etwa 5 Minuten. Ein Kreis aus 10 Grundwerten, Ihre wichtigsten Werte und die Auswertung im Gespräch mit Olja.',
  h1: 'Schwartz-Wertetest online – kostenlos',
  breadcrumb: 'Wertetest',
  intro: [
    'Dreißig kurze Beschreibungen verschiedener Menschen. Geben Sie jeweils an, wie sehr Ihnen die beschriebene Person ähnelt – und Sie sehen einen Kreis aus zehn Grundwerten: was für Sie an erster Stelle steht, was Ihnen am fernsten liegt und welche inneren Spannungen bei Ihnen zentral sind.',
    'Der Test lehnt sich an die Theorie der Grundwerte des Sozialpsychologen Shalom Schwartz an. Ihre Antworten bleiben auf Ihrem Gerät: Die Berechnung läuft direkt im Browser, die Antworten werden nicht an einen Server gesendet.',
    'Das Ergebnis ist keine Bewertung und keine Diagnose, sondern ein Ausgangspunkt für ein Gespräch über sich selbst. Fortsetzen können Sie es mit Olja – der Assistentin, die durch die Werte-Erkundung führt.',
  ],
  start: {
    meta: '30 Aussagen · etwa 5 Minuten · Ihre Antworten bleiben auf Ihrem Gerät',
    begin: 'Starten',
    resume: 'Fortsetzen ({done} von {total})',
    restart: 'Neu beginnen',
  },
  question: {
    prompt: 'Wie sehr ähnelt Ihnen diese Person?',
    progress: '{n} von {total}',
    back: 'Zurück',
    scale: [
      'Ähnelt mir gar nicht',
      'Ähnelt mir nicht',
      'Ähnelt mir ein wenig',
      'Ähnelt mir zum Teil',
      'Ähnelt mir',
      'Ähnelt mir sehr',
    ],
  },
  statements: {
    selfDirection1:
      'Dieser Person ist es wichtig, den Weg nach dem eigenen Kompass zu wählen, nicht nach Vorgaben von oben.',
    selfDirection2: 'Diese Person bastelt, schreibt oder erfindet gern etwas Eigenes – einfach aus Neugier.',
    selfDirection3:
      'Diese Person legt Wert darauf, die Dinge mit dem eigenen Kopf zu durchdenken und daraus eigene Schlüsse zu ziehen.',
    stimulation1:
      'Diese Person ist schnell zum Aufbruch bereit: eine fremde Stadt, ein neues Hobby, eine spontane Reise – immer gern.',
    stimulation2: 'Dieser Person wird ein Leben ohne Veränderung und Abwechslung schnell fade.',
    stimulation3:
      'Diese Person zieht es dorthin, wo der Ausgang ungewiss ist: zu kühnen Vorhaben und riskanten Herausforderungen.',
    hedonism1:
      'Dieser Person ist es wichtig, dass es im Leben viel Angenehmes gibt: gutes Essen, Erholung, kleine Freuden.',
    hedonism2: 'Diese Person gönnt sich ohne Weiteres etwas Schönes und braucht dafür keinen Anlass.',
    hedonism3: 'Diese Person schätzt einfache Genüsse: ein warmes Bad, das Lieblingsessen, einen Abend ganz ohne Sorgen.',
    achievement1:
      'Dieser Person ist es wichtig, im eigenen Fach zu wachsen: sich hohe Ziele zu setzen und sie zu erreichen.',
    achievement2: 'Diese Person legt Wert darauf, vor Kennern mit dem eigenen Können zu glänzen.',
    achievement3: 'Diese Person strebt danach, im eigenen Fach zu den Besten zu gehören.',
    power1:
      'Diese Person legt Wert darauf, Menschen zu beeinflussen und über gemeinsame Gelder und Ressourcen zu entscheiden.',
    power2: 'Diese Person legt Wert auf Wohlstand, an dem man die Stellung in der Gesellschaft erkennt.',
    power3: 'Dieser Person sind hoher Status und Autorität wichtig – in den Augen anderer etwas zu gelten.',
    security1:
      'Diese Person setzt auf Vorsicht: lieber einmal zu viel prüfen, sich absichern, die Gesundheit nicht riskieren.',
    security2:
      'Dieser Person ist es wichtig, in einem Land zu leben, in dem man sich auf der Straße sicher fühlt und die Gesetze greifen.',
    security3:
      'Dieser Person ist Stabilität wichtig: ein sicherer Arbeitsplatz, Rücklagen für schlechte Zeiten, eine planbare Zukunft.',
    conformity1:
      'Diese Person sieht Regeln nicht als Formsache: Man hält sich daran, ob es einem passt oder nicht.',
    conformity2: 'Diese Person beherrscht sich vor anderen, wird nicht laut und erlaubt sich keine scharfen Worte.',
    conformity3: 'Diese Person kleidet und benimmt sich so, wie man es in der jeweiligen Umgebung erwartet.',
    tradition1:
      'Diese Person findet, dass Familienbräuche bewahrt werden müssen: Festtagsgebäck, Geschichten über die Vorfahren, Jahrestage.',
    tradition2: 'Diese Person räumt dem Glauben und den religiösen Feiertagen einen wichtigen Platz im Leben ein.',
    tradition3:
      'Diese Person nimmt das eigene Schicksal gelassen an: Was einem beschieden ist, gilt es mit Würde zu tragen.',
    benevolence1: 'Diese Person kommt sofort zu Hilfe, wenn nahestehenden Menschen etwas passiert ist.',
    benevolence2:
      'Dieser Person vertrauen Freunde Geheimnisse an – in der Gewissheit, nie im Stich gelassen zu werden.',
    benevolence3:
      'Dieser Person ist es wichtig, dass es nahestehenden Menschen gut geht – dafür ist weder Zeit noch Mühe zu schade.',
    universalism1:
      'Diese Person sorgt sich um Menschen, die irgendwo auf der Welt unter Kriegen und Katastrophen leiden, und hilft, so gut es geht.',
    universalism2:
      'Diese Person versucht, der Natur möglichst wenig zu schaden: Ressourcen schonen, keinen Müll hinterlassen, an die Folgen denken.',
    universalism3:
      'Diese Person legt Wert darauf, dass es in der Welt Platz für verschiedene Ansichten, Kulturen und Lebensweisen gibt.',
  },
  values: {
    selfDirection: {
      name: 'Selbstbestimmung',
      inMessage: 'Selbstbestimmung',
      line: 'Freiheit, selbst zu denken, zu wählen und zu gestalten',
      text: 'Selbstbestimmung ist das Bedürfnis, selbst zu denken, den eigenen Weg zu wählen und Eigenes zu schaffen. Menschen, bei denen sie weit oben steht, fühlen sich durch starre Vorgaben und fremde Anweisungen eingeengt; sie wollen verstehen, wozu sie etwas tun, und ihrer Arbeit die eigene Handschrift geben.',
    },
    stimulation: {
      name: 'Stimulation',
      inMessage: 'Stimulation',
      line: 'Neues, Nervenkitzel und Veränderung',
      text: 'Stimulation ist der Drang nach Neuem, Nervenkitzel und Veränderung. Ist sie wichtig, sucht man neue Orte, Beschäftigungen und Aufgaben, lässt sich leicht begeistern und hat Routine schnell satt. Ein ruhiges, vorhersehbares Leben wirkt dann fade.',
    },
    hedonism: {
      name: 'Hedonismus',
      inMessage: 'Hedonismus',
      line: 'Genuss und Freude am Leben',
      text: 'Hedonismus steht für Genuss und Freude im Hier und Jetzt. Für Menschen, denen er wichtig ist, besteht das Leben nicht nur aus Aufgaben und Pflichten: Gutes Essen, Erholung, schöne Dinge und angenehme Gesellschaft zählen nicht weniger als die Arbeit.',
    },
    achievement: {
      name: 'Leistung',
      inMessage: 'Leistung',
      line: 'Erfolg und Anerkennung für das eigene Können',
      text: 'Leistung ist das Streben nach Erfolg, den andere sehen und anerkennen. Menschen, bei denen dieser Wert weit oben steht, setzen sich hohe Ziele, messen sich an den Besten ihres Fachs und schätzen es, wenn ihr Können bemerkt wird.',
    },
    power: {
      name: 'Macht',
      inMessage: 'Macht',
      line: 'Status, Einfluss und Ressourcen',
      text: 'Macht steht für Status, Einfluss und Ressourcen. Menschen, denen sie wichtig ist, wollen die Lage im Griff haben, Entscheidungen treffen und eine Stellung einnehmen, die Gewicht hat. Geld und Autorität sind für sie ein Mittel, das Geschehen zu beeinflussen.',
    },
    security: {
      name: 'Sicherheit',
      inMessage: 'Sicherheit',
      line: 'Stabilität, Ordnung und Schutz',
      text: 'Sicherheit ist das Bedürfnis nach Stabilität und Schutz für sich selbst, die Nahestehenden und die Gesellschaft. Steht sie weit oben, denkt man voraus, schätzt Verlässlichkeit und Ordnung, meidet unnötige Risiken und legt sich Reserven an.',
    },
    conformity: {
      name: 'Konformität',
      inMessage: 'Konformität',
      line: 'Zurückhaltung und das Befolgen von Regeln',
      text: 'Konformität bedeutet Zurückhaltung und das Befolgen der Regeln, die im eigenen Umfeld gelten. Menschen mit diesem Wert achten darauf, niemandem zu nahe zu treten, stehen zu ihrem Wort und halten sich an Absprachen und Normen, auch wenn sie lieber anders handeln würden.',
    },
    tradition: {
      name: 'Tradition',
      inMessage: 'Tradition',
      line: 'Achtung vor Bräuchen, Glauben und Wurzeln',
      text: 'Tradition ist die Achtung vor Bräuchen, Glauben und Wurzeln, die in Familie und Kultur gepflegt werden. Menschen, denen sie wichtig ist, finden Halt im über Generationen Bewährten: in Festen, Ritualen, Bescheidenheit und der Fähigkeit, das Leben so anzunehmen, wie es ist.',
    },
    benevolence: {
      name: 'Wohlwollen',
      inMessage: 'Wohlwollen',
      line: 'Fürsorge und Treue gegenüber Nahestehenden',
      text: 'Wohlwollen ist die Fürsorge für die Menschen im eigenen Umfeld: Familie, Freunde, Kollegen. Menschen, bei denen dieser Wert weit oben steht, sind verlässlich, helfen gern und geben der Beziehung zuliebe auch nach; Treue und Vertrauen zählen für sie mehr als der eigene Vorteil.',
    },
    universalism: {
      name: 'Universalismus',
      inMessage: 'Universalismus',
      line: 'Gerechtigkeit für alle und Sorge um die Welt',
      text: 'Universalismus ist die Sorge um alle Menschen und um die Natur, nicht nur um die eigenen Leute. Wem er wichtig ist, dem liegen Gerechtigkeit, Gleichheit, Toleranz gegenüber anderen Ansichten und ein schonender Umgang mit der Welt am Herzen.',
    },
  },
  higherOrder: {
    openness: 'Offenheit für Wandel',
    selfEnhancement: 'Selbststärkung',
    conservation: 'Bewahrung',
    selfTranscendence: 'Selbsttranszendenz',
  },
  axes: {
    change: {
      left: 'Ihnen liegt die Offenheit für Wandel – Selbstbestimmung und Neues – näher als die Bewahrung der gewohnten Ordnung.',
      right: 'Ihnen liegt die Bewahrung des Gewohnten – Sicherheit, Regeln und Traditionen – näher als die Offenheit für Wandel.',
      balance:
        'Offenheit für Wandel und Bewahrung des Gewohnten halten sich bei Ihnen die Waage: Keine Seite überwiegt deutlich.',
    },
    focus: {
      left: 'Die Sorge um andere – um Nahestehende und die Welt ringsum – ist Ihnen wichtiger als persönlicher Erfolg und Einfluss.',
      right: 'Persönlicher Erfolg und Einfluss sind Ihnen wichtiger als die Sorge um andere und um die Welt ringsum.',
      balance: 'Die Sorge um andere und persönlicher Erfolg sind Ihnen gleich wichtig.',
    },
  },
  axesInMessage: {
    change: {
      left: 'Mir liegt Wandel näher als das Bewahren des Gewohnten',
      right: 'Mir liegt das Bewahren des Gewohnten näher als Wandel',
      balance: 'Wandel und das Bewahren des Gewohnten halten sich bei mir die Waage',
    },
    focus: {
      left: 'die Sorge um andere ist mir wichtiger als persönlicher Erfolg',
      right: 'persönlicher Erfolg ist mir wichtiger als die Sorge um andere',
      balance: 'die Sorge um andere und persönlicher Erfolg sind mir gleich wichtig',
    },
  },
  result: {
    heading: 'Ihr Wertekreis',
    circleAlt: 'Wertekreis',
    legend: 'Wertegruppen',
    topHeading: 'Wichtigste Werte',
    bottomHeading: 'Am wenigsten wichtig',
    axesHeading: 'Zentrale Spannungen',
    flatHeading: 'Keine Prioritäten erkennbar',
    flatText:
      'Sie haben fast alle Aussagen gleich bewertet, deshalb lässt sich nicht bestimmen, welche Werte bei Ihnen an erster Stelle stehen. Machen Sie den Test noch einmal und vergleichen Sie dabei die Beschreibungen miteinander – oder finden Sie mit Olja heraus, was Ihnen wirklich wichtig ist.',
    cta: 'Mit Olja besprechen',
    ctaNote: 'Persönliche Werte-Auswertung mit Olja – bei der Registrierung 25.000 Tokens geschenkt',
    allHeading: 'Alle 10 Werte – in Ihrer Reihenfolge',
    restart: 'Test wiederholen',
    tiedWith: 'Mit gleichem Ergebnis: {names}',
    topHeadingOne: 'Wichtigster Wert',
    restEqual:
      'Die übrigen Werte liegen gleichauf, deshalb lässt sich nicht sagen, welcher am wenigsten wichtig ist.',
  },
  modelSection: {
    heading: 'Zehn Werte nach Schwartz',
    lead: 'Schwartz beschrieb zehn Werte, die in Kulturen auf der ganzen Welt vorkommen. Angeordnet sind sie im Kreis: Benachbarte vertragen sich gut, gegenüberliegende ziehen in verschiedene Richtungen – etwa der Drang nach Neuem und der Wunsch, das Gewohnte zu bewahren.',
  },
  faqHeading: 'Fragen zum Test',
  faq: [
    {
      q: 'Wie lange dauert der Test?',
      a: 'Etwa fünf Minuten: 30 Aussagen, zu jeder eine Antwort auf einer Skala mit sechs Stufen. Solange der Tab geöffnet ist, bleiben die Antworten darin gespeichert – ein versehentliches Neuladen setzt den Fortschritt also nicht zurück.',
    },
    {
      q: 'Ist das ein wissenschaftlicher Test?',
      a: 'Grundlage ist die Theorie der Grundwerte von Shalom Schwartz, eines der vielfach untersuchten Wertemodelle in der Psychologie. Die Aussagen haben wir selbst in Anlehnung an diese Theorie geschrieben: Das ist weder der offizielle Fragebogen PVQ noch ein klinisches Verfahren, sondern ein Werkzeug zur Selbsterkenntnis.',
    },
    {
      q: 'Werden meine Antworten gespeichert?',
      a: 'Nein. Die Berechnung läuft im Browser, die Antworten gehen nicht an einen Server und fließen in keine Webanalyse ein. Sie bleiben nur in diesem Tab – damit sie bei einem versehentlichen Neuladen nicht verloren gehen.',
    },
    {
      q: 'Warum ist das Ergebnis eine Rangfolge der Werte und keine Punktzahl?',
      a: 'Nach Schwartz kommt es nicht auf die Bewertungen an sich an, sondern darauf, welche Werte schwerer wiegen als andere. Deshalb berücksichtigt der Test Ihre Art zu antworten: Wenn Sie alle Aussagen hoch bewerten, zeigt der Kreis trotzdem, was davon wichtiger ist.',
    },
    {
      q: 'Was fange ich mit dem Ergebnis an?',
      a: 'Sehen Sie sich Ihre wichtigsten Werte und die zentralen Spannungen an: Wo passen Ihre Entscheidungen und der Umgang mit Zeit und Geld zu dem, was Ihnen wichtig ist, und wo nicht? Ausführlich besprechen können Sie das mit Olja – sie führt im Gespräch durch die Werte-Erkundung und stellt eine persönliche Wertekarte zusammen.',
    },
  ],
  disclaimer:
    'Ein Test zur Selbsterkenntnis in Anlehnung an die Theorie der Grundwerte von Shalom Schwartz. Kein klinisches und kein offizielles Verfahren.',
  tiedInMessage: '(mit gleichem Ergebnis: {names})',
  bottomInMessage: 'an letzter Stelle {bottom}',
  restEqualInMessage: 'alle anderen gleichauf',
  message:
    'Hallo Olja! Mein Ergebnis im Wertetest nach Schwartz: an erster Stelle {top}, {rest}. {axes}. Hilf mir zu verstehen, was das für mich bedeutet',
  messageFlat:
    'Hallo Olja! Im Wertetest nach Schwartz haben sich bei mir keine Prioritäten gezeigt: Ich habe fast alles gleich bewertet. Hilf mir herauszufinden, was mir wirklich wichtig ist',
};

export default de;
