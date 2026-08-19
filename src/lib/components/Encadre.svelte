<script>
  let { ton = 'ciel', titre = '', children } = $props();
</script>

<aside class="encadre {ton}">
  {#if titre}<h3>{titre}</h3>{/if}
  {@render children()}
</aside>

<style>
  .encadre {
    padding: 16px 18px;
    border-radius: var(--rayon);
    margin: 1.4em 0;
    border: 1px solid;
  }
  .encadre :global(p:last-child) { margin-bottom: 0; }
  .encadre h3 { margin: 0 0 0.4em; font-size: 0.95rem; }
  .ciel   { background: var(--ciel-clair);   border-color: rgba(0, 119, 182, 0.22); }
  .ambre  { background: var(--ambre-clair);  border-color: rgba(180, 83, 9, 0.22); }
  .rose   { background: var(--rose-clair);   border-color: rgba(159, 18, 57, 0.22); }
  .vert   { background: var(--vert-clair);   border-color: rgba(21, 128, 61, 0.22); }
</style>
