<script>
  import paires from './jetons.json';

  // Sans JavaScript, la première paire reste affichée: la démonstration
  // fonctionne quand même, elle ne devient simplement pas parcourable.
  let i = $state(0);
  const p = $derived(paires[i]);
</script>

<div class="tok">
  <div class="tok-nav">
    {#each paires as _, n}
      <button class:on={n === i} onclick={() => (i = n)} aria-label="Exemple {n + 1}">
        {n + 1}
      </button>
    {/each}
    <span class="src">encodage o200k_base · comptes réels</span>
  </div>

  <div class="tok-paires">
    <div class="tok-lg">
      <div class="tok-tete">
        <span class="lang">Français</span>
        <span class="n">{p.fr.n} jetons</span>
      </div>
      <div class="jetons">
        {#each p.fr.jetons as j, k}<span class="j" style="--k: {k}">{j}</span>{/each}
      </div>
    </div>

    <div class="tok-lg">
      <div class="tok-tete">
        <span class="lang">Anglais</span>
        <span class="n">{p.en.n} jetons</span>
      </div>
      <div class="jetons">
        {#each p.en.jetons as j, k}<span class="j en" style="--k: {k}">{j}</span>{/each}
      </div>
    </div>
  </div>

  <p class="verdict">
    Même contenu, <strong>+{p.surcout} %</strong> de jetons en français.
  </p>
</div>

<style>
  .tok { display: flex; flex-direction: column; gap: 12px; }
  .tok-nav { display: flex; align-items: center; gap: 6px; }
  .tok-nav button {
    width: 22px; height: 22px; border-radius: 50%;
    border: 1px solid var(--rule); background: transparent;
    font-family: var(--police-mono); font-size: 0.62rem;
    color: var(--ink-3); cursor: pointer;
  }
  .tok-nav button.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  .src {
    margin-left: auto; font-family: var(--police-mono);
    font-size: 0.58rem; letter-spacing: 0.08em; color: var(--ink-3);
  }

  .tok-paires { display: grid; gap: 12px; }
  @media (min-width: 46rem) { .tok-paires { grid-template-columns: 1fr 1fr; } }

  .tok-lg { border: 1px solid var(--rule); border-radius: var(--rayon); padding: 12px 14px; background: #fff; }
  .tok-tete { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
  .lang { font-family: var(--police-mono); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-3); }
  .n { font-family: var(--police-mono); font-size: 0.78rem; font-weight: 500; color: var(--accent); }

  .jetons { display: flex; flex-wrap: wrap; gap: 3px; }
  .j {
    font-family: var(--police-mono);
    font-size: clamp(0.6rem, 0.85vw, 0.76rem);
    padding: 2px 5px;
    border-radius: 2px;
    background: var(--rose-clair);
    border: 1px solid rgba(159, 18, 57, 0.2);
    white-space: pre;
    animation: pop 0.3s ease both;
    animation-delay: calc(var(--k) * 22ms);
  }
  .j.en { background: var(--ciel-clair); border-color: rgba(0, 119, 182, 0.2); }

  @keyframes pop { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

  .verdict { font-size: 0.92rem; margin: 0; }
</style>
