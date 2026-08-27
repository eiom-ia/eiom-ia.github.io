<div class="dc">
  <div class="fenetre"><strong>UNE TÂCHE GÉANTE</strong><div><span style="width: 23%">demande</span><span style="width: 31%">outils</span><span style="width: 38%">résultats</span></div><p>La fenêtre grandit, mais une longue boucle finit toujours par accumuler du bruit.</p></div>
  <div class="coupe"><span>÷</span><strong>DÉCOUPER</strong></div>
  <div class="graphe">
    <div class="bead a"><b>BD-1</b><span>collecter</span></div><i>→</i><div class="bead b"><b>BD-2</b><span>nettoyer</span></div><i>→</i><div class="bead c"><b>BD-3</b><span>analyser</span></div><i>→</i><div class="bead d"><b>BD-4</b><span>vérifier</span></div>
  </div>
  <div class="cycle"><code>bd create</code><span>→</span><code>bd ready</code><span>→</span><code>bd close</code></div>
  <p class="idee"><strong>C’est exactement ce que fait beads,</strong> vu tantôt : un graphe de petites tâches persistantes. Chaque agent prend un problème fermé, le termine, puis libère le suivant.</p>
</div>

<style>
  .dc { display: grid; grid-template-columns: 1fr auto 1.6fr; gap: 0.7em; align-items: center; width: 100%; }
  .fenetre { border: 3px solid var(--dk-encre); padding: 0.65em; }.fenetre > strong { color: var(--dk-accent); font-size: 0.63em; }.fenetre > div { height: 2.4em; display: flex; margin: 0.5em 0; border: 2px solid var(--dk-encre); background: var(--dk-fond-2); overflow: hidden; }.fenetre span { display: grid; place-items: center; color: white; background: var(--dk-accent); border-right: 2px solid white; font-size: 0.45em; }.fenetre p { color: var(--dk-gris); font-size: 0.52em; line-height: 1.3; }
  .coupe { color: var(--dk-accent); display: flex; flex-direction: column; text-align: center; }.coupe span { font-size: 2em; }.coupe strong { font-size: 0.52em; }
  .graphe { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 0.25em; align-items: center; }.graphe i { color: var(--dk-accent); font-style: normal; }
  .bead { min-height: 4em; border: 3px solid var(--dk-accent); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }.bead b { font-size: 0.6em; }.bead span { font-size: 0.45em; }
  .cycle { grid-column: 3; display: flex; align-items: center; justify-content: center; gap: 0.35em; }.cycle code { border: 1px solid var(--dk-encre); font-size: 0.54em; }.cycle span { color: var(--dk-accent); }
  .idee { grid-column: 1 / -1; border-top: 3px solid var(--dk-encre); padding-top: 0.5em; font-size: 0.75em; }
</style>
