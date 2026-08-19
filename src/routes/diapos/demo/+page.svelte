<script>
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
</script>

<Deck total={3}>
  {#snippet children()}
    <Slide>
      <h1 class="e">Parcours IA</h1>
      <p class="e">Démonstration du moteur de diapos.</p>
    </Slide>
    <Slide fond="encre">
      <h2 class="e">Fond encre</h2>
      <p class="e">Pour les diapos de transition.</p>
    </Slide>
    <Slide>
      <h2 class="e">Navigation</h2>
      <p class="e">Flèches, molette, doigt. Sans JavaScript, tout fonctionne encore.</p>
    </Slide>
  {/snippet}
</Deck>
