<script>
  import Logo from '../Logo.svelte';
  import Picto from '../Picto.svelte';
</script>

<div class="mf">
  <div class="services">
    <div><Logo nom="google" alt="Google" taille="2.4em" /><strong>AGENDA</strong><span>quand courir ?</span></div>
    <div><Logo nom="strava" alt="Strava" taille="2.4em" /><strong>STRAVA</strong><span>qu'ai-je couru ?</span></div>
    <div><Picto nom="page" taille="2.4em" /><strong>SKILL /COACH</strong><span>comment m'entraîner ?</span></div>
  </div>
  <div class="vers-agent">données et méthode<br />↓</div>
  <div class="agent"><Logo nom="anthropic" alt="Anthropic" taille="3em" /><strong>CLAUDE CODE</strong><span>compose la séance</span></div>
  <div class="permission"><span>1</span><strong>VOUS DEMANDE L'ACCORD</strong><small>avant toute écriture</small></div>
  <div class="api"><span>2</span><strong><Logo nom="coros" alt="Coros" taille="1.15em" /> OUTIL COROS</strong><small>traduit la séance vers l'API privée reconstituée</small></div>
  <!-- Le trait vit dans sa propre colonne: tant qu'il etait un SVG etire
       par-dessus toute la grille, il barrait le texte de l'etape 1. -->
  <div class="fleche">
    <svg viewBox="0 0 120 24" aria-hidden="true">
      <path class="flux" d="M2 12 H104" />
      <path class="pointe" d="M100 4 L116 12 L100 20" />
    </svg>
    <span>la séance part</span>
  </div>
  <div class="arrivee">
    <div class="calendrier">
      <div class="cal-tete"><Logo nom="coros" alt="Coros" taille="1.05em" /><span>CALENDRIER COROS</span></div>
      <div class="cal-grille">
        {#each ['L', 'M', 'M', 'J', 'V', 'S', 'D'] as j}<i class="jour">{j}</i>{/each}
        {#each Array(7) as _, k}
          <i class="case" class:seance={k === 2}>{k === 2 ? '10×400' : ''}</i>
        {/each}
      </div>
      <small>la séance est déposée au bon jour</small>
    </div>
    <b class="vers-bas">↓</b>
  <div class="montre"><div class="cadran"><span>10 × 400 m</span><strong>4:05/km</strong></div><b></b><b></b><p>LA MONTRE SE SYNCHRONISE</p></div>
  </div>
</div>

<style>
  .mf { width: 100%; display: grid; grid-template-columns: 1.15fr 1fr auto 0.85fr; grid-template-rows: auto auto auto auto; gap: 0.55em 0.7em; align-items: center; }
  .services { grid-column: 1 / 5; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65em; }
  .services div { border: 2px solid var(--dk-encre); padding: 0.5em; display: grid; grid-template-columns: auto 1fr; gap: 0.05em 0.5em; }
  .services :global(.logo), .services :global(.picto) { grid-row: span 2; }.services strong { font-size: 0.65em; }.services span { color: var(--dk-gris); font-size: 0.55em; }
  .vers-agent { grid-column: 1 / 5; text-align: center; color: var(--dk-accent); font-size: 0.58em; }
  .agent { grid-column: 1; grid-row: 3 / 5; border: 4px solid var(--dk-accent); padding: 0.75em; display: grid; grid-template-columns: auto 1fr; gap: 0.1em 0.6em; }.agent :global(.logo) { grid-row: span 2; }.agent strong { font-size: 0.72em; }.agent span { color: var(--dk-gris); font-size: 0.57em; }
  .permission { grid-column: 2; grid-row: 3; }
  .api { grid-column: 2; grid-row: 4; }
  .api strong :global(.logo) { vertical-align: -0.25em; margin-right: 0.15em; }
  .permission, .api { border-left: 0.35em solid var(--dk-accent); padding: 0.5em; display: grid; grid-template-columns: 1.4em 1fr; gap: 0 0.4em; }.permission span, .api span { grid-row: span 2; color: var(--dk-accent); font-size: 1.2em; font-weight: 600; }.permission strong, .api strong { font-size: 0.58em; }.permission small, .api small { color: var(--dk-gris); font-size: 0.5em; }
  .fleche { grid-column: 3; grid-row: 3 / 5; display: flex; flex-direction: column; align-items: center; gap: 0.3em; }
  .fleche svg { width: 5.5em; height: 1.2em; overflow: visible; }
  .fleche path { fill: none; stroke: var(--dk-accent); stroke-width: 5; }
  .fleche .flux { stroke-dasharray: 10 8; animation: flux 0.7s linear infinite; }
  .fleche span { color: var(--dk-gris); font-size: 0.48em; letter-spacing: 0.08em; }
  .arrivee { grid-column: 4; grid-row: 3 / 5; display: flex; flex-direction: column; align-items: center; gap: 0.25em; }
  .calendrier { width: 100%; border: 3px solid var(--dk-encre); padding: 0.4em; }
  .cal-tete { display: flex; align-items: center; gap: 0.35em; margin-bottom: 0.35em; }
  .cal-tete span { font-size: 0.42em; letter-spacing: 0.08em; }
  .cal-grille { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.12em; }
  .jour { font-style: normal; text-align: center; color: var(--dk-gris); font-size: 0.34em; }
  .case { font-style: normal; min-height: 1.5em; border: 1px solid var(--dk-filet); display: grid; place-items: center; font-size: 0.3em; }
  .case.seance { border: 2px solid var(--dk-accent); background: var(--dk-accent); color: white; font-weight: 600; }
  .calendrier small { display: block; margin-top: 0.3em; color: var(--dk-gris); font-size: 0.38em; }
  .vers-bas { color: var(--dk-accent); font-size: 0.8em; line-height: 1; }
  .montre { justify-self: center; display: flex; flex-direction: column; align-items: center; }
  .cadran { width: 7em; height: 7em; border: 0.6em solid var(--dk-encre); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--dk-accent); color: white; }.cadran span { font-size: 0.52em; }.cadran strong { font-size: 0.8em; }.montre b { display: block; width: 2.5em; height: 0.6em; background: var(--dk-encre); }.montre p { margin-top: 0.4em; font-size: 0.48em; text-align: center; }
  @keyframes flux { to { stroke-dashoffset: -18; } }
  @media (prefers-reduced-motion: reduce) { .fleche .flux { animation: none; } }
</style>
