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
  const ROLES = [
    { n: 'LES OUVRIERS', d: 'font une tâche, puis disparaissent' },
    { n: 'LE TÉMOIN', d: 'surveille les ouvriers, débloque' },
    { n: 'LA RAFFINERIE', d: 'tient la file de fusion, règle les conflits' }
  ];
</script>

<div class="gt" bind:this={hote}>
  <div class="ville" class:vu={!js || e >= 1}>
    <div class="haut">
      <div class="vous">VOUS</div>
      <b>→</b>
      <div class="role chef"><strong>LE MAIRE</strong><span>votre seul interlocuteur : il découpe le travail, n'écrit jamais de code</span></div>
    </div>
    <b class="bas">↓</b>
    <div class="roles">
      {#each ROLES as r}
        <div class="role"><strong>{r.n}</strong><span>{r.d}</span></div>
      {/each}
    </div>
    <p class="socle">tous branchés sur le même graphe de <code>beads</code></p>
  </div>

  <div class="chiffre" class:vu={!js || e >= 2}>
    <b>20 à 30</b><span>agents en parallèle, sur une seule base de code</span>
  </div>

  <p class="cle" class:vu={!js || e >= 3}>
    <strong>« Comme diriger une équipe de juniors très rapides. »</strong>
    Yegge le dit lui-même : il faut corriger sans arrêt. Et on peut aller si vite qu'on ne s'arrête plus pour réfléchir.
    Décider <em>quoi</em> construire reste le seul goulot que la machine ne desserre pas.
  </p>
</div>

<style>
  .gt { width: 100%; display: grid; grid-template-columns: 1fr 0.5fr; gap: 0.7em; align-items: start; }
  .ville { border: 4px solid var(--dk-accent); padding: 0.6em; text-align: center; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .haut { display: grid; grid-template-columns: auto auto 1fr; gap: 0.5em; align-items: center; }
  .vous { border: 2px solid var(--dk-encre); padding: 0.28em 0.7em; font-size: 0.55em; font-weight: 600; }
  .haut b { color: var(--dk-accent); font-size: 0.8em; }
  .ville > b.bas { display: block; color: var(--dk-accent); font-size: 0.85em; line-height: 1.1; }
  .roles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4em; }
  .role { border: 2px solid var(--dk-encre); padding: 0.45em 0.35em; display: flex; flex-direction: column; gap: 0.15em; text-align: left; }
  .role.chef { border-width: 3px; border-color: var(--dk-accent); }
  .role strong { font-size: 0.5em; }
  .role span { color: var(--dk-gris); font-size: 0.44em; line-height: 1.3; }
  .socle { margin-top: 0.45em; padding-top: 0.4em; border-top: 2px solid var(--dk-filet); color: var(--dk-gris); font-size: 0.5em; }
  .chiffre { border: 3px solid var(--dk-encre); padding: 0.7em; display: flex; flex-direction: column; gap: 0.2em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .chiffre b { color: var(--dk-accent); font-size: 1.4em; line-height: 1; }
  .chiffre span { color: var(--dk-gris); font-size: 0.5em; line-height: 1.3; }
  .cle { grid-column: 1 / -1; border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.68em; line-height: 1.4; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .ville, .chiffre, .cle { transition: none; } }
</style>
