import type { AssistantPageText } from '../../types';

/**
 * Лиана — нумерология. Перевод pages/ru/liana.ts. Пример —
 * docs/assistant-pages/examples/liana.md: снята разметка (заголовки, жирный,
 * таблица квадрата Пифагора), маркеры списков «-» стали «—»; знаки ➕/➖ у строк
 * «Сила / уязвимость» — её собственные, оставлены как пришли.
 *
 * Школа «Сюцай» — по пиньиню, Xiucai; Ба Цзы — Ba Zi; Казань — Cazã
 * (португальское написание).
 */
const liana: AssistantPageText = {
  title: 'Numeróloga online: leitura da data de nascimento — Liana | Linkeon',
  description:
    'A Liana é numeróloga online. Analisa a data de nascimento segundo oito escolas — Xiucai, pitagórica, Ba Zi e outras: temas, pontos fortes, anos de ativação e o próximo ciclo.',
  h1: 'Análise numerológica pela data de nascimento: Liana, numeróloga online',
  lead: 'Indique o nome, a data, a hora e a cidade de nascimento — seus ou de alguém próximo. A Liana calcula os números e explica o que significam em oito escolas de numerologia, duas escolas de cada vez.',
  card: 'Análise da data de nascimento em oito escolas de numerologia — Xiucai, pitagórica, Ba Zi e outras: pontos fortes, anos de ativação, ciclos.',
  cta: 'Falar com a Liana',
  situations: [
    'Quer saber o que dizem os números da sua data de nascimento, e não uma descrição genérica tirada da internet.',
    'Ouviu falar do Xiucai ou do quadrado de Pitágoras e quer analisar a sua data.',
    'Tem curiosidade em ver como diferentes escolas de numerologia leem a mesma data.',
    'Sente que uma etapa da vida terminou e quer ver que ciclo está a começar.',
    'Quer analisar a data de nascimento de um filho ou do seu parceiro.',
  ],
  example: {
    question: 'Faça uma análise numerológica: Anna, 14/03/1990, 07:30, Cazã.',
    answer: `Pessoa: Anna, nascida a 14/03/1990, às 07:30, em Cazã.

1. Xiucai

Códigos: número da consciência 5 (dia 14 → 1+4), número da missão 9 (1+4+0+3+1+9+9+0 = 27 → 9).

Temas principais e propósito
— 5 — liberdade, movimento, comunicação, adaptação rápida, interesse por muitas coisas ao mesmo tempo.
— 9 — missão de serviço, de mentoria, de temas humanitários e «grandes». A experiência transforma-se em sabedoria e é transmitida aos outros.
— Ligação 5→9: através de experiências variadas, mudanças e contactos, a Anna chega ao papel de guia ou de mestre.

Força / vulnerabilidade
➕ Carisma, facilidade nos contactos, mente flexível, jeito para vender ideias e inspirar.
➖ Dispersão, impaciência, tédio com a rotina, decisões impulsivas. Com o 9 junta-se a tendência para carregar com o que é dos outros e para «salvar».

Anos de ativação
— Carreira, arranque: 2018, 2027.
— Amor, família: 2023, 2032.
— Dinheiro: 2025, 2034.
— Transformação, balanço: 2017, 2026.

Encerramentos: 2026 fecha o ciclo de 9 anos iniciado em 2018.

2. Clássica (pitagórica)

Número do caminho de vida: 27 → 9. Número do dia de nascimento: 14 → 5.
…

Pináculos (picos) do caminho de vida
— Até 2017 — 8: afirmação através de objetivos materiais e de estatuto.
— 2017–2026 — 6: família, responsabilidade, cuidado, relações.
— 2026–2035 — 5: liberdade, mudanças, novas áreas, mobilidade.
— A partir de 2035 — 4: estrutura, estabilidade, alicerces.

…

Continuo com as escolas 3–4 (védica e cabalística)?`,
  },
  can: [
    'Analisa a data segundo oito escolas: Xiucai, pitagórica, védica, cabalística, arcanologia do Tarot, Ba Zi, astronumerologia e «Finanças e realização».',
    'Em cada escola, indica os temas principais e o propósito, os pontos fortes e as vulnerabilidades, os anos de ativação no amor, na carreira e no dinheiro, e o fecho dos ciclos.',
    'Faz a análise por partes, duas escolas de cada vez, e pergunta se deve continuar.',
    'No fim, junta tudo num resumo curto: quem é a pessoa segundo o seu código e que ciclo tem pela frente nos próximos dois anos.',
    'Analisa a data da pessoa por quem pergunta — a sua, a de um filho, a do parceiro — e não a confunde com outras.',
  ],
  cannot: [
    'Não dá conselhos nem decide por si. A Liana explica o que os números significam; o que fazer com isso fica ao seu critério.',
    'Não é uma previsão do destino: os anos de ativação são uma interpretação numerológica, não a promessa de que algo vai acontecer.',
    'Não substitui um médico, um advogado ou um consultor financeiro. Quando a análise fala de saúde ou de dinheiro, é numerologia, não um diagnóstico nem um conselho financeiro.',
  ],
  faq: [
    {
      q: 'O que é preciso para a análise?',
      a: 'O nome, a data, a hora e a cidade de nascimento — como no exemplo acima. A Liana repete estes dados no início de cada resposta, para que se veja de quem é a análise.',
    },
    {
      q: 'Em que diferem as escolas?',
      a: 'Cada uma calcula à sua maneira. O Xiucai, o número da consciência e o da missão; a pitagórica, o quadrado de Pitágoras e o número do caminho de vida; a cabalística, as vibrações do nome; o Ba Zi, o elemento da personalidade e a influência do ano.',
    },
    {
      q: 'O que são os anos de ativação?',
      a: 'São os anos em que, segundo o cálculo, cai um dos temas: amor, carreira, dinheiro ou mudanças. Para a Anna do exemplo, carreira e arranque são 2018 e 2027.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de uma calculadora na internet?',
      a: 'Uma calculadora dá números e descrições genéricas. A Liana analisa a sua data em oito escolas e no fim junta tudo num só resumo. E os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber.',
    },
  ],
};

export default liana;
