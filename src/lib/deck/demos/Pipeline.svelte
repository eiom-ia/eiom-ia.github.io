<script>
  /**
   * Chaîne de production d'un modèle. La même sur les trois diapositives de
   * biais, avec une étape allumée à chaque fois: on voit OÙ le biais entre,
   * au lieu de lire trois définitions.
   */
  let { etape = '' } = $props();

  const ETAPES = [
    { id: 'corpus', t: 'Corpus' },
    { id: 'balisage', t: 'Balisage' },
    { id: 'entrainement', t: 'Entraînement' },
    { id: 'modele', t: 'Modèle' }
  ];
  const W = 210, G = 52, H = 76;
</script>

<div class="pl">
  <svg viewBox="0 0 {ETAPES.length * W + (ETAPES.length - 1) * G} {H + 30}" role="img"
       aria-label="Chaîne de production d’un modèle: corpus, balisage, entraînement, modèle">
    {#each ETAPES as e, i}
      {@const x = i * (W + G)}
      <g class="st" class:on={e.id === etape} class:fin={e.id === 'modele'}>
        <rect x={x} y="14" width={W} height={H} />
        <text x={x + W / 2} y={14 + H / 2 + 7} text-anchor="middle">{e.t}</text>
      </g>
      {#if i < ETAPES.length - 1}
        <path class="fx" d="M{x + W + 8} {14 + H / 2} L{x + W + G - 12} {14 + H / 2}" />
        <path class="fx" d="M{x + W + G - 20} {14 + H / 2 - 7} L{x + W + G - 11} {14 + H / 2} L{x + W + G - 20} {14 + H / 2 + 7}" />
      {/if}
    {/each}
  </svg>
</div>

<style>
  .pl { width: 100%; }
  svg { width: 100%; height: auto; display: block; }

  :global(.pl .st rect) { fill: none; stroke: var(--dk-gris-2); stroke-width: 2.5; }
  :global(.pl .st text) {
    font-family: var(--dk-mono); font-size: 26px; fill: var(--dk-gris);
  }
  :global(.pl .st.fin rect) { stroke: var(--dk-encre); }
  :global(.pl .st.fin text) { fill: var(--dk-encre); }
  :global(.pl .st.on rect) { fill: var(--dk-accent); stroke: var(--dk-accent); }
  :global(.pl .st.on text) { fill: var(--dk-fond); font-weight: 600; }
  :global(.pl .fx) { stroke: var(--dk-gris-2); stroke-width: 2.5; fill: none; }
</style>
