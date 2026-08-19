<script>
  let { fond = 'papier', actif = false, children } = $props();
</script>

<section class="diapo {fond === 'encre' ? 'encre' : ''} {actif ? 'active' : ''}">
  {@render children()}
</section>
