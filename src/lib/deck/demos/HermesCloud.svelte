<script>
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(4);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 4, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="hc" bind:this={hote}>
  <div class="vous" class:vu={!js || e >= 1}><strong>VOUS</strong><span>Telegram · Signal · Slack · courriel</span></div>
  <div class="lien" class:vu={!js || e >= 1}>messages ↔ résultats</div>
  <div class="cloud" class:vu={!js || e >= 1}>
    <span class="nuage">CLOUD · VPS À 5 $</span>
    <div class="hermes"><strong>HERMES</strong><span>toujours allumé</span><small>mémoire + skills + outils</small></div>
    <div class="declencheurs" class:vu={!js || e >= 2}>
      <span><b>07:00</b> tâche planifiée</span><span><b>EVENT</b> fichier reçu</span><span><b>WEBHOOK</b> service mis à jour</span>
    </div>
    <div class="agents" class:vu={!js || e >= 3}>
      <span>SOUS-AGENT A<small>veille</small></span><span>SOUS-AGENT B<small>analyse</small></span><span>SOUS-AGENT C<small>rédaction</small></span>
    </div>
  </div>
  <div class="livre" class:vu={!js || e >= 4}><strong>LIVRE SANS VOUS</strong><span>rapport · sauvegarde · alerte · synthèse</span></div>
</div>

<style>
  .hc { display: grid; grid-template-columns: 1fr auto 2.4fr 1fr; gap: 0.65em; align-items: center; width: 100%; }
  .vous, .livre { border: 3px solid var(--dk-encre); padding: 0.75em; display: flex; flex-direction: column; gap: 0.35em; opacity: 0; transition: opacity 0.3s; }
  .vous strong, .livre strong { color: var(--dk-accent); font-size: 0.72em; }
  .vous span, .livre span { font-size: 0.58em; line-height: 1.35; }
  .lien { color: var(--dk-accent); font-size: 0.54em; writing-mode: vertical-rl; opacity: 0; }
  .cloud { min-height: 14em; position: relative; border: 4px solid var(--dk-accent); padding: 2.1em 0.85em 0.85em; display: flex; flex-direction: column; gap: 0.55em; opacity: 0; transition: opacity 0.3s; }
  .nuage { position: absolute; top: 0; left: 0; right: 0; padding: 0.45em; color: var(--dk-fond); background: var(--dk-accent); font-size: 0.58em; letter-spacing: 0.12em; }
  .hermes { border: 3px solid var(--dk-encre); padding: 0.55em 0.7em; display: grid; grid-template-columns: auto 1fr; gap: 0.1em 0.7em; }
  .hermes strong { grid-row: span 2; color: var(--dk-accent); font-size: 1.2em; }
  .hermes span { font-size: 0.68em; font-weight: 600; }.hermes small { color: var(--dk-gris); font-size: 0.54em; }
  .declencheurs, .agents { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.4em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .declencheurs span { border-left: 3px solid var(--dk-accent); padding: 0.35em; font-size: 0.51em; line-height: 1.25; }.declencheurs b { display: block; color: var(--dk-accent); }
  .agents span { border: 2px dashed var(--dk-encre); padding: 0.45em; font-size: 0.5em; font-weight: 600; }.agents small { display: block; color: var(--dk-gris); font-weight: 400; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .vous, .livre, .cloud, .declencheurs, .agents { transition: none; } }
</style>
