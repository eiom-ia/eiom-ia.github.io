<script>
  /**
   * L'intuition de l'attention, sans vocabulaire technique: avant, un mot ne
   * voit que son voisin et l'information s'épuise avec la distance; avec
   * l'attention, chaque mot regarde directement tous les autres.
   *
   * Schéma de principe. Aucune valeur de pondération n'est affichée: elles
   * seraient inventées.
   */
  const MOTS = ['La', 'chercheuse', 'a', 'déposé', 'l’article', 'qu’elle', 'jugeait', 'prêt'];
  const SRC = 5;   // « qu’elle »
  const CIB = 1;   // « chercheuse »

  // En monospace la largeur d'un mot se calcule: 0,6 em par caractère. Un
  // espacement à intervalle fixe faisait se chevaucher les mots longs.
  const TAILLE = 26, CAR = TAILLE * 0.6, ESPACE = CAR * 2.2;
  const LARG = MOTS.map((m) => m.length * CAR);
  const DEB = LARG.reduce((acc, l, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + LARG[i - 1] + ESPACE);
    return acc;
  }, []);
  const TOT = DEB[MOTS.length - 1] + LARG[MOTS.length - 1];
  const W = TOT + 40;
  const cx = (i) => 20 + DEB[i] + LARG[i] / 2;
</script>

<div class="att">
  <div class="panneau">
    <p class="lab">Avant · de proche en proche</p>
    <svg viewBox="0 0 {W} 120" role="img" aria-label="Chaque mot ne voit que son voisin">
      {#each MOTS as m, i}
        <text class="mot" x={cx(i)} y="96" text-anchor="middle">{m}</text>
        {#if i < MOTS.length - 1}
          <path class="lien court" d="M{cx(i) + LARG[i] / 2 + 4} 66 Q{(cx(i) + cx(i + 1)) / 2} 54, {cx(i + 1) - LARG[i + 1] / 2 - 4} 66" />
        {/if}
      {/each}
      <path class="lien perdu"
            d="M{cx(SRC)} 62 C{cx(SRC)} 14, {cx(CIB)} 14, {cx(CIB)} 62" />
    </svg>
    <p class="note">Le lien avec « chercheuse » doit traverser toute la phrase.</p>
  </div>

  <div class="panneau">
    <p class="lab on">Avec l’attention · directement</p>
    <svg viewBox="0 0 {W} 120" role="img" aria-label="Chaque mot regarde tous les autres directement">
      {#each MOTS as m, i}
        <text class="mot" class:vif={i === SRC || i === CIB} x={cx(i)} y="96" text-anchor="middle">{m}</text>
        {#if i !== SRC}
          <path class="lien fin" class:fort={i === CIB}
                d="M{cx(SRC)} 62 C{cx(SRC)} 14, {cx(i)} 14, {cx(i)} 62" />
        {/if}
      {/each}
    </svg>
    <p class="note">« qu’elle » atteint « chercheuse » en un pas, quelle que soit la distance.</p>
  </div>
</div>

<style>
  .att { display: flex; flex-direction: column; gap: 1.1em; width: 100%; }
  .panneau { display: flex; flex-direction: column; gap: 0.25em; }
  svg { width: 100%; height: auto; display: block; }

  .lab {
    font-family: var(--dk-mono); font-size: 0.62em;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--dk-gris); margin: 0;
  }
  .lab.on { color: var(--dk-accent); }
  .note { font-size: 0.8em; color: var(--dk-gris); margin: 0; }

  :global(.att .mot) {
    font-family: var(--dk-mono); font-size: 26px; fill: var(--dk-encre);
  }
  :global(.att .mot.vif) { fill: var(--dk-accent); font-weight: 600; }

  :global(.att .lien) { fill: none; stroke: var(--dk-gris-2); stroke-width: 2; }
  :global(.att .lien.court) { stroke: var(--dk-encre); }
  :global(.att .lien.perdu) { stroke-dasharray: 5 6; stroke: var(--dk-gris-2); }
  :global(.att .lien.fin) { stroke: var(--dk-gris-2); stroke-width: 1.5; }
  :global(.att .lien.fort) { stroke: var(--dk-accent); stroke-width: 3; }
</style>
