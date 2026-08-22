<script>
  import '@fontsource/ibm-plex-sans/400.css';
  import '@fontsource/ibm-plex-sans/500.css';
  import '@fontsource/ibm-plex-sans/600.css';
  import '@fontsource/ibm-plex-mono/400.css';
  import ProtoDeck from '$lib/proto/ProtoDeck.svelte';
  import { SEMAINE, CODE_SCHEMA, TITRE, SOUS_TITRE, CONTEXTE, AUTEUR } from '$lib/proto/contenu.js';
</script>

<svelte:head><title>Prototype D — Assertion-preuve</title></svelte:head>

<ProtoDeck total={4}>
  <!-- 1 — TITRE -->
  <section class="s ouverture">
    <p class="ctx">{CONTEXTE}</p>
    <h1>{TITRE}</h1>
    <p class="sst">{SOUS_TITRE}</p>
    <p class="auteur">{AUTEUR}</p>
  </section>

  <!-- 2 — ASSERTION + PREUVE : le cycle -->
  <section class="s">
    <h2>Chaque journée consomme ce que la veille a produit.</h2>
    <div class="preuve">
      <svg viewBox="0 0 1000 200" role="img" aria-label="Chaîne des cinq séances">
        {#each SEMAINE as e, i}
          <g transform="translate({i * 200}, 0)">
            <rect x="6" y="52" width="176" height="82" fill={i % 2 ? '#eef2f0' : '#e2ebe7'} />
            <text x="94" y="44" text-anchor="middle" class="svg-jour">{e.jour}</text>
            <text x="94" y="88" text-anchor="middle" class="svg-verbe">{e.verbe}</text>
            <text x="94" y="114" text-anchor="middle" class="svg-gain">{e.court}</text>
            {#if i < 4}
              <path d="M182 93 L206 93 M198 87 L206 93 L198 99" stroke="#0f6e4f" stroke-width="2.5" fill="none" />
            {/if}
          </g>
        {/each}
      </svg>
    </div>
    <p class="legende">
      La sortie de lundi est l'entrée de mardi. Un échec le premier matin ne dégrade pas une séance :
      il en compromet quatre.
    </p>
  </section>

  <!-- 3 — ASSERTION + PREUVE : le choix de modèle -->
  <section class="s">
    <h2>Le classifieur se valide mieux ; le génératif démarre sans annotations.</h2>
    <div class="preuve">
      <div class="axe">
        {#each [{ l: 'Coût de démarrage', c: 20, g: 90 }, { l: 'Reproductibilité', c: 95, g: 45 }, { l: 'Souplesse de tâche', c: 25, g: 92 }, { l: 'Coût par document', c: 92, g: 40 }] as m}
          <div class="mesure">
            <span class="ml">{m.l}</span>
            <span class="jauge"><span class="rc" style="width: {m.c}%"></span></span>
            <span class="jauge"><span class="rg" style="width: {m.g}%"></span></span>
          </div>
        {/each}
        <div class="mesure legend-row">
          <span class="ml"></span>
          <span class="cle"><i class="pc"></i>classifieur entraîné</span>
          <span class="cle"><i class="pg"></i>modèle génératif</span>
        </div>
      </div>
    </div>
    <p class="legende">
      Aucune des deux familles ne domine. La question est de savoir laquelle est justifiable pour la
      tâche que vous avez, avec les annotations que vous avez.
    </p>
  </section>

  <!-- 4 — ASSERTION + PREUVE : le schéma -->
  <section class="s">
    <h2>Un schéma transforme une réponse en variable.</h2>
    <div class="preuve preuve-code">
      <pre><code>{CODE_SCHEMA}</code></pre>
      <div class="fleche">→</div>
      <div class="sortie">
        <p class="so-t">resultat</p>
        <p><span class="k">note</span> <span class="ty">int</span> 4</p>
        <p><span class="k">sentiment</span> <span class="ty">chr</span> "positif"</p>
      </div>
    </div>
    <p class="legende">
      Sans schéma, la réponse est une phrase qu'il faut découper. Avec, c'est une ligne de tableau.
    </p>
  </section>
</ProtoDeck>

<style>
  /* Isolation: base.css impose une police d'affichage et des couleurs à
     tous les titres du site. Un prototype qui ne les redéclare pas n'est
     pas réellement autonome — constaté à la première capture. */
  .s :global(h1),
  .s :global(h2),
  .s :global(h3) {
    font-family: 'IBM Plex Sans', sans-serif;
    color: inherit;
  }
  .s :global(p),
  .s :global(li),
  .s :global(td) { color: inherit; }
  .s :global(a) { color: inherit; }

  /* ------------------------------------------------------------------
     PROTOTYPE D — Assertion-preuve (Alley & Neeley, 2005)
     Le titre est une phrase affirmative complète, jamais un thème.
     Le corps porte UNE preuve visuelle. Aucune puce, nulle part.
     Chrome minimal: rien ne concurrence la preuve.
     ------------------------------------------------------------------ */
  .s {
    height: 100dvh;
    scroll-snap-align: start;
    background: #fcfcfb;
    color: #14161a;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: clamp(15px, min(1.5vw, 2.6vh), 30px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.6em;
    padding: 3em 3.4em 3.4em;
    box-sizing: border-box;
  }

  h2 {
    margin: 0;
    font-weight: 500;
    font-size: 1.95em;
    line-height: 1.18;
    letter-spacing: -0.022em;
    max-width: 24ch;
    text-wrap: balance;
  }

  .preuve { flex: 0 1 auto; min-height: 0; display: flex; align-items: center; }
  .preuve { width: 100%; }
  .preuve svg { width: 100%; height: auto; max-height: 34vh; }

  .legende {
    margin: 0;
    font-size: 0.8em;
    line-height: 1.5;
    color: #565b63;
    max-width: 56ch;
    border-top: 1px solid #dcdcd8;
    padding-top: 0.7em;
  }

  /* --- ouverture --- */
  .ouverture { justify-content: center; gap: 0.5em; }
  .ctx {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62em;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #0f6e4f;
  }
  h1 {
    margin: 0.2em 0 0.1em;
    font-weight: 600;
    font-size: 4.2em;
    line-height: 0.98;
    letter-spacing: -0.038em;
  }
  .sst { margin: 0; font-size: 1.05em; color: #565b63; max-width: 34ch; line-height: 1.4; }
  .auteur {
    margin: 1.2em 0 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68em;
    letter-spacing: 0.08em;
    color: #565b63;
  }

  /* --- preuve 1: la chaîne --- */
  :global(.svg-jour) {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    fill: #7a8087;
  }
  :global(.svg-verbe) {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 26px;
    font-weight: 600;
    fill: #14161a;
  }
  :global(.svg-gain) { font-family: 'IBM Plex Sans', sans-serif; font-size: 14px; fill: #565b63; }

  /* --- preuve 2: les jauges --- */
  .axe { width: 100%; display: flex; flex-direction: column; gap: 0.5em; }
  .mesure { display: grid; grid-template-columns: 12em 1fr 1fr; gap: 0.9em; align-items: center; }
  .ml { font-size: 0.78em; color: #565b63; }
  .jauge { height: 1.5em; background: #eeeeec; position: relative; }
  .jauge span { position: absolute; inset: 0 auto 0 0; }
  .rc { background: #14161a; }
  .rg { background: #0f6e4f; }
  .legend-row { margin-top: 0.3em; }
  .cle { font-size: 0.68em; color: #565b63; display: flex; align-items: center; gap: 0.4em; }
  .cle i { width: 0.7em; height: 0.7em; display: inline-block; }
  .pc { background: #14161a; }
  .pg { background: #0f6e4f; }

  /* --- preuve 3: code puis objet --- */
  .preuve-code { gap: 1.2em; align-items: center; }
  pre {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.66em;
    line-height: 1.6;
    background: #f4f4f2;
    padding: 1em 1.2em;
    overflow-x: auto;
    flex: 1 1 auto;
  }
  code { font: inherit; }
  .fleche { font-size: 1.6em; color: #0f6e4f; flex: 0 0 auto; }
  .sortie {
    flex: 0 0 auto;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7em;
    line-height: 1.75;
    border-left: 3px solid #0f6e4f;
    padding-left: 1em;
  }
  .sortie p { margin: 0; }
  .so-t { color: #7a8087; margin-bottom: 0.3em !important; }
  .k { color: #0f6e4f; }
  .ty { color: #7a8087; }
</style>
