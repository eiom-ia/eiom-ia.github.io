<script>
  const P = [
    { ferme: 'Word', ouvert: 'LaTeX · Quarto · Markdown', gain: 'une phrase devient une ligne modifiable' },
    { ferme: 'clics dans Excel', ouvert: 'script R', gain: 'chaque transformation peut être rejouée' },
    { ferme: 'version_finale_2', ouvert: 'Git', gain: 'chaque changement laisse une trace' },
    { ferme: "capture d'écran", ouvert: 'fichier de données', gain: "l'agent peut recalculer, pas seulement regarder" },
    { ferme: 'PDF annoté', ouvert: 'notes en texte', gain: 'des centaines de notes deviennent cherchables' }
  ];
</script>

<div class="passages">
  {#each P as p, i}
    <div class="passage" style="--i: {i}">
      <span class="ferme">{p.ferme}</span>
      <span class="mur">×</span>
      <span class="fleche">→</span>
      <strong>{p.ouvert}</strong>
      <span class="gain">{p.gain}</span>
    </div>
  {/each}
  <p>Le format textuel n'est pas une austérité. C'est une poignée que vous, Git et l'agent pouvez tous saisir.</p>
</div>

<style>
  .passages { width: 100%; display: flex; flex-direction: column; gap: 0.42em; }
  .passage { display: grid; grid-template-columns: 8.5em 1.4em 1.5em 11.5em 1fr; gap: 0.55em; align-items: center; border-bottom: 1px solid var(--dk-filet); padding: 0.42em 0; animation: passage 0.35s both; animation-delay: calc(var(--i) * 70ms); }
  .ferme { color: var(--dk-gris); font-size: 0.74em; text-decoration: line-through; }
  .mur { display: grid; place-items: center; width: 1.35em; height: 1.35em; background: var(--dk-encre); color: var(--dk-fond); }
  .fleche { color: var(--dk-accent); font-size: 1.2em; }
  .passage strong { color: var(--dk-accent); font-size: 0.78em; }
  .gain { font-size: 0.66em; line-height: 1.25; }
  p { margin-top: 0.35em; border-top: 3px solid var(--dk-encre); padding-top: 0.55em; font-size: 0.78em; }
  @keyframes passage { from { opacity: 0; transform: translateX(-0.6em); } }
  @media (prefers-reduced-motion: reduce) { .passage { animation: none; } }
</style>
