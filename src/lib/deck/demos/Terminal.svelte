<script>
  /**
   * Un terminal qui se remplit sous les yeux de la salle.
   *
   * C'est la seule diapositive du deck où l'animation EST le sujet: on
   * explique ce qu'est une invite de commande à des gens qui n'en ont jamais
   * ouvert. Montrer une capture figée aurait raté le geste.
   *
   * Un clic tape la commande suivante, caractère par caractère, puis affiche
   * sa sortie. En mouvement réduit, tout paraît d'un coup.
   */
  import { brancherTemps } from '../temps.js';

  let { lignes = [], invite = '~/projet-these' } = $props();

  let js = $state(false);
  let e = $state(lignes.length);
  let tape = $state(0); // caractères tapés de la commande en cours
  let hote = $state(null);
  let minuteur = 0;

  // La commande en cours de frappe est la dernière révélée.
  const enFrappe = $derived(js && e > 0 && tape < (lignes[e - 1]?.cmd.length ?? 0));

  function taper(i) {
    clearInterval(minuteur);
    const cmd = lignes[i]?.cmd ?? '';
    tape = 0;
    const reduit = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduit) {
      tape = cmd.length;
      return;
    }
    minuteur = setInterval(() => {
      tape += 1;
      if (tape >= cmd.length) clearInterval(minuteur);
    }, 26);
  }

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    tape = 0;
    const debrancher = brancherTemps(hote, {
      total: lignes.length,
      lire: () => e,
      ecrire: (v) => {
        e = v;
        if (v > 0) taper(v - 1);
        else {
          clearInterval(minuteur);
          tape = 0;
        }
      }
    });
    return () => {
      clearInterval(minuteur);
      debrancher();
    };
  });
</script>

<div class="trmn" bind:this={hote}>
  <div class="trmn-cadre">
    <div class="trmn-barre">
      <span class="trmn-titre">{invite}</span>
    </div>
    <pre class="trmn-corps">{#each lignes as l, i}{#if !js || i < e}<span class="trmn-inv">$</span> <span
            class="trmn-cmd">{!js || i < e - 1 ? l.cmd : l.cmd.slice(0, tape)}</span
          >{#if js && i === e - 1 && enFrappe}<span class="trmn-cur"></span>{/if}
{#if !js || i < e - 1 || !enFrappe}<span class="trmn-out">{l.out}</span>
{/if}{/if}{/each}{#if js && e === 0}<span class="trmn-inv">$</span> <span class="trmn-cur"
        ></span>{/if}</pre>
  </div>
</div>

<style>
  .trmn {
    width: 100%;
  }
  .trmn-cadre {
    border: 2px solid var(--dk-encre);
    background: var(--dk-fond-2);
  }
  .trmn-barre {
    display: flex;
    align-items: center;
    gap: 0.7em;
    padding: 0.35em 0.7em;
    border-bottom: 2px solid var(--dk-encre);
  }
  .trmn-titre {
    font-size: 0.66em;
    letter-spacing: 0.14em;
    color: var(--dk-gris);
  }
  .trmn-corps {
    margin: 0;
    padding: 0.8em 1em 1em;
    font-size: 0.78em;
    line-height: 1.65;
    white-space: pre-wrap;
    min-height: 9.5em;
  }
  .trmn-inv {
    color: var(--dk-accent);
    font-weight: 600;
  }
  .trmn-cmd {
    color: var(--dk-encre);
    font-weight: 600;
  }
  .trmn-out {
    color: var(--dk-gris);
  }
  .trmn-cur {
    display: inline-block;
    width: 0.6em;
    height: 1.05em;
    background: var(--dk-accent);
    vertical-align: -0.18em;
    animation: trmn-clign 1s steps(2, start) infinite;
  }
  @keyframes trmn-clign {
    to {
      opacity: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .trmn-cur {
      animation: none;
    }
  }
</style>
