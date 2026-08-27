<script>
  import Picto from '../Picto.svelte';
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(5);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 5, lire: () => e, ecrire: (v) => (e = v) });
  });
  const FORMATS = [
    { p: 'page', n: 'LaTeX', r: 'écrire' },
    { p: 'terminal', n: 'R', r: 'analyser' },
    { p: 'grille', n: 'Quarto', r: 'présenter' }
  ];
</script>

<div class="fx" bind:this={hote}>
  <div class="loi" class:vu={!js || e >= 1}>
    <code>AGENTS.md</code>
    <span>Les règles du projet. Chaque agent les lit avant d'agir.</span>
  </div>

  <div class="chaine" class:vu={!js || e >= 2}>
    <div class="poste">
      <span class="role">AGENT · TROUVER</span>
      <strong>La littérature</strong>
      <small>Consensus et les bases de données. Il cherche, il ne conclut pas.</small>
    </div>
    <i class="fl">→</i>
    <div class="poste">
      <span class="role">AGENT · RANGER</span>
      <strong>Le téléchargement</strong>
      <small>Il récupère les textes intégraux et les dépose dans Zotero.</small>
    </div>
    <i class="fl">→</i>
    <div class="poste zot">
      <span class="role">ZOTERO</span>
      <strong>La bibliothèque</strong>
      <small>D'où sort le <code>.bib</code>, qui alimente LaTeX.</small>
    </div>
  </div>

  <div class="regle" class:vu={!js || e >= 3}>
    <span class="tag">LA RÈGLE QUI NE PLIE PAS</span>
    <p>
      <strong>Ne jamais inférer à partir de ce qu'il croit savoir.</strong>
      Toute affirmation doit venir du texte intégral — au minimum du résumé. Sinon, elle ne
      s'écrit pas.
    </p>
  </div>

  <div class="formats" class:vu={!js || e >= 4}>
    {#each FORMATS as f}
      <div class="fmt">
        <Picto nom={f.p} taille="1.35em" />
        <div><strong>{f.n}</strong><span>{f.r}</span></div>
      </div>
    {/each}
    <p class="tout-texte">Trois outils, un seul matériau : du texte.</p>
  </div>

  <div class="git" class:vu={!js || e >= 5}>
    <Picto nom="git" taille="1.5em" />
    <strong>GIT</strong>
    <i class="fl">→</i>
    <strong>GITHUB</strong>
    <span>Tout est commité automatiquement. Rien ne se perd, tout se retrouve, et on voit qui a
      changé quoi.</span>
  </div>
</div>

<style>
  .fx { width: 100%; display: flex; flex-direction: column; gap: 0.45em; }
  .loi, .chaine, .regle, .formats, .git { opacity: 0; transform: translateY(0.3em); transition: opacity 0.3s, transform 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  /* AGENTS.md */
  .loi { display: flex; align-items: baseline; gap: 0.7em; border: 3px solid var(--dk-encre); padding: 0.45em 0.6em; }
  .loi code { color: var(--dk-accent); font-size: 0.66em; font-weight: 600; }
  .loi span { color: var(--dk-gris); font-size: 0.5em; }
  /* la chaine documentaire */
  .chaine { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 0.45em; align-items: stretch; }
  .poste { border: 2px solid var(--dk-encre); padding: 0.45em 0.55em; display: flex; flex-direction: column; gap: 0.12em; }
  .poste.zot { border-width: 3px; border-color: var(--dk-accent); }
  .role { color: var(--dk-accent); font-size: 0.42em; letter-spacing: 0.12em; }
  .poste strong { font-size: 0.55em; }
  .poste small { color: var(--dk-gris); font-size: 0.43em; line-height: 1.35; }
  .poste small code { font-size: 1em; }
  .fl { display: grid; place-items: center; color: var(--dk-accent); font-style: normal; }
  /* la regle */
  .regle { border: 3px solid #8f1822; padding: 0.5em 0.6em; }
  .tag { display: block; color: #8f1822; font-size: 0.44em; letter-spacing: 0.14em; margin-bottom: 0.15em; }
  .regle p { margin: 0; font-size: 0.55em; line-height: 1.45; }
  /* les formats */
  .formats { display: grid; grid-template-columns: repeat(3, 1fr) 1.3fr; gap: 0.5em; align-items: center; }
  .fmt { display: flex; align-items: center; gap: 0.45em; border: 2px solid var(--dk-encre); padding: 0.4em 0.5em; }
  .fmt div { display: flex; flex-direction: column; }
  .fmt strong { font-size: 0.55em; }
  .fmt span { color: var(--dk-gris); font-size: 0.44em; }
  .tout-texte { margin: 0; border-left: 0.3em solid var(--dk-accent); padding-left: 0.5em; font-size: 0.48em; line-height: 1.35; }
  /* git */
  .git { display: flex; align-items: center; gap: 0.5em; border: 3px solid var(--dk-encre); background: var(--dk-fond-2); padding: 0.45em 0.6em; }
  .git strong { font-size: 0.6em; letter-spacing: 0.1em; }
  .git span { color: var(--dk-gris); font-size: 0.45em; line-height: 1.35; margin-left: 0.3em; }
  @media (prefers-reduced-motion: reduce) { .loi, .chaine, .regle, .formats, .git { transition: none; } }
</style>
