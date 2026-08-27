<script>
  // Diapositive d'atelier: tout est visible d'emblee. Personne ne doit
  // attendre un clic pendant qu'il tape une commande.
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
              <span class="os">{p.os}<i>{p.ou}</i></span>
              <code>{p.cmd}</code>
            </div>
          {/each}
        </div>
        <small>Sous Windows, si PowerShell refuse, dans l'invite de commandes :</small>
        <code class="repli">curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd &amp;&amp; install.cmd</code>
      </div>
    </li>

    <li>
      <span class="num">2</span>
      <div class="corps">
        <strong>Ouvrir un terminal neuf, puis aller dans le dossier du projet</strong>
        <code class="seul">cd ~/Documents/eiom</code>
      </div>
    </li>

    <li>
      <span class="num">3</span>
      <div class="corps">
        <strong>Lancer</strong>
        <code class="seul gros">agy</code>
        <small>Le navigateur s'ouvre pour la connexion Google. Ensuite, la session est retenue
          dans le trousseau du système.</small>
      </div>
    </li>
  </ol>

  <p class="src">antigravity.google/docs/cli/install · relevé le 27 août 2026</p>
</div>

<style>
  .ia { width: 100%; display: flex; flex-direction: column; gap: 0.5em; }
  .etapes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.7em; }
  li { display: grid; grid-template-columns: 1.9em 1fr; gap: 0.7em; align-items: start; }
  .num { display: grid; place-items: center; width: 1.9em; height: 1.9em; color: white; background: var(--dk-accent); font-size: 0.62em; font-weight: 600; }
  .corps { display: flex; flex-direction: column; gap: 0.3em; min-width: 0; }
  .corps > strong { font-size: 0.66em; }
  .plats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5em; }
  .plat { display: flex; flex-direction: column; gap: 0.2em; min-width: 0; }
  .os { color: var(--dk-accent); font-size: 0.5em; letter-spacing: 0.08em; }
  .os i { font-style: normal; color: var(--dk-gris); margin-left: 0.5em; }
  code { display: block; padding: 0.45em 0.6em; background: #0f1214; color: #8de0a9; font-size: 0.5em; line-height: 1.4; word-break: break-all; }
  code.seul { align-self: flex-start; }
  code.gros { font-size: 0.9em; padding: 0.35em 0.9em; color: #ffffff; }
  code.repli { color: #9aa6b2; font-size: 0.44em; }
  small { color: var(--dk-gris); font-size: 0.47em; line-height: 1.45; }
  .src { border-top: 2px solid var(--dk-filet); padding-top: 0.35em; color: var(--dk-gris); font-size: 0.44em; }
</style>
