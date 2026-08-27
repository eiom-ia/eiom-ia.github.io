<script>
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(4);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 4, lire: () => e, ecrire: (v) => (e = v) });
  });
  const GRAPHE = [
    { id: 'BD-1', t: 'collecter', st: 'closed' },
    { id: 'BD-2', t: 'nettoyer', st: 'closed' },
    { id: 'BD-3', t: 'coder 50 avis', st: 'ready' },
    { id: 'BD-4', t: 'vérifier', st: 'blocked' }
  ];
</script>

<div class="bd" bind:this={hote}>
  <div class="haut">
    <div class="mal" class:vu={!js || e >= 1}>
      <strong>LE PROBLÈME</strong>
      <div class="sessions">
        <div class="ses">séance 1<i>✕</i></div><div class="ses">séance 2<i>✕</i></div><div class="ses">séance 3<i>✕</i></div>
      </div>
      <p>Chaque séance repart de zéro. Yegge appelle ça <em>le problème de la démence</em>.</p>
    </div>

    <div class="fich" class:vu={!js || e >= 2}>
      <strong>UN BEAD</strong>
      <pre>&#123;
  "id": "bd-3",
  "titre": "coder 50 avis à la main",
  "statut": "ready",
  "depend_de": ["bd-2"]
&#125;</pre>
      <p>Un fichier <code>JSON</code> versionné dans Git, à côté des données.</p>
    </div>
  </div>

  <div class="graphe" class:vu={!js || e >= 3}>
    {#each GRAPHE as g, i}
      <div class="bead {g.st}">
        <b>{g.id}</b><span>{g.t}</span>
        <em>{g.st === 'closed' ? 'fait' : g.st === 'ready' ? 'prêt' : 'bloqué'}</em>
      </div>
      {#if i < GRAPHE.length - 1}<i class="fl">→</i>{/if}
    {/each}
  </div>

  <div class="bas" class:vu={!js || e >= 4}>
    <div class="cycle"><code>bd create</code><i>→</i><code>bd ready</code><i>→</i><code>bd close</code></div>
    <p class="cle">
      <strong>L'agent ne relit plus l'historique : il ouvre la tâche suivante.</strong>
      La séance est jetable, le graphe reste. C'est la mémoire sortie du contexte.
    </p>
  </div>
</div>

<style>
  .bd { width: 100%; display: flex; flex-direction: column; gap: 0.55em; }
  .haut { display: grid; grid-template-columns: 1fr 1.1fr; gap: 0.7em; }
  .mal, .fich { border: 3px solid var(--dk-encre); padding: 0.55em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .fich { border-color: var(--dk-accent); }
  .mal > strong, .fich > strong { display: block; font-size: 0.5em; letter-spacing: 0.12em; margin-bottom: 0.35em; color: var(--dk-gris); }
  .fich > strong { color: var(--dk-accent); }
  .sessions { display: flex; gap: 0.3em; }
  .ses { flex: 1; border: 2px dashed var(--dk-gris-2); padding: 0.35em 0.2em; text-align: center; color: var(--dk-gris); font-size: 0.45em; }
  .ses i { display: block; font-style: normal; font-size: 1.2em; }
  .mal p, .fich p { margin-top: 0.35em; color: var(--dk-gris); font-size: 0.46em; line-height: 1.35; }
  .fich pre { margin: 0; padding: 0.45em 0.55em; background: #0f1214; color: #d7e3ff; font-size: 0.42em; line-height: 1.45; }
  .graphe { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 0.3em; align-items: center; opacity: 0; transition: opacity 0.3s; }
  .bead { min-height: 3.7em; border: 3px solid var(--dk-gris-2); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .bead b { font-size: 0.55em; }
  .bead span { font-size: 0.4em; line-height: 1.2; }
  .bead em { font-style: normal; font-size: 0.36em; letter-spacing: 0.1em; }
  .bead.closed { border-color: var(--dk-gris-2); color: var(--dk-gris); }
  .bead.ready { border-color: var(--dk-accent); border-width: 4px; }
  .bead.ready em { color: var(--dk-accent); }
  .bead.blocked { border-style: dashed; color: var(--dk-gris); }
  .fl { color: var(--dk-accent); font-style: normal; }
  .bas { display: grid; grid-template-columns: auto 1fr; gap: 0.8em; align-items: center; opacity: 0; transition: opacity 0.3s; }
  .cycle { display: flex; align-items: center; gap: 0.3em; }
  .cycle code { border: 1px solid var(--dk-encre); padding: 0.1em 0.25em; font-size: 0.48em; }
  .cycle i { color: var(--dk-accent); font-style: normal; font-size: 0.6em; }
  .cle { border-left: 0.35em solid var(--dk-accent); padding-left: 0.6em; font-size: 0.62em; line-height: 1.4; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .mal, .fich, .graphe, .bas { transition: none; } }
</style>
