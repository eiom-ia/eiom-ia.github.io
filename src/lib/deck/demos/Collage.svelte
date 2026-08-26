<script>
  /**
   * Le collage d'agents, repris tel quel de la présentation FAS1001.
   *
   * L'original est en revealjs: des images en position absolue sur une scène
   * de 960 x 700, révélées une par une au clic, dont certaines débordent
   * volontairement du cadre. On reproduit la géométrie en pourcentages de
   * cette scène, donc elle suit l'échelle du deck au lieu d'être figée en
   * pixels comme dans la source.
   *
   * Rien ne se joue tout seul: un clic révèle l'image suivante. La touche
   * « diapositive suivante » fait la même chose tant qu'il reste une image,
   * puis reprend son rôle normal — une télécommande suffit.
   */
  import { base } from '$app/paths';

  let { images = [], titre = '' } = $props();

  // Sans JavaScript, tout est visible: une diapositive projetée ne doit jamais
  // dépendre de l'hydratation pour montrer son contenu.
  let js = $state(false);
  let n = $state(images.length);

  let hote = $state(null);

  $effect(() => {
    if (!hote) return;
    js = true;
    n = 0;

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return;
    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);

    function avancer() {
      n = n >= images.length ? 0 : n + 1;
    }
    diapo.addEventListener('click', avancer);

    // En capture sur window: le deck écoute en bouillonnement, donc
    // stopPropagation le neutralise tant qu'il reste une image à montrer.
    const AVANT = ['ArrowRight', 'ArrowDown', 'PageDown', ' '];
    const ARRIERE = ['ArrowLeft', 'ArrowUp', 'PageUp'];

    function auClavier(ev) {
      if (Math.round(deck.scrollTop / deck.clientHeight) !== monIndex) return;
      if (AVANT.includes(ev.key) && n < images.length) {
        ev.preventDefault();
        ev.stopPropagation();
        n += 1;
      } else if (ARRIERE.includes(ev.key) && n > 0) {
        ev.preventDefault();
        ev.stopPropagation();
        n -= 1;
      }
    }
    window.addEventListener('keydown', auClavier, true);

    // On repart du cadre vide en arrivant, et on remet à zéro en partant.
    let ici = false;
    function verifier() {
      const y = Math.round(deck.scrollTop / deck.clientHeight) === monIndex;
      if (y !== ici) {
        ici = y;
        n = 0;
      }
    }
    deck.addEventListener('scroll', verifier, { passive: true });
    verifier();
    const t = setTimeout(verifier, 350);

    return () => {
      diapo.removeEventListener('click', avancer);
      deck.removeEventListener('scroll', verifier);
      window.removeEventListener('keydown', auClavier, true);
      clearTimeout(t);
    };
  });
</script>

<div class="collage" bind:this={hote}>
  <div class="collage-scene">
    {#if titre}<h2 class="col-titre e">{titre}</h2>{/if}
  {#each images as im, i}
    <img
      src="{base}{im.src}"
      alt={im.alt}
      class="col-im"
      class:vue={!js || i < n}
      style="top: {im.haut}%; right: {im.droite}%; width: {im.largeur}%;{im.rotation
        ? ` --rot: ${im.rotation}deg;`
        : ''}"
    />
  {/each}
  </div>
</div>
