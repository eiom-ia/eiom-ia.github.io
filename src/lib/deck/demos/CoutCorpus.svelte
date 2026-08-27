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
  // Mesure reelle de ligne_rouge.csv: 551 avis, 67 910 caracteres.
  // Prix d'entree au 26 aout 2026, en dollars americains par million de jetons.
  const M = [
    { n: 'Haiku 4.5', prix: 1, une: '0,02 $', vingt: '0,34 $' },
    { n: 'Sonnet 5', prix: 2, une: '0,03 $', vingt: '0,68 $' },
    { n: 'Opus 5', prix: 5, une: '0,09 $', vingt: '1,70 $' }
  ];
</script>

<div class="cc" bind:this={hote}>
  <div class="mesure" class:vu={!js || e >= 1}>
    <span class="fich">ligne_rouge.csv</span>
    <div class="chiffres">
      <div><b>551</b><span>avis</span></div>
      <div><b>67 910</b><span>caractères</span></div>
      <div class="fort"><b>≈ 17 000</b><span>jetons</span></div>
    </div>
  </div>

  <table class="grille" class:vu={!js || e >= 2}>
    <thead>
      <tr><th>en entrée</th><th>lu une fois</th><th>relu 20 fois par la boucle</th></tr>
    </thead>
    <tbody>
      {#each M as m}
        <tr>
          <td><strong>{m.n}</strong><small>{m.prix} $ / M de jetons</small></td>
          <td class="prix">{m.une}</td>
          <td class="prix gros">{m.vingt}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <p class="cle" class:vu={!js || e >= 3}>
    <strong>Ce n'est pas la taille du corpus qui coûte, c'est le nombre de fois que l'agent le relit.</strong>
    Une tâche fermée le lit une fois. Une conversation qui traîne le relit à chaque tour.
  </p>
</div>

<style>
  .cc { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .mesure { border: 3px solid var(--dk-encre); opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .fich { display: block; padding: 0.28em 0.5em; color: white; background: var(--dk-encre); font-size: 0.48em; }
  .chiffres { display: grid; grid-template-columns: repeat(3, 1fr); }
  .chiffres div { padding: 0.5em 0.6em; border-right: 2px solid var(--dk-filet); display: flex; flex-direction: column; }
  .chiffres div:last-child { border-right: 0; }
  .chiffres b { font-size: 0.95em; }
  .chiffres .fort b { color: var(--dk-accent); }
  .chiffres span { color: var(--dk-gris); font-size: 0.5em; }
  .grille { width: 100%; border-collapse: collapse; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .grille th { padding: 0.3em 0.5em; text-align: left; color: var(--dk-gris); font-size: 0.5em; font-weight: 400; border-bottom: 2px solid var(--dk-encre); }
  .grille td { padding: 0.4em 0.5em; border-bottom: 1px solid var(--dk-filet); }
  .grille td strong { display: block; font-size: 0.6em; }
  .grille td small { color: var(--dk-gris); font-size: 0.46em; }
  .prix { font-size: 0.7em; }
  .prix.gros { color: var(--dk-accent); font-weight: 600; font-size: 0.8em; }
  .cle { border-left: 0.35em solid var(--dk-accent); padding-left: 0.7em; font-size: 0.7em; line-height: 1.4; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .mesure, .grille, .cle { transition: none; } }
</style>
