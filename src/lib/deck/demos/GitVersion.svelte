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
  const COMMITS = [
    { h: 'a3f9c1', m: 'chapitre 2 : la revue de littérature', qui: 'vous' },
    { h: '7b2e04', m: 'bib : 14 références ajoutées', qui: 'agent' },
    { h: 'c81d55', m: 'analyse : recoder la variable de revenu', qui: 'agent' },
    { h: '2f6a90', m: 'figures : refaire le graphique 3', qui: 'agent' }
  ];
</script>

<div class="gv" bind:this={hote}>
  <div class="ligne" class:vu={!js || e >= 1}>
    {#each COMMITS as c, i}
      <div class="commit" class:agent={c.qui === 'agent'} class:dernier={i === COMMITS.length - 1}>
        <span class="pastille"></span>
        <code>{c.h}</code>
        <span class="msg">{c.m}</span>
        <em>{c.qui}</em>
      </div>
    {/each}
  </div>

  <div class="bas">
    <div class="diff" class:vu={!js || e >= 2}>
      <span class="tete">git diff — ce qu'il a <b>vraiment</b> fait</span>
      <pre><span class="f">analyse.R</span>
<span class="moins">- revenu &lt;- ifelse(revenu == -99, 0, revenu)</span>
<span class="plus">+ revenu &lt;- ifelse(revenu == -99, NA, revenu)</span></pre>
      <small>Il avait dit « j'ai nettoyé la variable ». Le diff dit lequel des deux nettoyages.</small>
    </div>

    <div class="pourquoi" class:vu={!js || e >= 3}>
      <div class="pt">
        <strong>VOUS POUVEZ TOUT ANNULER</strong>
        <span>C'est ce qui rend l'agent utilisable : le pire cas est un retour en arrière, pas une
          perte.</span>
      </div>
      <div class="pt">
        <strong>GITHUB, C'EST LA COPIE AILLEURS</strong>
        <span>Votre disque peut mourir. Le dépôt distant, non.</span>
      </div>
    </div>
  </div>
</div>

<style>
  .gv { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .ligne { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .ligne::before { content: ''; position: absolute; left: 0.5em; right: 0.5em; top: 0.52em; height: 3px; background: var(--dk-filet); }
  .commit { position: relative; display: flex; flex-direction: column; gap: 0.12em; padding-top: 1.5em; }
  .pastille { position: absolute; top: 0; left: 0; width: 1.05em; height: 1.05em; border: 3px solid var(--dk-encre); border-radius: 50%; background: var(--dk-fond); }
  .commit.agent .pastille { border-color: var(--dk-accent); background: var(--dk-accent); }
  .commit.dernier .pastille { box-shadow: 0 0 0 0.25em rgba(0, 51, 153, 0.18); }
  .commit code { color: var(--dk-gris); font-size: 0.44em; }
  .msg { font-size: 0.5em; line-height: 1.3; }
  .commit em { font-style: normal; font-size: 0.4em; letter-spacing: 0.12em; color: var(--dk-gris-2); }
  .commit.agent em { color: var(--dk-accent); }
  .bas { display: grid; grid-template-columns: 1.25fr 1fr; gap: 0.8em; align-items: start; }
  .diff, .pourquoi { opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .tete { display: block; color: var(--dk-accent); font-size: 0.48em; letter-spacing: 0.08em; margin-bottom: 0.25em; }
  .diff pre { margin: 0; padding: 0.5em 0.6em; background: #0f1214; font-size: 0.44em; line-height: 1.6; }
  .f { color: #8b949e; }
  .moins { color: #d6a2a2; } .plus { color: #8de0a9; font-weight: 600; }
  .diff small { display: block; margin-top: 0.3em; color: var(--dk-gris); font-size: 0.44em; line-height: 1.4; }
  .pourquoi { display: flex; flex-direction: column; gap: 0.5em; }
  .pt { border-left: 0.3em solid var(--dk-accent); padding-left: 0.55em; }
  .pt strong { display: block; font-size: 0.48em; letter-spacing: 0.06em; }
  .pt span { color: var(--dk-gris); font-size: 0.46em; line-height: 1.4; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .ligne, .diff, .pourquoi { transition: none; } }
</style>
