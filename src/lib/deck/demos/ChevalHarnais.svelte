<script>
  /**
   * Le modele, puis l'agent, en trois temps.
   *
   * 1. Le cheval rue: puissant, libre, et il ne va nulle part.
   * 2. On le harnache et on l'attelle a une charrette.
   * 3. L'attelage avance. C'est seulement la qu'on peut parler d'agent.
   */
  import { brancherTemps } from '../temps.js';

  const ETAPES = ['rodeo', 'harnache', 'travail'];
  let js = $state(false);
  let e = $state(ETAPES.length);
  let hote = $state(null);
  const phase = $derived(js && e > 0 ? ETAPES[e - 1] : 'travail');
  const LEG = {
    rodeo: 'Seul, il ne va nulle part.',
    harnache: 'Le harnais, puis la charrette.',
    travail: "L'attelage avance : voilà l'agent."
  };

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: ETAPES.length, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="cheval" bind:this={hote}>
  <svg viewBox="0 0 1000 400" role="img"
    aria-label="Un cheval qui rue, puis qu'on harnache à une charrette, puis l'attelage qui avance.">
    <line class="sol" x1="40" y1="352" x2="960" y2="352" />

    <g class="attelage" class:avance={phase === 'travail'}>
      <!-- la charrette -->
      <g class="charrette" class:vu={phase !== 'rodeo'}>
        <path class="caisse" d="M96 250 L300 250 L288 306 L108 306 Z" />
        <line class="ridelle" x1="118" y1="264" x2="282" y2="264" />
        <g class="roue" style="--cx: 150px; --cy: 320px">
          <circle cx="150" cy="320" r="30" />
          <path d="M150 292 L150 348 M122 320 L178 320 M130 300 L170 340 M170 300 L130 340" />
        </g>
        <g class="roue" style="--cx: 258px; --cy: 320px">
          <circle cx="258" cy="320" r="30" />
          <path d="M258 292 L258 348 M230 320 L286 320 M238 300 L278 340 M278 300 L238 340" />
        </g>
        <path class="brancard" d="M300 272 L556 246" />
      </g>

      <!-- le cheval -->
      <g class="animal" class:rue={phase === 'rodeo'}>
        <path class="queue" d="M336 214 C286 196 268 150 300 132 C292 176 330 182 356 198 Z" />
        <path class="jambe arriere" d="M372 268 L352 350" />
        <path class="jambe arriere" d="M410 272 L418 350" />
        <path class="corps" d="M336 246
          C344 198 372 182 432 178
          C486 175 524 172 556 166
          C572 142 596 122 626 110
          C648 101 668 97 684 93
          C696 88 714 89 724 99
          C740 114 750 132 752 148
          C754 160 749 170 740 174
          C726 180 710 178 702 170
          C692 160 682 152 664 150
          C636 148 612 158 592 178
          C572 198 562 216 552 234
          C544 252 534 264 514 270
          C464 282 394 282 356 270
          C342 265 335 258 336 246 Z" />
        <path class="criniere" d="M600 168 C616 138 648 112 690 98 C664 122 640 152 626 182 Z" />
        <path class="oreille" d="M700 92 L692 62 L716 86 Z" />
        <path class="oreille" d="M722 92 L732 64 L740 96 Z" />
        <circle class="oeil" cx="722" cy="126" r="5.5" />
        <path class="jambe avant" d="M528 266 L520 350" />
        <path class="jambe avant" d="M556 258 L572 350" />
        <text class="llm" x="412" y="248" text-anchor="middle">LLM</text>

        <!-- le harnais -->
        <g class="harnais" class:vu={phase !== 'rodeo'}>
          <ellipse class="collier" cx="568" cy="202" rx="15" ry="41" transform="rotate(-27 568 202)" />
          <path class="sangle" d="M498 176 C498 220 498 248 500 268" />
          <path class="sangle" d="M542 172 C542 216 542 244 544 264" />
          <path class="dos" d="M498 176 L552 170" />
          <path class="trait" d="M552 232 L300 270" />
        </g>
      </g>

      <!-- le conducteur -->
      <g class="humain" class:pose={phase === 'harnache'} class:assis={phase === 'travail'}>
        <circle cx="0" cy="-58" r="13" />
        <path d="M0 -45 L0 -14 M0 -38 L-16 -22 M0 -38 L18 -26 M0 -14 L-13 12 M0 -14 L13 12" />
      </g>
    </g>

    <!-- la poussiere du rodeo -->
    <g class="poussiere" class:vu={phase === 'rodeo'}>
      <path d="M300 344 C316 330 336 332 346 344" />
      <path d="M596 344 C612 328 634 330 646 344" />
    </g>

    <g class="but" class:vu={phase === 'travail'}>
      <rect x="846" y="150" width="118" height="76" />
      <text x="905" y="181" text-anchor="middle">VOTRE</text>
      <text x="905" y="206" text-anchor="middle">OBJECTIF</text>
    </g>
  </svg>

  <p class="legende"><b>{phase === 'rodeo' ? '1' : phase === 'harnache' ? '2' : '3'}</b>{LEG[phase]}</p>
</div>

<style>
  .cheval { width: 100%; display: flex; flex-direction: column; gap: 0.35em; }
  svg { width: 100%; height: auto; overflow: visible; }
  .sol { stroke: var(--dk-filet); stroke-width: 3; }
  .corps, .queue, .criniere, .oreille { fill: var(--dk-encre); }
  .oeil { fill: var(--dk-fond); }
  .jambe { stroke: var(--dk-encre); stroke-width: 15; stroke-linecap: round; fill: none; }
  .llm { fill: var(--dk-fond); font-family: var(--dk-mono); font-size: 34px; font-weight: 600; letter-spacing: 3px; }
  /* harnais */
  .harnais { opacity: 0; transition: opacity 0.45s; }
  .harnais.vu { opacity: 1; }
  .collier { fill: none; stroke: var(--dk-accent); stroke-width: 11; }
  .sangle, .dos, .trait { fill: none; stroke: var(--dk-accent); stroke-width: 8; stroke-linecap: round; }
  .trait { stroke-width: 6; }
  /* charrette */
  .charrette { opacity: 0; transition: opacity 0.45s; }
  .charrette.vu { opacity: 1; }
  .caisse { fill: none; stroke: var(--dk-encre); stroke-width: 8; stroke-linejoin: round; }
  .ridelle { stroke: var(--dk-encre); stroke-width: 4; }
  .roue circle { fill: none; stroke: var(--dk-encre); stroke-width: 7; }
  .roue path { stroke: var(--dk-encre); stroke-width: 4; }
  .brancard { fill: none; stroke: var(--dk-encre); stroke-width: 7; }
  /* humain */
  .humain { transform: translate(792px, 300px); transition: transform 0.5s; }
  .humain circle { fill: var(--dk-encre); }
  .humain path { stroke: var(--dk-encre); stroke-width: 7; stroke-linecap: round; fill: none; }
  .humain.pose { transform: translate(620px, 300px); }
  .humain.assis { transform: translate(196px, 250px); }
  /* le rodeo */
  .animal { transform-origin: 400px 300px; }
  .animal.rue { animation: ruade 0.85s ease-in-out infinite; }
  @keyframes ruade {
    0%, 100% { transform: rotate(0deg) translateY(0); }
    35% { transform: rotate(-17deg) translateY(-16px); }
    70% { transform: rotate(7deg) translateY(4px); }
  }
  .poussiere { opacity: 0; transition: opacity 0.3s; }
  .poussiere.vu { opacity: 1; }
  .poussiere path { fill: none; stroke: var(--dk-gris-2); stroke-width: 5; stroke-linecap: round; }
  /* l'attelage qui avance */
  .attelage { transform: translateX(0); }
  .attelage.avance { animation: avancer 3.2s ease-in-out infinite alternate; }
  @keyframes avancer { from { transform: translateX(0); } to { transform: translateX(96px); } }
  .avance .roue { animation: tourner 1.1s linear infinite; transform-origin: var(--cx) var(--cy); }
  @keyframes tourner { to { transform: rotate(360deg); } }
  /* l'objectif */
  .but { opacity: 0; transition: opacity 0.4s; }
  .but.vu { opacity: 1; }
  .but rect { fill: var(--dk-accent); }
  .but text { fill: white; font-family: var(--dk-mono); font-size: 20px; letter-spacing: 1.5px; }
  .legende { display: flex; align-items: baseline; gap: 0.5em; font-size: 0.8em; }
  .legende b { display: inline-grid; place-items: center; width: 1.5em; height: 1.5em; color: white; background: var(--dk-accent); font-size: 0.75em; }
  @media (prefers-reduced-motion: reduce) {
    .animal.rue, .attelage.avance, .avance .roue { animation: none; }
  }
</style>
