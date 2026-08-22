<script>
  import { base } from '$app/paths';
  import { REFERENCES } from '$lib/data/references.js';

  /**
   * Frise défilante. Chaque entrée est placée à sa DATE RÉELLE sur une échelle
   * linéaire: l'accélération se lit dans la densité, elle n'est pas dessinée.
   * Aucune valeur inventée, aucun axe vertical qui ne mesurerait rien.
   */
  const AN0 = 1948, AN1 = 2027;
  const LARGEUR = 8200; // px, de AN0 à AN1
  const SAS = 460;      // px, la coupure visible avant la reprise
  const TOTAL = LARGEUR + SAS;
  const pos = (an) => ((an - AN0) / (AN1 - AN0)) * LARGEUR;

  const ENTREES = [
    { an: 1950, t: 'Le jeu de l’imitation', s: 'Turing', img: 'turing.jpg', p: 'turing1950' },
    { an: 1956, t: 'Le terme est forgé', s: 'Dartmouth', img: 'mccarthy.jpg', p: 'mccarthy1955' },
    { an: 1958, t: 'Le perceptron', s: 'Rosenblatt', img: 'perceptron.jpg' },
    { an: 1997, t: 'Deep Blue bat Kasparov', s: 'IBM', img: 'deepblue.jpg' },
    { an: 2003, t: 'Premier modèle de langue neuronal', s: 'Bengio · Montréal', img: 'bengio.jpg', p: 'bengio2003' },
    { an: 2009, t: 'ImageNet', s: 'Fei-Fei Li', img: 'feifei.jpg' },
    { an: 2012, t: 'AlexNet', s: 'Krizhevsky · Sutskever · Hinton', p: 'krizhevsky2012' },
    { an: 2014, t: 'Google achète DeepMind', s: '', img: 'deepmind.png', logo: true },
    { an: 2015, t: 'Le mécanisme d’attention', s: 'Bahdanau · Cho · Bengio', p: 'bahdanau2015' },
    { an: 2016, t: 'AlphaGo bat Lee Sedol', s: 'Hassabis', img: 'hassabis.jpg' },
    { an: 2017, t: 'Le transformer', s: 'Vaswani et al. · Google', p: 'vaswani2017' },
    { an: 2018, t: 'GPT-1', s: '', img: 'openai.png', logo: true },
    { an: 2019, t: 'GPT-2' },
    { an: 2020, t: 'GPT-3', s: '175 milliards de paramètres', p: 'brown2020' },
    { an: 2021, t: 'Anthropic est fondée', s: '', img: 'anthropic.png', logo: true },
    { an: 2022.92, t: 'ChatGPT', s: '30 novembre' },
    { an: 2023.2, t: 'GPT-4 et Claude', s: 'mars' },
    { an: 2024.77, t: 'Deux prix Nobel', s: 'Hinton · Hassabis', img: 'hinton.jpg' },
    { an: 2025.42, t: 'LawZero', s: 'Bengio · Montréal', img: 'bengio.jpg' }
  ];

  const DECENNIES = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  let piste = $state(null);
  let hote = $state(null);
  let js = $state(false);
  let arrete = $state(false);

  $effect(() => {
    if (!hote || !piste) return;
    js = true;
    let brut = 0, dernier = 0, af = 0, actif = false;
    const VITESSE = 165; // px par seconde

    function pas(t) {
      if (!actif) return;
      const dt = dernier ? (t - dernier) / 1000 : 0;
      dernier = t;
      if (!arrete) {
        // Le rail est rendu deux fois: au-delà d'une largeur, on revient au
        // début sans que la couture soit visible.
        brut = (brut + VITESSE * dt) % TOTAL;
        piste.scrollLeft = brut;
      }
      af = requestAnimationFrame(pas);
    }

    // La racine est le conteneur de défilement du deck. Sans elle,
    // l'observateur se déclenchait dès le chargement de la page et la frise
    // était déjà au milieu quand on arrivait sur la diapositive.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !actif) {
          actif = true; dernier = 0;
          brut = 0; piste.scrollLeft = 0;   // on repart toujours de 1950
          af = requestAnimationFrame(pas);
        } else if (!e.isIntersecting) {
          actif = false; cancelAnimationFrame(af);
        }
      },
      { root: hote.closest('.deck'), threshold: 0.6 }
    );
    io.observe(hote);
    return () => { io.disconnect(); cancelAnimationFrame(af); actif = false; };
  });
</script>

<div
  class="frise"
  bind:this={hote}
  onpointerenter={() => (arrete = true)}
  onpointerleave={() => (arrete = false)}
>
  <div class="piste" bind:this={piste}>
    <div class="boucle" style="width: {TOTAL * 2}px">
      {#each [0, 1] as copie}
      <div class="rail" style="width: {TOTAL}px" aria-hidden={copie === 1}>
      <div class="axe"></div>

      {#each DECENNIES as d}
        <div class="dec" style="left: {pos(d)}px"><span>{d}</span></div>
      {/each}

      {#each ENTREES as e, i}
        <div class="ent {i % 2 ? 'bas' : 'haut'}" style="left: {pos(e.an)}px">
          <div class="tige"></div>
          <div class="carte">
            {#if e.img}
              <img
                class:logo={e.logo}
                src="{base}/img/histoire/{e.img}"
                alt={e.s || e.t}
              />
            {/if}
            <p class="an">{Math.floor(e.an)}</p>
            <p class="t">{e.t}</p>
            {#if e.s}<p class="s">{e.s}</p>{/if}
            {#if e.p}<p class="pap">{REFERENCES[e.p].titre} <span class="ref">{REFERENCES[e.p].court}</span></p>{/if}
          </div>
        </div>
      {/each}

        <div class="sas" style="left: {LARGEUR}px; width: {SAS}px">
          <span class="sas-txt">la frise reprend en 1950</span>
        </div>
      </div>
      {/each}
    </div>
  </div>

  {#if js}
    <p class="aide">{arrete ? 'défilement en pause' : 'survolez pour mettre en pause'}</p>
  {/if}
</div>

<style>
  /* Pleine largeur: la frise sort de la colonne de lecture. */
  /* La frise a sa propre échelle: héritée de la diapo, elle était démesurée
   et les cartes débordaient du rail. */
.frise {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  position: relative;
  font-size: 0.58em;
}

  .piste {
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .piste::-webkit-scrollbar { display: none; }

  /* Deux rails côte à côte: le second est la copie qui rend la boucle
     invisible. En flex, la hauteur ne s'effondre pas — elle s'était
     effondrée quand les rails étaient en position absolue. */
  .boucle { display: flex; height: 30em; }
  .rail { position: relative; flex: 0 0 auto; height: 100%; }

  .axe {
    position: absolute; left: 0; right: 0; top: 50%;
    height: 2px; background: var(--dk-encre);
  }

  .dec {
    position: absolute; top: 50%; transform: translate(-50%, 0.5em);
    font-family: var(--dk-mono); font-size: 0.66em;
    letter-spacing: 0.14em; color: var(--dk-gris);
  }
  .dec::before {
    content: ''; position: absolute; left: 50%; top: -0.75em;
    width: 1px; height: 0.55em; background: var(--dk-gris-2);
  }

  .ent { position: absolute; top: 50%; width: 8.2em; transform: translateX(-50%); }
  .ent .tige { position: absolute; left: 50%; width: 2px; background: var(--dk-accent); }
  .ent.haut { transform: translate(-50%, -100%); padding-bottom: 2.4em; }
  .ent.haut .tige { bottom: 0; height: 2.4em; }
  .ent.bas { padding-top: 2.4em; }
  .ent.bas .tige { top: 0; height: 2.4em; }

  .ent::after {
    content: ''; position: absolute; left: 50%; transform: translate(-50%, -50%);
    width: 0.42em; height: 0.42em; background: var(--dk-accent);
  }
  .ent.haut::after { bottom: -0.21em; top: auto; transform: translate(-50%, 50%); }
  .ent.bas::after { top: 0; }

  .carte { display: flex; flex-direction: column; gap: 0.12em; }
  .ent.haut .carte { justify-content: flex-end; }

  .carte img {
    width: 100%; height: 5em; object-fit: cover;
    /* Les visages sont dans le tiers supérieur: un recadrage centré les coupait. */
    object-position: center 28%;
    border: 2px solid var(--dk-encre);
    filter: grayscale(1) contrast(1.04);
    margin-bottom: 0.35em;
  }
  .carte img.logo {
    height: 2.8em; object-fit: contain; border: 0;
    filter: none; padding: 0.5em 0; align-self: flex-start;
  }

  .carte .an {
    font-family: var(--dk-mono); font-size: 1.15em; font-weight: 600;
    line-height: 1; color: var(--dk-accent); margin: 0;
  }
  .carte .t { font-size: 0.8em; line-height: 1.25; margin: 0; }
  .carte .s {
    font-size: 0.66em; line-height: 1.3; color: var(--dk-gris); margin: 0;
  }

  .carte .pap {
    /* Trois lignes au plus: le titre de Dartmouth débordait de sa carte. */
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.6em; line-height: 1.28; margin: 0.25em 0 0;
    color: var(--dk-encre); border-left: 2px solid var(--dk-accent);
    padding-left: 0.5em;
  }
  .carte .pap .ref { color: var(--dk-gris); white-space: nowrap; }

  /* Coupure de boucle: sans elle, 2025 succédait à 1950 sans avertir. */
  .sas {
    position: absolute; top: 0; bottom: 0;
    display: flex; align-items: center; justify-content: center;
    border-left: 3px solid var(--dk-encre);
    background: repeating-linear-gradient(
      -45deg,
      transparent 0 9px,
      color-mix(in srgb, var(--dk-encre) 8%, transparent) 9px 18px
    );
  }
  .sas-txt {
    font-family: var(--dk-mono); font-size: 0.66em;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--dk-gris); writing-mode: vertical-rl; text-orientation: mixed;
  }

  .aide {
    position: absolute; right: 1.6em; bottom: -1.6em;
    font-family: var(--dk-mono); font-size: 0.58em;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--dk-gris-2); margin: 0;
  }
</style>
