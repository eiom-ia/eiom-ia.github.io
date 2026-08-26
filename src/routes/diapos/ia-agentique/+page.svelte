<script>
  /**
   * L'IA agentique — cours de 4 heures.
   *
   * Colonne vertébrale: la présentation FAS1001 « 9_llms_agentique », dont la
   * séquence d'ouverture est conservée telle quelle — 007, Smith, 47, puis le
   * courtier et l'agent de voyage, et la définition seulement après. Le mot
   * travaille avant la technologie.
   *
   * Trois ajouts par rapport à la source:
   *
   *   1. Le terminal et le harnais. La source passe de « bash » à une liste
   *      d'outils sans jamais nommer ce que ces outils SONT. Le harnais est
   *      l'abstraction manquante, et l'auditoire n'ouvre pas de terminal.
   *
   *   2. La thèse du texte. « Le texte est l'interface » est posée dès bash —
   *      bash EN EST la démonstration — et payée au quatrième temps, sur leurs
   *      propres fichiers. C'est la seule idée qui change leur semaine.
   *
   *   3. Ce qui peut mal tourner. Un cours sur la délégation d'actions à une
   *      machine, pour un auditoire de recherche, doit demander comment un
   *      pair conteste ce que l'agent a fait. Repris de la séance 4.
   *
   * Retiré de la source, propre à FAS1001: « Structure du cours », le TP 3,
   * les logos d'université.
   */
  import { base } from '$app/paths';
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
  import Code from '$lib/deck/Code.svelte';
  import Carte from '$lib/deck/Carte.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Citation from '$lib/deck/Citation.svelte';
  import Minuterie from '$lib/deck/demos/Minuterie.svelte';
  import Collage from '$lib/deck/demos/Collage.svelte';
  import Boucle from '$lib/deck/demos/Boucle.svelte';
  import Mcp from '$lib/deck/demos/Mcp.svelte';
  import TroisMots from '$lib/deck/demos/TroisMots.svelte';

  const TOTAL = 38;
  const D = 'IA agentique · mar 25 août';

  const c_terminal = `# Ou suis-je ?
pwd
#> /home/vous/projet-these

# Qu'est-ce qu'il y a ici ?
ls
#> donnees/   analyse.R   memoire.tex

# Montre-moi ce fichier
cat analyse.R
#> library(tidyverse)
#> donnees <- read_csv("donnees/corpus.csv")`;

  const c_texte = `# Compter les lignes de tout un corpus
wc -l donnees/*.csv

# Chercher un mot dans 400 fichiers d'un coup
grep -r "populisme" notes/

# Ce qui a change depuis hier
git diff memoire.tex`;


  const c_skill = `skills/
  revue-litterature/
    SKILL.md      # quand l'utiliser, et comment
    modele.md     # le gabarit de fiche de lecture`;

  const c_plugin = `mon-plugin/
  .claude-plugin/
    plugin.json   # nom, version, auteur
  skills/         # du savoir-faire
  agents/         # des sous-agents
  hooks/          # des declencheurs
  .mcp.json       # des serveurs MCP`;




  // Coordonnees relevees sur le rendu d'origine, en pixels de la scene
  // revealjs de 1050 x 700. La scene entiere est ensuite mise a l'echelle,
  // exactement comme le fait reveal.
  const AGENTS_FICTION = [
    { src: '/img/agentique/007.png',   alt: 'James Bond, agent 007',
      haut: 332, droite: 800, largeur: 348 },
    { src: '/img/agentique/smith.png', alt: "L'agent Smith, dans Matrix",
      haut: 362, droite: -100, largeur: 645 },
    { src: '/img/agentique/47.png',    alt: "L'agent 47, dans Hitman",
      haut: -88, droite: -200, largeur: 420, rotation: 180 }
  ];

  const AGENTS_REELS = [
    { src: '/img/agentique/remax.png',  alt: 'Un courtier immobilier',
      haut: 212, droite: -100, largeur: 443 },
    { src: '/img/agentique/voyage.png', alt: 'Une agence de voyage',
      haut: 262, droite: 600, largeur: 735 }
  ];



  // Les deux prompts de la demonstration. Le premier est celui qu'une personne
  // ecrit spontanement; le second dit la meme chose en ne laissant rien a
  // deviner. On les fait tourner l'un apres l'autre, sur la meme tache.
  // Accents conserves: ces blocs se collent dans un agent, pas dans R.
  const c_prompt_vague = `Télécharge l'étude électorale canadienne 2025 et utilise R
pour faire une régression entre l'éducation et le fait d'être
à droite, en contrôlant pour l'âge et le revenu.

Produis un tableau de régression en PNG et exporte-le dans
mes téléchargements.`;

  const c_prompt_precis = `Télécharge ce fichier dans le dossier de travail :
https://dataverse.harvard.edu/api/access/datafile/13958997

Étude électorale canadienne 2025, format Stata (.dta), 58 Mo.

En R :

1. Ouvre-le avec haven. Les non-réponses valent -99 : mets-les à NA.
2. Estime cps25_lr_scale_bef_1 (placement gauche-droite, 0 à 10)
   par cps25_education, cps25_age_in_years et cps25_income.
3. Fais-en un tableau de régression, exporté en PNG dans ~/Downloads
   avec gridExtra::tableGrob et ggplot2::ggsave. N'installe rien d'autre.

Explique-moi chaque étape au fur et à mesure.`;


  const c_cron = `# Tous les lundis a 7 h, l'agent relit les nouveautes
# et depose une fiche dans sorties/.

0 7 * * 1  cd ~/veille && claude -p "$(cat consigne.md)"`;
</script>

<svelte:head>
  <title>L'IA agentique</title>
</svelte:head>

<Deck total={TOTAL}>
  {#snippet children()}

    <!-- ================= OUVERTURE ================= -->
    <Slide fond="encre" bandeau="Laurence-Olivier M. Foisy" droite={D}>
      <h1 class="e">L'IA agentique</h1>
      <hr class="filet" />
      <p class="lead e">Faire accomplir des actions à un modèle de langue</p>
    </Slide>


    <!-- ================= 1 · C'EST QUOI UN AGENT ================= -->
    <Slide fond="encre" bandeau="Premier temps" droite={D}>
      <h1 class="e">C'est quoi un agent ?</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Le mot, avant la technologie" droite={D}>
      <Collage titre="C'est quoi un agent ?" images={AGENTS_FICTION} />
    </Slide>

    <Slide bandeau="Et des vrais" droite={D}>
      <Collage titre="C'est quoi un agent ?" images={AGENTS_REELS} />
    </Slide>

    <Slide bandeau="Définition" droite={D}>
      <h2 class="e">Une entité mandatée pour agir</h2>
      <p class="lead e">
        Un agent est une entité autonome mandatée pour agir dans le monde afin de produire un effet
        au nom d'un objectif ou d'un mandant.
      </p>
      <Deux ratio="1fr 1fr 1fr">
        <Carte titre="Délégation">
          <p>L'agent agit pour le compte de quelque chose : un État, une organisation, un système, une personne.</p>
        </Carte>
        <Carte titre="Autonomie">
          <p>L'agent dispose d'une liberté dans la manière d'exécuter sa mission.</p>
        </Carte>
        <Carte titre="Effectivité">
          <p>L'agent produit un changement réel. Il détruit, il élimine, il protège, il accomplit.</p>
        </Carte>
      </Deux>
    </Slide>


    <!-- ================= 2 · LE TERMINAL ET LE HARNAIS ================= -->
    <Slide fond="encre" bandeau="Deuxième temps" droite={D}>
      <h1 class="e">Le terminal<br />et le harnais</h1>
      <hr class="filet" />
      <p class="lead e">Comment du texte devient une action.</p>
    </Slide>

    <Slide bandeau="Le point de départ" droite={D}>
      <h2 class="e">Seul, un LLM ne fait que du texte</h2>
      <Boucle />
    </Slide>

    <Slide bandeau="La bascule" droite={D}>
      <h2 class="e">Mais du texte peut être une commande</h2>
      <figure class="schema e">
        <img src="{base}/img/agentique/bash.svg" alt="Le logo de GNU Bash" />
        <figcaption>Un terminal attend du texte. Un LLM produit du texte.</figcaption>
      </figure>
    </Slide>

    <Slide bandeau="Reculons d'un pas" droite={D}>
      <h2 class="e">C'est quoi, un terminal ?</h2>
      <Deux ratio="1fr 1fr">
        <Carte titre="Ce que vous connaissez">
          <p>
            Vous cliquez sur un dossier, il s'ouvre. Vous glissez un fichier, il se déplace. La
            machine vous montre des images de vos fichiers.
          </p>
        </Carte>
        <Carte titre="L'autre porte">
          <p>
            Vous écrivez le nom de ce que vous voulez. La machine répond par du texte. Même
            ordinateur, mêmes fichiers — une autre façon de lui parler.
          </p>
        </Carte>
      </Deux>
      <p class="e">
        Rien d'ésotérique : c'est la porte que l'ordinateur a toujours eue, et la seule qu'un modèle
        de langue puisse franchir.
      </p>
    </Slide>

    <Slide bandeau="Trois commandes" droite={D}>
      <h2 class="e">Ça suffit pour comprendre le reste</h2>
      <Code src={c_terminal} />
      <p class="e">
        <code>pwd</code> : où suis-je. <code>ls</code> : qu'y a-t-il ici. <code>cat</code> :
        montre-moi. Tout le reste est une variation.
      </p>
    </Slide>

    <Slide bandeau="Ce que ça débloque" droite={D}>
      <h2 class="e">Des gestes qu'aucune interface ne propose</h2>
      <Code src={c_texte} />
      <p class="e">
        Chercher un mot dans quatre cents fichiers, compter les lignes d'un corpus, voir exactement
        ce qui a changé depuis hier. Trois secondes chacun.
      </p>
    </Slide>

    <Slide fond="encre" bandeau="La thèse du cours" droite={D}>
      <h1 class="e">Le texte est<br />l'interface</h1>
      <hr class="filet" />
      <p class="lead e">
        Tout ce qui est du texte brut, un modèle peut le lire, l'écrire, le chercher, le comparer et
        le versionner. Tout le reste lui est opaque.
      </p>
      <p class="lead e">On y revient au quatrième temps, sur vos propres fichiers.</p>
    </Slide>

    <Slide bandeau="Le pont" droite={D}>
      <h2 class="e">Le harnais relie le modèle et la machine</h2>
      <Boucle harnais />
    </Slide>

    <Slide bandeau="Le mot qui manquait" droite={D}>
      <h2 class="e">Un harnais, c'est le programme qui tient la bride</h2>
      <Deux ratio="1fr 1fr">
        <Carte titre="Ce qu'il n'est pas">
          <p>Ce n'est pas le modèle. Le modèle est ailleurs, chez un fournisseur, et ne fait que du texte.</p>
        </Carte>
        <Carte titre="Ce qu'il est">
          <p>
            Un logiciel sur <em>votre</em> machine. Il parle au modèle, exécute ce que le modèle
            propose, lui renvoie le résultat, et recommence.
          </p>
        </Carte>
      </Deux>
      <p class="e">
        Claude Code, Codex, OpenCode, Cursor : ce sont des harnais. Le modèle qu'ils appellent est
        interchangeable.
      </p>
    </Slide>


    <Slide bandeau="Le levier de contrôle" droite={D}>
      <h2 class="e">Le modèle propose, le harnais dispose</h2>
      <p class="lead e">
        Le modèle n'a aucun pouvoir d'exécution. Il produit une chaîne de caractères qui
        <em>ressemble</em> à une commande. Ce qui décide de l'exécuter, c'est le harnais — donc vous.
      </p>
      <Citation source="Le point de contrôle">
        Toute la sécurité d'un agent se joue là : dans ce que le harnais accepte de faire sans vous
        demander.
      </Citation>
    </Slide>

    <Slide bandeau="Panorama" droite={D}>
      <h2 class="e">Les harnais que vous croiserez</h2>
      <Deux ratio="1fr 1fr">
        <Carte titre="Dans le terminal">
          <ul>
            <li>Claude Code</li>
            <li>Codex</li>
            <li>Gemini CLI</li>
            <li>OpenCode, Crush</li>
            <li>Google Antigravity</li>
          </ul>
          <p>Accès direct aux fichiers et au shell. Puissants, donc à encadrer.</p>
        </Carte>
        <Carte titre="Dans une interface">
          <ul>
            <li>Cursor</li>
            <li>GitHub Copilot</li>
            <li>Claude Desktop</li>
          </ul>
          <p>Plus confortables, périmètre plus étroit. Bon point d'entrée.</p>
        </Carte>
      </Deux>
      <p class="e">Le choix compte moins qu'on ne le croit : les concepts valent pour tous.</p>
    </Slide>



    <!-- ================= 3 · DÉMONSTRATION ================= -->
    <Slide fond="encre" bandeau="Démonstration" droite={D}>
      <h1 class="e">Un agent fait<br />une vraie tâche</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Quoi regarder" droite={D}>
      <h2 class="e">Trois choses, pendant que ça tourne</h2>
      <Deux ratio="1fr 1fr 1fr">
        <Carte titre="La boucle">
          <p>Il propose une commande, elle s'exécute, le résultat lui revient. Comptez les tours.</p>
        </Carte>
        <Carte titre="Les demandes d'accord">
          <p>Où s'arrête-t-il pour demander ? C'est le réglage le plus important.</p>
        </Carte>
        <Carte titre="Ce qu'il se trompe">
          <p>Il se trompera. Ce qui compte est de voir <em>comment</em> ça se rattrape.</p>
        </Carte>
      </Deux>
    </Slide>

    <!-- ================= PRATIQUE 1 ================= -->
    <Slide bandeau="Premier essai" droite={D}>
      <h2 class="e">Ce qu'on écrit spontanément</h2>
      <Code src={c_prompt_vague} brut />
      <Carte titre="Ce qu'il doit deviner tout seul">
        <p>
          Où trouver l'étude · lequel des deux fichiers · ce que veut dire « être à droite »
          parmi 1440 variables · que les non-réponses valent −99 · comment fabriquer une image
          d'un tableau · où sont « mes téléchargements ».
        </p>
      </Carte>
    </Slide>

    <Slide bandeau="Deuxième essai" droite={D}>
      <h2 class="e">La même chose, sans rien à deviner</h2>
      <Code src={c_prompt_precis} brut />
    </Slide>

    <Slide fond="encre" bandeau="Pratique" droite={D}>
      <h1 class="e">À vous :<br />installer et lancer</h1>
      <hr class="filet" />
      <p class="lead e">On ouvre un terminal, on installe un harnais, on lui fait dire bonjour.</p>
    </Slide>

    <Slide fond="encre" bandeau="Pause" droite={D}>
      <h1 class="e">Pause</h1>
      <hr class="filet" />
      <Minuterie minutes={15} />
    </Slide>

    <!-- ================= 4 · ÉTENDRE UN AGENT ================= -->
    <Slide fond="encre" bandeau="Troisième temps" droite={D}>
      <h1 class="e">Étendre un agent</h1>
      <hr class="filet" />
      <div class="gal-logos">
        <img src="{base}/img/agentique/github-blanc.png" alt="GitHub" />
        <img src="{base}/img/agentique/drive.png" alt="Google Drive" />
        <img src="{base}/img/agentique/notion.png" alt="Notion" />
        <img src="{base}/img/agentique/brave.png" alt="Brave" />
        <img src="{base}/img/agentique/consensus.png" alt="Consensus" />
      </div>
    </Slide>


    <Slide bandeau="Le nœud du temps" droite={D}>
      <h2 class="e">Trois mots qu'on confond</h2>
      <TroisMots />
    </Slide>

    <Slide bandeau="Skill" droite={D}>
      <h2 class="e">Des instructions chargées au bon moment</h2>
      <Deux ratio="1.1fr 1fr">
        <div>
          <p>
            Un skill est un document de consignes que l'agent charge <em>seulement</em> quand la
            tâche le justifie.
          </p>
          <Code titre="Structure minimale" src={c_skill} />
        </div>
        <Carte titre="Pourquoi en recherche">
          <p>
            Vos exigences méthodologiques — comment citer, quoi vérifier, quel gabarit — deviennent
            un fichier versionné, relu, partagé avec l'équipe.
          </p>
          <p>
            Une consigne écrite une fois, appliquée identiquement à chaque exécution. C'est de la
            standardisation de protocole.
          </p>
        </Carte>
      </Deux>
    </Slide>



    <Slide bandeau="MCP" droite={D}>
      <h2 class="e">C'est quoi un MCP ?</h2>
      <Mcp />
      <p class="e">
        Le serveur déclare ce qu'il sait faire ; le harnais lit cette déclaration et s'en sert. Les
        identifiants restent du côté du serveur, jamais dans le contexte du modèle.
      </p>
    </Slide>

    <Slide bandeau="Plugin" droite={D}>
      <h2 class="e">Un emballage, propre à un harnais</h2>
      <Deux ratio="1fr 1.1fr">
        <Code titre="Ce qu'un plugin contient" src={c_plugin} />
        <Carte titre="Ce que ça règle">
          <p>
            Un skill se copie à la main. Un serveur MCP se configure à la main. À trois personnes
            dans une équipe, ça dérive déjà.
          </p>
          <p>
            Le plugin en fait une chose versionnée qu'on installe, qu'on met à jour et qu'on
            désinstalle d'un geste.
          </p>
        </Carte>
      </Deux>
      <p class="e">
        C'est aussi la limite : un plugin ne vaut que dans le harnais pour lequel il est écrit. Le
        serveur MCP qu'il contient, lui, vaut partout.
      </p>
    </Slide>

    <!-- ================= 5 · CE QUI PEUT MAL TOURNER ================= -->






    <Slide bandeau="Précaution" droite={D}>
      <h2 class="e">Rendre les effets réversibles</h2>
      <Deux>
        <Carte titre="Ce qu'on ne laisse pas faire">
          <ul>
            <li>Écraser un fichier de données source</li>
            <li>Modifier en place, sans copie</li>
            <li>Agir sur un dossier non versionné</li>
          </ul>
        </Carte>
        <Carte titre="Ce qu'on met en place">
          <ul>
            <li>Données brutes en lecture seule, toujours</li>
            <li>Écriture uniquement dans un dossier de sortie</li>
            <li>Un point de contrôle Git avant l'exécution</li>
          </ul>
        </Carte>
      </Deux>
      <Citation source="Règle simple">
        Les données brutes ne changent jamais. Les modifications suivies reviennent au point de
        contrôle ; les nouveaux fichiers restent confinés dans un dossier qu'on peut supprimer en bloc.
      </Citation>
    </Slide>




    <!-- ================= 6 · UN BON FLUX DE TRAVAIL ================= -->
    <Slide fond="encre" bandeau="Quatrième temps" droite={D}>
      <h1 class="e">Un bon flux<br />de travail</h1>
      <hr class="filet" />
      <p class="lead e">On revient à la thèse du deuxième temps.</p>
    </Slide>

    <Slide bandeau="La thèse, payée" droite={D}>
      <h2 class="e">Ce qui est du texte, l'agent le tient</h2>
      <Deux ratio="1fr 1fr">
        <Carte titre="Ce qu'il peut faire, sur du texte brut">
          <ul>
            <li>Le lire en entier, d'un coup</li>
            <li>Le chercher, le comparer, le compter</li>
            <li>En voir le <em>diff</em> ligne à ligne</li>
            <li>Le modifier de façon vérifiable</li>
          </ul>
        </Carte>
        <Carte titre="Ce qui lui reste opaque">
          <ul>
            <li>Un .docx : une archive compressée</li>
            <li>Un tableur avec des formules et des couleurs</li>
            <li>Un PDF mis en page</li>
            <li>Ce que vous avez fait en cliquant</li>
          </ul>
        </Carte>
      </Deux>
      <Citation source="La règle">
        Ce n'est pas une préférence esthétique. Un format binaire est un mur : ni l'agent, ni Git, ni
        vous dans six mois n'y voyez ce qui a changé.
      </Citation>
    </Slide>

    <Slide bandeau="Concrètement" droite={D}>
      <h2 class="e">Ce que ça change dans vos fichiers</h2>
      <table class="e large">
        <thead><tr><th>Au lieu de</th><th>Préférer</th><th>Ce qu'on y gagne</th></tr></thead>
        <tbody>
          <tr><td>Word</td><td>LaTeX, Quarto, Markdown</td><td>Le diff, la citation gérée, l'agent qui relit</td></tr>
          <tr><td>Cliquer dans un tableur</td><td>Un script R</td><td>Le geste est rejouable et contestable</td></tr>
          <tr><td>Dropbox, « version_finale_2 »</td><td>Git</td><td>Qui a changé quoi, quand, et le retour arrière</td></tr>
          <tr><td>Une capture d'écran</td><td>Le fichier de données</td><td>L'agent peut le relire, pas la regarder</td></tr>
          <tr><td>Un PDF annoté</td><td>Des notes en texte</td><td>Cherchable dans quatre cents fichiers</td></tr>
        </tbody>
      </table>
      <p class="e">
        Chaque ligne vaut aussi sans agent. L'agent ne fait qu'augmenter fortement la prime.
      </p>
    </Slide>

    <Slide bandeau="Ressource rare" droite={D}>
      <h2 class="e">Le contexte est une ressource limitée</h2>
      <Deux ratio="1fr 1.1fr">
        <div>
          <p>
            Chaque tour réinjecte tout l'historique : votre demande, les appels d'outils, leurs
            résultats. La fenêtre se remplit vite.
          </p>
        </div>
        <Carte titre="Les symptômes d'un contexte saturé">
          <ul>
            <li>L'agent oublie une consigne donnée au début</li>
            <li>Il refait une action déjà faite</li>
            <li>Il devient plus lent et plus cher à chaque tour</li>
            <li>Il « dérive » vers une tâche voisine</li>
          </ul>
          <p>Le remède est toujours le même : découper en tâches courtes et fermées.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="La bonne unité de travail" droite={D}>
      <h2 class="e">Une tâche, un début, une fin vérifiable</h2>
      <Deux ratio="1fr 1fr">
        <Carte titre="Mal découpé">
          <p>« Fais ma revue de littérature. »</p>
          <p>Aucun critère d'arrêt, aucune façon de savoir si c'est fini ni si c'est bon.</p>
        </Carte>
        <Carte titre="Bien découpé">
          <p>
            « Pour chacun des 40 PDF de <code>corpus/</code>, extrais titre, auteurs, année et DOI
            dans <code>sorties/refs.csv</code>. »
          </p>
          <p>On sait quand c'est fini, et on peut vérifier chaque ligne.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="En recherche" droite={D}>
      <h2 class="e">Ce qu'on lui confie vraiment</h2>
      <Deux ratio="1fr 1fr">
        <div>
          <Carte titre="Collecte">
            <p>Récupérer, renommer, ranger. Le travail que personne ne veut refaire.</p>
          </Carte>
          <Carte titre="Nettoyage">
            <p>La mise en forme des données. Le <em>tidy data</em>, délégué — puis relu.</p>
          </Carte>
        </div>
        <div>
          <Carte titre="Repérage">
            <p>Retrouver dans vos propres notes ce que vous savez avoir lu.</p>
          </Carte>
          <Carte titre="Vérification">
            <p>Recontrôler mécaniquement ce qu'un modèle a produit. Y compris lui-même.</p>
          </Carte>
        </div>
      </Deux>
      <p class="e">Et vos idées : qu'est-ce qui, dans votre semaine, est du texte et se répète ?</p>
    </Slide>

    <!-- ================= 7 · AGENTS PERMANENTS ================= -->
    <Slide fond="encre" bandeau="Cinquième temps" droite={D}>
      <h1 class="e">Des agents<br />qui ne s'arrêtent pas</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Qui appuie sur le bouton" droite={D}>
      <h2 class="e">Un agent n'a pas besoin de vous pour démarrer</h2>
      <Deux ratio="1fr 1fr 1fr">
        <Carte titre="Le temps">
          <p>Une tâche planifiée. Tous les lundis à 7 h, sans que personne n'ouvre un terminal.</p>
        </Carte>
        <Carte titre="Un événement">
          <p>Un fichier déposé, un dépôt mis à jour, un courriel reçu.</p>
        </Carte>
        <Carte titre="Un autre agent">
          <p>Le premier finit, le second commence. C'est là que ça devient difficile à suivre.</p>
        </Carte>
      </Deux>
      <Code src={c_cron} />
    </Slide>




    <!-- ================= PRATIQUE 2 ================= -->
    <Slide fond="encre" bandeau="Pratique" droite={D}>
      <h1 class="e">À vous :<br />sur votre matériel</h1>
      <hr class="filet" />
      <p class="lead e">
        Une tâche de votre semaine, qui est du texte et qui se répète. On la découpe, on la lance, on
        vérifie la sortie.
      </p>
    </Slide>

    <!-- ================= CLÔTURE ================= -->

    <Slide bandeau="Sources" droite={D}>
      <h2 class="e">Sources</h2>
      <hr class="filet" />
      <ul class="cmd-liste e">
        <li>modelcontextprotocol.io<span class="lieu">la spécification du protocole MCP</span></li>
        <li>code.claude.com/docs/en/plugins<span class="lieu">ce qu'un plugin empaquette — consulté le 24 août 2026</span></li>
        <li>openclaw.ai<span class="lieu">harnais libre, licence MIT — dépôt github.com/openclaw/openclaw</span></li>
        <li>clawhub.ai<span class="lieu">dépôt de skills pour agents</span></li>
        <li>moltbook.com<span class="lieu">réseau social pour agents</span></li>
        <li>api.crossref.org<span class="lieu">résolution des DOI, pour la vérification des références</span></li>
      </ul>
      <p class="e credits">
        Captures d'écran reproduites en contexte pédagogique. Images de fiction : James Bond, Matrix,
        Hitman, citées à titre d'illustration.
      </p>
    </Slide>

  {/snippet}
</Deck>
