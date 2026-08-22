<script>
  import '@fontsource/ibm-plex-mono/400.css';
  import '@fontsource/ibm-plex-mono/500.css';
  import '@fontsource/ibm-plex-mono/600.css';
  import ProtoDeck from '$lib/proto/ProtoDeck.svelte';
  import { SEMAINE, CLASSIFIEUR, GENERATIF, CODE_SCHEMA, TITRE, SOUS_TITRE, CONTEXTE, AUTEUR } from '$lib/proto/contenu.js';
</script>

<svelte:head><title>Prototype C clair — Brutalisme de terminal</title></svelte:head>

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
  /* ------------------------------------------------------------------
     PROTOTYPE C CLAIR — Brutalisme de terminal, sur fond clair
     Ce n'est pas une inversion mécanique du mode sombre. L'orange vif
     #ff5c1f ne donne que 2,85:1 sur fond clair — insuffisant pour du
     texte. Il est donc réservé aux aplats, et le texte d'accent passe à
     #b03308 (5,84:1). Le gris secondaire monte de #6f7477 à #5c6367
     (5,65:1) pour la même raison. Contrastes calculés, pas estimés.
     ------------------------------------------------------------------ */
  .s :global(h1),
  .s :global(h2),
  .s :global(h3) { font-family: 'IBM Plex Mono', monospace; color: inherit; }
  .s :global(p),
  .s :global(li),
  .s :global(td) { color: inherit; }

  .s {
    height: 100dvh;
    scroll-snap-align: start;
    background: #f6f6f3;
    color: #0c0e0f;
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
    border-bottom: 2px solid #0c0e0f;
    font-size: 0.62em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    flex: 0 0 auto;
    background: #f6f6f3;
  }
  .acc { color: #b03308; }

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

  /* L'aplat garde l'orange vif: sur un aplat, la question de contraste
     du texte ne se pose pas. */
  .barre { height: 0.5em; background: #ff5c1f; width: 7em; }

  .sst { margin: 0; font-size: 0.86em; line-height: 1.5; color: #5c6367; max-width: 40ch; }

  dl { margin: 0.6em 0 0; display: flex; flex-direction: column; gap: 0.25em; }
  dl div { display: grid; grid-template-columns: 6em 1fr; font-size: 0.7em; }
  dt { color: #b03308; letter-spacing: 0.1em; text-transform: uppercase; }
  dd { margin: 0; color: #5c6367; }

  .tab { display: flex; flex-direction: column; border-top: 2px solid #0c0e0f; }
  .tr {
    display: grid;
    grid-template-columns: 8em 8em 1fr;
    gap: 1em;
    padding: 0.6em 0;
    border-bottom: 1px solid #d5d5cf;
    font-size: 0.84em;
  }
  .tr.entete {
    font-size: 0.6em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5c6367;
    border-bottom-color: #9a9a93;
  }
  .dim { color: #5c6367; }
  .fort { color: #b03308; font-weight: 500; }

  .duo { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2em; }
  .bloc { border: 2px solid #0c0e0f; padding: 1em 1.1em; background: #f6f6f3; }
  /* Le bloc inversé devient un aplat encre: le contraste s'inverse
     franchement plutôt que de se nuancer. */
  .bloc.inv { background: #0c0e0f; color: #f6f6f3; }
  .tag {
    margin: 0 0 0.6em;
    font-size: 0.62em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #b03308;
  }
  .bloc.inv .tag { color: #ff7a45; }
  .li { margin: 0 0 0.4em; font-size: 0.78em; line-height: 1.45; }
  .li::before { content: '> '; color: #b03308; }
  .bloc.inv .li::before { color: #ff7a45; }

  .cmt { margin: 0; font-size: 0.68em; color: #5c6367; line-height: 1.5; }

  pre {
    margin: 0;
    font-size: 0.72em;
    line-height: 1.6;
    border: 2px solid #0c0e0f;
    border-left-width: 0.4em;
    border-left-color: #ff5c1f;
    padding: 1em 1.2em;
    overflow-x: auto;
    background: #efefe9;
  }
  code { font: inherit; }
</style>
