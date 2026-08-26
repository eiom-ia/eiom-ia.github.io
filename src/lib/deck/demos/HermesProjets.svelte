<script>
  const P = [
    { n: 'UN BUREAU LINUX PILOTÉ', d: "contrôle d'applications Wayland et GNOME par MCP", src: 'agent-sh/computer-use-linux', k: 'écran' },
    { n: 'UN AGENT DANS WECHAT', d: 'un pont communautaire HermesClaw pour la messagerie', src: 'AaronWong1999/hermesclaw', k: 'message' },
    { n: 'UN ROVER SUR MARS', d: 'une simulation de rover alimentée par Hermes', src: 'Snehal707/Hermes-mars-rover', k: 'mars' },
    { n: 'UN AGENT DANS LA POCHE', d: 'Hermes installé sur Android avec Termux', src: 'leecoin06-commits/hermes-agent-android', k: 'mobile' }
  ];
</script>

<div class="projets-h">
  {#each P as p, i}
    <article style="--i: {i}">
      <div class="dessin {p.k}"><span></span><span></span><span></span></div>
      <strong>{p.n}</strong><p>{p.d}</p><small>github.com/{p.src}</small>
    </article>
  {/each}
  <p class="note">Ce ne sont pas des promesses produit: ce sont quatre dépôts publics construits par la communauté Hermes.</p>
</div>

<style>
  .projets-h { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75em; width: 100%; }
  article { border: 2px solid var(--dk-encre); padding: 0.7em; animation: monte 0.35s both; animation-delay: calc(var(--i) * 80ms); }
  article strong { display: block; color: var(--dk-accent); font-size: 0.65em; line-height: 1.2; }
  article p { margin-top: 0.4em; font-size: 0.6em; line-height: 1.3; }
  article small { display: block; margin-top: 0.55em; color: var(--dk-gris); font-size: 0.43em; overflow-wrap: anywhere; }
  .dessin { height: 4.5em; margin-bottom: 0.6em; position: relative; border-bottom: 3px solid var(--dk-encre); }
  .dessin span { position: absolute; display: block; border: 3px solid var(--dk-accent); }
  .écran span:first-child { inset: 0.4em 0.2em 0.8em; }.écran span:nth-child(2) { width: 1.8em; bottom: 0.25em; left: calc(50% - 0.9em); }
  .message span:first-child { inset: 0.5em 0.2em 1.1em; border-radius: 50%; }.message span:nth-child(2) { width: 1em; height: 1em; bottom: 0.65em; right: 0.5em; transform: rotate(45deg); border-width: 0 3px 3px 0; }
  .mars span:first-child { width: 2.6em; height: 1.5em; left: calc(50% - 1.3em); bottom: 1em; }.mars span:nth-child(2), .mars span:nth-child(3) { width: 0.8em; height: 0.8em; border-radius: 50%; bottom: 0.35em; }.mars span:nth-child(2) { left: 0.5em; }.mars span:nth-child(3) { right: 0.5em; }
  .mobile span:first-child { inset: 0.2em 1.1em 0.35em; border-radius: 0.35em; }.mobile span:nth-child(2) { width: 0.35em; height: 0.35em; border-radius: 50%; bottom: 0.55em; left: calc(50% - 0.18em); }
  .note { grid-column: 1 / -1; border-top: 2px solid var(--dk-encre); padding-top: 0.5em; font-size: 0.68em; }
  @keyframes monte { from { opacity: 0; transform: translateY(0.6em); } }
  @media (prefers-reduced-motion: reduce) { article { animation: none; } }
</style>
