<script>
  // d = facteur d'échelle propre à la diapo. Les diapos denses se réduisent
  // sans que les diapos aérées perdent leur grande typographie. Calculé par
  // mesure réelle avec outils/ajuster.mjs, jamais à l'estime.
  let { fond = 'papier', d = 1, children } = $props();
</script>

<section class="diapo {fond === 'encre' ? 'encre' : ''}" style={d === 1 ? undefined : `--d: ${d}`}>
  <div class="diapo-in">{@render children()}</div>
</section>
