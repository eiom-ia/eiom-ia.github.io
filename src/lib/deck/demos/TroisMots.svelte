<script>
  /**
   * Skill, MCP, plugin: les trois mots que la salle confondra si on se
   * contente de les définir côte à côte.
   *
   * Ils apparaissent un par un, chacun avec sa forme propre, et la troisième
   * forme CONTIENT les deux premières. C'est la relation qui compte et c'est
   * précisément ce qu'un texte n'arrive pas à dire.
   *
   * Le glyphe est en SVG, le texte en HTML: la prose garde ainsi la
   * typographie du deck et se replie sans déborder.
   */
  import { brancherTemps } from '../temps.js';

  const MOTS = [
    {
      n: 'SKILL',
      d: 'Du savoir-faire.',
      q: '« Voici comment on fait une fiche de lecture, ici. »',
      f: 'page'
    },
    {
      n: 'MCP',
      d: 'Des capacités.',
      q: '« Tu peux maintenant interroger Zotero. »',
      f: 'prise'
    },
    {
      n: 'PLUGIN',
      d: 'Un emballage.',
      q: '« Installe tout ça d’un coup. »',
      f: 'boite'
    }
  ];

  let js = $state(false);
  let e = $state(MOTS.length);
  let hote = $state(null);

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: MOTS.length, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="trm" bind:this={hote}>
  <div class="trm-rang">
    {#each MOTS as m, i}
      <div class="trm-col" class:vue={!js || i < e}>
        <svg class="trm-g" viewBox="0 0 200 150" aria-hidden="true">
          {#if m.f === 'page'}
            <!-- un document: des consignes, rien de plus -->
            <path class="tr" d="M62 18 L118 18 L138 38 L138 132 L62 132 Z" />
            <path class="tr" d="M118 18 L118 38 L138 38" />
            <line class="tl" x1="76" y1="58" x2="124" y2="58" />
            <line class="tl" x1="76" y1="76" x2="124" y2="76" />
            <line class="tl" x1="76" y1="94" x2="110" y2="94" />
          {:else if m.f === 'prise'}
            <!-- une prise: plusieurs harnais, un seul branchement -->
            <line class="tl" x1="18" y1="46" x2="72" y2="46" />
            <line class="tl" x1="18" y1="75" x2="72" y2="75" />
            <line class="tl" x1="18" y1="104" x2="72" y2="104" />
            <rect class="tr plein" x="72" y="52" width="56" height="46" />
            <line class="tl" x1="128" y1="75" x2="182" y2="75" />
            <circle class="tp" cx="18" cy="46" r="5" />
            <circle class="tp" cx="18" cy="75" r="5" />
            <circle class="tp" cx="18" cy="104" r="5" />
            <circle class="tp" cx="182" cy="75" r="5" />
          {:else}
            <!-- une boîte qui contient les deux autres -->
            <rect class="tr tirets" x="26" y="22" width="148" height="106" />
            <path class="tr mini" d="M46 44 L74 44 L84 54 L84 106 L46 106 Z" />
            <line class="tl" x1="54" y1="64" x2="76" y2="64" />
            <line class="tl" x1="54" y1="76" x2="76" y2="76" />
            <rect class="tr plein mini" x="104" y="60" width="46" height="30" />
            <line class="tl" x1="94" y1="75" x2="104" y2="75" />
            <line class="tl" x1="150" y1="75" x2="160" y2="75" />
          {/if}
        </svg>
        <h4 class="trm-n">{m.n}</h4>
        <p class="trm-d">{m.d}</p>
        <p class="trm-q">{m.q}</p>
      </div>
    {/each}
  </div>

  <p class="trm-coupe" class:vue={!js || e >= MOTS.length}>
    La coupure utile : <strong>MCP est un protocole</strong>, commun à tous les harnais ;
    <strong>un plugin est un format de distribution</strong>, propre à un seul.
  </p>
</div>

<style>
  .trm {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .trm-rang {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6em;
  }
  .trm-col {
    border: 2px solid var(--dk-encre);
    padding: 0.9em 1em 1.1em;
    opacity: 0;
    transform: translateY(0.5em);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }
  .trm-col.vue {
    opacity: 1;
    transform: none;
  }
  .trm-g {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 0.5em;
  }
  :global(.trm .tr) {
    fill: none;
    stroke: var(--dk-encre);
    stroke-width: 4;
  }
  :global(.trm .tr.plein) {
    fill: var(--dk-accent);
    stroke: var(--dk-accent);
  }
  :global(.trm .tr.tirets) {
    stroke-dasharray: 10 7;
    stroke-width: 3.5;
  }
  :global(.trm .tr.mini) {
    stroke-width: 3.5;
  }
  :global(.trm .tl) {
    stroke: var(--dk-gris-2);
    stroke-width: 3.5;
  }
  :global(.trm .tp) {
    fill: var(--dk-gris-2);
  }
  .trm-n {
    margin: 0 0 0.3em;
    font-size: 0.86em;
    letter-spacing: 0.16em;
    color: var(--dk-accent);
  }
  .trm-n::before {
    content: '[ ';
  }
  .trm-n::after {
    content: ' ]';
  }
  .trm-d {
    margin: 0 0 0.35em;
    font-weight: 600;
    font-size: 0.94em;
  }
  .trm-q {
    margin: 0;
    font-size: 0.86em;
    color: var(--dk-gris);
  }
  .trm-coupe {
    margin: 0;
    font-size: 0.92em;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
  .trm-coupe.vue {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .trm-col,
    .trm-coupe {
      transition: none;
    }
  }
</style>
