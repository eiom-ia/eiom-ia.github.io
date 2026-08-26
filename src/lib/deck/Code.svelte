<script>
  import { surlignerR } from './surligner.js';

  // brut : le bloc n'est pas du R. La coloration traiterait la prose
  // française comme du code — nombres, deux-points et tirets colorés au
  // hasard. Par défaut inchangé, donc les autres decks ne bougent pas.
  let { src, titre = '', petit = false, brut = false } = $props();

  let js = $state(false);
  let etat = $state('pret'); // 'pret' | 'copie' | 'echec'
  let minuteur = 0;

  $effect(() => {
    js = true;
    return () => clearTimeout(minuteur);
  });

  async function copier(ev) {
    // Certaines diapositives avancent leur animation au clic n'importe où:
    // le bouton ne doit pas les faire avancer en même temps.
    ev.stopPropagation();

    const texte = src.trim();
    let ok = false;

    // navigator.clipboard exige un contexte sécurisé. Le deck est prévu pour
    // être projeté depuis un fichier local, où il peut manquer: on retombe
    // alors sur la vieille méthode, qui marche partout.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(texte);
        ok = true;
      }
    } catch {
      ok = false;
    }

    if (!ok) {
      try {
        const z = document.createElement('textarea');
        z.value = texte;
        z.setAttribute('readonly', '');
        z.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        document.body.appendChild(z);
        z.select();
        ok = document.execCommand('copy');
        document.body.removeChild(z);
      } catch {
        ok = false;
      }
    }

    etat = ok ? 'copie' : 'echec';
    clearTimeout(minuteur);
    minuteur = setTimeout(() => (etat = 'pret'), 1600);
  }
</script>

<figure class="bloc-code" class:petit>
  {#if titre}<figcaption>{titre}</figcaption>{/if}
  <div class="enveloppe">
    <pre><code>{#if brut}{src.trim()}{:else}{@html surlignerR(src.trim())}{/if}</code></pre>
    {#if js}
      <button
        class="copier"
        class:fait={etat === 'copie'}
        class:rate={etat === 'echec'}
        type="button"
        onclick={copier}
        aria-label="Copier le code"
      >
        {etat === 'copie' ? 'copié' : etat === 'echec' ? 'échec' : 'copier'}
      </button>
    {/if}
  </div>
</figure>
