<script>
  let { fond = 'papier', children } = $props();
</script>

<section class="diapo {fond === 'encre' ? 'encre' : ''}">
  {@render children()}
</section>
