<script>
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(6);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 6, lire: () => e, ecrire: (v) => (e = v) });
  });
  // Les roles de Gas Town, d'apres l'observation de Maggie Appleton.
  const ROLES = [
    { n: 'LE MAIRE', d: "votre seul interlocuteur : il découpe le travail, n'écrit jamais de code", m: 'un grand modèle', fort: true },
    { n: 'LES OUVRIERS', d: 'font une tâche isolée, puis disparaissent', m: 'un petit modèle' },
    { n: 'LE TÉMOIN', d: 'surveille les ouvriers, débloque, relance', m: 'un modèle moyen' },
    { n: 'LA RAFFINERIE', d: 'tient la file de fusion, règle les conflits', m: 'un grand modèle' },
    { n: "L'ENTRETIEN", d: 'nettoie, range, garde la ville en état', m: 'un petit modèle' }
  ];
</script>

<div class="gt" bind:this={hote}>
  <div class="roles">
    {#each ROLES as r, i}
      <div class="role" class:chef={r.fort} class:vu={!js || e >= i + 1}>
        <strong>{r.n}</strong>
        <span>{r.d}</span>
        <em>{r.m}</em>
      </div>
    {/each}
  </div>

  <div class="socle" class:vu={!js || e >= 6}>
    <div class="chiffre"><b>20 à 30</b><span>agents en parallèle, sur une seule base de code</span></div>
    <p class="cle">
      <strong>Chaque rôle reçoit le modèle qu'il mérite.</strong> On ne paie pas un grand modèle
      pour ranger des fichiers. C'est là que le choix du modèle cesse d'être une question de goût :
      il devient une question de facture.
    </p>
  </div>
</div>

<style>
  .gt { width: 100%; display: flex; flex-direction: column; gap: 0.65em; }
  .roles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5em; align-items: stretch; }
  .role { border: 2px solid var(--dk-encre); padding: 0.5em 0.45em; display: flex; flex-direction: column; gap: 0.18em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .role.chef { border-width: 4px; border-color: var(--dk-accent); }
  .role strong { font-size: 0.5em; letter-spacing: 0.04em; }
  .role span { color: var(--dk-gris); font-size: 0.43em; line-height: 1.3; flex: 1; }
  .role em { font-style: normal; font-size: 0.4em; letter-spacing: 0.08em; color: var(--dk-accent); border-top: 1px solid var(--dk-filet); padding-top: 0.25em; }
  .socle { display: grid; grid-template-columns: auto 1fr; gap: 0.8em; align-items: center; opacity: 0; transition: opacity 0.3s; }
  .chiffre { border: 3px solid var(--dk-encre); padding: 0.55em 0.7em; display: flex; flex-direction: column; }
  .chiffre b { color: var(--dk-accent); font-size: 1.05em; line-height: 1; }
  .chiffre span { color: var(--dk-gris); font-size: 0.44em; line-height: 1.25; max-width: 9em; }
  .cle { border-left: 0.35em solid var(--dk-accent); padding-left: 0.65em; font-size: 0.62em; line-height: 1.45; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .role, .socle { transition: none; } }
</style>
