<script>
  import avis from './avis-reels.json';

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
