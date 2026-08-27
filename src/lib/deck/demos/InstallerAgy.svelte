<script>
  // Diapositive d'atelier: tout est visible d'emblee. Personne ne doit
  // attendre un clic pendant qu'il tape une commande.
  import Copier from '../Copier.svelte';
  const CMD = 'curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd';
  const PLATEFORMES = [
    { os: 'macOS et Linux', ou: 'dans le Terminal', cmd: 'curl -fsSL https://antigravity.google/cli/install.sh | bash' },
    { os: 'Windows', ou: 'dans PowerShell', cmd: 'irm https://antigravity.google/cli/install.ps1 | iex' }
  ];
</script>

<div class="ia">
  <ol class="etapes">
    <li>
      <span class="num">1</span>
      <div class="corps">
        <strong>Installer</strong>
        <div class="plats">
          {#each PLATEFORMES as p}
            <div class="plat">
              <div class="tete"><span class="os">{p.os}<i>{p.ou}</i></span><Copier texte={p.cmd} /></div>
              <code>{p.cmd}</code>
            </div>
          {/each}
        </div>
        <div class="tete repli-tete">
          <small>Sous Windows, si PowerShell refuse, dans l'invite de commandes :</small>
          <Copier texte={CMD} />
        </div>
        <code class="repli">{CMD}</code>
      </div>
    </li>

    <li>
      <span class="num">2</span>
      <div class="corps">
        <div class="tete"><strong>Lancer</strong><Copier texte="agy" /></div>
        <code class="seul gros">agy</code>
        <small>Le navigateur s'ouvre pour la connexion Google. Ensuite, la session est retenue
          dans le trousseau du système.</small>
      </div>
    </li>
  </ol>

  <p class="src">antigravity.google/docs/cli/install · relevé le 27 août 2026</p>
</div>

<style>
  .ia { width: 100%; display: flex; flex-direction: column; gap: 0.7em; }
  .etapes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.9em; }
  li { display: grid; grid-template-columns: 2.2em 1fr; gap: 0.8em; align-items: start; }
  .num { display: grid; place-items: center; width: 2.2em; height: 2.2em; color: white; background: var(--dk-accent); font-size: 0.75em; font-weight: 600; }
  .corps { display: flex; flex-direction: column; gap: 0.35em; min-width: 0; }
  .corps > strong { font-size: 0.86em; }
  .plats { display: flex; flex-direction: column; gap: 0.5em; }
  .plat { display: flex; flex-direction: column; gap: 0.22em; min-width: 0; }
  .tete { display: flex; align-items: center; justify-content: space-between; gap: 0.6em; }
  .repli-tete { margin-top: 0.25em; }
  .os { color: var(--dk-accent); font-size: 0.62em; letter-spacing: 0.06em; }
  .os i { font-style: normal; color: var(--dk-gris); margin-left: 0.5em; }
  code { display: block; padding: 0.45em 0.65em; background: #0f1214; color: #8de0a9; font-size: 0.62em; line-height: 1.45; white-space: nowrap; overflow-x: auto; }
  code.seul { align-self: flex-start; }
  code.gros { font-size: 1.35em; padding: 0.3em 1em; color: #ffffff; }
  code.repli { color: #9aa6b2; font-size: 0.55em; }
  small { color: var(--dk-gris); font-size: 0.6em; line-height: 1.45; }
  .src { border-top: 2px solid var(--dk-filet); padding-top: 0.4em; color: var(--dk-gris); font-size: 0.52em; }
</style>
