import type { AssistantPageText } from '../../types';

/**
 * Миша — коучинг по стандартам ICF. Перевод pages/ru/misha.ts.
 *
 * Пример разговора — целиком, без правок: docs/assistant-pages/examples/misha.md.
 * Номера 112 в переводе нет — местная экстренная служба (бриф переводчика, п. 8).
 */
const misha: AssistantPageText = {
  title: "Online coaching session to ICF standards — Misha | Linkeon",
  description:
    "Misha is an AI coach working to ICF standards. No advice, no judgement: questions that help you see what's stopping you and choose a first step. 25,000 tokens when you sign up.",
  h1: "Online coaching session: Misha, a coach working to ICF standards",
  lead: "A conversation you've been putting off for three months, or a choice you keep going round in circles over. Misha won't tell you what's right: he asks questions, and you find the answer and the first step yourself.",
  card: "A coaching session to ICF standards: questions instead of advice, and at the end, a step you've chosen yourself.",
  cta: "Talk to Misha",
  situations: [
    "An important conversation keeps getting put off week after week, and you can't tell what's stopping you.",
    "You wrote down your goal for the year back in January and still haven't made a start on it.",
    "You've been offered a promotion but aren't excited about it, and you're not sure you really want it.",
    "You have two options and keep going back and forth between them, choosing all over again each time.",
    "You've had your fill of advice; now you'd like to work out what you actually want.",
  ],
  example: {
    question:
      "I've been putting off an important conversation with my business partner for three months. Help me understand what's stopping me.",
    answer: `Hello! I'm Misha, a coach. It's good that you've decided to look into this. When a conversation has been put off for three months, there's almost always something behind it, and that's worth understanding.

A quick word on how I work. A coaching session is a conversation in which you find the answers yourself. I don't give advice, I don't judge and I don't tell you what's right. I ask questions that help you see the situation more broadly and notice what's slipping past you for now. People usually come out of a session with clarity and a concrete next step that they've chosen themselves.

Here you can speak honestly, without rushing, at your own pace.

Before we start, what should I call you?`,
  },
  can: [
    "At the start, explains how a coaching session works and what to expect from it.",
    "Helps you agree on a topic and an outcome: what you want to talk about and what you want to leave with.",
    "Asks one open question at a time and goes at your pace. If the conversation turns to feelings, he makes room for them.",
    "Helps you see what's keeping you stuck, what options you have and which of your strengths you can lean on.",
    "At the end, helps you choose a first step and work out how you'll know you've made progress.",
  ],
  cannot: [
    "Doesn't give advice, lists or ready-made solutions, and doesn't judge. Misha works only with what you bring.",
    "Isn't a psychologist or a psychiatrist: coaching isn't psychotherapy. If the conversation touches on trauma, depression or a threat to yourself or others, Misha will suggest seeing a specialist. If someone's life is in danger, call your local emergency number.",
  ],
  faq: [
    {
      q: "How does a session go?",
      a: "First, Misha will ask what you'd like to talk about and what a good outcome would be for you. Then come questions, one at a time: what matters most here, what's holding you back, what options you see. At the end, a step you choose yourself and a short wrap-up: which thoughts you're taking away with you.",
    },
    {
      q: "Is Misha a certified coach?",
      a: "No, Misha is an AI assistant. He runs the session to the standards of the ICF, the International Coaching Federation: he doesn't advise or judge, asks open questions and follows your topic.",
    },
    {
      q: "What topics can I bring?",
      a: "Any topic where the decision is yours: work, change, a goal that won't budge, a conversation you keep putting off. You choose the topic, and Misha follows it rather than slipping in one of his own.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "Who will see my chats?",
      a: "Linkeon assistants share one profile: tell one, and they all know. We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default misha;
