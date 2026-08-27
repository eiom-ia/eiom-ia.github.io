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
  import Logo from '$lib/deck/Logo.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Citation from '$lib/deck/Citation.svelte';
  import Minuterie from '$lib/deck/demos/Minuterie.svelte';
  import Collage from '$lib/deck/demos/Collage.svelte';
  import Boucle from '$lib/deck/demos/Boucle.svelte';
  import Mcp from '$lib/deck/demos/Mcp.svelte';
  import TroisMots from '$lib/deck/demos/TroisMots.svelte';
  import Terminal from '$lib/deck/demos/Terminal.svelte';
  import GuiVsTerminal from '$lib/deck/demos/GuiVsTerminal.svelte';
  import Contexte2 from '$lib/deck/demos/Contexte2.svelte';
  import EntreeAgent from '$lib/deck/demos/EntreeAgent.svelte';
  import ChevalHarnais from '$lib/deck/demos/ChevalHarnais.svelte';
  import ModeleHarnaisAgent from '$lib/deck/demos/ModeleHarnaisAgent.svelte';
  import PanoramaHarnais from '$lib/deck/demos/PanoramaHarnais.svelte';
  import SkillFichier from '$lib/deck/demos/SkillFichier.svelte';
  import PluginPaquet from '$lib/deck/demos/PluginPaquet.svelte';
  import TexteVsBouton from '$lib/deck/demos/TexteVsBouton.svelte';
  import PassagesTexte from '$lib/deck/demos/PassagesTexte.svelte';
  import InjectionDirecte from '$lib/deck/demos/InjectionDirecte.svelte';
  import InjectionIndirecte from '$lib/deck/demos/InjectionIndirecte.svelte';
  import CoutJetons from '$lib/deck/demos/CoutJetons.svelte';
  import Beads from '$lib/deck/demos/Beads.svelte';
  import Gastown from '$lib/deck/demos/Gastown.svelte';
  import HermesFusion from '$lib/deck/demos/HermesFusion.svelte';
  import HermesProjets from '$lib/deck/demos/HermesProjets.svelte';
  import MontreFlux from '$lib/deck/demos/MontreFlux.svelte';
  import DefiMemoire from '$lib/deck/demos/DefiMemoire.svelte';
  import DefiContexte from '$lib/deck/demos/DefiContexte.svelte';
  import DefiModeles from '$lib/deck/demos/DefiModeles.svelte';
  import DefiAvis from '$lib/deck/demos/DefiAvis.svelte';
  import SourcesAgentiques from '$lib/deck/demos/SourcesAgentiques.svelte';

  const TOTAL = 52;
  const D = 'IA agentique · jeu 27 août';

  // Les trois terminaux du deuxième temps. Une commande par clic.
  const T_BASE = [
    { cmd: 'pwd', out: '/home/vous/projet-these' },
    { cmd: 'ls', out: 'donnees/   llm.R   memoire.tex' },
    { cmd: 'cat llm.R', out: 'library(ellmer)\n\nchat <- chat_openrouter(\n  model = "google/gemini-3.5-flash-lite",\n  echo  = "none"\n)\n\nchat$chat("Quelle est la capitale de la France ?")' }
  ];



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
      <p class="lead e">Parcours <em>L'intelligence artificielle et la recherche</em></p>
      <p class="lead e">Laurence-Olivier M. Foisy</p>
    </Slide>


    <!-- ================= 1 · C'EST QUOI UN AGENT ================= -->
    <Slide bandeau="Le mot, avant la technologie" droite={D}>
      <Collage titre="C'est quoi un agent ?" images={AGENTS_FICTION} />
    </Slide>

    <Slide bandeau="Et des vrais" droite={D}>
      <Collage titre="C'est quoi un agent ?" images={AGENTS_REELS} />
    </Slide>

    <Slide bandeau="Définition" droite={D}>
      <EntreeAgent />
    </Slide>


    <!-- ================= 2 · LE TERMINAL ET LE HARNAIS ================= -->
    <Slide fond="encre" bandeau="Deuxième temps" droite={D}>
      <h1 class="e">Les harnais</h1>
      <hr class="filet" />
      <p class="lead e">Comment du texte devient une action.</p>
    </Slide>

    <Slide bandeau="Trois mots à ne pas confondre" droite={D}>
      <h2 class="e">Le modèle, le harnais, l'agent</h2>
      <ModeleHarnaisAgent />
    </Slide>

    <Slide bandeau="Le point de départ" droite={D}>
      <h2 class="e">Seul, un LLM ne fait que du texte</h2>
      <Boucle />
    </Slide>

    <Slide bandeau="La bascule" droite={D}>
      <h2 class="e">Mais du texte peut être une commande</h2>
      <div class="commande-pont e">
        <div class="cp-source"><span>LE MODÈLE ÉCRIT</span><strong>« mkdir résultats »</strong></div>
        <div class="cp-fleche">→</div>
        <figure><img src="{base}/img/agentique/bash.svg" alt="Le logo de GNU Bash" /><figcaption>BASH LIT</figcaption></figure>
        <div class="cp-fleche">→</div>
        <div class="cp-effet"><span>L'ORDINATEUR AGIT</span><strong>résultats/</strong></div>
      </div>
      <p class="lead e">La sortie de l'un est exactement l'entrée de l'autre.</p>
    </Slide>

    <Slide fond="encre" bandeau="Troisième temps" droite={D}>
      <h1 class="e">Le terminal</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Deux portes, une même machine" droite={D}>
      <h2 class="e">L'interface graphique et le terminal</h2>
      <GuiVsTerminal />
    </Slide>

    <Slide fond="terminal">
      <Terminal lignes={T_BASE} invite="terminal — trois commandes suffisent" plein />
    </Slide>

    <Slide fond="encre" bandeau="La thèse du cours" droite={D}>
      <h1 class="e">Le texte<br />devient roi</h1>
      <hr class="filet" />
      <p class="lead e">
        Tout ce qui est du texte brut, un modèle peut le lire, l'écrire, le chercher, le comparer et
        le versionner. Tout le reste lui est opaque.
      </p>
    </Slide>

    <Slide bandeau="Le pont" droite={D}>
      <h2 class="e">Le harnais relie le modèle et la machine</h2>
      <Boucle harnais />
    </Slide>

    <Slide bandeau="Le mot qui manquait" droite={D}>
      <h2 class="e">Un harnais, c'est le programme qui tient la bride</h2>
      <ChevalHarnais />
    </Slide>


    <Slide bandeau="Panorama" droite={D}>
      <h2 class="e">Tout le monde construit son harnais</h2>
      <PanoramaHarnais />
    </Slide>

    <Slide bandeau="La vraie question" droite={D}>
      <h2 class="e">Qui vous laisse brancher quoi</h2>
      <div class="pgrid c3">
        <span class="pit"
          ><Picto nom="coche" taille="2.2em" /><span class="pit-t"
            ><span class="nomlogo"><Logo nom="openai" alt="OpenAI" taille="1.5em" />OpenAI</span><span class="s">votre abonnement marche dans un harnais tiers</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="croix" taille="2.2em" /><span class="pit-t"
            ><span class="nomlogo"><Logo nom="anthropic" alt="Anthropic" taille="1.5em" />Anthropic</span><span class="s">bloqué depuis avril 2026</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="croix" taille="2.2em" /><span class="pit-t"
            ><span class="nomlogo"><Logo nom="google" alt="Google" taille="1.5em" />Google</span><span class="s">bloqué depuis février 2026</span></span
          ></span
        >
      </div>
      <Citation source="La précision qui compte">
        Ça vaut pour les <strong>abonnements</strong>. Une clé d'API, elle, marche partout et chez
        tout le monde, vous payez au jeton.
      </Citation>
    </Slide>

    <!-- ================= PRATIQUE 1 ================= -->
    <Slide fond="encre" bandeau="Pratique" droite={D}>
      <h1 class="e">À vous :<br />installer et lancer</h1>
      <hr class="filet" />
      <p class="lead e">On ouvre un terminal et on installe un harnais.</p>
    </Slide>

    <Slide bandeau="Premier essai" droite={D}>
      <h2 class="e">À votre tour d'essayer</h2>
      <Code src={c_prompt_vague} brut />
    </Slide>

    <Slide bandeau="Deuxième essai" droite={D}>
      <h2 class="e">La même chose, sans rien à deviner</h2>
      <Code src={c_prompt_precis} brut />
    </Slide>

    <Slide fond="encre" bandeau="Pause" droite={D}>
      <h1 class="e">Pause</h1>
      <hr class="filet" />
      <Minuterie minutes={15} />
    </Slide>

    <!-- ================= 4 · ÉTENDRE UN AGENT ================= -->
    <Slide fond="encre" bandeau="Troisième temps" droite={D}>
      <h1 class="e">Augmenter les capacités<br />d'un agent</h1>
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
      <h2 class="e">Le vocabulaire essentiel</h2>
      <TroisMots />
    </Slide>

    <Slide bandeau="Skill" droite={D}>
      <h2 class="e">SKILL.md</h2>
      <SkillFichier />
    </Slide>



    <Slide bandeau="MCP" droite={D}>
      <h2 class="e">Model Context Protocol, ou MCP</h2>
      <Mcp />
      <p class="e">
        Le serveur déclare ce qu'il sait faire ; le harnais lit cette déclaration et s'en sert. Les
        identifiants restent du côté du serveur, jamais dans le contexte du modèle.
      </p>
    </Slide>

    <Slide bandeau="Plugin" droite={D}>
      <h2 class="e">Les plugins</h2>
      <PluginPaquet />
    </Slide>

    <!-- ================= 5 · CE QUI PEUT MAL TOURNER ================= -->
    <Slide fond="encre" bandeau="Ce qui peut mal tourner" droite={D}>
      <h1 class="e">Les dangers de<br />l'IA agentique</h1>
      <hr class="filet" />
      <p class="lead e">
        Vous ne donnez plus seulement vos conversations au modèle : vous lui donnez l'ensemble de
        votre ordinateur et de vos données.
      </p>
    </Slide>

    <Slide bandeau="Première porte" droite={D}>
      <h2 class="e">L'injection de prompt directe</h2>
      <InjectionDirecte />
    </Slide>

    <Slide bandeau="Deuxième porte" droite={D}>
      <h2 class="e">L'injection de prompt indirecte</h2>
      <InjectionIndirecte />
    </Slide>


    <!-- ================= 6 · UN BON FLUX DE TRAVAIL ================= -->
    <Slide fond="encre" bandeau="Quatrième temps" droite={D}>
      <h1 class="e">Un bon flux de travail</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="La thèse, payée" droite={D}>
      <h2 class="e">Un bouton cache le changement, le texte le montre</h2>
      <TexteVsBouton />
    </Slide>

    <Slide bandeau="Concrètement" droite={D}>
      <h2 class="e">Ce que ça change dans vos fichiers</h2>
      <PassagesTexte />
    </Slide>

    <Slide bandeau="Ressource rare" droite={D}>
      <h2 class="e">Le contexte est une ressource limitée</h2>
      <Contexte2 />
    </Slide>

    <Slide bandeau="Ce que ça coûte" droite={D}>
      <h2 class="e">Deux façons de payer l'agent</h2>
      <CoutJetons />
    </Slide>

    <Slide bandeau="La bonne unité de travail" droite={D}>
      <h2 class="e">Une tâche, un début, une fin vérifiable</h2>
      <div class="pduo tache-unite">
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

    <!-- ================= 7 · AGENTS PERMANENTS ================= -->
    <Slide fond="encre" bandeau="Cinquième temps" droite={D}>
      <h1 class="e">Des agents qui vivent<br />dans le cloud</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Un cas" droite={D}>
      <h2 class="e">
        <span class="nomlogo"><Logo nom="nousresearch" alt="Nous Research" taille="1.5em" />Hermes :
        un agent qui vit sur un serveur</span>
      </h2>
      <HermesFusion />
    </Slide>

    <Slide bandeau="La communauté" droite={D}>
      <h2 class="e">Ce que des gens ont déjà branché à Hermes</h2>
      <HermesProjets />
    </Slide>

    <Slide fond="encre" bandeau="Un exemple, le mien" droite={D}>
      <h1 class="e">Demandez et<br />vous recevrez</h1>
      <hr class="filet" />
      <p class="lead e">Quand l'IA a réglé mon problème de montre intelligente</p>
    </Slide>

    <Slide bandeau="Comment" droite={D}>
      <h2 class="e">De mes données jusqu'à ma montre</h2>
      <MontreFlux />
    </Slide>

    <!-- ================= CE QUI N'EST PAS RÉGLÉ ================= -->
    <Slide bandeau="Les trois murs" droite={D}>
      <h2 class="e">Les trois défis principaux de l'IA agentique</h2>
      <div class="pgrid c3">
        <span class="pit"
          ><Picto nom="poubelle" taille="2.4em" /><span class="pit-t"
            >Aucune mémoire<span class="s">chaque session repart de zéro</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="boite" taille="2.4em" /><span class="pit-t"
            >Le contexte<span class="s">il se remplit, rien ne le vide bien</span></span
          ></span
        >
        <span class="pit"
          ><Picto nom="eclair" taille="2.4em" /><span class="pit-t"
            >Le mauvais modèle<span class="s">un modèle de pointe pour renommer des fichiers</span></span
          ></span
        >
      </div>
      <p class="e">
        Le troisième est le plus coûteux et le moins visible : on paie un raisonnement de pointe
        pour des gestes qui n'en demandent aucun.
      </p>
    </Slide>

    <Slide bandeau="Défi 1 · la mémoire" droite={D}>
      <h2 class="e">Se souvenir sans tout traîner</h2>
      <DefiMemoire />
    </Slide>

    <Slide bandeau="Défi 2 · le contexte" droite={D}>
      <h2 class="e">Les fenêtres grandissent, les tâches doivent rétrécir</h2>
      <DefiContexte />
    </Slide>

    <Slide bandeau="Beads, par Steve Yegge" droite={D}>
      <h2 class="e">Solution au contexte : Beads</h2>
      <Beads />
    </Slide>

    <Slide bandeau="Défi 3 · les modèles" droite={D}>
      <h2 class="e">Le bon modèle pour le bon travail</h2>
      <DefiModeles />
    </Slide>

    <Slide bandeau="Gastown, par Steve Yegge" droite={D}>
      <h2 class="e">Une ville d'agents, un modèle par métier</h2>
      <Gastown />
    </Slide>

    <Slide fond="encre" bandeau="Pause" droite={D}>
      <h1 class="e">Pause</h1>
      <hr class="filet" />
      <Minuterie minutes={15} />
    </Slide>

    <!-- ================= L'EXERCICE ================= -->
    <Slide fond="encre" bandeau="Septième temps" droite={D}>
      <h1 class="e">À votre tour</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Le corpus" droite={D}>
      <h2 class="e">Le défi : analyser 551 avis avec un LLM</h2>
      <DefiAvis />
    </Slide>

    <Slide fond="encre" bandeau="Dernier temps" droite={D}>
      <h1 class="e">Qu'est-ce que vous<br />allez en faire ?</h1>
      <hr class="filet" />
    </Slide>

    <!-- ================= CLÔTURE ================= -->

    <Slide d={0.88} bandeau="Sources" droite={D}>
      <h2 class="e">Sources</h2>
      <hr class="filet" />
      <SourcesAgentiques />
    </Slide>

  {/snippet}
</Deck>

<style>
  .commande-pont {
    display: grid;
    grid-template-columns: 1fr auto 0.7fr auto 1fr;
    align-items: stretch;
    gap: 0.65em;
    width: 100%;
  }
  .cp-source,
  .cp-effet {
    border: 3px solid var(--dk-encre);
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.45em;
  }
  .cp-effet { border-color: var(--dk-accent); }
  .cp-source span,
  .cp-effet span,
  .commande-pont figcaption { color: var(--dk-gris); font-size: 0.58em; letter-spacing: 0.13em; }
  .cp-source strong,
  .cp-effet strong { font-size: 1em; }
  .cp-effet strong { color: var(--dk-accent); }
  .cp-fleche { align-self: center; color: var(--dk-accent); font-size: 2em; font-weight: 600; }
  .commande-pont figure { margin: 0; display: grid; place-items: center; gap: 0.25em; }
  .commande-pont img { width: 5.5em; height: 5.5em; object-fit: contain; }
  .tache-unite > div { padding: 1.1em; }
  .tache-unite h4 { font-size: 0.78em; }
  .tache-unite p { font-size: 1.05em; line-height: 1.4; }
  .tache-unite .credits { font-size: 0.78em; }
  @media (max-width: 46rem) {
    .commande-pont { grid-template-columns: 1fr; }
    .cp-fleche { transform: rotate(90deg); }
  }
</style>
