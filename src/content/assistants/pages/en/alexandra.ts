import type { AssistantPageText } from '../../types';

/**
 * Александра — маркетолог. Перевод pages/ru/alexandra.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/alexandra.md.
 */
const alexandra: AssistantPageText = {
  title: "AI marketing assistant and competitor analysis — Alexandra | Linkeon",
  description:
    "Alexandra is an AI marketer. She finds fresh market and competitor data, helps with positioning, ads and content, and tells you what to measure and when to expect results.",
  h1: "Alexandra — AI marketer: competitor analysis and a marketing plan",
  lead: "Your ads are eating the budget, but enquiries aren't going up. Alexandra will first ask what you sell and to whom, find fresh data on the market and your competitors, and suggest steps whose results you can measure.",
  card: "Market and competitors from fresh data, positioning, advertising, content. Tells you what to measure and when to expect results.",
  cta: "Talk to Alexandra",
  situations: [
    "You're opening a studio or a shop and want to work out how to stand out from the competitors on the next street.",
    "Clients only come through recommendations, and you don't know which kind of advertising to start with.",
    "You run your social media, but the posts don't bring in a single enquiry.",
    "You're launching a new product and choosing its name and the tone to talk about it in.",
    "You want to understand what's happening in your niche right now: prices, trends, which competitors are growing and why.",
  ],
  example: {
    question:
      "I have a nail studio in a residential neighbourhood. How can I attract new clients without a big budget?",
    answer: `Alexandra here. In a residential neighbourhood, almost all your clients live within 10–15 minutes of you. So rather than broad advertising, put your budget into being visible close to home and into getting clients to bring their friends.

1. Maps: the cheapest stream of clients
— Yandex Maps and 2GIS. Fill your listing in completely: photos of your work and the interior, a price list, online booking, opening hours. That's exactly where people search for “manicure near me”.
— Reviews. After every appointment, send the client a link to leave a review; you can also put a QR code on the front desk. …

2. Local communities
— Residents' chats for housing complexes and buildings on Telegram and WhatsApp, neighbourhood groups on VKontakte. Don't spam. Make a useful offer “for neighbours”: for example, 15% off the first visit with a code word. The code word will also show you where the client came from.
…

4. Word of mouth as a system
— A “Bring a Friend” referral scheme. Both get ₽500 off their next visit.
…

What to measure
Ask every new client how they heard about you, and once a month look at:
— how many new clients came from each channel;
— what share come back (60% or more is normal);
— how much one new client costs you.

What works fastest: within 1–2 months, the most noticeable effect usually comes from maps with reviews, neighbourhood chats and the referral scheme.

To make the plan more precise, tell me: which city and area it is, how many nail technicians you have, what your average bill is and how many clients you get a month now. Then I'll put together a step-by-step plan for the month and look at what competitors near you are doing.`,
  },
  can: [
    "Analyses the market and competitors using fresh data: searches the web for current figures, trends and case studies rather than repeating outdated information.",
    "Helps with positioning and your USP: what sets you apart and why people should choose you.",
    "Builds a content strategy and a funnel: social media, blog, newsletters, video and the customer journey from first touch to purchase.",
    "Breaks down paid social and search advertising and the metrics: customer acquisition cost, LTV, ROAS, conversions.",
    "Works on your brand: name, tone of voice, visual style. Suggests viral growth mechanics.",
    "Gives concrete steps with measurable results: what to do, how to measure it and when to expect results.",
  ],
  cannot: [
    "Doesn't launch ad campaigns or manage your ad budget — that's for you or your contractor.",
    "Doesn't guarantee enquiries or sales: the result depends on the product, the price and the execution. Alexandra will tell you what to measure so you can see in time whether a channel is working.",
    "Doesn't praise a weak idea out of politeness: she'll point out its weak spots tactfully but honestly.",
  ],
  faq: [
    {
      q: "Where does Alexandra get her market data?",
      a: "To analyse markets, competitors and trends, she searches the web for fresh data instead of relying on what the model knew when it was trained.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Alexandra already knows what you do and who you do it for, you won't have to explain it all over again to Ekaterina, the copywriter.",
    },
    {
      q: "Who will see my chats?",
      a: "We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default alexandra;
