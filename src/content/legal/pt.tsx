import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Política de Privacidade',
  offer: 'Termos e Condições de Utilização (oferta pública)',
  pdn: 'Consentimento para o tratamento de dados pessoais',
};

export function renderLegal(type: LegalType) {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        A presente versão em português é uma tradução de cortesia. Em caso de divergência,
        prevalece a versão em língua russa, a única juridicamente vinculativa nos termos da
        legislação da Federação da Rússia.
      </div>
      {type === 'offer' && (
        <>
          <div className="text-xs text-gray-500">Versão de 5 de agosto de 2026</div>
          <H3>1. Disposições gerais</H3>
          <P>
            Os presentes Termos e Condições de Utilização regulam as relações entre a administração
            da aplicação LINKEON.IO (adiante designada por «Aplicação») e os utilizadores da
            Aplicação.
          </P>
          <P>
            A Aplicação pertence a <strong>Dmitry Viktorovich Volkov
            (INN 463404496646)</strong>, sujeito passivo do imposto sobre o rendimento profissional
            (trabalhador independente), sendo por ele gerida; adiante designado por «Prestador» ou
            «Administração».
          </P>
          <P>Correio eletrónico de contacto: support@linkeon.io</P>
          <P>
            Os presentes Termos constituem uma oferta pública nos termos do artigo 437.º do Código
            Civil da Federação da Rússia. A utilização da Aplicação implica a aceitação plena e
            incondicional dos presentes Termos.
          </P>

          <H3>2. Finalidade da Aplicação</H3>
          <P>
            A Aplicação destina-se a facultar aos utilizadores o acesso a assistentes de IA
            (marketing, jurídico, contabilidade, recursos humanos, coaching e outros), a funções de
            geração de conteúdos e a um perfil único para fins profissionais e de desenvolvimento
            pessoal.
          </P>

          <H3>3. Registo e conta</H3>
          <P>
            Para utilizar a Aplicação é necessário efetuar o registo através de um número de
            telemóvel. O utilizador compromete-se a prestar informação verdadeira e é responsável
            pela guarda do acesso à sua conta.
          </P>

          <H3>3.1. Restrições de idade</H3>
          <P>
            A Aplicação destina-se exclusivamente a pessoas com idade igual ou superior a 18 anos.
            Ao registar-se, o utilizador confirma que completou 18 anos de idade.
          </P>

          <H3>4. Regras de conduta</H3>
          <P>É vedado aos utilizadores:</P>
          <UL>
            <li>Publicar conteúdos ofensivos, discriminatórios ou ilícitos</li>
            <li>Difundir spam ou publicidade sem o consentimento da administração</li>
            <li>Fazer-se passar por outra pessoa</li>
            <li>Utilizar a Aplicação para fins fraudulentos</li>
            <li>Violar os direitos de outros utilizadores</li>
          </UL>

          <H3>4.1. Serviços pagos e tokens</H3>
          <P>
            A Aplicação disponibiliza serviços gratuitos e serviços pagos. A principal unidade de
            conta são os tokens internos, adquiridos em pacotes através dos sistemas de pagamento
            integrados. O Prestador não trata nem conserva os dados dos cartões bancários. Após o
            pagamento é emitido o respetivo recibo, em conformidade com o exigido pela legislação
            da Federação da Rússia.
          </P>
          <P>
            O saldo de tokens não utilizado à data da eliminação da conta não é reembolsado, salvo
            nos casos previstos no ponto 8.
          </P>

          <H3>5. Propriedade intelectual</H3>
          <P>
            Todos os direitos sobre a Aplicação, incluindo o código-fonte, o design, os logótipos e
            demais materiais, pertencem a Dmitry Viktorovich Volkov. Ao registar-se, o utilizador
            concede ao Prestador uma licença não exclusiva para utilizar os conteúdos por si
            carregados para efeitos de funcionamento do serviço.
          </P>

          <H3>6. Limitação de responsabilidade</H3>
          <P>
            A Aplicação e todas as suas funcionalidades são disponibilizadas «tal como estão»
            (as is), sem quaisquer garantias, expressas ou implícitas. O Prestador não garante um
            funcionamento contínuo e isento de erros, nem a exatidão das respostas dos assistentes
            de IA, nem a adequação dos conselhos à situação concreta do utilizador.
          </P>
          <P>
            A responsabilidade máxima do Prestador está limitada ao montante pago pelo utilizador
            nos últimos 30 dias.
          </P>

          <H3>7. Recomendações de segurança</H3>
          <UL>
            <li>Confirme as recomendações da IA junto de especialistas da área antes de tomar decisões</li>
            <li>Não faculte à Aplicação informação abrangida por segredo de Estado ou segredo comercial</li>
            <li>Comunique à administração qualquer atividade suspeita</li>
          </UL>

          <H3>8. Reembolsos</H3>
          <P>O reembolso das quantias pagas é efetuado APENAS nos seguintes casos:</P>
          <UL>
            <li>Falha técnica com duração superior a 72 horas consecutivas</li>
            <li>Cobrança em duplicado por erro técnico</li>
          </UL>
          <P>
            A reclamação é enviada para o endereço support@linkeon.io e é apreciada no prazo de 10
            dias úteis. O reembolso é efetuado no prazo de 30 dias, deduzidas as comissões dos
            sistemas de pagamento (3–5 %).
          </P>

          <H3>9. Resolução de litígios</H3>
          <P>
            Todos os litígios são resolvidos por negociação, observando-se a fase pré-contenciosa
            obrigatória. Antes de recorrer aos tribunais, o utilizador deve enviar uma reclamação
            escrita para o endereço support@linkeon.io. Não sendo alcançado acordo, os litígios são
            dirimidos judicialmente no foro do domicílio do demandado, em conformidade com a
            legislação da Federação da Rússia.
          </P>

          <H3>10. Alteração dos Termos</H3>
          <P>
            A Administração reserva-se o direito de alterar as condições dos presentes Termos a
            qualquer momento. A continuação da utilização da Aplicação após a introdução de
            alterações significa a concordância do utilizador com as novas condições.
          </P>
        </>
      )}

      {type === 'privacy' && (
        <>
          <div className="text-xs text-gray-500">Versão de 5 de agosto de 2026</div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
            <div className="font-semibold text-gray-900">Responsável pelo tratamento dos dados pessoais</div>
            <div><strong>Nome:</strong> Dmitry Viktorovich Volkov</div>
            <div><strong>INN:</strong> 463404496646</div>
            <div><strong>Estatuto:</strong> sujeito passivo do imposto sobre o rendimento profissional (trabalhador independente)</div>
            <div><strong>Correio eletrónico de contacto:</strong> support@linkeon.io</div>
          </div>
          <P>
            A presente Política de Privacidade aplica-se a todos os dados pessoais que o Responsável
            pelo tratamento possa obter sobre o utilizador durante a utilização da Aplicação
            LINKEON.IO.
          </P>

          <H3>1. Recolha de informação</H3>
          <P>Recolhemos a seguinte informação:</P>
          <UL>
            <li>Número de telemóvel para autenticação</li>
            <li>Nome próprio, apelido e correio eletrónico (a título facultativo)</li>
            <li>Informação sobre a atividade profissional, os objetivos e o contexto introduzida pelo utilizador</li>
            <li>Histórico de mensagens e de interações com os assistentes de IA</li>
            <li>Informação técnica sobre o dispositivo e sobre a utilização da Aplicação</li>
          </UL>

          <H3>1.1. Início de sessão através de serviços de terceiros</H3>
          <P>
            Além do início de sessão por número de telemóvel e por endereço de correio eletrónico,
            a Aplicação permite iniciar sessão através de serviços de terceiros: Google, Yandex,
            Taler ID e Apple.
          </P>
          <P>
            Nesse caso, o Responsável pelo tratamento recebe do serviço escolhido um identificador
            permanente da conta, o endereço de correio eletrónico e a indicação de que esse endereço
            se encontra ou não verificado. A palavra-passe da conta do serviço de terceiros não é
            transmitida ao Responsável pelo tratamento nem é por ele conhecida.
          </P>
          <P>
            A Apple permite ocultar o endereço real. Nesse caso, o Responsável pelo tratamento
            recebe um endereço de reencaminhamento do tipo{' '}
            <strong>***@privaterelay.appleid.com</strong> ou não recebe endereço algum, sendo a
            conta identificada apenas pelo identificador.
          </P>
          <P>
            O endereço obtido é utilizado, entre outros fins, para associar contas: se estiver
            verificado pelo serviço e já for conhecido do Responsável pelo tratamento, o início de
            sessão é feito na conta existente, em vez de ser criada uma nova.
          </P>
          <P>
            O Responsável pelo tratamento não acede ao conteúdo das contas nos serviços de terceiros
            nem nelas pratica atos em nome do utilizador. A lista dos métodos de início de sessão
            associados está disponível na Aplicação; qualquer um deles pode ser desativado, desde
            que não seja o único.
          </P>

          <H3>2. Utilização da informação</H3>
          <UL>
            <li>Prestação e melhoria dos serviços da Aplicação</li>
            <li>Tratamento dos pedidos de IA do utilizador</li>
            <li>Personalização das respostas dos assistentes</li>
            <li>Garantia da segurança e prevenção da fraude</li>
            <li>Comunicação com o utilizador sobre questões relevantes relativas à Aplicação</li>
          </UL>

          <H3>2.1. Tratamento da informação de pagamento</H3>
          <P>
            A Aplicação <strong>NÃO trata NEM conserva</strong> os dados dos cartões bancários
            (número do cartão, data de validade, CVV). Todos os dados de pagamento são tratados
            exclusivamente por agregadores de pagamento certificados em conformidade com a norma
            PCI DSS.
          </P>
          <P>O histórico de pagamentos é conservado durante 5 anos, nos termos da legislação fiscal da Federação da Rússia.</P>

          <H3>3. Tratamento de dados através de inteligência artificial</H3>
          <P>
            Para tratar os pedidos do utilizador, a Aplicação utiliza tecnologias de inteligência
            artificial de fornecedores terceiros:
          </P>
          <UL>
            <li>
              <strong>OpenAI</strong> (ChatGPT, GPT-4, GPT-5) — tratamento de pedidos de texto.
              País de alojamento: EUA
            </li>
            <li>
              <strong>Anthropic</strong> (Claude) — tratamento de pedidos de texto.
              País de alojamento: EUA
            </li>
            <li>
              <strong>Google</strong> (Gemini — tratamento de pedidos e análise da amostra de voz
              carregada; Imagen 4.0 Ultra e Nano Banana — geração de imagens; Veo — geração de
              vídeo). País de alojamento: EUA
            </li>
            <li>
              <strong>ElevenLabs</strong> — criação de um modelo de voz a partir da amostra de voz
              carregada e narração do vídeo com essa voz. País de alojamento: EUA
            </li>
            <li>
              <strong>DeepSeek</strong> — elaboração das mensagens de boas-vindas no chat com os
              assistentes de IA. <strong>País de alojamento: República Popular da China</strong>
            </li>
            <li>
              <strong>Kling (Kuaishou)</strong> — geração e processamento de vídeo.{' '}
              <strong>País de alojamento: República Popular da China</strong>
            </li>
            <li>
              <strong>Yandex SpeechKit</strong> — reconhecimento de fala na introdução por voz.
              País de alojamento: Federação da Rússia
            </li>
            <li>Outros serviços de IA utilizados para funcionalidades específicas da Aplicação</li>
          </UL>
          <P>
            <strong>Dados transmitidos:</strong> o texto dos pedidos e das mensagens do utilizador,
            o histórico do diálogo com o assistente e o contexto do perfil; para as funcionalidades
            de geração, as descrições textuais, bem como as imagens e as gravações áudio carregadas
            pelo utilizador; na introdução por voz, o fluxo áudio do microfone. No âmbito do
            contexto do perfil são transmitidos aos fornecedores de IA o nome próprio e o apelido do
            utilizador, bem como os seus interesses, valores, competências e intenções. O conteúdo
            das conversas e do perfil é transmitido na forma original e não é sujeito a
            anonimização. O identificador do utilizador, o número de telemóvel e os dados de
            pagamento NÃO são transmitidos aos fornecedores de IA.
          </P>
          <P>
            <strong>Clonagem de voz.</strong> Na secção de criação de vídeo, o utilizador pode
            ativar a narração com a sua própria voz. Nesse caso, a amostra áudio da voz por si
            carregada é transmitida à Google (modelo Gemini), para elaborar uma descrição textual da
            voz, e à ElevenLabs, para criar um modelo de voz com o qual é depois narrado o vídeo
            gerado. A amostra é carregada apenas por iniciativa do utilizador e somente mediante a
            confirmação, por este, de um consentimento específico; sem essa confirmação não é
            efetuado qualquer carregamento. O próprio ficheiro áudio da amostra não é conservado
            pelo Responsável pelo tratamento — são conservados o identificador do modelo de voz do
            lado da ElevenLabs e a descrição textual da voz. O utilizador pode eliminar o modelo de
            voz na interface da Aplicação, sendo o mesmo então eliminado também do lado da
            ElevenLabs.
          </P>
          <P>
            Após a transmissão dos dados aos fornecedores de IA, o Responsável pelo tratamento não
            controla o seu tratamento subsequente. Ao utilizar a Aplicação, o utilizador aceita
            expressamente a transmissão dos seus dados para tratamento mediante tecnologias de IA.
          </P>

          <H3>3.1. Transferência internacional de dados pessoais</H3>
          <P>
            Parte dos fornecedores enumerados no ponto 3 encontra-se fora da Federação da Rússia. O
            tratamento dos pedidos do utilizador implica uma transferência internacional de dados
            pessoais na aceção do artigo 12.º da Lei Federal n.º 152-FZ, de 27 de julho de 2006,
            «Sobre os dados pessoais».
          </P>
          <P>
            <strong>Chamamos expressamente a atenção para o facto de parte dos dados do utilizador
            ser transferida para a República Popular da China.</strong> Para a RPC são transferidos:
            o texto das mensagens do utilizador dirigidas ao assistente de IA, juntamente com o
            contexto do seu perfil, na elaboração das mensagens de boas-vindas (fornecedor
            DeepSeek), bem como as descrições textuais, as imagens e as gravações áudio a partir das
            quais o vídeo é criado e processado (fornecedor Kling / Kuaishou). A República Popular
            da China não é parte na Convenção do Conselho da Europa para a Proteção das Pessoas
            relativamente ao Tratamento Automatizado de Dados de Carácter Pessoal, nem consta da
            lista de Estados estrangeiros que asseguram uma proteção adequada dos direitos dos
            titulares dos dados. O nível de proteção jurídica dos dados pessoais na RPC difere do
            estabelecido pela legislação da Federação da Rússia.
          </P>
          <P>
            Além disso, os dados são transferidos para os EUA (OpenAI, Anthropic, Google,
            ElevenLabs), incluindo a amostra áudio da voz do utilizador quando este recorre à
            funcionalidade de narração do vídeo com a própria voz. O reconhecimento de fala na
            introdução por voz é efetuado no território da Federação da Rússia (Yandex SpeechKit).
          </P>
          <P>
            Ao utilizar os assistentes de IA, as funcionalidades de geração de imagens e de vídeo e
            a introdução por voz, o utilizador dá o seu consentimento para essa transferência
            internacional, incluindo a transferência de dados para a RPC. Se a transferência
            internacional lhe for inaceitável, o utilizador deve abster-se de utilizar as
            funcionalidades correspondentes da Aplicação. Não comunique aos assistentes de IA
            informação cuja transferência para fora da Federação da Rússia lhe seja inadmissível.
          </P>

          <H3>4. Comunicação de dados a terceiros</H3>
          <P>Não vendemos nem comunicamos os seus dados pessoais a terceiros, exceto:</P>
          <UL>
            <li>Com o seu consentimento expresso</li>
            <li>Por exigência da legislação da Federação da Rússia</li>
            <li>Para defesa dos nossos direitos e da segurança dos utilizadores</li>
            <li>A prestadores de serviços que atuam por nossa conta (com dever de confidencialidade)</li>
          </UL>

          <H3>5. Segurança dos dados</H3>
          <P>
            Aplicamos tecnologias atuais de cifragem e de segurança (TLS, conservação dos tokens em
            forma protegida). Apenas os colaboradores autorizados têm acesso aos dados pessoais.
          </P>

          <H3>6. Os seus direitos</H3>
          <UL>
            <li>Aceder aos seus dados pessoais</li>
            <li>Retificar dados inexatos</li>
            <li>Eliminar a sua conta e os seus dados</li>
            <li>Limitar o tratamento dos dados</li>
            <li>Retirar o consentimento para o tratamento dos dados</li>
          </UL>

          <H3>7. Conservação dos dados</H3>
          <UL>
            <li><strong>Contas ativas:</strong> por tempo indeterminado, até à eliminação pelo utilizador</li>
            <li><strong>Contas eliminadas:</strong> 30 dias de calendário e, em seguida, eliminação total</li>
            <li><strong>Histórico de pagamentos:</strong> 5 anos (exigência da legislação fiscal da Federação da Rússia)</li>
            <li><strong>Registos de segurança:</strong> 6 meses</li>
            <li><strong>Cópias de segurança:</strong> substituídas a cada 30 dias</li>
          </UL>

          <H3>8. Cookies e análise de tráfego</H3>
          <P>
            No sítio linkeon.io são utilizados cookies, o armazenamento local do navegador
            (localStorage, sessionStorage) e contadores de serviços externos de análise de tráfego e
            de publicidade:
          </P>
          <UL>
            <li>
              <strong>Yandex.Metrica</strong>, contador n.º 105902201 — estatísticas de visitas e
              cumprimento de objetivos. Estão ativados o Webvisor (gravação das ações do utilizador
              na página), o mapa de cliques, o seguimento das ligações externas e a taxa de rejeição
              exata. O script do contador é carregado na primeira ação do utilizador na página
              (deslocamento, toque, movimento do rato, pressão de uma tecla, clique) ou, o mais
              tardar, 6 segundos após o carregamento da página.
            </li>
            <li>
              <strong>VK Ads / top.Mail.Ru</strong>, píxel n.º 3773048 — registo da visita
              (evento pageView) para associar o clique no anúncio à visita ao sítio. O píxel é
              inicializado em cada carregamento da página, sem ação prévia do utilizador e sem
              pedido de consentimento específico.
            </li>
          </UL>
          <P>
            <strong>Telemetria própria.</strong> O sítio linkeon.io transmite ao servidor do
            Responsável pelo tratamento (my.linkeon.io, método /webhook/events/track) os seguintes
            eventos: <em>landing_view</em> — a visita ao sítio; <em>landing_cta_click</em> — a
            pressão do botão de acesso à Aplicação; <em>landing_engagement</em> — o resumo da
            visita. Juntamente com os eventos são transmitidos: o identificador da sessão do
            separador, a origem do acesso (parâmetros utm_* e ref ou o nome de domínio do sítio de
            referência), o nome da campanha publicitária, o endereço da página de referência, o
            tempo de permanência na página, a profundidade máxima de deslocamento, bem como a
            informação sobre se o botão de acesso foi mostrado ao utilizador e se foi premido.
          </P>
          <P>
            <strong>Armazenamento local.</strong> No localStorage do navegador, sob a chave{' '}
            <em>ll_attribution</em>, são guardados os parâmetros de atribuição obtidos do endereço
            da página (utm_source, utm_medium, utm_campaign, utm_term, utm_content, ref), que são
            reutilizados em visitas posteriores. No sessionStorage são guardados o identificador da
            sessão do separador e a marca de que a visita já foi contabilizada.
          </P>
          <P>
            A gestão dos cookies está disponível nas definições do navegador; os dados do
            armazenamento local são eliminados juntamente com os dados do sítio através das
            ferramentas do próprio navegador. A desativação dos cookies e dos contadores de
            terceiros pode limitar o funcionamento de determinadas funcionalidades.
          </P>

          <H3>9. Alterações à Política</H3>
          <P>
            Podemos atualizar a presente Política. Informaremos das alterações substanciais através
            da Aplicação ou por outros meios.
          </P>

          <H3>10. Contactos</H3>
          <P>
            Se tiver questões sobre a presente Política ou sobre o tratamento dos seus dados,
            contacte-nos através do endereço support@linkeon.io.
          </P>
        </>
      )}

      {type === 'pdn' && (
        <>
          <div className="text-xs text-gray-500">Versão de 5 de agosto de 2026</div>
          <P>
            Ao registar-se e utilizar a Aplicação LINKEON.IO, o utilizador dá o seu consentimento a
            Dmitry Viktorovich Volkov (INN 463404496646, correio eletrónico support@linkeon.io),
            adiante designado por «Responsável pelo tratamento», para o tratamento dos seus dados
            pessoais nas condições a seguir indicadas.
          </P>

          <H3>1. Categorias de dados pessoais</H3>
          <UL>
            <li>Número de telemóvel</li>
            <li>Nome próprio, apelido e correio eletrónico (a título facultativo do utilizador)</li>
            <li>Conteúdo das mensagens, dos pedidos e dos parâmetros do perfil profissional introduzidos na Aplicação</li>
            <li>Histórico de interações com os assistentes de IA e registos de sessão</li>
            <li>Imagens e gravações áudio carregadas pelo utilizador, bem como o fluxo áudio do
              microfone quando é utilizada a introdução por voz</li>
            <li>Amostra áudio da própria voz — apenas quando é utilizada a funcionalidade de
              narração do vídeo com a própria voz e somente mediante confirmação específica do consentimento</li>
            <li>Informação técnica sobre o dispositivo e dados dos pagamentos</li>
          </UL>

          <H3>2. Finalidades do tratamento</H3>
          <UL>
            <li>Identificação e autenticação do utilizador</li>
            <li>Execução dos Termos e Condições de Utilização (oferta pública)</li>
            <li>Tratamento dos pedidos de IA e prestação das respostas</li>
            <li>Processamento dos pagamentos e emissão dos recibos</li>
            <li>Apoio ao utilizador e resolução de reclamações</li>
            <li>Análise da utilização e melhoria do serviço (de forma anonimizada)</li>
          </UL>

          <H3>3. Operações realizadas sobre os dados pessoais</H3>
          <P>
            Recolha, registo, organização, acumulação, conservação, atualização (adaptação,
            alteração), extração, utilização, comunicação (cedência, acesso), anonimização, bloqueio,
            eliminação e destruição dos dados pessoais, tanto por meios automatizados como sem
            recurso a estes.
          </P>

          <H3>4. Comunicação de dados a terceiros</H3>
          <P>
            Para o tratamento dos pedidos de IA, os dados pessoais são transmitidos a fornecedores
            terceiros: OpenAI (EUA), Anthropic (EUA), Google (EUA), ElevenLabs (EUA), DeepSeek
            (RPC), Kling / Kuaishou (RPC), Yandex SpeechKit (Federação da Rússia), bem como a outros
            serviços de IA utilizados para funcionalidades específicas da Aplicação.
          </P>
          <P>
            São transmitidos: o texto das mensagens e dos pedidos do utilizador, o histórico do
            diálogo com o assistente, o contexto do perfil (nome próprio, apelido, interesses,
            valores, competências, intenções), as imagens e as gravações áudio carregadas, o fluxo
            áudio na introdução por voz, bem como a amostra áudio da voz quando é utilizada a
            funcionalidade de narração do vídeo com a própria voz. O conteúdo das conversas e do
            perfil é transmitido na forma original e não é sujeito a anonimização. O identificador
            do utilizador e o número de telemóvel não são transmitidos aos fornecedores de IA.
          </P>
          <P>
            A transmissão dos dados de pagamento é feita a agregadores de pagamento certificados
            (YooKassa e outros). Não são comunicados dados pessoais a outros terceiros, salvo nos
            casos expressamente previstos pela legislação da Federação da Rússia.
          </P>

          <H3>4.1. Transferência internacional de dados pessoais, incluindo para a RPC</H3>
          <P>
            Parte dos fornecedores enumerados encontra-se fora da Federação da Rússia, pelo que o
            utilizador dá igualmente o seu consentimento para a transferência internacional dos seus
            dados pessoais (artigo 12.º da Lei Federal n.º 152-FZ, de 27 de julho de 2006, «Sobre os
            dados pessoais»).
          </P>
          <P>
            <strong>Os dados são transferidos, nomeadamente, para a República Popular da
            China:</strong> o texto das mensagens do utilizador, juntamente com o contexto do seu
            perfil, na elaboração das mensagens de boas-vindas (fornecedor DeepSeek); as descrições
            textuais, as imagens e as gravações áudio, na geração e no processamento do vídeo
            (fornecedor Kling / Kuaishou). A República Popular da China não é parte na Convenção do
            Conselho da Europa para a Proteção das Pessoas relativamente ao Tratamento Automatizado
            de Dados de Carácter Pessoal, nem consta da lista de Estados estrangeiros que asseguram
            uma proteção adequada dos direitos dos titulares dos dados; o nível de proteção jurídica
            dos dados pessoais na RPC difere do estabelecido pela legislação da Federação da Rússia.
          </P>
          <P>
            Os dados são igualmente transferidos para os EUA (OpenAI, Anthropic, Google,
            ElevenLabs). A descrição pormenorizada da transferência internacional consta do
            ponto 3.1 da Política de Privacidade.
          </P>

          <H3>5. Prazo de validade do consentimento</H3>
          <P>
            O presente consentimento produz efeitos a partir do momento do registo e até à sua
            retirada pelo utilizador ou à eliminação da conta. O utilizador pode retirar o
            consentimento a qualquer momento, enviando um pedido para support@linkeon.io. A retirada
            implica a eliminação da conta e dos dados nos prazos indicados na Política de
            Privacidade (até 30 dias de calendário).
          </P>

          <H3>6. Direitos do titular dos dados</H3>
          <P>
            O utilizador tem o direito de obter informação sobre as categorias e o tratamento dos
            seus dados, de exigir a sua retificação, bloqueio ou destruição quando estejam
            incompletos, inexatos ou desatualizados, e de impugnar os atos do Responsável pelo
            tratamento junto do Roskomnadzor ou dos tribunais.
          </P>

          <H3>7. Contactos</H3>
          <P>
            Para quaisquer questões relativas ao tratamento de dados pessoais:
            support@linkeon.io. Os pedidos são apreciados no prazo de 30 dias de calendário.
          </P>
        </>
      )}
    </>
  );
}
