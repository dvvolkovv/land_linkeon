import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Politique de confidentialité',
  offer: 'Conditions générales d’utilisation (offre publique)',
  pdn: 'Consentement au traitement des données à caractère personnel',
};

export function renderLegal(type: LegalType) {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        La présente version française est une traduction de courtoisie. En cas de divergence, la
        version en langue russe prévaut et fait seule foi au regard du droit de la Fédération de
        Russie.
      </div>
      {type === 'offer' && (
        <>
          <div className="text-xs text-gray-500">Version du 5 août 2026</div>
          <H3>1. Dispositions générales</H3>
          <P>
            Les présentes Conditions générales d’utilisation régissent les relations entre
            l’administration de l’application LINKEON.IO (ci-après — l’« Application ») et les
            utilisateurs de l’Application.
          </P>
          <P>
            L’Application appartient à <strong>Dmitry Viktorovich Volkov
            (INN 463404496646)</strong>, redevable de l’impôt sur les revenus professionnels
            (travailleur indépendant), ci-après — le « Prestataire » ou l’« Administration », qui
            en assure l’exploitation.
          </P>
          <P>Adresse électronique de contact : support@linkeon.io</P>
          <P>
            Les présentes Conditions constituent une offre publique au sens de l’article 437 du
            Code civil de la Fédération de Russie. L’utilisation de l’Application vaut acceptation
            pleine et sans réserve des présentes Conditions.
          </P>

          <H3>2. Objet de l’Application</H3>
          <P>
            L’Application a pour objet de donner aux utilisateurs accès à des assistants IA
            (marketing, juridique, comptabilité, RH, coaching, etc.), à des fonctions de génération
            de contenu et à un profil unique destiné aux besoins professionnels et au développement
            personnel.
          </P>

          <H3>3. Inscription et compte</H3>
          <P>
            L’utilisation de l’Application suppose une inscription au moyen d’un numéro de
            téléphone. L’utilisateur s’engage à fournir des informations exactes et répond de la
            préservation de l’accès à son compte.
          </P>

          <H3>3.1. Limite d’âge</H3>
          <P>
            L’Application est réservée exclusivement aux personnes âgées de 18 ans révolus. En
            s’inscrivant, l’utilisateur confirme avoir 18 ans révolus.
          </P>

          <H3>4. Règles de conduite</H3>
          <P>Il est interdit aux utilisateurs de :</P>
          <UL>
            <li>Publier des contenus injurieux, discriminatoires ou illicites</li>
            <li>Diffuser des messages non sollicités ou de la publicité sans l’accord de l’administration</li>
            <li>Se faire passer pour une autre personne</li>
            <li>Utiliser l’Application à des fins frauduleuses</li>
            <li>Porter atteinte aux droits des autres utilisateurs</li>
          </UL>

          <H3>4.1. Services payants et jetons</H3>
          <P>
            L’Application propose des services gratuits comme des services payants. L’unité de
            compte est constituée par des jetons internes, achetés par lots au moyen des systèmes
            de paiement intégrés. Le Prestataire ne traite ni ne conserve les données des cartes
            bancaires. Après paiement, un justificatif est délivré conformément aux exigences de la
            législation de la Fédération de Russie.
          </P>
          <P>
            Le solde de jetons non utilisés à la date de suppression du compte n’est pas remboursé,
            sauf dans les cas prévus à la section 8.
          </P>

          <H3>4.2. Modération et tolérance zéro</H3>
          <P>L’Opérateur applique une politique de <strong>tolérance zéro</strong> à l’égard des contenus offensants et des utilisateurs abusifs. Ces contenus sont supprimés et les contrevenants bloqués sans avertissement préalable.</P>
          <P>Un contenu ou un autre utilisateur peut être signalé directement dans l’Application : un menu comportant les options « Signaler » et « Bloquer » est disponible dans les conversations et sur le profil de l’utilisateur. Le blocage prend effet immédiatement et empêche l’utilisateur bloqué de vous écrire.</P>
          <P>L’Opérateur s’engage à examiner le signalement reçu, à supprimer le contenu litigieux et à bloquer le contrevenant <strong>dans un délai de 24 heures</strong> à compter de la réception du signalement.</P>
          <P>Les infractions peuvent en outre être signalées à support@linkeon.io.</P>
          <H3>5. Propriété intellectuelle</H3>
          <P>
            L’ensemble des droits sur l’Application, y compris le code source, le design, les
            logos et les autres éléments, appartient à Dmitry Viktorovich Volkov. En s’inscrivant,
            l’utilisateur concède au Prestataire une licence non exclusive d’utilisation des
            contenus qu’il téléverse, aux fins du fonctionnement du service.
          </P>

          <H3>6. Limitation de responsabilité</H3>
          <P>
            L’Application et l’ensemble de ses fonctionnalités sont fournis « en l’état » (as is),
            sans garantie d’aucune sorte, expresse ou implicite. Le Prestataire ne garantit ni un
            fonctionnement continu et exempt d’erreurs, ni l’exactitude des réponses des assistants
            IA, ni l’adéquation des conseils à la situation particulière de l’utilisateur.
          </P>
          <P>
            La responsabilité du Prestataire est limitée, au maximum, au montant versé par
            l’utilisateur au cours des 30 derniers jours.
          </P>

          <H3>7. Recommandations de sécurité</H3>
          <UL>
            <li>Faites vérifier les recommandations de l’IA par des professionnels qualifiés avant toute prise de décision</li>
            <li>Ne communiquez pas à l’Application d’informations relevant du secret d’État ou du secret des affaires</li>
            <li>Signalez toute activité suspecte à l’administration</li>
          </UL>

          <H3>8. Remboursement</H3>
          <P>Le remboursement n’est effectué QUE dans les cas suivants :</P>
          <UL>
            <li>Panne technique de plus de 72 heures consécutives</li>
            <li>Double prélèvement résultant d’une erreur technique</li>
          </UL>
          <P>
            La réclamation est adressée à l’adresse support@linkeon.io et examinée dans un délai de
            10 jours ouvrables. Le remboursement intervient dans un délai de 30 jours, déduction
            faite des commissions des systèmes de paiement (3–5 %).
          </P>

          <H3>9. Règlement des litiges</H3>
          <P>
            Tous les litiges sont réglés par voie de négociation, dans le respect d’une procédure
            précontentieuse obligatoire. Avant toute saisine du tribunal, l’utilisateur est tenu
            d’adresser une réclamation écrite à l’adresse support@linkeon.io. À défaut d’accord,
            les litiges sont tranchés par le tribunal du lieu où se trouve le défendeur,
            conformément à la législation de la Fédération de Russie.
          </P>

          <H3>10. Modification des Conditions</H3>
          <P>
            L’Administration se réserve le droit de modifier à tout moment les présentes
            Conditions. La poursuite de l’utilisation de l’Application après l’entrée en vigueur
            des modifications vaut acceptation des nouvelles conditions par l’utilisateur.
          </P>
        </>
      )}

      {type === 'privacy' && (
        <>
          <div className="text-xs text-gray-500">Version du 5 août 2026</div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
            <div className="font-semibold text-gray-900">Responsable du traitement des données à caractère personnel</div>
            <div><strong>Dénomination :</strong> Dmitry Viktorovich Volkov</div>
            <div><strong>INN :</strong> 463404496646</div>
            <div><strong>Statut :</strong> redevable de l’impôt sur les revenus professionnels (travailleur indépendant)</div>
            <div><strong>Adresse électronique de contact :</strong> support@linkeon.io</div>
          </div>
          <P>
            La présente Politique de confidentialité s’applique à l’ensemble des données à
            caractère personnel que le Responsable du traitement peut recueillir au sujet de
            l’utilisateur lors de l’utilisation de l’Application LINKEON.IO.
          </P>

          <H3>1. Collecte des informations</H3>
          <P>Nous collectons les informations suivantes :</P>
          <UL>
            <li>Numéro de téléphone à des fins d’authentification</li>
            <li>Prénom, nom, adresse électronique (facultatif)</li>
            <li>Informations relatives à l’activité, aux objectifs et au contexte, saisies par l’utilisateur</li>
            <li>Historique des messages et des interactions avec les assistants IA</li>
            <li>Informations techniques relatives à l’appareil et à l’utilisation de l’Application</li>
          </UL>

          <H3>1.1. Connexion via des services tiers</H3>
          <P>
            Outre la connexion par numéro de téléphone et par adresse électronique, l’Application
            permet de se connecter via des services tiers : Google, Yandex, Taler ID et Apple.
          </P>
          <P>
            Lors d’une telle connexion, le Responsable du traitement reçoit du service choisi un
            identifiant permanent du compte, une adresse électronique et l’indication du caractère
            vérifié ou non de cette adresse. Le mot de passe du compte détenu auprès du service
            tiers n’est pas transmis au Responsable du traitement et ne lui est pas connu.
          </P>
          <P>
            Apple permet de masquer l’adresse réelle. Dans ce cas, le Responsable du traitement
            reçoit une adresse de relais de la forme <strong>***@privaterelay.appleid.com</strong>,
            ou ne reçoit aucune adresse, et le compte n’est identifié que par son identifiant.
          </P>
          <P>
            L’adresse ainsi obtenue sert notamment à rattacher les comptes entre eux : si elle est
            vérifiée par le service et déjà connue du Responsable du traitement, la connexion
            s’effectue sur le compte existant et n’en crée pas de nouveau.
          </P>
          <P>
            Le Responsable du traitement n’accède pas au contenu des comptes détenus auprès des
            services tiers et n’y effectue aucune action au nom de l’utilisateur. La liste des
            modes de connexion rattachés est consultable dans l’Application ; chacun d’eux peut
            être désactivé, sauf s’il est le seul restant.
          </P>

          <H3>2. Utilisation des informations</H3>
          <UL>
            <li>Fourniture et amélioration des services de l’Application</li>
            <li>Traitement des requêtes IA de l’utilisateur</li>
            <li>Personnalisation des réponses des assistants</li>
            <li>Garantie de la sécurité et prévention de la fraude</li>
            <li>Communication avec l’utilisateur sur les questions importantes concernant l’Application</li>
          </UL>

          <H3>2.1. Traitement des informations de paiement</H3>
          <P>
            L’Application <strong>NE traite PAS et NE conserve PAS</strong> les données des cartes
            bancaires (numéro de carte, date d’expiration, cryptogramme CVV). Toutes les données de
            paiement sont traitées exclusivement par des agrégateurs de paiement certifiés,
            conformes à la norme PCI DSS.
          </P>
          <P>L’historique des paiements est conservé pendant 5 ans, conformément à la législation fiscale de la Fédération de Russie.</P>

          <H3>3. Traitement des données au moyen de l’intelligence artificielle</H3>
          <P>
            Pour traiter les requêtes de l’utilisateur, l’Application recourt aux technologies
            d’intelligence artificielle de prestataires tiers :
          </P>
          <UL>
            <li>
              <strong>OpenAI</strong> (ChatGPT, GPT-4, GPT-5) — traitement des requêtes textuelles.
              Pays d’hébergement : États-Unis
            </li>
            <li>
              <strong>Anthropic</strong> (Claude) — traitement des requêtes textuelles.
              Pays d’hébergement : États-Unis
            </li>
            <li>
              <strong>Google</strong> (Gemini — traitement des requêtes et analyse de l’échantillon
              vocal téléversé ; Imagen 4.0 Ultra et Nano Banana — génération d’images ; Veo —
              génération de vidéos). Pays d’hébergement : États-Unis
            </li>
            <li>
              <strong>ElevenLabs</strong> — création d’un modèle vocal à partir de l’échantillon
              vocal téléversé et sonorisation des vidéos avec cette voix. Pays d’hébergement :
              États-Unis
            </li>
            <li>
              <strong>DeepSeek</strong> — génération des messages d’accueil dans les conversations
              avec les assistants IA. <strong>Pays d’hébergement : République populaire de Chine</strong>
            </li>
            <li>
              <strong>Kling (Kuaishou)</strong> — génération et traitement des vidéos.{' '}
              <strong>Pays d’hébergement : République populaire de Chine</strong>
            </li>
            <li>
              <strong>Yandex SpeechKit</strong> — reconnaissance vocale lors de la saisie vocale.
              Pays d’hébergement : Fédération de Russie
            </li>
            <li>Autres services d’IA mobilisés pour certaines fonctionnalités de l’Application</li>
          </UL>
          <P>
            <strong>Données transmises :</strong> le texte des requêtes et des messages de
            l’utilisateur, l’historique de la conversation avec l’assistant et le contexte du
            profil ; pour les fonctions de génération — les descriptions textuelles ainsi que les
            images et les enregistrements audio téléversés par l’utilisateur ; lors de la saisie
            vocale — le flux audio provenant du microphone. Le contexte du profil transmis aux
            prestataires d’IA comprend le prénom et le nom de l’utilisateur, ainsi que ses centres
            d’intérêt, ses valeurs, ses compétences et ses intentions. Le contenu des échanges et
            du profil est transmis en l’état et ne fait l’objet d’aucune anonymisation.
            L’identifiant de l’utilisateur, le numéro de téléphone et les données de paiement NE
            sont PAS transmis aux prestataires d’IA.
          </P>
          <P>
            <strong>Clonage de la voix.</strong> Dans la section de création de vidéos,
            l’utilisateur peut activer la sonorisation par sa propre voix. Dans ce cas,
            l’échantillon audio de voix qu’il téléverse est transmis à Google (modèle Gemini), afin
            d’en établir une description textuelle, et à ElevenLabs, afin de créer un modèle vocal
            servant ensuite à sonoriser la vidéo générée. L’échantillon n’est téléversé qu’à
            l’initiative de l’utilisateur et uniquement lorsque celui-ci confirme un consentement
            distinct ; à défaut d’une telle confirmation, aucun téléversement n’a lieu. Le fichier
            audio de l’échantillon lui-même n’est pas conservé par le Responsable du traitement —
            seuls sont conservés l’identifiant du modèle vocal détenu par ElevenLabs et la
            description textuelle de la voix. L’utilisateur peut supprimer le modèle vocal depuis
            l’interface de l’Application ; il est alors également supprimé chez ElevenLabs.
          </P>
          <P>
            Une fois les données transmises aux prestataires d’IA, le Responsable du traitement ne
            maîtrise plus leur traitement ultérieur. En utilisant l’Application, l’utilisateur
            consent expressément à la transmission de ses données en vue de leur traitement au
            moyen de technologies d’IA.
          </P>

          <H3>3.1. Transfert transfrontalier de données à caractère personnel</H3>
          <P>
            Une partie des prestataires énumérés à la section 3 est établie hors de la Fédération
            de Russie. Le traitement des requêtes de l’utilisateur emporte un transfert
            transfrontalier de données à caractère personnel au sens de l’article 12 de la loi
            fédérale n° 152-FZ du 27.07.2006 « Sur les données à caractère personnel ».
          </P>
          <P>
            <strong>Nous attirons tout particulièrement votre attention sur le fait qu’une partie
            des données de l’utilisateur est transférée vers la République populaire de
            Chine.</strong> Sont transférés vers la RPC : le texte des messages adressés par
            l’utilisateur à l’assistant IA, accompagné du contexte de son profil, lors de la
            génération des messages d’accueil (prestataire DeepSeek), ainsi que les descriptions
            textuelles, les images et les enregistrements audio à partir desquels la vidéo est
            créée et traitée (prestataire Kling / Kuaishou). La République populaire de Chine n’est
            pas partie à la Convention du Conseil de l’Europe pour la protection des personnes à
            l’égard du traitement automatisé des données à caractère personnel et ne figure pas sur
            la liste des États étrangers assurant une protection adéquate des droits des personnes
            concernées. Le niveau de protection juridique des données à caractère personnel en RPC
            diffère de celui établi par la législation de la Fédération de Russie.
          </P>
          <P>
            Par ailleurs, des données sont transférées vers les États-Unis (OpenAI, Anthropic,
            Google, ElevenLabs), y compris l’échantillon audio de la voix de l’utilisateur lorsque
            la fonction de sonorisation des vidéos par sa propre voix est utilisée. La
            reconnaissance vocale lors de la saisie vocale est effectuée sur le territoire de la
            Fédération de Russie (Yandex SpeechKit).
          </P>
          <P>
            En utilisant les assistants IA, les fonctions de génération d’images et de vidéos ainsi
            que la saisie vocale, l’utilisateur consent à ce transfert transfrontalier, y compris
            au transfert de données vers la RPC. Si le transfert transfrontalier lui est
            inacceptable, il lui appartient de renoncer à l’utilisation des fonctionnalités
            correspondantes de l’Application. Ne communiquez pas aux assistants IA d’informations
            dont le transfert hors de la Fédération de Russie vous serait inacceptable.
          </P>

          <H3>4. Communication des données à des tiers</H3>
          <P>Nous ne vendons ni ne communiquons vos données à caractère personnel à des tiers, sauf :</P>
          <UL>
            <li>Avec votre consentement exprès</li>
            <li>Lorsque la législation de la Fédération de Russie l’exige</li>
            <li>Pour protéger nos droits et la sécurité des utilisateurs</li>
            <li>Aux prestataires de services agissant pour notre compte (dans le respect de la confidentialité)</li>
          </UL>

          <H3>5. Sécurité des données</H3>
          <P>
            Nous mettons en œuvre des technologies modernes de chiffrement et de sécurité (TLS,
            conservation des jetons sous forme protégée). Seuls les collaborateurs habilités ont
            accès aux données à caractère personnel.
          </P>

          <H3>6. Vos droits</H3>
          <UL>
            <li>Accéder à vos données à caractère personnel</li>
            <li>Faire rectifier des données inexactes</li>
            <li>Supprimer votre compte et vos données</li>
            <li>Limiter le traitement des données</li>
            <li>Retirer votre consentement au traitement des données</li>
          </UL>

          <H3>7. Conservation des données</H3>
          <UL>
            <li><strong>Comptes actifs :</strong> sans limitation de durée, jusqu’à leur suppression par l’utilisateur</li>
            <li><strong>Comptes supprimés :</strong> 30 jours calendaires, puis suppression définitive</li>
            <li><strong>Historique des paiements :</strong> 5 ans (exigence de la législation fiscale de la Fédération de Russie)</li>
            <li><strong>Journaux de sécurité :</strong> 6 mois</li>
            <li><strong>Sauvegardes :</strong> écrasées tous les 30 jours</li>
          </UL>

          <H3>7.1. Traitement des photographies</H3>
          <P>En téléversant des photographies dans l’Application, l’utilisateur :</P>
          <UL>
            <li>confirme qu’il détient les droits sur l’image</li>
            <li>accorde au Responsable une licence non exclusive d’utilisation</li>
            <li>garantit qu’aucun tiers ne figure sur les images sans son consentement</li>
          </UL>
          <H3>8. Cookies et mesure d’audience</H3>
          <P>
            Le site linkeon.io utilise des cookies, le stockage local du navigateur (localStorage,
            sessionStorage) ainsi que les compteurs de services tiers de mesure d’audience et de
            publicité :
          </P>
          <UL>
            <li>
              <strong>Yandex.Metrica</strong>, compteur n° 105902201 — statistiques de visites et
              suivi des objectifs. Sont activés le Webvisor (enregistrement des actions de
              l’utilisateur sur la page), la carte des clics, le suivi des liens externes et le
              taux de rebond précis. Le script du compteur est chargé dès la première action de
              l’utilisateur sur la page (défilement, contact tactile, mouvement de la souris, appui
              sur une touche, clic) ou, au plus tard, 6 secondes après le chargement de la page.
            </li>
            <li>
              <strong>VK Ads / top.Mail.Ru</strong>, pixel n° 3773048 — enregistrement de la visite
              (événement pageView) afin de rapprocher un clic publicitaire d’une visite du site. Le
              pixel est initialisé à chaque chargement de page, sans action préalable de
              l’utilisateur et sans demande de consentement distincte.
            </li>
          </UL>
          <P>
            <strong>Télémétrie propre.</strong> Le site linkeon.io transmet au serveur du
            Responsable du traitement (my.linkeon.io, méthode /webhook/events/track) les événements
            suivants :{' '}
            <em>landing_view</em> — la visite du site ; <em>landing_cta_click</em> — le clic sur le
            bouton menant à l’Application ; <em>landing_engagement</em> — le bilan de la visite.
            Sont transmis avec ces événements : l’identifiant de session de l’onglet, la source de
            la visite (paramètres utm_* et ref, ou nom de domaine du site référent), le nom de la
            campagne publicitaire, l’adresse de la page référente, la durée passée sur la page, la
            profondeur de défilement maximale, ainsi que l’information indiquant si le bouton
            menant à l’Application a été affiché à l’utilisateur et s’il a été cliqué.
          </P>
          <P>
            <strong>Stockage local.</strong> Les paramètres d’acquisition figurant dans l’adresse
            de la page (utm_source, utm_medium, utm_campaign, utm_term, utm_content, ref) sont
            enregistrés dans le localStorage du navigateur sous la clé <em>ll_attribution</em> ;
            ils sont réutilisés lors des visites ultérieures. L’identifiant de session de l’onglet
            et l’indicateur signalant que la visite a déjà été comptabilisée sont enregistrés dans
            le sessionStorage.
          </P>
          <P>
            La gestion des cookies s’effectue dans les paramètres du navigateur ; les données du
            stockage local sont supprimées avec les données du site par les moyens du navigateur.
            La désactivation des cookies et des compteurs tiers peut limiter le fonctionnement de
            certaines fonctionnalités.
          </P>

          <H3>9. Modifications de la politique</H3>
          <P>
            Nous pouvons mettre à jour la présente Politique. Nous informerons des modifications
            substantielles via l’Application ou par d’autres moyens.
          </P>

          <H3>10. Contacts</H3>
          <P>
            Si vous avez des questions sur la présente Politique ou sur le traitement de vos
            données, écrivez-nous à l’adresse support@linkeon.io.
          </P>
        </>
      )}

      {type === 'pdn' && (
        <>
          <div className="text-xs text-gray-500">Version du 5 août 2026</div>
          <P>
            En s’inscrivant et en utilisant l’Application LINKEON.IO, l’utilisateur consent à ce
            que Dmitry Viktorovich Volkov (INN 463404496646, adresse électronique
            support@linkeon.io), ci-après — le « Responsable du traitement », traite ses données à
            caractère personnel aux conditions énoncées ci-dessous.
          </P>

          <H3>1. Catégories de données à caractère personnel</H3>
          <UL>
            <li>Numéro de téléphone mobile</li>
            <li>Prénom, nom, adresse électronique (au choix de l’utilisateur)</li>
            <li>Contenu des messages, des requêtes et des paramètres du profil professionnel saisis dans l’Application</li>
            <li>Historique des interactions avec les assistants IA, journaux de session</li>
            <li>Images et enregistrements audio téléversés par l’utilisateur, ainsi que le flux
              audio provenant du microphone lors de l’utilisation de la saisie vocale</li>
            <li>Échantillon audio de sa propre voix — uniquement en cas d’utilisation de la
              fonction de sonorisation des vidéos par sa propre voix et uniquement après
              confirmation d’un consentement distinct</li>
            <li>Informations techniques relatives à l’appareil et données relatives aux paiements</li>
          </UL>

          <H3>2. Finalités du traitement</H3>
          <UL>
            <li>Identification et authentification de l’utilisateur</li>
            <li>Exécution des Conditions générales d’utilisation (offre publique)</li>
            <li>Traitement des requêtes IA et fourniture des réponses</li>
            <li>Réalisation des paiements et établissement des justificatifs</li>
            <li>Assistance à l’utilisateur et traitement des réclamations</li>
            <li>Analyse de l’utilisation et amélioration du service (sous forme anonymisée)</li>
          </UL>

          <H3>3. Liste des opérations effectuées sur les données à caractère personnel</H3>
          <P>
            Collecte, enregistrement, systématisation, accumulation, conservation, mise à jour
            (actualisation, modification), extraction, utilisation, transmission (mise à
            disposition, accès), anonymisation, blocage, effacement, destruction des données à
            caractère personnel — au moyen de procédés automatisés comme sans recours à de tels
            procédés.
          </P>

          <H3>4. Communication des données à des tiers</H3>
          <P>
            Aux fins du traitement des requêtes IA, les données à caractère personnel sont
            transmises à des prestataires tiers : OpenAI (États-Unis), Anthropic (États-Unis),
            Google (États-Unis), ElevenLabs (États-Unis), DeepSeek (RPC), Kling / Kuaishou (RPC),
            Yandex SpeechKit (Fédération de Russie), ainsi qu’à d’autres services d’IA mobilisés
            pour certaines fonctionnalités de l’Application.
          </P>
          <P>
            Sont transmis : le texte des messages et des requêtes de l’utilisateur, l’historique de
            la conversation avec l’assistant, le contexte du profil (prénom, nom, centres
            d’intérêt, valeurs, compétences, intentions), les images et les enregistrements audio
            téléversés, le flux audio lors de la saisie vocale, ainsi que l’échantillon vocal en
            cas d’utilisation de la fonction de sonorisation des vidéos par sa propre voix. Le
            contenu des échanges et du profil est transmis en l’état et ne fait l’objet d’aucune
            anonymisation. L’identifiant de l’utilisateur et le numéro de téléphone ne sont pas
            transmis aux prestataires d’IA.
          </P>
          <P>
            Les données de paiement sont transmises à des agrégateurs de paiement certifiés
            (YooKassa et autres). Les données à caractère personnel ne sont communiquées à aucun
            autre tiers, hormis les cas expressément prévus par la législation de la Fédération de
            Russie.
          </P>

          <H3>4.1. Transfert transfrontalier de données à caractère personnel, y compris vers la RPC</H3>
          <P>
            Une partie des prestataires énumérés ci-dessus est établie hors de la Fédération de
            Russie ; l’utilisateur consent donc également au transfert transfrontalier de ses
            données à caractère personnel (article 12 de la loi fédérale n° 152-FZ du 27.07.2006
            « Sur les données à caractère personnel »).
          </P>
          <P>
            <strong>Des données sont transférées, notamment, vers la République populaire de
            Chine :</strong> le texte des messages de l’utilisateur accompagné du contexte de son
            profil — lors de la génération des messages d’accueil (prestataire DeepSeek) ; les
            descriptions textuelles, les images et les enregistrements audio — lors de la
            génération et du traitement des vidéos (prestataire Kling / Kuaishou). La République
            populaire de Chine n’est pas partie à la Convention du Conseil de l’Europe pour la
            protection des personnes à l’égard du traitement automatisé des données à caractère
            personnel et ne figure pas sur la liste des États étrangers assurant une protection
            adéquate des droits des personnes concernées ; le niveau de protection juridique des
            données à caractère personnel en RPC diffère de celui établi par la législation de la
            Fédération de Russie.
          </P>
          <P>
            Des données sont également transférées vers les États-Unis (OpenAI, Anthropic, Google,
            ElevenLabs). Le transfert transfrontalier est décrit en détail à la section 3.1 de la
            Politique de confidentialité.
          </P>

          <H3>5. Durée de validité du consentement</H3>
          <P>
            Le présent consentement prend effet au moment de l’inscription et demeure valable
            jusqu’à son retrait par l’utilisateur ou jusqu’à la suppression du compte.
            L’utilisateur peut retirer son consentement à tout moment en adressant une demande à
            support@linkeon.io. Le retrait entraîne la suppression du compte et des données dans
            les délais indiqués dans la Politique de confidentialité (jusqu’à 30 jours
            calendaires).
          </P>

          <H3>6. Droits de la personne concernée</H3>
          <P>
            L’utilisateur a le droit d’obtenir des informations sur la composition et le traitement
            de ses données, d’en exiger la rectification, le blocage ou la destruction lorsqu’elles
            sont incomplètes, inexactes ou obsolètes, et de contester les actes du Responsable du
            traitement auprès de Roskomnadzor ou devant les tribunaux.
          </P>

          <H3>7. Contacts</H3>
          <P>
            Pour toute question relative au traitement des données à caractère personnel :
            support@linkeon.io. Les demandes sont examinées dans un délai de 30 jours calendaires.
          </P>
        </>
      )}
    </>
  );
}
