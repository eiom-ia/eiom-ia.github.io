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
  // Les noms sont ceux de Gas Town, pas des traductions: ce sont les roles
  // du depot (internal/templates/roles). La portee ville/rig vient du manuel
  // de Yegge. Aucun palier de modele n'est annonce: le routage par palier
  // est une proposition en discussion, pas une fonction livree.
  const ROLES = [
    { n: 'MAYOR', d: "votre interlocuteur : il découpe le travail en tâches et les assigne. Il n'écrit jamais de code.", ou: 'ville', fort: true },
    { n: 'CREW', d: 'agents nommés, de longue durée, affectés à vos rigs', ou: 'rig' },
    { n: 'POLECATS', d: 'ouvriers éphémères : une tâche isolée, puis ils disparaissent une fois le travail soumis', ou: 'rig' },
    { n: 'WITNESS', d: 'surveille les polecats du rig et les débloque', ou: 'rig' },
    { n: 'REFINERY', d: 'tient la file de fusion : évalue chaque travail en attente et règle les conflits', ou: 'rig' },
    { n: 'DEACON', d: 'relance les autres agents pour que la ville continue de tourner', ou: 'ville' },
    { n: 'DOGS', d: 'entretien et nettoyage', ou: 'ville' }
  ];
</script>

<div class="gt" bind:this={hote}>
  <div class="roles">
    {#each ROLES as r, i}
      <div class="role" class:chef={r.fort} class:vu={!js || e >= (i === 0 ? 0 : i < 5 ? 1 : 2)}>
        <strong>{r.n}</strong>
        <span>{r.d}</span>
        <em>{r.ou}</em>
      </div>
    {/each}
  </div>

  <div class="socle" class:vu={!js || e >= 3}>
    <div class="chiffre"><b>des dizaines</b><span>d'agents en parallèle, sur une seule base de code</span></div>
    <p class="cle">
      <strong>Vous ne parlez qu'au Mayor.</strong> Le reste de la ville s'organise sans vous.
    </p>
  </div>
  <p class="attrib">Steve Yegge, « Welcome to Gas Town » · Maggie Appleton, maggieappleton.com/gastown</p>
</div>

<style>
  .gt { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .roles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5em; align-items: stretch; }
  .role { border: 2px solid var(--dk-encre); padding: 0.5em 0.45em; display: flex; flex-direction: column; gap: 0.2em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .role.chef { border-width: 4px; border-color: var(--dk-accent); }
  .role strong { font-size: 0.58em; letter-spacing: 0.06em; }
  .role.chef strong { color: var(--dk-accent); }
  .role span { color: var(--dk-gris); font-size: 0.48em; line-height: 1.35; flex: 1; }
  .role em { font-style: normal; font-size: 0.4em; letter-spacing: 0.12em; color: var(--dk-accent); border-top: 1px solid var(--dk-filet); padding-top: 0.25em; }
  .socle { display: grid; grid-template-columns: auto 1fr; gap: 0.8em; align-items: center; opacity: 0; transition: opacity 0.3s; }
  .chiffre { border: 3px solid var(--dk-encre); padding: 0.5em 0.65em; display: flex; flex-direction: column; }
  .chiffre b { color: var(--dk-accent); font-size: 0.8em; line-height: 1.1; }
  .chiffre span { color: var(--dk-gris); font-size: 0.44em; line-height: 1.25; max-width: 10em; }
  .cle { border-left: 0.35em solid var(--dk-accent); padding-left: 0.65em; font-size: 0.66em; line-height: 1.45; }
  .attrib { color: var(--dk-gris); font-size: 0.4em; letter-spacing: 0.04em; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .role, .socle { transition: none; } }
</style>
