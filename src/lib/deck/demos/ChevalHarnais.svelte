<script>
  /**
   * Le modele, puis l'agent, en trois temps.
   *
   * 1. Le cheval rue: puissant, libre, et il ne va nulle part.
   * 2. On le harnache et on l'attelle a une charrette.
   * 3. L'attelage avance. C'est seulement la qu'on peut parler d'agent.
   */
  import { brancherTemps } from '../temps.js';

  // e va de 0 a 2, un etat par temps: le repos est le premier, pas le dernier.
  const ETAPES = ['rodeo', 'harnache', 'travail'];
  let e = $state(0);
  let hote = $state(null);
  const phase = $derived(ETAPES[Math.min(e, ETAPES.length - 1)]);
  const LEG = {
    rodeo: 'Seul, il ne va nulle part.',
    harnache: 'Le harnais, puis la charrette.',
    travail: "L'attelage avance : voilà l'agent."
  };

  $effect(() => {
    if (!hote) return;
    e = 0;
    return brancherTemps(hote, { total: ETAPES.length - 1, lire: () => e, ecrire: (v) => (e = v) });
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
        <path class="queue" d="M348 200 C326 208 312 232 308 262 C305 288 306 310 310 328" />
        <path class="jambe arriere" d="M368 268 L352 350" />
        <path class="jambe arriere" d="M404 274 L414 350" />
        <!-- Une seule silhouette continue: croupe, creux du dos, garrot,
             encolure, tete. Proportions d'un cheval: le tronc fait un peu
             plus de deux fois sa hauteur, la tete un tiers du tronc, et
             l'encolure la longueur de la tete. Trop longue, elle donnait
             un lama. -->
        <path class="corps" d="M345 202
          C352 184 368 174 392 176
          C432 180 470 186 500 186
          C522 186 540 184 552 178
          C586 160 618 132 648 108
          C662 100 676 100 684 112
          C702 130 722 144 738 154
          C748 160 752 172 744 180
          C736 187 720 186 706 182
          C692 178 680 174 666 174
          C642 182 618 198 600 218
          C584 232 574 244 566 256
          C558 268 546 274 528 277
          C486 284 432 284 398 276
          C372 270 356 256 348 236
          C344 224 343 212 345 202 Z" />
        <path class="criniere" d="M656 108 C628 125 604 146 582 172 C570 186 560 200 554 212" />
        <path class="toupet" d="M666 102 C676 108 682 114 686 122" />
        <path class="oreille" d="M648 110 L654 78 L668 104 Z" />
        <path class="oreille" d="M668 104 L682 76 L690 108 Z" />
        <circle class="oeil" cx="676" cy="131" r="5.5" />
        <path class="jambe avant" d="M534 272 L528 350" />
        <path class="jambe avant" d="M560 266 L574 350" />
        <text class="llm" x="445" y="242" text-anchor="middle">LLM</text>

        <!-- le harnais -->
        <g class="harnais" class:vu={phase !== 'rodeo'}>
          <ellipse class="collier" cx="572" cy="222" rx="15" ry="42" transform="rotate(-32 572 222)" />
          <path class="sangle" d="M498 186 C498 230 498 260 499 282" />
          <path class="sangle" d="M540 183 C540 226 540 254 541 277" />
          <path class="dos" d="M498 186 L540 183" />
          <path class="trait" d="M556 240 L300 270" />
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
  .corps, .oreille { fill: var(--dk-encre); }
  .queue, .criniere, .toupet { fill: none; stroke: var(--dk-encre); stroke-linecap: round; }
  .queue { stroke-width: 17; }
  .criniere { stroke-width: 21; }
  .toupet { stroke-width: 11; }
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
    35% { transform: rotate(-12deg) translateY(-11px); }
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
