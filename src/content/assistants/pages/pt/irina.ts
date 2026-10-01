import type { AssistantPageText } from '../../types';

/**
 * Ирина — карьера самого человека. Перевод pages/ru/irina.ts. Не рекрутер: по
 * инструкции вакансий не подбирает и людей на работу не ищет. Найм, вакансии и
 * вопросы к собеседованию на этой странице не обещать.
 */
const irina: AssistantPageText = {
  title: 'Orientação de carreira com IA: mudar de profissão — Irina | Linkeon',
  description:
    'A Irina, orientadora de carreira online e assistente de IA da Linkeon, ajuda a perceber que caminho seguir para mudar de profissão: pontos fortes, motivações, valores no trabalho.',
  h1: 'Irina — orientadora de carreira online: mudar de profissão e orientação vocacional para adultos',
  lead: 'Tem vontade de sair do emprego, mas não sabe para onde ir. A Irina faz uma pergunta de cada vez e ajuda a perceber o que no trabalho lhe dava energia, o que lha tirava e que caminho daí resulta.',
  card: 'Analisa a sua experiência, os seus pontos fortes e motivações e ajuda a perceber para onde levar a sua vida profissional.',
  cta: 'Falar com a Irina',
  situations: [
    'Muitos anos na mesma profissão, cada vez menos energia para ela, e não sabe o que fazer em vez disso.',
    'Querem promovê-lo a um cargo de chefia, mas não tem a certeza de que quer gerir pessoas.',
    'Tem currículo, mas não consegue explicar em que é forte nem porque saiu dos empregos anteriores.',
    'Pensa trocar o escritório pelo trabalho freelance ou por um negócio próprio e quer perceber se esse formato é para si.',
    'Vai voltar a trabalhar depois de uma longa pausa e não sabe por onde começar.',
    'Mudou três vezes de emprego em dois anos e quer perceber o que correu mal de cada vez.',
  ],
  example: {
    question:
      'Trabalho há oito anos como contabilista e sinto-me esgotada. Quero mudar de profissão, mas não sei para onde ir.',
    answer: `Obrigada por partilhar. Oito anos na mesma profissão são muita experiência. O esgotamento muitas vezes não indica que «não está no sítio certo», mas sim que algo importante no trabalho deixou de a alimentar.

Não vamos ter pressa em escolher uma nova profissão. Primeiro, vamos perceber o que exatamente a esgota e o que continua a dar-lhe energia. Assim o caminho fica mais claro, e não leva o mesmo cansaço para o sítio novo.

Comecemos por uma pergunta simples:

Lembre-se do último ano ou dois de trabalho. Houve tarefas ou momentos em que sentiu interesse, envolvimento, ou simplesmente que «o tempo voava»? Quais foram?

Se quase não houve momentos assim, diga-o. Isso também é importante.`,
  },
  can: [
    'Analisa a sua experiência uma pergunta de cada vez: que tarefas lhe davam energia, o que o cansava, porque mudou de emprego.',
    'Ajuda a ver os seus pontos fortes — competências profissionais e qualidades pessoais — sem juízos nem rótulos.',
    'Esclarece o que o move no trabalho e o que claramente não lhe serve: valores, motivações, ambiente de trabalho, forma de lidar com as pessoas.',
    'Se enviar o currículo, destaca as competências-chave e pergunta pelo que lá não se vê: porque tomou esta ou aquela decisão.',
    'Faz o balanço: o seu retrato como profissional e algumas direções a considerar — funções e regime de trabalho.',
  ],
  cannot: [
    'Não é recrutadora: não procura ofertas de emprego nem ajuda a contratar pessoas. A Irina trabalha com a sua própria carreira.',
    'Não decide por si. Propõe direções a considerar, mas a escolha continua a ser sua.',
    'Não substitui um psicólogo ou um médico: se o cansaço dura há meses e afeta a saúde, é motivo para os procurar.',
  ],
  faq: [
    {
      q: 'Como decorre a conversa?',
      a: 'A Irina faz uma pergunta de cada vez e primeiro ouve: sobre o último emprego, sobre as tarefas que lhe davam energia e sobre o que o cansava. Depois esclarece pormenores e junta tudo num retrato: pontos fortes, motivações, o que não lhe serve e que direções vale a pena considerar.',
    },
    {
      q: 'É preciso currículo?',
      a: 'Não. Se tiver currículo, envie-o em ficheiro — a Irina começa por ele e pergunta pelo que lá não se vê. Se não tiver, começa pela sua experiência mais recente e pelos seus objetivos.',
    },
    {
      q: 'Em que é que a Irina é diferente de um recrutador?',
      a: 'O recrutador procura uma pessoa para uma vaga. A Irina faz o caminho inverso: ajuda a perceber que trabalho é o certo para si. Ofertas de emprego não propõe.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Quem vê as minhas respostas?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se já explorou os seus valores com a Ólia, a Irina não vai ter de começar do zero. Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default irina;
