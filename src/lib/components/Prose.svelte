<script>
  let { children } = $props();
</script>

<div class="prose">{@render children()}</div>

<style>
  .prose {
    max-width: 68ch;
    margin: 0 auto;
    padding: clamp(32px, 6vh, 72px) 24px 96px;
  }
  .prose :global(h1) { margin-bottom: 0.4em; }
  .prose :global(h2) { margin: 2em 0 0.5em; }
  .prose :global(h3) { margin: 1.6em 0 0.4em; }
  .prose :global(p), .prose :global(li) { margin-bottom: 0.9em; }
  .prose :global(ul), .prose :global(ol) { padding-left: 1.4em; }
  .prose :global(pre) {
    background: var(--ink);
    color: var(--paper);
    padding: 14px 16px;
    border-radius: var(--rayon);
    overflow-x: auto;
    margin-bottom: 1.2em;
    font-size: 0.82rem;
    line-height: 1.55;
  }
  .prose :global(code) {
    background: var(--paper-2);
    padding: 1px 5px;
    border-radius: 2px;
  }
  .prose :global(pre code) { background: none; padding: 0; color: inherit; }
</style>
