<script>
  /**
   * Le collage d'agents, repris de la présentation FAS1001.
   *
   * On ne réinterprète pas la mise en page: on reproduit le mécanisme de
   * revealjs. Une scène de 1050 x 700 en pixels, les images posées dessus aux
   * coordonnées relevées sur le rendu d'origine, et la scène entière mise à
   * l'échelle par une transformation — exactement la formule de reveal,
   * min(largeur/1050, hauteur/700) moins la marge de 10 %.
   *
   * Les images débordent volontairement de la scène et ne sont PAS coupées à
   * son bord: reveal les laisse déborder et c'est la fenêtre qui coupe. Le
   * rognage se fait donc sur la diapositive.
   *
   * Un clic révèle l'image suivante. La touche « suivant » fait de même tant
   * qu'il en reste, puis rend la main au deck: une télécommande suffit.
   */
  import { base } from '$app/paths';

  const SCENE_L = 1050;
  const SCENE_H = 700;
  const MARGE = 0.9; // la marge de revealjs

  let { images = [], titre = '' } = $props();

  let js = $state(false);
  let n = $state(images.length);
  let echelle = $state(1);
  let hote = $state(null);
  let cadre = $state(null);

  $effect(() => {
    if (!hote || !cadre) return;
    js = true;
    n = 0;

    // La même formule que reveal, mesurée sur le cadre réel plutôt
    // qu'estimée: la diapositive a un bandeau, la fenêtre n'en a pas.
    const ro = new ResizeObserver(() => {
      const r = cadre.getBoundingClientRect();
      if (r.width && r.height) {
        echelle = Math.min(r.width / SCENE_L, r.height / SCENE_H) * MARGE;
      }
    });
    ro.observe(cadre);

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return () => ro.disconnect();
    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);

    function avancer() {
      n = n >= images.length ? 0 : n + 1;
    }
    diapo.addEventListener('click', avancer);

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
      ro.disconnect();
      diapo.removeEventListener('click', avancer);
      deck.removeEventListener('scroll', verifier);
      window.removeEventListener('keydown', auClavier, true);
      clearTimeout(t);
    };
  });
</script>

<div class="collage" bind:this={hote}>
  <div class="collage-cadre" bind:this={cadre}>
    <div class="collage-scene" style="transform: scale({echelle})">
      {#if titre}<h2 class="col-titre">{titre}</h2>{/if}
      {#each images as im, i}
        <img
          src="{base}{im.src}"
          alt={im.alt}
          class="col-im"
          class:vue={!js || i < n}
          style="top: {im.haut}px; right: {im.droite}px; width: {im.largeur}px;{im.rotation
            ? ` --rot: ${im.rotation}deg;`
            : ''}"
        />
      {/each}
    </div>
  </div>
</div>
