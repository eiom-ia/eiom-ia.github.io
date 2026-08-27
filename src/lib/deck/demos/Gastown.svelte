<script>
  /**
   * Gas Town en un schema, et non plus en cartes juxtaposees: ce qui
   * compte, c'est qui parle a qui. Une seule fleche est bidirectionnelle,
   * celle qui vous relie au Mayor; tout le reste descend.
   *
   * Les noms sont ceux du depot (internal/templates/roles), la portee
   * ville/rig celle du manuel de Yegge. Aucun palier de modele: le routage
   * par palier est une proposition en discussion, pas une fonction livree.
   */
  import Picto from '../Picto.svelte';
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
  const TACHES = ['tâche 1', 'tâche 2', 'tâche 3'];
</script>

<div class="gt" bind:this={hote}>
  <!-- 1. la seule conversation -->
  <div class="conv">
    <div class="vous"><Picto nom="humain" taille="1.5em" /><strong>VOUS</strong></div>
    <div class="lien">
      <svg viewBox="0 0 140 20" aria-hidden="true">
        <path d="M12 10 H128" /><path d="M20 3 L8 10 L20 17" /><path d="M120 3 L132 10 L120 17" />
      </svg>
      <small>la seule conversation</small>
    </div>
    <div class="mayor">
      <strong>MAYOR</strong>
      <span>il découpe le travail et l'assigne · il n'écrit jamais de code</span>
      <em>ville</em>
    </div>
  </div>

  <div class="descente" class:vu={!js || e >= 1}><b>↓</b><small>il découpe en tâches et les assigne</small></div>

  <!-- 2. la delegation -->
  <div class="etage">
    <div class="taches" class:vu={!js || e >= 1}>
      {#each TACHES as t}
        <div class="col">
          <span class="tache">{t}</span>
          <b class="fl">↓</b>
          <div class="polecat"><strong>POLECAT</strong><span>fait, soumet, disparaît</span></div>
        </div>
      {/each}
    </div>
    <div class="witness" class:vu={!js || e >= 2}>
      <b class="fl-g">←</b>
      <div><strong>WITNESS</strong><span>surveille et débloque</span><em>rig</em></div>
    </div>
  </div>

  <div class="descente" class:vu={!js || e >= 2}><b>↓</b><small>le travail soumis</small></div>

  <div class="fusion" class:vu={!js || e >= 2}>
    <div class="refinery"><strong>REFINERY</strong><span>tient la file de fusion, règle les conflits</span><em>rig</em></div>
    <b class="fl">→</b>
    <code>main</code>
  </div>

  <!-- 3. ce qui tourne en arriere-plan -->
  <div class="ville" class:vu={!js || e >= 3}>
    <span class="lab">EN<br />ARRIÈRE-PLAN</span>
    <div><strong>CREW</strong><span>agents nommés, de longue durée</span></div>
    <div><strong>DEACON</strong><span>relance tout le monde</span></div>
    <div><strong>DOGS</strong><span>entretien et nettoyage</span></div>
  </div>

  <p class="attrib">Steve Yegge, « Welcome to Gas Town » · Maggie Appleton, maggieappleton.com/gastown</p>
</div>

<style>
  .gt { width: 100%; display: flex; flex-direction: column; gap: 0.3em; align-items: center; }
  /* la conversation: le seul lien a double sens du schema */
  .conv { display: grid; grid-template-columns: auto auto 1fr; gap: 0.7em; align-items: center; width: 100%; }
  .vous { border: 3px solid var(--dk-encre); padding: 0.5em 0.7em; display: flex; flex-direction: column; align-items: center; gap: 0.15em; }
  .vous strong { font-size: 0.5em; letter-spacing: 0.1em; }
  .lien { display: flex; flex-direction: column; align-items: center; gap: 0.1em; }
  .lien svg { width: 8em; height: 1.1em; overflow: visible; }
  .lien path { fill: none; stroke: var(--dk-accent); stroke-width: 3; }
  .lien small { color: var(--dk-accent); font-size: 0.42em; letter-spacing: 0.08em; }
  .mayor { border: 4px solid var(--dk-accent); padding: 0.55em 0.75em; display: grid; grid-template-columns: 1fr auto; gap: 0.05em 0.6em; }
  .mayor strong { color: var(--dk-accent); font-size: 0.72em; letter-spacing: 0.04em; }
  .mayor span { grid-column: 1; color: var(--dk-gris); font-size: 0.5em; }
  .mayor em { grid-row: span 2; align-self: center; font-style: normal; color: var(--dk-accent); font-size: 0.4em; letter-spacing: 0.12em; border-left: 1px solid var(--dk-filet); padding-left: 0.6em; }
  /* descentes */
  .descente { display: flex; align-items: center; gap: 0.5em; opacity: 0; transition: opacity 0.3s; }
  .descente b { color: var(--dk-accent); font-size: 0.85em; line-height: 1; }
  .descente small { color: var(--dk-gris); font-size: 0.44em; letter-spacing: 0.06em; }
  /* la delegation */
  .etage { display: grid; grid-template-columns: 1fr auto; gap: 0.8em; align-items: center; width: 100%; }
  .taches { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6em; opacity: 0; transform: translateY(0.3em); transition: opacity 0.3s, transform 0.3s; }
  .col { display: flex; flex-direction: column; align-items: center; gap: 0.12em; }
  .tache { border: 2px dashed var(--dk-gris-2); color: var(--dk-gris); font-size: 0.44em; letter-spacing: 0.08em; padding: 0.2em 0.7em; }
  .fl, .fl-g { color: var(--dk-accent); font-size: 0.7em; line-height: 1; }
  .polecat { width: 100%; border: 2px solid var(--dk-encre); padding: 0.4em 0.5em; text-align: center; }
  .polecat strong { display: block; font-size: 0.52em; letter-spacing: 0.06em; }
  .polecat span { color: var(--dk-gris); font-size: 0.42em; }
  .witness { display: flex; align-items: center; gap: 0.35em; opacity: 0; transition: opacity 0.3s; }
  .witness div { border-left: 0.3em solid var(--dk-accent); padding-left: 0.5em; }
  .witness strong { display: block; font-size: 0.52em; letter-spacing: 0.06em; }
  .witness span { display: block; color: var(--dk-gris); font-size: 0.42em; }
  .witness em { font-style: normal; color: var(--dk-accent); font-size: 0.38em; letter-spacing: 0.12em; }
  /* la fusion */
  .fusion { display: flex; align-items: center; gap: 0.6em; opacity: 0; transition: opacity 0.3s; }
  .refinery { border: 3px solid var(--dk-encre); padding: 0.45em 0.7em; display: grid; grid-template-columns: 1fr auto; gap: 0 0.6em; }
  .refinery strong { font-size: 0.56em; letter-spacing: 0.06em; }
  .refinery span { grid-column: 1; color: var(--dk-gris); font-size: 0.44em; }
  .refinery em { grid-row: span 2; align-self: center; font-style: normal; color: var(--dk-accent); font-size: 0.38em; letter-spacing: 0.12em; border-left: 1px solid var(--dk-filet); padding-left: 0.5em; }
  .fusion code { color: var(--dk-accent); font-size: 0.6em; font-weight: 600; }
  /* l'arriere-plan */
  .ville { display: grid; grid-template-columns: auto repeat(3, 1fr); gap: 0.55em; align-items: center; width: 100%; margin-top: 0.25em; border-top: 2px solid var(--dk-filet); padding-top: 0.45em; opacity: 0; transition: opacity 0.3s; }
  .ville .lab { color: var(--dk-gris); font-size: 0.38em; letter-spacing: 0.1em; line-height: 1.25; white-space: nowrap; }
  .ville div { display: flex; align-items: baseline; gap: 0.45em; }
  .ville strong { font-size: 0.48em; letter-spacing: 0.06em; }
  .ville span { color: var(--dk-gris); font-size: 0.42em; }
  .attrib { align-self: flex-start; color: var(--dk-gris); font-size: 0.38em; letter-spacing: 0.04em; margin-top: 0.15em; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .descente, .taches, .witness, .fusion, .ville { transition: none; } }
</style>
