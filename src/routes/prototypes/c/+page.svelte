<script>
  import '@fontsource/ibm-plex-mono/400.css';
  import '@fontsource/ibm-plex-mono/500.css';
  import '@fontsource/ibm-plex-mono/600.css';
  import ProtoDeck from '$lib/proto/ProtoDeck.svelte';
  import { SEMAINE, CLASSIFIEUR, GENERATIF, CODE_SCHEMA, TITRE, SOUS_TITRE, CONTEXTE, AUTEUR } from '$lib/proto/contenu.js';
</script>

<svelte:head><title>Prototype C — Brutalisme de terminal</title></svelte:head>

<ProtoDeck total={4}>
  <!-- 1 — TITRE -->
  <section class="s">
    <div class="bandeau"><span>eiom/parcours-ia</span><span class="acc">seance-01</span></div>
    <div class="corps">
      <h1>{TITRE}</h1>
      <div class="barre"></div>
      <p class="sst">{SOUS_TITRE}</p>
      <dl>
        <div><dt>lieu</dt><dd>{CONTEXTE}</dd></div>
        <div><dt>auteur</dt><dd>{AUTEUR}</dd></div>
      </dl>
    </div>
  </section>

  <!-- 2 — LA SEMAINE -->
  <section class="s">
    <div class="bandeau"><span>01 · structure</span><span class="acc">08:45 → 12:45</span></div>
    <div class="corps">
      <h2>Cinq matinées, un cycle de recherche</h2>
      <div class="tab">
        <div class="tr entete"><span>jour</span><span>séance</span><span>sortie</span></div>
        {#each SEMAINE as e}
          <div class="tr"><span class="dim">{e.jour}</span><span class="fort">{e.verbe}</span><span>{e.gain}</span></div>
        {/each}
      </div>
      <p class="cmt">// aujourd'hui produit ce que mardi consommera</p>
    </div>
  </section>

  <!-- 3 — CLASSIFIEUR / GÉNÉRATIF -->
  <section class="s">
    <div class="bandeau"><span>02 · choix de modèle</span><span class="acc">décision</span></div>
    <div class="corps">
      <h2>Classifieur ou modèle génératif</h2>
      <div class="duo">
        <div class="bloc">
          <p class="tag">[ classifieur ]</p>
          {#each CLASSIFIEUR as x}<p class="li">{x}</p>{/each}
        </div>
        <div class="bloc inv">
          <p class="tag">[ génératif ]</p>
          {#each GENERATIF as x}<p class="li">{x}</p>{/each}
        </div>
      </div>
      <p class="cmt">// la question n'est pas « lequel est meilleur » mais « lequel est justifiable »</p>
    </div>
  </section>

  <!-- 4 — CODE -->
  <section class="s">
    <div class="bandeau"><span>03 · mesure</span><span class="acc">ellmer 0.4.2</span></div>
    <div class="corps">
      <h2>Le schéma est votre opérationnalisation</h2>
      <pre><code>{CODE_SCHEMA}</code></pre>
      <p class="cmt">// déclarer vos variables, leurs types, leurs modalités — pas de la programmation, de la mesure</p>
    </div>
  </section>
</ProtoDeck>

<style>
  /* Isolation: base.css impose une police d'affichage et des couleurs à
     tous les titres du site. Un prototype qui ne les redéclare pas n'est
     pas réellement autonome — constaté à la première capture. */
  .s :global(h1),
  .s :global(h2),
  .s :global(h3) {
    font-family: 'IBM Plex Mono', monospace;
    color: inherit;
  }
  .s :global(p),
  .s :global(li),
  .s :global(td) { color: inherit; }
  .s :global(a) { color: inherit; }

  /* ------------------------------------------------------------------
     PROTOTYPE C — Brutalisme de terminal
     Monospace intégral, contraste maximal, angles vifs, aplats.
     Aucune ombre, aucun dégradé, aucun coin arrondi. Un accent acide.
     La structure est visible plutôt que masquée.
     ------------------------------------------------------------------ */
  .s {
    height: 100dvh;
    scroll-snap-align: start;
    background: #0c0e0f;
    color: #e6e3dd;
    font-family: 'IBM Plex Mono', monospace;
    font-size: clamp(15px, min(1.6vw, 2.8vh), 32px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .bandeau {
    display: flex;
    justify-content: space-between;
    padding: 0.9em 1.6em;
    border-bottom: 2px solid #e6e3dd;
    font-size: 0.62em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    flex: 0 0 auto;
  }
  .acc { color: #ff5c1f; }

  .corps {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5em 1.6em 2.2em;
    gap: 1em;
    min-height: 0;
  }

  h1 {
    margin: 0;
    font-weight: 600;
    font-size: 3.5em;
    line-height: 1;
    letter-spacing: -0.045em;
  }

  h2 {
    margin: 0 0 0.3em;
    font-weight: 500;
    font-size: 1.9em;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .barre { height: 0.5em; background: #ff5c1f; width: 7em; }

  .sst { margin: 0; font-size: 0.86em; line-height: 1.5; color: #a8a49c; max-width: 40ch; }

  dl { margin: 0.6em 0 0; display: flex; flex-direction: column; gap: 0.25em; }
  dl div { display: grid; grid-template-columns: 6em 1fr; font-size: 0.7em; }
  dt { color: #ff5c1f; letter-spacing: 0.1em; text-transform: uppercase; }
  dd { margin: 0; color: #a8a49c; }

  /* Tableau sans bordure de cellule: des filets pleine largeur, comme une
     sortie de terminal. */
  .tab { display: flex; flex-direction: column; border-top: 2px solid #e6e3dd; }
  .tr {
    display: grid;
    grid-template-columns: 8em 8em 1fr;
    gap: 1em;
    padding: 0.6em 0;
    border-bottom: 1px solid #2a2e30;
    font-size: 0.84em;
  }
  .tr.entete {
    font-size: 0.6em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6f7477;
    border-bottom-color: #444a4d;
  }
  .dim { color: #a8a49c; }
  .fort { color: #ff5c1f; font-weight: 500; }

  .duo { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2em; }
  .bloc { border: 2px solid #e6e3dd; padding: 1em 1.1em; }
  .bloc.inv { background: #e6e3dd; color: #0c0e0f; border-color: #e6e3dd; }
  .tag {
    margin: 0 0 0.6em;
    font-size: 0.62em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ff5c1f;
  }
  .bloc.inv .tag { color: #c2380a; }
  .li { margin: 0 0 0.4em; font-size: 0.78em; line-height: 1.45; }
  .li::before { content: '> '; color: #ff5c1f; }
  .bloc.inv .li::before { color: #c2380a; }

  .cmt { margin: 0; font-size: 0.68em; color: #6f7477; line-height: 1.5; }

  pre {
    margin: 0;
    font-size: 0.72em;
    line-height: 1.6;
    border: 2px solid #ff5c1f;
    padding: 1em 1.2em;
    overflow-x: auto;
    background: #121516;
  }
  code { font: inherit; }
</style>
