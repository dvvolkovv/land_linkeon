import type { HdTexts } from '../types';

/**
 * Калькулятор Human Design на португальском (европейском). Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-14-hd-calculator-languages.md, «Правила переводов»;
 * термины — docs/hd-calculator/glossary-languages.md.
 */
const pt: HdTexts = {
  title: 'Calculadora de Human Design grátis — bodygraph online | Linkeon',
  description:
    'Calcule o seu Human Design (Desenho Humano) grátis e sem registo: bodygraph pela data, hora e cidade de nascimento — tipo, estratégia, autoridade e perfil, com descrições curtas.',
  h1: 'Calculadora de Human Design online — bodygraph grátis',
  breadcrumb: 'Calculadora de Human Design',
  intro: [
    'Para construir o bodygraph, são precisas a data, a hora exata e a cidade de nascimento. A calculadora mostra o tipo, a estratégia, a autoridade, o perfil e a definição e, mais abaixo, os centros e os canais. Cada parte tem uma descrição curta: como costuma manifestar-se nas pessoas.',
    'O Human Design descreve a pessoa através de um esquema com nove centros, 64 portas e 36 canais. O que nele está definido depende da posição do Sol, da Lua, dos nodos lunares e dos planetas no momento do nascimento e cerca de 88 dias antes. Daí resultam o tipo, a estratégia e a autoridade — indicações sobre a forma mais fácil de a pessoa tomar decisões e gerir a sua energia.',
    'Aqui, o Human Design é uma ferramenta de autoconhecimento, não uma previsão: as descrições falam de tendências, não de acontecimentos, e o melhor é pô-las à prova na própria experiência. O mapa é calculado diretamente no navegador e sem registo: a data, a hora e a cidade de nascimento não são enviadas para o servidor.',
  ],
  form: {
    heading: 'Os seus dados de nascimento',
    date: 'Data de nascimento',
    time: 'Hora de nascimento',
    timeHint: 'A hora é obrigatória: sem ela, o tipo pode sair diferente.',
    city: 'Cidade de nascimento',
    cityPlaceholder: 'Comece a escrever a cidade',
    cityHint: 'Se a sua cidade não estiver na lista, escolha a cidade grande mais próxima no mesmo fuso horário.',
    cityLoading: 'A carregar a lista de cidades…',
    cityLoadError: 'Não foi possível carregar a lista de cidades. Verifique a ligação e clique novamente no campo.',
    cityNotFound: 'Esta cidade não está na lista — escolha a cidade grande mais próxima no mesmo fuso horário.',
    zoneLine: '{city}, {offset} na data de nascimento',
    zoneUnknown: 'O navegador não conhece o fuso horário desta cidade — escolha uma cidade grande vizinha.',
    dstGap: 'Nessa noite, os relógios foram adiantados e a hora {time} não existiu. Como foi registada a hora de nascimento?',
    dstAmbiguous: 'Nessa noite, os relógios foram atrasados e a hora {time} ocorreu duas vezes. Qual das duas?',
    dstBefore: 'Antes da mudança da hora ({offset})',
    dstAfter: 'Depois da mudança da hora ({offset})',
    dstChoose: 'Escolha: antes ou depois da mudança da hora.',
    missing: 'Preencha a data e a hora e escolha uma cidade da lista.',
    futureDate: 'Verifique a data: tem de estar entre 1900 e hoje.',
    submit: 'Calcular',
  },
  result: {
    heading: 'O seu bodygraph',
    dataLine: '{date}, {time}, {city} ({offset})',
    bodygraphLabel: 'Bodygraph: {type}. Centros definidos: {centers}',
    bodygraphLabelEmpty: 'Bodygraph: {type}. Centros definidos: nenhum',
    legendPersonality: 'Personalidade — momento do nascimento',
    legendDesign: 'Desenho — cerca de 88 dias antes do nascimento',
    typeLabel: 'Tipo',
    strategyLabel: 'Estratégia',
    authorityLabel: 'Autoridade',
    profileLabel: 'Perfil',
    definitionLabel: 'Definição',
    definedCenters: 'Centros definidos',
    noDefinedCenters: 'Não há centros definidos',
    openCenters: 'Centros abertos',
    noOpenCenters: 'Não há centros abertos',
    channels: 'Canais',
    noChannels: 'Não há canais definidos',
    cta: 'Analisar com a Raya',
    ctaNote: 'Análise pessoal e experiência de 7 dias com a Raya — ao registar-se, recebe 25 000 tokens de oferta',
  },
  types: {
    generator: {
      name: 'Gerador',
      strategy: 'Esperar para responder',
      text: 'O Gerador tem o Centro Sacral definido — uma reserva estável de energia para o que o entusiasma. A estratégia é «esperar para responder»: em vez de começar do zero à força de vontade, esperar que a vida proponha algo — uma pergunta, um pedido, uma tarefa — e escutar se surge por dentro um «sim» claro. O que se escolhe pela resposta interior costuma trazer satisfação; o que se faz contra ela, frustração e cansaço.',
    },
    manifestingGenerator: {
      name: 'Gerador Manifestante',
      strategy: 'Esperar para responder e informar antes de agir',
      text: 'O Gerador Manifestante tem o Centro Sacral definido, e a sua energia liga-se ao Centro da Garganta e passa depressa à ação. A estratégia é esperar por um «sim» claro ao que a vida propõe e, antes de agir, avisar brevemente quem a decisão vai afetar. Estas pessoas têm muitas vezes várias coisas em mãos ao mesmo tempo e saltam etapas, voltando depois ao que ficou para trás.',
    },
    manifestor: {
      name: 'Manifestador',
      strategy: 'Informar antes de agir',
      text: 'No Manifestador, o Centro Sacral está aberto, mas outra fonte de energia (Centro do Coração, Plexo Solar ou Centro da Raiz) liga-se ao Centro da Garganta; por isso, pode tomar a iniciativa sem esperar que a vida proponha algo. A estratégia «informar antes de agir» é avisar brevemente quem a decisão afetará. Não é pedir licença: assim os outros costumam resistir menos, e o Manifestador sente menos raiva e mais paz.',
    },
    projector: {
      name: 'Projetor',
      strategy: 'Esperar pelo convite',
      text: 'No Projetor, o Centro Sacral está aberto e, ao contrário do Gerador, costuma faltar energia estável para trabalho longo. Em compensação, tem muitas vezes um olhar certeiro sobre os outros: vê como funcionam pessoas e processos e o que há a melhorar. A estratégia «esperar pelo convite» vale para o que é grande — trabalho, relações, mudança de casa: um conselho não pedido é muitas vezes ignorado; a convite, cai bem.',
    },
    reflector: {
      name: 'Refletor',
      strategy: 'Esperar um ciclo lunar — cerca de 28 dias',
      text: 'No Refletor, os nove centros estão abertos — é um tipo raro. Estas pessoas refletem com subtileza o meio à sua volta: pelo seu bem-estar pode ver-se como está a família ou a equipa, por isso importa-lhes muito com quem e onde vivem e trabalham. As decisões importantes tomam-se melhor sem pressa, vivendo com a questão cerca de 28 dias: nesse tempo a Lua percorre as 64 portas, e a decisão mostra-se de vários ângulos.',
    },
  },
  authorities: {
    emotional: {
      name: 'Emocional (Plexo Solar)',
      inMessage: 'autoridade emocional',
      text: 'A autoridade emocional é de todos os que têm o Plexo Solar definido, sejam quais forem os outros centros definidos. As emoções vêm em onda, da subida à descida, e em qualquer ponto dela uma decisão pode parecer óbvia. A clareza costuma chegar quando a onda acalma; por isso, nas decisões importantes ajuda «consultar a almofada» e ver se a resposta se mantém um ou dois dias depois.',
    },
    sacral: {
      name: 'Sacral',
      inMessage: 'autoridade sacral',
      text: 'A autoridade sacral existe nos Geradores e nos Geradores Manifestantes quando o Plexo Solar está aberto. A resposta chega de imediato e de dentro — um «sim» ou um «não» claros, às vezes um som como «ahã» ou «ã-ã», antes de a mente ter tempo de intervir. Esta resposta ouve-se melhor quando a pergunta é simples e se pode responder com uma só palavra.',
    },
    splenic: {
      name: 'Esplénica',
      inMessage: 'autoridade esplénica',
      text: 'A autoridade esplénica existe quando o Centro Esplénico está definido e o Plexo Solar e o Centro Sacral estão abertos. É um instinto silencioso do momento: dá sinal uma vez, de imediato, e não se repete. É fácil abafá-lo com raciocínios; por isso, a quem tem esta autoridade convém confiar na primeira sensação, sobretudo quando se trata de segurança e do que é adequado agora mesmo.',
    },
    ego: {
      name: 'Ego (Centro do Coração)',
      inMessage: 'autoridade do ego',
      text: 'A autoridade do ego existe quando o Centro do Coração está definido e o Plexo Solar, o Centro Sacral e o Centro Esplénico estão abertos. A decisão testa-se com uma pergunta simples: a pessoa quer mesmo isto e o que vai ganhar com isso? No Manifestador, a resposta costuma ouvir-se no que diz espontaneamente; no Projetor, esclarece-se em conversa com pessoas em quem confia.',
    },
    selfProjected: {
      name: 'Autoprojetada',
      inMessage: 'autoridade autoprojetada',
      text: 'A autoridade autoprojetada existe nos Projetores cujo Centro G definido está ligado ao Centro da Garganta, com o Plexo Solar, o Centro Esplénico e o Centro do Coração abertos. A clareza vem da própria voz: falar da questão em voz alta com alguém de confiança e ouvir as próprias palavras. O interlocutor não está lá para aconselhar, mas para ouvir, e a resposta certa costuma soar a «isto tem a ver comigo».',
    },
    mental: {
      name: 'Mental (ambiental)',
      inMessage: 'autoridade mental',
      text: 'A autoridade mental existe nos Projetores que só têm definidos o Centro da Cabeça, o Centro Ajna e o Centro da Garganta, ou parte deles. Não há um sinal interior de «sim» ou «não», e a clareza vem de fora: de conversas com várias pessoas de confiança e de como a pessoa se sente em cada lugar. Convém não apressar as decisões: com o tempo, ouve-se nas próprias palavras o que é certo.',
    },
    lunar: {
      name: 'Lunar',
      inMessage: 'autoridade lunar',
      text: 'A autoridade lunar é exclusiva dos Refletores: não há centros definidos nem um sinal interior constante. O que é importante decide-se melhor ao longo de um ciclo lunar, cerca de 28 dias: falar da questão com várias pessoas, notar como a atitude perante ela muda de dia para dia e esperar até a resposta estabilizar. A pressa costuma atrapalhar, e o tempo ajuda a ver a questão por inteiro.',
    },
  },
  profiles: {
    '1/3': {
      name: 'Investigador / Mártir',
      text: 'A primeira linha procura apoio no conhecimento: antes de agir, quer perceber as bases. A terceira testa tudo na própria experiência, por tentativa e erro. Juntas, dão alguém que primeiro estuda e depois experimenta na prática, e para quem os fracassos são mais descobertas do que derrotas: é assim que fica a saber em que pode realmente apoiar-se.',
    },
    '1/4': {
      name: 'Investigador / Oportunista',
      text: 'A primeira linha procura apoio no conhecimento: a pessoa sente-se mais segura quando percebe as bases. A quarta assenta nas pessoas: as oportunidades costumam chegar através de conhecidos, amigos e colegas. Com este perfil, faz sentido estudar a fundo o que interessa e partilhá-lo com o seu círculo — é aí que costumam dar-lhe ouvidos.',
    },
    '2/4': {
      name: 'Eremita / Oportunista',
      text: 'A segunda linha é um talento natural que a própria pessoa muitas vezes não nota, e a necessidade de estar só, de se dedicar ao que é seu longe dos olhares alheios. A quarta liga-a às pessoas: é o círculo próximo que costuma ver esse talento e chamá-la a mostrá-lo. Com este perfil, faz sentido guardar tempo para si e responder aos convites de quem conhece.',
    },
    '2/5': {
      name: 'Eremita / Herege',
      text: 'A segunda linha é um talento natural e a necessidade de recolhimento. A quinta atrai as expectativas dos outros: desta pessoa espera-se muitas vezes uma solução prática, ou até que salve a situação num momento difícil. Acontece ser chamada a ajudar mais vezes do que gostaria; por isso, com este perfil, faz sentido guardar tempo para si e aceitar só o que está realmente ao seu alcance.',
    },
    '3/5': {
      name: 'Mártir / Herege',
      text: 'A terceira linha aprende com a experiência: experimenta, erra e descobre o que funciona. A quinta atrai as expectativas dos outros: da pessoa esperam-se soluções práticas. Nesta combinação, os erros tornam-se a experiência de onde nascem essas soluções, e o hábito de não prometer mais do que testou em si mesma protege a reputação.',
    },
    '3/6': {
      name: 'Mártir / Modelo',
      text: 'A terceira linha aprende com a experiência, por tentativa e erro. A sexta costuma descrever-se em três fases: na juventude, muitas tentativas, como na terceira linha; depois, um tempo a observar de fora; mais tarde, ser exemplo para os outros. Quem tem este perfil costuma acumular muita experiência, e com o tempo dela nascem muitas vezes uma serenidade e uma sabedoria que servem de referência aos outros.',
    },
    '4/6': {
      name: 'Oportunista / Modelo',
      text: 'A quarta linha assenta nas pessoas: amigos e conhecidos são a principal fonte de oportunidades e de apoio. A sexta costuma descrever-se em três fases: primeiro, muitas tentativas; depois, um olhar de fora; mais tarde, uma experiência que serve de referência aos outros. Quem tem este perfil é muitas vezes ouvido no seu círculo, sobretudo quando vive como fala.',
    },
    '4/1': {
      name: 'Oportunista / Investigador',
      text: 'A quarta linha assenta nas pessoas do seu círculo; a primeira, num conhecimento sólido. Quem tem este perfil tende a manter o seu rumo: muda a contragosto sob pressão alheia e costuma preferir encontrar o seu meio a adaptar-se ao dos outros. Bases firmes tornam muitas vezes estas pessoas um apoio seguro para quem está por perto.',
    },
    '5/1': {
      name: 'Herege / Investigador',
      text: 'A quinta linha atrai as expectativas dos outros: da pessoa espera-se uma solução prática. A primeira dá solidez a essas soluções: antes de propor algo, a pessoa estuda as bases. Quem tem este perfil é muitas vezes chamado quando as coisas se complicam, e a sua reputação assenta em soluções testadas e que funcionam.',
    },
    '5/2': {
      name: 'Herege / Eremita',
      text: 'A quinta linha atrai as expectativas dos outros: espera-se que a pessoa encontre uma saída. A segunda é um talento natural e a necessidade de recolhimento. Às vezes chamam a pessoa para resolver problemas alheios precisamente quando ela quer estar só; por isso, com este perfil, faz sentido escolher a que apelos responder e guardar tempo para si.',
    },
    '6/2': {
      name: 'Modelo / Eremita',
      text: 'A sexta linha costuma descrever-se em três fases: na juventude, muitas tentativas e erros; depois, um tempo a observar de fora; mais tarde, ser exemplo para os outros. A segunda acrescenta um talento natural e a necessidade de recolhimento. Quem tem este perfil mantém-se muitas vezes um pouco à parte, e são os outros que reparam no seu exemplo e no seu talento.',
    },
    '6/3': {
      name: 'Modelo / Mártir',
      text: 'A sexta linha costuma descrever-se em três fases: primeiro, muitas tentativas; depois, um olhar de fora; mais tarde, ser exemplo para os outros. A terceira acrescenta tentativas e erros também nas fases seguintes, por isso a experiência de quem tem este perfil raramente é tranquila. Em compensação, dela nasce muitas vezes uma sabedoria prática e vivida, que os outros valorizam precisamente por ter sido testada.',
    },
  },
  definitions: {
    none: {
      name: 'Sem definição',
      text: 'Só acontece no Refletor: nenhum canal está definido. A definição surge apenas temporariamente — vinda das pessoas por perto e do movimento da Lua. Por isso, nenhum dia é igual ao outro. O tempo ajuda a separar o que é seu do que veio de fora.',
    },
    single: {
      name: 'Singular',
      text: 'Todos os centros definidos estão ligados entre si num só grupo. Quem tem esta definição costuma ter uma sensação estável de inteireza: não precisa de ninguém que o «complete» e processa a informação sozinho e com bastante rapidez. Às vezes custa-lhe perceber porque é que os outros precisam de mais tempo para o mesmo.',
    },
    split: {
      name: 'Bipartida',
      text: 'Os centros definidos formam dois grupos separados, e entre eles parece faltar uma ponte. Pode haver a sensação de que falta alguma coisa e uma atração por pessoas que constroem essa ponte: ao lado delas, tudo se junta num todo. As decisões costumam ganhar com tempo, o suficiente para as duas partes se entenderem.',
    },
    triple: {
      name: 'Tripartida',
      text: 'Os centros definidos formam três grupos separados. Quem tem esta definição costuma precisar de mais tempo para pensar em tudo e beneficia de um convívio variado: em lugares cheios de gente e em movimento, as várias partes parecem ligar-se. Sem apressar as decisões, o olhar torna-se multifacetado e ponderado.',
    },
    quadruple: {
      name: 'Quadripartida',
      text: 'Os centros definidos formam quatro grupos separados — uma combinação rara. Quem tem esta definição costuma processar a experiência devagar e a fundo, e a pressa mais atrapalha do que ajuda. Convém decidir sem pressão, dando-se tempo; as opiniões formadas assim costumam ser estáveis e pouco mudam sob influência alheia.',
    },
  },
  centers: {
    head: {
      name: 'Centro da Cabeça',
      defined:
        'um fluxo constante de perguntas e ideias que vem de dentro: a cabeça costuma ter em que pensar. Quem o tem definido inspira muitas vezes os outros, e quem está ao seu lado também começa a fazer perguntas.',
      open: 'as perguntas e a inspiração vêm de outras pessoas e intensificam-se ao lado delas. Às vezes a pessoa dá voltas à cabeça com perguntas alheias, e então convém perguntar-se quais são realmente suas.',
    },
    ajna: {
      name: 'Ajna',
      defined:
        'uma forma estável de pensar: as opiniões e conclusões seguem uma lógica interna própria e pouco dependem do interlocutor. Quem o tem definido costuma ter confiança na forma como entende as coisas, e pode custar-lhe aceitar que a lógica dos outros funciona de outra maneira.',
      open: 'uma mente flexível, que vê com facilidade uma questão de vários ângulos e experimenta pontos de vista alheios. Pode haver a tentação de fingir uma certeza que não existe, embora o ponto forte aqui seja precisamente a abertura a várias opiniões.',
    },
    throat: {
      name: 'Centro da Garganta',
      defined:
        'uma forma constante e reconhecível de falar e de se manifestar nas ações. Quem o tem definido normalmente não precisa de conquistar atenção, e o modo como soa depende dos centros a que este centro está ligado.',
      open: 'a maneira de falar muda consoante as pessoas por perto, e pode surgir a vontade de falar primeiro para ser notado. As palavras destas pessoas costumam ter mais peso quando são os outros a dirigir-se a elas.',
    },
    g: {
      name: 'Centro G (identidade)',
      defined:
        'uma sensação estável de si e da sua direção: estas pessoas costumam saber quem são e para onde vão, e isso pouco depende do meio. Ao seu lado, os outros sentem muitas vezes com mais facilidade o próprio caminho.',
      open: 'a sensação de si e da direção é flexível e depende muito do lugar e das pessoas à volta. Por isso, para estas pessoas é especialmente importante onde e com quem vivem e trabalham: o meio certo indica por si a direção.',
    },
    heart: {
      name: 'Centro do Coração (ego)',
      defined:
        'um acesso constante à força de vontade e ao sentido do próprio valor. Estas pessoas costumam conseguir prometer e cumprir quando algo lhes importa de verdade, mas a força de vontade, para durar, também precisa de pausas.',
      open: 'a força de vontade é inconstante, e o valor da pessoa não depende de quanto conseguiu obrigar-se a fazer. Às vezes a pessoa faz promessas para provar alguma coisa, e então cumpri-las torna-se especialmente pesado.',
    },
    spleen: {
      name: 'Centro Esplénico',
      defined:
        'um instinto constante que, no momento, indica o que é seguro e o que convém. Fala baixo e uma só vez, e a sensação estável de bem-estar de quem o tem definido é muitas vezes sentida também por quem está por perto.',
      open: 'sensibilidade ao estado dos outros: a pessoa repara facilmente em quem, à sua volta, está inquieto. Pode haver tendência para se agarrar ao que é conhecido — pessoas, relações, hábitos — mesmo quando já não lhe faz bem, só porque assim há mais sossego.',
    },
    solarPlexus: {
      name: 'Plexo Solar',
      defined:
        'um ritmo próprio das emoções: as subidas e descidas chegam ao seu tempo e nem sempre têm a ver com o que acontece à volta. O estado de espírito de quem o tem definido transmite-se visivelmente a quem está por perto.',
      open: 'uma sensibilidade subtil às emoções dos outros: perto das pessoas, as emoções intensificam-se e parecem próprias. Às vezes a pessoa evita conflitos e conversas desagradáveis para não ser apanhada na tempestade alheia.',
    },
    sacral: {
      name: 'Centro Sacral',
      defined:
        'uma força vital e de trabalho que se renova quando se gosta do que se faz. Quem o tem definido costuma contagiar os outros com energia: ao seu lado, também é mais fácil meter mãos à obra.',
      open: 'não há acesso constante à energia de trabalho, e ao lado de quem tem o Centro Sacral definido parece haver mais energia do que realmente há. Convém a estas pessoas perceber quando já chega e não medir a sua carga pela de quem tem este centro definido.',
    },
    root: {
      name: 'Centro da Raiz',
      defined:
        'uma pressão interior estável que ajuda a pegar nas tarefas e a cumprir prazos. Quem o tem definido costuma suportar a pressa e a tensão com calma e trabalhar ao seu ritmo.',
      open: 'sensibilidade à pressão e à pressa à volta: a tensão alheia amplifica-se e sente-se como própria. Às vezes a pessoa apressa-se a acabar tudo só para se livrar da tensão, embora muita coisa possa esperar.',
    },
  },
  channels: {
    '1-8': {
      name: 'Inspiração',
      text: 'liga o Centro G ao Centro da Garganta: a singularidade da pessoa procura expressão na palavra e na ação. Quem tem este canal inspira muitas vezes os outros não com conselhos, mas por fazer tudo à sua maneira, e o seu contributo criativo é mais bem recebido quando a própria pessoa foi notada e convidada.',
    },
    '2-14': {
      name: 'A batida',
      text: 'liga o Centro G ao Centro Sacral: quem tem este canal tem energia para seguir a sua direção, mesmo que seja diferente da dos outros. Muitas vezes define o rumo e encontra recursos para aquilo em que acredita, e os outros vão atrás.',
    },
    '3-60': {
      name: 'Mutação',
      text: 'liga o Centro da Raiz ao Centro Sacral: a energia chega por impulsos, e nas pausas pode haver melancolia e não se saber para onde ir. Mas é dessas pausas que, em quem tem este canal, nasce muitas vezes algo realmente novo, se tiver tempo para amadurecer, sem pressa.',
    },
    '4-63': {
      name: 'Lógica',
      text: 'liga o Centro da Cabeça ao Centro Ajna: a dúvida leva a procurar padrões e respostas lógicas. Quem tem este canal costuma notar onde um raciocínio não bate certo, e as suas conclusões são especialmente úteis quando postas à prova na prática, e não aceites de olhos fechados.',
    },
    '5-15': {
      name: 'Ritmo',
      text: 'liga o Centro Sacral ao Centro G: quem tem este canal costuma ter um ritmo natural próprio — a que passo trabalhar, descansar e começar algo novo. Quando vive nesse ritmo, e não num horário imposto, as coisas correm melhor, e ao seu lado os outros também encontram o próprio ritmo.',
    },
    '6-59': {
      name: 'Intimidade',
      text: 'liga o Plexo Solar ao Centro Sacral: é uma energia de aproximação, que ajuda a quebrar o gelo e a criar confiança. Para quem tem este canal, a intimidade costuma ser importante, e ao seu lado os outros abrem-se com mais facilidade, sobretudo se os sentimentos não forem apressados.',
    },
    '7-31': {
      name: 'O Alfa',
      text: 'liga o Centro G ao Centro da Garganta: aqui está uma liderança que assenta no reconhecimento. Quem tem este canal é muitas vezes escolhido para liderar, e a sua influência é maior quando foi convidado a conduzir do que quando assumiu esse papel por si.',
    },
    '9-52': {
      name: 'Concentração',
      text: 'liga o Centro da Raiz ao Centro Sacral: a energia concentra-se num ponto, e a pessoa consegue manter a atenção no que faz e nos detalhes durante muito tempo e com calma. Quando a atividade é escolhida pela resposta interior, essa concentração traz satisfação; sem nada para fazer, transforma-se muitas vezes em inquietação.',
    },
    '10-20': {
      name: 'Despertar',
      text: 'liga o Centro G ao Centro da Garganta: aqui importa ser quem se é agora mesmo, falar e agir segundo as próprias convicções. Quem tem este canal desperta muitas vezes os outros não com sermões, mas com o exemplo de como se pode viver à sua maneira.',
    },
    '10-34': {
      name: 'Exploração',
      text: 'liga o Centro G ao Centro Sacral: a energia serve para viver segundo as próprias convicções. Quem tem este canal costuma seguir o seu caminho e tolera mal ordens alheias, e a sua independência, quando nasce da resposta interior e não da teimosia, pode servir de exemplo aos outros.',
    },
    '10-57': {
      name: 'Forma aperfeiçoada',
      text: 'liga o Centro G ao Centro Esplénico: a intuição do momento indica como agir para continuar a ser quem se é. Quem tem este canal tem muitas vezes sentido de forma e de estilo, e dá-se melhor confiando no instinto interior do que num plano pensado de antemão.',
    },
    '11-56': {
      name: 'Curiosidade',
      text: 'liga o Centro Ajna ao Centro da Garganta: ideias e impressões transformam-se em histórias. Quem tem este canal procura muitas vezes o novo pelo prazer da procura, e as suas histórias despertam nos outros ideias em que apetece pensar.',
    },
    '12-22': {
      name: 'Abertura',
      text: 'liga o Plexo Solar ao Centro da Garganta: as emoções procuram saída nas palavras, na entoação, na criação. Muito depende do estado de espírito: no momento certo, quem tem este canal consegue tocar os outros com a palavra; sem disposição, é-lhe mais cómodo ficar calado.',
    },
    '13-33': {
      name: 'O pródigo',
      text: 'liga o Centro G ao Centro da Garganta: é a capacidade de ouvir, guardar na memória e depois refletir sobre o vivido — o próprio e o alheio. A quem tem este canal confiam-se muitas vezes histórias e segredos, e depois de uma pausa e de algum recolhimento a sua experiência transforma-se em conclusões úteis para os outros.',
    },
    '16-48': {
      name: 'O comprimento de onda',
      text: 'liga o Centro Esplénico ao Centro da Garganta: aqui a profundidade do conhecimento encontra a capacidade de o mostrar. Em quem tem este canal, a mestria costuma crescer com a repetição e a prática, e os outros podem notar um talento bem trabalhado sem palavras a mais.',
    },
    '17-62': {
      name: 'Aceitação',
      text: 'liga o Centro Ajna ao Centro da Garganta: os pensamentos tornam-se opiniões apoiadas em factos e detalhes. Quem tem este canal costuma explicar e organizar bem, e a sua opinião é aceite com mais gosto quando lha pedem.',
    },
    '18-58': {
      name: 'Julgamento',
      text: 'liga o Centro da Raiz ao Centro Esplénico: aqui há um impulso insaciável de notar o que se pode corrigir e alegria quando algo fica melhor. Quem tem este canal vê muitas vezes os pontos fracos em projetos e sistemas, e as suas observações são mais úteis quando foram pedidas do que quando soam a censura.',
    },
    '19-49': {
      name: 'Síntese',
      text: 'liga o Centro da Raiz ao Plexo Solar: é a sensibilidade àquilo de que as pessoas precisam — proximidade, um teto, sentir que pertencem. Quem tem este canal dá valor aos princípios e a uma troca justa nas relações, e é muitas vezes o primeiro a notar o que falta a cada um.',
    },
    '20-34': {
      name: 'Carisma',
      text: 'liga o Centro Sacral ao Centro da Garganta: a energia passa logo à ação, sem longa preparação. Quem tem este canal costuma estar ocupado e agir depressa, e a rapidez ajuda quando a tarefa foi escolhida pela resposta interior e não apenas por estar à mão.',
    },
    '20-57': {
      name: 'A onda cerebral',
      text: 'liga o Centro Esplénico ao Centro da Garganta: a intuição dispara de imediato e encontra logo as palavras. Quem tem este canal capta muitas vezes o essencial de uma situação antes dos outros, e a sua primeira impressão costuma revelar-se certeira, se não for vencida por raciocínios.',
    },
    '21-45': {
      name: 'A linha do dinheiro',
      text: 'liga o Centro do Coração ao Centro da Garganta: aqui está a vontade de gerir recursos e de garantir que nada falta aos seus. Quem tem este canal costuma fazer questão de gerir a sua parte do trabalho e organiza bem os outros quando esse papel lhe é reconhecido.',
    },
    '23-43': {
      name: 'Estruturação',
      text: 'liga o Centro Ajna ao Centro da Garganta: lampejos inesperados procuram palavras claras. A quem tem este canal chegam muitas vezes ideias à frente do seu tempo, e é mais fácil ouvi-las quando quem escuta perguntou e a explicação é simples.',
    },
    '24-61': {
      name: 'Consciência',
      text: 'liga o Centro da Cabeça ao Centro Ajna: a mente volta uma e outra vez ao mesmo enigma até chegar a compreensão. Quem tem este canal pode ter dificuldade em largar uma questão, e o lampejo costuma chegar sozinho, em silêncio, e não sob pressão.',
    },
    '25-51': {
      name: 'Iniciação',
      text: 'liga o Centro G ao Centro do Coração, daí o desejo de ser o primeiro e a coragem de entrar no desconhecido. Abanões e viragens bruscas tornam-se muitas vezes, para quem tem este canal, o início de algo novo, e o seu exemplo pode dar aos outros o empurrão para o próprio passo.',
    },
    '26-44': {
      name: 'A transmissão',
      text: 'liga o Centro Esplénico ao Centro do Coração: o instinto indica aquilo de que as pessoas precisam agora, e a vontade ajuda a fazê-lo chegar até elas. Quem tem este canal costuma ter jeito para negociar: sabe apresentar uma ideia de forma a que a queiram aceitar e lembra-se do que resultou antes.',
    },
    '27-50': {
      name: 'Preservação',
      text: 'liga o Centro Sacral ao Centro Esplénico: é uma energia de cuidado — o desejo de proteger e apoiar os seus e de guardar o que lhes é valioso. Quem tem este canal assume muitas vezes a responsabilidade por muitos, e convém-lhe escolher de quem cuidar, para não carregar mais do que quer.',
    },
    '28-38': {
      name: 'Luta',
      text: 'liga o Centro da Raiz ao Centro Esplénico: aqui há persistência na procura de sentido. Quem tem este canal está pronto a lutar pelo que lhe importa, e as dificuldades mais o fortalecem do que o detêm — se a luta for pela sua causa e não pela luta em si.',
    },
    '29-46': {
      name: 'Descoberta',
      text: 'liga o Centro Sacral ao Centro G: se o «sim» nasceu da resposta interior, há energia para viver a experiência até ao fim. Quem tem este canal consegue muitas vezes o que quer onde outros desistem, por isso importa-lhe muito aquilo a que diz «sim».',
    },
    '30-41': {
      name: 'Reconhecimento',
      text: 'liga o Centro da Raiz ao Plexo Solar: aqui há desejos fortes, com sonhos por trás, e sede de novas vivências. Quem tem este canal costuma tirar mais de uma experiência se entrar nela quando a emoção já acalmou, e não no pico.',
    },
    '32-54': {
      name: 'Transformação',
      text: 'liga o Centro da Raiz ao Centro Esplénico: aqui há ambição e faro para o que vai durar. Quem tem este canal costuma querer subir e mudar a sua posição, e avança com mais facilidade quando os outros notam e apoiam o seu esforço.',
    },
    '34-57': {
      name: 'Poder',
      text: 'liga o Centro Sacral ao Centro Esplénico: força e intuição atuam juntas e no momento. Quem tem este canal reage muitas vezes a uma situação antes de ter tempo de pensar nela, e essa reação, quando vem da resposta interior, costuma ser certeira.',
    },
    '35-36': {
      name: 'Transitoriedade',
      text: 'liga o Plexo Solar ao Centro da Garganta: é a atração por novas impressões e pela experiência em si. Quem tem este canal quer experimentar muita coisa, e os altos e as desilusões vividos transformam-se com o tempo numa sabedoria que partilha.',
    },
    '37-40': {
      name: 'Comunidade',
      text: 'liga o Centro do Coração ao Plexo Solar: é o canal dos acordos — quem faz o quê pela causa comum e o que recebe em troca. Para quem tem este canal, contam a lealdade e uma troca justa, e também tempo para si, para recuperar forças.',
    },
    '39-55': {
      name: 'Emoção',
      text: 'liga o Centro da Raiz ao Plexo Solar: aqui o estado de espírito muda muito e com frequência, e dessas mudanças nasce muitas vezes a criatividade. Quem tem este canal não precisa de procurar fora a causa de cada tristeza: o estado de espírito pode chegar e partir sozinho.',
    },
    '42-53': {
      name: 'Maturação',
      text: 'liga o Centro da Raiz ao Centro Sacral: é a energia dos ciclos — começar, atravessar e concluir. Para quem tem este canal, é importante levar até ao fim o que começou, e a experiência vivida por inteiro torna-se, para si e para os outros, fonte de maturidade.',
    },
    '47-64': {
      name: 'Abstração',
      text: 'liga o Centro da Cabeça ao Centro Ajna: na cabeça giram imagens e memórias até delas surgir um sentido. Quem tem este canal conhece a confusão que, com o tempo, se transforma sozinha em clareza, e as suas conclusões sobre o vivido podem ser valiosas para os outros.',
    },
  },
  typesSection: {
    heading: 'Os cinco tipos de Human Design',
    lead: 'O tipo depende dos centros que estão definidos e de como estão ligados entre si. Nenhum tipo é melhor do que outro: cada um tem a sua estratégia — uma indicação de como é mais fácil começar as coisas e tomar decisões, gastando menos energia em resistências.',
  },
  faqHeading: 'Perguntas',
  faq: [
    {
      q: 'Porque é necessária a hora exata de nascimento?',
      a: 'A Lua move-se depressa e passa para a porta vizinha em cerca de meio dia. Com a mudança de porta, podem surgir ou desaparecer canais — e então mudam os centros definidos e, às vezes, o tipo e a autoridade. O perfil depende das linhas do Sol: o Sol move-se mais devagar, mas perto do limite de uma linha bastam algumas horas para mudar o perfil. Se a hora só for conhecida aproximadamente, calcule duas ou três variantes: pode apoiar-se no que coincidir em todas.',
    },
    {
      q: 'A minha cidade não está na lista — o que fazer?',
      a: 'Escolha a cidade grande mais próxima no mesmo fuso horário, de preferência da mesma região: os limites dos fusos mudaram ao longo do tempo. A cidade só serve para saber o fuso e a hora de verão no ano de nascimento: com eles, a hora local de nascimento é convertida para UTC. As coordenadas não entram no cálculo, por isso uma cidade vizinha no mesmo fuso dá o mesmo mapa, e um erro de uma hora no fuso equivale a um erro de uma hora na hora de nascimento.',
    },
    {
      q: 'Os meus dados ficam guardados?',
      a: 'Não. O mapa é calculado no seu navegador: a data, a hora e a cidade de nascimento não são enviadas para o servidor, e ao recarregar a página o formulário fica vazio. Se carregar em «Analisar com a Raya», o rascunho da mensagem com esses dados fica à espera no seu navegador enquanto entra na Linkeon e é apagado assim que aparecer no campo da mensagem ou quando sair da conta. A Raya só os vê se lhe enviar a mensagem.',
    },
    {
      q: 'Em que é diferente da análise com a Raya?',
      a: 'A calculadora é gratuita e funciona sem registo: constrói o mapa e descreve como cada parte costuma manifestar-se nas pessoas. A Raya analisa o mapa como um todo: como as partes se ligam entre si e o que isso significa na prática. Responde a perguntas e propõe uma experiência de 7 dias, e também explica a cruz de encarnação e analisa os mapas de pessoas próximas. Para falar com a Raya, é preciso entrar na Linkeon; ao registar-se, recebe 25 000 tokens de oferta.',
    },
    {
      q: 'Porque é que outro site mostrou um resultado diferente?',
      a: 'Antes de mais, compare a diferença em relação ao UTC na data de nascimento — aqui, aparece por baixo do campo da cidade. Na mesma cidade, o fuso e as regras da hora de verão variaram ao longo dos anos, e nem todos os sites têm isso em conta; um erro de uma hora desloca a Lua e, com ela, às vezes os canais e o tipo. Outra razão é o nodo lunar: usamos o verdadeiro, e com o médio os nodos podem cair noutra linha e, raramente, noutra porta. E um planeta mesmo no limite de uma linha pode ser colocado por programas diferentes em lados diferentes desse limite.',
    },
  ],
  disclaimer:
    'O Human Design é uma ferramenta de autoconhecimento: não é uma previsão nem substitui um médico, um advogado ou um consultor financeiro.',
  credits: 'Cidades e fusos horários —',
  licenses: 'Licenças de componentes de terceiros',
  message:
    'Olá, Raya! Os meus dados de nascimento: {date}, {time}, {city} ({offset}). A calculadora mostrou: {type}, perfil {profile}, {authority}. Conta-me o que isto significa para mim',
};

export default pt;
