<script>
  import { allerA, creerDeck, etiquette, precedent, progression, suivant } from './navigation.js';
  import './deck.css';

  let { total, children } = $props();

  // Le deck est navigable sans JavaScript: cet état ne sert qu'au confort
  // (barre de progression, pastilles, compteur). Il ne commande jamais la
  // visibilité d'une diapo.
  let deck = $state(creerDeck(total));
  let conteneur = $state(null);
  let js = $state(false);

  $effect(() => { js = true; });

  function versDiapo(n) {
    deck = allerA(deck, n);
    conteneur?.children[deck.index]?.scrollIntoView({ block: 'start' });
  }

  function auClavier(e) {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      versDiapo(suivant(deck).index);
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      versDiapo(precedent(deck).index);
    }
  }

  // Au défilement libre (molette, doigt), on relit la position réelle.
  function auDefilement() {
    if (!conteneur) return;
    const n = Math.round(conteneur.scrollTop / conteneur.clientHeight);
    deck = allerA(deck, n);
  }
</script>

<svelte:window onkeydown={auClavier} />

<div class="deck" bind:this={conteneur} onscroll={auDefilement} tabindex="-1">
  {@render children()}
</div>

<div class="deck-barre" style="width: {progression(deck) * 100}%"></div>

<div class="deck-pied" class:sans-js={!js}>
  <div class="deck-points">
    {#each Array.from({ length: deck.total }) as _, i}
      <button
        class="point {i === deck.index ? 'on' : ''}"
        aria-label="Aller à la diapo {i + 1}"
        onclick={() => versDiapo(i)}
      ></button>
    {/each}
  </div>
  <span>{etiquette(deck)}</span>
</div>
