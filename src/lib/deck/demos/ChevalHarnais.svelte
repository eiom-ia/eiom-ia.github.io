<script>
  import { brancherTemps } from '../temps.js';

  const ETAPES = ['libre', 'harnache', 'guide'];
  let js = $state(false);
  let e = $state(ETAPES.length);
  let hote = $state(null);
  const phase = $derived(js && e > 0 ? ETAPES[e - 1] : 'guide');

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: ETAPES.length, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="cheval" bind:this={hote}>
  <svg viewBox="0 0 1000 420" role="img" aria-label="Un modèle représenté par un cheval est équipé d'un harnais puis guidé vers un objectif.">
    <path class="errance" class:off={phase === 'guide'} d="M70 338 C210 180 300 390 430 190 S690 350 910 96" />
    <path class="route" class:on={phase === 'guide'} d="M70 338 C330 338 650 218 900 96" />
    <g class="panneaux">
      <text x="68" y="382">VOTRE DEMANDE</text>
      <rect x="842" y="38" width="130" height="82" />
      <text class="objectif" x="907" y="71" text-anchor="middle">VOTRE</text>
      <text class="objectif" x="907" y="96" text-anchor="middle">OBJECTIF</text>
    </g>

    <g class="animal" class:guide={phase === 'guide'}>
      <ellipse class="corps" cx="498" cy="236" rx="150" ry="72" />
      <path class="cou" d="M596 212 C636 155 666 142 712 160 L690 226 L610 258 Z" />
      <ellipse class="tete" cx="724" cy="157" rx="57" ry="39" />
      <path class="oreille" d="M690 129 L674 83 L713 123 Z" />
      <path class="oreille" d="M728 121 L744 78 L756 132 Z" />
      <circle class="oeil" cx="742" cy="150" r="5" />
      <path class="jambe" d="M414 282 L390 366 M468 296 L470 368 M558 294 L580 366 M614 276 L646 350" />
      <path class="queue" d="M356 215 C300 190 295 137 330 126 C308 174 357 170 382 191" />
      <text class="llm" x="500" y="247" text-anchor="middle">LLM</text>

      <g class="harnais" class:vu={phase === 'harnache' || phase === 'guide'}>
        <path d="M401 194 C458 225 536 228 622 193" />
        <path d="M455 173 L450 300 M548 166 L560 300" />
        <path d="M687 134 C722 166 736 182 690 194" />
        <circle cx="684" cy="177" r="8" />
      </g>
      <path class="renes" class:vu={phase === 'guide'} d="M685 177 C567 120 392 116 236 245" />
    </g>

    <g class="vous" class:vu={phase === 'guide'}>
      <circle cx="206" cy="256" r="24" />
      <path d="M206 280 L206 350 M206 306 L258 268 M206 306 L164 338 M206 350 L170 397 M206 350 L244 397" />
    </g>
  </svg>
  <div class="legende">
    {#if phase === 'libre'}<strong>Un modèle puissant peut partir dans toutes les directions.</strong>{/if}
    {#if phase === 'harnache'}<strong>Le harnais lui donne des prises, des limites et des outils.</strong>{/if}
    {#if phase === 'guide'}<strong>Vous ne portez pas la charge. Vous gardez la direction.</strong>{/if}
  </div>
</div>

<style>
  .cheval { width: 100%; }
  svg { display: block; width: 100%; height: auto; }
  :global(.cheval text) { font-family: var(--dk-mono); }
  :global(.cheval .errance), :global(.cheval .route) { fill: none; stroke-width: 8; stroke-dasharray: 16 14; }
  :global(.cheval .errance) { stroke: var(--dk-gris-2); opacity: 1; transition: opacity 0.3s; }
  :global(.cheval .errance.off) { opacity: 0.16; }
  :global(.cheval .route) { stroke: var(--dk-accent); opacity: 0; transition: opacity 0.3s; }
  :global(.cheval .route.on) { opacity: 1; animation: route 0.8s linear infinite; }
  :global(.cheval .panneaux rect) { fill: var(--dk-accent); }
  :global(.cheval .panneaux text) { fill: var(--dk-gris); font-size: 17px; letter-spacing: 0.1em; }
  :global(.cheval .panneaux .objectif) { fill: var(--dk-fond); font-size: 16px; font-weight: 600; }
  :global(.cheval .corps), :global(.cheval .cou), :global(.cheval .tete), :global(.cheval .oreille) { fill: var(--dk-encre); }
  :global(.cheval .oeil) { fill: var(--dk-fond); }
  :global(.cheval .jambe), :global(.cheval .queue) { fill: none; stroke: var(--dk-encre); stroke-width: 22; stroke-linecap: square; }
  :global(.cheval .llm) { fill: var(--dk-fond); font-size: 34px; font-weight: 600; letter-spacing: 0.12em; }
  :global(.cheval .harnais), :global(.cheval .renes) { fill: none; stroke: var(--dk-accent); stroke-width: 10; opacity: 0; transition: opacity 0.3s; }
  :global(.cheval .harnais circle) { fill: var(--dk-accent); stroke: none; }
  :global(.cheval .harnais.vu), :global(.cheval .renes.vu) { opacity: 1; }
  :global(.cheval .animal.guide) { animation: galop 0.5s ease-in-out infinite alternate; transform-origin: 500px 260px; }
  :global(.cheval .vous) { fill: var(--dk-fond); stroke: var(--dk-encre); stroke-width: 8; opacity: 0; transition: opacity 0.3s; }
  :global(.cheval .vous.vu) { opacity: 1; }
  .legende { min-height: 1.5em; border-left: 0.35em solid var(--dk-accent); padding-left: 0.8em; font-size: 1.05em; }
  @keyframes galop { to { transform: translateY(-7px) rotate(-1deg); } }
  @keyframes route { to { stroke-dashoffset: -30; } }
  @media (prefers-reduced-motion: reduce) {
    :global(.cheval .animal.guide), :global(.cheval .route.on) { animation: none; }
  }
</style>
