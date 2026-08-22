<script>
  // Ossature seulement: defilement a accrochage et compteur.
  // AUCUN style visuel ici — chaque prototype apporte le sien, pour que les
  // doctrines ne se contaminent pas.
  let { total, children } = $props();

  let conteneur = $state(null);
  let i = $state(0);

  function auDefilement() {
    if (!conteneur) return;
    i = Math.round(conteneur.scrollTop / conteneur.clientHeight);
  }

  function auClavier(e) {
    if (!conteneur) return;
    const d = ['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)
      ? 1
      : ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)
        ? -1
        : 0;
    if (!d) return;
    e.preventDefault();
    const n = Math.min(Math.max(i + d, 0), total - 1);
    conteneur.children[n]?.scrollIntoView({ block: 'start' });
  }
</script>

<svelte:window onkeydown={auClavier} />

<div class="proto-deck" bind:this={conteneur} onscroll={auDefilement} tabindex="-1">
  {@render children()}
</div>

<div class="proto-folio">{i + 1} / {total}</div>

<style>
  :global(html, body) { margin: 0; padding: 0; }
  .proto-deck {
    height: 100dvh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  .proto-folio {
    position: fixed;
    bottom: 1.1rem;
    right: 1.4rem;
    z-index: 50;
    font-size: 0.7rem;
    font-variant-numeric: tabular-nums;
    opacity: 0.55;
    letter-spacing: 0.08em;
  }
</style>
