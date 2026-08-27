<div class="da">
  <div class="fichier"><span>CSV</span><strong>avis.csv</strong><b>551 avis Google</b><small>français + anglais · texte des avis · notes · réponses</small></div>
  <div class="plus">+</div>
  <div class="harnais"><strong>UN HARNAIS</strong><span>Antigravity CLI</span><span>ou celui de votre choix</span></div>
  <div class="plus">+</div>
  <div class="modele"><strong>UN LLM GRATUIT</strong><span>aucun crédit payant</span><span>aucune API facturée</span></div>
  <a class="telecharger" href="https://eiom-ia.github.io/avis.csv">
    <span>À TÉLÉCHARGER</span><code>eiom-ia.github.io/avis.csv</code>
  </a>
  <div class="mission"><span>VOTRE SEULE CONSIGNE</span><strong>Faites une analyse de texte sur les avis eux-mêmes à l'aide d'un LLM.</strong></div>
  <div class="pistes">
    <span class="lab">QUATRE PISTES, AU CHOIX</span>
    <div class="cartes">
      <div><b>LE SENTIMENT</b><span>Chaque avis est-il positif, neutre ou négatif ? La note attribuée le confirme-t-elle ?</span></div>
      <div><b>LES PLATS</b><span>Quels plats reviennent, et lesquels sont aimés ? Le menu se déduit-il des avis ?</span></div>
      <div><b>LES SUGGESTIONS</b><span>Que réclament les clients ? Extrayez chaque reproche actionnable.</span></div>
      <div><b>LA VÔTRE</b><span>Le service, l'attente, le prix, la comparaison français / anglais… votre question.</span></div>
    </div>
    <p>La méthode et la forme du résultat vous appartiennent. Codez-en cinquante à la main d'abord : c'est votre seul moyen de savoir si la machine a raison.</p>
  </div>
</div>

<style>
  .da { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 0.65em; align-items: center; width: 100%; }
  .fichier, .harnais, .modele { min-height: 7em; border: 3px solid var(--dk-encre); padding: 0.8em; display: flex; flex-direction: column; justify-content: center; gap: 0.25em; }
  .fichier { border-color: var(--dk-accent); position: relative; }.fichier > span { position: absolute; top: -0.65em; right: 0.5em; color: white; background: var(--dk-accent); padding: 0.25em 0.45em; font-size: 0.55em; }.fichier strong, .harnais strong, .modele strong { color: var(--dk-accent); font-size: 0.72em; }.fichier b { font-size: 0.95em; }.fichier small, .harnais span, .modele span { color: var(--dk-gris); font-size: 0.58em; line-height: 1.3; }
  .telecharger { grid-column: 1 / -1; display: flex; align-items: center; gap: 0.8em; padding: 0.4em 0.7em; background: var(--dk-encre); text-decoration: none; }
  .telecharger span { color: var(--dk-gris-2); font-size: 0.5em; letter-spacing: 0.14em; flex: none; }
  .telecharger code { color: #8de0a9; font-size: 0.8em; white-space: nowrap; }
  .plus { color: var(--dk-accent); font-size: 1.7em; font-weight: 600; }
  .mission { grid-column: 1 / -1; border-left: 0.45em solid var(--dk-accent); padding: 0.5em 0 0.5em 0.9em; }.mission > span { display: block; color: var(--dk-accent); font-size: 0.56em; letter-spacing: 0.14em; }.mission strong { display: block; margin-top: 0.2em; font-size: 0.95em; line-height: 1.3; }
  .pistes { grid-column: 1 / -1; }
  .pistes .lab { display: block; color: var(--dk-gris); font-size: 0.5em; letter-spacing: 0.14em; margin-bottom: 0.35em; }
  .cartes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5em; }
  .cartes div { border-top: 3px solid var(--dk-encre); padding-top: 0.4em; display: flex; flex-direction: column; gap: 0.15em; }
  .cartes div:last-child { border-top-color: var(--dk-accent); }
  .cartes b { font-size: 0.55em; letter-spacing: 0.06em; }
  .cartes span { color: var(--dk-gris); font-size: 0.46em; line-height: 1.35; }
  .pistes p { margin-top: 0.5em; border-top: 1px solid var(--dk-filet); padding-top: 0.4em; font-size: 0.56em; line-height: 1.4; }
</style>
