<script>
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
</script>

<Deck total={3}>
  {#snippet children(i)}
    <Slide actif={i === 0}>
      <h1 class="e">Parcours IA</h1>
      <p class="e">Démonstration du moteur de diapos.</p>
    </Slide>
    <Slide actif={i === 1} fond="encre">
      <h2 class="e">Fond encre</h2>
      <p class="e">Pour les diapos de transition.</p>
    </Slide>
    <Slide actif={i === 2}>
      <h2 class="e">Navigation</h2>
      <p class="e">Flèches, espace, balayage tactile, touche Z pour le zoom.</p>
    </Slide>
  {/snippet}
</Deck>
