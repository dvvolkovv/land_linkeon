import type { ValuesTexts } from '../types';

/**
 * Тест ценностей на английском. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-13-values-test-languages.md, «Правила переводов».
 */
const en: ValuesTexts = {
  title: "Free Schwartz values test online — your values map | Linkeon",
  description:
    "Free Schwartz values test based on Shalom Schwartz's model: 30 statements, about 5 minutes. See your circle of 10 values and your top values, then explore them with Olia.",
  h1: "Free online Schwartz values test",
  breadcrumb: "Values test",
  intro: [
    "Thirty short descriptions of different people. Rate how much each one is like you, and you'll see a circle of ten basic values: what comes first for you, what is furthest from you and where your main inner tensions lie.",
    "The test is inspired by the theory of basic values developed by the social psychologist Shalom Schwartz. Your answers stay on your device: everything is calculated right in your browser, and your answers aren't sent to a server.",
    "The result isn't a judgement or a diagnosis — it's a starting point for a conversation about yourself. You can continue it with Olia, the assistant who guides you through a values exploration.",
  ],
  start: {
    meta: "30 statements · about 5 minutes · your answers stay on your device",
    begin: "Start",
    resume: "Continue ({done} of {total})",
    restart: "Start again",
  },
  question: {
    prompt: "How much is this person like you?",
    progress: "{n} of {total}",
    back: "Back",
    scale: [
      "Not like me at all",
      "Not like me",
      "A little like me",
      "Somewhat like me",
      "Like me",
      "Very much like me",
    ],
  },
  statements: {
    selfDirection1: "This person cares about independence: going their own way, without instructions from above.",
    selfDirection2: "This person happily crafts, composes or invents something of their own — simply because it's interesting.",
    selfDirection3: "This person finds it important to think for themselves and reach their own conclusions.",
    stimulation1: "This person is quick to drop everything and go: an unfamiliar city, a new hobby, a spur-of-the-moment trip — it's all a joy.",
    stimulation2: "This person soon finds life bland without change and variety.",
    stimulation3: "This person is drawn to situations where the outcome isn't known in advance: bold ventures and risky challenges.",
    hedonism1: "This person wants plenty of pleasant things in life: good food, relaxation, little joys.",
    hedonism2: "This person readily indulges in nice things without looking for an excuse.",
    hedonism3: "This person appreciates simple pleasures: a warm bath, a favourite dish, an evening without a care in the world.",
    achievement1: "This person is keen to grow professionally: setting high goals and reaching them.",
    achievement2: "This person wants their skill to impress people who know the field.",
    achievement3: "This person strives to be among the best in their field.",
    power1: "This person finds it important to influence people and decide how shared money and resources are used.",
    power2: "This person cares about the kind of wealth that signals social standing.",
    power3: "This person values high status and authority — carrying weight in other people's eyes.",
    security1: "This person chooses caution: double-checking, playing it safe, not taking risks with their health.",
    security2: "This person finds it important to live in a country where the streets are safe and the laws work.",
    security3: "This person values stability: a secure job, savings for a rainy day, a predictable tomorrow.",
    conformity1: "This person sees rules as more than a formality: rules are there to be followed, like them or not.",
    conformity2: "This person shows restraint in public: not raising their voice, not letting a harsh word slip.",
    conformity3: "This person dresses and behaves the way that's expected in any given setting.",
    tradition1: "This person sees family customs — festive baking, stories about ancestors, dates to remember — as something that needs to be kept alive.",
    tradition2: "This person gives faith and its festivals an important place in life.",
    tradition3: "This person accepts fate calmly: whatever life brings has to be lived with dignity.",
    benevolence1: "This person comes straight to the rescue when something goes wrong for family or friends.",
    benevolence2: "This person is the one friends trust with their secrets — and the one who will never let them down.",
    benevolence3: "This person wants the people close to them to be happy and will spare no time or effort to make that happen.",
    universalism1: "This person feels for people hit by wars and disasters anywhere in the world and helps however they can.",
    universalism2: "This person tries to do less harm to nature: saving resources, not littering, thinking about the consequences.",
    universalism3: "This person wants a world with room for different views, cultures and ways of life.",
  },
  values: {
    selfDirection: {
      name: "Self-Direction",
      inMessage: "self-direction",
      line: "freedom to think, choose and create on your own terms",
      text: "Self-Direction is the need to think for yourself, choose your own path and create something of your own. People who rank it near the top feel hemmed in by rigid constraints and other people's instructions: it matters to them to understand why they are doing something and to put their own stamp on it.",
    },
    stimulation: {
      name: "Stimulation",
      inMessage: "stimulation",
      line: "novelty, excitement and change",
      text: "Stimulation is the pull towards novelty, excitement and change. When it is important to someone, they look for new places, pursuits and challenges, are quick to get enthusiastic and soon tire of routine. A calm, predictable life feels bland to them.",
    },
    hedonism: {
      name: "Hedonism",
      inMessage: "hedonism",
      line: "pleasure and joy in life",
      text: "Hedonism is the value of pleasure and enjoyment here and now. For those who hold it dear, life is not only about tasks and duty: good food, relaxation, beautiful things and pleasant company matter as much as work.",
    },
    achievement: {
      name: "Achievement",
      inMessage: "achievement",
      line: "success and recognition for your skills",
      text: "Achievement is the drive for success that others can see and recognise. People who rank this value near the top set high goals, compare themselves with the best in their field and appreciate it when their skills are noticed.",
    },
    power: {
      name: "Power",
      inMessage: "power",
      line: "status, influence and resources",
      text: "Power is the value of status, influence and resources. Those for whom it matters want to stay in control of the situation, make decisions and hold a position that carries weight. For them, money and authority are a way to influence what happens.",
    },
    security: {
      name: "Security",
      inMessage: "security",
      line: "stability, order and safety",
      text: "Security is the need for stability and safety — for yourself, your loved ones and society. When it ranks near the top, a person thinks ahead, values reliability and order, avoids unnecessary risk and builds a safety net.",
    },
    conformity: {
      name: "Conformity",
      inMessage: "conformity",
      line: "restraint and following the rules",
      text: "Conformity is restraint and following the rules accepted by those around you. People with this value try not to upset others, keep their word and stick to agreements and norms, even when they would rather do otherwise.",
    },
    tradition: {
      name: "Tradition",
      inMessage: "tradition",
      line: "respect for customs, faith and roots",
      text: "Tradition is respect for the customs, faith and roots of your family and culture. Those who hold it dear find their footing in what has been tried and tested over generations: festivals, rituals, modesty and the ability to accept life as it is.",
    },
    benevolence: {
      name: "Benevolence",
      inMessage: "benevolence",
      line: "care for loved ones and loyalty to them",
      text: "Benevolence is care for the people close to you: family, friends, colleagues. People who rank this value near the top are reliable and ready to help or compromise for the sake of a relationship; loyalty and trust matter more to them than personal gain.",
    },
    universalism: {
      name: "Universalism",
      inMessage: "universalism",
      line: "fairness for all and care for the world",
      text: "Universalism is concern for all people and for nature, not just for your own circle. Those for whom it matters value fairness, equality, tolerance of other views and treating the world with care.",
    },
  },
  higherOrder: {
    openness: "Openness to Change",
    selfEnhancement: "Self-Enhancement",
    conservation: "Conservation",
    selfTranscendence: "Care for Others",
  },
  axes: {
    change: {
      left: "You lean more towards openness to change — self-direction and novelty — than towards keeping things as they are.",
      right: "You lean more towards keeping things as they are — security, rules and traditions — than towards openness to change.",
      balance: "Openness to change and keeping things as they are carry equal weight for you: neither side clearly outweighs the other.",
    },
    focus: {
      left: "Caring for others — your loved ones and the world around you — matters more to you than personal success and influence.",
      right: "Personal success and influence matter more to you than caring for others and the world around you.",
      balance: "Caring for others and personal success are in balance for you.",
    },
  },
  axesInMessage: {
    change: {
      left: "I lean more towards change than towards keeping things as they are",
      right: "I lean more towards keeping things as they are than towards change",
      balance: "For me, change and keeping things as they are carry equal weight",
    },
    focus: {
      left: "caring for others matters more to me than personal success",
      right: "personal success matters more to me than caring for others",
      balance: "caring for others and personal success are in balance for me",
    },
  },
  result: {
    heading: "Your values circle",
    circleAlt: "Values circle",
    legend: "Value groups",
    topHeading: "Top values",
    bottomHeading: "Least important",
    axesHeading: "Main tensions",
    flatHeading: "No priorities stood out",
    flatText:
      "You rated almost every statement the same, so your top values can't be identified. Try taking the test again, comparing the descriptions with each other — or work out with Olia what really matters to you.",
    cta: "Talk it through with Olia",
    ctaNote: "A personal values review with Olia — you get 25,000 tokens when you sign up",
    allHeading: "All 10 values, in your order of importance",
    restart: "Take the test again",
    tiedWith: "Tied with: {names}",
    topHeadingOne: "Top value",
    restEqual: "The other values scored the same, so the least important one can't be identified.",
  },
  modelSection: {
    heading: "Schwartz's ten values",
    lead: "Schwartz described ten values found in different cultures all over the world. They are arranged in a circle: neighbouring values sit well together, while opposite ones pull in different directions — for example, the lure of the new and the wish to keep things as they are.",
  },
  faqHeading: "Questions about the test",
  faq: [
    {
      q: "How long does the test take?",
      a: "About five minutes: 30 statements, one answer to each on a six-point scale. While the tab is open, your answers are kept in it, so an accidental reload won't wipe your progress.",
    },
    {
      q: "Is this a scientific test?",
      a: "It is based on Shalom Schwartz's theory of basic values, a widely studied model of values in psychology. We wrote the statements ourselves, drawing on this theory: this isn't the official PVQ questionnaire or a clinical method, but a tool for self-discovery.",
    },
    {
      q: "Are my answers saved?",
      a: "No. The calculation happens in your browser; your answers aren't sent to a server and don't end up in analytics. They are kept only in this tab — so they aren't lost if the page reloads by accident.",
    },
    {
      q: "Why is the result a ranking of values rather than scores?",
      a: "According to Schwartz, what matters is not the ratings themselves but which values outweigh others. That's why the test takes your answering style into account: if you give high ratings to every statement, the circle will still show what matters more to you.",
    },
    {
      q: "What should I do with the result?",
      a: "Look at your top values and main tensions, and notice where your decisions, time and money match what matters to you and where they don't. You can explore this in depth with Olia — she guides you through a values exploration in conversation and puts together a personal values map.",
    },
  ],
  disclaimer:
    "A self-discovery test loosely based on Shalom Schwartz's theory of basic values. Not a clinical or official assessment.",
  tiedInMessage: "(tied with {names})",
  bottomInMessage: "{bottom} at the bottom",
  restEqualInMessage: "the rest all equal",
  message:
    "Hi Olia! Here's my Schwartz values test result: {top} at the top, {rest}. {axes}. Please help me understand what this means for me",
  messageFlat:
    "Hi Olia! No priorities stood out for me in the Schwartz values test: I rated almost everything the same. Please help me figure out what really matters to me",
};

export default en;
