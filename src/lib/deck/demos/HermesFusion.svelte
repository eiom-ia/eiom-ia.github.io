<script>
  import { base } from '$app/paths';
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
  const F = [
    ['01', 'IL SE SOUVIENT', 'mémoire persistante, et recherche dans les anciennes sessions'],
    ['02', 'IL APPREND', 'crée et améliore ses propres skills après les tâches complexes'],
    ['03', 'IL DÉLÈGUE', 'lance des sous-agents isolés, en parallèle'],
    ['04', 'IL VIT AILLEURS', 'VPS, Docker, SSH ou infrastructure serverless']
  ];
</script>

<div class="hf" bind:this={hote}>
  <figure class:vu={!js || e >= 1}>
    <img src="{base}/img/agentique/nous-girl.jpg" alt="Personnage illustré de Nous Research" />
    <figcaption>HERMES · NOUS RESEARCH</figcaption>
  </figure>

  <div class="faits">
    {#each F as [n, t, d], i}
      <div class="fait" class:vu={!js || e >= 1}><span>{n}</span><strong>{t}</strong><p>{d}</p></div>
    {/each}
  </div>

  <div class="flux" class:vu={!js || e >= 2}>
    <div class="vous">VOUS<small>Telegram · Signal · Slack · courriel</small></div>
    <i>↔</i>
    <div class="cloud">
      <span class="nuage">CLOUD · UN SERVEUR À 5 $</span>
      <div class="dec"><b>07:00</b> tâche planifiée<i>·</i><b>EVENT</b> fichier reçu<i>·</i><b>WEBHOOK</b> service mis à jour</div>
      <div class="sous"><span>SOUS-AGENT A</span><span>SOUS-AGENT B</span><span>SOUS-AGENT C</span></div>
    </div>
    <i>→</i>
    <div class="livre">LIVRE SANS VOUS<small>rapport · alerte · synthèse</small></div>
  </div>

  <p class="licence" class:vu={!js || e >= 3}>Nous Research · MIT · Hermes Agent v0.20 · août 2026</p>
</div>

<style>
  .hf { width: 100%; display: grid; grid-template-columns: 0.62fr 1.38fr; gap: 0.6em 0.8em; align-items: start; }
  figure { margin: 0; position: relative; border: 4px solid var(--dk-encre); overflow: hidden; min-height: 9.4em; opacity: 0; transition: opacity 0.3s; }
  img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  figcaption { position: absolute; left: 0; bottom: 0; right: 0; padding: 0.35em; color: white; background: var(--dk-accent); font-size: 0.45em; letter-spacing: 0.1em; }
  .faits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.45em; }
  .fait { border: 2px solid var(--dk-encre); padding: 0.45em 0.5em; opacity: 0; transform: translateY(0.3em); transition: opacity 0.3s, transform 0.3s; }
  .fait span { color: var(--dk-accent); font-size: 0.75em; font-weight: 600; }
  .fait strong { display: block; font-size: 0.48em; letter-spacing: 0.07em; }
  .fait p { margin-top: 0.2em; color: var(--dk-gris); font-size: 0.42em; line-height: 1.3; }
  .flux { grid-column: 1 / -1; display: grid; grid-template-columns: auto auto 1fr auto auto; gap: 0.45em; align-items: center; opacity: 0; transition: opacity 0.3s; }
  .vous, .livre { border: 3px solid var(--dk-encre); padding: 0.45em 0.55em; display: flex; flex-direction: column; font-size: 0.5em; font-weight: 600; }
  .vous small, .livre small { color: var(--dk-gris); font-size: 0.78em; font-weight: 400; line-height: 1.25; }
  .flux > i { color: var(--dk-accent); font-style: normal; font-size: 0.85em; }
  .cloud { position: relative; border: 4px solid var(--dk-accent); padding: 1.5em 0.6em 0.55em; }
  .nuage { position: absolute; top: 0; left: 0; right: 0; padding: 0.3em; color: var(--dk-fond); background: var(--dk-accent); font-size: 0.44em; letter-spacing: 0.1em; }
  .dec { color: var(--dk-gris); font-size: 0.42em; line-height: 1.4; }
  .dec b { color: var(--dk-accent); }
  .dec i { font-style: normal; margin: 0 0.35em; color: var(--dk-gris-2); }
  .sous { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.3em; margin-top: 0.35em; }
  .sous span { border: 2px dashed var(--dk-encre); padding: 0.3em; text-align: center; font-size: 0.4em; font-weight: 600; }
  .licence { grid-column: 1 / -1; color: var(--dk-gris); font-size: 0.46em; text-align: right; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { figure, .fait, .flux, .licence { transition: none; } }
</style>
