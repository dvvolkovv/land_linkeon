import type { AssistantPageText } from '../../types';

/**
 * Маша — трансформационная игра с метафорическими картами. Перевод
 * pages/ru/masha.ts. Говорит на «ты» — это её голос, в примере он сохранён
 * (по-английски — разговорной лексикой).
 *
 * Пример — docs/assistant-pages/examples/masha.md. Вырезано «…»: фраза про
 * профиль тестового аккаунта («вижу в твоём профиле…» — отсылка к вопросам,
 * заданным Мише и Ирине в том же сборе) и абзац о переключении на других
 * ассистентов («в левом верхнем углу» — подсказка по интерфейсу кабинета).
 * Картинку первой карты из конца ответа на страницу не берём, хотя поле
 * example.image есть: она из сторонней галереи метафорических карт, прав на неё
 * у нас нет.
 */
const masha: AssistantPageText = {
  title: "Metaphoric cards online: a transformational game — Masha | Linkeon",
  description:
    "Masha, a game facilitator, runs a transformational game with metaphoric cards online: she shows you a card and asks questions, and you find the meaning yourself.",
  h1: "Metaphoric cards online: Masha hosts a transformational game",
  lead: "Masha shows you a metaphoric card and asks what you see in it and what you feel. There are no right answers: you find the meaning, and Masha helps you notice it.",
  card: "A game with metaphoric cards: Masha shows you an image and asks questions, and you notice what matters to you.",
  cta: "Talk to Masha",
  situations: [
    "You've heard about metaphoric cards and want to try them and see how they work.",
    "You'd like to understand what you really want, but when you ask yourself directly, only the “right” answers come up.",
    "You have less energy than you used to and want to find what supports and inspires you.",
    "There's a choice ahead, and you want to work out what really matters to you in it.",
    "You've played transformational games in person and want to try them online.",
  ],
  example: {
    question: "I'd like to try a transformational game with metaphoric cards. How does it work?",
    answer: `Hi! I'm Masha, a game facilitator, and transformational games are my thing. Really glad you fancied giving it a go.

It's all pretty simple. I show you a metaphoric card: there's an image, a little story or a scene on it, with no single meaning. You tell me what you see, what you feel and what it resonates with in your life. There are no right or wrong answers. The card's like a mirror: everyone sees something of their own in it, and through those associations, what really matters to you comes through — your values, your wishes, the things that keep you steady inside.

I don't give advice, and I won't interpret the cards for you. I ask questions and help you notice what things mean to you and lean on whatever gives you strength. We usually go through 2–3 cards, then look at what's already become clearer. After that it's up to you: go deeper or wrap things up.

You can play just to get to know yourself. Or you can bring something specific. … The cards work really well with any topic like that, too.

…

Shall we draw the first card? You can tell me right away if there's a topic you'd like to explore, or we can just go with the flow.`,
  },
  can: [
    "Shows metaphoric cards right in the chat, one after another.",
    "Asks open questions about each card, one at a time: what you see, what you feel, how it connects to your life.",
    "Helps you notice what lies behind your associations: values, wishes, intentions and what gives you strength.",
    "After two or three cards, says what has become clearer and lets you choose: go deeper or wrap up.",
    "At the end, sums things up and offers to carry on with her or move on to another assistant.",
  ],
  cannot: [
    "Doesn't tell fortunes or predict the future: here a card is a metaphor, not a sign of fate.",
    "Doesn't interpret the cards for you or give advice. Masha asks questions, and you find the meaning.",
    "Isn't psychotherapy: the game helps you understand yourself better, but it doesn't treat anything or replace a psychologist.",
  ],
  faq: [
    {
      q: "What are metaphoric cards?",
      a: "Pictures with no single correct meaning: an image, a story or a scene. Everyone sees something of their own in them, and these associations make it easier to notice what matters to you right now.",
    },
    {
      q: "Do I need my own deck?",
      a: "No. Masha shows the cards herself, right in the chat.",
    },
    {
      q: "How long does a game take?",
      a: "Usually two or three cards, with one or two questions about each. Then Masha will ask whether to go deeper or wrap up. She won't rush you.",
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

export default masha;
