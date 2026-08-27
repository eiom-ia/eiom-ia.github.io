<script>
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(3);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 3, lire: () => e, ecrire: (v) => (e = v) });
  });
  const FICHIERS = [
    { n: 'donnees', dossier: true },
    { n: 'llm.R', dossier: false },
    { n: 'memoire.tex', dossier: false }
  ];
</script>

<div class="gvt" bind:this={hote}>
  <section class="cote gui" class:vu={!js || e >= 1}>
    <header><span class="titre">INTERFACE GRAPHIQUE</span></header>
    <div class="fenetre">
      <div class="barre"><span class="dossier-nom">projet-these</span></div>
      <div class="outils"><i></i><i></i><i></i><span class="sep"></span><i class="large"></i></div>
      <div class="bureau">
        {#each FICHIERS as f}
          <div class="icone">
            <div class="glyphe" class:doss={f.dossier}></div>
            <span>{f.n}</span>
          </div>
        {/each}
        <svg class="curseur" viewBox="0 0 12 18" aria-hidden="true"><path d="M0 0 L0 14 L3.5 10.8 L6 16.5 L8.2 15.4 L5.8 9.9 L10.5 9.6 Z" /></svg>
      </div>
    </div>
    <p class="quoi"><b>Vous cliquez.</b> L'ordinateur vous montre des images.</p>
  </section>

  <section class="cote term" class:vu={!js || e >= 2}>
    <header><span class="titre">TERMINAL</span></header>
    <div class="ecran">
      <p><span class="inv">$</span> ls</p>
      <p class="sortie">donnees/   llm.R   memoire.tex</p>
      <p><span class="inv">$</span> ls donnees/</p>
      <p class="sortie">corpus.csv   avis.csv   codebook.pdf</p>
      <p><span class="inv">$</span> <span class="curs">█</span></p>
    </div>
    <p class="quoi"><b>Vous écrivez.</b> L'ordinateur répond avec du texte.</p>
  </section>

  <p class="cle" class:vu={!js || e >= 3}>
    <strong>Même ordinateur, mêmes fichiers.</strong> Mais un seul des deux parle une langue qu'un
    modèle sait écrire.
  </p>
</div>

<style>
  .gvt { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 0.8em; align-items: start; }
  .cote { opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .cote.vu, .cle.vu { opacity: 1; transform: none; }
  header { margin-bottom: 0.35em; }
  .titre { color: var(--dk-accent); font-size: 0.5em; letter-spacing: 0.14em; }
  /* fenetre graphique */
  .fenetre { border: 3px solid var(--dk-encre); background: #fbfbf9; }
  .barre { padding: 0.3em 0.5em; background: linear-gradient(#e9e9e4, #dededa); border-bottom: 1px solid #bfbfb8; }
  .dossier-nom { font-size: 0.46em; color: #3a3a36; }
  .outils { display: flex; align-items: center; gap: 0.3em; padding: 0.3em 0.5em; border-bottom: 1px solid #d8d8d2; }
  .outils i { width: 0.8em; height: 0.8em; border: 1px solid #a9a9a2; background: #f2f2ee; }
  .outils i.large { width: 4em; }
  .sep { width: 1px; height: 0.9em; background: #cfcfc8; }
  .bureau { position: relative; display: flex; gap: 0.9em; padding: 0.75em 0.6em 1.1em; min-height: 5.2em; }
  .icone { display: flex; flex-direction: column; align-items: center; gap: 0.2em; width: 3.4em; }
  .glyphe { width: 1.7em; height: 1.35em; border: 2px solid #6d6d66; background: #ffffff; }
  .glyphe.doss { background: #d9c179; border-color: #9a8642; }
  .icone span { font-size: 0.4em; text-align: center; line-height: 1.2; }
  .curseur { position: absolute; left: 3.1em; top: 2.4em; width: 0.75em; fill: var(--dk-encre); stroke: white; stroke-width: 1; }
  /* terminal */
  .ecran { border: 3px solid var(--dk-encre); background: #0f1214; padding: 0.6em 0.7em; min-height: 7.1em; }
  .ecran p { margin: 0 0 0.18em; color: #e8edf2; font-size: 0.46em; line-height: 1.4; }
  .inv { color: #8de0a9; margin-right: 0.35em; }
  .sortie { color: #9aa6b2; }
  .curs { background: #8de0a9; color: #8de0a9; }
  .quoi { margin-top: 0.4em; color: var(--dk-gris); font-size: 0.5em; line-height: 1.35; }
  .quoi b { color: var(--dk-encre); }
  .cle { grid-column: 1 / -1; border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.72em; line-height: 1.4; opacity: 0; transition: opacity 0.3s; }
  @media (prefers-reduced-motion: reduce) { .cote, .cle { transition: none; } }
</style>
