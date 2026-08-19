<script>
  let { numero, titre, children } = $props();
</script>

<section class="etape">
  <h2><span class="num">{numero}</span>{titre}</h2>
  {@render children()}
</section>

<style>
  .etape { margin: 2.8em 0; }
  .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7em; height: 1.7em;
    margin-right: 0.5em;
    border-radius: 50%;
    background: var(--accent);
    color: var(--paper);
    font-family: var(--police-mono);
    font-size: 0.6em;
    vertical-align: middle;
  }
</style>
