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

<div class="bd" bind:this={hote}>
  <div class="mal" class:vu={!js || e >= 1}>
    <strong>LE PROBLÈME</strong>
    <div class="sessions">
      <div class="ses">séance 1<i>✕</i></div>
      <div class="ses">séance 2<i>✕</i></div>
      <div class="ses">séance 3<i>✕</i></div>
    </div>
    <p>L'agent ne se souvient de rien d'une séance à l'autre. Yegge appelle ça <em>le problème de la démence</em>.</p>
  </div>

  <div class="fleche" class:vu={!js || e >= 2}>→</div>

  <div class="bien" class:vu={!js || e >= 2}>
    <strong>LE BEAD</strong>
    <pre>&#123;
  "id": "bd-14",
  "titre": "coder 50 avis à la main",
  "statut": "ready",
  "depend_de": ["bd-13"]
&#125;</pre>
    <p>Un fichier <code>JSON</code> versionné dans Git, à côté des données. La séance est jetable ; la tâche, non.</p>
  </div>

  <p class="cle" class:vu={!js || e >= 3}>
    <strong>La mémoire de l'agent devient un objet que vous pouvez lire, corriger et versionner.</strong>
    Vous ne relisez plus l'historique : vous ouvrez la tâche suivante.
  </p>
</div>

<style>
  .bd { width: 100%; display: grid; grid-template-columns: 1fr auto 1.1fr; gap: 0.7em; align-items: center; }
  .mal, .bien { border: 3px solid var(--dk-encre); padding: 0.65em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; align-self: stretch; }
  .bien { border-color: var(--dk-accent); }
  .mal > strong, .bien > strong { display: block; color: var(--dk-accent); font-size: 0.55em; letter-spacing: 0.12em; margin-bottom: 0.45em; }
  .mal > strong { color: var(--dk-gris); }
  .sessions { display: flex; gap: 0.35em; }
  .ses { flex: 1; border: 2px dashed var(--dk-gris-2); padding: 0.45em 0.3em; text-align: center; color: var(--dk-gris); font-size: 0.5em; }
  .ses i { display: block; color: var(--dk-gris-2); font-style: normal; font-size: 1.3em; }
  .mal p, .bien p { margin-top: 0.45em; color: var(--dk-gris); font-size: 0.5em; line-height: 1.35; }
  .bien pre { margin: 0; padding: 0.5em 0.6em; background: var(--dk-encre); color: #d7e3ff; font-size: 0.46em; line-height: 1.45; overflow-x: auto; }
  .fleche { color: var(--dk-accent); font-size: 1.6em; text-align: center; opacity: 0; transition: opacity 0.3s; }
  code { font-size: 0.95em; }
  .cle { grid-column: 1 / -1; border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.7em; line-height: 1.4; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .mal, .bien, .fleche, .cle { transition: none; } }
</style>
