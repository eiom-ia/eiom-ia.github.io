<script>
  /**
   * Pourquoi l'exactitude seule ne suffit pas.
   *
   * Deux cas côte à côte: la maladie rare, où le modèle nul est
   * catastrophique, et leur propre corpus, où le modèle nul obtient déjà
   * 69,7 %. Le second compte davantage: c'est le chiffre qu'ils devront battre
   * demain, et il est calculé sur les 551 avis réels.
   *
   * La barre d'exactitude est haute dans les deux cas. C'est le compte des
   * ratés, en dessous, qui dit la vérité.
   */
  const CAS = [
    {
      titre: 'UNE MALADIE RARE',
      regle: 'Le modèle répond toujours « non »',
      n: 1000,
      pos: 10,
      exact: 99.0,
      rates: '10 malades sur 10',
      quoi: 'aucun malade détecté'
    },
    {
      titre: 'VOTRE CORPUS, DEMAIN',
      regle: 'Le modèle répond toujours « 5 étoiles »',
      n: 551,
      pos: 41,
      exact: 69.7,
      rates: '41 avis à 1 étoile sur 41',
      quoi: 'aucun client fâché repéré'
    }
  ];
  const virgule = (v) => String(v).replace('.', ',');
</script>

<div class="mes">
  <div class="cas">
    {#each CAS as c, i}
      <section class:vise={i === 1}>
        <span class="t">{c.titre}</span>
        <p class="regle">{c.regle}</p>

        <div class="jauge">
          <span class="rempli" style="width: {c.exact}%"></span>
        </div>
        <p class="chiffre">
          <strong>{virgule(c.exact)} %</strong> d'exactitude
        </p>

        <p class="rate"><span class="x">✗</span>{c.rates} — {c.quoi}</p>
      </section>
    {/each}
  </div>

  <p class="note">
    Un modèle qui ne fait rien peut avoir l'air excellent. L'exactitude ne dit rien de ce qui
    compte : ce qu'il <strong>rate</strong>.
  </p>
</div>

<style>
  .mes {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
  }
  .cas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.4em;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 0.15em;
    border-left: 3px solid var(--dk-gris-2);
    padding-left: 0.8em;
  }
  /* Le second cas est le leur: c'est celui qu'ils devront battre. */
  section.vise {
    border-left-color: var(--dk-accent);
  }

  .t {
    font-size: 0.58em;
    letter-spacing: 0.15em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  section.vise .t {
    color: var(--dk-accent);
  }
  .regle {
    margin: 0 0 0.3em;
    font-size: 0.68em;
    color: var(--dk-encre);
  }

  /* La jauge est presque pleine dans les deux cas: c'est le piège. */
  .jauge {
    height: 0.9em;
    border: 2px solid var(--dk-encre);
  }
  .rempli {
    display: block;
    height: 100%;
    background: var(--dk-encre);
  }
  section.vise .rempli {
    background: var(--dk-accent);
  }
  .chiffre {
    margin: 0.1em 0 0;
    font-size: 0.66em;
    color: var(--dk-gris);
  }
  .chiffre strong {
    font-size: 1.5em;
    color: var(--dk-encre);
    font-variant-numeric: tabular-nums;
  }
  section.vise .chiffre strong {
    color: var(--dk-accent);
  }

  .rate {
    margin: 0.35em 0 0;
    font-size: 0.64em;
    font-weight: 600;
    color: var(--dk-encre);
  }
  .x {
    color: var(--dk-accent);
    margin-right: 0.4em;
  }

  .note {
    margin: 0;
    font-size: 0.7em;
    line-height: 1.45;
    color: var(--dk-gris);
  }
  .note strong {
    color: var(--dk-encre);
  }
</style>
