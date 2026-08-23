<script>
  import d from './jetons.json';

  /**
   * La phrase que le modèle vient de produire, découpée en jetons — les mêmes
   * fragments qu'on a vus sortir un par un à la diapositive précédente.
   *
   * L'encodage n'est pas supposé: cl100k_base reproduit exactement la suite de
   * jetons émise par gpt-3.5-turbo-instruct, ce qui a été vérifié avant
   * d'écrire ce fichier.
   *
   * L'équivalent anglais est là pour le coût: même contenu, moins de jetons.
   */
</script>

<div class="tok">
  <div class="tok-tete">
    <span class="src">encodage {d.encodage} · comptes réels</span>
  </div>

  <div class="tok-lg">
    <div class="lg-t">
      <span class="lang">Français</span>
      <span class="n fort">{d.fr.n} jetons</span>
    </div>
    <div class="jetons">
      {#each d.fr.jetons as j}<span class="j">{j.replace(' ', '␣')}</span>{/each}
    </div>
  </div>

  <div class="tok-lg">
    <div class="lg-t">
      <span class="lang">Anglais</span>
      <span class="n">{d.en.n} jetons</span>
    </div>
    <div class="jetons">
      {#each d.en.jetons as j}<span class="j en">{j.replace(' ', '␣')}</span>{/each}
    </div>
  </div>

  <p class="verdict">
    Même contenu, <strong>+{d.surcout} %</strong> de jetons en français.
  </p>
</div>

<style>
  .tok {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.55em;
  }
  .tok-tete {
    display: flex;
    justify-content: flex-end;
    border-bottom: 2px solid var(--dk-encre);
    padding-bottom: 0.25em;
  }
  .src {
    font-size: 0.62em;
    color: var(--dk-gris);
  }

  .tok-lg {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }
  .lg-t {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .lang {
    font-size: 0.6em;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--dk-gris);
  }
  .n {
    font-size: 0.68em;
    color: var(--dk-gris);
    font-variant-numeric: tabular-nums;
  }
  .n.fort {
    color: var(--dk-accent);
    font-weight: 600;
  }

  .jetons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2em;
  }
  /* Chaque jeton est une boîte: la frontière est le sujet de la diapositive.
     L'espace initial est rendu visible — il fait partie du jeton. */
  .j {
    font-size: 0.68em;
    padding: 0.12em 0.35em;
    border: 1px solid var(--dk-accent);
    color: var(--dk-accent);
    white-space: pre;
  }
  .j.en {
    border-color: var(--dk-gris-2);
    color: var(--dk-gris);
  }

  .verdict {
    margin: 0;
    font-size: 0.72em;
    color: var(--dk-encre);
  }
</style>
