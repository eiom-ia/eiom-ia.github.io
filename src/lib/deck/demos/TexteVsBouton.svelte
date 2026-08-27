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
  const ONGLETS = ['Fichier', 'Accueil', 'Insertion', 'Disposition', 'Références', 'Révision'];
</script>

<div class="tvb" bind:this={hote}>
  <div class="consigne">« Passe les marges du document à 3 cm. »</div>

  <section class="word" class:vu={!js || e >= 1}>
    <header><strong>GUI BASED</strong><span>une action dans l'interface</span></header>
    <div class="app">
      <div class="titrebar"><span class="pastille"></span>Memoire.docx — Word</div>
      <nav class="onglets">
        {#each ONGLETS as o}<span class:actif={o === 'Disposition'}>{o}</span>{/each}
      </nav>
      <div class="ruban">
        <div class="groupe">
          <button class="gros ouvert"><i class="ic marges"></i><em>Marges<br /><small>▾</small></em></button>
          <span class="nomgroupe">Mise en page</span>
        </div>
        <div class="groupe">
          <button class="gros"><i class="ic orient"></i><em>Orientation<br /><small>▾</small></em></button>
          <button class="gros"><i class="ic taille"></i><em>Taille<br /><small>▾</small></em></button>
          <span class="nomgroupe">&nbsp;</span>
        </div>
      </div>
      <div class="menu">
        <span class="item">Normales <b>2,5 cm</b></span>
        <span class="item">Étroites <b>1,27 cm</b></span>
        <span class="item surligne">Marges personnalisées…</span>
      </div>
      <div class="page"><span class="l"></span><span class="l"></span><span class="l court"></span></div>
    </div>
    <p class="trajet">comprendre l'écran <b>→</b> trouver l'onglet <b>→</b> ouvrir le menu <b>→</b> cliquer <b>→</b> remplir un champ</p>
  </section>

  <section class="latex" class:vu={!js || e >= 2}>
    <header><strong>TEXT BASED</strong><span>une modification dans le texte</span></header>
    <div class="editeur">
      <div class="titrebar sombre">memoire.tex</div>
      <pre><span class="ln">12</span><span class="moins">- \usepackage[margin=2.5cm]&#123;geometry&#125;</span>
<span class="ln">12</span><span class="plus">+ \usepackage[margin=3cm]&#123;geometry&#125;</span></pre>
    </div>
    <p class="trajet">lire le texte <b>→</b> changer <code>2.5</code> pour <code>3</code></p>
  </section>

  <p class="fin" class:vu={!js || e >= 3}>
    <strong>Le LLM peut faire les deux.</strong> Mais modifier du texte est son geste naturel ;
    cliquer demande une couche de vision et d'automatisation en plus — et se casse au moindre
    changement d'interface.
  </p>
</div>

<style>
  .tvb { display: grid; grid-template-columns: 1.25fr 1fr; gap: 0.6em 0.75em; width: 100%; align-items: start; }
  .consigne { grid-column: 1 / -1; color: var(--dk-accent); font-size: 0.95em; font-weight: 600; }
  section { opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  section.vu, .fin.vu { opacity: 1; transform: none; }
  section > header { display: flex; align-items: baseline; gap: 0.5em; margin-bottom: 0.3em; }
  section > header strong { color: var(--dk-accent); font-size: 0.55em; letter-spacing: 0.12em; }
  section > header span { color: var(--dk-gris); font-size: 0.48em; }
  /* fenetre Word */
  .app { border: 3px solid var(--dk-encre); background: #fff; overflow: hidden; }
  .titrebar { padding: 0.3em 0.5em; background: #185abd; color: white; font-size: 0.42em; }
  .pastille { display: inline-block; width: 0.55em; height: 0.55em; background: #fff; margin-right: 0.4em; vertical-align: -0.05em; }
  .onglets { display: flex; gap: 0.05em; background: #f3f2f1; border-bottom: 1px solid #d6d4d2; }
  .onglets span { padding: 0.28em 0.5em; font-size: 0.4em; color: #3a3936; }
  .onglets span.actif { background: #fff; border: 1px solid #d6d4d2; border-bottom-color: #fff; font-weight: 600; color: #185abd; }
  .ruban { display: flex; gap: 0.7em; padding: 0.4em 0.5em 0.25em; background: #fff; border-bottom: 1px solid #e3e1df; }
  .groupe { display: flex; align-items: flex-start; gap: 0.35em; position: relative; padding-right: 0.7em; border-right: 1px solid #e3e1df; }
  .nomgroupe { position: absolute; bottom: -0.15em; left: 0; color: #797671; font-size: 0.3em; }
  .gros { border: 1px solid transparent; background: none; padding: 0.15em 0.3em 0.5em; display: flex; flex-direction: column; align-items: center; gap: 0.12em; font: inherit; color: #3a3936; }
  .gros.ouvert { border-color: #b9b7b4; background: #eaf1fb; }
  .ic { display: block; width: 1.1em; height: 1.1em; border: 1.5px solid #5a5854; }
  .ic.marges { border-style: dashed; }
  .ic.orient { width: 0.85em; }
  .ic.taille { height: 1.35em; }
  .gros em { font-style: normal; font-size: 0.34em; line-height: 1.1; text-align: center; }
  .gros small { font-size: 1em; }
  .menu { border: 1px solid #b9b7b4; box-shadow: 0 2px 0 rgba(0,0,0,0.08); background: #fff; margin: 0 0 0 0.7em; width: 9.5em; }
  .item { display: flex; justify-content: space-between; gap: 0.5em; padding: 0.25em 0.4em; font-size: 0.38em; color: #3a3936; }
  .item b { color: #797671; font-weight: 400; }
  .item.surligne { background: #185abd; color: white; }
  .page { padding: 0.5em 0.6em 0.6em; display: flex; flex-direction: column; gap: 0.22em; }
  .page .l { height: 0.28em; background: #e6e4e2; }
  .page .l.court { width: 55%; }
  /* editeur texte */
  .editeur { border: 3px solid var(--dk-encre); overflow: hidden; }
  .titrebar.sombre { background: var(--dk-encre); color: #cfd8e3; }
  .editeur pre { margin: 0; padding: 0.6em 0.5em; background: #0f1214; font-size: 0.42em; line-height: 1.7; }
  .ln { display: inline-block; width: 1.6em; color: #55606b; }
  .moins { color: #d6a2a2; } .plus { color: #8de0a9; font-weight: 600; }
  .trajet { margin-top: 0.35em; color: var(--dk-gris); font-size: 0.46em; line-height: 1.4; }
  .trajet b { color: var(--dk-accent); }
  .fin { grid-column: 1 / -1; border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.62em; line-height: 1.45; opacity: 0; transition: opacity 0.3s; }
  @media (max-width: 46rem) { .tvb { grid-template-columns: 1fr; } .consigne, .fin { grid-column: 1; } }
  @media (prefers-reduced-motion: reduce) { section, .fin { transition: none; } }
</style>
