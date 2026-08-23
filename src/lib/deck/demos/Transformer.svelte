<script>
  /**
   * Schéma d'un bloc transformer à décodeur seul — l'architecture des modèles
   * utilisés cette semaine. Original, d'après Vaswani et al. 2017.
   * Les composants sont nommés, le texte est réduit aux étiquettes.
   */
  const X = 90, W = 330;          // colonne du schéma
  const cx = X + W / 2;

  // De bas en haut, comme la figure canonique.
  const ETAGES = [
    { y: 404, t: 'Jetons', ton: 'entree' },
    { y: 352, t: 'Plongements + position' },
    { y: 288, t: 'Attention multi-têtes', ton: 'accent', bloc: true },
    { y: 236, t: 'Addition et normalisation', bloc: true },
    { y: 184, t: 'Réseau à propagation avant', bloc: true },
    { y: 132, t: 'Addition et normalisation', bloc: true },
    { y: 68,  t: 'Projection linéaire + softmax' },
    { y: 16,  t: 'Distribution sur le vocabulaire', ton: 'entree' }
  ];
  const H = 36;

  const BLOC = { haut: 106, bas: 314 };   // cadre englobant les quatre étages

  const NOTES = [
    { y: 288, t: 'chaque position pondère toutes les autres' },
    { y: 210, t: 'coût en n² sur la longueur du texte' },
    { y: 16,  t: 'une probabilité par jeton du vocabulaire' }
  ];
</script>

<div class="tf">
  <svg viewBox="0 -22 1000 466" role="img"
       aria-label="Schéma d'un bloc transformer à décodeur seul">

    <!-- cadre du bloc répété -->
    <rect class="cadre" x={X - 16} y={BLOC.haut} width={W + 32} height={BLOC.bas - BLOC.haut} />
    <text class="xn" x={X - 16} y={BLOC.haut - 12}>× N</text>

    <!-- flux -->
    {#each ETAGES as e, i}
      {#if i < ETAGES.length - 1}
        <path class="fl" d="M{cx} {e.y - H} L{cx} {ETAGES[i + 1].y + 6}" />
        <path class="fl" d="M{cx - 5} {ETAGES[i + 1].y + 11} L{cx} {ETAGES[i + 1].y + 4} L{cx + 5} {ETAGES[i + 1].y + 11}" />
      {/if}
    {/each}

    <!-- connexions résiduelles -->
    <path class="res" d="M{X - 4} {314} C{X - 44} {314}, {X - 44} {236 + H / 2}, {X - 4} {236 + H / 2}" />
    <path class="res" d="M{X - 4} {210} C{X - 44} {210}, {X - 44} {132 + H / 2}, {X - 4} {132 + H / 2}" />

    <!-- étages -->
    {#each ETAGES as e}
      <g class="et {e.ton ?? ''}">
        <rect x={X} y={e.y - H} width={W} height={H} />
        <text x={cx} y={e.y - H / 2 + 6} text-anchor="middle">{e.t}</text>
      </g>
    {/each}

    <!-- annotations -->
    {#each NOTES as n}
      <g class="no">
        <path d="M{X + W + 10} {n.y - H / 2} L{X + W + 52} {n.y - H / 2}" />
        <text x={X + W + 62} y={n.y - H / 2 + 6}>{n.t}</text>
      </g>
    {/each}
  </svg>
</div>

<style>
  .tf { width: 100%; }
  svg { width: 100%; height: auto; display: block; overflow: visible; }

  :global(.tf .cadre) {
    fill: none; stroke: var(--dk-gris-2); stroke-width: 2; stroke-dasharray: 7 5;
  }
  :global(.tf .xn) {
    font-family: var(--dk-mono); font-size: 20px; font-weight: 600;
    fill: var(--dk-gris);
  }

  :global(.tf .fl) { stroke: var(--dk-encre); stroke-width: 2.5; fill: none; }
  :global(.tf .res) { stroke: var(--dk-accent); stroke-width: 2; fill: none; stroke-dasharray: 4 4; }

  :global(.tf .et rect) { fill: var(--dk-fond); stroke: var(--dk-encre); stroke-width: 2.5; }
  :global(.tf .et text) {
    font-family: var(--dk-mono); font-size: 17px; fill: var(--dk-encre);
  }
  :global(.tf .et.accent rect) { fill: var(--dk-accent); stroke: var(--dk-accent); }
  :global(.tf .et.accent text) { fill: var(--dk-fond); font-weight: 600; }
  :global(.tf .et.entree rect) { fill: none; stroke: var(--dk-gris-2); stroke-dasharray: 5 4; }
  :global(.tf .et.entree text) { fill: var(--dk-gris); }

  :global(.tf .no path) { stroke: var(--dk-gris-2); stroke-width: 1.5; }
  :global(.tf .no text) {
    font-family: var(--dk-mono); font-size: 15px; fill: var(--dk-gris);
  }
</style>
