<script>
  import { brancherTemps } from '../temps.js';
  import Picto from '../Picto.svelte';
  let js = $state(false);
  let e = $state(4);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 4, lire: () => e, ecrire: (v) => (e = v) });
  });
  const P = [
    { p: 'cadenas', t: 'DES DONNÉES PRIVÉES', s: 'vos fichiers, vos courriels, vos clés' },
    { p: 'oeil', t: 'DU CONTENU NON FIABLE', s: 'du texte écrit par quelqu’un d’autre' },
    { p: 'prise', t: 'UN MOYEN DE SORTIE', s: 'le réseau, une requête, un lien' }
  ];
</script>

<div class="tri" bind:this={hote}>
  <div class="trois">
    {#each P as c, i}
      <div class="cond" class:vu={!js || e >= i + 1}>
        <Picto nom={c.p} taille="2.1em" />
        <strong>{c.t}</strong>
        <span>{c.s}</span>
      </div>
      {#if i < 2}<i class="et" class:vu={!js || e >= i + 2}>+</i>{/if}
    {/each}
  </div>
  <div class="verdict" class:vu={!js || e >= 4}>
    <span>LES TROIS ENSEMBLE</span><strong>exploitable</strong>
  </div>
  <p class="vous" class:vu={!js || e >= 4}>
    <strong>Votre exercice en coche déjà deux.</strong> Les 551 avis sont du texte écrit par des inconnus, et l'agent
    tourne sur votre ordinateur, dans vos dossiers. Retirez-en une seule : le plus simple est de couper le réseau.
  </p>
  <p class="attrib" class:vu={!js || e >= 4}>« Lethal trifecta », d'après Simon Willison</p>
</div>

<style>
  .tri { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .trois { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 0.5em; align-items: stretch; }
  .cond { border: 3px solid var(--dk-encre); padding: 0.65em; display: flex; flex-direction: column; gap: 0.2em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .cond strong { font-size: 0.6em; }
  .cond span { color: var(--dk-gris); font-size: 0.5em; line-height: 1.3; }
  .et { display: grid; place-items: center; color: var(--dk-accent); font-size: 1.5em; font-style: normal; opacity: 0; transition: opacity 0.3s; }
  .verdict { display: flex; align-items: baseline; justify-content: center; gap: 0.6em; padding: 0.4em; color: white; background: var(--dk-accent); opacity: 0; transition: opacity 0.3s; }
  .verdict span { font-size: 0.52em; letter-spacing: 0.12em; }
  .verdict strong { font-size: 0.9em; }
  .vous { border-left: 0.35em solid var(--dk-encre); padding-left: 0.7em; font-size: 0.68em; line-height: 1.4; opacity: 0; transition: opacity 0.3s; }
  .attrib { color: var(--dk-gris); font-size: 0.48em; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .cond, .et, .verdict, .vous, .attrib { transition: none; } }
</style>
