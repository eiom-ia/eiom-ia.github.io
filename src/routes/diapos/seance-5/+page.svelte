<script>
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
  import Code from '$lib/deck/Code.svelte';
  import Carte from '$lib/deck/Carte.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Citation from '$lib/deck/Citation.svelte';

  const TOTAL = 13;
</script>

<svelte:head>
  <title>Séance 5 — Atelier intégratif</title>
</svelte:head>

<Deck total={TOTAL}>
  {#snippet children()}
    <Slide fond="encre">
      <p class="surtitre e">Séance 5 · vendredi 28 août</p>
      <h1 class="e">De la question<br />à la preuve</h1>
      <hr class="filet" />
      <p class="lead e">Atelier intégratif · 120 minutes</p>
      <p class="surtitre e">Laurence-Olivier M. Foisy et Antoine Lemor</p>
    </Slide>

    <Slide>
      <p class="surtitre e">La cible</p>
      <h2 class="e">Le plus petit flux complet que quelqu'un d'autre peut contester</h2>
      <Citation source="Livrable de la matinée">
        Une note HTML, les données qui la fondent, le journal des appels, les contrôles et une déclaration
        exacte de ce qui a été délégué.
      </Citation>
      <p class="e">Nous n'évaluons ni la sophistication ni la quantité. Nous évaluons la chaîne de preuve.</p>
    </Slide>

    <Slide>
      <p class="surtitre e">Couplage faible</p>
      <h2 class="e">Vos résultats si vous les avez, les nôtres sinon</h2>
      <Deux>
        <Carte ton="ciel" titre="Voie personnelle">
          <p>Remplacez le corpus ou la mesure canonique par l'artefact produit pendant la semaine.</p>
        </Carte>
        <Carte ton="vert" titre="Voie canonique">
          <p>Utilisez le corpus synthétique et les réponses préenregistrées. Aucune séance antérieure ne bloque celle-ci.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide>
      <p class="surtitre e">Le dossier</p>
      <h2 class="e">Sept pièces, chacune avec une fonction</h2>
      <Code src={`question.md              # ce que l'on veut savoir
01_donnees.R             # corpus et identifiants
02_mesure.R              # sortie structuree
03_validation.R          # reference et metriques
04_analyse.R             # figure et desaccords
05_diffusion.qmd         # note reproductible
methods-card.md          # dispositif exact
agents.md                # delegation et actions`} />
    </Slide>

    <Slide>
      <p class="surtitre e">0–15 minutes</p>
      <h2 class="e">Fixer la question avant de voir le résultat</h2>
      <ol class="e">
        <li>Nommez l'unité d'analyse.</li>
        <li>Nommez la variable cible.</li>
        <li>Écrivez ce qui compterait comme réussite.</li>
        <li>Écrivez une conclusion que ce dispositif ne permettrait pas.</li>
      </ol>
    </Slide>

    <Slide>
      <p class="surtitre e">15–35 minutes</p>
      <h2 class="e">Données et mesure</h2>
      <Code src={`source("01_donnees.R")
source("02_mesure.R")`} />
      <Deux>
        <Carte ton="vert" titre="Passage 1"><p>Identifiants uniques, notes entre 1 et 5, données brutes intactes.</p></Carte>
        <Carte ton="vert" titre="Passage 2"><p>JSON structuré, journal présent, fournisseur ou mode secours déclaré.</p></Carte>
      </Deux>
    </Slide>

    <Slide>
      <p class="surtitre e">35–60 minutes</p>
      <h2 class="e">Valider avant d'interpréter</h2>
      <Code src={`source("03_validation.R")
read.csv("sorties/metriques.csv")`} />
      <Carte ton="ambre" titre="Le tableau ne suffit pas">
        <p>Ouvrez <code>validation.csv</code>. Une métrique agrège; les désaccords expliquent ce qui casse.</p>
      </Carte>
    </Slide>

    <Slide>
      <p class="surtitre e">60–75 minutes</p>
      <h2 class="e">Pause et point de contrôle</h2>
      <Deux ratio="1fr 1fr 1fr">
        <Carte ton="ciel" titre="Vert"><p>Les quatre fichiers attendus existent. Continuez.</p></Carte>
        <Carte ton="ambre" titre="Orange"><p>Utilisez l'artefact canonique et notez le changement.</p></Carte>
        <Carte ton="rose" titre="Rouge"><p>Signalez-vous. On rétablit un point de reprise, pas toute l'installation.</p></Carte>
      </Deux>
    </Slide>

    <Slide>
      <p class="surtitre e">75–90 minutes</p>
      <h2 class="e">Produire une figure et lire les erreurs</h2>
      <Code src={`source("04_analyse.R")
View(read.csv("sorties/desaccords.csv"))`} />
      <p class="e">La meilleure observation à présenter est souvent celle où le modèle et la référence divergent.</p>
    </Slide>

    <Slide>
      <p class="surtitre e">90–105 minutes</p>
      <h2 class="e">Audit croisé</h2>
      <Deux>
        <Carte ton="ciel" titre="Le binôme auditeur vérifie">
          <ul>
            <li>Identifiants et provenance</li>
            <li>Modèle et paramètres</li>
            <li>Critère défini avant le résultat</li>
            <li>Erreurs et limites visibles</li>
          </ul>
        </Carte>
        <Carte ton="rose" titre="La question rouge">
          <p>Quelle affirmation du document dépasse exactement ce que les fichiers permettent de soutenir?</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide>
      <p class="surtitre e">105–115 minutes</p>
      <h2 class="e">Compiler le dossier</h2>
      <Code src={`quarto render 05_diffusion.qmd
Rscript verifier_atelier.R`} />
      <Carte ton="vert" titre="Critère de sortie">
        <p>Un HTML autonome et neuf lignes <code>OK</code>. Si un fichier manque, le vérificateur le nomme.</p>
      </Carte>
    </Slide>

    <Slide>
      <p class="surtitre e">115–120 minutes</p>
      <h2 class="e">La déclaration qui engage</h2>
      <Citation source="À adapter dans votre travail">
        Le système d'IA a produit une mesure structurée selon le protocole joint. Les sorties ont été
        confrontées à une référence et les désaccords examinés. La question, le dispositif,
        l'interprétation et la décision de diffuser sont demeurés sous responsabilité humaine.
      </Citation>
    </Slide>

    <Slide fond="encre">
      <p class="surtitre e">Le parcours en une phrase</p>
      <h2 class="e">Utiliser. Mesurer.<br />Documenter. Superviser.</h2>
      <hr class="filet" />
      <p class="lead e">
        Une IA n'entre pas dans une recherche parce qu'elle impressionne, mais parce que son intervention
        peut être comprise, testée et contestée.
      </p>
    </Slide>
  {/snippet}
</Deck>
