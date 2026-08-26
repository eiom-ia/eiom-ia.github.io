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
  import Picto from '$lib/deck/Picto.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Citation from '$lib/deck/Citation.svelte';
  import Minuterie from '$lib/deck/demos/Minuterie.svelte';
  import Collage from '$lib/deck/demos/Collage.svelte';
  import Boucle from '$lib/deck/demos/Boucle.svelte';
  import Mcp from '$lib/deck/demos/Mcp.svelte';
  import TroisMots from '$lib/deck/demos/TroisMots.svelte';
  import Terminal from '$lib/deck/demos/Terminal.svelte';
  import Contexte2 from '$lib/deck/demos/Contexte2.svelte';
  import Declencheurs from '$lib/deck/demos/Declencheurs.svelte';

  const TOTAL = 38;
  const D = 'IA agentique · mar 25 août';

  // Les deux terminaux du deuxième temps. Une commande par clic.
  const T_BASE = [
    { cmd: 'pwd', out: '/home/vous/projet-these' },
    { cmd: 'ls', out: 'donnees/   analyse.R   memoire.tex' },
    { cmd: 'cat analyse.R', out: 'library(tidyverse)\ndonnees <- read_csv("donnees/corpus.csv")' }
  ];

  const T_LEVIER = [
    { cmd: 'wc -l donnees/*.csv', out: '   20180 donnees/corpus.csv\n     551 donnees/avis.csv' },
    { cmd: 'grep -rl "populisme" notes/', out: 'notes/2024-03-lecture.md\nnotes/2024-09-seminaire.md\nnotes/2025-01-plan.md' },
    { cmd: 'git diff --stat memoire.tex', out: ' memoire.tex | 34 ++++++++++------' }
  ];



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
      <div class="pgrid c3">
        <span class="pit"
          ><Picto nom="humain" taille="2.2em" /><span class="pit-t"
            >Délégation<span class="s">il agit pour un autre</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="engrenage" taille="2.2em" /><span class="pit-t"
            >Autonomie<span class="s">libre de ses moyens</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="eclair" taille="2.2em" /><span class="pit-t"
            >Effectivité<span class="s">ça change quelque chose</span></span
          ></span
        >
      </div>
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
      <div class="pduo">
        <div>
          <Picto nom="clic" taille="3.4em" />
          <h4>CE QUE VOUS CONNAISSEZ</h4>
          <p>Vous cliquez. La machine vous montre des images de vos fichiers.</p>
        </div>
        <div>
          <Picto nom="terminal" taille="3.4em" />
          <h4>L'AUTRE PORTE</h4>
          <p>Vous écrivez. Elle répond par du texte.</p>
        </div>
      </div>
      <p class="e">
        Même ordinateur, mêmes fichiers. Et c'est la seule porte qu'un modèle de langue puisse
        franchir.
      </p>
    </Slide>

    <Slide bandeau="Trois commandes" droite={D}>
      <h2 class="e">Ça suffit pour comprendre le reste</h2>
      <Terminal lignes={T_BASE} />
      <p class="e">
        <code>pwd</code> : où suis-je. <code>ls</code> : qu'y a-t-il ici. <code>cat</code> :
        montre-moi. Tout le reste est une variation.
      </p>
    </Slide>

    <Slide bandeau="Ce que ça débloque" droite={D}>
      <h2 class="e">Des gestes qu'aucune interface ne propose</h2>
      <Terminal lignes={T_LEVIER} invite="~/projet-these" />
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
      <div class="pduo">
        <div>
          <Picto nom="croix" taille="3em" />
          <h4>CE QU'IL N'EST PAS</h4>
          <p>Le modèle. Celui-là est ailleurs, et ne fait que du texte.</p>
        </div>
        <div>
          <Picto nom="engrenage" taille="3em" />
          <h4>CE QU'IL EST</h4>
          <p>Un logiciel sur <em>votre</em> machine, qui exécute et recommence.</p>
        </div>
      </div>
      <p class="e">Claude Code, Codex, OpenCode, Cursor. Le modèle qu'ils appellent est interchangeable.</p>
    </Slide>


    <Slide bandeau="Le levier de contrôle" droite={D}>
      <h2 class="e">Le modèle propose, le harnais dispose</h2>
      <p class="lead e">
        Le modèle n'a aucun pouvoir d'exécution. Il produit une chaîne de caractères qui
        <em>ressemble</em> à une commande.
      </p>
      <Citation source="Le point de contrôle">
        Toute la sécurité d'un agent tient dans ce que le harnais accepte de faire sans vous demander.
      </Citation>
    </Slide>

    <Slide bandeau="Panorama" droite={D}>
      <h2 class="e">Les harnais que vous croiserez</h2>
      <div class="pduo">
        <div>
          <Picto nom="terminal" taille="2.8em" />
          <h4>DANS LE TERMINAL</h4>
          <p>Claude Code · Codex · Gemini CLI<br />OpenCode · Crush · Antigravity</p>
        </div>
        <div>
          <Picto nom="clic" taille="2.8em" />
          <h4>DANS UNE INTERFACE</h4>
          <p>Cursor · GitHub Copilot<br />Claude Desktop</p>
        </div>
      </div>
      <p class="e">Le choix compte moins qu'on ne le croit : les concepts valent pour tous.</p>
    </Slide>



    <!-- ================= 3 · DÉMONSTRATION ================= -->
    <Slide fond="encre" bandeau="Démonstration" droite={D}>
      <h1 class="e">Un agent fait<br />une vraie tâche</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Quoi regarder" droite={D}>
      <h2 class="e">Trois choses, pendant que ça tourne</h2>
      <div class="pgrid c3">
        <span class="pit"
          ><Picto nom="retour" taille="2.2em" /><span class="pit-t"
            >La boucle<span class="s">comptez les tours</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="humain" taille="2.2em" /><span class="pit-t"
            >Les demandes d'accord<span class="s">où s'arrête-t-il ?</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="croix" taille="2.2em" /><span class="pit-t"
            >Ses erreurs<span class="s">comment ça se rattrape</span></span
          ></span
        >
      </div>
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
        <Code titre="Un skill, c'est un dossier" src={c_skill} />
        <div class="pgrid">
          <span class="pit"><Picto nom="page" /><span class="pit-t">Un fichier de consignes</span></span>
          <span class="pit"><Picto nom="horloge" /><span class="pit-t">Chargé quand ça sert</span></span>
          <span class="pit"><Picto nom="git" /><span class="pit-t">Versionné, partagé</span></span>
          <span class="pit"><Picto nom="coche" /><span class="pit-t">Appliqué à l'identique</span></span>
        </div>
      </Deux>
      <p class="e">Votre méthode devient un fichier. C'est de la standardisation de protocole.</p>
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
      <Deux ratio="1fr 1fr">
        <Code titre="Ce qu'un plugin contient" src={c_plugin} />
        <div class="pgrid">
          <span class="pit"><Picto nom="boite" /><span class="pit-t">Tout d'un coup</span></span>
          <span class="pit"><Picto nom="git" /><span class="pit-t">Versionné</span></span>
          <span class="pit"><Picto nom="poubelle" /><span class="pit-t">Désinstallable</span></span>
          <span class="pit"><Picto nom="croix" /><span class="pit-t">Un seul harnais</span></span>
        </div>
      </Deux>
      <p class="e">
        Le serveur MCP qu'il contient, lui, vaut partout. C'est toute la différence.
      </p>
    </Slide>

    <!-- ================= 5 · CE QUI PEUT MAL TOURNER ================= -->






    <Slide bandeau="Précaution" droite={D}>
      <h2 class="e">Rendre les effets réversibles</h2>
      <div class="pduo">
        <div>
          <Picto nom="croix" taille="2.8em" />
          <h4>JAMAIS</h4>
          <p>Écraser une source · modifier en place · agir hors versionnement</p>
        </div>
        <div>
          <Picto nom="retour" taille="2.8em" />
          <h4>TOUJOURS</h4>
          <p>Sources en lecture seule · écriture dans <code>sorties/</code> · un point Git avant</p>
        </div>
      </div>
      <p class="e">Les données brutes ne changent jamais. Le reste se supprime en bloc.</p>
    </Slide>




    <!-- ================= 6 · UN BON FLUX DE TRAVAIL ================= -->
    <Slide fond="encre" bandeau="Quatrième temps" droite={D}>
      <h1 class="e">Un bon flux<br />de travail</h1>
      <hr class="filet" />
      <p class="lead e">On revient à la thèse du deuxième temps.</p>
    </Slide>

    <Slide bandeau="La thèse, payée" droite={D}>
      <h2 class="e">Ce qui est du texte, l'agent le tient</h2>
      <div class="pduo">
        <div>
          <Picto nom="page" taille="3.2em" />
          <h4>IL TIENT</h4>
          <div class="pgrid">
            <span class="pit"><Picto nom="oeil" /><span class="pit-t">Lire en entier</span></span>
            <span class="pit"><Picto nom="loupe" /><span class="pit-t">Chercher, compter</span></span>
            <span class="pit"><Picto nom="diff" /><span class="pit-t">Voir ce qui a changé</span></span>
            <span class="pit"><Picto nom="git" /><span class="pit-t">Versionner</span></span>
          </div>
        </div>
        <div>
          <Picto nom="page-close" taille="3.2em" />
          <h4>MUR</h4>
          <div class="pgrid">
            <span class="pit"><Picto nom="page-close" /><span class="pit-t">.docx, .pdf</span></span>
            <span class="pit"><Picto nom="grille" /><span class="pit-t">Un tableur</span></span>
            <span class="pit"><Picto nom="image" /><span class="pit-t">Une capture</span></span>
            <span class="pit"><Picto nom="clic" /><span class="pit-t">Ce que vous avez cliqué</span></span>
          </div>
        </div>
      </div>
      <p class="e">Un format binaire est un mur : ni l'agent, ni Git, ni vous dans six mois.</p>
    </Slide>

    <Slide bandeau="Concrètement" droite={D}>
      <h2 class="e">Ce que ça change dans vos fichiers</h2>
      <table class="e large">
        <thead><tr><th>Au lieu de</th><th>Préférer</th><th>Ce qu'on y gagne</th></tr></thead>
        <tbody>
          <tr><td>Word</td><td>LaTeX, Quarto, Markdown</td><td>Le diff, la citation, la relecture</td></tr>
          <tr><td>Cliquer dans un tableur</td><td>Un script R</td><td>Rejouable, contestable</td></tr>
          <tr><td>Dropbox, « version_finale_2 »</td><td>Git</td><td>Qui, quoi, quand, et le retour</td></tr>
          <tr><td>Une capture d'écran</td><td>Le fichier de données</td><td>Il le relit, il ne la regarde pas</td></tr>
          <tr><td>Un PDF annoté</td><td>Des notes en texte</td><td>Cherchable en masse</td></tr>
        </tbody>
      </table>
      <p class="e">
        Chaque ligne vaut déjà sans agent. Il ne fait qu'augmenter la prime.
      </p>
    </Slide>

    <Slide bandeau="Ressource rare" droite={D}>
      <h2 class="e">Le contexte est une ressource limitée</h2>
      <Contexte2 />
    </Slide>

    <Slide bandeau="La bonne unité de travail" droite={D}>
      <h2 class="e">Une tâche, un début, une fin vérifiable</h2>
      <div class="pduo">
        <div>
          <Picto nom="croix" taille="2.6em" />
          <h4>MAL DÉCOUPÉ</h4>
          <p>« Fais ma revue de littérature. »</p>
          <p class="e credits">Aucun critère d'arrêt.</p>
        </div>
        <div>
          <Picto nom="coche" taille="2.6em" />
          <h4>BIEN DÉCOUPÉ</h4>
          <p>« Pour les 40 PDF de <code>corpus/</code>, extrais titre, auteurs, année, DOI. »</p>
          <p class="e credits">On sait quand c'est fini, et on peut vérifier chaque ligne.</p>
        </div>
      </div>
    </Slide>

    <Slide bandeau="En recherche" droite={D}>
      <h2 class="e">Ce qu'on lui confie vraiment</h2>
      <div class="pgrid c2">
        <span class="pit"
          ><Picto nom="boite" taille="2.2em" /><span class="pit-t"
            >Collecte<span class="s">récupérer, renommer, ranger</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="grille" taille="2.2em" /><span class="pit-t"
            >Nettoyage<span class="s">le tidy data, puis relu</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="loupe" taille="2.2em" /><span class="pit-t"
            >Repérage<span class="s">retrouver ce que vous avez lu</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="coche" taille="2.2em" /><span class="pit-t"
            >Vérification<span class="s">recontrôler, lui compris</span></span
          ></span
        >
      </div>
      <p class="e">Qu'est-ce qui, dans votre semaine, est du texte et se répète ?</p>
    </Slide>

    <!-- ================= 7 · AGENTS PERMANENTS ================= -->
    <Slide fond="encre" bandeau="Cinquième temps" droite={D}>
      <h1 class="e">Des agents<br />qui ne s'arrêtent pas</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Qui appuie sur le bouton" droite={D}>
      <h2 class="e">Un agent n'a pas besoin de vous pour démarrer</h2>
      <Declencheurs />
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
