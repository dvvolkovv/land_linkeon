import type { AssistantPageText } from '../../types';

/**
 * Лиана — нумерология. Перевод pages/ru/liana.ts. Пример —
 * docs/assistant-pages/examples/liana.md: снята разметка (заголовки, жирный,
 * таблица квадрата Пифагора), маркеры списков «-» стали «—»; знаки ➕/➖ у
 * строк «Сила / уязвимость» — её собственные, оставлены как пришли.
 */
const liana: AssistantPageText = {
  title: 'Numerologie-Analyse nach Geburtsdatum online – Liana | Linkeon',
  description:
    'Liana – Numerologin online. Analysiert Ihr Geburtsdatum nach acht Schulen wie Xiucai, Pythagoras und BaZi: Themen, Stärken, Aktivierungsjahre und der nächste Zyklus.',
  h1: 'Numerologie-Analyse nach Geburtsdatum: Liana, Numerologin online',
  lead: 'Nennen Sie Name, Datum, Uhrzeit und Ort der Geburt – Ihre eigenen oder die eines nahestehenden Menschen. Liana berechnet die Zahlen und erklärt, was sie in acht Schulen der Numerologie bedeuten, jeweils zwei Schulen auf einmal.',
  card: 'Analyse des Geburtsdatums nach acht Schulen der Numerologie wie Xiucai, Pythagoras und BaZi: Stärken, Aktivierungsjahre, Zyklen.',
  cta: 'Mit Liana sprechen',
  situations: [
    'Sie möchten wissen, was die Zahlen Ihres eigenen Geburtsdatums sagen – statt einer allgemeinen Beschreibung aus dem Internet.',
    'Sie haben von Xiucai oder dem Pythagoras-Quadrat gehört und möchten Ihr Datum analysieren lassen.',
    'Sie sind neugierig, wie verschiedene Schulen der Numerologie dasselbe Datum lesen.',
    'Sie spüren, dass ein Lebensabschnitt zu Ende ist, und möchten sehen, welcher Zyklus beginnt.',
    'Sie möchten das Geburtsdatum Ihres Kindes oder Partners analysieren lassen.',
  ],
  example: {
    question: 'Machen Sie eine numerologische Analyse: Anna, 14.03.1990, 07:30, Kasan.',
    answer: `Person: Anna, geb. 14.03.1990, 07:30, Kasan.

1. Xiucai

Codes: Bewusstseinszahl 5 (Tag 14 → 1+4), Missionszahl 9 (1+4+0+3+1+9+9+0 = 27 → 9).

Hauptthemen und Bestimmung
— 5 – Freiheit, Bewegung, Kommunikation, schnelle Anpassung, Interesse an vielem zugleich.
— 9 – Mission des Dienens, der Mentorschaft, humanitärer und „großer“ Themen. Erfahrung wird zu Weisheit und an andere weitergegeben.
— Verbindung 5→9: Über vielfältige Erfahrungen, Veränderungen und Kontakte findet Anna in die Rolle einer Wegweiserin oder Lehrerin.

Stärke / Verletzlichkeit
➕ Charisma, Leichtigkeit im Kontakt, geistige Beweglichkeit, die Fähigkeit, Ideen zu verkaufen und zu inspirieren.
➖ Verzettelung, Ungeduld, Langeweile bei Routine, impulsive Entscheidungen. Bei der 9 kommt die Neigung hinzu, die Lasten anderer auf sich zu nehmen und andere zu „retten“.

Aktivierungsjahre
— Karriere, Start: 2018, 2027.
— Liebe, Familie: 2023, 2032.
— Geld: 2025, 2034.
— Transformation, Bilanz: 2017, 2026.

Abschlüsse: 2026 schließt den 9-jährigen Zyklus, der 2018 begann.

2. Klassische (pythagoreische) Schule

Lebenswegzahl: 27 → 9. Geburtstagszahl: 14 → 5.
…

Gipfel (Höhepunkte) des Lebenswegs
— Bis 2017 – 8: Entwicklung über materielle Aufgaben und Status.
— 2017–2026 – 6: Familie, Verantwortung, Fürsorge, Beziehungen.
— 2026–2035 – 5: Freiheit, Veränderungen, neue Bereiche, Mobilität.
— Ab 2035 – 4: Struktur, Stabilität, Fundament.

…

Weiter mit 3–4 (vedisch und kabbalistisch)?`,
  },
  can: [
    'Analysiert das Datum nach acht Schulen: Xiucai, pythagoreisch, vedisch, kabbalistisch, Tarot-Arkanologie, BaZi, Astronumerologie, „Finanzen und Verwirklichung“.',
    'Nennt in jeder Schule Hauptthemen und Bestimmung, Stärken und Verletzlichkeiten, Aktivierungsjahre in Liebe, Karriere und Geld sowie Abschlüsse von Zyklen.',
    'Liefert die Analyse in Etappen von je zwei Schulen und fragt, ob sie weitermachen soll.',
    'Fasst am Ende alles kurz zusammen: wer der Mensch laut seinem Code ist und welcher Zyklus in den nächsten zwei Jahren ansteht.',
    'Analysiert das Datum der Person, nach der Sie fragen – Ihr eigenes, das Ihres Kindes oder Partners – und verwechselt es nicht mit anderen.',
  ],
  cannot: [
    'Gibt keine Ratschläge und entscheidet nicht für Sie. Liana erklärt, was die Zahlen bedeuten – was Sie damit machen, entscheiden Sie.',
    'Keine Schicksalsprognose: Aktivierungsjahre sind eine numerologische Deutung, kein Versprechen, dass etwas eintritt.',
    'Ersetzt keinen Arzt, Anwalt oder Finanzberater. Geht es in der Analyse um Gesundheit oder Geld, ist das Numerologie – keine Diagnose und keine Finanzberatung.',
  ],
  faq: [
    {
      q: 'Was brauche ich für die Analyse?',
      a: 'Name, Datum, Uhrzeit und Ort der Geburt – wie im Beispiel oben. Diese Angaben wiederholt Liana am Anfang jeder Antwort, damit klar ist, wessen Analyse es ist.',
    },
    {
      q: 'Worin unterscheiden sich die Schulen?',
      a: 'Jede rechnet anders. Xiucai mit Bewusstseins- und Missionszahl, die pythagoreische Schule mit dem Pythagoras-Quadrat und der Lebenswegzahl, die kabbalistische mit den Schwingungen des Namens, BaZi mit dem Element der Persönlichkeit und dem Einfluss des Jahres.',
    },
    {
      q: 'Was sind Aktivierungsjahre?',
      a: 'Jahre, auf die laut Berechnung eines der Themen fällt: Liebe, Karriere, Geld oder Veränderungen. Bei Anna aus dem Beispiel sind Karriere und Start die Jahre 2018 und 2027.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem Numerologie-Rechner im Internet?',
      a: 'Ein solcher Rechner liefert Zahlen und allgemeine Beschreibungen. Liana analysiert Ihr Datum nach acht Schulen und führt am Ende alles in einem Resümee zusammen. Und die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle.',
    },
  ],
};

export default liana;
