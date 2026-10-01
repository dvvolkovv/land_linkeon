import type { AssistantPageText } from '../../types';

/**
 * Дмитрий — технический директор. Перевод pages/ru/dmitry.ts.
 *
 * В первой ситуации русское «шесть миллионов» (рублей) передано как «um
 * orçamento avultado»: без валюты португалец прочёл бы шесть миллионов евро, а
 * рубли вне примера на нерусской странице не пишем.
 */
const dmitry: AssistantPageText = {
  title: 'CTO em outsourcing: diretor técnico externo — Dmitri | Linkeon',
  description:
    'O Dmitri é um assistente de IA no papel de diretor técnico em outsourcing. Revê o orçamento do fornecedor e diz-lhe se deve contratar programadores ou usar um serviço já feito.',
  h1: 'Dmitri — diretor técnico em outsourcing para quem não é programador',
  lead: 'Precisa de desenvolver alguma coisa e não faz ideia de quanto deve custar. O Dmitri propõe duas ou três opções, da mais barata à mais robusta, e diz-lhe o preço a pagar pela opção barata.',
  card: 'Arquitetura, prazos e orçamentos, fornecedores, primeiros programadores. Fala de decisões e das suas consequências, não de jargão.',
  cta: 'Falar com o Dmitri',
  situations: [
    'O fornecedor pede três meses e um orçamento avultado, e não percebe o que disso é justificado.',
    'Precisa do primeiro programador para a equipa e não sabe como o avaliar na entrevista.',
    'O site foi abaixo na sexta à noite e descobriu-se que ninguém fazia cópias de segurança.',
    'O fornecedor deixou de responder e o código e os acessos ao servidor ficaram com ele.',
    'Os programadores dizem que «é preciso reescrever tudo» e não sabe se deve acreditar.',
  ],
  example: {
    question:
      'Quero uma app de marcações para o meu salão. Contrato programadores ou uso um serviço já feito?',
    answer: `Opte por um serviço já feito. Não compensa encomendar um desenvolvimento próprio para um único salão: vai pagar centenas de vezes mais e ficar com um produto pior do que os que já existem no mercado.

Opções

DIKIDI
Prazo de arranque — 1 dia
Custo — Tem plano gratuito; os pagos custam a partir de algumas centenas de ₽/mês
Contrapartida — Pouca análise de dados e pouca automatização. …

YCLIENTS (o padrão no setor da beleza na Rússia)
Prazo de arranque — 2–5 dias
Custo — Cerca de 1 500–5 000 ₽/mês para 1–3 profissionais
Contrapartida — Paga todos os meses. Há muitas definições, e na primeira semana vai ter de aprender a usá-las

App própria por encomenda
Prazo de arranque — 4–8 meses
Custo — 1,5–4 milhões de ₽ de desenvolvimento + 50–150 mil ₽/mês de manutenção
Contrapartida — Dinheiro, tempo e dependência do fornecedor. …

Os preços dos serviços são indicativos e os planos mudam. Antes de escolher, confirme-os nos sites.

…

O principal risco
Toda a base de clientes vai ficar guardada no serviço. Confirme logo que dá para a exportar para Excel: se der, não fica preso ao serviço para sempre. Uma vez por mês, faça a exportação — é a sua cópia de segurança.

O que fazer esta semana: registe-se no DIKIDI e no YCLIENTS (em período experimental) e crie nos dois os seus serviços e profissionais. Envie o link de marcação a 5–10 clientes habituais e veja onde lhes é mais fácil marcar. Ao fim de uma semana, fique com o serviço de que mais gostou.

Quantos profissionais tem? Disso depende o plano a escolher.`,
  },
  can: [
    'Analisa cadernos de encargos e propostas de fornecedores: o que na estimativa é justificado e o que não é.',
    'Compara opções — serviço já feito, no-code, desenvolvimento próprio — em prazo, ordem de grandeza do custo e riscos. Se um serviço já feito chegar, di-lo, mesmo que tenha perguntado como desenvolver.',
    'Ajuda a montar a equipa: quem contratar primeiro, equipa interna ou outsourcing, como avaliar um programador quando não é programador.',
    'Ajuda com fornecedores: caderno de encargos, aceitação do trabalho, direitos sobre o código e acessos, parte técnica do contrato.',
    'Trata da dívida técnica, da fiabilidade e da segurança: o que corrigir já e o que pode esperar, o que fazer quando tudo vai abaixo, como guardar dados pessoais e a quem dar acessos.',
  ],
  cannot: [
    'Não faz passar uma estimativa de prazos por promessa: qualquer estimativa é um intervalo com pressupostos, e o Dmitri diz o que a pode deitar por terra.',
    'Não substitui uma auditoria de segurança nem garante proteção. Diz onde estão os riscos e o que os reduz a baixo custo.',
    'Não gere o projeto em seu lugar: distribuir tarefas pelos programadores e aceitar o trabalho cabe-lhe a si.',
    'Não faz as vezes do advogado nem do consultor financeiro: a redação jurídica do contrato é com o Alexei, o retorno do investimento com o Vitali.',
  ],
  faq: [
    {
      q: 'É preciso perceber de tecnologia?',
      a: 'Não. O Dmitri fala de decisões e das suas consequências, e quando um termo técnico é inevitável, explica-o entre parênteses.',
    },
    {
      q: 'Posso enviar o caderno de encargos ou o orçamento do fornecedor?',
      a: 'Sim, em PDF ou documento. O ficheiro é lido por inteiro. O Dmitri diz-lhe o que na estimativa é justificado, o que falta e o que o contrato deve incluir do lado técnico.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se o Andrei já sabe a que se dedica o seu negócio, não vai ter de o explicar outra vez ao Dmitri.',
    },
  ],
};

export default dmitry;
