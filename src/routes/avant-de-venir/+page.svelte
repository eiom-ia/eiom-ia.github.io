<script>
  import Prose from '$lib/components/Prose.svelte';
  import Etape from '$lib/components/Etape.svelte';
  import Encadre from '$lib/components/Encadre.svelte';
  import { FOURNISSEUR, URL_VERIFICATEUR, CONTACT } from '$lib/data/config.js';
</script>

<svelte:head>
  <title>Avant de venir — Parcours IA, EIOM 2026</title>
  <meta
    name="description"
    content="Ce qu'il faut installer avant le lundi 24 août pour suivre le parcours L'intelligence artificielle et la recherche."
  />
</svelte:head>

<Prose>
  <p class="surtitre">Parcours IA — EIOM 2026</p>
  <h1>Avant de venir</h1>

  <p class="chapeau">
    Cette page prend environ trente minutes à suivre. Faites-la chez vous, tranquillement, avant le
    lundi 24 août. Le premier avant-midi du parcours suppose que votre ordinateur est prêt : chaque
    minute passée à réparer une installation en classe est une minute de moins à travailler sur vos
    propres données.
  </p>

  <Encadre ton="ciel" titre="Vous n'avez jamais ouvert un terminal ?">
    <p>
      C'est prévu. Cette page ne suppose aucune expérience préalable, et tout ce que nous vous
      demandons de taper est copiable tel quel. Si quelque chose bloque, la section
      « Si rien ne fonctionne » vous donne une porte de sortie qui marche toujours.
    </p>
  </Encadre>

  <Etape numero="1" titre="Ce qu'il faut faire avant lundi">
    <p>Quatre choses, dans cet ordre :</p>
    <ol>
      <li>Installer R et un éditeur de code.</li>
      <li>Obtenir une clé d'accès gratuite à un modèle de langue.</li>
      <li>Déposer cette clé au bon endroit sur votre ordinateur.</li>
      <li>Lancer notre vérification en une ligne et obtenir quatre lignes vertes.</li>
    </ol>
    <p>
      Si les quatre lignes sont vertes, vous êtes prêt·e et vous pouvez fermer cette page.
      Sinon, écrivez-nous <strong>avant le dimanche 23 août</strong> — voir la dernière section.
    </p>
  </Etape>

  <Etape numero="2" titre="Installer R et un éditeur">
    <p>
      Deux logiciels distincts : <strong>R</strong>, qui fait les calculs, et un
      <strong>éditeur</strong>, qui est la fenêtre dans laquelle vous écrivez. Il faut les deux, et
      il faut installer R en premier.
    </p>

    <h3>Sur Windows</h3>
    <ol>
      <li>
        Allez sur <a href="https://cran.r-project.org/bin/windows/base/">cran.r-project.org</a> et
        téléchargez « Download R for Windows ». Installez en acceptant toutes les options par défaut.
      </li>
      <li>
        Téléchargez ensuite <a href="https://posit.co/download/rstudio-desktop/">RStudio Desktop</a>,
        qui est gratuit, et installez-le.
      </li>
    </ol>
    <p>
      <strong>Le piège classique sur Windows :</strong> installer RStudio sans avoir installé R
      d'abord. RStudio s'ouvre alors et se plaint de ne trouver aucune version de R. Si cela vous
      arrive, installez R, puis redémarrez RStudio — il le trouvera tout seul.
    </p>

    <h3>Sur macOS</h3>
    <ol>
      <li>
        Allez sur <a href="https://cran.r-project.org/bin/macosx/">cran.r-project.org</a> et prenez
        le fichier <code>.pkg</code> correspondant à votre machine. Les Mac récents (2020 et après)
        ont une puce Apple Silicon et prennent la version « arm64 » ; les plus anciens prennent la
        version « x86_64 ». En cas de doute : menu Pomme, « À propos de ce Mac ».
      </li>
      <li>
        Téléchargez ensuite <a href="https://posit.co/download/rstudio-desktop/">RStudio Desktop</a>
        et glissez-le dans Applications.
      </li>
    </ol>
    <p>
      <strong>Le piège classique sur macOS :</strong> prendre la mauvaise version (arm64 contre
      x86_64). R s'installe quand même, mais certains paquets refuseront de se compiler plus tard,
      avec des messages incompréhensibles. Prenez deux minutes pour vérifier votre puce.
    </p>

    <h3>Installer le paquet dont nous aurons besoin</h3>
    <p>Ouvrez RStudio. Dans la fenêtre du bas nommée « Console », tapez cette ligne et appuyez sur Entrée :</p>
    <pre><code>install.packages(c("ellmer", "usethis"))</code></pre>
    <p>
      L'installation prend une à trois minutes et affiche beaucoup de texte. Tant qu'aucune ligne ne
      commence par <code>Error</code>, tout va bien : les avertissements commençant par
      <code>Warning</code> sont normaux et sans conséquence.
    </p>
  </Etape>

  <Etape numero="3" titre="Obtenir une clé {FOURNISSEUR.nom}">
    <p>
      Une clé d'API est un mot de passe qui autorise votre ordinateur à parler à un modèle de langue.
      Celle-ci est <strong>gratuite et ne demande aucune carte de crédit</strong>.
    </p>
    <ol>
      <li>Allez sur <a href={FOURNISSEUR.urlCle}>{FOURNISSEUR.urlCle}</a>.</li>
      <li>Connectez-vous avec un compte Google. Un compte personnel suffit.</li>
      <li>Cliquez sur « Create API key » et acceptez de créer un projet si on vous le propose.</li>
      <li>
        Copiez la clé affichée. Elle ressemble à une longue suite de lettres et de chiffres.
        <strong>Vous ne pourrez plus la revoir après avoir fermé la fenêtre</strong> — collez-la
        immédiatement quelque part, on s'en sert à l'étape suivante.
      </li>
    </ol>
    <p>
      Le palier gratuit offre {FOURNISSEUR.quota}, ce qui est largement au-delà de ce que nous ferons
      pendant la semaine.
    </p>

    <Encadre ton="ambre" titre="Un point d'éthique de recherche, dès maintenant">
      <p>
        Sur le palier gratuit, les données que vous envoyez peuvent servir à améliorer les produits du
        fournisseur. Pour les exercices de la semaine, qui portent sur des avis publics de restaurant,
        cela n'a aucune conséquence. Pour vos propres données de recherche, c'est une question sérieuse,
        et nous y reviendrons en séance 3 avec les modèles qu'on exécute sur sa propre machine.
        <strong>N'envoyez rien de confidentiel cette semaine.</strong>
      </p>
    </Encadre>

    <p>
      Vous n'avez pas de compte Google et vous ne souhaitez pas en créer un ? Écrivez-nous, on vous
      trouve une autre voie. Ne restez pas bloqué·e là-dessus.
    </p>
  </Etape>

  <Etape numero="4" titre="Déposer la clé dans .Renviron">
    <p>
      R lit au démarrage un fichier de configuration nommé <code>.Renviron</code>. C'est là que va
      votre clé — et nulle part ailleurs.
    </p>
    <p>Dans la console de RStudio, tapez :</p>
    <pre><code>usethis::edit_r_environ()</code></pre>
    <p>
      Un fichier s'ouvre, probablement vide. Ajoutez-y cette ligne, en remplaçant
      <code>votre_cle_ici</code> par la clé copiée à l'étape 3, sans guillemets et sans espace autour
      du signe égal :
    </p>
    <pre><code>{FOURNISSEUR.variableEnv}=votre_cle_ici</code></pre>
    <p>
      Enregistrez le fichier, puis <strong>redémarrez R</strong> : menu « Session », puis « Restart R ».
      Cette étape est obligatoire — sans redémarrage, R ne verra pas la clé, et c'est de loin la cause
      la plus fréquente d'échec de la vérification.
    </p>

    <Encadre ton="rose" titre="La règle à ne jamais enfreindre">
      <p>
        Une clé ne s'écrit <strong>jamais</strong> dans un script, et ne se dépose
        <strong>jamais</strong> dans un dépôt Git ou un partage de fichiers. C'est le seul moyen sûr
        de ne pas la diffuser par accident en partageant votre code. Le fichier
        <code>.Renviron</code> existe précisément pour ça.
      </p>
    </Encadre>
  </Etape>

  <Etape numero="5" titre="Vérifier que tout fonctionne">
    <p>
      Copiez cette ligne dans la console de RStudio et appuyez sur Entrée. Elle télécharge notre
      script de vérification et l'exécute.
    </p>
    <pre><code>source("{URL_VERIFICATEUR}"); verifier_installation()</code></pre>
    <p>Vous devriez voir apparaître un rapport de ce genre :</p>
    <pre><code>== Vérification de l'environnement — Parcours IA, EIOM 2026 ==

[ OK   ] Version de R                 4.6.1
[ OK   ] Paquet ellmer                0.4.2
[ OK   ] Clé {FOURNISSEUR.nom}        trouvée (39 caractères)
[ OK   ] Appel réel au modèle         pret

Tout est en place. Vous êtes prêt·e pour lundi matin.</code></pre>
    <p>
      <strong>Quatre lignes « OK » : c'est fini, vous êtes prêt·e.</strong> Si une ligne affiche
      « ÉCHEC », le rapport vous dit quoi faire juste en dessous. Suivez l'indication, puis relancez
      la même ligne.
    </p>
    <p>
      Le rapport ne montre jamais votre clé, seulement sa longueur. Vous pouvez donc le copier-coller
      dans un courriel sans risque si vous nous demandez de l'aide.
    </p>
  </Etape>

  <Etape numero="6" titre="Si rien ne fonctionne">
    <p>
      <strong>Venez quand même.</strong> Une installation qui résiste n'est pas une raison de manquer
      la séance, et ce n'est pas un jugement sur vos compétences : c'est une réalité banale de
      l'informatique de recherche.
    </p>
    <p>
      Nous aurons en classe une solution de secours qui fonctionne dans un simple navigateur, sans
      aucune installation sur votre machine. Vous pourrez suivre toute la séance et faire tous les
      exercices. Arrivez simplement dix minutes à l'avance et signalez-vous : on vous branche.
    </p>
    <p>
      Nous serons également disponibles dès 8h15 le lundi matin pour régler les cas récalcitrants
      avant le début de la séance.
    </p>
  </Etape>

  <Etape numero="7" titre="Nous écrire">
    <p>
      Bloqué·e à une étape ? Écrivez à <a href="mailto:{CONTACT}">{CONTACT}</a> en précisant votre
      système d'exploitation (Windows ou macOS) et en collant le rapport de l'étape 5.
    </p>
    <p>
      <strong>Faites-le avant le dimanche 23 août</strong> pour qu'on ait le temps de répondre. Passé
      ce délai, venez quand même : on règle ça sur place.
    </p>
  </Etape>

  <p class="signature">
    Laurence-Olivier M. Foisy et Antoine Lemor<br />
    Parcours <em>L'intelligence artificielle (IA) et la recherche</em> — EIOM, 24 au 28 août 2026
  </p>
</Prose>

<style>
  .surtitre {
    font-family: var(--police-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 0.6em;
  }
  .chapeau {
    font-size: 1.1rem;
    color: var(--ink-2);
    border-left: 2px solid var(--accent);
    padding-left: 16px;
    margin: 1.4em 0 2em;
  }
  .signature {
    margin-top: 3.5em;
    padding-top: 1.4em;
    border-top: 1px solid var(--rule);
    font-size: 0.85rem;
    color: var(--ink-3);
  }
</style>
