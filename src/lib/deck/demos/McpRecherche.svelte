<script>
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(3);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 3, lire: () => e, ecrire: (v) => (e = v) });
  });
  // Chacun vérifié le 27 août 2026: le serveur existe et répond.
  const M = [
    { n: 'Consensus', quoi: '200 millions d’articles avec comité de lecture, cherchés et synthétisés dans la conversation.', ou: 'docs.consensus.app/docs/mcp', tag: 'hébergé', libre: true },
    { n: 'Zotero', quoi: 'Votre propre bibliothèque : recherche, métadonnées, texte intégral des PDF déjà classés.', ou: 'github.com/54yyyu/zotero-mcp', tag: 'chez vous', libre: true },
    { n: 'OpenAlex', quoi: '240 millions de travaux, avec les citations, les institutions et les réseaux de collaboration.', ou: 'github.com/oksure/openalex-research-mcp', tag: 'chez vous', libre: true },
    { n: 'Scite', quoi: 'Le contexte des citations : cet article-ci appuie-t-il ou contredit-il celui qu’il cite ?', ou: 'scite.ai/mcp', tag: 'abonnement', libre: false },
    { n: 'Playwright', quoi: 'Le web qui n’a pas d’API : ouvrir des pages, cliquer, récolter ce qui s’affiche.', ou: 'github.com/microsoft/playwright-mcp', tag: 'chez vous', libre: true },
    { n: 'Les serveurs de référence', quoi: 'Fichiers, requêtes web, bases de données. La base, maintenue par le protocole lui-même.', ou: 'github.com/modelcontextprotocol/servers', tag: 'chez vous', libre: true }
  ];
</script>

<div class="mr" bind:this={hote}>
  <div class="grille">
    {#each M as m, i}
      <article class:vu={!js || e >= (i < 3 ? 1 : 2)}>
        <header><strong>{m.n}</strong><span class="tag" class:payant={!m.libre}>{m.tag}</span></header>
        <p>{m.quoi}</p>
        <code>{m.ou}</code>
      </article>
    {/each}
  </div>

  <p class="garde" class:vu={!js || e >= 3}>
    <b>Un serveur MCP tourne avec vos accès et lit vos données.</b> N'en branchez pas un que vous
    n'installeriez pas vous-même : c'est exactement la porte dont on parlait tantôt.
  </p>
</div>

<style>
  .mr { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .grille { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55em; align-items: stretch; }
  article { border: 2px solid var(--dk-encre); padding: 0.5em 0.55em; display: flex; flex-direction: column; gap: 0.22em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  header { display: flex; align-items: baseline; justify-content: space-between; gap: 0.4em; }
  header strong { color: var(--dk-accent); font-size: 0.62em; line-height: 1.1; }
  .tag { flex: none; padding: 0.1em 0.35em; border: 1px solid var(--dk-filet); color: var(--dk-gris); font-size: 0.38em; letter-spacing: 0.08em; }
  .tag.payant { border-color: #8f1822; color: #8f1822; }
  article p { margin: 0; font-size: 0.47em; line-height: 1.4; flex: 1; }
  article code { color: var(--dk-gris); font-size: 0.4em; word-break: break-all; }
  .garde { border-left: 0.35em solid #8f1822; padding-left: 0.7em; font-size: 0.6em; line-height: 1.45; opacity: 0; transition: opacity 0.3s; }
  .garde b { color: #8f1822; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { article, .garde { transition: none; } }
</style>
