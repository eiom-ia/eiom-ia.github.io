<script>
  /**
   * Le danger que la salle ne voit pas venir: ce ne sont pas les fichiers
   * qu'on televerse, c'est tout ce que l'agent lit pour travailler. La
   * diapo d'ouverture dit deja que l'agent recoit la machine; celle-ci dit
   * ou vont les donnees, et devant qui il faut en repondre.
   */
  import Picto from '../Picto.svelte';
  import Logo from '../Logo.svelte';
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(2);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 2, lire: () => e, ecrire: (v) => (e = v) });
  });
  const FICHIERS = [
    { p: 'humain', n: 'entretiens/' },
    { p: 'grille', n: 'participants.csv' },
    { p: 'cadenas', n: 'notes_terrain.md' }
  ];
</script>

<div class="dd" bind:this={hote}>
  <div class="scene">
    <div class="machine">
      <span class="tag">VOTRE MACHINE</span>
      <ul>
        {#each FICHIERS as f}
          <li><Picto nom={f.p} taille="1.35em" /><span>{f.n}</span></li>
        {/each}
      </ul>
    </div>

    <div class="franchir" class:vu={!js || e >= 1}>
      <svg viewBox="0 0 120 24" aria-hidden="true">
        <path class="flux" d="M2 12 H104" />
        <path class="pointe" d="M100 4 L116 12 L100 20" />
      </svg>
      <span>tout ce qu'il lit pour travailler</span>
    </div>

    <div class="tiers" class:vu={!js || e >= 1}>
      <span class="tag">UN TIERS</span>
      <div class="logos">
        <Logo nom="anthropic" alt="Anthropic" taille="2.3em" />
        <Logo nom="openai" alt="OpenAI" taille="2.3em" />
        <Logo nom="google" alt="Google" taille="2.3em" />
      </div>
    </div>
  </div>

  <p class="ethique" class:vu={!js || e >= 2}>
    <b>Votre certificat d'éthique couvre-t-il ce transfert ?</b>
  </p>
</div>

<style>
  .dd { width: 100%; display: flex; flex-direction: column; gap: 1em; }
  .scene { display: grid; grid-template-columns: 1.1fr auto 1fr; gap: 1.2em; align-items: center; }
  .tag { display: block; color: var(--dk-accent); font-size: 0.5em; letter-spacing: 0.12em; margin-bottom: 0.5em; }
  .machine, .tiers { border: 3px solid var(--dk-encre); padding: 0.8em 0.9em; }
  .tiers { border-style: dashed; }
  .machine ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.45em; }
  .machine li { display: flex; align-items: center; gap: 0.6em; }
  .machine li span { font-family: var(--dk-mono); font-size: 0.62em; }
  .logos { display: flex; gap: 0.7em; }
  .franchir { display: flex; flex-direction: column; align-items: center; gap: 0.35em; opacity: 0; transition: opacity 0.35s; }
  .franchir svg { width: 7em; height: 1.3em; overflow: visible; }
  .franchir path { fill: none; stroke: #8f1822; stroke-width: 5; }
  .franchir .flux { stroke-dasharray: 10 8; animation: flux 0.7s linear infinite; }
  .franchir span { color: var(--dk-gris); font-size: 0.5em; text-align: center; max-width: 9em; line-height: 1.3; }
  .tiers { opacity: 0; transition: opacity 0.35s; }
  .ethique { border-left: 0.35em solid #8f1822; padding-left: 0.7em; font-size: 0.82em; opacity: 0; transition: opacity 0.35s; }
  .ethique b { color: #8f1822; }
  .vu { opacity: 1; }
  @keyframes flux { to { stroke-dashoffset: -18; } }
  @media (prefers-reduced-motion: reduce) { .franchir .flux { animation: none; } }
</style>
