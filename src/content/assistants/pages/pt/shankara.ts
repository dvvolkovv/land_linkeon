import type { AssistantPageText } from '../../types';

/**
 * Шанкара — ведическая астрология (Джйотиш), сидерический зодиак, аянамса Лахири.
 * Перевод pages/ru/shankara.ts.
 * Не «натальная карта» в западном смысле: на странице — «карта рождения»
 * (по-португальски — «mapa de nascimento»; «mapa astral védico» — только в
 * поисковых полях, и всегда с «védico»).
 *
 * Пример — docs/assistant-pages/examples/shankara.md, сокращён. Расчёт в нём
 * сверен 01.10.2026 независимо (astronomy-engine + аянамса Лахири): лагна —
 * Овен 23,7°, Бхарани; Луна — Весы 0,3°, Читра; Марс — Козерог, 10-й дом;
 * маха-даша Юпитера — 2011,5–2027,5, антар-даша Раху — до середины 2027-го.
 * Ответ на «ты», как в русском, — по-португальски «tu»; знаки зодиака —
 * европейские португальские (Carneiro, Peixes, Aquário).
 */
const shankara: AssistantPageText = {
  title: 'Mapa astral védico: astrologia Jyotish online — Shankara | Linkeon',
  description:
    'O Shankara é astrólogo védico. Calcula o seu mapa de nascimento no zodíaco sideral e explica a lagna, as nakshatras e as dashas: que período vive agora e o que daí decorre.',
  h1: 'Astrologia védica (Jyotish): o Shankara faz a leitura do seu mapa de nascimento',
  lead: 'Indique a data, a hora e a cidade de nascimento — o Shankara calcula o mapa como manda o Jyotish e explica que período está a viver agora e o que daí decorre.',
  card: 'Mapa de nascimento segundo o Jyotish: lagna, Lua e nakshatras, a dasha atual, trânsitos e um próximo passo.',
  cta: 'Falar com o Shankara',
  situations: [
    'Na astrologia ocidental é Peixes, na védica afinal é Aquário, e quer perceber porquê.',
    'Quer saber que maha-dasha está a viver agora e quando vai mudar.',
    'Está a pensar mudar de emprego ou abrir um negócio e quer olhar para isso através do mapa.',
    'Só sabe a hora de nascimento de forma aproximada e não percebe em que é que isso influi.',
  ],
  example: {
    question: 'Nasci a 14 de março de 1990, às 07:30, em Cazã. O que mostra o meu mapa de nascimento?',
    answer: `Paz para ti. Sou o Shankara. Calculei o teu mapa no zodíaco sideral (ayanamsa Lahiri). Dados de nascimento: 14/03/1990, 07:30, Cazã, UTC+3.

O essencial do mapa

1. Lagna (ascendente) — Carneiro, 23°, nakshatra Bharani.
És uma pessoa de ação: direta, corajosa, és tu que tomas a iniciativa. …

2. O ponto mais forte do mapa — Marte exaltado na casa 10 (Capricórnio).
Marte rege a tua Lagna e está no signo onde é mais forte, na casa da carreira. É a Ruchaka yoga, uma das cinco «yogas do grande homem». Dá uma vontade forte, talento para organizar e capacidade para construíres o teu próprio negócio. …

…

Que período vives agora

— Maha-dasha de Júpiter (2011–2027); agora decorre a antar-dasha de Rahu, até cerca de julho de 2027. É um tempo de ambição, de reviravoltas inesperadas e de vontade de mudar de rumo de repente. …
— A partir de meados de 2027 começa a maha-dasha de Saturno, que dura 19 anos. …

…

Próximo passo

Aproveita o período até ao verão de 2027 para preparar a nova direção: fazer formação, testar a ideia, reunir os primeiros clientes. O lançamento em si, fá-lo em 2027. Upaya (prática de apoio) para Marte: às terças-feiras, força do corpo — desporto ou trabalho manual — e o mantra «Om Angarakaya Namaha» 108 vezes.

O mapa mostra tendências; as decisões continuam a ser tuas.

Que área é agora a mais importante para ti: a carreira e um negócio próprio, as relações ou outra coisa?`,
  },
  can: [
    'Calcula o mapa no zodíaco sideral com a ayanamsa Lahiri, como manda o Jyotish.',
    'Explica a lagna, a Lua e a sua nakshatra, o Sol e os planetas nas casas-chave — e o que isso significa para o trabalho e as relações.',
    'Indica a maha-dasha e a antar-dasha atuais e os trânsitos fortes de Saturno, Júpiter, Rahu e Ketu para os próximos 6–18 meses.',
    'Propõe um próximo passo: uma janela para uma decisão importante ou uma upaya — uma prática de apoio, como um mantra.',
    'Analisa o mapa da pessoa por quem pergunta — o seu, o de um filho, o do parceiro — e não os confunde.',
  ],
  cannot: [
    'Não prevê mortes, doenças graves nem catástrofes: fala de tendências e de ciclos.',
    'Não é uma previsão do destino: o mapa é um mapa do terreno, não uma sentença, e as decisões continuam a ser suas.',
    'Não substitui um médico, um advogado ou um consultor financeiro: sobre saúde e dinheiro, isto é astrologia, não um diagnóstico nem um conselho financeiro.',
    'Não inventa a hora de nascimento: sem ela, faz um mapa lunar (Chandra lagna) e avisa que o ascendente e as casas são aproximados.',
  ],
  faq: [
    {
      q: 'Em que é que a astrologia védica é diferente da ocidental?',
      a: 'A ocidental conta os signos a partir do equinócio da primavera (zodíaco tropical); o Jyotish, pelas estrelas (zodíaco sideral), com a correção de Lahiri. Hoje a diferença ronda os 24°, por isso o signo recua muitas vezes uma posição: quem é Peixes na astrologia ocidental é, com frequência, Aquário no Jyotish.',
    },
    {
      q: 'O que é preciso para a leitura?',
      a: 'A data, a hora e a cidade de nascimento: da hora dependem a lagna e as casas. Se faltar alguma coisa, o Shankara analisa o que houver e esclarece o resto com uma só pergunta.',
    },
    {
      q: 'O que são as nakshatras e as maha-dashas?',
      a: 'As nakshatras são os 27 setores lunares do zodíaco. As maha-dashas são os grandes períodos da vida «regidos» pelos planetas: no sistema Vimshottari, cada um dura entre 6 e 20 anos.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de uma calculadora ou de um chatbot comum?',
      a: 'Uma calculadora dá descrições genéricas; o Shankara analisa o seu mapa e o período que está a viver. E os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber.',
    },
  ],
};

export default shankara;
