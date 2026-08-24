<script>
  /**
   * Une échelle à cinq points, posée pour un vote à main levée.
   *
   * Les cinq stops sont de taille égale et numérotés: la salle voit tout de
   * suite combien il y a de choix, et peut répondre « trois » sans lire toute
   * l'étiquette. Le premier et le dernier portent l'ancrage.
   */
  let { question = '', choix = [] } = $props();
</script>

<div class="lik">
  <p class="q">{question}</p>

  <ol class="ech">
    {#each choix as c, i}
      <li>
        <span class="n">{i + 1}</span>
        <span class="bar"></span>
        <span class="l">{c}</span>
      </li>
    {/each}
  </ol>
</div>

<style>
  .lik {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.9em;
  }
  .q {
    margin: 0;
    font-size: 1.05em;
    line-height: 1.3;
    font-weight: 600;
    color: var(--dk-encre);
  }

  .ech {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.6em;
  }
  .ech li {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    min-width: 0;
  }
  .n {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1;
    color: var(--dk-accent);
    font-variant-numeric: tabular-nums;
  }
  /* Un trait plein sous chaque cran: la salle voit cinq positions égales. */
  .bar {
    display: block;
    height: 0.42em;
    background: var(--dk-accent);
  }
  .l {
    font-size: 0.66em;
    line-height: 1.35;
    color: var(--dk-encre);
  }
</style>
