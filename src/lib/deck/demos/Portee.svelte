<script>
  /**
   * L'inventaire de ce que la salle a vu passer, remonté d'un coup.
   *
   * La diapositive précédente est un bilan de méthode: elle referme
   * l'exercice. Celle-ci fait l'inverse, elle ouvre — et c'est pour ça
   * qu'elle s'accumule au lieu de s'afficher. Une liste posée d'emblée se
   * lit; une liste qui se remplit sous les yeux se compte.
   *
   * Chaque case est une CAPACITÉ montrée dans le cours, jamais un exploit
   * attribué à la salle: la démonstration en direct peut échouer, le quota
   * d'Antigravity n'est pas publié, et une case qui dirait « vous avez
   * téléchargé » serait fausse dans la pièce ce jour-là.
   *
   * Le dernier clic n'ajoute aucune formule. Il ferme le cadre et constate.
   * Le « wow » appartient à qui parle, pas à la diapositive.
   */
  import Picto from '../Picto.svelte';
  import { brancherTemps } from '../temps.js';

  const CASES = [
    { p: 'grille', t: 'Télécharger, nettoyer, régresser', s: 'la démonstration' },
    { p: 'coche', t: "Classer 551 avis, mesurer l'accord", s: 'votre exercice' },
    { p: 'engrenage', t: "Reconstituer l'API d'un objet fermé", s: 'la montre' },
    { p: 'horloge', t: 'Démarrer sans personne', s: 'les agents permanents' },
    { p: 'prise', t: 'Brancher agenda, dépôt, montre', s: 'les MCP' },
    { p: 'page', t: 'Écrire sa méthode une seule fois', s: 'les skills' }
  ];

  const TOTAL = CASES.length + 1; // les six cases, puis le cadre qui se ferme

  let js = $state(false);
  let e = $state(TOTAL);
  let hote = $state(null);

  const ferme = $derived(!js || e >= TOTAL);

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: TOTAL, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="prt" bind:this={hote}>
  <div class="prt-cadre" class:ferme>
    {#each CASES as c, i}
      <div class="prt-case" class:on={!js || i < e}>
        <Picto nom={c.p} taille="2em" />
        <span class="prt-t">{c.t}<span class="prt-s">{c.s}</span></span>
      </div>
    {/each}
  </div>
  <p class="prt-bas" class:on={ferme}>Tout ça a été montré aujourd'hui.</p>
</div>

<style>
  .prt {
    width: 100%;
  }
  .prt-cadre {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
    border: 2px solid transparent;
    padding: 0.9em;
    transition: border-color 0.35s ease-out;
  }
  .prt-cadre.ferme {
    border-color: var(--dk-accent);
  }
  .prt-case {
    display: flex;
    align-items: center;
    gap: 0.7em;
    border: 2px solid var(--dk-encre);
    background: var(--dk-fond-2);
    padding: 0.75em 0.85em;
    opacity: 0;
    transform: translateY(0.5em);
    transition: opacity 0.28s ease-out, transform 0.28s ease-out;
  }
  .prt-case.on {
    opacity: 1;
    transform: none;
  }
  .prt-case :global(.picto) {
    color: var(--dk-accent);
    flex: none;
  }
  .prt-t {
    font-size: 0.86em;
    line-height: 1.3;
  }
  .prt-s {
    display: block;
    font-size: 0.76em;
    color: var(--dk-gris);
    letter-spacing: 0.02em;
  }
  .prt-bas {
    margin: 0.9em 0 0;
    text-align: center;
    font-size: 0.9em;
    letter-spacing: 0.06em;
    color: var(--dk-gris);
    opacity: 0;
    transition: opacity 0.35s ease-out;
  }
  .prt-bas.on {
    opacity: 1;
    color: var(--dk-accent);
  }
  @media (prefers-reduced-motion: reduce) {
    .prt-case {
      transform: none;
    }
  }
</style>
