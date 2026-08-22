<script>
  import { base } from '$app/paths';

  // Une courbe d'intérêt et de financement, pas une échelle mesurée: elle
  // rend visible ce que le mot « hiver » désigne. Les repères, eux, sont
  // datés et cités sur la diapositive.
  const AN0 = 1948, AN1 = 2027, L = 1000;
  const x = (an) => ((an - AN0) / (AN1 - AN0)) * L;
  const y = (n) => 262 - n * 1.62;

  const COURBE = [
    [1950, 22], [1956, 48], [1958, 62], [1966, 44], [1974, 10],
    [1980, 18], [1985, 72], [1987, 56], [1993, 8], [2000, 20],
    [2012, 56], [2017, 78], [2022, 95], [2026, 100]
  ].map(([an, n]) => [x(an), y(n)]);

  /** Lissage Catmull-Rom converti en bézier cubique. */
  function lisser(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }
  const chemin = lisser(COURBE);

  const HIVERS = [
    { de: 1974, a: 1980, nom: 'hiver' },
    { de: 1987, a: 1993, nom: 'hiver' }
  ];

  // dy: on décale sous le point quand la courbe monte au-dessus du libellé.
  const REPERES = [
    { an: 1950, txt: 'Le jeu de l’imitation', n: 22, ancre: 'start', dx: 10, dy: 5 },
    { an: 1956, txt: 'Dartmouth', n: 48, ancre: 'end', dx: -11, dy: -8 },
    { an: 1985, txt: 'Systèmes experts', n: 72, ancre: 'middle', dx: 0, dy: -16 },
    { an: 2012, txt: 'Apprentissage profond', n: 56, ancre: 'end', dx: -12, dy: 6 },
    { an: 2017, txt: 'Transformers', n: 78, ancre: 'end', dx: -12, dy: 6 },
    { an: 2022, txt: 'ChatGPT', n: 95, ancre: 'middle', dx: 0, dy: -16 }
  ];

  // Rangée régulière plutôt qu'un placement à l'année: à 1950, 1958 et 1962
  // les vignettes se chevauchaient. L'année est écrite sous chacune.
  const PORTRAITS = [
    { an: 1950, f: 'turing.jpg', nom: 'Turing' },
    { an: 1958, f: 'perceptron.jpg', nom: 'Perceptron' },
    { an: 1956, f: 'mccarthy.jpg', nom: 'McCarthy' },
    { an: 2018, f: 'bengio.jpg', nom: 'Bengio' }
  ];

  const DECENNIES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  // Animation en amélioration seulement: sans JavaScript, .pret n'est jamais
  // posée et tout s'affiche d'emblée. Rien de vital n'en dépend.
  let hote = $state(null);
  let pret = $state(false);
  let joue = $state(false);

  $effect(() => {
    if (!hote) return;
    pret = true;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) joue = true; },
      { threshold: 0.4 }
    );
    io.observe(hote);
    return () => io.disconnect();
  });
</script>

<div class="chrono" class:pret class:joue bind:this={hote}>
  <svg viewBox="0 0 1000 300" role="img"
       aria-label="Courbe de l'intérêt pour l'IA de 1950 à aujourd'hui, avec deux périodes d'effondrement">

    {#each HIVERS as h}
      <g class="hiver">
        <rect x={x(h.de)} y="88" width={x(h.a) - x(h.de)} height="176" />
        <text x={(x(h.de) + x(h.a)) / 2} y="104" text-anchor="middle" class="ch-hiver">{h.nom}</text>
      </g>
    {/each}

    <line class="ch-axe" x1="0" y1="264" x2="1000" y2="264" />
    {#each DECENNIES as d}
      <g class="ch-dec">
        <line x1={x(d)} y1="264" x2={x(d)} y2="270" />
        <text x={x(d)} y="284" text-anchor="middle">{d}</text>
      </g>
    {/each}

    <path class="ch-courbe" d={chemin} />

    {#each REPERES as r, i}
      <g class="ch-rep" style="--i: {i}">
        <circle cx={x(r.an)} cy={y(r.n)} r="5" />
        <text x={x(r.an) + r.dx} y={y(r.n) + r.dy} text-anchor={r.ancre}>{r.txt}</text>
      </g>
    {/each}
  </svg>

  <div class="ch-portraits">
    {#each PORTRAITS as p, i}
      <figure style="--i: {i}">
        <img src="{base}/img/histoire/{p.f}" alt={p.nom} />
        <figcaption>{p.nom} <span class="an">{p.an}</span></figcaption>
      </figure>
    {/each}
  </div>
</div>

<style>
  .chrono { width: 100%; display: flex; flex-direction: column; gap: 0.8em; }
  svg { width: 100%; height: auto; display: block; overflow: visible; }

  /* --- traits --- */
  :global(.ch-axe) { stroke: var(--dk-encre); stroke-width: 2; }
  :global(.ch-dec line) { stroke: var(--dk-gris-2); stroke-width: 1; }
  :global(.ch-dec text) {
    font-family: var(--dk-mono); font-size: 13px;
    letter-spacing: 0.08em; fill: var(--dk-gris);
  }
  :global(.ch-courbe) {
    fill: none; stroke: var(--dk-accent); stroke-width: 3;
    stroke-linecap: round; stroke-linejoin: round;
  }
  :global(.hiver rect) { fill: var(--dk-encre); opacity: 0.07; }
  :global(.ch-hiver) {
    font-family: var(--dk-mono); font-size: 13px;
    letter-spacing: 0.16em; text-transform: uppercase; fill: var(--dk-gris);
  }
  :global(.ch-rep circle) { fill: var(--dk-fond); stroke: var(--dk-encre); stroke-width: 2.5; }
  :global(.ch-rep text) {
    font-family: var(--dk-mono); font-size: 14px; font-weight: 500;
    fill: var(--dk-encre);
  }

  /* --- portraits --- */
  .ch-portraits { display: flex; gap: 1.1em; justify-content: flex-start; }
  .ch-portraits figure {
    margin: 0;
    display: flex; align-items: center; gap: 0.5em;
  }
  .ch-portraits img {
    width: 2.9em; height: 2.9em; object-fit: cover;
    border: 2px solid var(--dk-encre); display: block;
    filter: grayscale(1) contrast(1.05);
  }
  .ch-portraits figcaption {
    font-family: var(--dk-mono); font-size: 0.6em;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--dk-encre);
    white-space: nowrap;
  }
  .ch-portraits .an { color: var(--dk-gris); }

  /* --- animation, uniquement si JavaScript est là --- */
  .chrono.pret :global(.ch-courbe) {
    stroke-dasharray: 2600;
    stroke-dashoffset: 2600;
  }
  .chrono.pret :global(.ch-rep),
  .chrono.pret :global(.hiver),
  .chrono.pret figure { opacity: 0; }

  .chrono.joue :global(.ch-courbe) {
    animation: tracer 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  .chrono.joue :global(.hiver) { animation: venir 0.5s ease 1.1s forwards; }
  .chrono.joue :global(.ch-rep) {
    animation: venir 0.4s ease forwards;
    animation-delay: calc(0.55s + var(--i) * 0.16s);
  }
  .chrono.joue figure {
    animation: monter 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    animation-delay: calc(1.3s + var(--i) * 0.13s);
  }

  @keyframes tracer { to { stroke-dashoffset: 0; } }
  @keyframes venir { to { opacity: 1; } }
  @keyframes monter { from { opacity: 0; transform: translateY(0.5em); } to { opacity: 1; transform: none; } }

  @media (prefers-reduced-motion: reduce) {
    .chrono.pret :global(.ch-courbe) { stroke-dasharray: none; stroke-dashoffset: 0; }
    .chrono.pret :global(.ch-rep),
    .chrono.pret :global(.hiver),
    .chrono.pret figure { opacity: 1; animation: none; }
  }
</style>
