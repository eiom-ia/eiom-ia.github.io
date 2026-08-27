<script>
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
</script>

<div class="sk" bind:this={hote}>
  <div class="fenetre">
    <span class="chemin">.claude/skills/fiche-de-lecture/<b>SKILL.md</b></span>
    <pre><code><span class="bloc entete" class:vu={!js || e >= 1}>---
name: fiche-de-lecture
description: À utiliser quand on demande une fiche
  de lecture d'un article ou d'un chapitre.
---</span>
<span class="bloc corps" class:vu={!js || e >= 2}><span class="h1"># Fiche de lecture</span>

<span class="h2">## Ce qu'il faut produire</span>
- la référence complète, au format APA
- la thèse de l'auteur, en une phrase
- la méthode, les données, les limites
- trois citations avec le numéro de page

<span class="h2">## Comment procéder</span>
1. Lire le texte en entier avant d'écrire.
2. Ne jamais citer une page qu'on n'a pas lue.
3. Écrire dans `fiches/&#123;nom-court&#125;.md`.</span></code></pre>
  </div>

  <aside>
    <div class="note n1" class:vu={!js || e >= 1}>
      <strong>L'EN-TÊTE</strong>
      <span>Toujours en mémoire. C'est là-dessus que le harnais décide s'il ouvre le fichier.</span>
    </div>
    <div class="note n2" class:vu={!js || e >= 2}>
      <strong>LE CORPS</strong>
      <span>Chargé seulement quand la tâche correspond. C'est votre méthode, écrite une fois.</span>
    </div>
    <p class="fin" class:vu={!js || e >= 2}>Un skill, c'est un fichier texte. Rien d'autre.</p>
  </aside>
</div>

<style>
  .sk { width: 100%; display: grid; grid-template-columns: 1.7fr 1fr; gap: 0.8em; align-items: start; }
  .fenetre { border: 3px solid var(--dk-encre); overflow: hidden; }
  .chemin { display: block; padding: 0.3em 0.55em; color: var(--dk-fond); background: var(--dk-encre); font-size: 0.46em; }
  .chemin b { color: white; }
  pre { margin: 0; padding: 0.6em 0.7em; background: #0f1214; overflow-x: auto; }
  code { font-size: 0.44em; line-height: 1.55; color: #cfd8e3; }
  .bloc { display: block; opacity: 0; transition: opacity 0.3s; }
  .entete { color: #8de0a9; }
  .h1 { color: #ffffff; font-weight: 600; }
  .h2 { color: #7aa5f5; font-weight: 600; }
  aside { display: flex; flex-direction: column; gap: 0.55em; }
  .note { border-left: 0.35em solid var(--dk-accent); padding-left: 0.6em; display: flex; flex-direction: column; gap: 0.1em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .note strong { font-size: 0.55em; letter-spacing: 0.1em; }
  .note span { color: var(--dk-gris); font-size: 0.5em; line-height: 1.35; }
  .n1 { border-left-color: #2f9e5f; }
  .fin { border-top: 3px solid var(--dk-encre); padding-top: 0.5em; font-size: 0.62em; opacity: 0; transition: opacity 0.3s; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .bloc, .note, .fin { transition: none; } }
</style>
