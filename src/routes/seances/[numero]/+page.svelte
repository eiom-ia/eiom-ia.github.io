<script>
  import Prose from '$lib/components/Prose.svelte';
  import Encadre from '$lib/components/Encadre.svelte';
  import { INTERFACES } from '$lib/data/seances.js';

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
  .chapeau {
    font-size: 1.05rem;
    border-left: 2px solid var(--accent);
    padding-left: 16px;
    margin: 1.6em 0 2em;
  }
</style>
