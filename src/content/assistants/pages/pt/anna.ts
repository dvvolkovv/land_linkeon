import type { AssistantPageText } from '../../types';

/** Анна — бухгалтер. Перевод pages/ru/anna.ts. Пример разговора — docs/assistant-pages/examples/anna.md. */
const anna: AssistantPageText = {
  title: 'Contabilista online com IA: impostos de empresas — Anna | Linkeon',
  description:
    'A Anna é contabilista online com IA. Calcula impostos e contribuições de empresas e independentes, explica regimes fiscais e IVA e diz-lhe os prazos. 25 000 tokens no registo.',
  h1: 'Anna — contabilista online com IA: os impostos da sua empresa por palavras simples',
  lead: 'A carta do fisco chegou na sexta à noite e o contabilista só responde na segunda. A Anna explica por palavras simples o que lhe pedem, quanto tem de pagar e até que dia.',
  card: 'Impostos e contribuições na Rússia: regimes simplificado e de patente, trabalho independente, IVA. Calcula com os seus números, sem jargão.',
  cta: 'Falar com a Anna',
  situations: [
    'Trabalha em nome individual no regime simplificado russo (USN) e não sabe ao certo quanto pode abater ao imposto com as contribuições.',
    'Vai registar a atividade pela primeira vez e está a escolher entre trabalhador independente, empresário em nome individual no regime simplificado e o regime de patente.',
    'O fisco pediu esclarecimentos sobre a sua declaração e não sabe o que responder.',
    'Vai contratar o primeiro funcionário e quer perceber que imposto sobre o rendimento e que contribuições tem de pagar por ele.',
    'A faturação está a crescer e não sabe a partir de que valor vai ter de pagar IVA.',
  ],
  example: {
    question:
      'Sou empresário em nome individual no regime simplificado russo (USN), com imposto sobre as receitas; este ano devo chegar aos 3 milhões de rublos. Que impostos e contribuições tenho de pagar e quando?',
    answer: `Se não tiver funcionários, com uma receita de 3 milhões de ₽ em 2026 fica assim.

O que pagar

Contribuições fixas «por conta própria» — 57 390 ₽ — até 28/12/2026
1% da receita acima de 300 mil — (3 000 000 − 300 000) × 1% = 27 000 ₽ — até 01/07/2027
USN 6% — 180 000 ₽ antes de abater as contribuições — pagamentos por conta e acerto final segundo o calendário abaixo

O imposto pode ser reduzido no valor total das contribuições, até 100%. Isto é permitido a empresários em nome individual sem trabalhadores.
Imposto: 180 000 − 57 390 − 27 000 = 95 610 ₽.
Com as contribuições, a carga total ≈ 180 mil ₽, ou seja, cerca de 6% da receita.

Calendário
— Os pagamentos por conta da USN fazem-se até 28 de abril, 28 de julho e 28 de outubro. …
— A comunicação do pagamento por conta entrega-se até ao dia 25 do mesmo mês. A próxima, entregue-a até 26/10/2026 (o dia 25 calha a um domingo) e pague até 28/10/2026 o valor dos 9 meses.
— Imposto do ano — até 28/04/2027. Declaração — até 25/04/2027. …

Importante
— Não paga IVA. Em 2026, os empresários em nome individual na USN estão isentos de IVA com receitas até 20 milhões de ₽. Em 2027 o limite passa a 15 milhões de ₽ e em 2028 a 10 milhões de ₽.
…

Se quiser, posso calcular os valores exatos dos pagamentos por conta de cada trimestre. Para isso, envie-me a sua receita de cada trimestre.`,
  },
  can: [
    'Calcula impostos e contribuições com os seus números: regime simplificado sobre as receitas ou sobre «receitas menos despesas», regime de patente, trabalhador independente, regime geral.',
    'Explica o IVA, o imposto sobre os lucros, o imposto sobre o rendimento e as contribuições sociais — incluindo as dos funcionários.',
    'Ajuda na contabilidade e nos documentos: lançamentos, balanço, relato segundo as normas contabilísticas russas (RSBU), documentos de suporte, regras de caixa.',
    'Diz-lhe como responder ao fisco e à segurança social e ajuda, a nível básico, com salários e pessoal.',
    'Procura formas legais de pagar menos e avisa quando uma regra mudou há pouco tempo.',
    'Se a pergunta não for clara, começa por confirmar o regime fiscal e a forma jurídica do negócio.',
  ],
  cannot: [
    'Não entrega declarações nem faz a contabilidade por si. A Anna é consultora, não auditora: as respostas dela têm caráter informativo.',
    'Não sugere esquemas que violem a legislação fiscal.',
    'Não substitui um contabilista ou um advogado numa situação complexa. Se não for possível passar sem eles, a Anna di-lo abertamente.',
  ],
  faq: [
    {
      q: 'A Anna responde segundo a lei de que país?',
      a: 'À partida, segundo a lei russa: a legislação fiscal da Federação Russa e as normas contabilísticas russas (RSBU). Se o seu negócio está noutro país, indique-o — a Anna tem-no em conta.',
    },
    {
      q: 'Posso enviar o extrato ou a declaração em ficheiro?',
      a: 'Sim, em PDF, folha de cálculo ou documento. O ficheiro é lido por inteiro, e a Anna faz as contas com os seus números.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se a Anna já sabe a que se dedica e quanto fatura, não vai ter de o explicar outra vez ao diretor financeiro Vitali.',
    },
    {
      q: 'Quem vê os meus números?',
      a: 'Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default anna;
