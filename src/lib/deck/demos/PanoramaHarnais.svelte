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
    { logo: 'deepseek', produit: 'DeepSeek Harness', entreprise: 'DeepSeek', r: '3deg' }
  ];
</script>

<div class="panorama-h">
  <div class="centre"><strong>1 idée</strong><span>le texte devient action</span></div>
  <div class="constellation">
    {#each H as h, i}
      <article style="--r: {h.r}; --i: {i}">
        <Logo nom={h.logo} alt={h.entreprise} taille="2.7em" />
        <div><strong>{h.produit}</strong><span>{h.entreprise}</span></div>
      </article>
    {/each}
  </div>
  <p>Chaque entreprise construit sa propre selle. Les commandes, les permissions et les modèles changent; la boucle reste la même.</p>
</div>

<style>
  .panorama-h { width: 100%; position: relative; display: grid; grid-template-columns: 10em 1fr; gap: 1.2em; align-items: center; }
  .centre { width: 8.7em; height: 8.7em; border: 0.45em double var(--dk-accent); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; transform: rotate(-5deg); }
  .centre strong { color: var(--dk-accent); font-size: 1.35em; }
  .centre span { max-width: 8em; font-size: 0.58em; line-height: 1.25; }
  .constellation { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75em 0.6em; }
  article { min-height: 4em; border: 2px solid var(--dk-encre); padding: 0.55em; display: flex; align-items: center; gap: 0.55em; background: var(--dk-fond); transform: rotate(var(--r)); animation: arrive 0.35s both; animation-delay: calc(var(--i) * 55ms); }
  article:nth-child(3n) { margin-top: 0.45em; }
  article div { min-width: 0; display: flex; flex-direction: column; gap: 0.12em; }
  article strong { font-size: 0.69em; line-height: 1.15; }
  article span { color: var(--dk-gris); font-size: 0.55em; }
  p { grid-column: 1 / -1; border-top: 2px solid var(--dk-encre); padding-top: 0.5em; font-size: 0.82em; }
  @keyframes arrive { from { opacity: 0; transform: translateY(0.7em) rotate(0); } }
  @media (max-width: 46rem) { .panorama-h { grid-template-columns: 1fr; } .centre { display: none; } .constellation { grid-template-columns: repeat(2, 1fr); } }
  @media (prefers-reduced-motion: reduce) { article { animation: none; } }
</style>
