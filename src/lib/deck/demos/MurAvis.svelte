<script>
  import { base } from '$app/paths';
  import avis from './avis-reels.json';
  import { PHOTO_RESTAURANT } from '$lib/data/credits-images.js';

  /**
   * Le corpus, montré au lieu d'être décrit: six vrais avis Google, dans leur
   * langue d'origine, chacun avec l'étoile que son auteur a laissée.
   *
   * C'est la démonstration de l'argument de la diapositive — la vérité terrain
   * est déjà là, dans la donnée — plutôt qu'une phrase qui l'affirme.
   *
   * Aucun nom d'auteur: le dépôt est public, seuls le texte et la note en
   * sortent. Les six textes sont vérifiés au mot près contre le corpus.
   */
  const etoiles = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
</script>

<div class="mur-tete">
  <span class="prov">
    <img src="{base}/img/google-maps.png" alt="" />
    Google Maps · {avis.total} avis
  </span>
  {#if PHOTO_RESTAURANT}
    <figure class="photo">
      <img src="{base}/img/{PHOTO_RESTAURANT.fichier}" alt="Le restaurant La Ligne Rouge" />
      <figcaption>{PHOTO_RESTAURANT.auteur} · {PHOTO_RESTAURANT.licence}</figcaption>
    </figure>
  {/if}
</div>

<div class="mur">
  {#each avis.avis as a}
    <figure class="av" class:haut={a.note >= 4} class:bas={a.note <= 2}>
      <div class="av-t">
        <span class="et">{etoiles(a.note)}</span>
        <span class="lg">{a.langue}</span>
      </div>
      <blockquote>{a.texte}</blockquote>
    </figure>
  {/each}
</div>

<style>
  /* La provenance des avis, montrée plutôt qu'écrite: le logo dit d'où vient
     la donnée en un coup d'œil. Marque déposée, usage nominatif. */
  .mur-tete {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1em;
    margin-bottom: 0.5em;
  }
  .prov {
    display: flex;
    align-items: center;
    gap: 0.45em;
    font-size: 0.66em;
    color: var(--dk-gris);
  }
  .prov img {
    width: 1.5em;
    height: 1.5em;
    display: block;
  }
  .photo {
    margin: 0;
    max-width: 34%;
  }
  .photo img {
    display: block;
    width: 100%;
    height: auto;
    border: 2px solid var(--dk-encre);
  }
  .photo figcaption {
    font-size: 0.5em;
    color: var(--dk-gris-2);
    margin-top: 0.2em;
  }

  .mur {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6em;
    width: 100%;
  }

  .av {
    margin: 0;
    border: 2px solid var(--dk-filet);
    padding: 0.5em 0.65em 0.6em;
    display: flex;
    flex-direction: column;
    gap: 0.35em;
    min-width: 0;
  }
  .av.haut {
    border-color: var(--dk-encre);
  }
  .av.bas {
    border-color: var(--dk-accent);
  }

  .av-t {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5em;
  }
  /* L'étoile porte la note réelle: c'est elle, la vérité terrain. */
  .et {
    font-size: 0.78em;
    letter-spacing: 0.08em;
    color: var(--dk-accent);
  }
  .lg {
    font-size: 0.55em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--dk-gris-2);
  }

  blockquote {
    margin: 0;
    font-size: 0.66em;
    line-height: 1.45;
    color: var(--dk-encre);
  }
</style>
