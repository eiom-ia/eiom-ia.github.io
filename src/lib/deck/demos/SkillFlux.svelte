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

<div class="skill-flux" bind:this={hote}>
  <div class="ligne">
    <div class="etape demande" class:vue={!js || e >= 1}><span>1</span><strong>LA TÂCHE</strong><p>« Fais une fiche de lecture. »</p></div>
    <div class="fleche">→</div>
    <div class="etape choix" class:vue={!js || e >= 2}><span>2</span><strong>LE HARNAIS CHOISIT</strong><p>Ce skill correspond à la demande.</p></div>
    <div class="fleche">→</div>
    <div class="dossier" class:vue={!js || e >= 3}>
      <strong>revue-litterature/</strong>
      <code>SKILL.md</code><code>modele.md</code>
      <small>La méthode et le gabarit</small>
    </div>
    <div class="fleche">→</div>
    <div class="etape sortie" class:vue={!js || e >= 4}><span>3</span><strong>L'AGENT APPLIQUE</strong><p>La même méthode, à chaque fois.</p></div>
  </div>
  <p class="morale"><strong>Le skill n'est pas toujours chargé.</strong> Il entre dans le contexte au moment utile, puis votre protocole devient reproductible et partageable.</p>
</div>

<style>
  .skill-flux { width: 100%; display: flex; flex-direction: column; gap: 0.8em; }
  .ligne { display: grid; grid-template-columns: 1fr auto 1fr auto 1.05fr auto 1fr; gap: 0.35em; align-items: stretch; }
  .etape, .dossier { border: 2px solid var(--dk-encre); padding: 0.65em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.25s, transform 0.25s; }
  .etape.vue, .dossier.vue { opacity: 1; transform: none; }
  .etape span { color: var(--dk-accent); font-size: 1.35em; font-weight: 600; }
  .etape strong, .dossier strong { display: block; font-size: 0.62em; letter-spacing: 0.08em; }
  .etape p { margin-top: 0.45em; font-size: 0.62em; line-height: 1.3; }
  .dossier { border-color: var(--dk-accent); display: flex; flex-direction: column; gap: 0.34em; }
  .dossier code { font-size: 0.58em; border-left: 3px solid var(--dk-accent); }
  .dossier small { color: var(--dk-gris); font-size: 0.52em; }
  .fleche { align-self: center; color: var(--dk-accent); font-size: 1.1em; }
  .morale { border-left: 0.35em solid var(--dk-accent); padding-left: 0.75em; font-size: 0.84em; }
  @media (max-width: 46rem) { .ligne { grid-template-columns: 1fr; } .fleche { transform: rotate(90deg); } }
  @media (prefers-reduced-motion: reduce) { .etape, .dossier { transition: none; } }
</style>
