<script>
  const T = [
    { t: 'renommer 200 fichiers', niveau: 'PETIT · RAPIDE', prix: '$', classe: 'petit' },
    { t: 'résumer dix articles', niveau: 'ÉQUILIBRÉ', prix: '$$', classe: 'moyen' },
    { t: 'concevoir une stratégie', niveau: 'RAISONNEMENT', prix: '$$$$', classe: 'grand' }
  ];
</script>

<div class="dmo">
  <div class="routes">
    {#each T as x}
      <div class="route {x.classe}"><span class="tache">{x.t}</span><span class="ligne"></span><strong>{x.niveau}</strong><b>{x.prix}</b></div>
    {/each}
  </div>
  <div class="methodes">
    <article><span>1</span><strong>À LA MAIN</strong><p>un modèle rapide par défaut; le modèle de pointe seulement quand la tâche résiste</p></article>
    <article><span>2</span><strong>PAR RÈGLES</strong><p>code, vision, gros contexte ou confidentialité orientent vers une famille adaptée</p></article>
    <article><span>3</span><strong>PAR ROUTEUR</strong><p>un classificateur choisit automatiquement, puis prévoit des modèles de repli</p></article>
  </div>
  <div class="auto"><code>openrouter/auto</code><span>classe la tâche parmi ~30 types</span><span>applique un niveau de coût</span><span>choisit + garde des replis</span></div>
  <p><strong>La pratique raisonnable:</strong> commencer avec deux niveaux, rapide et puissant, tester sur vos vraies tâches, puis router seulement si le gain est mesuré.</p>
</div>

<style>
  .dmo { width: 100%; display: flex; flex-direction: column; gap: 0.65em; }
  .routes { display: flex; flex-direction: column; gap: 0.38em; }.route { display: grid; grid-template-columns: 11em 1fr 9em 3em; gap: 0.55em; align-items: center; }.tache { font-size: 0.66em; }.ligne { height: 0.45em; background: var(--dk-filet); position: relative; }.ligne::after { content: ''; display: block; height: 100%; width: var(--w); background: var(--dk-accent); }.petit { --w: 24%; }.moyen { --w: 58%; }.grand { --w: 100%; }.route strong { font-size: 0.58em; color: var(--dk-accent); }.route b { font-size: 0.68em; }
  .methodes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55em; }.methodes article { border: 2px solid var(--dk-encre); padding: 0.55em; display: grid; grid-template-columns: 1.4em 1fr; gap: 0.08em 0.35em; }.methodes span { grid-row: span 2; color: var(--dk-accent); font-size: 1.2em; font-weight: 600; }.methodes strong { font-size: 0.58em; }.methodes p { color: var(--dk-gris); font-size: 0.5em; line-height: 1.25; }
  .auto { display: flex; align-items: center; gap: 0.55em; border-left: 0.35em solid var(--dk-accent); padding-left: 0.55em; }.auto code { color: var(--dk-accent); font-size: 0.62em; font-weight: 600; }.auto span { font-size: 0.48em; }.auto span + span::before { content: '→ '; color: var(--dk-accent); }
  .dmo > p { border-top: 2px solid var(--dk-encre); padding-top: 0.5em; font-size: 0.7em; }
</style>
