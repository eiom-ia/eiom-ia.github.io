<script>
  import d from './poids-ouverts.json';

  /**
   * « Poids ouverts » veut dire quelque chose de très concret: on télécharge
   * un fichier, et dedans il y a des matrices nommées, qu'on peut lister.
   * C'est ça, des poids. Pas une nappe abstraite.
   *
   * Tout vient de l'en-tête du vrai fichier model.safetensors de Qwen2.5-0.5B,
   * lu par requête partielle sans télécharger le modèle. Les formes, le compte
   * de tenseurs et le total de paramètres sont mesurés.
   *
   * La part touchée par un adaptateur LoRA est calculée depuis ces mêmes
   * formes, pas citée de mémoire.
   */
  const espace = (v) => Math.round(v).toLocaleString('fr-CA').replace(/ |,/g, ' ');
  const forme = (f) => (f.length === 1 ? `[${f[0]}]` : `[${f[0]} × ${f[1]}]`);
</script>

<div class="po">
  <section class="bloc">
    <div class="tete">
      <span class="etq">CE QU'ON TÉLÉCHARGE</span>
      <span class="fic">{d.fichier}</span>
    </div>
    <ul class="tenseurs">
      {#each d.extrait as t}
        <li><span class="nom">{t.nom}</span><span class="forme">{forme(t.forme)}</span></li>
      {/each}
      <li class="reste">
        <span class="nom">… {espace(d.tenseurs - d.extrait.length)} autres tenseurs</span>
        <span class="forme">{d.couches} couches</span>
      </li>
    </ul>
    <p class="dit">
      Des matrices <strong>nommées</strong>, qu'on peut toutes lister. {espace(d.params)} nombres au
      total.
    </p>
  </section>

  <section class="bloc">
    <span class="etq">CE QU'ON PEUT EN FAIRE</span>
    <ul class="actes">
      <li class="oui"><span class="q">Les lire</span><span class="r">une ligne de code</span></li>
      <li class="non">
        <span class="q">Les changer à la main</span><span class="r">aucun sens : un poids seul ne veut rien dire</span>
      </li>
      <li class="oui">
        <span class="q">Réentraîner le modèle entier</span><span class="r">possible, mais c'est {espace(d.params)} nombres à bouger</span>
      </li>
      <li class="oui fort">
        <span class="q">Ajouter un adaptateur (LoRA)</span><span class="r"
          >on n'y touche pas : on ajoute une petite matrice à côté</span
        >
      </li>
    </ul>

    <div class="lora">
      <div class="barre">
        <span class="part" style="width: {Math.max(d.lora_part, 0.6)}%"></span>
      </div>
      <p class="dit">
        Un adaptateur de rang {d.lora_rang} n'entraîne que <strong>{espace(d.lora_params)}</strong>
        nombres — <strong>{String(d.lora_part).replace('.', ',')} %</strong> du modèle. C'est ainsi
        qu'on ajuste un modèle ouvert sans le réentraîner.
      </p>
    </div>
  </section>
</div>

<style>
  .po {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: 1.3em;
    width: 100%;
    align-items: start;
  }
  .bloc {
    display: flex;
    flex-direction: column;
    gap: 0.35em;
    min-width: 0;
  }
  .tete {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.6em;
  }
  .etq {
    font-size: 0.58em;
    letter-spacing: 0.15em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  .fic {
    font-size: 0.56em;
    color: var(--dk-gris-2);
  }

  /* La liste des tenseurs: c'est littéralement ce qu'ouvre le fichier. */
  .tenseurs {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 2px solid var(--dk-filet);
  }
  .tenseurs li {
    display: flex;
    justify-content: space-between;
    gap: 0.6em;
    padding: 0.24em 0.5em;
    font-size: 0.54em;
    border-bottom: 1px solid var(--dk-filet);
  }
  .tenseurs li:last-child {
    border-bottom: none;
  }
  .nom {
    color: var(--dk-encre);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .forme {
    color: var(--dk-accent);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .tenseurs li.reste .nom,
  .tenseurs li.reste .forme {
    color: var(--dk-gris-2);
  }

  .actes {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.28em;
  }
  .actes li {
    display: grid;
    grid-template-columns: 12em 1fr;
    gap: 0.6em;
    align-items: baseline;
    border-left: 3px solid var(--dk-gris-2);
    padding: 0.12em 0 0.12em 0.6em;
  }
  .actes li.non {
    border-left-style: dashed;
    opacity: 0.6;
  }
  .actes li.fort {
    border-left-color: var(--dk-accent);
  }
  .q {
    font-size: 0.64em;
    font-weight: 600;
    color: var(--dk-encre);
  }
  .r {
    font-size: 0.6em;
    color: var(--dk-gris);
  }

  .lora {
    margin-top: 0.35em;
  }
  /* La barre montre la part réellement entraînée: elle est presque invisible,
     et c'est le propos. */
  .barre {
    height: 0.7em;
    border: 2px solid var(--dk-accent);
  }
  .part {
    display: block;
    height: 100%;
    background: var(--dk-accent);
  }

  .dit {
    margin: 0.25em 0 0;
    font-size: 0.62em;
    line-height: 1.45;
    color: var(--dk-gris);
  }
  .dit strong {
    color: var(--dk-accent);
  }
</style>
