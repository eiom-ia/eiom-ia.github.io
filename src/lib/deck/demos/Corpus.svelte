<script>
  import donnees from './corpus.json';

  /**
   * Le corpus d'entraînement en treemap: la surface est la part réelle, donc
   * la domination du web se voit au lieu de se lire.
   *
   * Deux niveaux — les quatre natures de source, puis les jeux eux-mêmes.
   * Survoler une case donne sa part, ses époques et sa taille sur disque,
   * toutes tirées du tableau 1 de Touvron et al. 2023.
   *
   * Sans JavaScript, le treemap s'affiche entier; seule l'infobulle manque.
   */
  const W = 1000, H = 420, ECART = 3;

  // Treemap « squarifié »: on remplit toujours le côté le plus court, ce qui
  // garde les rectangles proches du carré et donc comparables à l'œil.
  function decouper(items, x, y, w, h, out = []) {
    if (!items.length) return out;
    const total = items.reduce((a, b) => a + b.part, 0);
    const horiz = w >= h;
    const cote = horiz ? h : w;
    let ligne = [], somme = 0, meilleur = Infinity, i = 0;
    for (; i < items.length; i++) {
      const s = somme + items[i].part;
      const lg = (s / total) * (horiz ? w : h);
      const r = Math.max(
        ...[...ligne, items[i]].map((it) => {
          const autre = (it.part / s) * cote;
          return Math.max(lg / autre, autre / lg);
        })
      );
      if (ligne.length && r > meilleur) break;
      ligne.push(items[i]);
      somme = s;
      meilleur = r;
    }
    const lg = (somme / total) * (horiz ? w : h);
    let d = 0;
    for (const it of ligne) {
      const autre = (it.part / somme) * cote;
      out.push(
        horiz
          ? { it, x, y: y + d, w: lg, h: autre }
          : { it, x: x + d, y, w: autre, h: lg }
      );
      d += autre;
    }
    const reste = items.slice(i);
    return horiz
      ? decouper(reste, x + lg, y, w - lg, h, out)
      : decouper(reste, x, y + lg, w, h - lg, out);
  }

  const G = donnees.groupes;
  const cadres = decouper(G, 0, 0, W, H);

  // Chaque groupe est ensuite redécoupé pour ses propres jeux de données.
  const cases = cadres.flatMap((c) =>
    decouper(
      c.it.sources,
      c.x + ECART,
      c.y + ECART,
      Math.max(c.w - ECART * 2, 1),
      Math.max(c.h - ECART * 2, 1)
    ).map((s) => ({ ...s, groupe: c.it.nom }))
  );

  let survol = $state(null);
  const TEINTE = { WEB: 1, RÉFÉRENCE: 0.62, CODE: 0.44, ACADÉMIQUE: 0.3 };
</script>

<div class="cor">
  <svg viewBox="0 0 {W} {H}" role="img" aria-label="Composition du corpus d'entraînement de LLaMA en treemap: le web occupe 82 % de la surface.">
    {#each cases as c}
      {@const petit = c.w < 118 || c.h < 46}
      {@const clair = TEINTE[c.groupe] >= 0.6}
      <g
        class="tuile"
        class:actif={survol === c.it.nom}
        class:clair={clair}
        role="button"
        tabindex="0"
        aria-label="{c.it.nom}, {c.it.part} pour cent"
        onmouseenter={() => (survol = c.it.nom)}
        onmouseleave={() => (survol = null)}
        onfocus={() => (survol = c.it.nom)}
        onblur={() => (survol = null)}
      >
        <rect x={c.x} y={c.y} width={c.w} height={c.h} style="--t: {TEINTE[c.groupe]}" />
        {#if !petit}
          <text class="n" x={c.x + 12} y={c.y + 26}>{c.it.nom}</text>
          <text class="p" x={c.x + 12} y={c.y + 56}>{String(c.it.part).replace('.', ',')} %</text>
        {:else}
          <text class="n mini" x={c.x + c.w / 2} y={c.y + c.h / 2 - 4} text-anchor="middle"
            >{c.it.nom.length * 8.4 > c.w ? c.it.nom.slice(0, Math.max(3, Math.floor(c.w / 8.4) - 1)) + '.' : c.it.nom}</text
          >
          <text class="p mini" x={c.x + c.w / 2} y={c.y + c.h / 2 + 18} text-anchor="middle"
            >{String(c.it.part).replace('.', ',')} %</text
          >
        {/if}
      </g>
    {/each}
  </svg>

  <div class="info" class:vide={!survol}>
    {#if survol}
      {@const s = G.flatMap((g) => g.sources).find((x) => x.nom === survol)}
      <span class="i-n">{s.nom} — {s.quoi}</span>
      <ul class="i-d">
        {#each s.dedans as ligne}<li>{ligne}</li>{/each}
      </ul>
      <span class="i-c"
        >{String(s.part).replace('.', ',')} % du mélange · {s.epoques
          .toFixed(2)
          .replace('.', ',')} époque{s.epoques >= 2 ? 's' : ''} · {s.disque} · {s.src}</span
      >
    {:else}
      <span class="i-q">Survolez une case pour voir ce qu'elle contient.</span>
    {/if}
  </div>
</div>

<style>
  .cor {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  :global(.cor .tuile rect) {
    fill: color-mix(in srgb, var(--dk-accent) calc(var(--t) * 100%), var(--dk-fond));
    stroke: var(--dk-fond);
    stroke-width: 3;
    transition: fill 0.15s;
  }
  :global(.cor .tuile.actif rect) {
    stroke: var(--dk-encre);
  }
  :global(.cor .tuile) {
    cursor: default;
    outline: none;
  }

  :global(.cor text) {
    font-family: var(--dk-mono);
    pointer-events: none;
  }
  /* Au-delà d'une certaine teinte le fond est trop sombre pour de l'encre. */
  :global(.cor .tuile n),
  :global(.cor .n) {
    font-size: 21px;
    font-weight: 600;
    fill: var(--dk-encre);
  }
  :global(.cor .p) {
    font-size: 30px;
    font-weight: 600;
    fill: var(--dk-encre);
    font-variant-numeric: tabular-nums;
  }
  :global(.cor .n.mini) {
    font-size: 14px;
  }
  :global(.cor .p.mini) {
    font-size: 19px;
  }
  /* Au-delà de 60 % de teinte, le fond est trop soutenu pour de l'encre. */
  :global(.cor .tuile.clair .n),
  :global(.cor .tuile.clair .p) {
    fill: var(--dk-fond);
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.1em;
    min-height: 5.4em;
    border-left: 3px solid var(--dk-accent);
    padding-left: 0.7em;
  }
  .info.vide {
    border-left-color: var(--dk-filet);
  }
  .i-n {
    font-size: 0.78em;
    font-weight: 600;
    color: var(--dk-accent);
  }
  .i-q {
    font-size: 0.66em;
    color: var(--dk-encre);
  }
  .info.vide .i-q {
    color: var(--dk-gris-2);
  }
  .i-d {
    list-style: none;
    margin: 0.1em 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.02em;
  }
  .i-d li {
    font-size: 0.62em;
    color: var(--dk-encre);
    padding-left: 0.9em;
    text-indent: -0.9em;
  }
  .i-d li::before {
    content: '· ';
    color: var(--dk-accent);
  }
  .i-c {
    font-size: 0.6em;
    color: var(--dk-gris);
    font-variant-numeric: tabular-nums;
  }
</style>
