<div class="plugin-p">
  <div class="installe"><span>UNE COMMANDE</span><code>/plugin install revue-recherche</code><strong>installe tout le paquet</strong></div>
  <div class="fleche">→</div>
  <div class="boite">
    <strong>PLUGIN</strong>
    <div class="contenu"><span>SKILLS<small>le savoir-faire</small></span><span>AGENTS<small>les spécialistes</small></span><span>HOOKS<small>les déclencheurs</small></span><span>MCP<small>les services</small></span></div>
  </div>
  <p><strong>Un plugin n'est pas une capacité supplémentaire.</strong> C'est le carton qui permet d'installer, versionner et retirer plusieurs extensions d'un seul coup. Son format dépend du harnais.</p>
</div>

<style>
  .plugin-p { display: grid; grid-template-columns: 1fr auto 1.4fr; gap: 0.8em; align-items: center; width: 100%; }
  .installe { display: flex; flex-direction: column; gap: 0.5em; }
  .installe span { color: var(--dk-accent); font-size: 0.58em; letter-spacing: 0.13em; }
  .installe code { border: 2px solid var(--dk-encre); padding: 0.6em; font-size: 0.7em; }
  .installe strong { font-size: 0.75em; }
  .fleche { color: var(--dk-accent); font-size: 2em; }
  .boite { border: 4px dashed var(--dk-accent); padding: 0.75em; }
  .boite > strong { display: block; color: var(--dk-accent); letter-spacing: 0.14em; font-size: 0.72em; margin-bottom: 0.55em; }
  .contenu { display: grid; grid-template-columns: 1fr 1fr; gap: 0.45em; }
  .contenu span { border: 2px solid var(--dk-encre); padding: 0.5em; font-size: 0.66em; font-weight: 600; }
  .contenu small { display: block; color: var(--dk-gris); font-size: 0.82em; font-weight: 400; }
  p { grid-column: 1 / -1; border-top: 2px solid var(--dk-encre); padding-top: 0.55em; font-size: 0.82em; }
  @media (max-width: 46rem) { .plugin-p { grid-template-columns: 1fr; } .fleche { transform: rotate(90deg); } }
</style>
