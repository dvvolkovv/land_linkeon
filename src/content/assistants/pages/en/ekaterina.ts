import type { AssistantPageText } from '../../types';

/**
 * Екатерина — тексты и продвижение. Перевод pages/ru/ekaterina.ts.
 *
 * Раньше Екатерина по своей инструкции писала тексты только по-русски, и эта
 * страница подавала её как копирайтера для русскоязычной аудитории, с лишним
 * первым пунктом о языке в «Чего не делает». 06.10.2026 инструкцию исправили:
 * теперь она пишет на языке человека (проверено на проде), оговорка снята.
 * Пример разговора — настоящий, на русском, и показан в переводе; подпись об
 * этом остаётся верной.
 */
const ekaterina: AssistantPageText = {
  title: "AI copywriter: sales copy and posts — Ekaterina | Linkeon",
  description:
    "Ekaterina is an AI copywriter who writes Telegram posts, newsletters, landing-page copy and slogans. She also polishes drafts and builds content plans.",
  h1: "Ekaterina — AI copywriter: sales copy, posts and newsletters",
  lead: "The launch is on Monday and there's still no announcement. Tell Ekaterina in your own words what you're selling and to whom — she'll come back with finished copy, plus a shorter version.",
  card: "Posts, newsletters, landing pages and slogans. Turns an idea or a draft into finished copy and offers several versions.",
  cta: "Talk to Ekaterina",
  situations: [
    "It's time to tell clients about new prices, and you don't want the email to sound like an excuse.",
    "The draft of a post is ready, but it's long and muddled, and you don't feel like publishing it.",
    "Your channel runs in fits and starts: three posts in a day, then a month of silence.",
    "You need copy for a landing page and can't decide which benefits to put above the fold.",
    "Sales of your course open in two weeks, and you want to get your subscribers ready in advance.",
    "Your brand sounds formal one day and jokey the next, and followers can't recognise its voice.",
  ],
  example: {
    question:
      "Write a Telegram channel post about the launch of our new service — mobile upholstery cleaning.",
    answer: `Here's the finished post. The square brackets mark places for your details.

🛋 Upholstery cleaning, now right in your home!

The sofa someone spilt coffee on. The armchair the cat loves. The mattress that's long overdue a freshen-up.

You used to have to haul your furniture off to be cleaned or live with the stains. Now it's simpler: we come to you.

✨ What we clean:
— sofas and armchairs
— mattresses
— chairs and pouffes
— rugs and carpets
— car interiors (if you do them)

🧼 Why you can relax with us:
✔️ Professional equipment and hypoallergenic products: safe for children and pets
✔️ We remove stains, odours, dust and mites
✔️ Furniture dries in [4–6] hours
…

🎁 A launch gift: until [date], [20]% off your first order with the code word “CLEAN”.

📲 To book or check the price: [phone / @username / link]
Send us a photo of your furniture, and we'll work out the price in 5 minutes.

Your sofa deserves a second chance 💙

Short version (for an announcement or a repost):

🛋 New service: upholstery cleaning that comes to you!
We'll come and clean your sofa, armchairs, mattress or carpet right in your home. Safe products, dries in a few hours.
…

If you tell me the city, your prices, the company name and your audience (families with children, offices, pet owners), I'll make the copy more precise. …`,
  },
  can: [
    "Writes copy in any format: posts, scripts for Stories, Telegram channel messages, landing pages, slogans, newsletters.",
    "Takes rough text and makes it cleaner, more logical and more persuasive.",
    "Offers versions — short and long, emotional and expert — and adapts the style to your readers.",
    "Puts together a content plan and content pillars, and maps out a series of posts that gets subscribers ready to buy.",
    "Helps package your product: the value proposition, the benefits, arguments that build trust, a call to action.",
    "Advises on where and how to promote yourself, helps you find your brand voice and explains marketing principles in plain language.",
  ],
  cannot: [
    "Doesn't know your business from the inside and may add a benefit you don't actually offer. Before publishing, check prices, deadlines and promises to clients.",
    "Doesn't run ads or buy placements. Ekaterina will suggest channels and the steps to take, in order, but carrying them out is up to you.",
    "Doesn't promise reach or sales: the result also depends on the product, the price and where people see the copy.",
  ],
  faq: [
    {
      q: "Can I send my own draft?",
      a: "Yes, as text in a message or as a file. Ekaterina will make it cleaner and more persuasive and, if needed, offer a short and a long version.",
    },
    {
      q: "What should I tell her to get the copy right?",
      a: "What you're selling, to whom, and where the copy will appear. If something's missing, Ekaterina will ask.",
    },
    {
      q: "How is Ekaterina different from Alexandra, the marketer?",
      a: "Alexandra starts with the market: who to sell to, how to stand out from competitors, how to measure results. Ekaterina takes on the copy itself — from a post or a newsletter to a landing page — and the content plan that goes with it.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Alexandra already knows who your clients are, you won't have to explain it all over again to Ekaterina.",
    },
  ],
};

export default ekaterina;
