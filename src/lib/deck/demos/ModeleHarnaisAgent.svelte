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

<div class="mha" bind:this={hote}>
  <div class="equation">
    <div class="boite modele" class:vu={!js || e >= 1}>
      <strong>LE MODÈLE</strong>
      <span>Il produit du texte. Rien d'autre. Il ne touche à aucun fichier.</span>
    </div>
    <i class="op" class:vu={!js || e >= 2}>+</i>
    <div class="boite harnais" class:vu={!js || e >= 2}>
      <strong>LE HARNAIS</strong>
      <span>Un logiciel, chez vous. Il lit ce texte, y reconnaît des commandes, les exécute, puis
        renvoie le résultat au modèle. Et il recommence.</span>
    </div>
    <i class="op eq" class:vu={!js || e >= 3}>=</i>
    <div class="boite agent" class:vu={!js || e >= 3}>
      <strong>L'AGENT</strong>
      <span>Les deux ensemble, plus des outils et un but. « Agent » n'est pas un logiciel qu'on
        installe : c'est ce que forme l'attelage.</span>
    </div>
  </div>

  <div class="consignes" class:vu={!js || e >= 4}>
    <span class="et">CE QUE LE HARNAIS DIT AU MODÈLE AVANT VOUS</span>
    <div class="cits">
      <blockquote>« N'ajoute rien hors du périmètre demandé. »</blockquote>
      <blockquote>« Confirme les actions difficiles à annuler. »</blockquote>
      <blockquote>« Préfère une solution sûre aux commandes Git destructrices. »</blockquote>
    </div>
    <small>Des milliers de lignes, avant votre première phrase. Extraits traduits des prompts
      Claude Code 2.1.x capturés par Piebald-AI.</small>
  </div>
</div>

<style>
  .mha { width: 100%; display: flex; flex-direction: column; gap: 0.7em; }
  .equation { display: grid; grid-template-columns: 1fr auto 1.35fr auto 1.2fr; gap: 0.5em; align-items: stretch; }
  .boite { border: 3px solid var(--dk-encre); padding: 0.6em; display: flex; flex-direction: column; gap: 0.25em; opacity: 0; transform: translateY(0.4em); transition: opacity 0.3s, transform 0.3s; }
  .boite strong { color: var(--dk-accent); font-size: 0.6em; letter-spacing: 0.1em; }
  .boite span { color: var(--dk-gris); font-size: 0.5em; line-height: 1.4; }
  .harnais { border-width: 4px; border-color: var(--dk-accent); }
  .agent { background: var(--dk-accent); }
  .agent strong { color: white; }
  .agent span { color: #dbe6ff; }
  .op { display: grid; place-items: center; color: var(--dk-accent); font-size: 1.5em; font-style: normal; opacity: 0; transition: opacity 0.3s; }
  .consignes { border: 2px dashed var(--dk-gris-2); padding: 0.6em; opacity: 0; transition: opacity 0.3s; }
  .consignes .et { display: block; color: var(--dk-gris); font-size: 0.48em; letter-spacing: 0.12em; margin-bottom: 0.4em; }
  .cits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5em; }
  blockquote { margin: 0; border-left: 3px solid var(--dk-accent); padding-left: 0.5em; font-size: 0.5em; line-height: 1.35; }
  .consignes small { display: block; margin-top: 0.45em; color: var(--dk-gris); font-size: 0.44em; line-height: 1.3; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .boite, .op, .consignes { transition: none; } }
</style>
