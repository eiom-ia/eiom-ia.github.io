<script>
  /**
   * Les deux diapositives charnières du deuxième temps, sur une seule scène.
   *
   * 7  — le modèle seul: du texte part, du texte revient, et rien d'autre ne
   *      traverse. Vos fichiers sont là, à côté, hors d'atteinte.
   * 13 — le même décor, plus le harnais: le modèle renvoie une COMMANDE, et
   *      c'est un programme de votre côté qui l'exécute.
   *
   * Le décor est partagé exprès. La leçon est dans la différence entre les
   * deux images, donc elles doivent être superposables: mêmes boîtes, mêmes
   * fichiers, même couloir. Seul le pont apparaît.
   *
   * Un clic avance d'un temps; la touche « suivant » aussi, tant qu'il reste
   * un temps. Sans JavaScript, l'état final est affiché.
   *
   * Les largeurs de texte sont calculées, pas estimées: en IBM Plex Mono une
   * glyphe avance de 0,6 em, et une étiquette espacée ajoute son letter-spacing.
   */
  let { harnais = false } = $props();

  const TEMPS = harnais
    ? [
        { t: 'Vous demandez quelque chose au harnais.', p: 'demande' },
        { t: 'Le modèle répond — et sa réponse est du texte.', p: 'commande' },
        { t: "Le harnais lit ce texte et l'exécute sur vos fichiers.", p: 'executer' },
        { t: 'Le résultat repart au modèle. Et ça recommence.', p: 'retour' }
      ]
    : [
        { t: 'Vous écrivez. Du texte part.', p: 'aller' },
        { t: 'Le modèle répond. Du texte revient.', p: 'retour' },
        { t: 'Et c’est tout. Vos fichiers, il ne les a jamais vus.', p: 'mur' }
      ];

  let js = $state(false);
  let e = $state(TEMPS.length);
  let hote = $state(null);

  const phase = $derived(e > 0 && e <= TEMPS.length ? TEMPS[e - 1].p : '');
  const legende = $derived(e > 0 && e <= TEMPS.length ? TEMPS[e - 1].t : '');

  // Ce qui circule, et dans quel sens. Sans harnais: une question monte, une
  // réponse redescend. Avec: la demande monte, une commande redescend, puis le
  // résultat remonte — la boucle.
  const versModele = $derived(phase === 'aller' || phase === 'demande' || phase === 'retour' ? !harnais ? phase === 'aller' : true : false);
  const versVous = $derived(harnais ? phase === 'commande' : phase === 'retour');

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;

    const deck = hote.closest('.deck');
    const diapo = hote.closest('.diapo');
    if (!deck || !diapo) return;
    const monIndex = [...deck.querySelectorAll('.diapo')].indexOf(diapo);

    function avancer() {
      e = e >= TEMPS.length ? 0 : e + 1;
    }
    diapo.addEventListener('click', avancer);

    const AVANT = ['ArrowRight', 'ArrowDown', 'PageDown', ' '];
    const ARRIERE = ['ArrowLeft', 'ArrowUp', 'PageUp'];
    function auClavier(ev) {
      if (Math.round(deck.scrollTop / deck.clientHeight) !== monIndex) return;
      if (AVANT.includes(ev.key) && e < TEMPS.length) {
        ev.preventDefault();
        ev.stopPropagation();
        e += 1;
      } else if (ARRIERE.includes(ev.key) && e > 0) {
        ev.preventDefault();
        ev.stopPropagation();
        e -= 1;
      }
    }
    window.addEventListener('keydown', auClavier, true);

    let ici = false;
    function verifier() {
      const y = Math.round(deck.scrollTop / deck.clientHeight) === monIndex;
      if (y !== ici) {
        ici = y;
        e = 0;
      }
    }
    deck.addEventListener('scroll', verifier, { passive: true });
    verifier();
    const t = setTimeout(verifier, 350);

    return () => {
      diapo.removeEventListener('click', avancer);
      deck.removeEventListener('scroll', verifier);
      window.removeEventListener('keydown', auClavier, true);
      clearTimeout(t);
    };
  });

  const FICHIERS = ['notes.txt', 'corpus.csv', 'analyse.R'];
</script>

<div class="bcl" bind:this={hote}>
  <svg viewBox="0 0 1000 400" role="img" aria-label={harnais
      ? "Le modèle renvoie une commande en texte; un programme local l'exécute sur vos fichiers."
      : 'Un modèle isolé échange du texte et ne touche jamais vos fichiers.'}>
    <!-- chez vous -->
    <text class="lieu" x="30" y="30">VOTRE MACHINE</text>
    <rect class="zone" x="20" y="46" width="360" height="330" />

    {#each FICHIERS as f, i}
      <g class="fich" class:touche={phase === 'executer'}>
        <rect class="fchip" x="48" y={78 + i * 46} width="200" height="34" />
        <text class="fchip-t" x="62" y={100 + i * 46}>{f}</text>
      </g>
    {/each}

    {#if harnais}
      <g class="harn" class:actif={phase === 'executer'}>
        <rect class="hbox" x="48" y="240" width="304" height="110" />
        <text class="hn" x="200" y="278" text-anchor="middle">LE HARNAIS</text>
        <text class="hd" x="200" y="306" text-anchor="middle">un logiciel, chez vous</text>
        <text class="hd" x="200" y="330" text-anchor="middle">c'est lui qui exécute</text>
      </g>
      <!-- le harnais agit sur les fichiers -->
      <path class="fx-int" class:on={phase === 'executer'} d="M150 240 L150 216" />
      <path class="fx-int" class:on={phase === 'executer'} d="M143 227 L150 214 L157 227" />
    {:else}
      <text class="note" x="200" y="300" text-anchor="middle">vos fichiers</text>
      <text class="note" x="200" y="326" text-anchor="middle">restent ici</text>
    {/if}

    <!-- ailleurs -->
    <text class="lieu" x="970" y="30" text-anchor="end">CHEZ LE FOURNISSEUR</text>
    <rect class="zone" x="620" y="46" width="360" height="330" />
    <rect class="mod" x="650" y="150" width="300" height="120" />
    <text class="mod-t" x="800" y="196" text-anchor="middle">LE MODÈLE</text>
    <text class="mod-d" x="800" y="228" text-anchor="middle">ne fait que du texte</text>

    <!-- le couloir -->
    <path class="fx" d="M390 140 L604 140" />
    <path class="fx" d="M595 133 L606 140 L595 147" />
    <path class="fx" d="M610 290 L396 290" />
    <path class="fx" d="M405 283 L394 290 L405 297" />

    <!-- ce qui circule -->
    <text class="quoi" class:on={versModele} x="500" y="122" text-anchor="middle">
      {harnais ? (phase === 'retour' ? 'ce que ça a produit' : 'votre demande') : 'votre question'}
    </text>
    <text class="quoi" class:on={versVous} x="500" y="316" text-anchor="middle">
      {harnais ? 'une commande, en texte' : 'du texte'}
    </text>

    <!-- le paquet qui voyage -->
    {#if versModele}<rect class="paq va" x="390" y="133" width="15" height="15" />{/if}
    {#if versVous}<rect class="paq vient" x="595" y="283" width="15" height="15" />{/if}

    <!-- Ce qui ne traverse pas. Une barrière serait ambiguë: du texte traverse
         bel et bien. Ce qui ne passe jamais, ce sont les fichiers. -->
    {#if !harnais}
      <g class="bloque" class:on={phase === 'mur'}>
        <rect class="fchip" x="428" y="196" width="144" height="36" />
        <text class="fchip-t" x="500" y="220" text-anchor="middle">corpus.csv</text>
        <path class="croix" d="M428 196 L572 232" />
        <path class="croix" d="M572 196 L428 232" />
        <text class="mur-t" x="500" y="262" text-anchor="middle">jamais</text>
      </g>
    {/if}
  </svg>

  <p class="bcl-leg" class:vide={!legende}>{legende || ' '}</p>
</div>
