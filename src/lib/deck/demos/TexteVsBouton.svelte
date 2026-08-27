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
</script>

<div class="tvb" bind:this={hote}>
  <div class="consigne">« Passe les marges du document à 3 cm. »</div>
  <section class="word" class:vu={!js || e >= 1}>
    <header><strong>WORD</strong><span>une action dans l'interface</span></header>
    <div class="ruban"><span>Disposition</span><span>Marges</span><button>Marges personnalisées…</button><span>3 cm</span></div>
    <div class="trajet">comprendre l'écran <b>→</b> trouver le bouton <b>→</b> cliquer <b>→</b> remplir</div>
  </section>
  <section class="latex" class:vu={!js || e >= 2}>
    <header><strong>LaTeX</strong><span>une modification dans le texte</span></header>
    <pre><span class="moins">- \usepackage[margin=2.5cm]&#123;geometry&#125;</span>
<span class="plus">+ \usepackage[margin=3cm]&#123;geometry&#125;</span></pre>
    <div class="trajet">lire le texte <b>→</b> changer <code>2.5</code> pour <code>3</code></div>
  </section>
  <p class:vu={!js || e >= 3}><strong>Le LLM peut faire les deux.</strong> Mais modifier du texte est son geste naturel; cliquer demande une couche de vision et d'automatisation en plus.</p>
</div>

<style>
  .tvb { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75em; width: 100%; }
  .consigne { grid-column: 1 / -1; color: var(--dk-accent); font-size: 1.05em; font-weight: 600; }
  section { border: 3px solid var(--dk-encre); opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  section.vu, p.vu { opacity: 1; transform: none; }
  section header { display: flex; justify-content: space-between; gap: 0.5em; padding: 0.55em 0.7em; border-bottom: 2px solid var(--dk-encre); }
  section header strong { font-size: 0.78em; }
  section header span { color: var(--dk-gris); font-size: 0.56em; }
  .ruban { display: flex; flex-wrap: wrap; gap: 0.35em; padding: 0.75em; min-height: 4em; background: var(--dk-fond-2); }
  .ruban span, .ruban button { border: 1px solid var(--dk-gris-2); padding: 0.35em 0.5em; font: inherit; font-size: 0.57em; background: var(--dk-fond); color: var(--dk-encre); }
  .ruban button { border: 3px solid var(--dk-accent); }
  pre { min-height: 4em; box-sizing: border-box; margin: 0; padding: 0.75em; background: #151818; color: #f6f6f3; font-size: 0.7em; line-height: 1.7; white-space: pre-wrap; }
  .moins { color: #d6a2a2; } .plus { color: #8de0a9; font-weight: 600; }
  .trajet { padding: 0.55em 0.7em; color: var(--dk-gris); font-size: 0.56em; line-height: 1.35; }
  .trajet b { color: var(--dk-accent); }
  p { grid-column: 1 / -1; border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.84em; opacity: 0; transition: opacity 0.3s; }
  @media (max-width: 46rem) { .tvb { grid-template-columns: 1fr; } .consigne, p { grid-column: 1; } }
  @media (prefers-reduced-motion: reduce) { section, p { transition: none; } }
</style>
