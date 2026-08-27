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
  const CAS = [
    {
      quand: 'CHAQUE MATIN, 7 H',
      quoi: 'La veille',
      fait: 'Il interroge les bases sur vos mots-clés, lit les résumés, écarte les hors-sujet.',
      recu: 'Cinq références, et pourquoi chacune compte.'
    },
    {
      quand: 'TOUTES LES SIX HEURES',
      quoi: 'Le terrain',
      fait: 'Il collecte les nouvelles publications, avis ou pages, et les range dans le corpus.',
      recu: 'Un corpus qui grossit seul, et une alerte quand le volume bouge.'
    },
    {
      quand: 'DÈS QUE LES DONNÉES CHANGENT',
      quoi: 'La chaîne d’analyse',
      fait: 'Il relance le nettoyage et les figures, puis compare aux résultats de la veille.',
      recu: 'Un message si un chiffre a bougé. Sinon, rien.'
    }
  ];
</script>

<div class="hpj" bind:this={hote}>
  <div class="cartes">
    {#each CAS as c, i}
      <article class:vu={!js || e >= i + 1}>
        <span class="quand">{c.quand}</span>
        <h3>{c.quoi}</h3>
        <p class="fait">{c.fait}</p>
        <div class="recu"><span>VOUS RECEVEZ</span><p>{c.recu}</p></div>
      </article>
    {/each}
  </div>

  <p class="cle" class:vu={!js || e >= 4}>
    <strong>Vous lui écrivez depuis votre téléphone ; il travaille sur un serveur à 5 $ par mois.</strong>
    Ce n'est pas une démonstration technique : c'est du travail de recherche qui avance pendant
    que vous faites autre chose.
  </p>
</div>

<style>
  .hpj { width: 100%; display: flex; flex-direction: column; gap: 0.7em; }
  .cartes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7em; align-items: stretch; }
  article { border: 3px solid var(--dk-encre); padding: 0.7em 0.75em; display: flex; flex-direction: column; gap: 0.3em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .quand { color: var(--dk-accent); font-size: 0.48em; letter-spacing: 0.12em; }
  h3 { margin: 0; font-size: 0.92em; line-height: 1.15; }
  .fait { margin: 0; font-size: 0.56em; line-height: 1.45; flex: 1; }
  .recu { border-top: 2px solid var(--dk-filet); padding-top: 0.4em; }
  .recu span { display: block; color: var(--dk-gris); font-size: 0.44em; letter-spacing: 0.12em; margin-bottom: 0.12em; }
  .recu p { margin: 0; color: var(--dk-accent); font-size: 0.56em; line-height: 1.4; font-weight: 600; }
  .cle { border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.66em; line-height: 1.45; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { article, .cle { transition: none; } }
</style>
