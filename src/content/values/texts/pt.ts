import type { ValuesTexts } from '../types';

/**
 * Тест ценностей на португальском (Португалия). Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-13-values-test-languages.md, «Правила переводов».
 */
const pt: ValuesTexts = {
  title: 'Teste de valores de Schwartz online grátis — mapa de valores | Linkeon',
  description:
    'Teste de valores de Schwartz grátis: 30 afirmações, cerca de 5 minutos. O círculo dos 10 valores de Shalom Schwartz, os seus valores dominantes e uma análise com a Ólia.',
  h1: 'Teste de valores de Schwartz online — grátis',
  breadcrumb: 'Teste de valores',
  intro: [
    'Trinta descrições curtas de pessoas diferentes. Indique até que ponto cada uma se parece consigo e verá um círculo com os dez valores básicos: o que está em primeiro lugar para si, o que lhe é mais distante e onde se situam as principais tensões internas.',
    'O teste inspira-se na teoria dos valores básicos do psicólogo social Shalom Schwartz. As respostas ficam no seu dispositivo: o cálculo é feito no próprio navegador e as respostas não são enviadas para o servidor.',
    'O resultado não é uma avaliação nem um diagnóstico, mas um ponto de partida para uma conversa sobre si. Pode continuá-la com a Ólia, a assistente que conduz a exploração de valores.',
  ],
  start: {
    meta: '30 afirmações · cerca de 5 minutos · as respostas ficam no seu dispositivo',
    begin: 'Começar',
    resume: 'Continuar ({done} de {total})',
    restart: 'Recomeçar',
  },
  question: {
    prompt: 'Até que ponto esta pessoa se parece consigo?',
    progress: '{n} de {total}',
    back: 'Voltar',
    scale: [
      'Não se parece nada comigo',
      'Não se parece comigo',
      'Parece-se um pouco',
      'Parece-se em parte',
      'Parece-se comigo',
      'Parece-se muito comigo',
    ],
  },
  statements: {
    selfDirection1: 'Para esta pessoa, a independência é importante: escolher o seu próprio caminho, sem ordens vindas de cima.',
    selfDirection2: 'Esta pessoa gosta de construir, escrever ou inventar algo seu, simplesmente porque isso lhe interessa.',
    selfDirection3: 'Para esta pessoa, é importante pensar pela própria cabeça e chegar às suas próprias conclusões.',
    stimulation1: 'Esta pessoa põe-se a caminho com facilidade: uma cidade desconhecida, um passatempo novo, uma viagem de improviso — tudo isso só lhe dá alegria.',
    stimulation2: 'Para esta pessoa, uma vida sem mudanças nem variedade depressa se torna insossa.',
    stimulation3: 'Esta pessoa sente-se atraída por situações de desfecho incerto: projetos ousados e desafios arriscados.',
    hedonism1: 'Para esta pessoa, é importante que a vida tenha muitas coisas agradáveis: boa comida, descanso, pequenos prazeres.',
    hedonism2: 'Esta pessoa permite-se coisas agradáveis com facilidade, sem precisar de um pretexto.',
    hedonism3: 'Esta pessoa aprecia os prazeres simples: um banho quente, o prato preferido, um serão sem preocupação nenhuma.',
    achievement1: 'Para esta pessoa, é importante crescer naquilo que faz: definir objetivos ambiciosos e alcançá-los.',
    achievement2: 'Para esta pessoa, é importante brilhar pela sua competência diante de quem percebe do assunto.',
    achievement3: 'Esta pessoa quer contar-se entre os melhores da sua área.',
    power1: 'Para esta pessoa, é importante ter influência sobre os outros e decidir como usar o dinheiro e os recursos comuns.',
    power2: 'Para esta pessoa, é importante ter um nível de vida que mostre a sua posição na sociedade.',
    power3: 'Para esta pessoa, é importante ter um estatuto elevado e autoridade, ter peso aos olhos dos outros.',
    security1: 'Esta pessoa opta pela prudência: verificar duas vezes, jogar pelo seguro, não arriscar a saúde.',
    security2: 'Para esta pessoa, é importante viver num país onde as ruas sejam tranquilas e as leis funcionem.',
    security3: 'Para esta pessoa, a estabilidade é importante: um emprego seguro, um pé-de-meia para os dias difíceis, um amanhã previsível.',
    conformity1: 'Para esta pessoa, as regras não são uma formalidade: cumprem-se, quer se goste delas quer não.',
    conformity2: 'Esta pessoa contém-se em público: não levanta a voz nem se permite palavras duras.',
    conformity3: 'Esta pessoa veste-se e comporta-se como se espera no sítio onde está.',
    tradition1: 'Para esta pessoa, os costumes de família — os doces das festas, as histórias dos antepassados, as datas que se assinalam — são algo a preservar.',
    tradition2: 'Para esta pessoa, a fé e as festas religiosas ocupam um lugar importante na vida.',
    tradition3: 'Esta pessoa aceita o destino com serenidade: o que lhe calhou deve ser vivido com dignidade.',
    benevolence1: 'Esta pessoa corre logo a ajudar quando acontece alguma coisa a alguém próximo.',
    benevolence2: 'Esta pessoa é alguém a quem os amigos confiam os seus segredos e que nunca os deixa ficar mal.',
    benevolence3: 'Para esta pessoa, é importante que quem lhe é próximo esteja bem, e para isso não poupa tempo nem esforço.',
    universalism1: 'Esta pessoa preocupa-se com as vítimas de guerras e catástrofes em qualquer parte do mundo e ajuda como pode.',
    universalism2: 'Esta pessoa tenta prejudicar o menos possível a natureza: poupa recursos, não deixa lixo e pensa nas consequências.',
    universalism3: 'Para esta pessoa, é importante que haja lugar no mundo para diferentes opiniões, culturas e modos de vida.',
  },
  values: {
    selfDirection: {
      name: 'Autodireção',
      inMessage: 'a autodireção',
      line: 'liberdade de pensar, escolher e criar o que é seu',
      text: 'A autodireção é a necessidade de pensar pela própria cabeça, escolher o próprio caminho e criar algo seu. Para quem a coloca nos primeiros lugares, regras rígidas e instruções alheias são um espartilho: importa-lhe perceber para que faz cada coisa e deixar nela a sua marca pessoal.',
    },
    stimulation: {
      name: 'Estimulação',
      inMessage: 'a estimulação',
      line: 'novidade, emoções fortes e mudança',
      text: 'A estimulação é a atração pela novidade, pelas emoções fortes e pela mudança. Quando é importante, a pessoa procura novos lugares, ocupações e tarefas, entusiasma-se com facilidade e depressa se cansa da rotina. Uma vida calma e previsível parece-lhe, nesse caso, insossa.',
    },
    hedonism: {
      name: 'Hedonismo',
      inMessage: 'o hedonismo',
      line: 'prazer e alegria de viver',
      text: 'O hedonismo é o valor do prazer e da alegria aqui e agora. Para quem lhe dá importância, a vida não se resume a tarefas e deveres: boa comida, descanso, coisas bonitas e boa companhia valem tanto como os afazeres.',
    },
    achievement: {
      name: 'Realização',
      inMessage: 'a realização',
      line: 'sucesso e reconhecimento pelas competências',
      text: 'A realização é a procura de um sucesso que os outros vejam e reconheçam. Quem tem este valor nos primeiros lugares define objetivos ambiciosos, compara-se com os melhores da sua área e gosta que as suas competências sejam notadas.',
    },
    power: {
      name: 'Poder',
      inMessage: 'o poder',
      line: 'estatuto, influência e recursos',
      text: 'O poder é o valor do estatuto, da influência e dos recursos. Quem lhe dá importância quer ter a situação sob controlo, tomar as decisões e ocupar uma posição que os outros tenham em conta. O dinheiro e a autoridade são, para essa pessoa, uma forma de influenciar o que acontece.',
    },
    security: {
      name: 'Segurança',
      inMessage: 'a segurança',
      line: 'estabilidade, ordem e proteção',
      text: 'A segurança é a necessidade de estabilidade e proteção — para a própria pessoa, para quem lhe é próximo e para a sociedade. Quando está nos primeiros lugares, a pessoa planeia com antecedência, valoriza a fiabilidade e a ordem, evita riscos desnecessários e vai criando reservas para imprevistos.',
    },
    conformity: {
      name: 'Conformidade',
      inMessage: 'a conformidade',
      line: 'contenção e respeito pelas regras',
      text: 'A conformidade é a contenção e o respeito pelas regras aceites no meio em que se vive. Quem tem este valor procura não magoar os outros, cumpre a palavra dada e respeita acordos e normas, mesmo quando apetece agir de outra forma.',
    },
    tradition: {
      name: 'Tradição',
      inMessage: 'a tradição',
      line: 'respeito pelos costumes, pela fé e pelas raízes',
      text: 'A tradição é o respeito pelos costumes, pela fé e pelas raízes da família e da cultura. Quem lhe dá importância apoia-se no que deu provas ao longo de gerações: festas, rituais, modéstia e a capacidade de aceitar a vida tal como é.',
    },
    benevolence: {
      name: 'Benevolência',
      inMessage: 'a benevolência',
      line: 'cuidado e lealdade para com os mais próximos',
      text: 'A benevolência é o cuidado com quem está por perto: a família, os amigos, os colegas. Quem tem este valor nos primeiros lugares é alguém com quem se pode contar, que ajuda e cede de boa vontade pelo bem da relação; a lealdade e a confiança valem mais do que o proveito próprio.',
    },
    universalism: {
      name: 'Universalismo',
      inMessage: 'o universalismo',
      line: 'justiça para todos e cuidado com o mundo',
      text: 'O universalismo é o cuidado com todas as pessoas e com a natureza, e não apenas com os seus. Quem lhe dá importância identifica-se com a justiça, a igualdade, a tolerância para com outras opiniões e o respeito pelo mundo.',
    },
  },
  higherOrder: {
    openness: 'Abertura à mudança',
    selfEnhancement: 'Autopromoção',
    conservation: 'Conservação',
    selfTranscendence: 'Cuidado com os outros',
  },
  axes: {
    change: {
      left: 'Identifica-se mais com a abertura à mudança — autodireção e novidade — do que com a conservação do habitual.',
      right: 'Identifica-se mais com a conservação do habitual — segurança, regras e tradições — do que com a abertura à mudança.',
      balance: 'A abertura à mudança e a conservação do habitual estão em equilíbrio no seu caso: nenhum dos lados pesa visivelmente mais.',
    },
    focus: {
      left: 'O cuidado com os outros — os mais próximos e o mundo à volta — é mais importante para si do que o sucesso pessoal e a influência.',
      right: 'O sucesso pessoal e a influência são mais importantes para si do que o cuidado com os outros e com o mundo à volta.',
      balance: 'O cuidado com os outros e o sucesso pessoal têm para si o mesmo peso.',
    },
  },
  axesInMessage: {
    change: {
      left: 'Identifico-me mais com a mudança do que com a conservação do habitual',
      right: 'Identifico-me mais com a conservação do habitual do que com a mudança',
      balance: 'No meu caso, a mudança e a conservação do habitual estão em equilíbrio',
    },
    focus: {
      left: 'o cuidado com os outros é mais importante para mim do que o sucesso pessoal',
      right: 'o sucesso pessoal é mais importante para mim do que o cuidado com os outros',
      balance: 'o cuidado com os outros e o sucesso pessoal têm para mim o mesmo peso',
    },
  },
  result: {
    heading: 'O seu círculo de valores',
    circleAlt: 'Círculo de valores',
    legend: 'Grupos de valores',
    topHeading: 'Valores dominantes',
    bottomHeading: 'Valor menos importante',
    axesHeading: 'Principais tensões',
    flatHeading: 'Nenhuma prioridade se destacou',
    flatText:
      'Avaliou quase todas as afirmações da mesma forma, por isso não é possível indicar valores dominantes. Experimente fazer o teste outra vez, comparando as descrições entre si — ou descubra com a Ólia o que é realmente importante para si.',
    cta: 'Analisar com a Ólia',
    ctaNote: 'Análise pessoal dos valores com a Ólia — ao registar-se, recebe 25 000 tokens de oferta',
    allHeading: 'Os 10 valores — pela sua ordem',
    restart: 'Repetir o teste',
    tiedWith: 'Com o mesmo resultado: {names}',
    topHeadingOne: 'Valor dominante',
    restEqual: 'Os restantes valores tiveram o mesmo resultado, por isso não é possível indicar o menos importante.',
  },
  modelSection: {
    heading: 'Os dez valores de Schwartz',
    lead: 'Schwartz descreveu dez valores que se encontram em culturas de todo o mundo. Estão dispostos em círculo: os valores vizinhos conciliam-se com facilidade, os opostos puxam em sentidos contrários — por exemplo, a atração pelo novo e o desejo de manter o habitual.',
  },
  faqHeading: 'Perguntas sobre o teste',
  faq: [
    {
      q: 'Quanto tempo demora o teste?',
      a: 'Cerca de cinco minutos: 30 afirmações e, para cada uma, uma resposta numa escala de seis opções. Enquanto o separador estiver aberto, as respostas ficam guardadas nele; por isso, se a página for recarregada sem querer, o progresso não se perde.',
    },
    {
      q: 'É um teste científico?',
      a: 'Tem por base a teoria dos valores básicos de Shalom Schwartz, um dos modelos de valores amplamente estudados em psicologia. Fomos nós que escrevemos as afirmações, inspiradas nessa teoria: não é o questionário oficial PVQ nem um método clínico, mas uma ferramenta de autoconhecimento.',
    },
    {
      q: 'As minhas respostas ficam guardadas?',
      a: 'Não. O cálculo é feito no navegador: as respostas não são enviadas para o servidor nem entram nas estatísticas do site. Ficam guardadas apenas neste separador, para não se perderem se a página for recarregada sem querer.',
    },
    {
      q: 'Porque é que o resultado é uma ordem de valores e não uma pontuação?',
      a: 'Para Schwartz, o que importa não são as notas em si, mas quais os valores que pesam mais do que os outros. Por isso, o teste tem em conta a sua maneira de responder: se der notas altas a todas as afirmações, o círculo mostra na mesma o que, de tudo isso, é mais importante.',
    },
    {
      q: 'O que fazer com o resultado?',
      a: 'Olhe para os valores dominantes e para as principais tensões: onde as suas decisões, o seu tempo e o seu dinheiro coincidem com o que é importante para si — e onde não. Pode analisar isto em pormenor com a Ólia: ela conduz a exploração de valores numa conversa e monta um mapa de valores pessoal.',
    },
  ],
  disclaimer:
    'Teste de autoconhecimento inspirado na teoria dos valores básicos de Shalom Schwartz. Não é um método clínico nem oficial.',
  tiedInMessage: '(com o mesmo resultado: {names})',
  bottomInMessage: 'em último lugar, {bottom}',
  restEqualInMessage: 'os restantes valores estão empatados',
  message:
    'Olá, Ólia! O meu resultado no teste de valores de Schwartz: em primeiro lugar, {top}; {rest}. {axes}. Ajuda-me a perceber o que isto significa para mim',
  messageFlat:
    'Olá, Ólia! No teste de valores de Schwartz, nenhuma prioridade se destacou: avaliei tudo quase da mesma maneira. Ajuda-me a perceber o que é realmente importante para mim',
};

export default pt;
