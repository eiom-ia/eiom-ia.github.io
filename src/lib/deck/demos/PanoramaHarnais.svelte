<script>
  import Logo from '../Logo.svelte';

  const H = [
    { logo: 'anthropic', produit: 'Claude Code', entreprise: 'Anthropic', r: '-3deg' },
    { logo: 'openai', produit: 'Codex', entreprise: 'OpenAI', r: '2deg' },
    { logo: 'google', produit: 'Antigravity CLI', entreprise: 'Google', r: '-1deg' },
    { logo: 'kimi', produit: 'Kimi CLI', entreprise: 'Moonshot AI', r: '4deg' },
    { logo: 'opencode', produit: 'OpenCode', entreprise: 'libre', r: '-4deg' },
    { logo: 'pi', produit: 'Pi', entreprise: 'Earendil Works', r: '1deg' },
    { logo: 'charm', produit: 'Crush', entreprise: 'Charm', r: '-2deg' },
    { logo: 'deepseek', produit: 'DeepSeek Harness', entreprise: 'DeepSeek', r: '3deg' },
    { logo: 'openclaw', produit: 'OpenClaw', entreprise: 'libre', r: '-3deg' }
  ];

  // La longue traine, sans logo: c'est le nombre qui fait l'argument.
  const AUSSI = ['Aider', 'Goose (Block)', 'Gemini CLI', 'Copilot CLI', 'Amp (Sourcegraph)', 'Qwen Code', 'Amazon Q', 'Roo Code', 'Warp'];
</script>

<div class="panorama-h">
  <div class="constellation">
    {#each H as h, i}
      <article style="--r: {h.r}; --i: {i}">
        <Logo nom={h.logo} alt={h.entreprise} taille="2.7em" />
        <div><strong>{h.produit}</strong><span>{h.entreprise}</span></div>
      </article>
    {/each}
  </div>
  <div class="aussi"><span class="et-aussi">ET ENCORE</span>{#each AUSSI as a, i}<span class="nom">{a}</span>{#if i < AUSSI.length - 1}<i>·</i>{/if}{/each}</div>
  <p>Chaque entreprise construit sa propre selle. Les commandes, les permissions et les modèles changent; la boucle reste la même.</p>
</div>

<style>
  .panorama-h { width: 100%; position: relative; display: flex; flex-direction: column; gap: 0.7em; }
  .constellation { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.7em 0.6em; }
  article { min-height: 4em; border: 2px solid var(--dk-encre); padding: 0.55em; display: flex; align-items: center; gap: 0.55em; background: var(--dk-fond); transform: rotate(var(--r)); animation: arrive 0.35s both; animation-delay: calc(var(--i) * 55ms); }
  article:nth-child(3n) { margin-top: 0.45em; }
  article div { min-width: 0; display: flex; flex-direction: column; gap: 0.12em; }
  article strong { font-size: 0.69em; line-height: 1.15; }
  article span { color: var(--dk-gris); font-size: 0.55em; }
  .aussi { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.3em 0.45em; }
  .et-aussi { color: var(--dk-accent); font-size: 0.5em; letter-spacing: 0.14em; margin-right: 0.2em; }
  .aussi .nom { color: var(--dk-gris); font-size: 0.56em; }
  .aussi i { color: var(--dk-gris-2); font-style: normal; font-size: 0.56em; }
  p { border-top: 2px solid var(--dk-encre); padding-top: 0.5em; font-size: 0.82em; }
  @keyframes arrive { from { opacity: 0; transform: translateY(0.7em) rotate(0); } }
  @media (max-width: 46rem) { .constellation { grid-template-columns: repeat(2, 1fr); } }
  @media (prefers-reduced-motion: reduce) { article { animation: none; } }
</style>
