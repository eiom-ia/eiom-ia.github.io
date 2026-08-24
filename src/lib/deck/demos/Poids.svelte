<script>
  /**
   * On sait dessiner une base de données: des lignes, des colonnes, une clé.
   * Un modèle n'a rien de tout ça, et c'est précisément ce qu'il faut montrer.
   *
   * À gauche, la table: on y pointe une ligne, on la lit. À droite, la nappe
   * de poids: aucune case ne contient « Paris », l'information est répartie
   * sur des millions de nombres qu'aucun index ne rassemble.
   *
   * Les valeurs de la nappe ne sont PAS des poids mesurés — on n'a pas ouvert
   * de modèle. Elles sont engendrées ici de façon reproductible et la
   * diapositive le dit: c'est la texture qu'on montre, pas un contenu.
   */
  const COLS = 34, LIGNES = 14;

  // Générateur déterministe: le même dessin à chaque build, et aucune donnée
  // prétendue réelle.
  let g = 20260824;
  const suivant = () => ((g = (g * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff) * 2 - 1;
  const NAPPE = Array.from({ length: LIGNES * COLS }, () => suivant());

  const TABLE = [
    ['pays', 'capitale'],
    ['France', 'Paris'],
    ['Japon', 'Tokyo'],
    ['Brésil', 'Brasilia']
  ];

  let survol = $state(false);
</script>

<div class="poi">
  <section class="col">
    <h3>UNE BASE DE DONNÉES</h3>
    <table>
      {#each TABLE as ligne, i}
        <tr class:entete={i === 0} class:vise={i === 1 && survol}>
          {#each ligne as cell}<td>{cell}</td>{/each}
        </tr>
      {/each}
    </table>
    <p class="dit">
      On pointe une ligne, on lit la valeur. Elle est <strong>quelque part</strong>.
    </p>
  </section>

  <section class="col">
    <h3>LES POIDS D'UN MODÈLE</h3>
    <div
      class="nappe"
      role="img"
      aria-label="Une nappe de nombres sans structure lisible, figurant les poids d'un modèle."
      onmouseenter={() => (survol = true)}
      onmouseleave={() => (survol = false)}
    >
      {#each NAPPE as v}
        <span class="c" style="--v: {Math.abs(v)}; --s: {v < 0 ? 1 : 0}"></span>
      {/each}
    </div>
    <p class="dit">
      Aucune case ne contient « Paris ». La réponse est <strong>répartie</strong> sur des millions de
      nombres, sans index.
    </p>
  </section>
</div>

<style>
  .poi {
    display: grid;
    grid-template-columns: 1fr 1.35fr;
    gap: 1.4em;
    width: 100%;
    align-items: start;
  }
  .col {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    min-width: 0;
  }
  h3 {
    margin: 0;
    font-size: 0.6em;
    letter-spacing: 0.15em;
    font-weight: 600;
    color: var(--dk-gris);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.68em;
  }
  td {
    border: 1px solid var(--dk-filet);
    padding: 0.25em 0.5em;
    color: var(--dk-encre);
  }
  tr.entete td {
    color: var(--dk-gris);
    font-weight: 600;
    background: var(--dk-fond-2);
  }
  /* La ligne qu'on irait chercher: elle existe, on peut la désigner. */
  tr.vise td {
    background: var(--dk-accent);
    color: var(--dk-fond);
    border-color: var(--dk-accent);
  }

  /* La nappe: une case par poids, teinte selon la valeur. Le regard n'y
     accroche rien, et c'est le propos. */
  .nappe {
    display: grid;
    grid-template-columns: repeat(34, 1fr);
    gap: 1px;
    border: 2px solid var(--dk-filet);
    padding: 3px;
  }
  .c {
    aspect-ratio: 1;
    background: color-mix(
      in srgb,
      var(--dk-accent) calc(var(--v) * 85%),
      var(--dk-fond)
    );
    filter: saturate(calc(1 - var(--s) * 0.85));
  }

  .dit {
    margin: 0;
    font-size: 0.64em;
    line-height: 1.4;
    color: var(--dk-gris);
  }
  .dit strong {
    color: var(--dk-encre);
  }
</style>
