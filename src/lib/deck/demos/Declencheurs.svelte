<script>
  /**
   * Ce qui met un agent en marche quand personne n'est devant l'écran.
   *
   * Trois déclencheurs, un par clic, chacun envoyant son impulsion vers le
   * même agent. La leçon suit à la diapositive suivante: plus personne ne
   * rattrape l'erreur au vol, donc les garde-fous cessent d'être un confort.
   */
  import { brancherTemps } from '../temps.js';

  const D = [
    { n: 'LE TEMPS', l1: 'tous les lundis', l2: 'à 7 h, sans vous' },
    { n: 'UN ÉVÉNEMENT', l1: 'un fichier déposé,', l2: 'un dépôt mis à jour' },
    { n: 'UN AUTRE AGENT', l1: 'le premier finit,', l2: 'le second démarre' }
  ];

  let js = $state(false);
  let e = $state(D.length);
  let hote = $state(null);

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: D.length, lire: () => e, ecrire: (v) => (e = v) });
  });

  // Ordonnée du centre de chaque déclencheur, et de l'agent.
  const Y = [58, 150, 242];
  const YA = 150;
</script>

<div class="dcl" bind:this={hote}>
  <svg viewBox="0 0 1000 300" role="img" aria-label="Le temps, un événement ou un autre agent peuvent démarrer un agent sans intervention humaine.">
    {#each D as d, i}
      <g class="src" class:on={!js || i < e}>
        <rect class="bx" x="20" y={Y[i] - 42} width="300" height="84" />
        <text class="bn" x="42" y={Y[i] - 14}>{d.n}</text>
        <text class="bd" x="42" y={Y[i] + 10}>{d.l1}</text>
        <text class="bd" x="42" y={Y[i] + 32}>{d.l2}</text>
      </g>
      <!-- le fil vers l'agent -->
      <path class="fil" class:on={!js || i < e} d="M320 {Y[i]} L470 {Y[i]} L470 {YA} L648 {YA}" />
      {#if js && i === e - 1}
        <circle class="pulse" r="8" cx="320" cy={Y[i]}>
          <animateMotion
            dur="1.1s"
            repeatCount="indefinite"
            path="M0 0 L150 0 L150 {YA - Y[i]} L328 {YA - Y[i]}"
          />
        </circle>
      {/if}
    {/each}

    <rect class="agent" class:actif={js && e > 0} x="650" y="100" width="330" height="100" />
    <text class="an" x="815" y="142" text-anchor="middle">L'AGENT</text>
    <text class="ad" x="815" y="172" text-anchor="middle">personne devant l'écran</text>
  </svg>
</div>

<style>
  .dcl {
    width: 100%;
  }
  .dcl svg {
    width: 100%;
    height: auto;
    display: block;
  }
  :global(.dcl text) {
    font-family: var(--dk-mono);
  }
  :global(.dcl .src) {
    opacity: 0.28;
    transition: opacity 0.3s ease-out;
  }
  :global(.dcl .src.on) {
    opacity: 1;
  }
  :global(.dcl .bx) {
    fill: none;
    stroke: var(--dk-encre);
    stroke-width: 2.5;
  }
  :global(.dcl .bn) {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.12em;
    fill: var(--dk-accent);
  }
  :global(.dcl .bd) {
    font-size: 16px;
    fill: var(--dk-gris);
  }
  :global(.dcl .fil) {
    fill: none;
    stroke: var(--dk-filet);
    stroke-width: 2.5;
    transition: stroke 0.3s ease-out;
  }
  :global(.dcl .fil.on) {
    stroke: var(--dk-gris-2);
  }
  :global(.dcl .pulse) {
    fill: var(--dk-accent);
  }
  :global(.dcl .agent) {
    fill: none;
    stroke: var(--dk-encre);
    stroke-width: 3;
    transition: stroke 0.3s ease-out, stroke-width 0.3s ease-out;
  }
  :global(.dcl .agent.actif) {
    stroke: var(--dk-accent);
    stroke-width: 4.5;
  }
  :global(.dcl .an) {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.1em;
    fill: var(--dk-encre);
  }
  :global(.dcl .ad) {
    font-size: 16px;
    fill: var(--dk-gris);
  }
  @media (prefers-reduced-motion: reduce) {
    :global(.dcl .pulse) {
      display: none;
    }
  }
</style>
