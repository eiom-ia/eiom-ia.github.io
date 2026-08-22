<script>
  import '@fontsource/archivo/400.css';
  import '@fontsource/archivo/500.css';
  import '@fontsource/archivo/600.css';
  import '@fontsource/ibm-plex-mono/400.css';
  import ProtoDeck from '$lib/proto/ProtoDeck.svelte';
  import { SEMAINE, CLASSIFIEUR, GENERATIF, CODE_SCHEMA, TITRE, SOUS_TITRE, CONTEXTE, AUTEUR } from '$lib/proto/contenu.js';
</script>

<svelte:head><title>Prototype A — Grille suisse</title></svelte:head>

<ProtoDeck total={4}>
  <!-- 1 — TITRE -->
  <section class="s">
    <div class="g">
      <p class="meta c1-3">{CONTEXTE}</p>
      <h1 class="c1-9">{TITRE}</h1>
      <hr class="regle c1-4" />
      <p class="sst c1-6">{SOUS_TITRE}</p>
      <p class="meta c10-12 droite">{AUTEUR}</p>
    </div>
  </section>

  <!-- 2 — LA SEMAINE -->
  <section class="s">
    <div class="g">
      <p class="meta c1-2">01</p>
      <h2 class="c3-9">Cinq matinées,<br />un cycle de recherche</h2>
      <div class="c3-12 liste">
        {#each SEMAINE as e, i}
          <div class="ligne">
            <span class="n">{String(i + 1).padStart(2, '0')}</span>
            <span class="j">{e.jour}</span>
            <span class="v">{e.verbe}</span>
            <span class="gg">{e.gain}</span>
          </div>
        {/each}
      </div>
      <p class="note c3-8">Toutes les séances ont lieu de 8h45 à 12h45.</p>
    </div>
  </section>

  <!-- 3 — CLASSIFIEUR / GÉNÉRATIF -->
  <section class="s">
    <div class="g">
      <p class="meta c1-2">02</p>
      <h2 class="c3-10">Classifieur<br />ou modèle génératif</h2>
      <div class="c3-7 col">
        <p class="et">Classifieur</p>
        {#each CLASSIFIEUR as x}<p class="pt">{x}</p>{/each}
      </div>
      <div class="c8-12 col">
        <p class="et rouge">Modèle génératif</p>
        {#each GENERATIF as x}<p class="pt">{x}</p>{/each}
      </div>
      <p class="note c3-9">
        La bonne question n'est pas lequel est meilleur, mais lequel est justifiable pour cette tâche-ci.
      </p>
    </div>
  </section>

  <!-- 4 — CODE -->
  <section class="s">
    <div class="g">
      <p class="meta c1-2">03</p>
      <h2 class="c3-10">Le schéma est<br />votre opérationnalisation</h2>
      <pre class="c3-9"><code>{CODE_SCHEMA}</code></pre>
      <p class="note c10-12">
        Écrire ce schéma, c'est déclarer vos variables, leurs types et leurs modalités. Un acte de
        mesure, pas de programmation.
      </p>
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
    font-family: 'Archivo', sans-serif;
    color: inherit;
  }
  .s :global(p),
  .s :global(li),
  .s :global(td) { color: inherit; }
  .s :global(a) { color: inherit; }

  /* ------------------------------------------------------------------
     PROTOTYPE A — Style typographique international (Suisse)
     Grille de 12 colonnes, composition asymétrique, un seul accent.
     Pas de carte, pas de coin arrondi, pas d'ombre, pas de dégradé.
     La hiérarchie tient à la taille, à la graisse et à la position.
     ------------------------------------------------------------------ */
  .s {
    height: 100dvh;
    scroll-snap-align: start;
    background: #fff;
    color: #111;
    font-family: 'Archivo', sans-serif;
    font-size: clamp(15px, min(1.5vw, 2.6vh), 30px);
    display: flex;
    align-items: center;
    padding: 3.2em 4em;
    box-sizing: border-box;
  }

  .g {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 1.4em;
    row-gap: 1.5em;
    align-content: center;
  }

  .c1-2 { grid-column: 1 / 3; }
  .c1-3 { grid-column: 1 / 4; }
  .c1-4 { grid-column: 1 / 5; }
  .c1-6 { grid-column: 1 / 7; }
  .c1-9 { grid-column: 1 / 10; }
  .c3-7 { grid-column: 3 / 8; }
  .c3-8 { grid-column: 3 / 9; }
  .c3-9 { grid-column: 3 / 10; }
  .c3-10 { grid-column: 3 / 11; }
  .c3-12 { grid-column: 3 / 13; }
  .c8-12 { grid-column: 8 / 13; }
  .c10-12 { grid-column: 10 / 13; }
  .droite { text-align: right; }

  h1 {
    margin: 0;
    font-weight: 600;
    font-size: 4.6em;
    line-height: 0.92;
    letter-spacing: -0.035em;
  }

  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 2.5em;
    line-height: 1.02;
    letter-spacing: -0.025em;
  }

  .regle { border: 0; border-top: 3px solid #e1251b; margin: 0; height: 0; }

  .sst { margin: 0; font-size: 1.05em; line-height: 1.4; font-weight: 400; }

  .meta {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6b6b6b;
  }

  /* Le tableau devient une suite de lignes calées sur la grille:
     aucune bordure, l'alignement suffit. */
  .liste { display: flex; flex-direction: column; }
  .ligne {
    display: grid;
    grid-template-columns: 2.6em 6.5em 7em 1fr;
    gap: 1em;
    align-items: baseline;
    padding: 0.62em 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .ligne:first-child { border-top: 1px solid #111; }
  .n {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62em;
    color: #e1251b;
    letter-spacing: 0.06em;
  }
  .j { font-size: 0.88em; color: #6b6b6b; }
  .v { font-size: 0.98em; font-weight: 500; }
  .gg { font-size: 0.92em; }

  .col { display: flex; flex-direction: column; gap: 0.42em; }
  .et {
    margin: 0 0 0.3em;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding-bottom: 0.5em;
    border-bottom: 3px solid #111;
  }
  .et.rouge { border-bottom-color: #e1251b; color: #e1251b; }
  .pt { margin: 0; font-size: 0.9em; line-height: 1.45; }

  .note { margin: 0; font-size: 0.86em; line-height: 1.5; color: #4a4a4a; max-width: 42ch; }

  pre {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7em;
    line-height: 1.62;
    background: #f2f2f2;
    padding: 1.1em 1.3em;
    overflow-x: auto;
    border-left: 3px solid #e1251b;
  }
  code { font: inherit; }
</style>
