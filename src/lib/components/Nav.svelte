<script>
  import { page } from '$app/state';
  import { base } from '$app/paths';
  import { SEANCES } from '$lib/data/seances.js';

  const actif = (chemin) => page.url.pathname === chemin;
</script>

<nav>
  <a class="marque" href="{base}/">Parcours IA <span>EIOM 2026</span></a>
  <div class="liens">
    <a class="phare" class:on={actif('/avant-de-venir/')} href="{base}/avant-de-venir/">
      Avant de venir
    </a>
    {#each SEANCES as s}
      <a class:on={actif(`/seances/${s.numero}/`)} href="{base}/seances/{s.numero}/" title={s.titre}>
        S{s.numero}
      </a>
    {/each}
    <a class:on={actif('/ressources/')} href="{base}/ressources/">Ressources</a>
  </div>
</nav>

<style>
  nav {
    display: flex; align-items: center; justify-content: space-between;
    gap: 20px; flex-wrap: wrap;
    padding: 14px clamp(16px, 4vw, 40px);
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
    position: sticky; top: 0; z-index: 50;
  }
  .marque {
    font-family: var(--police-display); font-weight: 600;
    color: var(--ink); text-decoration: none; font-size: 1rem;
  }
  .marque span {
    font-family: var(--police-mono); font-size: 0.66rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--ink-3); margin-left: 8px;
  }
  .liens { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .liens a {
    font-size: 0.82rem; color: var(--ink-2); text-decoration: none;
    padding: 5px 10px; border-radius: var(--rayon);
  }
  .liens a:hover { background: var(--paper-2); }
  .liens a.on { background: var(--ink); color: var(--paper); }
  .liens a.phare { background: var(--accent); color: var(--paper); font-weight: 600; }
  .liens a.phare.on { background: var(--ink); }
</style>
