<script>
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
</script>

<div class="cj" bind:this={hote}>
  <div class="modes">
    <section class="acte" class:vu={!js || e >= 1}>
      <header><span class="tag">À L'ACTE</span><small>l'API, au jeton</small></header>
      <div class="prix">
        <div><b>5 $</b><span>par million de jetons en entrée</span></div>
        <div><b>25 $</b><span>en sortie — cinq fois plus cher</span></div>
      </div>
      <ul>
        <li>Vous payez exactement ce que vous consommez.</li>
        <li><strong>Aucun plafond.</strong> Une boucle qui s'emballe vous coûte vraiment cher.</li>
        <li>Le bon choix pour passer un corpus entier, en lot, sans surveiller.</li>
      </ul>
      <small class="ref">Claude Opus 5, tarif du 27 août 2026.</small>
    </section>

    <section class="forfait" class:vu={!js || e >= 2}>
      <header><span class="tag bleu">AU FORFAIT</span><small>l'abonnement</small></header>
      <div class="prix">
        <div><b>20 $</b><span>par mois — Claude Pro, harnais inclus</span></div>
        <div><b>100 $</b><span>et plus — Max, 5× à 20× l'usage de Pro</span></div>
      </div>
      <ul>
        <li>Prix fixe, quoi que vous fassiez de votre journée.</li>
        <li><strong>C'est subventionné.</strong> Une journée d'agent en continu dépasse vite 20 $ de jetons.</li>
        <li>En échange : des limites d'usage, et rien à automatiser à grande échelle.</li>
      </ul>
      <small class="ref">Grille Claude, relevée le 27 août 2026.</small>
    </section>
  </div>

  <div class="cache" class:vu={!js || e >= 3}>
    <div class="pourquoi">
      <strong>POURQUOI LE CACHE CHANGE TOUT</strong>
      <span>L'API n'a pas de mémoire : à chaque tour, l'agent renvoie <em>tout</em> l'historique. Le
        cache garde le début déjà lu, au lieu de le refacturer plein tarif.</span>
    </div>
    <div class="chiffres">
      <div><b>1,25 ×</b><span>écrire dans le cache, une seule fois</span></div>
      <div class="fort"><b>0,1 ×</b><span>chaque relecture ensuite</span></div>
      <div class="casse"><b>⚠</b><span>changer un seul caractère au début invalide tout ce qui suit</span></div>
    </div>
  </div>
</div>

<style>
  .cj { width: 100%; display: flex; flex-direction: column; gap: 0.6em; }
  .modes { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7em; }
  section { border: 3px solid var(--dk-encre); padding: 0.6em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .forfait { border-width: 4px; border-color: var(--dk-accent); }
  header { display: flex; align-items: baseline; gap: 0.45em; margin-bottom: 0.45em; }
  .tag { padding: 0.16em 0.45em; color: white; background: var(--dk-gris); font-size: 0.46em; letter-spacing: 0.12em; }
  .tag.bleu { background: var(--dk-accent); }
  header small { color: var(--dk-gris); font-size: 0.48em; }
  .prix { display: flex; gap: 0.8em; margin-bottom: 0.4em; }
  .prix div { display: flex; flex-direction: column; }
  .prix b { color: var(--dk-accent); font-size: 0.85em; line-height: 1.1; }
  .prix span { color: var(--dk-gris); font-size: 0.44em; line-height: 1.25; max-width: 9em; }
  ul { margin: 0; padding-left: 1em; }
  li { font-size: 0.5em; line-height: 1.4; margin-bottom: 0.12em; }
  .ref { display: block; margin-top: 0.35em; color: var(--dk-gris-2); font-size: 0.4em; }
  .cache { border: 3px solid var(--dk-encre); background: var(--dk-fond-2); padding: 0.6em; display: grid; grid-template-columns: 1.15fr 1.35fr; gap: 0.7em; align-items: center; opacity: 0; transition: opacity 0.3s; }
  .pourquoi strong { display: block; color: var(--dk-accent); font-size: 0.5em; letter-spacing: 0.11em; margin-bottom: 0.2em; }
  .pourquoi span { font-size: 0.5em; line-height: 1.4; }
  .chiffres { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5em; }
  .chiffres div { border-left: 3px solid var(--dk-gris-2); padding-left: 0.45em; display: flex; flex-direction: column; }
  .chiffres b { font-size: 0.72em; }
  .chiffres span { color: var(--dk-gris); font-size: 0.44em; line-height: 1.3; }
  .chiffres .fort { border-left-color: var(--dk-accent); }
  .chiffres .fort b { color: var(--dk-accent); }
  .chiffres .casse b { color: #8f1822; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { section, .cache { transition: none; } }
</style>
