<script>
  const GROUPES = [
    {
      titre: 'Harnais et protocoles',
      sources: [
        ['modelcontextprotocol.io', 'spécification MCP'],
        ['code.claude.com/docs/en/plugins', 'plugins Claude Code'],
        ['github.com/Piebald-AI/claude-code-system-prompts', 'prompts internes capturés, versions 2.1.x'],
        ['github.com/MoonshotAI/kimi-cli', 'Kimi CLI'],
        ['github.com/deepseek-ai/deepseek-harness', 'DeepSeek Harness'],
        ['github.com/lm-sys/RouteLLM', 'routage et évaluation de modèles']
      ]
    },
    {
      titre: 'Agents cloud et communauté',
      sources: [
        ['hermes-agent.nousresearch.com', 'fonctions, architecture et illustration Nous'],
        ['github.com/NousResearch/hermes-agent', 'code et documentation Hermes'],
        ['github.com/agent-sh/computer-use-linux', 'contrôle du bureau Linux'],
        ['github.com/AaronWong1999/hermesclaw', 'pont WeChat'],
        ['github.com/Snehal707/Hermes-mars-rover', 'simulation de rover'],
        ['github.com/leecoin06-commits/hermes-agent-android', 'port Android']
      ]
    },
    {
      titre: 'Mémoire, contexte et données',
      sources: [
        ['github.com/MemPalace/mempalace', 'mémoire locale par couches'],
        ['github.com/mem0ai/mem0', 'couche de mémoire universelle'],
        ['github.com/letta-ai/letta', 'agents avec état'],
        ['github.com/gastownhall/beads', 'beads, créé par Steve Yegge'],
        ['openrouter.ai/docs/guides/routing/routers/auto-router', 'classification et routage automatique'],
        ['donnees/ligne_rouge.csv', '551 avis du corpus pédagogique']
      ]
    }
  ];
</script>

<div class="sources-a">
  {#each GROUPES as g}
    <section><h3>{g.titre}</h3><ul>{#each g.sources as s}<li><strong>{s[0]}</strong><span>{s[1]}</span></li>{/each}</ul></section>
  {/each}
  <p>Images de fiction utilisées à titre d'illustration. Logos et personnage Nous repris des comptes ou dépôts publics des organisations. Style lexicographique inspiré des dictionnaires Le Robert.</p>
</div>

<style>
  .sources-a { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em; width: 100%; }
  section { border-top: 0.3em solid var(--dk-accent); padding-top: 0.45em; }
  h3 { color: var(--dk-accent); font-size: 0.64em; letter-spacing: 0.08em; }
  ul { list-style: none; padding: 0; margin: 0.45em 0 0; display: flex; flex-direction: column; gap: 0.38em; }
  li { margin: 0; padding-bottom: 0.3em; border-bottom: 1px solid var(--dk-filet); }
  li strong { display: block; font-size: 0.48em; overflow-wrap: anywhere; }
  li span { display: block; color: var(--dk-gris); font-size: 0.45em; line-height: 1.25; }
  .sources-a > p { grid-column: 1 / -1; color: var(--dk-gris); border-top: 2px solid var(--dk-encre); padding-top: 0.4em; font-size: 0.48em; }
</style>
