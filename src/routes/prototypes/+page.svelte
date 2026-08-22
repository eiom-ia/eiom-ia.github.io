<script>
  import { base } from '$app/paths';

  const PROTOS = [
    {
      id: 'a',
      nom: 'Grille suisse',
      doctrine: 'Style typographique international · Müller-Brockmann',
      quoi: 'Grille stricte de douze colonnes, composition asymétrique, grotesque Archivo, un seul accent rouge. Aucune carte, aucun coin arrondi, aucune ombre : la hiérarchie tient à la taille, à la graisse et à la position.',
      pour: 'Rigueur visible, neutralité, autorité méthodologique.',
      contre: "Austère. Ne pardonne aucune approximation d'alignement."
    },
    {
      id: 'b',
      nom: 'Revue savante',
      doctrine: 'Doctrine Tufte · mise en page imprimée',
      quoi: 'EB Garamond et Spectral, notes en marge plutôt que puces, lettrine, filets fins, chiffres elzéviriens. La diapositive se lit comme une page de livre.',
      pour: 'Parle la langue du public académique. Les notes en marge disent ce que la voix ne dit pas.',
      contre: 'Le texte fin en marge se lit mal du fond de la salle.'
    },
    {
      id: 'c',
      nom: 'Brutalisme de terminal',
      doctrine: 'Brutalisme web · monospace intégral',
      quoi: 'IBM Plex Mono partout, fond sombre, contraste maximal, bordures franches de 2 px, aplats, un accent orange acide. La structure est montrée plutôt que masquée.',
      pour: "Cohérent avec l'objet du cours : du code, des méthodes, rien de décoratif. Impossible à confondre avec un gabarit.",
      contre: 'Un ton affirmé qui peut détonner dans une école universitaire.'
    },
    {
      id: 'd',
      nom: 'Assertion-preuve',
      doctrine: 'Alley & Neeley, 2005 · appuyé par la recherche',
      quoi: "Le titre est une phrase affirmative complète, jamais un thème. Le corps porte UNE preuve visuelle. Aucune puce, nulle part. IBM Plex Sans, chrome minimal.",
      pour: 'Préféré 7 contre 1 par les étudiants et meilleure rétention, dans les essais publiés. Change la pensée, pas seulement la peau.',
      contre: "Exige de réécrire chaque titre et de fabriquer une vraie preuve visuelle par diapositive. Le plus coûteux à produire."
    }
  ];
</script>

<svelte:head><title>Prototypes de diapositives — Parcours IA</title></svelte:head>

<div class="enveloppe">
  <header>
    <p class="sur">Parcours IA · EIOM 2026</p>
    <h1>Quatre doctrines de diapositive</h1>
    <p class="intro">
      Chacune met en forme <strong>le même contenu</strong> — ouverture, tableau de la semaine,
      comparaison classifieur / génératif, bloc de code — pour que la comparaison porte sur le design
      et jamais sur le texte. Chaque prototype est autonome : rien n'est partagé entre eux, sinon les
      chaînes de caractères.
    </p>
  </header>

  <ol>
    {#each PROTOS as p}
      <li>
        <a href="{base}/prototypes/{p.id}/">
          <span class="lettre">{p.id.toUpperCase()}</span>
          <span class="txt">
            <span class="nom">{p.nom}</span>
            <span class="doc">{p.doctrine}</span>
            <span class="quoi">{p.quoi}</span>
            <span class="pc"><em>Pour —</em> {p.pour}</span>
            <span class="pc"><em>Contre —</em> {p.contre}</span>
          </span>
          <span class="fl">→</span>
        </a>
      </li>
    {/each}
  </ol>

  <p class="pied">
    Flèches ou molette pour parcourir chaque prototype. Dis-moi lequel tient, ou ce que tu veux
    croiser de l'un à l'autre.
  </p>
</div>

<style>
  .enveloppe { max-width: 54rem; margin: 0 auto; padding: clamp(32px, 7vh, 80px) 24px 96px; }
  .sur {
    font-family: var(--police-mono);
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-3);
    margin-bottom: 0.8em;
  }
  h1 { margin-bottom: 0.4em; }
  .intro { max-width: 60ch; margin-bottom: 2.4em; }
  ol { list-style: none; padding: 0; margin: 0; }
  li { border-top: 1px solid var(--rule); }
  li:last-child { border-bottom: 1px solid var(--rule); }
  a {
    display: grid;
    grid-template-columns: 3rem 1fr 1.5rem;
    gap: 1.4rem;
    align-items: start;
    padding: 1.5rem 0.5rem;
    text-decoration: none;
    color: inherit;
    transition: background 0.18s ease, padding 0.18s ease;
  }
  a:hover { background: var(--paper-2); padding-left: 0.9rem; padding-right: 0.9rem; }
  .lettre {
    font-family: var(--police-display);
    font-size: 2.2rem;
    line-height: 1;
    color: var(--rule);
  }
  a:hover .lettre { color: var(--accent); }
  .txt { display: flex; flex-direction: column; gap: 0.35em; }
  .nom { font-family: var(--police-display); font-size: 1.25rem; font-weight: 600; }
  .doc {
    font-family: var(--police-mono);
    font-size: 0.66rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .quoi { font-size: 0.9rem; color: var(--ink-2); margin-top: 0.2em; }
  .pc { font-size: 0.82rem; color: var(--ink-3); }
  .pc em { font-style: normal; color: var(--ink-2); }
  .fl { align-self: center; color: var(--rule); }
  a:hover .fl { color: var(--accent); }
  .pied { margin-top: 2.4em; font-size: 0.85rem; color: var(--ink-3); }
</style>
