<script>
  /**
   * Trois dangers qui ne sont pas de l'injection. Un mot par carte: le
   * reste se dit. Chacun renvoie a une diapo deja vue - Git, les MCP, le
   * corpus d'avis - pour que la salle raccroche au lieu d'apprendre.
   */
  import Picto from '../Picto.svelte';
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
  const D = [
    { p: 'poubelle', n: 'EFFACER', d: 'Vos données de terrain n’ont pas de deuxième exemplaire.', r: 'd’où Git' },
    { p: 'prise', n: 'BRANCHER', d: 'Un serveur MCP, un plugin, une skill : du code qui tourne avec vos accès.', r: 'd’où la prudence' },
    { p: 'coche', n: 'SE TROMPER EN SILENCE', d: '551 avis codés avec assurance, et faux. Rien ne s’affiche.', r: 'd’où la validation' }
  ];
</script>

<div class="ad" bind:this={hote}>
  {#each D as d, i}
    <article class:vu={!js || e >= i}>
      <Picto nom={d.p} taille="2.4em" />
      <strong>{d.n}</strong>
      <span>{d.d}</span>
      <em>{d.r}</em>
    </article>
  {/each}
</div>

<style>
  .ad { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em; align-items: stretch; }
  article { border: 3px solid var(--dk-encre); border-top: 0.5em solid #8f1822; padding: 0.9em 0.8em; display: flex; flex-direction: column; gap: 0.4em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  article :global(.picto) { color: #8f1822; }
  strong { font-size: 0.66em; letter-spacing: 0.04em; line-height: 1.2; }
  span { color: var(--dk-gris); font-size: 0.56em; line-height: 1.4; flex: 1; }
  em { font-style: normal; color: var(--dk-accent); font-size: 0.48em; letter-spacing: 0.08em; border-top: 1px solid var(--dk-filet); padding-top: 0.4em; }
  .vu { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { article { transition: none; } }
</style>
