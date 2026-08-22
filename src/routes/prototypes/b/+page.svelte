<script>
  import '@fontsource/eb-garamond/400.css';
  import '@fontsource/eb-garamond/500.css';
  import '@fontsource/eb-garamond/400-italic.css';
  import '@fontsource/spectral/400.css';
  import '@fontsource/spectral/600.css';
  import '@fontsource/spectral/400-italic.css';
  import '@fontsource/ibm-plex-mono/400.css';
  import ProtoDeck from '$lib/proto/ProtoDeck.svelte';
  import { SEMAINE, CLASSIFIEUR, GENERATIF, CODE_SCHEMA, TITRE, SOUS_TITRE, CONTEXTE, AUTEUR } from '$lib/proto/contenu.js';
</script>

<svelte:head><title>Prototype B — Revue savante</title></svelte:head>

<ProtoDeck total={4}>
  <!-- 1 — TITRE -->
  <section class="s titre">
    <div class="page">
      <aside class="marge"><p>{CONTEXTE}</p></aside>
      <div class="corps">
        <p class="rubrique">Séance première</p>
        <h1>{TITRE}</h1>
        <hr />
        <p class="sst">{SOUS_TITRE}</p>
        <p class="auteur">{AUTEUR}</p>
      </div>
    </div>
  </section>

  <!-- 2 — LA SEMAINE -->
  <section class="s">
    <div class="page">
      <aside class="marge">
        <p><span class="ren">i.</span> Les séances se tiennent de 8h45 à 12h45.</p>
        <p><span class="ren">ii.</span> Chaque journée consomme ce que la précédente a produit.</p>
      </aside>
      <div class="corps">
        <h2>Cinq matinées, un cycle de recherche</h2>
        <p class="chapo">
          <span class="lettrine">L</span>a semaine suit le cycle de la recherche plutôt que
          l'inventaire des outils. On commence par produire une mesure, on la met à l'épreuve, puis on
          s'en sert.
        </p>
        <table>
          {#each SEMAINE as e}
            <tr>
              <td class="j">{e.jour}</td>
              <td class="v">{e.verbe}</td>
              <td class="gg">{e.gain}</td>
            </tr>
          {/each}
        </table>
      </div>
    </div>
  </section>

  <!-- 3 — CLASSIFIEUR / GÉNÉRATIF -->
  <section class="s">
    <div class="page">
      <aside class="marge">
        <p>
          <span class="ren">i.</span> Un classifieur entraîné coûte moins cher, tourne plus vite et se
          valide mieux. Antoine y revient mardi.
        </p>
      </aside>
      <div class="corps">
        <h2>Classifieur ou modèle génératif</h2>
        <p class="chapo">
          Les deux familles répondent à la même question, mais n'engagent pas la même méthode ni la
          même charge de preuve.
        </p>
        <div class="duo">
          <div>
            <h3>Le classifieur</h3>
            {#each CLASSIFIEUR as x}<p class="tiret">{x}</p>{/each}
          </div>
          <div>
            <h3>Le modèle génératif</h3>
            {#each GENERATIF as x}<p class="tiret">{x}</p>{/each}
          </div>
        </div>
        <p class="chute">
          <em>La bonne question n'est pas lequel est meilleur, mais lequel est justifiable pour cette
          tâche-ci.</em>
        </p>
      </div>
    </div>
  </section>

  <!-- 4 — CODE -->
  <section class="s">
    <div class="page">
      <aside class="marge">
        <p>
          <span class="ren">i.</span> Dans <span class="mono">type_enum()</span>, les valeurs viennent
          en premier, la description ensuite.
        </p>
      </aside>
      <div class="corps">
        <h2>Le schéma est votre opérationnalisation</h2>
        <p class="chapo">
          Écrire ce schéma, c'est déclarer vos variables, leurs types et leurs modalités. C'est un acte
          de mesure, pas de programmation.
        </p>
        <pre><code>{CODE_SCHEMA}</code></pre>
      </div>
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
    font-family: 'EB Garamond', Garamond, serif;
    color: inherit;
  }
  .s :global(p),
  .s :global(li),
  .s :global(td) { color: inherit; }
  .s :global(a) { color: inherit; }

  /* ------------------------------------------------------------------
     PROTOTYPE B — Revue savante
     Doctrine Tufte: notes en marge plutôt que puces, mesure de lecture
     étroite, filets fins, chiffres elzéviriens. La diapositive se lit
     comme une page de livre.
     ------------------------------------------------------------------ */
  .s {
    height: 100dvh;
    scroll-snap-align: start;
    background: #fbf9f3;
    color: #1a1613;
    font-family: 'Spectral', Georgia, serif;
    font-size: clamp(15px, min(1.45vw, 2.5vh), 29px);
    display: flex;
    align-items: center;
    padding: 3em 4em;
    box-sizing: border-box;
  }

  .page {
    width: 100%;
    display: grid;
    grid-template-columns: 13em 1fr;
    column-gap: 2.6em;
    align-items: start;
  }

  .marge {
    padding-top: 0.6em;
    border-right: 1px solid #ddd6c6;
    padding-right: 1.6em;
  }
  .marge p {
    margin: 0 0 1em;
    font-size: 0.66em;
    line-height: 1.5;
    color: #5b5348;
    text-align: right;
  }
  .ren { font-style: italic; color: #9a1f14; margin-right: 0.2em; }

  .corps { max-width: 34em; }

  .rubrique {
    margin: 0 0 0.8em;
    font-size: 0.6em;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9a1f14;
  }

  h1 {
    margin: 0;
    font-family: 'EB Garamond', Garamond, serif;
    font-weight: 400;
    font-size: 4.4em;
    line-height: 0.98;
    letter-spacing: -0.012em;
  }

  h2 {
    margin: 0 0 0.55em;
    font-family: 'EB Garamond', Garamond, serif;
    font-weight: 400;
    font-size: 2.6em;
    line-height: 1.06;
  }

  h3 {
    margin: 0 0 0.45em;
    font-family: 'EB Garamond', Garamond, serif;
    font-weight: 500;
    font-size: 1.12em;
    font-variant: small-caps;
    letter-spacing: 0.04em;
  }

  hr { border: 0; border-top: 1px solid #1a1613; margin: 0.7em 0; }

  .sst { margin: 0 0 0.5em; font-size: 1.02em; font-style: italic; line-height: 1.4; }
  .auteur { margin: 0; font-size: 0.82em; color: #5b5348; }

  .chapo { margin: 0 0 1em; font-size: 0.98em; line-height: 1.58; }

  .lettrine {
    float: left;
    font-family: 'EB Garamond', Garamond, serif;
    font-size: 3.1em;
    line-height: 0.78;
    padding: 0.06em 0.1em 0 0;
    color: #9a1f14;
  }

  table { border-collapse: collapse; width: 100%; font-variant-numeric: oldstyle-nums; }
  td { padding: 0.5em 1em 0.5em 0; border-bottom: 1px solid #e5ded0; vertical-align: baseline; }
  tr:last-child td { border-bottom: 0; }
  .j { font-style: italic; color: #5b5348; width: 6.5em; font-size: 0.9em; }
  .v { font-variant: small-caps; letter-spacing: 0.05em; width: 7em; font-size: 1em; }
  .gg { font-size: 0.9em; }

  .duo { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8em; margin-bottom: 1em; }

  /* Pas de puces: un tiret cadratin, comme dans un texte imprimé. */
  .tiret { margin: 0 0 0.4em; font-size: 0.86em; line-height: 1.45; text-indent: -0.9em; padding-left: 0.9em; }
  .tiret::before { content: '— '; color: #9a1f14; }

  .chute { margin: 0; font-size: 0.9em; line-height: 1.5; border-top: 1px solid #ddd6c6; padding-top: 0.7em; }

  pre {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.66em;
    line-height: 1.65;
    background: #f4f1e8;
    border: 1px solid #e5ded0;
    padding: 1em 1.2em;
    overflow-x: auto;
  }
  code { font: inherit; }
  .mono { font-family: 'IBM Plex Mono', monospace; font-size: 0.92em; }
</style>
