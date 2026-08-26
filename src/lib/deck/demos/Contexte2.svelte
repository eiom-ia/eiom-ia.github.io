<script>
  /**
   * La fenêtre de contexte qui se remplit, tour après tour.
   *
   * Le point difficile à faire passer: à chaque tour, TOUT l'historique
   * repart. Ce n'est pas la demande qui pèse, c'est son accumulation. Une
   * carte de texte l'affirme; une barre qui se remplit le montre.
   *
   * Aucun chiffre n'est affiché. La proportion est illustrative — on n'a pas
   * mesuré ces tours-là, et un axe qui ne mesure rien ne doit pas exister.
   */
  import { brancherTemps } from '../temps.js';

  // Ce qui s'ajoute à chaque tour. La consigne, elle, ne repart jamais.
  const TOURS = [
    { n: 'Tour 1', ajout: [{ l: 'votre demande', p: 10 }] },
    { n: 'Tour 2', ajout: [{ l: 'appel', p: 6 }, { l: 'résultat', p: 14 }] },
    { n: 'Tour 3', ajout: [{ l: 'appel', p: 6 }, { l: 'résultat', p: 18 }] },
    { n: 'Tour 4', ajout: [{ l: 'appel', p: 6 }, { l: 'résultat', p: 22 }] }
  ];

  const SYMPTOMES = [
    'oublie le début',
    'refait ce qui est fait',
    'ralentit, coûte plus',
    'dérive'
  ];

  let js = $state(false);
  let e = $state(TOURS.length);
  let hote = $state(null);

  const segments = $derived(
    TOURS.slice(0, js ? e : TOURS.length).flatMap((t, i) =>
      t.ajout.map((a) => ({ ...a, tour: i }))
    )
  );
  const rempli = $derived(segments.reduce((s, x) => s + x.p, 8)); // 8 = la consigne
  const sature = $derived(rempli >= 80);

  $effect(() => {
    if (!hote) return;
    js = true;
    e = 0;
    return brancherTemps(hote, { total: TOURS.length, lire: () => e, ecrire: (v) => (e = v) });
  });
</script>

<div class="ctx2" bind:this={hote}>
  <div class="ctx2-tete">
    <span class="ctx2-t">La fenêtre de contexte</span>
    <span class="ctx2-n">{js && e > 0 ? TOURS[e - 1].n : 'au départ'}</span>
  </div>

  <div class="ctx2-barre" class:sature>
    <div class="ctx2-seg consigne" style="width: 8%"><span>consigne</span></div>
    {#each segments as s}
      <div class="ctx2-seg" class:res={s.l === 'résultat'} style="width: {s.p}%">
        <span>{s.l}</span>
      </div>
    {/each}
  </div>

  <p class="ctx2-note">
    À chaque tour, <strong>tout</strong> repart. Ce n'est pas la question qui pèse, c'est
    l'accumulation.
  </p>

  <div class="ctx2-symp" class:vue={!js || sature}>
    <span class="ctx2-symp-t">Quand c'est plein</span>
    <ul>
      {#each SYMPTOMES as s}<li>{s}</li>{/each}
    </ul>
    <p class="ctx2-rem">Le remède est toujours le même : découper en tâches courtes et fermées.</p>
    <p class="ctx2-compact">Entre deux étapes, <code>/compact</code> demande souvent au harnais de résumer la session pour libérer du contexte.</p>
  </div>
</div>

<style>
  .ctx2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
  }
  .ctx2-tete {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 0.74em;
    letter-spacing: 0.14em;
    color: var(--dk-gris);
  }
  .ctx2-n {
    color: var(--dk-accent);
    font-weight: 600;
  }
  .ctx2-barre {
    display: flex;
    height: 3.4em;
    border: 2px solid var(--dk-encre);
    background: repeating-linear-gradient(
      135deg,
      transparent 0 7px,
      var(--dk-fond-2) 7px 14px
    );
    transition: border-color 0.3s ease-out;
  }
  .ctx2-barre.sature {
    border-color: var(--dk-accent);
    border-width: 3px;
  }
  .ctx2-seg {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-right: 2px solid var(--dk-fond);
    background: var(--dk-accent);
    color: var(--dk-fond);
    font-size: 0.62em;
    letter-spacing: 0.06em;
    white-space: nowrap;
    animation: ctx2-pousse 0.32s ease-out;
  }
  .ctx2-seg.res {
    background: var(--dk-accent-clair);
    color: var(--dk-encre);
  }
  .ctx2-seg.consigne {
    background: var(--dk-encre);
  }
  .ctx2-seg span {
    padding: 0 0.4em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @keyframes ctx2-pousse {
    from {
      transform: scaleX(0.2);
      opacity: 0.4;
    }
  }
  .ctx2-note {
    margin: 0;
    font-size: 0.9em;
  }
  .ctx2-symp {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.2em 1.2em;
    align-items: start;
    border: 2px solid var(--dk-encre);
    padding: 0.7em 0.9em;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
  .ctx2-symp.vue {
    opacity: 1;
  }
  .ctx2-symp-t {
    font-size: 0.72em;
    letter-spacing: 0.14em;
    color: var(--dk-accent);
    white-space: nowrap;
  }
  .ctx2-symp ul {
    margin: 0;
    padding: 0;
    list-style: none;
    columns: 2;
    column-gap: 1.6em;
  }
  .ctx2-symp li {
    font-size: 0.84em;
    padding-left: 1em;
    text-indent: -1em;
  }
  .ctx2-symp li::before {
    content: '> ';
    color: var(--dk-accent);
  }
  .ctx2-rem {
    grid-column: 2;
    margin: 0.35em 0 0;
    font-size: 0.84em;
    color: var(--dk-gris);
  }
  .ctx2-compact {
    grid-column: 1 / -1;
    margin: 0.45em 0 0;
    padding-top: 0.45em;
    border-top: 1px solid var(--dk-filet);
    font-size: 0.82em;
  }
  @media (prefers-reduced-motion: reduce) {
    .ctx2-seg {
      animation: none;
    }
  }
</style>
