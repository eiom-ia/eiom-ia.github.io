<script>
  import donnees from './classifieur.json';

  /**
   * Le geste de la semaine, animé pour de vrai: une puce unique fait le tour
   * du circuit. Elle se détache de la cellule de texte, descend dans le quai
   * du PROMPT, glisse jusqu'à l'API, arrive à RÉPONSE où son contenu DEVIENT
   * la valeur classée, puis remonte se poser dans la colonne sentiment.
   *
   * Un seul objet en mouvement, et sa transformation visible au passage de
   * l'API: c'est ça qu'on veut faire comprendre, pas une suite d'états.
   *
   * Les lignes viennent de classifieur.json, engendré depuis le vrai
   * avis_exemple.csv. Un test échoue si les deux divergent.
   *
   * Le JSON montré a la forme qu'impose le schéma enseigné; ce n'est pas la
   * sortie mesurée d'un appel réel.
   */
  const L = donnees.lignes;

  const PHASES = [
    { id: 'lire', ms: 1000, t: 'Lire la cellule' },
    { id: 'prompt', ms: 1500, t: 'Coller le texte dans un prompt' },
    { id: 'appel', ms: 1400, t: "Envoyer à l'API" },
    { id: 'json', ms: 1500, t: 'Recevoir la réponse, en JSON' },
    { id: 'ecrire', ms: 1300, t: 'Écrire la valeur dans la cellule' }
  ];
  const MS_CREER = 1900;
  // Un temps terminal après la dernière écriture: sans lui, la valeur de la
  // dernière ligne n'est jamais considérée comme posée, et le rendu statique
  // montre un tableau incomplet.
  const TOTAL = 1 + L.length * PHASES.length + 1;

  let hote = $state(null);
  let puce = $state(null);
  let cellulesTexte = $state([]);
  let cellulesCible = $state([]);
  let quaiPrompt = $state(null);
  let quaiApi = $state(null);
  let quaiRep = $state(null);

  let js = $state(false);
  let e = $state(TOTAL - 1); // sans JS: tableau terminé, puce masquée
  let etat = $state('arret');
  let pos = $state(null); // {x, y} en pixels du conteneur
  let saut = $state(false); // vrai quand on se replace sans transition

  const creation = $derived(e === 0);
  const terminal = $derived(e === TOTAL - 1);
  const iLigne = $derived(creation || terminal ? -1 : Math.floor((e - 1) / PHASES.length));
  const phase = $derived(creation || terminal ? null : PHASES[(e - 1) % PHASES.length]);
  const ligne = $derived(iLigne >= 0 && iLigne < L.length ? L[iLigne] : null);

  // Une cellule reste remplie à partir du temps qui suit son ÉCRIRE.
  const remplie = (i) => e >= i * PHASES.length + PHASES.length + 1;

  // Ce que la puce transporte: le texte tant qu'on monte vers l'API, la
  // valeur classée une fois la réponse reçue.
  const charge = $derived(
    !ligne
      ? ''
      : phase?.id === 'json' || phase?.id === 'ecrire'
        ? ligne.sentiment
        : ligne.texte
  );
  const valeur = $derived(phase?.id === 'json' || phase?.id === 'ecrire');

  const quai = () => {
    if (!phase) return null;
    if (phase.id === 'lire') return cellulesTexte[iLigne];
    if (phase.id === 'prompt') return quaiPrompt;
    if (phase.id === 'appel') return quaiApi;
    if (phase.id === 'json') return quaiRep;
    return cellulesCible[iLigne];
  };

  // On mesure à chaque changement de phase, jamais une seule fois au montage:
  // ajuster.mjs peut écrire un facteur d'échelle sur la diapo et le zoom du
  // deck change à l'exécution. Des coordonnées mises en cache seraient justes
  // à la capture et fausses au projecteur.
  function placer(sansTransition = false) {
    const cible = quai();
    if (!hote || !puce || !cible) return;
    const h = hote.getBoundingClientRect();
    const c = cible.getBoundingClientRect();
    const p = puce.getBoundingClientRect();
    saut = sansTransition;
    pos = {
      x: c.left - h.left + c.width / 2 - p.width / 2,
      y: c.top - h.top + c.height / 2 - p.height / 2
    };
    if (sansTransition) requestAnimationFrame(() => (saut = false));
  }

  // La phase « lire » est une apparition, pas un déplacement: on s'y pose
  // sans transition, sinon la puce vient en glissant depuis la position
  // précédente, ce qui raconte un trajet qui n'existe pas.
  $effect(() => {
    if (!js) return;
    e;
    requestAnimationFrame(() => placer(phase?.id === 'lire' || creation));
  });

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return;

    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);
    let minuteur = 0;

    const duree = (n) => (n === 0 ? MS_CREER : PHASES[(n - 1) % PHASES.length].ms);

    function pas() {
      if (etat !== 'joue') return;
      if (e >= TOTAL - 1) {
        etat = 'fini';
        return;
      }
      e += 1;
      minuteur = setTimeout(pas, duree(e));
    }

    function demarrer(depuisZero) {
      if (depuisZero) e = 0;
      etat = 'joue';
      clearTimeout(minuteur);
      minuteur = setTimeout(pas, duree(e));
    }

    function basculer() {
      if (etat === 'joue') {
        etat = 'pause';
        clearTimeout(minuteur);
      } else demarrer(etat === 'fini');
    }

    diapo.addEventListener('click', basculer);

    // Le zoom du deck et un redimensionnement invalident les rectangles
    // mesurés: on se replace sans transition plutôt que de dériver.
    const ro = new ResizeObserver(() => placer(true));
    ro.observe(hote);

    let ici = false;
    function verifier() {
      const y = Math.round(deck.scrollTop / deck.clientHeight) === monIndex;
      if (y && !ici) {
        ici = true;
        demarrer(true);
      } else if (!y && ici) {
        ici = false;
        etat = 'arret';
        clearTimeout(minuteur);
        e = 0;
      }
    }

    deck.addEventListener('scroll', verifier, { passive: true });
    verifier();
    const t0 = setTimeout(verifier, 350);

    return () => {
      deck.removeEventListener('scroll', verifier);
      diapo.removeEventListener('click', basculer);
      ro.disconnect();
      clearTimeout(t0);
      clearTimeout(minuteur);
    };
  });
</script>

<div class="clf" bind:this={hote}>
  <div class="clf-tete">
    <span class="pas-t">
      {#if creation}Créer la colonne qui va recevoir les données
      {:else if terminal}La colonne est remplie, ligne par ligne
      {:else}{phase?.t}{/if}
    </span>
    <span class="src">{donnees.fichier} · {donnees.total} lignes</span>
  </div>

  <table class="clf-t">
    <thead>
      <tr>
        {#each donnees.colonnes as c}<th>{c}</th>{/each}
        <th class="neuve">sentiment</th>
      </tr>
    </thead>
    <tbody>
      {#each L as l, i}
        <tr class:active={i === iLigne}>
          <td class="mono">{l.id}</td>
          <td class="txt"><span bind:this={cellulesTexte[i]} class="cellule">{l.texte}</span></td>
          <td class="num">{l.note}</td>
          <td class="cible">
            <span bind:this={cellulesCible[i]} class="cellule cible-in">
              {#if remplie(i)}<span class="val">{l.sentiment}</span>{/if}
            </span>
          </td>
        </tr>
      {/each}
      <tr class="reste">
        <td class="mono">…</td>
        <td class="txt">{donnees.total - L.length} autres lignes</td>
        <td class="num">…</td>
        <td class="cible"></td>
      </tr>
    </tbody>
  </table>

  <div class="stations">
    <div class="st" class:on={phase?.id === 'prompt'}>
      <span class="st-n">PROMPT</span>
      <span class="st-d">Classe le sentiment. Réponds selon le schéma.</span>
      <span class="quai" bind:this={quaiPrompt}></span>
    </div>
    <span class="fl">▸</span>
    <div class="st" class:on={phase?.id === 'appel'}>
      <span class="st-n">API</span>
      <span class="st-d">gpt-4o-mini · temperature 0</span>
      <span class="quai" bind:this={quaiApi}></span>
    </div>
    <span class="fl">▸</span>
    <div class="st" class:on={phase?.id === 'json'}>
      <span class="st-n">RÉPONSE</span>
      <span class="st-d">&#123; "sentiment": … &#125;</span>
      <span class="quai" bind:this={quaiRep}></span>
    </div>
  </div>

  <span
    class="puce"
    class:vis={js && !!phase}
    class:saut
    class:val={valeur}
    bind:this={puce}
    style={pos ? `transform: translate(${pos.x}px, ${pos.y}px)` : ''}
  >
    {charge}
  </span>
</div>

<style>
  .clf {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }

  .clf-tete {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
    border-bottom: 2px solid var(--dk-encre);
    padding-bottom: 0.3em;
  }
  .pas-t {
    font-size: 0.84em;
    font-weight: 600;
    color: var(--dk-accent);
  }
  .src {
    font-size: 0.66em;
    color: var(--dk-gris);
    white-space: nowrap;
  }

  .clf-t {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.66em;
    table-layout: fixed;
  }
  .clf-t th {
    text-align: left;
    font-weight: 600;
    color: var(--dk-gris);
    border-bottom: 2px solid var(--dk-filet);
    padding: 0.25em 0.5em;
    white-space: nowrap;
  }
  .clf-t th.neuve {
    color: var(--dk-accent);
    border-bottom-color: var(--dk-accent);
  }
  .clf-t td {
    padding: 0.28em 0.5em;
    border-bottom: 1px solid var(--dk-filet);
  }
  .clf-t th:nth-child(1),
  .clf-t td:nth-child(1) {
    width: 12%;
  }
  .clf-t th:nth-child(2),
  .clf-t td:nth-child(2) {
    width: 42%;
  }
  .clf-t th:nth-child(3),
  .clf-t td:nth-child(3) {
    width: 20%;
    text-align: center;
  }
  .clf-t th:nth-child(4),
  .clf-t td:nth-child(4) {
    width: 26%;
  }

  .cellule {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cible-in {
    min-height: 1.3em;
  }
  .clf-t td.mono,
  .clf-t td.num {
    color: var(--dk-gris);
  }
  .clf-t tr.active td {
    background: var(--dk-fond-2);
  }
  /* La cellule se vide visuellement pendant que sa puce voyage: on voit que
     c'est bien SON contenu qui est parti. */
  .clf-t tr.active td.txt .cellule {
    opacity: 0.25;
  }
  .clf-t tr.reste td {
    color: var(--dk-gris-2);
    border-bottom: none;
  }
  .cible .val {
    color: var(--dk-accent);
    font-weight: 600;
  }

  .stations {
    display: flex;
    align-items: stretch;
    gap: 0.5em;
  }
  .st {
    flex: 1;
    border: 2px solid var(--dk-filet);
    padding: 0.4em 0.6em 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.15em;
    min-width: 0;
  }
  .st.on {
    border-color: var(--dk-accent);
  }
  .st-n {
    font-size: 0.6em;
    letter-spacing: 0.14em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  .st.on .st-n {
    color: var(--dk-accent);
  }
  .st-d {
    font-size: 0.58em;
    color: var(--dk-gris-2);
    line-height: 1.3;
    min-height: 2.4em;
  }
  /* Le quai: la place exacte où la puce vient se poser. */
  .quai {
    display: block;
    height: 1.7em;
    border: 1px dashed var(--dk-filet);
  }
  .st.on .quai {
    border-color: var(--dk-accent);
  }
  .fl {
    align-self: center;
    color: var(--dk-gris-2);
    font-size: 0.8em;
  }

  .puce {
    position: absolute;
    left: 0;
    top: 0;
    max-width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.62em;
    padding: 0.3em 0.6em;
    border: 2px solid var(--dk-accent);
    background: var(--dk-fond);
    color: var(--dk-accent);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.62s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s linear;
  }
  .puce.vis {
    opacity: 1;
  }
  /* Un replacement après zoom ou redimensionnement ne doit pas se lire comme
     un trajet: on coupe la transition le temps du saut. */
  .puce.saut {
    transition: none;
  }
  .puce.val {
    background: var(--dk-accent);
    color: var(--dk-fond);
    font-weight: 600;
    max-width: 22%;
  }

  @media (prefers-reduced-motion: reduce) {
    .puce {
      transition: opacity 0.2s linear;
    }
  }
</style>
