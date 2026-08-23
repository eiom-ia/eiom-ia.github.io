<script>
  import donnees from './classifieur.json';

  /**
   * Le geste de la semaine, déroulé au ralenti: on ajoute une colonne, puis
   * pour chaque ligne on lit la cellule, on la glisse dans un prompt, on
   * appelle l'API, on reçoit du JSON, on en extrait un champ, on l'écrit
   * dans la colonne.
   *
   * Les lignes viennent de classifieur.json, engendré depuis le vrai
   * avis_exemple.csv — le fichier que les participants ouvriront à l'atelier.
   * Un test échoue si les deux divergent.
   *
   * C'est un schéma du mécanisme: le JSON montré est de la forme qu'impose
   * le schéma enseigné, il n'est pas la sortie mesurée d'un appel réel.
   */
  const L = donnees.lignes;

  // Une phase par étape, avec sa durée. La création de la colonne n'arrive
  // qu'une fois; les cinq autres tournent pour chaque ligne.
  const PHASES = [
    { id: 'lire', t: 'LIRE', ms: 1500 },
    { id: 'prompt', t: 'PROMPT', ms: 2100 },
    { id: 'appel', t: 'APPEL', ms: 1500 },
    { id: 'json', t: 'JSON', ms: 1800 },
    { id: 'ecrire', t: 'ÉCRIRE', ms: 1300 }
  ];
  const MS_CREER = 2000;
  const TOTAL = 1 + L.length * PHASES.length;

  let hote = $state(null);
  let js = $state(false);
  let e = $state(TOTAL - 1); // sans JS, on montre le tableau terminé
  let etat = $state('arret'); // 'arret' | 'joue' | 'pause' | 'fini'

  const creation = $derived(e === 0);
  const iLigne = $derived(creation ? -1 : Math.floor((e - 1) / PHASES.length));
  const phase = $derived(creation ? null : PHASES[(e - 1) % PHASES.length]);
  const ligne = $derived(iLigne >= 0 && iLigne < L.length ? L[iLigne] : null);

  const remplie = (i) =>
    e >= 1 + i * PHASES.length + PHASES.length; // écrite une fois la phase ÉCRIRE passée

  const promptTexte = (t) =>
    `Classe le sentiment de cet avis.\nRéponds uniquement selon le schéma.\n\n« ${t} »`;

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return;

    // Même mécanique que la frise: on lit la position du deck plutôt que de
    // se fier à un observateur d'intersection, qui se déclenche au chargement
    // et laisse l'animation à moitié jouée à l'arrivée.
    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);
    let minuteur = 0;

    function duree(n) {
      return n === 0 ? MS_CREER : PHASES[(n - 1) % PHASES.length].ms;
    }

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
      clearTimeout(t0);
      clearTimeout(minuteur);
    };
  });
</script>

<div class="clf" bind:this={hote}>
  <div class="clf-tete">
    <span class="pas-t">
      {#if creation}Créer la colonne qui va recevoir les données
      {:else if phase?.id === 'lire'}Lire la cellule
      {:else if phase?.id === 'prompt'}Coller le texte dans un prompt
      {:else if phase?.id === 'appel'}Envoyer à l'API
      {:else if phase?.id === 'json'}Recevoir la réponse, en JSON
      {:else}Écrire la valeur dans la cellule{/if}
    </span>
    <span class="src">{donnees.fichier} · {donnees.total} lignes</span>
  </div>

  <table class="clf-t">
    <thead>
      <tr>
        {#each donnees.colonnes as c}<th>{c}</th>{/each}
        <th class="neuve" class:apparait={e >= 0}>sentiment</th>
      </tr>
    </thead>
    <tbody>
      {#each L as l, i}
        <tr class:active={i === iLigne}>
          <td class="mono">{l.id}</td>
          <td class="txt" class:lu={i === iLigne && phase}>{l.texte}</td>
          <td class="num">{l.note}</td>
          <td class="cible">
            {#if remplie(i)}<span class="val">{l.sentiment}</span>
            {:else if i === iLigne && phase?.id === 'ecrire'}<span class="val entre"
                >{l.sentiment}</span
              >
            {:else if i === iLigne}<span class="attente">·····</span>{/if}
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

  <div class="chaine" class:pale={creation}>
    {#each PHASES as p, k}
      <span class="et" class:on={!creation && phase?.id === p.id}>{p.t}</span>
      {#if k < PHASES.length - 1}<span class="fl">▸</span>{/if}
    {/each}
  </div>

  <div class="boite">
    {#if creation}
      <p class="vide">une colonne vide, prête à recevoir une valeur par ligne</p>
    {:else if phase?.id === 'lire'}
      <p class="cel">« {ligne.texte} »</p>
    {:else if phase?.id === 'prompt'}
      <pre class="src-b">{promptTexte(ligne.texte)}</pre>
    {:else if phase?.id === 'appel'}
      <pre class="src-b">POST https://api.openai.com/v1/chat/completions
     model: gpt-4o-mini
     temperature: 0</pre>
    {:else if phase?.id === 'json'}
      <pre class="src-b">&#123; "sentiment": "{ligne.sentiment}" &#125;</pre>
    {:else}
      <pre class="src-b">reponse$sentiment  →  "{ligne.sentiment}"</pre>
    {/if}
  </div>

  {#if js}
    <p class="cmd">
      {#if etat === 'joue'}lecture en cours — cliquez pour mettre en pause
      {:else if etat === 'pause'}en pause — cliquez pour reprendre
      {:else if etat === 'fini'}terminé — cliquez pour rejouer
      {:else}cliquez pour lancer{/if}
    </p>
  {/if}
</div>

<style>
  .clf {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
  }

  .clf-tete {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1em;
    border-bottom: 2px solid var(--dk-encre);
    padding-bottom: 0.35em;
  }
  .pas-t {
    font-size: 0.86em;
    font-weight: 600;
    color: var(--dk-accent);
  }
  .src {
    font-size: 0.68em;
    color: var(--dk-gris);
    white-space: nowrap;
  }

  .clf-t {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.7em;
    table-layout: fixed;
  }
  .clf-t th {
    text-align: left;
    font-weight: 600;
    color: var(--dk-gris);
    border-bottom: 2px solid var(--dk-filet);
    padding: 0.3em 0.5em;
    font-size: 0.92em;
  }
  .clf-t th.neuve {
    color: var(--dk-accent);
    border-bottom-color: var(--dk-accent);
  }
  .clf-t td {
    padding: 0.32em 0.5em;
    border-bottom: 1px solid var(--dk-filet);
    vertical-align: top;
  }
  /* « review_rating » fait treize caractères: une colonne trop étroite le
     laissait chevaucher l'entête voisine. Les largeurs sont fixées, pas
     laissées au calcul automatique du tableau. */
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
  .clf-t th {
    white-space: nowrap;
  }

  .clf-t td.txt {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--dk-encre);
  }
  .clf-t td.mono,
  .clf-t td.num {
    color: var(--dk-gris);
  }

  .clf-t tr.active td {
    background: var(--dk-fond-2);
  }
  .clf-t tr.active td.txt.lu {
    color: var(--dk-accent);
    font-weight: 600;
  }
  .clf-t tr.reste td {
    color: var(--dk-gris-2);
    border-bottom: none;
  }

  .cible .val {
    color: var(--dk-accent);
    font-weight: 600;
  }
  .cible .attente {
    color: var(--dk-gris-2);
    letter-spacing: 0.1em;
  }

  .chaine {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 0.66em;
    letter-spacing: 0.1em;
    color: var(--dk-gris-2);
    flex-wrap: wrap;
  }
  .chaine.pale {
    opacity: 0.45;
  }
  .chaine .et {
    border: 2px solid var(--dk-filet);
    padding: 0.18em 0.6em;
  }
  .chaine .et.on {
    border-color: var(--dk-accent);
    background: var(--dk-accent);
    color: var(--dk-fond);
    font-weight: 600;
  }
  .chaine .fl {
    color: var(--dk-gris-2);
  }

  .boite {
    border: 2px solid var(--dk-filet);
    padding: 0.6em 0.8em;
    min-height: 5.4em;
    display: flex;
    align-items: center;
  }
  .boite .src-b,
  .boite .cel,
  .boite .vide {
    margin: 0;
    font-family: var(--dk-mono);
    font-size: 0.72em;
    line-height: 1.5;
    white-space: pre-wrap;
    color: var(--dk-encre);
  }
  .boite .vide {
    color: var(--dk-gris);
  }
  .boite .cel {
    color: var(--dk-accent);
  }

  .cmd {
    margin: 0;
    font-size: 0.62em;
    letter-spacing: 0.08em;
    color: var(--dk-gris-2);
  }
</style>
