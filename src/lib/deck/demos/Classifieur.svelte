<script>
  import donnees from './classifieur.json';
  import { surlignerR } from '../surligner.js';

  /**
   * Le geste de la semaine, animé: une puce unique fait le tour du circuit.
   * Elle se détache de la cellule, se pose dans le quai du PROMPT, glisse
   * jusqu'à l'API, revient à RÉPONSE sous forme de JSON, s'y réduit à la
   * seule valeur — c'est l'analyse du JSON —, puis remonte se poser dans la
   * colonne sentiment.
   *
   * Sous le circuit, la ligne de R qui fait exactement l'opération en cours.
   * Le geste et son code, côte à côte, au même instant.
   *
   * Rien ne se joue tout seul: un clic sur la diapositive avance d'un temps.
   * C'est un support de cours, la cadence appartient à la personne qui parle.
   *
   * Les lignes viennent de classifieur.json, engendré depuis le vrai
   * avis_exemple.csv. Un test échoue si les deux divergent.
   *
   * Le JSON montré a la forme qu'impose le schéma enseigné; ce n'est pas la
   * sortie mesurée d'un appel réel.
   */
  const L = donnees.lignes;

  const PHASES = [
    { id: 'lire', t: 'Lire la cellule' },
    { id: 'prompt', t: 'Coller le texte dans un prompt' },
    { id: 'appel', t: "Envoyer à l'API" },
    { id: 'json', t: 'Recevoir la réponse, en JSON' },
    { id: 'parse', t: 'Extraire la valeur du JSON' },
    { id: 'ecrire', t: 'Écrire la valeur dans la cellule' }
  ];
  // Deux temps avant la boucle: le classeur tel quel, puis la colonne créée.
  // Un temps terminal après la dernière écriture.
  const TOTAL = 2 + L.length * PHASES.length + 1;

  let hote = $state(null);
  let puce = $state(null);
  let cellulesTexte = $state([]);
  let cellulesCible = $state([]);
  let quaiPrompt = $state(null);
  let quaiApi = $state(null);
  let quaiRep = $state(null);

  let js = $state(false);
  let e = $state(TOTAL - 1); // sans JS: tableau terminé, puce masquée
  let pos = $state(null);
  let saut = $state(false);

  const initial = $derived(e === 0);
  const creation = $derived(e === 1);
  const terminal = $derived(e === TOTAL - 1);
  const enCours = $derived(e >= 2 && e < TOTAL - 1);
  const iLigne = $derived(enCours ? Math.floor((e - 2) / PHASES.length) : -1);
  const phase = $derived(enCours ? PHASES[(e - 2) % PHASES.length] : null);
  const ligne = $derived(iLigne >= 0 && iLigne < L.length ? L[iLigne] : null);
  const remplie = (i) => e >= 2 + i * PHASES.length + PHASES.length;
  const colVue = $derived(e >= 1);

  const jsonTexte = (l) => `{"sentiment": "${l.sentiment}"}`;

  // Ce que la puce transporte à chaque temps. Le passage du JSON complet à la
  // seule valeur EST l'analyse: on la voit se produire, on ne l'annonce pas.
  const charge = $derived(
    !ligne
      ? ''
      : phase?.id === 'json'
        ? jsonTexte(ligne)
        : phase?.id === 'parse' || phase?.id === 'ecrire'
          ? ligne.sentiment
          : ligne.texte
  );
  const brut = $derived(phase?.id === 'json');
  const valeur = $derived(phase?.id === 'parse' || phase?.id === 'ecrire');

  const CODE = {
    initial: 'donnees <- readRDS("donnees/ligne_rouge_cleaned.rds")',
    creation: 'donnees$sentiment <- NA_character_',
    lire: 'texte <- donnees$review_text[i]',
    prompt: 'prompt <- paste(consigne, texte)',
    appel: 'reponse <- chat$chat(prompt)',
    parse: 'valeur <- jsonlite::fromJSON(reponse)$sentiment',
    ecrire: 'donnees$sentiment[i] <- valeur',
    terminal: 'for (i in seq_len(nrow(donnees))) { ... }'
  };
  const codeR = $derived(
    initial
      ? CODE.initial
      : creation
        ? CODE.creation
        : terminal
          ? CODE.terminal
          : phase?.id === 'json'
            ? `reponse\n#> ${jsonTexte(ligne)}`
            : (CODE[phase?.id] ?? '')
  );

  const quai = () => {
    if (!phase) return null;
    if (phase.id === 'lire') return cellulesTexte[iLigne];
    if (phase.id === 'prompt') return quaiPrompt;
    if (phase.id === 'appel') return quaiApi;
    if (phase.id === 'json' || phase.id === 'parse') return quaiRep;
    return cellulesCible[iLigne];
  };

  // Mesuré à chaque temps, jamais mis en cache: ajuster.mjs peut écrire un
  // facteur d'échelle sur la diapo et le zoom du deck change à l'exécution.
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

  $effect(() => {
    if (!js) return;
    e;
    requestAnimationFrame(() => placer(phase?.id === 'lire' || !phase));
  });

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return;

    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);

    // Un clic avance d'un temps. Aucune minuterie: la personne qui enseigne
    // parle pendant chaque étape, elle ne court pas après une animation.
    // Arrivé au bout, un clic de plus reprend au début.
    function avancer() {
      e = e >= TOTAL - 1 ? 0 : e + 1;
    }

    diapo.addEventListener('click', avancer);

    const ro = new ResizeObserver(() => placer(true));
    ro.observe(hote);

    // On repart du classeur nu à chaque arrivée sur la diapositive, et on
    // remet à zéro en partant: revenir dessus ne doit pas reprendre au milieu.
    let ici = false;
    function verifier() {
      const y = Math.round(deck.scrollTop / deck.clientHeight) === monIndex;
      if (y && !ici) {
        ici = true;
        e = 0;
      } else if (!y && ici) {
        ici = false;
        e = 0;
      }
    }

    deck.addEventListener('scroll', verifier, { passive: true });
    verifier();
    const t0 = setTimeout(verifier, 350);

    return () => {
      deck.removeEventListener('scroll', verifier);
      diapo.removeEventListener('click', avancer);
      ro.disconnect();
      clearTimeout(t0);
    };
  });
</script>

<div class="clf" bind:this={hote}>
  <div class="clf-tete">
    <span class="pas-t">
      {#if initial}Un classeur de textes, et rien d'autre
      {:else if creation}Créer la colonne qui va recevoir les données
      {:else if terminal}La colonne est remplie, ligne par ligne
      {:else}{phase?.t}{/if}
    </span>
    <span class="src">
      {donnees.fichier} · {donnees.total} lignes
      {#if js}<span class="pas-n">{e + 1} / {TOTAL}</span>{/if}
    </span>
  </div>

  <table class="clf-t">
    <thead>
      <tr>
        {#each donnees.colonnes as c}<th>{c}</th>{/each}
        <th class="neuve"
          ><span class="entrant" class:vue={colVue}>sentiment</span
          ><span class="soulign" class:vue={colVue}></span></th
        >
      </tr>
    </thead>
    <tbody>
      {#each L as l, i}
        <tr class:active={i === iLigne}>
          <td class="mono">{l.id}</td>
          <td class="txt"><span bind:this={cellulesTexte[i]} class="cellule">{l.texte}</span></td>
          <td class="num">{l.note}</td>
          <td class="cible">
            <span
              bind:this={cellulesCible[i]}
              class="cellule cible-in entrant"
              class:vue={colVue}
            >
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
    <div class="st" class:on={phase?.id === 'json' || phase?.id === 'parse'}>
      <span class="st-n">RÉPONSE</span>
      <span class="st-d">
        {#if ligne && (phase?.id === 'json' || phase?.id === 'parse')}
          &#123; "sentiment": <span class="extrait" class:tire={phase?.id === 'parse'}
            >"{ligne.sentiment}"</span
          > &#125;
        {:else}
          &#123; "sentiment": … &#125;
        {/if}
      </span>
      <span class="quai" bind:this={quaiRep}></span>
    </div>
  </div>

  <figure class="code-r">
    <pre><code>{@html surlignerR(codeR)}</code></pre>
  </figure>

  <span
    class="puce"
    class:vis={js && !!phase}
    class:saut
    class:brut
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
    gap: 0.55em;
  }

  .clf-tete {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
    border-bottom: 2px solid var(--dk-encre);
    padding-bottom: 0.28em;
  }
  .pas-t {
    font-size: 0.82em;
    font-weight: 600;
    color: var(--dk-accent);
  }
  .src {
    font-size: 0.64em;
    color: var(--dk-gris);
    white-space: nowrap;
  }

  .clf-t {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.64em;
    table-layout: fixed;
  }
  .clf-t th {
    position: relative;
    text-align: left;
    font-weight: 600;
    color: var(--dk-gris);
    border-bottom: 2px solid var(--dk-filet);
    padding: 0.22em 0.5em;
    white-space: nowrap;
  }
  .clf-t th.neuve {
    color: var(--dk-accent);
  }
  .clf-t td {
    padding: 0.26em 0.5em;
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

  /* La colonne entre en scène: elle glisse depuis la droite et son filet se
     trace. La largeur, elle, reste réservée — un tableau qui se réagence
     déplacerait les quais sous la puce. */
  .entrant {
    opacity: 0;
    transform: translateX(0.9em);
    transition:
      opacity 0.42s ease-out,
      transform 0.42s ease-out;
  }
  .entrant.vue {
    opacity: 1;
    transform: none;
  }
  .soulign {
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 0;
    background: var(--dk-accent);
    transition: width 0.5s ease-out;
  }
  .soulign.vue {
    width: 100%;
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
    gap: 0.45em;
  }
  .st {
    flex: 1;
    border: 2px solid var(--dk-filet);
    padding: 0.35em 0.55em 0.45em;
    display: flex;
    flex-direction: column;
    gap: 0.12em;
    min-width: 0;
  }
  .st.on {
    border-color: var(--dk-accent);
  }
  .st-n {
    font-size: 0.58em;
    letter-spacing: 0.14em;
    font-weight: 600;
    color: var(--dk-gris);
  }
  .st.on .st-n {
    color: var(--dk-accent);
  }
  .st-d {
    font-size: 0.56em;
    color: var(--dk-gris-2);
    line-height: 1.3;
    min-height: 2.3em;
  }
  /* La valeur qu'on va extraire s'allume dans le JSON pendant l'analyse. */
  .extrait {
    transition: all 0.3s;
  }
  .extrait.tire {
    color: var(--dk-fond);
    background: var(--dk-accent);
    font-weight: 600;
    padding: 0 0.2em;
  }
  .quai {
    display: block;
    height: 1.6em;
    border: 1px dashed var(--dk-filet);
  }
  .st.on .quai {
    border-color: var(--dk-accent);
  }
  .fl {
    align-self: center;
    color: var(--dk-gris-2);
    font-size: 0.75em;
  }

  .code-r {
    margin: 0;
    border-left: 3px solid var(--dk-accent);
    background: var(--dk-fond-2);
    padding: 0.4em 0.7em;
    min-height: 3.1em;
  }
  .code-r pre {
    margin: 0;
  }
  .code-r code {
    font-family: var(--dk-mono);
    font-size: 0.62em;
    line-height: 1.55;
    white-space: pre-wrap;
  }

  .pas-n {
    color: var(--dk-accent);
    font-variant-numeric: tabular-nums;
    margin-left: 0.6em;
  }
  .puce {
    position: absolute;
    left: 0;
    top: 0;
    max-width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.6em;
    padding: 0.28em 0.55em;
    border: 2px solid var(--dk-accent);
    background: var(--dk-fond);
    color: var(--dk-accent);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s linear;
  }
  .puce.vis {
    opacity: 1;
  }
  .puce.saut {
    transition: none;
  }
  .puce.brut {
    max-width: 26%;
  }
  .puce.val {
    background: var(--dk-accent);
    color: var(--dk-fond);
    font-weight: 600;
    max-width: 20%;
  }

  @media (prefers-reduced-motion: reduce) {
    .puce {
      transition: opacity 0.2s linear;
    }
    .entrant,
    .soulign {
      transition: none;
    }
  }
</style>
