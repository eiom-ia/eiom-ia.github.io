<script>
  let { fond = 'papier', children } = $props();
</script>

<section class="diapo {fond === 'encre' ? 'encre' : ''}">
  <div class="diapo-in">{@render children()}</div>
</section>
