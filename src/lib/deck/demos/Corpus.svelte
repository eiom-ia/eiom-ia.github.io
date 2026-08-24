<script>
  import donnees from './corpus.json';

  /**
   * Le corpus en une bande proportionnelle plutôt qu'en treemap.
   *
   * Deux raisons: les sous-ensembles n'ont pas de proportions publiées, donc
   * un treemap promettait une profondeur qu'on ne pouvait pas tenir; et
   * surtout, tout ce qui comptait était au survol — inutilisable quand on
   * parle devant une salle.
   *
   * Ici tout est à l'écran d'un coup: les parts, l'accolade des 82 % de web,
   * et les trois faits qui surprennent, tirés du tableau 1 de Touvron et al.
   * 2023 et de Dodge et al. 2021.
   */
  const SRC = donnees.groupes.flatMap((g) => g.sources.map((s) => ({ ...s, groupe: g.nom })));
  const WEB = SRC.filter((s) => s.groupe === 'WEB').reduce((a, s) => a + s.part, 0);
  const TEINTE = { WEB: 1, RÉFÉRENCE: 0.6, CODE: 0.42, ACADÉMIQUE: 0.28 };
  const virgule = (v) => String(v).replace('.', ',');

  const FAITS = [
    { q: 'Le site le plus représenté de C4', r: 'patents.google.com, devant Wikipédia et le New York Times' },
    { q: 'Wikipédia est relu 2,45 fois', r: 'vingt langues, alphabets latin et cyrillique seulement' },
    { q: 'GitHub n’est vu que 0,64 fois', r: 'licences Apache, BSD et MIT — le modèle n’en fait pas le tour' }
  ];
</script>

<div class="cps">
  <div class="bande">
    {#each SRC as s}
      <div class="seg" style="--p: {s.part}; --t: {TEINTE[s.groupe]}">
        <span class="pc">{virgule(s.part)}</span>
      </div>
    {/each}
  </div>

  <div class="noms">
    {#each SRC as s}
      <div class="nm" style="--p: {s.part}"><span>{s.nom}</span></div>
    {/each}
  </div>

  <div class="accolade" style="--w: {WEB}">
    <span class="trait"></span>
    <span class="txt">{virgule(WEB)} % du mélange est du web ramassé automatiquement</span>
  </div>

  <ul class="faits">
    {#each FAITS as f}
      <li><span class="q">{f.q}</span><span class="r">{f.r}</span></li>
    {/each}
  </ul>
</div>

<style>
  .cps {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.15em;
  }

  /* Une bande à l'échelle: la part se lit en largeur, pas dans une légende. */
  .bande {
    display: flex;
    height: 3.4em;
    border: 2px solid var(--dk-encre);
  }
  .seg {
    flex: var(--p);
    background: color-mix(in srgb, var(--dk-accent) calc(var(--t) * 100%), var(--dk-fond));
    border-right: 2px solid var(--dk-fond);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    overflow: hidden;
  }
  .seg:last-child {
    border-right: none;
  }
  .pc {
    font-size: 0.8em;
    font-weight: 600;
    color: var(--dk-encre);
    font-variant-numeric: tabular-nums;
  }
  .seg:first-child .pc,
  .seg:nth-child(2) .pc {
    color: var(--dk-fond);
  }

  .noms {
    display: flex;
  }
  .nm {
    flex: var(--p);
    min-width: 0;
    padding-top: 0.15em;
  }
  .nm span {
    display: block;
    font-size: 0.54em;
    color: var(--dk-gris);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* L'accolade dit ce que la bande montre déjà, mais nomme la chose. */
  .accolade {
    width: calc(var(--w) * 1%);
    margin-top: 0.35em;
  }
  .trait {
    display: block;
    height: 0.42em;
    border: 2px solid var(--dk-accent);
    border-top: none;
  }
  .accolade .txt {
    display: block;
    font-size: 0.62em;
    font-weight: 600;
    color: var(--dk-accent);
    padding-top: 0.25em;
  }

  .faits {
    list-style: none;
    margin: 0.7em 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.22em;
  }
  .faits li {
    display: grid;
    grid-template-columns: 17em 1fr;
    gap: 0.8em;
    align-items: baseline;
    border-left: 3px solid var(--dk-filet);
    padding-left: 0.7em;
  }
  .q {
    font-size: 0.64em;
    font-weight: 600;
    color: var(--dk-encre);
  }
  .r {
    font-size: 0.62em;
    color: var(--dk-gris);
  }
</style>
