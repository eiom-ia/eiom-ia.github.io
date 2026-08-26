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
  <div class="api"><span>2</span><strong>OUTIL COROS</strong><small>traduit la séance vers l'API privée reconstituée</small></div>
  <div class="montre"><div class="cadran"><span>10 × 400 m</span><strong>4:05/km</strong></div><b></b><b></b><p>LA MONTRE REÇOIT LA SÉANCE</p></div>
  <svg viewBox="0 0 1000 400" aria-hidden="true"><path d="M500 190 L500 250 L765 250" /><path d="M760 242 L776 250 L760 258" /></svg>
</div>

<style>
  .mf { width: 100%; position: relative; display: grid; grid-template-columns: 1.2fr 0.8fr 1fr; grid-template-rows: auto auto auto; gap: 0.55em 0.8em; align-items: center; }
  .services { grid-column: 1 / 4; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65em; }
  .services div { border: 2px solid var(--dk-encre); padding: 0.5em; display: grid; grid-template-columns: auto 1fr; gap: 0.05em 0.5em; }
  .services :global(.logo), .services :global(.picto) { grid-row: span 2; }.services strong { font-size: 0.65em; }.services span { color: var(--dk-gris); font-size: 0.55em; }
  .vers-agent { grid-column: 1 / 4; text-align: center; color: var(--dk-accent); font-size: 0.58em; }
  .agent { grid-column: 1; border: 4px solid var(--dk-accent); padding: 0.75em; display: grid; grid-template-columns: auto 1fr; gap: 0.1em 0.6em; }.agent :global(.logo) { grid-row: span 2; }.agent strong { font-size: 0.72em; }.agent span { color: var(--dk-gris); font-size: 0.57em; }
  .permission, .api { border-left: 0.35em solid var(--dk-accent); padding: 0.5em; display: grid; grid-template-columns: 1.4em 1fr; gap: 0 0.4em; }.permission span, .api span { grid-row: span 2; color: var(--dk-accent); font-size: 1.2em; font-weight: 600; }.permission strong, .api strong { font-size: 0.58em; }.permission small, .api small { color: var(--dk-gris); font-size: 0.5em; }
  .montre { grid-column: 3; grid-row: 3 / 5; justify-self: center; display: flex; flex-direction: column; align-items: center; }
  .cadran { width: 7em; height: 7em; border: 0.6em solid var(--dk-encre); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--dk-accent); color: white; }.cadran span { font-size: 0.52em; }.cadran strong { font-size: 0.8em; }.montre b { display: block; width: 2.5em; height: 0.6em; background: var(--dk-encre); }.montre p { margin-top: 0.4em; font-size: 0.48em; text-align: center; }
  svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; } svg path { fill: none; stroke: var(--dk-accent); stroke-width: 6; stroke-dasharray: 10 8; animation: flux 0.7s linear infinite; }
  @keyframes flux { to { stroke-dashoffset: -18; } }
  @media (prefers-reduced-motion: reduce) { svg path { animation: none; } }
</style>
