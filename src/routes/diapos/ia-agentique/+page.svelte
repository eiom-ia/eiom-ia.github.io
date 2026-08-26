<script>
  /**
   * L'IA agentique — cours de 4 heures.
   *
   * Reprise de la présentation FAS1001 « 9_llms_agentique » dans la doctrine
   * du parcours: brutalisme de terminal, fond clair, monospace intégral.
   *
   * La séquence d'origine est conservée telle quelle, parce que c'est elle qui
   * porte la pédagogie: le mot « agent » veut déjà dire quelque chose dans la
   * salle (fiction, puis métier), et la définition arrive après, gagnée plutôt
   * qu'assénée.
   *
   * Retiré de la source, propre à FAS1001: les trois diapositives « Structure
   * du cours », le TP 3, les logos d'université. L'illustration llm_text.png
   * (7,3 Mo, rendu IA) est remplacée par un schéma de la doctrine.
   */
  import { base } from '$app/paths';
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
  import Carte from '$lib/deck/Carte.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Minuterie from '$lib/deck/demos/Minuterie.svelte';

  const TOTAL = 25;
  const D = 'IA agentique · mar 25 août';
</script>

<svelte:head>
  <title>L'IA agentique</title>
</svelte:head>

<Deck total={TOTAL}>
  {#snippet children()}

    <Slide fond="encre" bandeau="Laurence-Olivier M. Foisy" droite={D}>
      <h1 class="e">L'IA agentique</h1>
      <hr class="filet" />
      <p class="lead e">Faire accomplir des actions à un modèle de langue</p>
    </Slide>

    <Slide bandeau="Aujourd'hui" droite={D}>
      <h2 class="e">Cinq temps</h2>
      <Deux ratio="1fr 1fr">
        <div>
          <Carte titre="1 · C'est quoi un agent">
            <p>Le mot avant la technologie. 40 minutes.</p>
          </Carte>
          <Carte titre="2 · Faire agir un LLM">
            <p>Du texte à l'action, et les outils qui le permettent. 50 minutes.</p>
          </Carte>
          <Carte titre="3 · MCP">
            <p>Comment un agent se branche au monde. 40 minutes.</p>
          </Carte>
        </div>
        <div>
          <Carte titre="4 · L'écosystème">
            <p>OpenClaw, ClawHub, Moltbook. 30 minutes.</p>
          </Carte>
          <Carte titre="5 · En recherche">
            <p>Ce qu'on délègue vraiment, et un atelier. 60 minutes.</p>
          </Carte>
          <Carte titre="Pause">
            <p>15 minutes, après le deuxième temps.</p>
          </Carte>
        </div>
      </Deux>
    </Slide>

    <Slide fond="encre" bandeau="Premier temps" droite={D}>
      <h1 class="e">C'est quoi un agent ?</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Le mot, avant la technologie" droite={D}>
      <h2 class="e">Vous connaissez déjà des agents</h2>
      <div class="gal-3">
        <figure><img src="{base}/img/agentique/007.png" alt="James Bond, agent 007" /></figure>
        <figure><img src="{base}/img/agentique/smith.png" alt="L'agent Smith, dans Matrix" /></figure>
        <figure><img src="{base}/img/agentique/47.png" alt="L'agent 47, dans Hitman" /></figure>
      </div>
    </Slide>

    <Slide bandeau="Et des vrais" droite={D}>
      <h2 class="e">Vous en avez même engagé</h2>
      <div class="gal-2">
        <figure>
          <img src="{base}/img/agentique/remax.png" alt="Un courtier immobilier" />
          <figcaption>Un courtier immobilier</figcaption>
        </figure>
        <figure>
          <img src="{base}/img/agentique/voyage.png" alt="Une agence de voyage" />
          <figcaption>Un agent de voyage</figcaption>
        </figure>
      </div>
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

    <Slide fond="encre" bandeau="Deuxième temps" droite={D}>
      <h1 class="e">Faire agir un LLM</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Donc ?" droite={D}>
      <h2 class="e">L'IA agentique fait accomplir des actions à un LLM</h2>
      <hr class="filet" />
      <p class="lead e">Comment ?</p>
      <p class="e">Les LLM ne font que générer du texte.</p>
    </Slide>

    <Slide bandeau="Comment ?" droite={D}>
      <h2 class="e">Le texte peut être une commande</h2>
      <figure class="schema e">
        <img src="{base}/img/agentique/bash.svg" alt="Le logo de GNU Bash" />
        <figcaption>Un terminal attend du texte. Un LLM produit du texte.</figcaption>
      </figure>
    </Slide>

    <Slide bandeau="Le point de départ" droite={D}>
      <h2 class="e">Seul, un LLM ne fait que du texte</h2>
      <figure class="schema e">
        <img
          src="{base}/img/agentique/llm_isole_texte_seulement_fr.svg"
          alt="Un LLM isolé n'a aucun accès à votre machine"
        />
        <figcaption>Le modèle et votre machine ne se touchent pas</figcaption>
      </figure>
    </Slide>

    <Slide bandeau="Le pont" droite={D}>
      <h2 class="e">L'agent relie le modèle et la machine</h2>
      <figure class="schema e">
        <img
          src="{base}/img/agentique/claude_code_pont_local_cloud_fr.svg"
          alt="Un agent local exécute des commandes sur votre machine"
        />
        <figcaption>Le logiciel local reçoit les décisions et exécute</figcaption>
      </figure>
    </Slide>

    <Slide bandeau="Le paysage" droite={D}>
      <h2 class="e">Les outils</h2>
      <Deux ratio="1fr 1fr">
        <Carte titre="Terminal">
          <ul>
            <li>Claude Code</li>
            <li>Codex</li>
            <li>Gemini CLI</li>
            <li>OpenCode</li>
            <li>Crush</li>
          </ul>
        </Carte>
        <Carte titre="IDE et interfaces">
          <ul>
            <li>Cursor</li>
            <li>GitHub Copilot</li>
            <li>Claude Desktop / Cowork</li>
            <li>Et le reste, chaque semaine</li>
          </ul>
        </Carte>
      </Deux>
    </Slide>

    <Slide fond="encre" bandeau="Pause" droite={D}>
      <h1 class="e">Pause</h1>
      <hr class="filet" />
      <Minuterie minutes={15} />
    </Slide>

    <Slide fond="encre" bandeau="Troisième temps" droite={D}>
      <h1 class="e">MCP</h1>
      <hr class="filet" />
      <div class="gal-logos">
        <img src="{base}/img/agentique/github-blanc.png" alt="GitHub" />
        <img src="{base}/img/agentique/drive.png" alt="Google Drive" />
        <img src="{base}/img/agentique/notion.png" alt="Notion" />
        <img src="{base}/img/agentique/brave.png" alt="Brave" />
        <img src="{base}/img/agentique/consensus.png" alt="Consensus" />
      </div>
    </Slide>

    <Slide bandeau="Le protocole" droite={D}>
      <h2 class="e">C'est quoi un MCP ?</h2>
      <figure class="schema e">
        <img
          src="{base}/img/agentique/api_vs_mcp_flow.svg"
          alt="Comparaison entre un appel d'API traditionnel et un accès via MCP"
        />
        <figcaption>Appel d'API classique, puis accès par un serveur MCP</figcaption>
      </figure>
    </Slide>

    <Slide fond="encre" bandeau="Quatrième temps" droite={D}>
      <h1 class="e">L'écosystème</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Un agent libre" droite={D}>
      <figure class="capture e">
        <img src="{base}/img/agentique/openclaw.png" alt="Le logo d'OpenClaw" />
      </figure>
    </Slide>

    <Slide bandeau="Sur GitHub" droite={D}>
      <figure class="capture e">
        <img src="{base}/img/agentique/openclaw-github.jpg" alt="Le dépôt GitHub d'OpenClaw" />
      </figure>
    </Slide>

    <Slide bandeau="Un dépôt de skills" droite={D}>
      <figure class="capture e">
        <img src="{base}/img/agentique/clawhub.jpg" alt="La page d'accueil de ClawHub" />
      </figure>
    </Slide>

    <Slide bandeau="Une skill" droite={D}>
      <figure class="capture e">
        <img src="{base}/img/agentique/clawhub-skill.jpg" alt="La fiche d'une skill sur ClawHub" />
      </figure>
    </Slide>

    <Slide bandeau="Un réseau social d'agents" droite={D}>
      <figure class="capture e">
        <img src="{base}/img/agentique/moltbook.jpg" alt="La page d'accueil de Moltbook" />
      </figure>
    </Slide>

    <Slide fond="encre" bandeau="Cinquième temps" droite={D}>
      <h1 class="e">En recherche</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="La question" droite={D}>
      <h2 class="e">Qu'est-ce qu'on fait avec des agents ?</h2>
      <Deux ratio="1fr 1fr">
        <div>
          <Carte titre="Collecte">
            <p>La collecte de données automatisée.</p>
          </Carte>
          <Carte titre="Nettoyage">
            <p>La mise en forme des données. Le <em>tidy data</em>, délégué.</p>
          </Carte>
        </div>
        <div>
          <Carte titre="Simulation">
            <p>La simulation de données sociales ?</p>
          </Carte>
          <Carte titre="À vous">
            <p>Vos idées.</p>
          </Carte>
        </div>
      </Deux>
    </Slide>

    <Slide fond="encre" bandeau="Atelier" droite={D}>
      <h1 class="e">Installer OpenClaw ?</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Sources" droite={D}>
      <h2 class="e">Sources</h2>
      <hr class="filet" />
      <ul class="cmd-liste e">
        <li>openclaw.ai<span class="lieu">agent libre, licence MIT — dépôt github.com/openclaw/openclaw</span></li>
        <li>clawhub.ai<span class="lieu">dépôt de skills pour agents</span></li>
        <li>moltbook.com<span class="lieu">réseau social pour agents</span></li>
        <li>modelcontextprotocol.io<span class="lieu">la spécification du protocole MCP</span></li>
      </ul>
      <p class="e credits">
        Captures d'écran reproduites en contexte pédagogique. Images de fiction : James Bond, Matrix,
        Hitman, citées à titre d'illustration.
      </p>
    </Slide>

  {/snippet}
</Deck>
