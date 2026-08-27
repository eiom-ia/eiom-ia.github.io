<script>
  import Copier from '../Copier.svelte';
  import { brancherTemps } from '../temps.js';
  let js = $state(false);
  let e = $state(2);
  let hote = $state(null);
  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: 2, lire: () => e, ecrire: (v) => (e = v) });
  });

  const HAUT = `# Règles du projet

## Ce qu'on fait ici
551 avis Google. R pour l'analyse, LaTeX pour l'écriture,
Git pour tout le reste.`;

  const BAS = `## Ce qu'on ne fait jamais
- Ne jamais inférer une information : la lire dans le texte
  intégral, ou au minimum dans le résumé.
- Ne jamais écrire dans \`donnees/\` : lecture seule.
- Ne jamais committer si les tests échouent.

## Comment travailler
- Les sorties vont dans \`sorties/\`.
- Une tâche, un commit, un message en français.
- Demander avant toute action difficile à annuler.`;
</script>

<div class="rg" bind:this={hote}>
  <div class="fenetre">
    <div class="chemin">
      <span>~/projet-these/<b>AGENTS.md</b></span>
      <Copier texte={`${HAUT}\n\n${BAS}`} />
    </div>
    <pre><code><span class="bloc" class:vu={!js || e >= 1}>{HAUT}</span>
<span class="bloc" class:vu={!js || e >= 2}>{BAS}</span></code></pre>
  </div>

  <aside>
    <div class="note" class:vu={!js || e >= 1}>
      <strong>TOUJOURS LU</strong>
      <span>Chargé au début de chaque séance, avant votre première phrase. Le harnais ne
        choisit pas : il le lit toujours.</span>
    </div>
    <div class="note" class:vu={!js || e >= 2}>
      <strong>DEUX NOMS, UNE SEULE IDÉE</strong>
      <span><code>AGENTS.md</code> est la convention partagée : Codex, OpenCode, Antigravity et
        les autres le lisent. <code>CLAUDE.md</code> est le nom que Claude Code donne au même
        fichier.</span>
    </div>
    <p class="fin" class:vu={!js || e >= 2}>
      Vos règles de travail, écrites une fois, en texte. C'est tout.
    </p>
  </aside>
</div>

<style>
  .rg { width: 100%; display: grid; grid-template-columns: 1.7fr 1fr; gap: 0.8em; align-items: start; }
  .fenetre { border: 3px solid var(--dk-encre); overflow: hidden; }
  .chemin { display: flex; align-items: center; justify-content: space-between; gap: 0.6em; padding: 0.28em 0.4em 0.28em 0.55em; color: var(--dk-fond); background: var(--dk-encre); font-size: 0.58em; }
  .chemin b { color: white; }
  pre { margin: 0; padding: 0.6em 0.7em; background: #0f1214; overflow-x: auto; }
  code { font-size: 0.6em; line-height: 1.5; color: #cfd8e3; }
  .bloc { display: block; opacity: 0; transition: opacity 0.3s; }
  aside { display: flex; flex-direction: column; gap: 0.55em; }
  .note { border-left: 0.35em solid var(--dk-accent); padding-left: 0.6em; display: flex; flex-direction: column; gap: 0.1em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .note strong { font-size: 0.68em; letter-spacing: 0.08em; }
  .note span { color: var(--dk-gris); font-size: 0.62em; line-height: 1.45; }
  .note span code { font-size: 1em; color: var(--dk-encre); }
  .fin { border-top: 3px solid var(--dk-encre); padding-top: 0.55em; font-size: 0.74em; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .bloc, .note, .fin { transition: none; } }
</style>
