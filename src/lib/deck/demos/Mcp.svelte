<script>
  /**
   * Ce qu'un serveur MCP change, montré plutôt que raconté.
   *
   * Le schéma importé disait « appel d'API classique » puis « accès par MCP »
   * en deux rangées figées. Les deux choses qui comptent — un protocole commun
   * plutôt qu'une intégration sur mesure, et la clé qui ne quitte jamais le
   * serveur — n'y étaient pas visibles.
   *
   * Ici trois acteurs sur une ligne, et un temps par étape. La clé reste dans
   * sa boîte du début à la fin: c'est tout l'argument.
   */
  import { brancherTemps } from '../temps.js';

  const TEMPS = [
    { t: 'Le harnais demande, dans un langage commun à tous les serveurs.', p: 'demande' },
    { t: "Le serveur appelle le service — avec sa clé à lui.", p: 'appel' },
    { t: 'La réponse revient. Votre clé n’a jamais traversé.', p: 'reponse' }
  ];

  let js = $state(false);
  let e = $state(TEMPS.length);
  let hote = $state(null);

  const phase = $derived(e > 0 && e <= TEMPS.length ? TEMPS[e - 1].p : '');
  const legende = $derived(e > 0 && e <= TEMPS.length ? TEMPS[e - 1].t : '');

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, {
      total: TEMPS.length,
      lire: () => e,
      ecrire: (v) => (e = v)
    });
  });
</script>

<div class="mcp" bind:this={hote}>
  <svg
    viewBox="0 0 1000 340"
    role="img"
    aria-label="Le harnais parle au serveur MCP dans un langage commun; le serveur appelle le service avec sa propre clé, qui ne quitte jamais le serveur."
  >
    <!-- le harnais -->
    <rect class="b" x="20" y="90" width="240" height="150" />
    <text class="bn" x="140" y="150" text-anchor="middle">LE HARNAIS</text>
    <text class="bd" x="140" y="180" text-anchor="middle">Claude Code,</text>
    <text class="bd" x="140" y="204" text-anchor="middle">OpenCode, Cursor…</text>

    <!-- le serveur MCP -->
    <rect class="b fort" class:actif={phase === 'appel'} x="380" y="60" width="240" height="210" />
    <text class="bn" x="500" y="104" text-anchor="middle">SERVEUR MCP</text>
    <text class="bd" x="500" y="132" text-anchor="middle">il déclare ses outils</text>
    <!-- la clé, qui ne bouge pas -->
    <g class="cle" class:garde={phase === 'appel' || phase === 'reponse'}>
      <rect class="cle-b" x="410" y="160" width="180" height="44" />
      <text class="cle-t" x="500" y="188" text-anchor="middle">la clé d'API</text>
      <text class="cle-n" x="500" y="232" text-anchor="middle">elle reste ici</text>
    </g>

    <!-- le service -->
    <rect class="b" x="740" y="90" width="240" height="150" />
    <text class="bn" x="860" y="150" text-anchor="middle">LE SERVICE</text>
    <text class="bd" x="860" y="180" text-anchor="middle">Zotero, GitHub,</text>
    <text class="bd" x="860" y="204" text-anchor="middle">Drive…</text>

    <!-- couloir gauche -->
    <path class="fx" d="M270 140 L364 140" />
    <path class="fx" d="M355 133 L366 140 L355 147" />
    <path class="fx" d="M370 200 L276 200" />
    <path class="fx" d="M285 193 L274 200 L285 207" />
    <text class="q" class:on={phase === 'demande'} x="317" y="124" text-anchor="middle">outil</text>
    <text class="q" class:on={phase === 'reponse'} x="317" y="224" text-anchor="middle">résultat</text>

    <!-- couloir droit -->
    <path class="fx" d="M630 140 L724 140" />
    <path class="fx" d="M715 133 L726 140 L715 147" />
    <path class="fx" d="M730 200 L636 200" />
    <path class="fx" d="M645 193 L634 200 L645 207" />
    <text class="q" class:on={phase === 'appel'} x="677" y="124" text-anchor="middle">API</text>
    <text class="q" class:on={phase === 'reponse'} x="677" y="224" text-anchor="middle">données</text>

    <!-- les paquets -->
    {#if phase === 'demande'}<rect class="paq g-va" x="270" y="133" width="14" height="14" />{/if}
    {#if phase === 'appel'}<rect class="paq d-va" x="630" y="133" width="14" height="14" />{/if}
    {#if phase === 'reponse'}
      <rect class="paq d-vient" x="716" y="193" width="14" height="14" />
      <rect class="paq g-vient" x="356" y="193" width="14" height="14" />
    {/if}

    <text class="pied" x="500" y="316" text-anchor="middle">
      un protocole : l'outil s'écrit une fois, tout harnais conforme s'y branche
    </text>
  </svg>

  <p class="mcp-leg" class:vide={!legende}>{legende || ' '}</p>
</div>

<style>
  .mcp {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  .mcp svg {
    width: 100%;
    height: auto;
    display: block;
  }
  :global(.mcp text) {
    font-family: var(--dk-mono);
  }
  :global(.mcp .b) {
    fill: none;
    stroke: var(--dk-encre);
    stroke-width: 2.5;
  }
  :global(.mcp .b.fort) {
    stroke-width: 3.5;
    transition: stroke 0.25s ease-out;
  }
  :global(.mcp .b.fort.actif) {
    stroke: var(--dk-accent);
  }
  :global(.mcp .bn) {
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 0.1em;
    fill: var(--dk-encre);
  }
  :global(.mcp .bd) {
    font-size: 16px;
    fill: var(--dk-gris);
  }
  :global(.mcp .cle-b) {
    fill: var(--dk-fond-2);
    stroke: var(--dk-gris-2);
    stroke-width: 2;
    transition: fill 0.25s ease-out, stroke 0.25s ease-out;
  }
  :global(.mcp .cle-t) {
    font-size: 17px;
    fill: var(--dk-gris);
    transition: fill 0.25s ease-out;
  }
  :global(.mcp .cle-n) {
    font-size: 15px;
    letter-spacing: 0.08em;
    fill: transparent;
    transition: fill 0.25s ease-out;
  }
  :global(.mcp .cle.garde .cle-b) {
    fill: var(--dk-fond);
    stroke: var(--dk-accent);
  }
  :global(.mcp .cle.garde .cle-t) {
    fill: var(--dk-accent);
  }
  :global(.mcp .cle.garde .cle-n) {
    fill: var(--dk-accent);
  }
  :global(.mcp .fx) {
    stroke: var(--dk-filet);
    stroke-width: 2.5;
    fill: none;
  }
  :global(.mcp .q) {
    font-size: 16px;
    fill: var(--dk-gris-2);
    transition: fill 0.25s ease-out;
  }
  :global(.mcp .q.on) {
    fill: var(--dk-accent);
    font-weight: 600;
  }
  :global(.mcp .pied) {
    font-size: 16px;
    fill: var(--dk-gris);
  }
  :global(.mcp .paq) {
    fill: var(--dk-accent);
    transform-box: view-box;
  }
  :global(.mcp .g-va) {
    animation: mcp-g-va 1.4s ease-in-out infinite;
  }
  :global(.mcp .d-va) {
    animation: mcp-d-va 1.4s ease-in-out infinite;
  }
  :global(.mcp .g-vient) {
    animation: mcp-g-vient 1.4s ease-in-out infinite;
  }
  :global(.mcp .d-vient) {
    animation: mcp-d-vient 1.4s ease-in-out infinite;
  }
  @keyframes mcp-g-va {
    0% { transform: translateX(0); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { transform: translateX(86px); opacity: 0; }
  }
  @keyframes mcp-d-va {
    0% { transform: translateX(0); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { transform: translateX(86px); opacity: 0; }
  }
  @keyframes mcp-g-vient {
    0% { transform: translateX(0); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { transform: translateX(-86px); opacity: 0; }
  }
  @keyframes mcp-d-vient {
    0% { transform: translateX(0); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { transform: translateX(-86px); opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    :global(.mcp .paq) { animation: none; opacity: 1; }
  }
  .mcp-leg {
    margin: 0;
    min-height: 1.5em;
    font-size: 0.94em;
    color: var(--dk-encre);
  }
  .mcp-leg.vide {
    color: transparent;
  }
</style>
