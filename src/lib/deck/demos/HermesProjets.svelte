<script>
  import { base } from '$app/paths';
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
  // Captures prises sur les depots publics le 27 aout 2026.
  const P = [
    { img: 'computer-use-linux', quoi: 'Contrôle du bureau Linux : Hermes pilote les applications Wayland et GNOME par MCP.', url: 'github.com/agent-sh/computer-use-linux' },
    { img: 'hermesclaw', quoi: 'Un pont vers la messagerie : on écrit à son agent dans WeChat, il répond.', url: 'github.com/AaronWong1999/hermesclaw' },
    { img: 'mars-rover', quoi: 'Une simulation de rover martien pilotée par un agent Hermes.', url: 'github.com/Snehal707/Hermes-mars-rover' },
    { img: 'android', quoi: 'Hermes installé sur un téléphone Android, par Termux.', url: 'github.com/leecoin06-commits/hermes-agent-android' }
  ];
</script>

<div class="hpj" bind:this={hote}>
  {#each P as p, i}
    <figure class:vu={!js || e >= i + 1}>
      <img src="{base}/img/agentique/projets/{p.img}.png" alt="En-tête du dépôt {p.url}" />
      <figcaption><span class="quoi">{p.quoi}</span><code>{p.url}</code></figcaption>
    </figure>
  {/each}
  <p class="note">Captures prises sur les dépôts publics le 27 août 2026. Le nombre d'étoiles est celui affiché ce jour-là.</p>
</div>

<style>
  .hpj { width: 100%; display: flex; flex-direction: column; gap: 0.4em; }
  figure { margin: 0; display: grid; grid-template-columns: 1.15fr 1fr; gap: 0.6em; align-items: center; opacity: 0; transform: translateY(0.3em); transition: opacity 0.3s, transform 0.3s; }
  img { display: block; width: 100%; border: 2px solid var(--dk-filet); }
  figcaption { display: flex; flex-direction: column; gap: 0.15em; }
  .quoi { font-size: 0.52em; line-height: 1.35; }
  code { color: var(--dk-accent); font-size: 0.44em; word-break: break-all; }
  .note { margin-top: 0.2em; border-top: 2px solid var(--dk-filet); padding-top: 0.35em; color: var(--dk-gris); font-size: 0.45em; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { figure { transition: none; } }
</style>
