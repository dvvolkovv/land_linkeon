import type { AssistantPageText } from '../../types';

/**
 * Андрей — запуск бизнеса. Перевод pages/ru/andrey.ts. Пример разговора —
 * docs/assistant-pages/examples/andrey.md.
 *
 * В lead русские «неделя и сумма в рублях» переданы как «numa semana e com
 * muito pouco dinheiro»: рубли вне примера иностранцу ничего не говорят, а
 * смысл — проверка почти без вложений — сохранён.
 */
const andrey: AssistantPageText = {
  title: 'Como abrir um negócio: consultoria de lançamento — Andrei | Linkeon',
  description:
    'O Andrei ajuda a abrir um negócio: testar a procura antes de investir, escolher forma jurídica e regime fiscal, calcular o ponto de equilíbrio. Um plano até às primeiras receitas.',
  h1: 'Como abrir um negócio: o Andrei acompanha-o da ideia às primeiras receitas',
  lead: 'Tem uma ideia e algum dinheiro de parte, e medo de o investir no sítio errado. O Andrei começa por perguntar pelo orçamento e pelos prazos e depois mostra-lhe o que dá para testar numa semana e com muito pouco dinheiro.',
  card: 'Lançamento: teste da procura antes de investir, forma jurídica, primeiros clientes, ponto de equilíbrio, plano até às primeiras receitas.',
  cta: 'Falar com o Andrei',
  situations: [
    'Quer deixar de trabalhar por conta de outrem para ter o seu próprio negócio e não sabe para quantos meses chegam as poupanças.',
    'Tem a ideia de um produto, mas ainda não falou com um único futuro comprador.',
    'Está a escolher entre trabalhador independente, empresário em nome individual e sociedade por quotas, e cada conhecido aconselha uma coisa diferente.',
    'Os primeiros clientes vieram através de conhecidos, mas não sabe onde arranjar os seguintes nem quanto lhes cobrar.',
    'O negócio arrancou há seis meses, há encomendas, mas ainda não deu lucro.',
  ],
  example: {
    question: 'Quero abrir um café take-away junto ao metro. Por onde começo e de quanto dinheiro preciso para arrancar?',
    answer: `Café take-away junto ao metro: por onde começar e quanto dinheiro é preciso

Não comece pela máquina de café, comece pelo local. Num café take-away, a faturação depende quase toda do sítio. Enquanto não contar as pessoas numa saída concreta do metro, qualquer orçamento é adivinhação.

Quanto dinheiro é preciso para arrancar

É uma estimativa com base na prática habitual. Os números exatos dependem da cidade e da área do espaço.

Rubrica — Regiões — Moscovo e São Petersburgo
…
Total — ~1,1–2,3 milhões de ₽ — ~2–4,4 milhões de ₽

…

A reserva para os primeiros meses é uma rubrica obrigatória. Normalmente, um café chega a um movimento normal ao fim de 2–4 meses, e os que acabam por fechar são, na maioria, os que ficam sem dinheiro antes disso.

Quantos cafés é preciso vender (estimativa para Moscovo)

— Consumo médio de cerca de 300 ₽. O custo de cada café, com as comissões dos pagamentos com cartão, ronda os 30%, ou seja, por cada café ficam cerca de 200 ₽.
…
— Ponto de equilíbrio: cerca de 60 cafés por dia. Num bom local vendem-se 150–250 cafés por dia; num local fraco, 30–40, e aí o café trabalha com prejuízo.

…

O principal risco

Um local fraco. Sinal de que está na hora de parar: ao fim de 3 meses vendem-se menos de 40 cafés por dia e a faturação não cresce. A partir daí, só se vai gastando a reserva.

O que fazer hoje: escolha dois locais junto à sua estação de metro e amanhã de manhã conte o movimento em cada um.

Em que cidade e junto a que estação quer abrir, e quanto dinheiro está disposto a investir? Com esses dados faço um orçamento mais preciso.`,
  },
  can: [
    'Testa a ideia antes do investimento: como confirmar a procura gastando pouco e qual a versão mínima necessária para a primeira venda.',
    'Ajuda a escolher a forma jurídica e o regime fiscal para o seu modelo: trabalhador independente, empresário em nome individual ou sociedade por quotas; e, entre os regimes russos, o simplificado (USN), o simplificado automatizado (AUSN) ou o de patente.',
    'Calcula com os seus números o ponto de equilíbrio, a economia unitária e a margem de segurança — para quantos meses chega o dinheiro.',
    'Dá-lhe um plano até às primeiras receitas: três a cinco passos com prazos e custos, o principal risco e o sinal de que está na hora de parar.',
    'Analisa o preço, os primeiros clientes, a primeira contratação e o que já arrancou mas está a patinar.',
    'Confirma na internet as taxas em vigor, os limites dos regimes e as exigências das plataformas e dos bancos.',
  ],
  cannot: [
    'Não promete rendimentos nem apresenta o prazo de retorno como um facto: qualquer número é uma estimativa, com os pressupostos à vista.',
    'Não o convence nem o dissuade. Se, com os seus números, a ideia não bate certo, o Andrei di-lo logo.',
    'Não aconselha esquemas de fuga aos impostos nem a divisão artificial da empresa.',
    'Não faz as vezes do contabilista nem do advogado: diz-lhe o que vai ser preciso; para calcular o imposto, fale com a contabilista Anna; para redigir um contrato, com o advogado Alexei.',
  ],
  faq: [
    {
      q: 'Os conselhos do Andrei são para que país?',
      a: 'À partida, para a Rússia: trabalho independente, regime AUSN, marketplaces, pagamentos com cartão. Se vai lançar o negócio noutro país, indique-o: a procura e o ponto de equilíbrio calculam-se da mesma forma, mas a forma jurídica e os impostos deve confirmá-los com um especialista local.',
    },
    {
      q: 'Posso enviar um plano de negócios ou as condições de uma plataforma?',
      a: 'Sim, em PDF ou documento. O Andrei analisa planos de negócios, propostas comerciais e condições de marketplaces; o ficheiro é lido por inteiro.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Depois de o Andrei o ajudar a escolher o regime, não vai ter de explicar outra vez à contabilista Anna a que se dedica.',
    },
  ],
};

export default andrey;
