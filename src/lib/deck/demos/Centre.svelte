<script>
  import { base } from '$app/paths';

  /**
   * L'adresse à qui on écrit est un bâtiment, et il consomme.
   *
   * La diapositive ne fait qu'une chose: enchaîner deux chiffres officiels
   * jusqu'à une comparaison que la salle connaît. Meta publie le nombre de
   * GPU, NVIDIA publie la puissance d'un GPU, Hydro-Québec publie la
   * consommation d'un ménage. Le reste est une multiplication faite ici.
   *
   * Rien n'est estimé: chaque nombre affiché est soit relevé à la source,
   * soit calculé depuis deux nombres relevés à la source.
   */
  const GPU = 100000;
  const WATT = 700;
  const MW = Math.round(((GPU * WATT) / 1e6) * 10) / 10;
  const GWH = (MW * 1000 * 8760) / 1e6;
  const MENAGE = 17600;
  const FOYERS = Math.round((GWH * 1e6) / MENAGE);

  const esp = (v) => Math.round(v).toLocaleString('fr-CA').replace(/ |,/g, ' ');
</script>

<div class="ctr">
  <div class="haut">
    <figure class="photo">
      <img src="{base}/img/centre-donnees.jpg" alt="Une rangée de baies de serveurs dans un centre de données" />
    </figure>

    <div class="calcul">
    <div class="etape">
      <span class="v">{esp(GPU)}</span>
      <span class="l">GPU Hopper dans une seule grappe</span>
      <span class="s">Colossus, Memphis — bâti en 122 jours</span>
    </div>
    <span class="op">×</span>
    <div class="etape">
      <span class="v">{WATT} W</span>
      <span class="l">par puce, à pleine charge</span>
      <span class="s">fiche technique NVIDIA</span>
    </div>
    <span class="op">=</span>
    <div class="etape fort">
      <span class="v">{String(MW).replace('.', ',')} MW</span>
      <span class="l">rien que pour les puces</span>
      <span class="s">sans le refroidissement ni le reste</span>
    </div>
    </div>
  </div>

  <div class="compar">
    <span class="ct">CE QUE ÇA REPRÉSENTE SUR UNE ANNÉE</span>
    <p class="phrase">
      <strong>{esp(FOYERS)} foyers québécois.</strong> Une seule grappe, et seulement ses
      processeurs — ni le refroidissement, ni le reste du bâtiment.
    </p>
  </div>

  <div class="eau">
    <span class="ct">ET L'EAU</span>
    <p class="phrase">
      Entraîner GPT-3 a évaporé <strong>700 000 litres</strong> d'eau douce dans les centres de
      données qui l'ont hébergé.
    </p>
  </div>
</div>

<style>
  .ctr {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.55em;
  }
  /* La photo d'abord: le mot « bâtiment » du titre devient une image avant
     que les chiffres n'arrivent. */
  /* La photo tient une colonne à gauche plutôt qu'un bandeau pleine largeur:
     en bandeau elle écrasait la diapositive et se lisait comme une image
     d'illustration. Duotone papier/encre pour qu'elle appartienne à la
     palette au lieu de la contredire. */
  .haut {
    display: grid;
    grid-template-columns: 0.58fr 1fr;
    gap: 1.1em;
    align-items: center;
  }
  .photo {
    margin: 0;
  }
  .photo img {
    display: block;
    width: 100%;
    height: auto;
    border: 2px solid var(--dk-encre);
  }

  /* Le calcul est posé à plat: on voit d'où sort le chiffre final. */
  .calcul {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }
  .etape {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.02em;
    border-left: 3px solid var(--dk-filet);
    padding-left: 0.7em;
    min-width: 0;
  }
  .etape.fort {
    border-left-color: var(--dk-accent);
  }
  .v {
    font-size: 1.5em;
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.04em;
    color: var(--dk-encre);
    font-variant-numeric: tabular-nums;
  }
  .etape.fort .v {
    color: var(--dk-accent);
  }
  .l {
    font-size: 0.6em;
    color: var(--dk-encre);
    line-height: 1.3;
  }
  .s {
    font-size: 0.54em;
    color: var(--dk-gris-2);
    margin-top: 0.1em;
  }
  .op {
    font-size: 0.8em;
    color: var(--dk-gris-2);
    padding-left: 0.7em;
  }

  .compar,
  .eau {
    border-top: 2px solid var(--dk-filet);
    padding-top: 0.35em;
  }
  .compar {
    border-top-color: var(--dk-accent);
  }
  .ct {
    font-size: 0.55em;
    letter-spacing: 0.15em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  .compar .ct {
    color: var(--dk-accent);
  }
  .phrase {
    margin: 0.1em 0 0;
    font-size: 0.72em;
    line-height: 1.45;
    color: var(--dk-gris);
  }
  .phrase strong {
    color: var(--dk-encre);
  }
  .compar .phrase strong {
    font-size: 1.35em;
    color: var(--dk-accent);
  }
</style>
