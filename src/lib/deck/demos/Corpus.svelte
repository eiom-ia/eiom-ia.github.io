<script>
  import donnees from './corpus.json';

  /**
   * Une barre par source, groupées par nature.
   *
   * La bande unique était plus compacte mais illisible: un segment à 2 % ne
   * peut pas porter son nom, et « Wikipé… » ou « ArX…St… » ne renseignent
   * personne. Ici chaque source a sa ligne, donc son nom entier, sa part et
   * son fait — tout lisible depuis le fond de la salle, sans rien survoler.
   *
   * Les parts viennent du tableau 1 de Touvron et al. 2023; le fait sur C4 de
   * Dodge et al. 2021.
   */
  const G = donnees.groupes;
  const MAX = 67;
  const virgule = (v) => String(v).replace('.', ',');
  const TEINTE = { WEB: 1, RÉFÉRENCE: 0.58, CODE: 0.42, ACADÉMIQUE: 0.28 };
</script>

<div class="cps">
  {#each G as g}
    <div class="grp">
      <div class="g-tete">
        <span class="g-nom">{g.nom}</span>
        <span class="g-part">{virgule(g.part)} %</span>
      </div>
      {#each g.sources as s}
        <div class="ligne">
          <span class="nom">{s.nom}</span>
          <span class="piste">
            <span class="barre" style="width: {(s.part / MAX) * 100}%; --t: {TEINTE[g.nom]}"></span>
          </span>
          <span class="pc">{virgule(s.part)} %</span>
          <span class="fait">{s.court}</span>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .cps {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .grp {
    display: flex;
    flex-direction: column;
    gap: 0.1em;
  }

  /* L'entête de groupe porte le total: c'est là qu'on lit les 82 % de web. */
  .g-tete {
    display: flex;
    align-items: baseline;
    gap: 0.6em;
    border-bottom: 2px solid var(--dk-filet);
    padding-bottom: 0.1em;
  }
  .g-nom {
    font-size: 0.56em;
    letter-spacing: 0.16em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  .g-part {
    font-size: 0.6em;
    font-weight: 600;
    color: var(--dk-accent);
    font-variant-numeric: tabular-nums;
  }
  .grp:first-child .g-nom,
  .grp:first-child .g-part {
    color: var(--dk-accent);
  }
  .grp:first-child .g-tete {
    border-bottom-color: var(--dk-accent);
  }

  .ligne {
    display: grid;
    grid-template-columns: 8.6em 11em 3.4em 1fr;
    gap: 0.7em;
    align-items: center;
    padding: 0.1em 0;
  }
  .nom {
    font-size: 0.64em;
    font-weight: 600;
    color: var(--dk-encre);
    white-space: nowrap;
  }
  .piste {
    display: block;
    height: 0.85em;
    background: var(--dk-fond-2);
  }
  .barre {
    display: block;
    height: 100%;
    background: color-mix(in srgb, var(--dk-accent) calc(var(--t) * 100%), var(--dk-fond));
  }
  .pc {
    font-size: 0.62em;
    font-weight: 600;
    color: var(--dk-encre);
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .fait {
    font-size: 0.58em;
    color: var(--dk-gris);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
