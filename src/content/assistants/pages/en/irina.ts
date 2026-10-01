import type { AssistantPageText } from '../../types';

/**
 * Ирина — карьера самого человека. Перевод pages/ru/irina.ts.
 *
 * Не рекрутер: по инструкции вакансий не подбирает и людей на работу не ищет.
 * Найм, вакансии и вопросы к собеседованию на этой странице не обещать.
 */
const irina: AssistantPageText = {
  title: "Career counsellor online: how to change careers — Irina | Linkeon",
  description:
    "Irina is an online career counsellor, one of Linkeon's AI assistants. Want to change careers? She helps you work out where to go next: your strengths, motives and values at work.",
  h1: "Irina — online career counsellor: changing careers and career guidance for adults",
  lead: "You want to leave your job, but you don't know where to go. Irina asks questions one at a time and helps you work out what gave you energy at work, what drained it and which direction follows from that.",
  card: "Looks at your experience, strengths and motives and helps you see which way to go in your career.",
  cta: "Talk to Irina",
  situations: [
    "You've spent years in one profession, you have less and less energy for it, and you don't know what to do instead.",
    "You're being offered a promotion to a management role, and you're not sure you want to manage people.",
    "You have a CV, but you can't put into words what you're good at or why you left your previous jobs.",
    "You're thinking of leaving the office for freelancing or a business of your own and want to know whether that way of working would suit you.",
    "You're returning to work after a long break and don't know where to start.",
    "You've had three jobs in two years and want to understand what went wrong each time.",
  ],
  example: {
    question:
      "I've worked as an accountant for eight years and I feel burnt out. I want to change careers, but I don't know what to move into.",
    answer: `Thank you for sharing this. Eight years in one profession is a lot of experience. Burnout is often a sign not that you're “in the wrong place”, but that something important in your work has stopped sustaining you.

Let's not rush into choosing a new profession. First, let's understand what exactly is draining you and what still gives you energy. Then the direction will become clearer, and you won't carry the same exhaustion into a new job.

Let's start with a simple question:

Think back over the last year or two at work. Were there tasks or moments when you felt interested, absorbed, or when “time just flew”? What were they?

If there were hardly any moments like that, just say so. That matters too.`,
  },
  can: [
    "Goes through your experience one question at a time: which tasks gave you energy, what wore you out, why you changed jobs.",
    "Helps you see your strengths — professional skills and personal qualities — without judgements or labels.",
    "Clarifies what drives you at work and what definitely doesn't suit you: values, motives, working environment, how you prefer to deal with people.",
    "If you send your CV, picks out your key skills and asks about what it doesn't show: why you made the decisions you did.",
    "Pulls it all together: a portrait of you as a professional and several directions worth considering — roles and ways of working.",
  ],
  cannot: [
    "Isn't a recruiter: doesn't find vacancies for you or help you hire staff. Irina works on your own career.",
    "Doesn't decide for you. She suggests directions to consider, and the choice stays yours.",
    "Doesn't replace a psychologist or a doctor: if the exhaustion lasts for months and affects your health, that's a reason to see one.",
  ],
  faq: [
    {
      q: "How does the conversation go?",
      a: "Irina asks one question at a time and listens first: about your last job, the tasks that gave you energy and what wore you out. Then she asks follow-up questions and puts it all together into a picture: your strengths, your motives, what doesn't suit you and which directions are worth considering.",
    },
    {
      q: "Do I need a CV?",
      a: "No. If you have one, send it as a file — Irina will start from it and ask about what it doesn't show. If not, she'll start with your most recent experience and your goals.",
    },
    {
      q: "How is Irina different from a recruiter?",
      a: "A recruiter looks for a person to fill a vacancy. Irina works the other way round: she helps you understand what work suits you. She doesn't offer vacancies.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "Who will see my answers?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If you've already explored your values with Olia, Irina won't have to start from scratch. We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default irina;
