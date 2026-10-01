import type { AssistantPageText } from '../../types';

/**
 * Полина — тренер по образу жизни: сон, питание, движение, восстановление.
 * Перевод pages/ru/polina.ts. Не врач — так сказано в её промпте. 112 в русском
 * тексте сверен в образце Оли (docs/assistant-pages/samples-ru.md, МЧС
 * «Система-112»); в переводе номера нет — местная экстренная служба (бриф
 * переводчика, п. 8).
 *
 * Пример — docs/assistant-pages/examples/polina.md, целиком; снят только жирный.
 */
const polina: AssistantPageText = {
  title: "How to fix your sleep and routine: lifestyle coach — Polina | Linkeon",
  description:
    "Polina is a lifestyle coach. She helps you sort out sleep, food and movement to fit a busy week: one small change at a time, with no diets and no gym.",
  h1: "How to fix your sleep and routine: Polina, lifestyle coach",
  lead: "Sleep, food, movement and rest, built around an ordinary busy week rather than a perfect schedule. Polina suggests one small change and, straight away, a version of it for a bad day.",
  card: "Sleep, food, movement and rest around a busy week. One small change at a time — and a version of it for a bad day.",
  cta: "Talk to Polina",
  situations: [
    "You go to bed after midnight, get up at seven, and by lunchtime you've run out of energy.",
    "During the day you eat on the go, and in the evening, whatever you can find in the fridge.",
    "You want to move more, but you have neither the time nor the energy for the gym.",
    "Every Monday you start a new life, and by Thursday there's nothing left of it.",
    "A deadline, a house move or a loved one's illness — and your usual routine has fallen apart.",
  ],
  example: {
    question:
      "I go to bed at one in the morning, get up at seven and feel shattered all day. Where do I start?",
    answer: `It looks like you're simply not getting enough sleep: from one to seven in the morning is about six hours. For many people that's not enough, and feeling shattered by lunchtime bears that out. Let's start with one change.

Go to bed 15 minutes earlier, at 00:45. Keep the alarm at seven. We don't touch the wake-up time: a steady morning holds the whole routine together. We only move bedtime. Once a week has gone smoothly, you'll move it another 15 minutes.

To make this work, you need a “time to wind down” signal. Set an alarm for 00:30 labelled “lights out”. When it goes off, dim the lights and put the laptop away. You can keep your phone, but only in bed.

If it's a bad day (you stayed late, ran out of time, want some time “just for yourself”), simply go to bed at 00:45, even if you haven't finished everything. You don't need to aim for the best result. If you slip, there's no catching up in the morning: you wake up at the usual time.

How to tell it's working. After a week, see whether getting up has become easier at least every other day, and whether the afternoons feel less heavy. If there's no difference at all, we'll keep looking.

Tonight, set your “lights out” alarm for 00:30.

What usually keeps you up until one: chores, work, or is it the only time you have for yourself?`,
  },
  can: [
    "Sleep: routine, falling asleep, waking too early, shift work, recovering from lack of sleep.",
    "Eating as a routine, not a diet: regular meals, what's on your plate, snacks, water, eating on the go.",
    "Movement without a gym: the smallest dose that works, and getting back into it after a long break.",
    "Energy: tiredness by midday, the evening “too tired for anything”, keeping a routine through hard times.",
    "Suggests one change, not a list, plus a sign that will show you after a week whether it's working.",
    "Goes through a training plan or recommendations you send as a file, without contradicting the specialist you're seeing.",
  ],
  cannot: [
    "Isn't a doctor and will say so herself: doesn't diagnose, doesn't prescribe or stop medication, doesn't interpret test results.",
    "Doesn't give recommendations in pregnancy or for eating disorders, diabetes, or heart, kidney or digestive conditions — she'll explain why a doctor is needed here.",
    "Doesn't discuss routines if there are warning signs: chest pain, fainting, unexplained weight loss, blood, months of insomnia. With these, see a doctor straight away, and if someone's life is in danger, call your local emergency number.",
    "Doesn't recommend dietary or sports supplements.",
  ],
  faq: [
    {
      q: "Why one change and not a plan for the month?",
      a: "A habit that runs on willpower rarely lasts a month. The one that works is the one that fits into a bad day. If a step falls through, Polina doesn't shame you; she works out what exactly didn't work.",
    },
    {
      q: "Where will Polina start?",
      a: "With whatever gets in your way most, and with your constraints: when you get up and go to bed, how much time you have, what you've already tried. For her, sleep is the foundation: until it's sorted, talking about food and exercise is almost pointless.",
    },
    {
      q: "Will Polina help me lose weight?",
      a: "She doesn't promise results, a target weight or a timeframe, and she doesn't set calorie limits. Her job is a routine that will survive a busy week. By her rules, health isn't measured by weight.",
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

export default polina;
