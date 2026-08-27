<script>
  import Logo from '../Logo.svelte';
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
  const CMD = [
    { logo: 'anthropic', n: 'Claude Code', c: '/usage', p: 'j pour le jour, s pour la semaine' },
    { logo: 'openai', n: 'Codex CLI', c: '/status', p: 'dans la session, pas au terminal' },
    { logo: 'google', n: 'Gemini CLI', c: '/stats', p: 'jetons consommés et plafond' }
  ];
</script>

<div class="lu" bind:this={hote}>
  <div class="horloges" class:vu={!js || e >= 1}>
    <div class="h">
      <span class="lab">FENÊTRE DE 5 HEURES</span>
      <div class="jauge"><i style="width: 78%"></i></div>
      <small>Glissante. Elle se vide toute seule, quelques heures après votre grosse séance.</small>
    </div>
    <div class="h">
      <span class="lab">FENÊTRE DE LA SEMAINE</span>
      <div class="jauge"><i style="width: 34%"></i></div>
      <small>Le vrai plafond. C'est elle qui vous arrête un jeudi après-midi.</small>
    </div>
  </div>

  <div class="cmds" class:vu={!js || e >= 2}>
    {#each CMD as c}
      <div class="cmd">
        <Logo nom={c.logo} alt={c.n} taille="2.1em" />
        <div>
          <span class="nom">{c.n}</span>
          <code>{c.c}</code>
          <small>{c.p}</small>
        </div>
      </div>
    {/each}
  </div>

  <div class="pieges" class:vu={!js || e >= 3}>
    <p><b>Changer de modèle ne remet rien à zéro.</b> La limite est partagée entre tous les
      modèles, et avec l'application web.</p>
    <p><b>Une longue séance consomme même quand vous ne tapez rien.</b> Tout l'historique
      repart à chaque requête. <code>/clear</code> entre deux sujets ne coûte rien.</p>
  </div>
</div>

<style>
  .lu { width: 100%; display: flex; flex-direction: column; gap: 0.75em; }
  .horloges { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .h { display: flex; flex-direction: column; gap: 0.25em; }
  .lab { color: var(--dk-accent); font-size: 0.56em; letter-spacing: 0.12em; }
  .jauge { height: 1.5em; border: 3px solid var(--dk-encre); background: var(--dk-fond-2); }
  .jauge i { display: block; height: 100%; background: var(--dk-accent); }
  .h small { color: var(--dk-gris); font-size: 0.54em; line-height: 1.4; }
  .cmds { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7em; opacity: 0; transform: translateY(0.35em); transition: opacity 0.3s, transform 0.3s; }
  .cmd { border: 3px solid var(--dk-encre); padding: 0.55em 0.6em; display: grid; grid-template-columns: auto 1fr; gap: 0.55em; align-items: center; }
  .cmd div { display: flex; flex-direction: column; gap: 0.06em; min-width: 0; }
  .nom { color: var(--dk-gris); font-size: 0.5em; letter-spacing: 0.06em; }
  .cmd code { align-self: flex-start; padding: 0.12em 0.4em; background: var(--dk-encre); color: #8de0a9; font-size: 0.78em; }
  .cmd small { color: var(--dk-gris); font-size: 0.44em; line-height: 1.3; }
  .pieges { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8em; opacity: 0; transition: opacity 0.3s; }
  .pieges p { margin: 0; border-left: 0.3em solid #8f1822; padding-left: 0.6em; font-size: 0.56em; line-height: 1.45; }
  .pieges b { color: #8f1822; }
  .vu { opacity: 1 !important; transform: none !important; }
  @media (prefers-reduced-motion: reduce) { .horloges, .cmds, .pieges { transition: none; } }
</style>
