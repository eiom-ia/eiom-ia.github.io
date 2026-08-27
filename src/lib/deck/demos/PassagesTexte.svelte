<script>
  import Picto from '../Picto.svelte';
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(5);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 5, lire: () => e, ecrire: (v) => (e = v) });
  });
  const P = [
    { pf: 'clic', ferme: 'Word', po: 'page', ouvert: 'Markdown · LaTeX · Quarto', gain: 'une phrase devient une ligne modifiable' },
    { pf: 'clic', ferme: 'des clics dans Excel', po: 'terminal', ouvert: 'un script R', gain: 'chaque transformation peut être rejouée' },
    { pf: 'poubelle', ferme: 'version_finale_2.docx', po: 'git', ouvert: 'Git', gain: 'chaque changement laisse une trace datée' },
    { pf: 'image', ferme: "une capture d'écran", po: 'grille', ouvert: 'un fichier de données', gain: "l'agent peut recalculer, pas seulement regarder" },
    { pf: 'cadenas', ferme: 'un PDF annoté', po: 'loupe', ouvert: 'des notes en texte', gain: 'des centaines de notes deviennent cherchables' }
  ];
</script>

<div class="pt" bind:this={hote}>
  <div class="entetes">
    <span class="col ferme">CE QUE L'AGENT NE PEUT QUE REGARDER</span>
    <span></span>
    <span class="col ouvert">CE QU'IL PEUT LIRE, ÉCRIRE ET COMPARER</span>
  </div>

  {#each P as p, i}
    <div class="rangee" class:vu={!js || e >= i + 1}>
      <div class="tuile mort">
        <Picto nom={p.pf} taille="1.5em" />
        <span>{p.ferme}</span>
      </div>
      <i class="fl">→</i>
      <div class="tuile vif">
        <Picto nom={p.po} taille="1.5em" />
        <div><strong>{p.ouvert}</strong><small>{p.gain}</small></div>
      </div>
    </div>
  {/each}

  <p class="fin" class:vu={!js || e >= 5}>
    Le format textuel n'est pas une austérité. C'est une poignée que vous, Git et l'agent pouvez
    tous saisir.
  </p>
</div>

<style>
  .pt { width: 100%; display: flex; flex-direction: column; gap: 0.3em; }
  .entetes, .rangee { display: grid; grid-template-columns: 1fr 1.6em 1.5fr; gap: 0.5em; align-items: center; }
  .col { font-size: 0.44em; letter-spacing: 0.1em; }
  .col.ferme { color: var(--dk-gris); }
  .col.ouvert { color: var(--dk-accent); }
  .rangee { opacity: 0; transform: translateX(-0.5em); transition: opacity 0.3s, transform 0.3s; }
  .rangee.vu, .fin.vu { opacity: 1; transform: none; }
  .tuile { display: flex; align-items: center; gap: 0.5em; padding: 0.4em 0.5em; min-height: 2.5em; }
  .tuile.mort { border: 2px dashed var(--dk-gris-2); color: var(--dk-gris); }
  .tuile.mort span { font-size: 0.55em; text-decoration: line-through; }
  .tuile.mort :global(.picto) { opacity: 0.45; }
  .tuile.vif { border: 3px solid var(--dk-accent); background: var(--dk-fond); }
  .tuile.vif div { display: flex; flex-direction: column; gap: 0.05em; min-width: 0; }
  .tuile.vif strong { color: var(--dk-accent); font-size: 0.58em; }
  .tuile.vif small { color: var(--dk-gris); font-size: 0.46em; line-height: 1.3; }
  .fl { color: var(--dk-accent); font-style: normal; text-align: center; font-size: 0.85em; }
  .fin { margin-top: 0.3em; border-top: 3px solid var(--dk-encre); padding-top: 0.45em; font-size: 0.66em; opacity: 0; transition: opacity 0.3s; }
  @media (prefers-reduced-motion: reduce) { .rangee, .fin { transition: none; } }
</style>
