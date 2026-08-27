<script>
  // Le depannage vit sur sa propre diapositive: sur celle de l'installation,
  // il fallait le composer si petit que personne ne le lisait du fond de la
  // salle. Ici tout est gros, et la diapositive reste affichee pendant qu'on
  // fait le tour des postes.
  const PANNES = [
    {
      os: 'macOS',
      cas: [
        ['zsh: command not found: agy', 'Fermez le Terminal et rouvrez-en un neuf. Le raccourci est écrit dans votre profil, et le terminal ne le lit qu’au démarrage.'],
        ['Toujours rien', 'Tapez <code>export PATH="$HOME/.local/bin:$PATH"</code> — c’est là que le programme s’installe.'],
        ['Où est le Terminal ?', '<b>Cmd + Espace</b>, puis tapez « Terminal ».']
      ]
    },
    {
      os: 'Windows',
      cas: [
        ["« agy » n’est pas reconnu", 'Fermez PowerShell et rouvrez-en un neuf. Même raison : le chemin n’est lu qu’au démarrage.'],
        ["« irm » n’est pas reconnu", 'Vous êtes dans l’invite de commandes, pas dans PowerShell. Prenez la ligne <code>curl</code>.'],
        ['Où est PowerShell ?', 'Touche <b>Windows</b>, puis tapez « PowerShell ».']
      ]
    }
  ];
</script>

<div class="dp">
  <div class="cols">
    {#each PANNES as p}
      <section>
        <h3>{p.os}</h3>
        <dl>
          {#each p.cas as [quoi, fix]}
            <dt>{quoi}</dt>
            <dd>{@html fix}</dd>
          {/each}
        </dl>
      </section>
    {/each}
  </div>

  <p class="partout">
    <b>Dans les deux cas :</b> servez-vous du bouton « copier » plutôt que de recopier la commande
    depuis une capture — les tirets et les guillemets s'y transforment en caractères que le
    terminal ne comprend pas. Et sur un portable d'employeur, l'antivirus ou le VPN peut bloquer
    le téléchargement : levez la main.
  </p>
</div>

<style>
  .dp { width: 100%; display: flex; flex-direction: column; gap: 0.8em; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1em; }
  section h3 { margin: 0 0 0.45em; color: var(--dk-accent); font-size: 0.78em; letter-spacing: 0.08em; }
  dl { margin: 0; }
  dt { font-family: var(--dk-mono); font-size: 0.64em; font-weight: 600; margin-top: 0.5em; }
  dt:first-of-type { margin-top: 0; }
  dd { margin: 0.12em 0 0; color: var(--dk-gris); font-size: 0.6em; line-height: 1.5; }
  dd :global(code) { display: inline; padding: 0.06em 0.3em; background: var(--dk-fond-2); color: var(--dk-encre); font-size: 1em; }
  dd :global(b) { color: var(--dk-encre); }
  .partout { border-left: 0.35em solid #8f1822; padding-left: 0.7em; font-size: 0.62em; line-height: 1.5; }
  .partout b { color: #8f1822; }
</style>
