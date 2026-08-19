<script>
  import Prose from '$lib/components/Prose.svelte';
  import Encadre from '$lib/components/Encadre.svelte';
  import { INTERFACES } from '$lib/data/seances.js';

  import { base } from '$app/paths';

  let { data } = $props();
  const s = $derived(data.seance);
</script>

<svelte:head>
  <title>Séance {s.numero} — {s.titre}</title>
</svelte:head>

<Prose>
  <p class="surtitre">Séance {s.numero} · {s.jour}</p>
  <h1>{s.titre}</h1>
  <p class="formateur">{s.formateur}</p>
  <p class="chapeau">{s.resume}</p>

  {#if s.deck}
    <a class="lien-deck" href="{base}/diapos/{s.deck}/">
      <span class="ld-t">Voir les diapositives</span>
      <span class="ld-s">Flèches ou molette pour avancer · s'imprime en PDF</span>
      <span class="ld-f">→</span>
    </a>
  {/if}

  {#if s.statut === 'gabarit'}
    <Encadre ton="ambre" titre="Contenu à venir">
      <p>
        Le matériel de cette séance est préparé par <strong>{s.formateur}</strong> et sera publié ici
        avant la semaine.
      </p>
    </Encadre>

    <h2>Ce sur quoi cette séance peut compter</h2>
    <p>
      À la fin de la séance 1, le lundi midi, chaque participant·e dispose de&nbsp;:
    </p>
    <ul>
      {#each INTERFACES.produitParSeance1 as item}<li>{item}</li>{/each}
    </ul>
    <p>
      Cette séance n'a donc pas à enseigner l'accès aux modèles : elle démarre sur des données que les
      participant·e·s ont produites eux-mêmes.
    </p>

    <h2>Ce que la séance 1 laisse volontairement intact</h2>
    <ul>
      {#each INTERFACES.laisseIntact as item}<li>{item}</li>{/each}
    </ul>
  {:else}
    <Encadre ton="ciel" titre="Matériel en préparation">
      <p>
        Le plan détaillé, les diapositives et les scripts de cette séance seront publiés ici avant le
        début de la semaine.
      </p>
    </Encadre>
  {/if}
</Prose>

<style>
  .surtitre {
    font-family: var(--police-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 0.6em;
  }
  .formateur { color: var(--ink-3); font-size: 0.92rem; margin-top: 0.3em; }
  .lien-deck {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2px 18px;
    padding: 18px 22px;
    margin: 1.6em 0;
    background: var(--ink);
    color: var(--paper);
    border-radius: var(--rayon);
    text-decoration: none;
    transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .lien-deck:hover { transform: translateY(-2px); }
  .ld-t { font-family: var(--police-display); font-size: 1.2rem; font-weight: 600; }
  .ld-s { font-size: 0.78rem; color: var(--rule); }
  .ld-f { grid-column: 2; grid-row: 1 / span 2; font-size: 1.5rem; }

  .chapeau {
    font-size: 1.05rem;
    border-left: 2px solid var(--accent);
    padding-left: 16px;
    margin: 1.6em 0 2em;
  }
</style>
