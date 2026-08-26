<script>
  import { brancherTemps } from '../temps.js';

  const N = 4;
  let js = $state(false);
  let e = $state(N);
  let hote = $state(null);

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: N, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="anatomie-h" bind:this={hote}>
  <aside class="manuel" class:vu={!js || e >= 1}>
    <span class="et">AVANT VOTRE DEMANDE</span>
    <h3>Des milliers de lignes de consignes</h3>
    <blockquote>« N'ajoute rien hors du périmètre demandé. »</blockquote>
    <blockquote>« Confirme les actions difficiles à annuler. »</blockquote>
    <blockquote>« Préfère une solution sûre aux commandes Git destructrices. »</blockquote>
    <small>Extraits traduits des prompts Claude Code 2.1.x capturés par Piebald-AI.</small>
  </aside>

  <div class="flux">
    <div class="noeud modele" class:vu={!js || e >= 1}><span>1</span><strong>LE MODÈLE</strong><small>produit une chaîne de caractères</small></div>
    <div class="sortie" class:vu={!js || e >= 2}>"grep -rl 'populisme' notes/"</div>
    <div class="noeud harnais" class:vu={!js || e >= 3}><span>2</span><strong>LE HARNAIS</strong><small>reconnaît une commande, vérifie les permissions</small></div>
    <div class="noeud machine" class:vu={!js || e >= 4}><span>3</span><strong>L'ORDINATEUR</strong><small>exécute, puis renvoie le résultat</small></div>
  </div>
</div>

<style>
  .anatomie-h { display: grid; grid-template-columns: 1.05fr 1.5fr; gap: 1.2em; width: 100%; }
  .manuel { border: 2px solid var(--dk-encre); border-top: 0.35em solid var(--dk-accent); padding: 0.8em; opacity: 0; transition: opacity 0.3s; }
  .manuel.vu, .flux .vu { opacity: 1; transform: none; }
  .et { color: var(--dk-accent); font-size: 0.56em; letter-spacing: 0.14em; }
  .manuel h3 { font-size: 0.94em; margin: 0.35em 0 0.6em; }
  blockquote { margin: 0; padding: 0.35em 0; border-top: 1px solid var(--dk-filet); font-size: 0.68em; line-height: 1.35; }
  .manuel small { display: block; margin-top: 0.55em; color: var(--dk-gris); font-size: 0.5em; line-height: 1.35; }
  .flux { display: flex; flex-direction: column; justify-content: center; gap: 0.45em; }
  .noeud { display: grid; grid-template-columns: 2em 1fr; gap: 0 0.6em; border: 3px solid var(--dk-encre); padding: 0.65em 0.8em; opacity: 0; transform: translateX(0.6em); transition: opacity 0.3s, transform 0.3s; }
  .noeud span { grid-row: span 2; align-self: center; color: var(--dk-accent); font-size: 1.5em; font-weight: 600; }
  .noeud strong { font-size: 0.82em; letter-spacing: 0.1em; }
  .noeud small { color: var(--dk-gris); font-size: 0.63em; line-height: 1.25; }
  .noeud.harnais { border-color: var(--dk-accent); background: var(--dk-fond-2); }
  .sortie { align-self: center; border-left: 3px solid var(--dk-accent); padding: 0.25em 0.6em; color: var(--dk-accent); font-size: 0.68em; opacity: 0; transition: opacity 0.3s; }
  @media (max-width: 46rem) { .anatomie-h { grid-template-columns: 1fr; } }
  @media (prefers-reduced-motion: reduce) { .manuel, .noeud, .sortie { transition: none; } }
</style>
