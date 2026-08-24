<script>
  import { base } from '$app/paths';
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
  import Code from '$lib/deck/Code.svelte';
  import Carte from '$lib/deck/Carte.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Etiquette from '$lib/deck/Etiquette.svelte';
  import Citation from '$lib/deck/Citation.svelte';
  import Cite from '$lib/deck/Cite.svelte';
  import Frise from '$lib/deck/demos/Frise.svelte';
  import Arbre from '$lib/deck/demos/Arbre.svelte';
  import Api from '$lib/deck/demos/Api.svelte';
  import Centre from '$lib/deck/demos/Centre.svelte';
  import Mesures from '$lib/deck/demos/Mesures.svelte';
  import Donnees from '$lib/deck/demos/Donnees.svelte';
  import Modeles from '$lib/deck/demos/Modeles.svelte';
  import Arena from '$lib/deck/demos/Arena.svelte';
  import Extractions from '$lib/deck/demos/Extractions.svelte';
  import Poids from '$lib/deck/demos/Poids.svelte';
  import Corpus from '$lib/deck/demos/Corpus.svelte';
  import Anatomie from '$lib/deck/demos/Anatomie.svelte';
  import Connaissances from '$lib/deck/demos/Connaissances.svelte';
  import Temperature from '$lib/deck/demos/Temperature.svelte';
  import Biais from '$lib/deck/demos/Biais.svelte';
  import Echantillon from '$lib/deck/demos/Echantillon.svelte';
  import Contexte from '$lib/deck/demos/Contexte.svelte';
  import Minuterie from '$lib/deck/demos/Minuterie.svelte';
  import Dictionnaire from '$lib/deck/demos/Dictionnaire.svelte';
  import MurAvis from '$lib/deck/demos/MurAvis.svelte';
  import Fiches from '$lib/deck/demos/Fiches.svelte';
  import Classifieur from '$lib/deck/demos/Classifieur.svelte';
  import Hallucination from '$lib/deck/demos/Hallucination.svelte';
  import { REFERENCES, ORDRE_BIBLIO } from '$lib/data/references.js';
  import { CREDITS_IMAGES } from '$lib/data/credits-images.js';
  import Tokeniseur from '$lib/deck/demos/Tokeniseur.svelte';
  import Generation from '$lib/deck/demos/Generation.svelte';
  import { FOURNISSEUR, FOURNISSEUR_SECOURS } from '$lib/data/config.js';

  const TOTAL = 47;

  const c_capitale = `library(ellmer)

chat <- chat_openrouter(
  model = "google/gemini-3.5-flash-lite",
  echo  = "none"
)

chat$chat("Quelle est la capitale de la France ?")
#> La capitale de la France est **Paris**.`;

  const c_boucle = `library(ellmer)
library(jsonlite)

pays      <- c("France", "Japon", "Bresil")
capitales <- character(length(pays))

for (i in seq_along(pays)) {
  prompt <- paste0(
    "Quelle est la capitale de ", pays[i], " ? ",
    'Reponds uniquement par {"capitale": "..."}'
  )
  chat <- chat_openrouter(model = "google/gemini-3.5-flash-lite", echo = "none")
  reponse <- chat$chat(prompt)
  capitales[i] <- fromJSON(reponse)$capitale
}

data.frame(pays, capitales)
#>     pays capitales
#> 1 France     Paris
#> 2  Japon     Tokyo
#> 3 Bresil  Brasilia`;

  const c_renviron = `# Dans la console R
usethis::edit_r_environ()

# Le fichier s'ouvre. On y ajoute UNE des deux lignes:
GEMINI_API_KEY=votre_cle_ici
# OU
OPENROUTER_API_KEY=votre_cle_ici

# Puis: Session > Restart R
# Sans redemarrage, R ne verra rien.`;

</script>

<svelte:head>
  <title>Séance 1 — Comprendre les LLM et y accéder pour la recherche</title>
</svelte:head>

<Deck total={TOTAL}>
  {#snippet children()}

    <Slide fond="encre" bandeau="Laurence-Olivier M. Foisy" droite="séance 1 · lun 24 août">
      <Deux ratio="2.4fr 1fr">
        <div>
          <h1 class="e">L'IA en recherche</h1>
          <hr class="filet" />
          <p class="lead e">Parcours <em>L'intelligence artificielle et la recherche</em></p>
          <p class="lead e">EIOM 2026</p>
        </div>
        <figure class="logo-ecole">
          <img src="{base}/img/eiom.png" alt="École d'été sur les méthodes computationnelles" />
        </figure>
      </Deux>
    </Slide>

    <Slide bandeau="À propos de moi" droite="séance 1 · lun 24 août">
      <Deux ratio="1.85fr 1fr">
        <div>
          <h2 class="e">À propos de moi</h2>
          <p class="lead e">Laurence-Olivier M. Foisy</p>
          <hr class="filet" />
          <ul class="cmd-liste e">
            <li>Enseignement du cours Introduction aux mégadonnées en sciences sociales<span class="lieu">Université de Montréal · FAS-1001</span></li>
            <li>Doctorat en science politique, en cours<span class="lieu">Université Laval</span></li>
            <li>Maîtrise en études de la paix internationale<span class="lieu">Université Soka, Japon</span></li>
            <li>Baccalauréat en études est-asiatiques<span class="lieu">Université de Montréal</span></li>
          </ul>
        </div>
        <figure class="portrait">
          <img src="{base}/img/portrait-lomf.jpg" alt="Portrait de Laurence-Olivier M. Foisy" />
        </figure>
      </Deux>
    </Slide>

    <Slide bandeau="La semaine" droite="séance 1 · lun 24 août">
      <h2 class="e">Cinq séances</h2>
      <hr class="filet" />

      <div class="semaine-bande e">
        <div class="mien">
          <p class="sb-jour">lundi</p>
          <p class="sb-titre">Introduction aux LLM</p>
        </div>
        <div class="">
          <p class="sb-jour">mardi</p>
          <p class="sb-titre">Validation scientifique</p>
        </div>
        <div class="">
          <p class="sb-jour">mercredi</p>
          <p class="sb-titre">Des sorties aux mesures</p>
        </div>
        <div class="mien">
          <p class="sb-jour">jeudi</p>
          <p class="sb-titre">IA agentique</p>
        </div>
        <div class="">
          <p class="sb-jour">vendredi</p>
          <p class="sb-titre">Visite et atelier</p>
        </div>
      </div>

    </Slide>

    <Slide bandeau="Plan de la session" droite="séance 1 · lun 24 août">
      <h2 class="e">Plan de la session</h2>
      <hr class="filet" />
      <ul class="cmd-liste e">
        <li>Comment fonctionne un LLM</li>
        <li>Pourquoi l’API</li>
        <li>Premier appel sur de vraies données</li>
        <li>Conception de prompts</li>
      </ul>
    </Slide>

    <Slide bandeau="Un tour de salle" droite="séance 1 · lun 24 août">
      <h2 class="e">Deux questions</h2>
      <ol class="qs-num e">
        <li>Quel est votre niveau de compétence avec l'IA ?</li>
        <li>Qui paie pour un service d'IA ?</li>
      </ol>
    </Slide>

    <Slide fond="encre" bandeau="Définir l'IA" droite="séance 1 · lun 24 août">
      <h1 class="e">Qu’est-ce que l’IA ?</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Définir l'IA" droite="séance 1 · lun 24 août">
      <h2 class="e">Il y a plusieurs définitions de l'IA</h2>
      <hr class="filet" />
      <ul class="defs e">
        <li class="retenue">
          <span class="lettre">A</span>
          <span class="q">Est-ce que le système peut décider et agir ? <Cite k="russell2020" /></span>
        </li>
        <li>
          <span class="lettre">B</span>
          <span class="q">Est-ce que le système peut passer pour un humain ? <Cite k="turing1950" /></span>
        </li>
        <li>
          <span class="lettre">C</span>
          <span class="q">Est-ce que le système décide par la logique ? <Cite k="jordan2015" /></span>
        </li>
      </ul>
      <p class="e">
        Aucun consensus : beaucoup plus de définitions recensées.
        <Cite k="legg2007" /> <Cite k="wang2019" />
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Définir l'IA" droite="séance 1 · lun 24 août">
      <h2 class="e">Les grands modèles de langue répondent aux trois</h2>
      <hr class="filet" />
      <ul class="defs e">
        <li class="retenue">
          <span class="lettre">A</span>
          <span class="q">Ils décident et agissent</span>
        </li>
        <li class="retenue">
          <span class="lettre">B</span>
          <span class="q">Ils passent pour des humains <Cite k="jones2025" /></span>
        </li>
        <li class="retenue">
          <span class="lettre">C</span>
          <span class="q">Ils prédisent le prochain jeton par la statistique</span>
        </li>
      </ul>
    </Slide>

    <Slide bandeau="Une histoire de l'IA" droite="séance 1 · lun 24 août">
      <h2 class="e">Histoire de l'IA</h2>
      <Frise />
    </Slide>

    <Slide bandeau="Situer les familles" droite="séance 1 · lun 24 août">
      <h2 class="e">Arbre généalogique de l'IA</h2>
      <Arbre />
      <p class="e credits">
        Schéma original, inspiré de l’arbre évolutif des LLM de <Cite k="yang2023" />.
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Les modèles de langage" droite="séance 1 · lun 24 août">
      <h1 class="e">Comment fonctionne<br />un modèle de langage</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Les données d’entraînement" droite="séance 1 · lun 24 août">
      <h2 class="e">Les données d'entraînement</h2>
      <Corpus />
      <p class="e credits">Corpus d'entraînement de LLaMA, tableau 1 <Cite k="touvron2023" />.</p>
    </Slide>

    <Slide bandeau="Mécanique" droite="séance 1 · lun 24 août">
      <h2 class="e">Tout ce qu'il fait, c'est prédire le jeton suivant</h2>
      <Generation />
    </Slide>

    <Slide bandeau="Mécanique" droite="séance 1 · lun 24 août">
      <h2 class="e">Le modèle ne voit pas des mots</h2>
      <p class="e">La phrase qu'il vient d'écrire, telle qu'il l'a vue :</p>
      <Tokeniseur />
      <p class="e credits">
        Le surcoût vaut pour toutes les langues éloignées de l'anglais, et la qualité y baisse
        aussi <Cite k="ahia2023" />.
      </p>
    </Slide>

    <Slide bandeau="Le paramètre qui compte" droite="séance 1 · lun 24 août">
      <h2 class="e">La température</h2>
      <Temperature />
    </Slide>

    <Slide bandeau="Ce qu'un LLM n'est pas" droite="séance 1 · lun 24 août">
      <h2 class="e">Ce n'est pas une base de connaissances</h2>
      <Connaissances />
      <Citation source="Le principe à retenir">
        Une référence bibliographique produite par un modèle est une <em>hypothèse de référence</em>
        jusqu'à ce que vous l'ayez vérifiée dans un catalogue.
      </Citation>
    </Slide>

    <Slide bandeau="Poids ouverts" droite="séance 1 · lun 24 août">
      <h2 class="e">Un poids, c'est la force d'un lien</h2>
      <Poids />
      <p class="e credits">
        Poids réels de <code>q_proj</code>, couche 0, lus dans le fichier <code>model.safetensors</code>
        de Qwen2.5-0.5B. Modèle ouvert : on peut le télécharger et tout lister.
      </p>
    </Slide>

    <Slide bandeau="Reformulation" droite="séance 1 · lun 24 août">
      <h2 class="e">L'hallucination n'est pas un bug</h2>
      <Hallucination />
      <p class="e credits">
        Sortie contrainte · vérification externe · validation sur vérité terrain — le programme de la
        semaine.
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Les biais" droite="séance 1 · lun 24 août">
      <h1 class="e">Les biais</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Trois entrées, une seule chaîne" droite="séance 1 · lun 24 août">
      <h2 class="e">Le biais entre à trois endroits</h2>
      <Biais />
      <p class="e credits">
        Composition du corpus d'entraînement de LLaMA <Cite k="touvron2023" />.
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Pause" droite="séance 1 · lun 24 août">
      <h1 class="e">Pause</h1>
      <hr class="filet" />
      <Minuterie minutes={15} />
      <p class="lead e">Pendant la pause, allez chercher votre clé.</p>
      <ul class="cmd-liste e">
        <li>aistudio.google.com/apikey<span class="lieu">un compte Google suffit · aucune carte de crédit</span></li>
      </ul>
    </Slide>

    <Slide fond="encre" bandeau="Deuxième temps" droite="séance 1 · lun 24 août">
      <h1 class="e">Pourquoi ne pas utiliser le chat classique<br />mais l'API ?</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Situer la chose" droite="séance 1 · lun 24 août">
      <h2 class="e">Un API, c'est une adresse à qui on écrit</h2>
      <Api />
      <p class="e">
        Le modèle ne s'installe pas sur votre poste. Votre script lui envoie du texte&nbsp;; il en
        renvoie. Un API, c'est ce point d'entrée&nbsp;: une adresse à qui on écrit, et qui répond.
      </p>
    </Slide>

    <Slide bandeau="Où c'est, physiquement" droite="séance 1 · lun 24 août">
      <h2 class="e">L'adresse est un bâtiment</h2>
      <Centre />
      <p class="e credits">
        Colossus <Cite k="nvidia2024" />, puissance du H100 SXM d'après NVIDIA, ménage québécois
        d'après Hydro-Québec, eau <Cite k="li2023" />.
      </p>
    </Slide>

    <Slide bandeau="Le contexte" droite="séance 1 · lun 24 août">
      <h2 class="e">Chat vs API</h2>
      <Contexte />
    </Slide>

    <Slide bandeau="La fiche de méthode" droite="séance 1 · lun 24 août">
      <h2 class="e">Ce que l'API rend possible</h2>
      <Fiches />
    </Slide>

    <Slide fond="encre" bandeau="Troisième temps" droite="séance 1 · lun 24 août">
      <h1 class="e">Premier appel,<br />sur de vraies données</h1>
      <hr class="filet" />
      <p class="lead e">De la réponse en texte libre à la variable exploitable.</p>
    </Slide>

    <Slide bandeau="Le corpus de la semaine" droite="séance 1 · lun 24 août">
      <h2 class="e">La Ligne Rouge</h2>
      <MurAvis />
    </Slide>

    <Slide bandeau="L'ancienne façon" droite="séance 1 · lun 24 août">
      <h2 class="e">Avant : Utilisation de dictionnaires</h2>
      <Dictionnaire />
    </Slide>

    <Slide bandeau="La nouvelle façon" droite="séance 1 · lun 24 août">
      <h2 class="e">Maintenant : Utilisation de LLMs</h2>
      <Classifieur />
    </Slide>

    <Slide bandeau="La même donnée, d'autres questions" droite="séance 1 · lun 24 août">
      <h2 class="e">On ne change pas la donnée, on change la consigne</h2>
      <Extractions />
      <p class="e credits">
        Six appels réels à <code>gemini-3.5-flash-lite</code>, température 0, sortie JSON imposée.
      </p>
    </Slide>

    <Slide bandeau="Outillage" droite="séance 1 · lun 24 août">
      <div class="ell e">
        <figure class="ell-logo">
          <img src="{base}/img/ellmer.png" alt="Logo du paquet R ellmer" />
        </figure>
        <div class="ell-txt">
          <h2 class="e">ellmer</h2>
          <p class="ell-sous">Un paquet R pour parler aux modèles de langage.</p>
          <ul class="ell-pts">
            <li><strong>Vingt-trois fournisseurs</strong>, une seule syntaxe</li>
            <li>Changer de modèle tient sur une ligne</li>
            <li>Maintenu par l'équipe de tidyverse</li>
          </ul>
          <p class="ell-cmd">install.packages("ellmer")</p>
        </div>
      </div>
      <Code
        petit
        src={`chat_openrouter(model = "${FOURNISSEUR_SECOURS.modele}")
chat_google_gemini(model = "${FOURNISSEUR.modele}")
chat_openai(model  = "gpt-4o-mini")
chat_anthropic(model = "claude-sonnet-5")
chat_ollama(model = "gemma3")     # sur VOTRE machine`}
      />
    </Slide>

    <Slide bandeau="Le plus petit appel possible" droite="séance 1 · lun 24 août">
      <h2 class="e">Poser une question, obtenir du texte</h2>
      <Code src={c_capitale} />
    </Slide>

    <Slide d={0.86} bandeau="La boucle" droite="séance 1 · lun 24 août">
      <h2 class="e">Le même geste, sur un vecteur</h2>
      <Code src={c_boucle} />
    </Slide>

    <Slide bandeau="Le catalogue" droite="séance 1 · lun 24 août">
      <h2 class="e">Comment choisir son modèle ?</h2>
      <Modeles />
      <p class="e credits">Catalogue OpenRouter relevé le 24 août 2026.</p>
    </Slide>

    <Slide bandeau="Un classement par duels" droite="séance 1 · lun 24 août">
      <h2 class="e">LM Arena</h2>
      <Arena />
      <p class="e credits">
        Méthode et volume de votes <Cite k="chiang2024" />.
      </p>
    </Slide>

    <Slide bandeau="Sécurité" droite="séance 1 · lun 24 août">
      <h2 class="e">La clé se dépose dans .Renviron</h2>
      <Code src={c_renviron} />
      <Deux>
        <Carte ton="rose" titre="Jamais">
          <p>Jamais dans un script. Jamais dans un dépôt Git. Jamais dans une capture d'écran de diapositive.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="La marche à suivre" droite="séance 1 · lun 24 août">
      <h2 class="e">D'abord un échantillon, ensuite tout le corpus</h2>
      <Echantillon />
    </Slide>

    <Slide fond="encre" bandeau="Quatrième temps" droite="séance 1 · lun 24 août">
      <h1 class="e">Concevoir un prompt</h1>
      <hr class="filet" />
      <p class="lead e">Puis passage de relais à la séance 2.</p>
    </Slide>

    <Slide bandeau="La formule" droite="séance 1 · lun 24 août">
      <h2 class="e">Rôle → Tâche → Contraintes → Format</h2>
      <Anatomie />
      <p class="e">
        Avec la sortie structurée, le format se règle tout seul : le schéma <em>est</em> le format.
      </p>
    </Slide>

    <Slide bandeau="Avant / après" droite="séance 1 · lun 24 août">
      <h2 class="e">Le même besoin, deux prompts</h2>
      <div class="compare-p e">
        <div class="p faible">
          <span class="et">FAIBLE</span>
          <p class="txt">Analyse ce texte et dis-moi ce que tu en penses.</p>
          <p class="pourquoi">Aucun critère, aucun format. La sortie change à chaque appel.</p>
        </div>
        <div class="p solide">
          <span class="et">SOLIDE</span>
          <p class="txt">
            Tu codes des avis de restaurant pour une recherche en sciences sociales. Attribue la note
            en étoiles que l'auteur a le plus vraisemblablement laissée. Fonde-toi sur le jugement
            global, pas sur le nombre de mots positifs. Réponds selon le schéma fourni.
          </p>
          <p class="pourquoi">Rôle, tâche, critère de décision, format. Les quatre y sont.</p>
        </div>
      </div>
    </Slide>

    <Slide bandeau="Un conseil qui surprend" droite="séance 1 · lun 24 août">
      <h2 class="e">Demandez à l'IA d'écrire le prompt</h2>
      <Deux ratio="1fr 1fr">
        <Carte ton="ciel" titre="Ce que vous écrivez">
          <p>
            « Je veux classer des avis de restaurant sur une échelle de −1 à +1. Écris-moi le prompt
            système qui fera ça, avec un format de sortie strict. »
          </p>
        </Carte>
        <Carte ton="vert" titre="Ce que vous obtenez">
          <p>
            Un prompt mieux structuré que le vôtre, en quelques secondes. Vous le lisez, vous le
            corrigez, vous le gardez dans votre script.
          </p>
        </Carte>
      </Deux>
      <p class="e">
        Le modèle connaît mieux que vous la forme de consigne à laquelle il obéit. Autant s'en servir.
      </p>
    </Slide>

    <Slide bandeau="Mesurer" droite="séance 1 · lun 24 août">
      <h2 class="e">La précision du modèle n'est pas toujours la bonne mesure</h2>
      <Mesures />
    </Slide>

    <Slide bandeau="Confidentialité" droite="séance 1 · lun 24 août">
      <h2 class="e">Confidentialité des données</h2>
      <Donnees />
      <p class="e credits">
        Règles de l'API relevées dans la documentation d'OpenAI le 24 août 2026. Les modèles ouverts
        et leurs enjeux : avec Antoine, plus tard cette semaine.
      </p>
    </Slide>

    <Slide fond="encre" droite="séance 1 · lun 24 août">
      <h1 class="e">Et maintenant ?</h1>
      <hr class="filet" />
      <ul class="qs e">
        <li>Comment valider un modèle ?</li>
        <li>Quels scores utiliser ?</li>
        <li>Est-ce que la précision est toujours bonne ?</li>
      </ul>
      <p class="lead e">
        Demain et mercredi, <strong>Antoine Lemor</strong> vous montrera comment valider un modèle et
        quels scores utiliser.
      </p>
    </Slide>

    <Slide bandeau="Séance 1 · fin" droite="séance 1 · lun 24 août">
      <h1 class="e">Merci</h1>
    </Slide>

    <Slide bandeau="Sources" droite="séance 1 · lun 24 août">
      <h2 class="e">Sources</h2>
      <hr class="filet" />
      <div class="biblio-boite e">
        <ul class="biblio">
        {#each ORDRE_BIBLIO as k}
          <li>
            <span class="b-auteurs">{REFERENCES[k].auteurs}</span>,
            <span class="b-titre">{REFERENCES[k].titre}</span>.
            <span class="b-detail">{REFERENCES[k].detail}</span>
          </li>
        {/each}
        </ul>
      </div>
      <p class="e credits">
        Images d'archives, Wikimedia Commons :
        {#each Object.values(CREDITS_IMAGES) as c, i}{i > 0 ? ' · ' : ''}{c.auteur} ({c.licence}){/each}
      </p>
    </Slide>

  {/snippet}
</Deck>
