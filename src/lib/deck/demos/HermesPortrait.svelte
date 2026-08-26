<script>
  import { base } from '$app/paths';
</script>

<div class="hp">
  <figure><img src="{base}/img/agentique/nous-girl.jpg" alt="Personnage illustré de Nous Research" /><figcaption>HERMES · NOUS RESEARCH</figcaption></figure>
  <div class="bulles">
    <div><span>01</span><strong>IL SE SOUVIENT</strong><p>mémoire persistante et recherche dans les anciennes sessions</p></div>
    <div><span>02</span><strong>IL APPREND</strong><p>crée et améliore ses propres skills après les tâches complexes</p></div>
    <div><span>03</span><strong>IL DÉLÈGUE</strong><p>lance des sous-agents isolés, en parallèle</p></div>
    <div><span>04</span><strong>IL VIT AILLEURS</strong><p>VPS, Docker, SSH ou infrastructure serverless</p></div>
  </div>
  <p class="licence">Nous Research · MIT · Hermes Agent v0.20 · août 2026</p>
</div>

<style>
  .hp { display: grid; grid-template-columns: 0.9fr 1.5fr; gap: 1em; width: 100%; }
  figure { margin: 0; position: relative; border: 4px solid var(--dk-encre); overflow: hidden; min-height: 13em; }
  img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  figcaption { position: absolute; left: 0; bottom: 0; right: 0; padding: 0.5em; color: white; background: var(--dk-accent); font-size: 0.57em; letter-spacing: 0.1em; }
  .bulles { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65em; align-content: center; }
  .bulles div { border: 2px solid var(--dk-encre); padding: 0.65em; transform: rotate(-1deg); }
  .bulles div:nth-child(even) { transform: rotate(1.5deg); }
  .bulles span { color: var(--dk-accent); font-size: 1.3em; font-weight: 600; }
  .bulles strong { display: block; font-size: 0.65em; letter-spacing: 0.08em; }
  .bulles p { margin-top: 0.32em; color: var(--dk-gris); font-size: 0.57em; line-height: 1.3; }
  .licence { grid-column: 1 / -1; color: var(--dk-gris); font-size: 0.56em; text-align: right; }
</style>
