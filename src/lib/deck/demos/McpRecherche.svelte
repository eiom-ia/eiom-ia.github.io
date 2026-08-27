<script>
  import Logo from '../Logo.svelte';
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(1);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 1, lire: () => e, ecrire: (v) => (e = v) });
  });
  // Rien d'autre que la marque et le nom: ce qu'ils font se dit a voix haute,
  // ca ne se lit pas sur l'ecran pendant qu'on parle.
  const M = [
    { logo: 'consensus', n: 'Consensus' },
    { logo: 'zotero', n: 'Zotero' },
    { logo: 'playwright', n: 'Playwright' },
    { logo: 'cloudflare', n: 'Cloudflare' },
    { logo: 'notion', n: 'Notion' },
    { logo: 'slack', n: 'Slack' }
  ];
</script>

<div class="mr" bind:this={hote}>
  {#each M as m, i}
    <article class:vu={!js || e >= (i < 3 ? 0 : 1)}>
      <Logo nom={m.logo} alt={m.n} taille="5.2em" />
      <span>{m.n}</span>
    </article>
  {/each}
</div>

<style>
  .mr { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em; align-items: stretch; }
  article { border: 3px solid var(--dk-encre); padding: 1em 0.6em 0.85em; display: flex; flex-direction: column; align-items: center; gap: 0.6em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  article span { color: var(--dk-accent); font-size: 0.82em; letter-spacing: 0.02em; text-align: center; }
  article :global(.logo) { border-width: 3px; }
  .vu { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { article { transition: none; } }
</style>
