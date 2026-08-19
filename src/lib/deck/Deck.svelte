<script>
  import { creerDeck, suivant, precedent, allerA, progression, etiquette } from './navigation.js';
  import './deck.css';

  let { total, children } = $props();
  let deck = $state(creerDeck(total));

  const ZOOMS = [1.0, 1.3, 1.5];
  let zoom = $state(1.0);

  function auClavier(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      deck = suivant(deck);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      deck = precedent(deck);
    } else if (e.key === 'z' || e.key === 'Z') {
      e.preventDefault();
      zoom = ZOOMS[(ZOOMS.indexOf(zoom) + 1) % ZOOMS.length];
      document.documentElement.style.zoom = String(zoom);
    }
  }

  let debutX = 0;
  const auToucherDebut = (e) => (debutX = e.touches[0].clientX);
  function auToucherFin(e) {
    const dx = e.changedTouches[0].clientX - debutX;
    if (Math.abs(dx) > 50) deck = dx < 0 ? suivant(deck) : precedent(deck);
  }
</script>

<svelte:window onkeydown={auClavier} ontouchstart={auToucherDebut} ontouchend={auToucherFin} />

<div class="deck">
  <div class="deck-grille"></div>
  <div class="deck-barre" style="width: {progression(deck) * 100}%"></div>

  {@render children(deck.index)}

  <div class="deck-pied">
    <div class="deck-points">
      {#each Array.from({ length: deck.total }) as _, i}
        <button
          class="point {i === deck.index ? 'on' : ''}"
          aria-label="Aller à la diapo {i + 1}"
          onclick={() => (deck = allerA(deck, i))}
        ></button>
      {/each}
    </div>
    <span>{etiquette(deck)}</span>
  </div>
</div>
