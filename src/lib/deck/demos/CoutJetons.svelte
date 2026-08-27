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
  // Trois tours d'une meme conversation: ce que l'API refacture a chaque fois.
  const TOURS = [
    { n: 1, garde: 1 },
    { n: 2, garde: 2 },
    { n: 3, garde: 3 }
  ];
</script>

<div class="cj" bind:this={hote}>
  <div class="regle" class:vu={!js || e >= 1}>
    <div><b>1 jeton</b><span>≈ 4 caractères</span></div>
    <div><b>l'entrée</b><span>ce que vous envoyez</span></div>
    <div class="cher"><b>la sortie</b><span>5 × le prix de l'entrée</span></div>
  </div>

  <div class="boucle" class:vu={!js || e >= 2}>
    <strong>L'API n'a pas de mémoire : chaque tour renvoie tout l'historique.</strong>
    <div class="tours">
      {#each TOURS as t}
        <div class="tour">
          <span class="lab">tour {t.n}</span>
          <div class="segs">
            {#each Array(t.garde) as _, k}<i class:neuf={k === t.garde - 1}></i>{/each}
          </div>
        </div>
      {/each}
    </div>
    <span class="leg">On refacture le bleu à chaque fois. Une longue conversation coûte bien plus que la somme de ses questions.</span>
  </div>

  <div class="leviers" class:vu={!js || e >= 3}>
    <div><b>−90 %</b><span>relire depuis le cache</span></div>
    <div><b>−50 %</b><span>envoyer par lot, sans presse</span></div>
    <div><b>÷ 5</b><span>Haiku au lieu d'Opus</span></div>
  </div>
</div>

<style>
  .cj { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .regle, .leviers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .regle div, .leviers div { border: 2px solid var(--dk-encre); padding: 0.5em; display: flex; flex-direction: column; gap: 0.1em; }
  .regle b, .leviers b { color: var(--dk-accent); font-size: 0.72em; }
  .regle span, .leviers span { color: var(--dk-gris); font-size: 0.5em; line-height: 1.25; }
  .regle .cher { border-color: var(--dk-accent); border-width: 3px; }
  .boucle { border: 3px solid var(--dk-encre); padding: 0.6em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .boucle > strong { font-size: 0.62em; }
  .tours { display: flex; flex-direction: column; gap: 0.28em; margin: 0.5em 0 0.4em; }
  .tour { display: grid; grid-template-columns: 4em 1fr; gap: 0.5em; align-items: center; }
  .lab { color: var(--dk-gris); font-size: 0.5em; }
  .segs { display: flex; flex-direction: row; gap: 0.18em; }
  .segs i { height: 1.05em; width: 3.4em; background: var(--dk-accent); }
  .segs i.neuf { background: var(--dk-encre); }
  .leg { color: var(--dk-gris); font-size: 0.5em; line-height: 1.3; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .regle, .boucle, .leviers { transition: none; } }
</style>
