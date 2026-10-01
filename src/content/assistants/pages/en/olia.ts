import type { AssistantPageText } from '../../types';

/**
 * Оля — исследование ценностей. Перевод pages/ru/olia.ts. Одобренный образец:
 * docs/assistant-pages/samples-ru.md.
 *
 * Правки владельца применены: Leadership Development Profile назван один раз (в
 * FAQ) и с пометкой «по мотивам, не официальный тест»; в «Что умеет» — просто
 * «логика действий», без названия методики. Пункт о помощи детям в «Чего не
 * делает» оставлен, как в образце, но без российского номера.
 *
 * В переводе российских номеров нет: местная линия кризисной помощи, местная
 * экстренная служба, детская линия помощи своей страны (бриф переводчика, п. 8).
 */
const olia: AssistantPageText = {
  title: "Personal values map and Spiral Dynamics online — Olia | Linkeon",
  description:
    "Olia guides you through a values exploration: a favourite hero, time, money, five unfinished sentences, Spiral Dynamics colours — and, at the end, your personal values map.",
  h1: "Values map and Spiral Dynamics: an exploration guided by Olia",
  lead: "Olia asks questions one at a time and notices what lies behind your answers. At the end, she puts together a values map: what drives you, what your action logic is and where you can grow.",
  card: "A conversation in five steps — from a favourite hero to the colours of Spiral Dynamics. At the end, a personal values map.",
  cta: "Talk to Olia",
  situations: [
    "Everything seems right — the job, the plans, the people around you — but you can't tell which of it is yours and which is other people's expectations.",
    "There's a choice ahead — changing careers, moving, starting your own business — and you want to base it on what matters to you.",
    "You notice that you talk about one thing but spend your time and money on another.",
    "You've read about Spiral Dynamics and want to know which of its levels are closest to you.",
    "You manage people and want to understand what you rely on when you make decisions.",
  ],
  example: {
    question: "I want to understand what my values really are. How does your exploration work?",
    answer: `Hi! I'm Olia. I'm glad you want to get to grips with your values. It's good, and very personal, work.

How it works. This isn't a test with right answers, it's a calm conversation. You look at yourself, and I help you notice what lies behind your words. We'll go through a few steps, one question at a time:

1. Hero. We'll talk about a character you feel close to and what you recognise in them.
2. Time. We'll look at what you choose to spend your free time on.
3. Money. We'll think about what you spend money on beyond the essentials and what it gives you.
4. Five unfinished sentences. You'll complete them in whatever way feels right.
5. Colours. You'll choose which ways of living feel closest to you right now.

At the end, I'll bring it all together into your personal values map. You'll see what drives you, what your action logic is and where you can grow next.

Answer however you like: briefly or in detail. There's no way to get this wrong.

Let's begin. Think of your favourite hero, a famous person or a character from a book, a film or a fairy tale. Who is it, and what draws you to them?`,
  },
  can: [
    "Guides the exploration step by step: a favourite hero, free time, spending beyond the essentials, five unfinished sentences, the colours of Spiral Dynamics.",
    "Asks one question at a time and follows up: what you recognise in the hero, why that in particular matters to you.",
    "Reflects back the values she hears in your answers — without judgement.",
    "At the end, puts together a values map: your leading values, action logic, value range on the Spiral Dynamics scale and your next step in development.",
  ],
  cannot: [
    "Isn't psychotherapy: Olia doesn't diagnose or treat.",
    "Isn't an emergency service. If things are very hard right now, call your local crisis line. If someone's life is in danger, call your local emergency number. Children and teenagers can call a children's helpline in their country.",
  ],
  faq: [
    {
      q: "What is Spiral Dynamics?",
      a: "A model by Don Beck and Chris Cowan in which ways of living are marked by colours — from beige (survival) to turquoise (unity). Olia will ask you to pick the two colours closest to you now and to name the ones you've outgrown or are only just discovering.",
    },
    {
      q: "What does “action logic” mean?",
      a: "It's a concept from adult development theory: how a person makes decisions and makes sense of what's happening. Olia's conversation is loosely based on the Leadership Development Profile — it isn't the official assessment. For example, the Expert action logic is about being correct and following rules, Achiever is about results, and Strategist is about systems and influence.",
    },
    {
      q: "How long does the exploration take?",
      a: "Five steps, one question at a time. You can answer briefly or in detail — that's what determines how long the conversation takes.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "Who will see my answers?",
      a: "Linkeon assistants share one profile: tell one, and they all know. We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default olia;
