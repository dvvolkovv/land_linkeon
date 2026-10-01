import type { AssistantPageText } from '../../types';

/**
 * Екатерина — тексты и продвижение. Перевод pages/ru/ekaterina.ts.
 *
 * Пишет тексты только по-русски, даже если написать ей по-португальски (так в
 * её инструкции; проверено вживую). Поэтому title, description, h1, card и lead
 * — про тексты на русском для русскоязычной аудитории, а в «Чего не делает»
 * первым пунктом добавлено, что на других языках она не пишет (бриф, п. 10).
 */
const ekaterina: AssistantPageText = {
  title: 'Redatora com IA: textos e posts em russo — Ekaterina | Linkeon',
  description:
    'A Ekaterina é uma redatora com IA que escreve só em russo: posts para canais de Telegram, newsletters, landing pages e slogans. Afina rascunhos e monta o plano de conteúdos.',
  h1: 'Ekaterina — redatora com IA que escreve em russo: textos de venda, posts e newsletters',
  lead: 'O lançamento é na segunda-feira e o anúncio ainda não existe. Conte à Ekaterina por palavras suas o que vende e a quem — ela devolve um texto pronto em russo, para leitores de língua russa, e uma versão mais curta.',
  card: 'Textos em russo: posts, newsletters, landing pages, slogans. Transforma uma ideia ou um rascunho num texto pronto, em várias versões.',
  cta: 'Falar com a Ekaterina',
  situations: [
    'Está na hora de avisar os clientes dos novos preços e não quer que o e-mail soe a desculpa.',
    'O rascunho do post está feito, mas é longo e confuso, e não lhe apetece publicá-lo.',
    'O canal vive aos solavancos: três posts num dia e depois um mês de silêncio.',
    'Precisa do texto de uma landing page e não sabe que vantagens pôr no primeiro ecrã.',
    'Daqui a duas semanas abrem as vendas de um curso e quer preparar os seguidores com antecedência.',
    'A marca escreve ora em tom formal, ora na brincadeira, e os seguidores não lhe reconhecem a voz.',
  ],
  example: {
    question:
      'Escreva um post para o canal de Telegram sobre o lançamento do nosso novo serviço — limpeza de estofos ao domicílio.',
    answer: `Aqui está o post pronto. Entre parênteses retos ficam os espaços para os seus dados.

🛋 Limpeza de estofos, agora em sua casa!

O sofá onde se entornou café. O cadeirão de que o gato tanto gosta. O colchão que já há muito pedia uma renovação.

Antes, era levar os móveis à limpeza ou viver com as nódoas. Agora é mais simples: somos nós que vamos até si.

✨ O que limpamos:
— sofás e cadeirões
— colchões
— cadeiras e pufes
— tapetes e alcatifas
— interiores de automóveis (se fizerem)

🧼 Porque pode ficar descansado connosco:
✔️ Equipamento profissional e produtos hipoalergénicos: seguro para crianças e animais de estimação
✔️ Removemos nódoas, cheiros, pó e ácaros
✔️ Os móveis secam em [4–6] horas
…

🎁 Oferta de lançamento: até [data], [20]% de desconto na primeira marcação com a palavra «LIMPO».

📲 Marcações e orçamentos: [telefone / @username / link]
Envie uma foto dos móveis e dizemos-lhe o preço em 5 minutos.

O seu sofá merece uma segunda oportunidade 💙

Versão curta (para anúncio ou repetição):

🛋 Serviço novo: limpeza de estofos ao domicílio!
Vamos à sua casa e limpamos o sofá, os cadeirões, o colchão ou o tapete aí mesmo. Produtos seguros, seca em poucas horas.
…

Se me disser a cidade, os preços, o nome da empresa e o seu público (famílias com crianças, escritórios, donos de animais), afino o texto. …`,
  },
  can: [
    'Escreve textos de qualquer formato: posts, guiões de stories, mensagens para canais de Telegram, textos de landing pages, slogans, newsletters.',
    'Pega num texto em bruto e torna-o mais limpo, mais lógico e mais convincente.',
    'Propõe versões — curta e longa, emocional e com tom de especialista — e adapta o estilo aos seus leitores.',
    'Monta o plano de conteúdos e as rubricas, e escreve uma série de posts que prepara os seguidores para a compra.',
    'Ajuda a apresentar o produto: proposta de valor, vantagens, argumentos que geram confiança, apelo à ação.',
    'Aconselha onde e como se promover, ajuda a encontrar a voz da marca e explica os princípios do marketing em linguagem simples.',
  ],
  cannot: [
    'Não escreve noutras línguas: mesmo que lhe escreva em português, o texto sai em russo. Os textos dela são para leitores de língua russa.',
    'Não conhece o seu negócio por dentro e pode acrescentar uma vantagem que não oferece. Antes de publicar, confirme preços, prazos e promessas aos clientes.',
    'Não lança publicidade nem compra espaços publicitários. A Ekaterina sugere os canais e a ordem dos passos, mas a execução cabe-lhe a si.',
    'Não promete alcance nem vendas: o resultado depende também do produto, do preço e de onde o texto vai ser visto.',
  ],
  faq: [
    {
      q: 'Posso enviar o meu rascunho?',
      a: 'Sim, como texto na mensagem ou em ficheiro. A Ekaterina torna-o mais limpo e convincente e, se for preciso, propõe uma versão curta e outra mais longa.',
    },
    {
      q: 'O que devo contar para o texto sair certeiro?',
      a: 'O que vende, a quem e onde o texto vai sair. Se faltar alguma coisa, a Ekaterina pergunta.',
    },
    {
      q: 'Em que é que a Ekaterina é diferente da Alexandra, do marketing?',
      a: 'A Alexandra começa pelo mercado: a quem vender, como se destacar da concorrência, como medir o resultado. A Ekaterina encarrega-se dos próprios textos — do post e da newsletter à landing page — e do plano de conteúdos para eles.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se a Alexandra já sabe quem são os seus clientes, não vai ter de o explicar outra vez à Ekaterina.',
    },
  ],
};

export default ekaterina;
