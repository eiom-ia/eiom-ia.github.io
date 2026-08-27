<script>
  import Copier from '../Copier.svelte';
  // Diapositive d'atelier: tout est visible d'emblee. Personne ne doit
  // attendre un clic pendant qu'il tape une commande, et le depannage
  // reste affiche pendant qu'on fait le tour de la salle.
  const CMD = 'curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd';
  const PLATEFORMES = [
    { os: 'macOS et Linux', ou: 'dans le Terminal', cmd: 'curl -fsSL https://antigravity.google/cli/install.sh | bash' },
    { os: 'Windows', ou: 'dans PowerShell', cmd: 'irm https://antigravity.google/cli/install.ps1 | iex' }
  ];
  const PANNES = [
    {
      os: 'macOS',
      cas: [
        ['zsh: command not found: agy', 'Fermez le Terminal et rouvrez-en un neuf. Le raccourci vers <code>agy</code> est écrit dans votre profil, et le terminal ne le lit qu’au démarrage.'],
        ['Toujours rien', 'Tapez <code>export PATH="$HOME/.local/bin:$PATH"</code> — c’est là que le programme a été installé.'],
        ['Où est le Terminal ?', '<b>Cmd + Espace</b>, tapez « Terminal ».']
      ]
    },
    {
      os: 'Windows',
      cas: [
        ["« agy » n’est pas reconnu", 'Fermez PowerShell et rouvrez-en un neuf. Même raison : le chemin n’est lu qu’au démarrage.'],
        ["« irm » n’est pas reconnu", 'Vous êtes dans l’invite de commandes, pas dans PowerShell. Prenez la ligne <code>curl</code> ci-dessus.'],
        ['Où est PowerShell ?', 'Touche <b>Windows</b>, tapez « PowerShell ».']
      ]
    }
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
        <div class="tete"><small>Sous Windows, si PowerShell refuse, dans l'invite de commandes :</small><Copier texte={CMD} /></div>
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

  <section class="pannes">
    <span class="titre">SI ÇA NE MARCHE PAS</span>
    <div class="cols">
      {#each PANNES as p}
        <div class="col">
          <span class="os">{p.os}</span>
          <dl>
            {#each p.cas as [quoi, fix]}
              <dt>{quoi}</dt>
              <dd>{@html fix}</dd>
            {/each}
          </dl>
        </div>
      {/each}
    </div>
    <p class="partout">
      <b>Dans les deux cas :</b> servez-vous du bouton « copier » plutôt que de recopier la
      commande depuis un PDF ou une capture — les tirets et les guillemets s'y transforment en
      caractères que le terminal ne comprend pas. Et sur un portable d'employeur, l'antivirus ou
      le VPN peut bloquer le téléchargement : levez la main.
    </p>
  </section>
</div>

<style>
  .ia { width: 100%; display: flex; flex-direction: column; gap: 0.5em; }
  .etapes { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5em; }
  li { display: grid; grid-template-columns: 1.7em 1fr; gap: 0.6em; align-items: start; }
  .num { display: grid; place-items: center; width: 1.7em; height: 1.7em; color: white; background: var(--dk-accent); font-size: 0.58em; font-weight: 600; }
  .corps { display: flex; flex-direction: column; gap: 0.25em; min-width: 0; }
  .corps > strong { font-size: 0.62em; }
  .plats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5em; }
  .plat { display: flex; flex-direction: column; gap: 0.15em; min-width: 0; }
  .tete { display: flex; align-items: center; justify-content: space-between; gap: 0.6em; }
  .os { color: var(--dk-accent); font-size: 0.47em; letter-spacing: 0.08em; }
  .os i { font-style: normal; color: var(--dk-gris); margin-left: 0.5em; }
  code { display: block; padding: 0.35em 0.5em; background: #0f1214; color: #8de0a9; font-size: 0.46em; line-height: 1.4; word-break: break-all; }
  code.seul { align-self: flex-start; }
  code.gros { font-size: 0.8em; padding: 0.25em 0.8em; color: #ffffff; }
  code.repli { color: #9aa6b2; font-size: 0.4em; }
  small { color: var(--dk-gris); font-size: 0.44em; line-height: 1.4; }
  /* depannage */
  .pannes { border-top: 3px solid var(--dk-encre); padding-top: 0.45em; }
  .titre { display: block; color: #8f1822; font-size: 0.48em; letter-spacing: 0.14em; margin-bottom: 0.35em; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8em; }
  .col .os { display: block; margin-bottom: 0.2em; }
  dl { margin: 0; }
  dt { font-size: 0.44em; font-weight: 600; font-family: var(--dk-mono); }
  dd { margin: 0 0 0.3em; color: var(--dk-gris); font-size: 0.42em; line-height: 1.4; }
  dd :global(code) { display: inline; padding: 0.05em 0.25em; background: var(--dk-fond-2); color: var(--dk-encre); font-size: 1em; }
  dd :global(b) { color: var(--dk-encre); }
  .partout { margin-top: 0.35em; border-left: 0.3em solid #8f1822; padding-left: 0.55em; font-size: 0.44em; line-height: 1.45; }
  .partout b { color: #8f1822; }
</style>
