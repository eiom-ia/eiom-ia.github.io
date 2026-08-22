<script>
  import exemples from './prochain-jeton.json';

  let i = $state(0);
  const ex = $derived(exemples[i]);
  const max = $derived(Math.max(...ex.jetons.map((j) => j.p)));
</script>

<div class="pj">
  <div class="pj-nav">
    {#each exemples as _, n}
      <button class:on={n === i} onclick={() => (i = n)}>{n + 1}</button>
    {/each}
    <span class="src">gpt-4o-mini · logprobs réels</span>
  </div>

  <p class="amorce">« {ex.amorce} <span class="trou">___</span> »</p>

  <ul class="barres">
    {#each ex.jetons as j, k}
      <li style="--k: {k}">
        <span class="jt">{j.t}</span>
        <span class="barre"><span class="fill" style="width: {(j.p / max) * 100}%"></span></span>
        <span class="pct">{j.p.toFixed(2)} %</span>
      </li>
    {/each}
  </ul>

  <p class="note">{ex.note}</p>
</div>

<style>
  .pj { display: flex; flex-direction: column; gap: 0.36em; }
  .pj-nav { display: flex; align-items: center; gap: 0.21em; }
  .pj-nav button {
    width: 1.05em; height: 1.05em; border-radius: 50%;
    border: 1px solid var(--rule); background: transparent;
    font-family: var(--police-mono); font-size: 0.62em;
    color: var(--ink-3); cursor: pointer;
  }
  .pj-nav button.on { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  .src { margin-left: auto; font-family: var(--police-mono); font-size: 0.58em; letter-spacing: 0.08em; color: var(--ink-3); }

  .amorce { font-size: 0.72em; font-family: var(--police-display); margin: 0; }
  .trou { color: var(--accent); letter-spacing: 0.05em; }

  .barres { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.11em; }
  .barres li {
    display: grid;
    grid-template-columns: 7.5em 1fr 4em;
    align-items: center;
    gap: 0.36em;
    animation: glisse 0.35s ease both;
    animation-delay: calc(var(--k) * 45ms);
  }
  @keyframes glisse { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }

  .jt {
    font-family: var(--police-mono);
    font-size: 0.72em;
    background: var(--paper-2);
    border: 1px solid var(--rule);
    border-radius: 2px;
    padding: 0.07em 0.21em;
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .barre { height: 0.5em; background: var(--rule-2); border-radius: 2px; overflow: hidden; }
  .fill { display: block; height: 100%; background: linear-gradient(90deg, var(--accent), var(--ciel)); }
  .pct { font-family: var(--police-mono); font-size: 0.68em; text-align: right; color: var(--ink-3); font-variant-numeric: tabular-nums; }

  .note { font-size: 0.86em; color: var(--ink-2); margin: 0; }
</style>
