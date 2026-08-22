<script>
  import { untrack } from 'svelte';
  import { allerA, creerDeck, etiquette, precedent, progression, suivant } from './navigation.js';
  import './deck.css';

  let { total, children } = $props();

  // Le deck est navigable sans JavaScript: cet état ne sert qu'au confort
  // (barre de progression, pastilles, compteur). Il ne commande jamais la
  // visibilité d'une diapo.
  let deck = $state(creerDeck(untrack(() => total)));
  let conteneur = $state(null);
  let js = $state(false);

  // Ajustement de la taille pour un projecteur donné. Confort seulement:
  // sans JavaScript, --zoom garde sa valeur par défaut de 1.
  const ZOOMS = [0.8, 0.9, 1, 1.12, 1.25];
  let z = $state(2);

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
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      z = Math.min(z + 1, ZOOMS.length - 1);
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      z = Math.max(z - 1, 0);
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

<div class="deck" style="--zoom: {ZOOMS[z]}" bind:this={conteneur} onscroll={auDefilement} tabindex="-1">
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
  {#if js && ZOOMS[z] !== 1}<span class="zoom">{Math.round(ZOOMS[z] * 100)} %</span>{/if}
</div>
