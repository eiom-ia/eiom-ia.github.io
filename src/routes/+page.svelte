<script>
  import { base } from '$app/paths';
  import { SEANCES } from '$lib/data/seances.js';
</script>

<svelte:head>
  <title>L'intelligence artificielle (IA) et la recherche — EIOM 2026</title>
  <meta name="description" content="Parcours DKN-1289 de l'École interdisciplinaire outils & méthodes, du 24 au 28 août 2026 à l'Université Laval." />
</svelte:head>

<article>
  <header class="masthead">
    <div class="filets">
      <span>EIOM 2026</span>
      <span>DKN-1289</span>
      <span>Université Laval</span>
      <span class="fin">24 → 28 août</span>
    </div>

    <h1>
      <span class="l1">L'intelligence</span>
      <span class="l2">artificielle</span>
      <span class="l3">et la recherche</span>
    </h1>

    <div class="sous">
      <p class="chapeau">
        L'IA peut transformer les pratiques de recherche, mais son utilisation doit se faire dans un
        cadre méthodologique clair. Cinq matinées structurées selon le cycle de la recherche, de la
        question de départ à la diffusion des résultats.
      </p>
      <p class="auteurs">
        Laurence-Olivier&nbsp;M.&nbsp;Foisy<br />
        Antoine&nbsp;Lemor
      </p>
    </div>

    <a class="cta" href="{base}/avant-de-venir/">
      <span class="cta-t">Avant de venir</span>
      <span class="cta-s">Préparez votre ordinateur — 30 minutes, avant le lundi 24 août</span>
      <span class="cta-f">→</span>
    </a>
  </header>

  <section class="programme">
    <h2 class="titre-section"><span>Programme</span></h2>

    <ol class="seances">
      {#each SEANCES as s, i}
        <li style="--i: {i}">
          <a href="{base}/seances/{s.numero}/">
            <span class="num">{s.numero}</span>
            <div class="corps">
              <p class="jour">{s.jour}</p>
              <h3>{s.titre}</h3>
              <p class="resume">{s.resume}</p>
              <p class="formateur">{s.formateur}</p>
            </div>
            <span class="fleche">→</span>
          </a>
        </li>
      {/each}
    </ol>

    <p class="horaire">Toutes les séances ont lieu de 8h45 à 12h45.</p>
  </section>
</article>

<style>
  article {
    max-width: 62rem;
    margin: 0 auto;
    padding: 0 clamp(20px, 5vw, 48px) 120px;
  }

  /* ---------- Masthead ---------- */
  .masthead { padding: clamp(40px, 9vh, 96px) 0 0; }

  .filets {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    align-items: baseline;
    font-family: var(--police-mono);
    font-size: 0.66rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-3);
    padding-bottom: 10px;
    border-bottom: var(--filet-fort);
  }
  .filets .fin { margin-left: auto; color: var(--accent); }

  h1 {
    margin: clamp(24px, 5vh, 48px) 0 0;
    font-size: clamp(2.6rem, 9vw, 6.4rem);
    line-height: 0.94;
    display: grid;
  }
  h1 span { display: block; animation: monte 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  .l1 { animation-delay: 0.05s; }
  .l2 { animation-delay: 0.13s; font-style: italic; color: var(--accent); }
  .l3 { animation-delay: 0.21s; }

  @keyframes monte {
    from { opacity: 0; transform: translateY(0.4em); }
    to   { opacity: 1; transform: none; }
  }

  .sous {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
    margin: clamp(28px, 5vh, 44px) 0 0;
    padding-top: 20px;
    border-top: var(--filet);
    animation: monte 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both;
  }
  @media (min-width: 42rem) {
    .sous { grid-template-columns: minmax(0, 1fr) auto; gap: 48px; }
  }
  .chapeau { font-size: 1.02rem; max-width: var(--mesure); margin: 0; }
  .auteurs {
    font-family: var(--police-mono);
    font-size: 0.72rem;
    line-height: 1.9;
    color: var(--ink-3);
    text-align: right;
    margin: 0;
    white-space: nowrap;
  }

  .cta {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 6px 20px;
    margin-top: clamp(32px, 6vh, 56px);
    padding: 22px 26px;
    background: var(--ink);
    color: var(--paper);
    text-decoration: none;
    border-radius: var(--rayon);
    animation: monte 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.38s both;
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .cta:hover { transform: translateY(-2px); }
  .cta-t {
    font-family: var(--police-display);
    font-size: 1.35rem;
    font-weight: 600;
    grid-column: 1;
  }
  .cta-s {
    grid-column: 1;
    font-size: 0.82rem;
    color: var(--rule);
  }
  .cta-f {
    grid-column: 2;
    grid-row: 1 / span 2;
    font-size: 1.6rem;
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .cta:hover .cta-f { transform: translateX(5px); }

  /* ---------- Programme ---------- */
  .programme { margin-top: clamp(64px, 12vh, 120px); }

  .titre-section {
    font-family: var(--police-mono);
    font-size: 0.66rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-3);
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .titre-section::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--rule);
  }

  .seances { list-style: none; padding: 0; margin: 8px 0 0; }
  .seances li { border-bottom: var(--filet); }
  .seances li:first-child { border-top: var(--filet); }

  .seances a {
    display: grid;
    grid-template-columns: 3.2rem minmax(0, 1fr) 1.5rem;
    gap: clamp(12px, 3vw, 28px);
    align-items: start;
    padding: 26px 4px;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s ease, padding 0.2s ease;
  }
  .seances a:hover { background: var(--paper-2); padding-left: 12px; padding-right: 12px; }

  .num {
    font-family: var(--police-display);
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 0.85;
    color: var(--rule);
    font-variant-numeric: tabular-nums;
    transition: color 0.2s ease;
  }
  .seances a:hover .num { color: var(--accent); }

  .jour {
    font-family: var(--police-mono);
    font-size: 0.64rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin: 0 0 6px;
  }
  .corps h3 { font-size: 1.18rem; margin: 0 0 8px; }
  .resume { font-size: 0.88rem; margin: 0 0 8px; max-width: var(--mesure); }
  .formateur { font-size: 0.74rem; color: var(--ink-3); margin: 0; }

  .fleche {
    align-self: center;
    color: var(--rule);
    font-size: 1.1rem;
    transition: transform 0.2s ease, color 0.2s ease;
  }
  .seances a:hover .fleche { color: var(--accent); transform: translateX(4px); }

  .horaire {
    margin-top: 20px;
    font-family: var(--police-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: var(--ink-3);
  }
</style>
