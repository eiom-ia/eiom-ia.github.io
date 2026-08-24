<script>
  /**
   * Ce qui arrive au texte qu'on envoie, et les recours.
   *
   * Quatre niveaux, du plus exposé au plus fermé. L'échelle est le propos:
   * ce n'est pas « l'IA est dangereuse », c'est « voici où vous vous situez
   * et comment descendre d'un cran ».
   *
   * Les règles de l'API viennent de la documentation d'OpenAI, relevée le
   * 24 août 2026: pas d'entraînement par défaut, journal de trente jours pour
   * la surveillance des abus, rétention nulle sur approbation préalable.
   */
  const NIVEAUX = [
    {
      n: 'CLAVARDAGE GRAND PUBLIC',
      r: 'Vos conversations peuvent servir à entraîner le modèle, sauf refus explicite dans les réglages.',
      e: 3
    },
    {
      n: 'PAR L’API',
      r: 'Pas d’entraînement sur vos données, sauf accord explicite de votre part. Un journal de 30 jours pour la surveillance des abus.',
      e: 2
    },
    {
      n: 'API AVEC RÉTENTION NULLE',
      r: 'Le journal lui-même est supprimé. Sur approbation préalable du fournisseur.',
      e: 1
    },
    {
      n: 'MODÈLE OUVERT, SUR VOTRE MACHINE',
      r: 'Rien ne sort. Aucune requête, aucun journal, aucun tiers.',
      e: 0
    }
  ];
</script>

<div class="don">
  <ul class="ech">
    {#each NIVEAUX as v}
      <li class:sur={v.e === 3} class:sous={v.e === 0}>
        <span class="pts" aria-hidden="true">
          {#each Array(4) as _, k}<span class="p" class:on={k < v.e + 1}></span>{/each}
        </span>
        <span class="n">{v.n}</span>
        <span class="r">{v.r}</span>
      </li>
    {/each}
  </ul>

  <p class="note">
    La question n'est pas « est-ce dangereux », c'est <strong>où vous vous situez</strong> — et vous
    pouvez descendre d'un cran.
  </p>
</div>

<style>
  .don {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }
  .ech {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35em;
  }
  .ech li {
    display: grid;
    grid-template-columns: 3.6em 15em 1fr;
    gap: 0.8em;
    align-items: baseline;
    border-left: 3px solid var(--dk-filet);
    padding: 0.15em 0 0.15em 0.7em;
  }
  /* Le haut de l'échelle est le plus exposé, le bas ne sort pas de la salle. */
  .ech li.sur {
    border-left-color: var(--dk-encre);
  }
  .ech li.sous {
    border-left-color: var(--dk-accent);
  }

  .pts {
    display: flex;
    gap: 0.18em;
  }
  .p {
    width: 0.5em;
    height: 0.5em;
    border: 1px solid var(--dk-gris-2);
  }
  .p.on {
    background: var(--dk-gris);
    border-color: var(--dk-gris);
  }
  .ech li.sous .p.on {
    background: var(--dk-accent);
    border-color: var(--dk-accent);
  }

  .n {
    font-size: 0.6em;
    letter-spacing: 0.1em;
    font-weight: 600;
    color: var(--dk-encre);
  }
  .ech li.sous .n {
    color: var(--dk-accent);
  }
  .r {
    font-size: 0.62em;
    line-height: 1.4;
    color: var(--dk-gris);
  }

  .note {
    margin: 0;
    font-size: 0.68em;
    color: var(--dk-gris);
  }
  .note strong {
    color: var(--dk-encre);
  }
</style>
