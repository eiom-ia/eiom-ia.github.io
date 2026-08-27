<script>
  import { brancherTemps } from '../temps.js';

  const MOTS = [
    { n: 'AGENTS.md', d: 'Les règles du projet.', q: 'Portable entre plusieurs harnais.', groupe: 'instructions' },
    { n: 'CLAUDE.md', d: 'Les règles pour Claude.', q: 'Lu automatiquement par Claude Code.', groupe: 'instructions' },
    { n: 'SKILL', d: 'Du savoir-faire.', q: 'Chargé seulement quand la tâche le demande.', groupe: 'extension' },
    { n: 'MCP', d: 'Un protocole commun.', q: 'Un seul langage pour brancher outils, données et services.', groupe: 'extension' },
    { n: 'PLUGIN', d: 'Un paquet à installer.', q: 'Regroupe skills, agents, hooks et MCP.', groupe: 'extension' }
  ];

  let js = $state(false);
  let e = $state(MOTS.length);
  let hote = $state(null);

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: MOTS.length, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="voc" bind:this={hote}>
  <section>
    <header><span>TOUJOURS EN CONTEXTE</span><strong>Comment travailler ici</strong></header>
    <div class="rang fichiers">
      {#each MOTS.filter((m) => m.groupe === 'instructions') as m, i}
        <article class:vue={!js || i < e}>
          <div class="icone page"><span></span><span></span><span></span></div>
          <h3>{m.n}</h3><strong>{m.d}</strong><p>{m.q}</p>
        </article>
      {/each}
    </div>
  </section>

  <div class="separation"><span>PUIS, POUR AUGMENTER SES CAPACITÉS</span></div>

  <section>
    <div class="rang extensions">
      {#each MOTS.filter((m) => m.groupe === 'extension') as m, i}
        <article class:vue={!js || i + 2 < e}>
          <div class="icone" class:prise={m.n === 'MCP'} class:paquet={m.n === 'PLUGIN'}>
            {#if m.n === 'SKILL'}<span></span><span></span><span></span>{/if}
          </div>
          <h3>{m.n}</h3><strong>{m.d}</strong><p>{m.q}</p>
        </article>
      {/each}
    </div>
  </section>
</div>

<style>
  .voc { width: 100%; display: flex; flex-direction: column; gap: 0.65em; }
  section { display: flex; flex-direction: column; gap: 0.45em; }
  header { display: flex; align-items: baseline; gap: 0.8em; }
  header span, .separation span { color: var(--dk-accent); font-size: 0.54em; letter-spacing: 0.14em; }
  header strong { font-size: 0.74em; }
  .rang { display: grid; gap: 0.7em; }
  .fichiers { grid-template-columns: repeat(2, 1fr); }
  .extensions { grid-template-columns: repeat(3, 1fr); }
  article { border: 2px solid var(--dk-encre); padding: 0.62em 0.72em; display: grid; grid-template-columns: 2.5em 1fr; gap: 0.08em 0.55em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.25s, transform 0.25s; }
  article.vue { opacity: 1; transform: none; }
  article h3 { color: var(--dk-accent); font-size: 0.72em; letter-spacing: 0.08em; }
  article > strong { font-size: 0.69em; }
  article p { grid-column: 2; color: var(--dk-gris); font-size: 0.58em; line-height: 1.3; }
  .icone { grid-row: span 3; align-self: center; width: 1.8em; height: 2.15em; border: 2px solid var(--dk-encre); display: flex; flex-direction: column; justify-content: center; gap: 0.25em; padding: 0.22em; box-sizing: border-box; }
  .icone span { display: block; height: 2px; background: var(--dk-gris-2); }
  .icone.prise { border: 0; border-left: 0.35em solid var(--dk-accent); border-right: 0.35em solid var(--dk-accent); height: 1.2em; }
  .icone.paquet { border: 3px dashed var(--dk-accent); width: 2.1em; height: 2.1em; }
  .separation { display: flex; align-items: center; gap: 0.7em; }
  .separation::after { content: ''; flex: 1; border-top: 2px solid var(--dk-filet); }
  @media (prefers-reduced-motion: reduce) { article { transition: none; } }
</style>
