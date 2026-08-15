import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Política de Privacidad',
  offer: 'Condiciones de Uso (oferta pública)',
  pdn: 'Consentimiento para el tratamiento de datos personales',
};

export function renderLegal(type: LegalType) {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        La presente versión en español es una traducción de cortesía. En caso de discrepancia,
        prevalecerá la versión en ruso, que es la única jurídicamente vinculante conforme a la
        legislación de la Federación de Rusia.
      </div>
      {type === 'offer' && (
        <>
          <div className="text-xs text-gray-500">Versión de 5 de agosto de 2026</div>
          <H3>1. Disposiciones generales</H3>
          <P>
            Las presentes Condiciones de Uso regulan las relaciones entre la administración de la
            aplicación LINKEON.IO (en adelante, la «Aplicación») y los usuarios de la Aplicación.
          </P>
          <P>
            La Aplicación pertenece a <strong>Dmitry Viktorovich Volkov
            (INN 463404496646)</strong>, contribuyente del impuesto sobre la renta profesional
            (trabajador autónomo), y es gestionada por él; en adelante, el «Prestador» o la
            «Administración».
          </P>
          <P>Correo electrónico de contacto: support@linkeon.io</P>
          <P>
            Las presentes Condiciones constituyen una oferta pública con arreglo al artículo 437
            del Código Civil de la Federación de Rusia. El uso de la Aplicación implica la
            aceptación plena e incondicional de las presentes Condiciones.
          </P>

          <H3>2. Finalidad de la Aplicación</H3>
          <P>
            La Aplicación tiene por objeto facilitar a los usuarios el acceso a asistentes de IA
            (marketing, jurídico, contabilidad, recursos humanos, coaching y otros), a funciones
            de generación de contenido y a un perfil único para tareas de negocio y desarrollo
            personal.
          </P>

          <H3>3. Registro y cuenta</H3>
          <P>
            Para utilizar la Aplicación es necesario registrarse mediante un número de teléfono.
            El usuario se compromete a facilitar información veraz y es responsable de la
            custodia del acceso a su cuenta.
          </P>

          <H3>3.1. Restricciones de edad</H3>
          <P>
            La Aplicación está destinada exclusivamente a personas mayores de 18 años. Al
            registrarse, el usuario confirma que ha cumplido los 18 años.
          </P>

          <H3>4. Normas de conducta</H3>
          <P>Queda prohibido a los usuarios:</P>
          <UL>
            <li>Publicar contenidos ofensivos, discriminatorios o ilícitos</li>
            <li>Difundir spam o publicidad sin el consentimiento de la administración</li>
            <li>Hacerse pasar por otra persona</li>
            <li>Utilizar la Aplicación con fines fraudulentos</li>
            <li>Vulnerar los derechos de otros usuarios</li>
          </UL>

          <H3>4.1. Servicios de pago y tokens</H3>
          <P>
            La Aplicación presta tanto servicios gratuitos como servicios de pago. La unidad de
            cuenta principal son los tokens internos, que se adquieren por paquetes a través de
            los sistemas de pago integrados. El Prestador no trata ni almacena los datos de las
            tarjetas bancarias. Tras el pago se remite el justificante correspondiente conforme a
            lo exigido por la legislación de la Federación de Rusia.
          </P>
          <P>
            El saldo de tokens no utilizado en el momento de la supresión de la cuenta no se
            reembolsa, salvo en los supuestos previstos en el apartado 8.
          </P>

          <H3>4.2. Moderación y tolerancia cero</H3>
          <P>El Operador aplica una política de <strong>tolerancia cero</strong> frente a los contenidos ofensivos y a los usuarios que incurren en abusos. Dichos contenidos se eliminan y los infractores son bloqueados sin aviso previo.</P>
          <P>Se puede denunciar un contenido o a otro usuario directamente en la Aplicación: en las conversaciones y en el perfil del usuario hay un menú con las opciones «Denunciar» y «Bloquear». El bloqueo surte efecto de inmediato e impide que el usuario bloqueado le escriba.</P>
          <P>El Operador se compromete a examinar la denuncia recibida, eliminar el contenido infractor y bloquear al infractor <strong>en un plazo de 24 horas</strong> desde la recepción de la denuncia.</P>
          <P>Además, las infracciones pueden comunicarse a support@linkeon.io.</P>
          <H3>5. Propiedad intelectual</H3>
          <P>
            Todos los derechos sobre la Aplicación, incluidos el código fuente, el diseño, los
            logotipos y demás materiales, pertenecen a Dmitry Viktorovich Volkov. Al registrarse,
            el usuario otorga al Prestador una licencia no exclusiva para utilizar el contenido
            cargado con la finalidad de hacer funcionar el servicio.
          </P>

          <H3>6. Limitación de responsabilidad</H3>
          <P>
            La Aplicación y todas sus funciones se prestan «tal cual» (as is), sin garantías de
            ningún tipo, expresas o implícitas. El Prestador no garantiza un funcionamiento
            continuo y libre de errores, la exactitud de las respuestas de los asistentes de IA
            ni la aplicabilidad de los consejos a la situación concreta del usuario.
          </P>
          <P>
            La responsabilidad máxima del Prestador se limita al importe abonado por el usuario
            durante los últimos 30 días.
          </P>

          <H3>7. Recomendaciones de seguridad</H3>
          <UL>
            <li>Contraste las recomendaciones de la IA con especialistas cualificados antes de tomar decisiones</li>
            <li>No facilite a la Aplicación información constitutiva de secreto de Estado o secreto comercial</li>
            <li>Comunique a la administración cualquier actividad sospechosa</li>
          </UL>

          <H3>8. Devolución de importes</H3>
          <P>La devolución de los importes abonados se efectúa ÚNICAMENTE en los siguientes casos:</P>
          <UL>
            <li>Fallo técnico de más de 72 horas consecutivas</li>
            <li>Doble cargo por error técnico</li>
          </UL>
          <P>
            La reclamación se remite al correo support@linkeon.io y se examina en un plazo de 10
            días hábiles. La devolución se efectúa en un plazo de 30 días, deducidas las
            comisiones de los sistemas de pago (3–5%).
          </P>

          <H3>9. Resolución de conflictos</H3>
          <P>
            Todos los conflictos se resolverán mediante negociación, observando el trámite previo
            obligatorio a la vía judicial. Antes de acudir a los tribunales, el usuario deberá
            remitir una reclamación por escrito al correo support@linkeon.io. De no alcanzarse un
            acuerdo, los conflictos se resolverán en vía judicial en el domicilio del demandado,
            conforme a la legislación de la Federación de Rusia.
          </P>

          <H3>10. Modificación de las Condiciones</H3>
          <P>
            La Administración se reserva el derecho de modificar las condiciones del presente
            acuerdo en cualquier momento. El uso continuado de la Aplicación tras la introducción
            de modificaciones implica la conformidad del usuario con las nuevas condiciones.
          </P>
        </>
      )}

      {type === 'privacy' && (
        <>
          <div className="text-xs text-gray-500">Versión de 5 de agosto de 2026</div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
            <div className="font-semibold text-gray-900">Responsable del tratamiento de datos personales</div>
            <div><strong>Nombre:</strong> Dmitry Viktorovich Volkov</div>
            <div><strong>INN:</strong> 463404496646</div>
            <div><strong>Condición:</strong> contribuyente del impuesto sobre la renta profesional (trabajador autónomo)</div>
            <div><strong>Correo electrónico de contacto:</strong> support@linkeon.io</div>
          </div>
          <P>
            La presente Política de Privacidad se aplica a todos los datos personales que el
            Responsable pueda obtener del usuario durante el uso de la Aplicación LINKEON.IO.
          </P>

          <H3>1. Recogida de información</H3>
          <P>Recogemos la siguiente información:</P>
          <UL>
            <li>Número de teléfono para la autenticación</li>
            <li>Nombre, apellidos y correo electrónico (de forma voluntaria)</li>
            <li>Información sobre el negocio, los objetivos y el contexto introducida por el usuario</li>
            <li>Historial de mensajes e interacciones con los asistentes de IA</li>
            <li>Información técnica sobre el dispositivo y el uso de la Aplicación</li>
          </UL>

          <H3>1.1. Inicio de sesión a través de servicios de terceros</H3>
          <P>
            Además del inicio de sesión con número de teléfono y con dirección de correo
            electrónico, la Aplicación permite iniciar sesión a través de servicios de terceros:
            Google, Yandex, Taler ID y Apple.
          </P>
          <P>
            En tal caso, el Responsable recibe del servicio elegido un identificador permanente de
            la cuenta, la dirección de correo electrónico y la indicación de si dicha dirección
            está verificada. La contraseña de la cuenta del servicio de terceros no se transmite
            al Responsable y este no la conoce.
          </P>
          <P>
            Apple permite ocultar la dirección real. En ese caso, el Responsable recibe una
            dirección de reenvío del tipo <strong>***@privaterelay.appleid.com</strong> o bien no
            recibe dirección alguna, y la cuenta se identifica únicamente por su identificador.
          </P>
          <P>
            La dirección obtenida se utiliza, entre otros fines, para vincular cuentas: si está
            verificada por el servicio y el Responsable ya la conoce, el inicio de sesión se
            realiza en la cuenta existente en lugar de crear una nueva.
          </P>
          <P>
            El Responsable no accede al contenido de las cuentas en servicios de terceros ni
            realiza en ellas actuaciones en nombre del usuario. La lista de métodos de inicio de
            sesión vinculados está disponible en la Aplicación; cualquiera de ellos puede
            desactivarse siempre que no sea el único.
          </P>

          <H3>2. Uso de la información</H3>
          <UL>
            <li>Prestación y mejora de los servicios de la Aplicación</li>
            <li>Tratamiento de las solicitudes de IA del usuario</li>
            <li>Personalización de las respuestas de los asistentes</li>
            <li>Garantía de la seguridad y prevención del fraude</li>
            <li>Comunicación con el usuario sobre cuestiones relevantes relativas a la Aplicación</li>
          </UL>

          <H3>2.1. Tratamiento de la información de pago</H3>
          <P>
            La Aplicación <strong>NO trata NI almacena</strong> los datos de las tarjetas
            bancarias (número de tarjeta, fecha de caducidad, CVV). Todos los datos de pago son
            tratados exclusivamente por agregadores de pago certificados conforme al estándar
            PCI DSS.
          </P>
          <P>El historial de pagos se conserva durante 5 años conforme a la legislación tributaria de la Federación de Rusia.</P>

          <H3>3. Tratamiento de datos mediante inteligencia artificial</H3>
          <P>
            Para tratar las solicitudes del usuario, la Aplicación utiliza tecnologías de
            inteligencia artificial de proveedores externos:
          </P>
          <UL>
            <li>
              <strong>OpenAI</strong> (ChatGPT, GPT-4, GPT-5) — tratamiento de solicitudes de
              texto. País de alojamiento: EE. UU.
            </li>
            <li>
              <strong>Anthropic</strong> (Claude) — tratamiento de solicitudes de texto.
              País de alojamiento: EE. UU.
            </li>
            <li>
              <strong>Google</strong> (Gemini — tratamiento de solicitudes y análisis de la
              muestra de voz cargada; Imagen 4.0 Ultra y Nano Banana — generación de imágenes;
              Veo — generación de vídeo). País de alojamiento: EE. UU.
            </li>
            <li>
              <strong>ElevenLabs</strong> — creación de un modelo de voz a partir de la muestra
              de voz cargada y locución del vídeo con esa voz. País de alojamiento: EE. UU.
            </li>
            <li>
              <strong>DeepSeek</strong> — elaboración de los mensajes de bienvenida en el chat
              con los asistentes de IA. <strong>País de alojamiento: República Popular China</strong>
            </li>
            <li>
              <strong>Kling (Kuaishou)</strong> — generación y procesamiento de vídeo.{' '}
              <strong>País de alojamiento: República Popular China</strong>
            </li>
            <li>
              <strong>Yandex SpeechKit</strong> — reconocimiento del habla en la entrada por voz.
              País de alojamiento: Federación de Rusia
            </li>
            <li>Otros servicios de IA empleados para funciones concretas de la Aplicación</li>
          </UL>
          <P>
            <strong>Datos transmitidos:</strong> el texto de las solicitudes y los mensajes del
            usuario, el historial de la conversación con el asistente y el contexto del perfil;
            para las funciones de generación, las descripciones textuales, así como las imágenes
            y las grabaciones de audio cargadas por el usuario; en la entrada por voz, el flujo de
            audio del micrófono. Como parte del contexto del perfil se transmiten a los
            proveedores de IA el nombre y los apellidos del usuario, así como sus intereses,
            valores, competencias e intenciones. El contenido de la conversación y del perfil se
            transmite en su forma original y no se somete a anonimización. El identificador del
            usuario, el número de teléfono y los datos de pago NO se transmiten a los proveedores
            de IA.
          </P>
          <P>
            <strong>Clonación de voz.</strong> En la sección de creación de vídeo el usuario puede
            activar la locución con su propia voz. En ese caso, la muestra de audio de su voz que
            haya cargado se transmite a Google (modelo Gemini), para elaborar una descripción
            textual de la voz, y a ElevenLabs, para crear un modelo de voz con el que después se
            locuta el vídeo generado. La muestra se carga únicamente por iniciativa del usuario y
            solo previa confirmación por su parte de un consentimiento específico; sin dicha
            confirmación no se realiza carga alguna. El archivo de audio de la muestra no lo
            conserva el Responsable: se conservan el identificador del modelo de voz en
            ElevenLabs y la descripción textual de la voz. El usuario puede eliminar el modelo de
            voz desde la interfaz de la Aplicación, en cuyo caso también se elimina en
            ElevenLabs.
          </P>
          <P>
            Una vez transmitidos los datos a los proveedores de IA, el Responsable no controla su
            tratamiento posterior. Al utilizar la Aplicación, el usuario acepta expresamente la
            transmisión de sus datos para su tratamiento mediante tecnologías de IA.
          </P>

          <H3>3.1. Transferencia internacional de datos personales</H3>
          <P>
            Parte de los proveedores enumerados en el apartado 3 se encuentran fuera de la
            Federación de Rusia. El tratamiento de las solicitudes del usuario conlleva una
            transferencia internacional de datos personales en el sentido del artículo 12 de la
            Ley Federal n.º 152-FZ, de 27 de julio de 2006, «Sobre los datos personales».
          </P>
          <P>
            <strong>Le advertimos expresamente: parte de los datos del usuario se transfiere a la
            República Popular China.</strong> A la RPC se transfieren: el texto de los mensajes
            del usuario dirigidos al asistente de IA junto con el contexto de su perfil, en la
            elaboración de los mensajes de bienvenida (proveedor DeepSeek), así como las
            descripciones textuales, las imágenes y las grabaciones de audio a partir de las
            cuales se crea y se procesa el vídeo (proveedor Kling / Kuaishou). La República
            Popular China no es parte del Convenio del Consejo de Europa para la protección de
            las personas con respecto al tratamiento automatizado de datos de carácter personal
            ni figura en la lista de Estados extranjeros que garantizan una protección adecuada
            de los derechos de los interesados. El nivel de protección jurídica de los datos
            personales en la RPC difiere del establecido por la legislación de la Federación de
            Rusia.
          </P>
          <P>
            Además, los datos se transfieren a EE. UU. (OpenAI, Anthropic, Google, ElevenLabs),
            incluida la muestra de audio de la voz del usuario cuando se utiliza la función de
            locución del vídeo con la propia voz. El reconocimiento del habla en la entrada por
            voz se realiza en el territorio de la Federación de Rusia (Yandex SpeechKit).
          </P>
          <P>
            Al utilizar los asistentes de IA, las funciones de generación de imágenes y de vídeo
            y la entrada por voz, el usuario presta su consentimiento a dicha transferencia
            internacional, incluida la transferencia de datos a la RPC. Si la transferencia
            internacional le resulta inaceptable, el usuario deberá abstenerse de utilizar las
            funciones correspondientes de la Aplicación. No comunique a los asistentes de IA
            información cuya transferencia fuera de la Federación de Rusia le resulte
            inadmisible.
          </P>

          <H3>4. Comunicación de datos a terceros</H3>
          <P>No vendemos ni comunicamos sus datos personales a terceros, salvo:</P>
          <UL>
            <li>Con su consentimiento expreso</li>
            <li>Por exigencia de la legislación de la Federación de Rusia</li>
            <li>Para proteger nuestros derechos y la seguridad de los usuarios</li>
            <li>A prestadores de servicios que actúan por cuenta nuestra (con obligación de confidencialidad)</li>
          </UL>

          <H3>5. Protección de los datos</H3>
          <P>
            Aplicamos tecnologías actuales de cifrado y de seguridad (TLS, almacenamiento
            protegido de los tokens). Solo el personal autorizado tiene acceso a los datos
            personales.
          </P>

          <H3>6. Sus derechos</H3>
          <UL>
            <li>Acceder a sus datos personales</li>
            <li>Rectificar los datos inexactos</li>
            <li>Suprimir su cuenta y sus datos</li>
            <li>Limitar el tratamiento de los datos</li>
            <li>Retirar el consentimiento para el tratamiento de los datos</li>
          </UL>

          <H3>7. Conservación de los datos</H3>
          <UL>
            <li><strong>Cuentas activas:</strong> de forma indefinida hasta su supresión por el usuario</li>
            <li><strong>Cuentas suprimidas:</strong> 30 días naturales y, a continuación, supresión completa</li>
            <li><strong>Historial de pagos:</strong> 5 años (exigencia de la legislación tributaria de la Federación de Rusia)</li>
            <li><strong>Registros de seguridad:</strong> 6 meses</li>
            <li><strong>Copias de seguridad:</strong> se sobrescriben cada 30 días</li>
          </UL>

          <H3>7.1. Tratamiento de fotografías</H3>
          <P>Al subir fotografías a la Aplicación, el usuario:</P>
          <UL>
            <li>confirma que es titular de los derechos sobre la imagen</li>
            <li>concede al Responsable una licencia no exclusiva de uso</li>
            <li>garantiza que en las imágenes no aparecen terceros sin su consentimiento</li>
          </UL>
          <H3>8. Cookies y analítica</H3>
          <P>
            En el sitio web linkeon.io se utilizan cookies, el almacenamiento local del navegador
            (localStorage, sessionStorage) y contadores de servicios externos de analítica web y
            de publicidad:
          </P>
          <UL>
            <li>
              <strong>Yandex.Metrica</strong>, contador n.º 105902201 — estadísticas de visitas y
              consecución de objetivos. Están activados Webvisor (grabación de las acciones del
              usuario en la página), el mapa de clics, el seguimiento de los enlaces externos y
              el índice de rebote exacto. El script del contador se carga con la primera acción
              del usuario en la página (desplazamiento, toque, movimiento del ratón, pulsación de
              tecla, clic) o, a más tardar, 6 segundos después de la carga de la página.
            </li>
            <li>
              <strong>VK Ads / top.Mail.Ru</strong>, píxel n.º 3773048 — registro de la visita
              (evento pageView) para asociar el clic en el anuncio con la visita al sitio. El
              píxel se inicializa en cada carga de página, sin acción previa del usuario y sin
              solicitud de consentimiento específica.
            </li>
          </UL>
          <P>
            <strong>Telemetría propia.</strong> El sitio linkeon.io transmite al servidor del
            Responsable (my.linkeon.io, método /webhook/events/track) los eventos siguientes:{' '}
            <em>landing_view</em>, la visita al sitio; <em>landing_cta_click</em>, la pulsación
            del botón de acceso a la Aplicación; <em>landing_engagement</em>, el resumen de la
            visita. Junto con los eventos se transmiten: el identificador de sesión de la
            pestaña, la fuente de acceso (parámetros utm_* y ref o el nombre de dominio del sitio
            de referencia), el nombre de la campaña publicitaria, la dirección de la página de
            referencia, el tiempo de permanencia en la página, la profundidad máxima de
            desplazamiento, así como la información sobre si el botón de acceso se mostró al
            usuario y si fue pulsado.
          </P>
          <P>
            <strong>Almacenamiento local.</strong> En el localStorage del navegador, bajo la
            clave <em>ll_attribution</em>, se guardan los parámetros de atribución obtenidos de la
            dirección de la página (utm_source, utm_medium, utm_campaign, utm_term, utm_content,
            ref), que se reutilizan en las visitas posteriores. En el sessionStorage se guardan el
            identificador de sesión de la pestaña y la marca de que la visita ya ha sido
            contabilizada.
          </P>
          <P>
            La gestión de las cookies está disponible en la configuración del navegador; los datos
            del almacenamiento local se eliminan junto con los datos del sitio mediante las
            herramientas del propio navegador. La desactivación de las cookies y de los contadores
            de terceros puede limitar el funcionamiento de determinadas funciones.
          </P>

          <H3>9. Modificaciones de la Política</H3>
          <P>
            Podemos actualizar la presente Política. Le informaremos de las modificaciones
            sustanciales a través de la Aplicación o por otros medios.
          </P>

          <H3>10. Contacto</H3>
          <P>
            Si tiene alguna pregunta sobre la presente Política o sobre el tratamiento de sus
            datos, póngase en contacto con nosotros en la dirección support@linkeon.io.
          </P>
        </>
      )}

      {type === 'pdn' && (
        <>
          <div className="text-xs text-gray-500">Versión de 5 de agosto de 2026</div>
          <P>
            Al registrarse y utilizar la Aplicación LINKEON.IO, el usuario presta su
            consentimiento a Dmitry Viktorovich Volkov (INN 463404496646, correo electrónico
            support@linkeon.io), en adelante el «Responsable», para el tratamiento de sus datos
            personales en las condiciones que se indican a continuación.
          </P>

          <H3>1. Categorías de datos personales</H3>
          <UL>
            <li>Número de teléfono móvil</li>
            <li>Nombre, apellidos y correo electrónico (a voluntad del usuario)</li>
            <li>Contenido de los mensajes, las solicitudes y los parámetros del perfil de negocio introducidos en la Aplicación</li>
            <li>Historial de interacciones con los asistentes de IA y registros de sesión</li>
            <li>Imágenes y grabaciones de audio cargadas por el usuario, así como el flujo de audio
              del micrófono cuando se utiliza la entrada por voz</li>
            <li>Muestra de audio de la propia voz: únicamente cuando se utiliza la función de
              locución del vídeo con la propia voz y solo previa confirmación específica del consentimiento</li>
            <li>Información técnica sobre el dispositivo y datos de los pagos</li>
          </UL>

          <H3>2. Finalidades del tratamiento</H3>
          <UL>
            <li>Identificación y autenticación del usuario</li>
            <li>Ejecución de las Condiciones de Uso (oferta pública)</li>
            <li>Tratamiento de las solicitudes de IA y suministro de respuestas</li>
            <li>Realización de los pagos y emisión de los justificantes</li>
            <li>Atención al usuario y resolución de reclamaciones</li>
            <li>Análisis del uso y mejora del servicio (de forma anonimizada)</li>
          </UL>

          <H3>3. Relación de operaciones con los datos personales</H3>
          <P>
            Recogida, registro, sistematización, acumulación, conservación, actualización (puesta
            al día, modificación), extracción, utilización, comunicación (cesión, acceso),
            anonimización, bloqueo, supresión y destrucción de los datos personales, tanto por
            medios automatizados como sin ellos.
          </P>

          <H3>4. Comunicación de datos a terceros</H3>
          <P>
            Para el tratamiento de las solicitudes de IA, los datos personales se transmiten a
            proveedores externos: OpenAI (EE. UU.), Anthropic (EE. UU.), Google (EE. UU.),
            ElevenLabs (EE. UU.), DeepSeek (RPC), Kling / Kuaishou (RPC), Yandex SpeechKit
            (Federación de Rusia), así como a otros servicios de IA empleados para funciones
            concretas de la Aplicación.
          </P>
          <P>
            Se transmiten: el texto de los mensajes y las solicitudes del usuario, el historial de
            la conversación con el asistente, el contexto del perfil (nombre, apellidos,
            intereses, valores, competencias, intenciones), las imágenes y las grabaciones de
            audio cargadas, el flujo de audio en la entrada por voz, así como la muestra de audio
            de la voz cuando se utiliza la función de locución del vídeo con la propia voz. El
            contenido de la conversación y del perfil se transmite en su forma original y no se
            somete a anonimización. El identificador del usuario y el número de teléfono no se
            transmiten a los proveedores de IA.
          </P>
          <P>
            La transmisión de los datos de pago se realiza a agregadores de pago certificados
            (YooKassa y otros). No se comunican datos personales a otros terceros, salvo en los
            supuestos expresamente previstos por la legislación de la Federación de Rusia.
          </P>

          <H3>4.1. Transferencia internacional de datos personales, incluida la realizada a la RPC</H3>
          <P>
            Parte de los proveedores enumerados se encuentran fuera de la Federación de Rusia, por
            lo que el usuario presta asimismo su consentimiento a la transferencia internacional
            de sus datos personales (artículo 12 de la Ley Federal n.º 152-FZ, de 27 de julio de
            2006, «Sobre los datos personales»).
          </P>
          <P>
            <strong>Los datos se transfieren, entre otros destinos, a la República Popular
            China:</strong> el texto de los mensajes del usuario junto con el contexto de su
            perfil, en la elaboración de los mensajes de bienvenida (proveedor DeepSeek); las
            descripciones textuales, las imágenes y las grabaciones de audio, en la generación y
            el procesamiento del vídeo (proveedor Kling / Kuaishou). La República Popular China no
            es parte del Convenio del Consejo de Europa para la protección de las personas con
            respecto al tratamiento automatizado de datos de carácter personal ni figura en la
            lista de Estados extranjeros que garantizan una protección adecuada de los derechos de
            los interesados; el nivel de protección jurídica de los datos personales en la RPC
            difiere del establecido por la legislación de la Federación de Rusia.
          </P>
          <P>
            Los datos se transfieren asimismo a EE. UU. (OpenAI, Anthropic, Google, ElevenLabs).
            La descripción detallada de la transferencia internacional figura en el apartado 3.1
            de la Política de Privacidad.
          </P>

          <H3>5. Vigencia del consentimiento</H3>
          <P>
            El presente consentimiento surte efecto desde el momento del registro y hasta su
            retirada por el usuario o la supresión de la cuenta. El usuario puede retirar su
            consentimiento en cualquier momento enviando una solicitud a support@linkeon.io. La
            retirada conlleva la supresión de la cuenta y de los datos en los plazos indicados en
            la Política de Privacidad (hasta 30 días naturales).
          </P>

          <H3>6. Derechos del interesado</H3>
          <P>
            El usuario tiene derecho a obtener información sobre las categorías y el tratamiento
            de sus datos, a exigir su rectificación, bloqueo o destrucción cuando sean
            incompletos, inexactos o hayan quedado desactualizados, y a recurrir las actuaciones
            del Responsable ante Roskomnadzor o ante los tribunales.
          </P>

          <H3>7. Contacto</H3>
          <P>
            Para cualquier cuestión relativa al tratamiento de datos personales:
            support@linkeon.io. Las solicitudes se examinan en un plazo de 30 días naturales.
          </P>
        </>
      )}
    </>
  );
}
