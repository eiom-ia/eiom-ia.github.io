<script>
  import { base } from '$app/paths';
  import { SEANCES } from '$lib/data/seances.js';
</script>

<svelte:head>
  <title>L'intelligence artificielle (IA) et la recherche — EIOM 2026</title>
  <meta name="description" content="Parcours DKN-1289 de l'École interdisciplinaire outils & méthodes, du 24 au 28 août 2026 à l'Université Laval." />
</svelte:head>

<header>
  <p class="surtitre">EIOM 2026 · DKN-1289 · Université Laval</p>
  <h1>L'intelligence artificielle<br />et la recherche</h1>
  <p class="chapeau">
    L'IA peut transformer les pratiques de recherche, mais son utilisation doit se faire dans un cadre
    méthodologique clair. Cinq matinées structurées selon le cycle de la recherche, de la question de
    départ à la diffusion des résultats, avec la rigueur scientifique comme critère central.
  </p>
  <a class="cta" href="{base}/avant-de-venir/">
    Avant de venir — préparez votre ordinateur
    <span>30 minutes, à faire avant le lundi 24 août</span>
  </a>
</header>

<section class="semaine">
  <h2>La semaine</h2>
  <div class="grille">
    {#each SEANCES as s}
      <a class="carte" href="{base}/seances/{s.numero}/">
        <p class="jour">{s.jour}</p>
        <h3>{s.titre}</h3>
        <p class="resume">{s.resume}</p>
        <p class="formateur">{s.formateur}</p>
      </a>
    {/each}
  </div>
  <p class="horaire">Toutes les séances ont lieu de 8h45 à 12h45.</p>
</section>

<style>
  header { max-width: 68ch; margin: 0 auto; padding: clamp(40px, 8vh, 96px) 24px 40px; }
  .surtitre {
    font-family: var(--police-mono); font-size: 0.72rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--ink-3); margin-bottom: 1em;
  }
  .chapeau { font-size: 1.1rem; margin: 1.4em 0 2em; }
  .cta {
    display: block; padding: 16px 20px;
    background: var(--ink); color: var(--paper);
    border-radius: var(--rayon); text-decoration: none;
    font-weight: 600; box-shadow: var(--ombre);
  }
  .cta span {
    display: block; font-weight: 400; font-size: 0.8rem;
    color: var(--rule); margin-top: 3px;
  }
  .semaine { max-width: 68ch; margin: 0 auto; padding: 24px 24px 96px; }
  .grille { display: grid; gap: 12px; margin-top: 1em; }
  .carte {
    display: block; padding: 18px 20px;
    background: #fff; border: 1px solid var(--rule);
    border-radius: var(--rayon); text-decoration: none;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }
  .carte:hover { box-shadow: var(--ombre); transform: translateY(-1px); }
  .jour {
    font-family: var(--police-mono); font-size: 0.68rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.4em;
  }
  .carte h3 { font-size: 1.05rem; margin-bottom: 0.4em; }
  .resume { font-size: 0.88rem; margin-bottom: 0.5em; }
  .formateur { font-size: 0.76rem; color: var(--ink-3); margin: 0; }
  .horaire { margin-top: 1.4em; font-size: 0.82rem; color: var(--ink-3); }
</style>
