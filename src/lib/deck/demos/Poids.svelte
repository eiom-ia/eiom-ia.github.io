<script>
  /**
   * « Peut-on comprendre les poids ? » — la réponse est non, et la
   * diapositive doit le démontrer plutôt que l'affirmer.
   *
   * Une nappe de nombres ne disait rien: on y voyait du bruit, sans mesurer
   * l'écart. Ici l'écart est calculé. Un pixel par poids, un écran de
   * projection à 1366 x 768: il faudrait 6 387 écrans pleins pour afficher
   * LLaMA-7B — et c'est le plus petit des quatre.
   *
   * L'animation remplit les écrans un par un. La barre n'avance visiblement
   * pas, et c'est exactement l'argument.
   */
  const POIDS = 6.7e9; // Touvron et al. 2023, tableau 2 — LLaMA-7B
  const ECRAN = 1366 * 768;
  const ECRANS = Math.round(POIDS / ECRAN);

  let hote = $state(null);
  let js = $state(false);
  let n = $state(0); // écrans déjà remplis

  const espace = (v) => Math.round(v).toLocaleString('fr-CA').replace(/ |,/g, ' ');

  $effect(() => {
    if (!hote) return;
    js = true;

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return;
    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);

    let af = 0, debut = 0;
    function pas(t) {
      if (!debut) debut = t;
      // Accélération continue: on part écran par écran, puis de plus en plus
      // vite, et on n'arrive quand même pas au bout.
      const s = (t - debut) / 1000;
      n = Math.min(ECRANS, Math.floor(Math.pow(s, 3.1) * 1.6));
      if (n < ECRANS) af = requestAnimationFrame(pas);
    }

    let ici = false;
    function verifier() {
      const y = Math.round(deck.scrollTop / deck.clientHeight) === monIndex;
      if (y && !ici) {
        ici = true;
        n = 0;
        debut = 0;
        cancelAnimationFrame(af);
        af = requestAnimationFrame(pas);
      } else if (!y && ici) {
        ici = false;
        cancelAnimationFrame(af);
        n = 0;
      }
    }
    deck.addEventListener('scroll', verifier, { passive: true });
    verifier();
    const t0 = setTimeout(verifier, 350);

    return () => {
      deck.removeEventListener('scroll', verifier);
      cancelAnimationFrame(af);
      clearTimeout(t0);
    };
  });
</script>

<div class="poi" bind:this={hote}>
  <div class="haut">
    <div class="mesure">
      <span class="etq">UN PIXEL PAR POIDS, SUR UN ÉCRAN DE PROJECTION</span>
      <span class="chiffre">{js ? espace(n) : espace(ECRANS)}</span>
      <span class="unite">écrans pleins {js && n < ECRANS ? '…' : `sur ${espace(ECRANS)}`}</span>
    </div>

    <div class="jauge">
      <span class="rempli" style="width: {(n / ECRANS) * 100}%"></span>
    </div>
    <span class="part">{((n / ECRANS) * 100).toFixed(2).replace('.', ',')} % affiché</span>
  </div>

  <div class="bas">
    <div class="cote">
      <span class="etq">CE QU'ON PEUT RELIRE</span>
      <p>Un livre de codes de recherche : quelques dizaines de règles, relisibles en une heure.</p>
    </div>
    <div class="cote fort">
      <span class="etq">CE QU'ON NE PEUT PAS</span>
      <p>
        {espace(POIDS)} nombres. Aucun ne contient un fait. Aucun ne se corrige à la main. Et
        LLaMA-7B est le <strong>plus petit</strong> des quatre modèles du papier.
      </p>
    </div>
  </div>
</div>

<style>
  .poi {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }
  .haut {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }
  .mesure {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.02em;
  }
  .etq {
    font-size: 0.56em;
    letter-spacing: 0.14em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  .chiffre {
    font-size: 3.2em;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.05em;
    color: var(--dk-accent);
    font-variant-numeric: tabular-nums;
  }
  .unite {
    font-size: 0.7em;
    color: var(--dk-gris);
  }

  /* La jauge n'avance quasiment pas: c'est la démonstration, pas un défaut. */
  .jauge {
    height: 0.55em;
    border: 2px solid var(--dk-encre);
    margin-top: 0.3em;
  }
  .rempli {
    display: block;
    height: 100%;
    background: var(--dk-accent);
  }
  .part {
    font-size: 0.6em;
    color: var(--dk-gris);
    font-variant-numeric: tabular-nums;
  }

  .bas {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 1.2em;
  }
  .cote {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    border-left: 3px solid var(--dk-filet);
    padding-left: 0.7em;
  }
  .cote.fort {
    border-left-color: var(--dk-accent);
  }
  .cote p {
    margin: 0;
    font-size: 0.66em;
    line-height: 1.45;
    color: var(--dk-encre);
  }
  .cote.fort .etq {
    color: var(--dk-accent);
  }
</style>
