import type { AssistantPageText } from '../../types';

/** Виталий — финансовый директор. Перевод pages/ru/vitaly.ts. Пример разговора — docs/assistant-pages/examples/vitaly.md. */
const vitaly: AssistantPageText = {
  title: 'Diretor financeiro online e modelo financeiro — Vitali | Linkeon',
  description:
    'O Vitali é um diretor financeiro online. Monta o modelo financeiro e a previsão do fluxo de caixa, calcula a economia unitária e o ponto de equilíbrio e ajuda no orçamento pessoal.',
  h1: 'Vitali — diretor financeiro online: modelo financeiro, fluxo de caixa, finanças pessoais',
  lead: 'A faturação cresce e a conta continua vazia; ou o fundo de emergência há três anos que não sai do papel. O Vitali faz estas contas com os seus números e mostra dois ou três cenários — com os pressupostos e o principal risco de cada um.',
  card: 'Finanças da empresa e pessoais: fluxo de caixa, economia unitária, modelo financeiro, regime fiscal, fundo de emergência e poupanças.',
  cta: 'Falar com o Vitali',
  situations: [
    'O banco ou um investidor pede um modelo financeiro, e só tem a faturação mês a mês.',
    'A faturação cresceu e é altura de decidir: ficar no regime simplificado russo (USN) a 6%, passar para o de 15% ou abrir uma sociedade por quotas.',
    'A publicidade traz compradores, mas não sabe se cada um deles compensa o que custou.',
    'Não sabe como pagar a si próprio: com salário, com dividendos ou deixando o dinheiro no negócio.',
    'Tem dinheiro disponível e um cartão de crédito a 30%, e não sabe o que fazer primeiro — pagar a dívida ou investir.',
  ],
  example: {
    question:
      'Tenho uma loja online: a faturação cresce, mas na conta nunca há dinheiro. Como percebo para onde vai?',
    answer: `Quase sempre, a razão é que o lucro e o dinheiro na conta são coisas diferentes. No retalho em crescimento, o dinheiro vai sobretudo para o stock e para o intervalo entre pagar ao fornecedor e receber do comprador. Dá para verificar isto numa noite.

Passo 1. Mapa de fluxos de caixa dos últimos 6–12 meses

Exporte os extratos de todas as contas e classifique cada pagamento por rubrica. …

Passo 2. Onde costuma perder-se o dinheiro numa loja online

1. Stock. Quando cresce, compra a pensar nas vendas futuras, e o lucro transforma-se em mercadoria no armazém. …
2. Ciclo financeiro. Calcula-se assim: dias de rotação do stock + dias até receber o dinheiro do marketplace ou dos pagamentos com cartão − dias de prazo do fornecedor. Por exemplo, 60 + 14 − 0 = 74 dias. Cada rublo de faturação fica congelado 74 dias, por isso, quanto mais rápido o crescimento, mais dinheiro é preciso.
…

Passo 3. Três verificações rápidas

— O valor do stock (a preço de compra) hoje e há um ano. Se cresceu mais ou menos o mesmo que o dinheiro «desaparecido», aí está a resposta.
…

Envie-me o extrato da conta (Excel ou PDF) e o relatório de stock dos últimos seis meses. Classifico os pagamentos por rubrica, calculo o seu ciclo financeiro e mostro-lhe quanto dinheiro já está congelado e quanto ficará ao ritmo de crescimento atual. …`,
  },
  can: [
    'Faz a previsão do fluxo de caixa, o orçamento e o modelo financeiro, e analisa a demonstração de resultados.',
    'Calcula a economia unitária, o ponto de equilíbrio e o retorno do investimento: quanto custa cada comprador e a partir de que valor médio de venda começa a ter lucro.',
    'Compara regimes fiscais e formas jurídicas para a sua faturação; ajuda a decidir se deve pagar-se com salário ou com dividendos.',
    'Trata das finanças pessoais: orçamento familiar, fundo de emergência para 3–12 meses, poupança para uma casa ou para os estudos, deduções fiscais.',
    'Calcula com código, não «a olho», e apresenta um cenário base, um otimista e um pessimista.',
    'Lê de um ficheiro o extrato bancário, a demonstração de resultados (P&L) ou o livro de receitas e despesas e faz gráficos: fluxo de caixa, estrutura de custos, comparação de cenários.',
  ],
  cannot: [
    'Não aconselha a comprar uma ação ou um fundo em concreto: o Vitali não é consultor de investimento. Fala de princípios — classes de ativos, alocação, risco, horizonte temporal.',
    'Não garante resultados: qualquer previsão é um modelo com pressupostos, e o Vitali diz qual é o principal.',
    'Não entra em esquemas de fuga aos impostos — só otimização legal.',
  ],
  faq: [
    {
      q: 'Os cálculos do Vitali são para que país?',
      a: 'À partida, para a Rússia: regimes simplificado e de patente, trabalho independente, contas individuais de investimento, deduções fiscais. Também pode fazer as contas em dólares ou em euros. Se o negócio está noutro país, indique-o: o fluxo de caixa calcula-se da mesma forma, mas os impostos locais deve confirmá-los com um especialista desse país.',
    },
    {
      q: 'Em que é que o Vitali é diferente de um contabilista?',
      a: 'A contabilidade — lançamentos, declarações, processamento de salários — é com a contabilista Anna. O Vitali trata das decisões para o futuro: o que uma operação significa para o fluxo de caixa e que caminho seguir. Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Quem vê os meus números?',
      a: 'Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default vitaly;
