<script>
  import Logo from '../Logo.svelte';
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
  // Chiffres relevés à la source le 27 août 2026. Celui d'OpenAlex vient de
  // son API, qui les compte en direct.
  const M = [
    { logo: 'consensus', n: 'Consensus', gros: '200 M', quoi: 'articles avec comité de lecture', tag: 'hébergé' },
    { logo: 'zotero', n: 'Zotero', gros: 'LA VÔTRE', quoi: 'votre bibliothèque, texte intégral compris', tag: 'chez vous' },
    { logo: 'openalex', n: 'OpenAlex', gros: '322 M', quoi: 'travaux, citations, institutions', tag: 'chez vous' },
    { logo: 'scite', n: 'Scite', gros: '1,6 Md', quoi: 'citations, avec leur contexte : appuie ou contredit', tag: 'abonnement', payant: true },
    { logo: 'playwright', n: 'Playwright', gros: 'LE WEB', quoi: 'les pages qui n’ont pas d’API', tag: 'chez vous' },
    { logo: 'mcp', n: 'Serveurs de référence', gros: 'LA BASE', quoi: 'fichiers, requêtes, bases de données', tag: 'chez vous' }
  ];
</script>

<div class="mr" bind:this={hote}>
  <div class="grille">
    {#each M as m, i}
      <article class:vu={!js || e >= (i < 3 ? 1 : 2)} class:payant={m.payant}>
        <Logo nom={m.logo} alt={m.n} taille="3.1em" />
        <div class="txt">
          <span class="nom">{m.n}</span>
          <b class="gros">{m.gros}</b>
          <span class="quoi">{m.quoi}</span>
        </div>
        <span class="tag">{m.tag}</span>
      </article>
    {/each}
  </div>

  <p class="garde" class:vu={!js || e >= 3}>
    <b>Un serveur MCP tourne avec vos accès et lit vos données.</b> N'en branchez pas un que vous
    n'installeriez pas vous-même.
  </p>
</div>

<style>
  .mr { width: 100%; display: flex; flex-direction: column; gap: 0.75em; }
  .grille { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7em; align-items: stretch; }
  article { position: relative; border: 3px solid var(--dk-encre); padding: 0.65em 0.7em 1.35em; display: grid; grid-template-columns: auto 1fr; gap: 0.65em; align-items: center; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  article.payant { border-color: #8f1822; }
  .txt { display: flex; flex-direction: column; gap: 0.05em; min-width: 0; }
  .nom { color: var(--dk-accent); font-size: 0.6em; letter-spacing: 0.04em; }
  .gros { font-size: 1.35em; line-height: 1.05; letter-spacing: -0.02em; }
  .quoi { color: var(--dk-gris); font-size: 0.52em; line-height: 1.35; }
  .tag { position: absolute; left: 0.7em; bottom: 0.5em; padding: 0.1em 0.4em; border: 1px solid var(--dk-filet); color: var(--dk-gris); font-size: 0.44em; letter-spacing: 0.1em; }
  article.payant .tag { border-color: #8f1822; color: #8f1822; }
  .garde { border-left: 0.35em solid #8f1822; padding-left: 0.7em; font-size: 0.68em; line-height: 1.45; opacity: 0; transition: opacity 0.3s; }
  .garde b { color: #8f1822; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { article, .garde { transition: none; } }
</style>
