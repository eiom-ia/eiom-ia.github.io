<script>
  import { base } from '$app/paths';
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
  import Code from '$lib/deck/Code.svelte';
  import Carte from '$lib/deck/Carte.svelte';
  import Deux from '$lib/deck/Deux.svelte';
  import Etiquette from '$lib/deck/Etiquette.svelte';
  import Grand from '$lib/deck/Grand.svelte';
  import Citation from '$lib/deck/Citation.svelte';
  import Cite from '$lib/deck/Cite.svelte';
  import Frise from '$lib/deck/demos/Frise.svelte';
  import Arbre from '$lib/deck/demos/Arbre.svelte';
  import Pipeline from '$lib/deck/demos/Pipeline.svelte';
  import Api from '$lib/deck/demos/Api.svelte';
  import MurAvis from '$lib/deck/demos/MurAvis.svelte';
  import Fiches from '$lib/deck/demos/Fiches.svelte';
  import Classifieur from '$lib/deck/demos/Classifieur.svelte';
  import Hallucination from '$lib/deck/demos/Hallucination.svelte';
  import { REFERENCES, ORDRE_BIBLIO } from '$lib/data/references.js';
  import { CREDITS_IMAGES } from '$lib/data/credits-images.js';
  import Tokeniseur from '$lib/deck/demos/Tokeniseur.svelte';
  import ProchainJeton from '$lib/deck/demos/ProchainJeton.svelte';
  import { FOURNISSEUR, FOURNISSEUR_SECOURS, URL_OUTILS_R } from '$lib/data/config.js';

  const TOTAL = 46;

  const c_premier = `library(ellmer)
source("${URL_OUTILS_R}")

chat <- creer_chat_eiom(
  echo   = "none",
  temperature = 0
)

chat$chat("Resume cet avis en trois mots.")`;

  const c_systeme = `chat <- creer_chat_eiom(
  system_prompt = paste(
    "Tu codes des avis de restaurant pour une recherche",
    "en sciences sociales. Tu ne commentes jamais,",
    "tu ne justifies jamais. Tu reponds selon le schema."
  ),
  temperature = 0
)`;

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
      <h1 class="e">L'IA en recherche</h1>
      <hr class="filet" />
      <p class="lead e">
        Parcours <em>L'intelligence artificielle (IA) et la recherche</em> — EIOM 2026
      </p>
    </Slide>

    <Slide bandeau="À propos de moi" droite="séance 1 · lun 24 août">
      <Deux ratio="1.85fr 1fr">
        <div>
          <h2 class="e">À propos de moi</h2>
          <p class="lead e">Laurence-Olivier M. Foisy</p>
          <hr class="filet" />
          <ul class="cmd-liste e">
            <li>Enseignement du cours Introduction aux mégadonnées en sciences sociales<span class="lieu">Université de Montréal · FAS-1001</span></li>
            <li>Doctorat en science politique<span class="lieu">Université Laval</span></li>
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

      <p class="e">8h45 à 12h45, du 24 au 28 août.</p>
    </Slide>

    <Slide bandeau="Plan de la session" droite="séance 1 · lun 24 août">
      <h2 class="e">Plan de la session</h2>
      <hr class="filet" />
      <ul class="cmd-liste e">
        <li>Comment fonctionne un LLM</li>
        <li>Pourquoi l’API, puis installation</li>
        <li>Premier appel sur de vraies données</li>
        <li>Conception de prompts et clôture</li>
      </ul>
    </Slide>

    <Slide fond="encre" bandeau="Définir l'IA" droite="séance 1 · lun 24 août">
      <h1 class="e">Qu’est-ce que l’IA</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Définir l'IA" droite="séance 1 · lun 24 août">
      <h2 class="e">Il y a plusieurs définitions de l'IA</h2>
      <hr class="filet" />
      <ul class="defs e">
        <li class="retenue">
          <span class="lettre">A</span>
          <span class="q">Est-ce que ça peut décider et agir ? <Cite k="russell2020" /></span>
        </li>
        <li>
          <span class="lettre">B</span>
          <span class="q">Est-ce que ça peut passer pour un humain ? <Cite k="turing1950" /></span>
        </li>
        <li>
          <span class="lettre">C</span>
          <span class="q">Est-ce que ça décide par la statistique ? <Cite k="jordan2015" /></span>
        </li>
      </ul>
      <p class="e">
        Aucun consensus : 70+ définitions recensées.
        <Cite k="legg2007" /> <Cite k="wang2019" />
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Définir l'IA" droite="séance 1 · lun 24 août">
      <h2 class="e">Les LLM répondent aux trois</h2>
      <hr class="filet" />
      <ul class="defs e">
        <li class="retenue">
          <span class="lettre">A</span>
          <span class="q">Ils décident et agissent — on le verra jeudi</span>
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
      <p class="lead e">C'est bel et bien de l'IA.</p>
    </Slide>

    <Slide bandeau="Situer les familles" droite="séance 1 · lun 24 août">
      <h2 class="e">Le mot « IA » recouvre des familles distinctes</h2>
      <Arbre />
      <p class="e credits">
        Schéma original, inspiré de l’arbre évolutif des LLM de <Cite k="yang2023" />.
      </p>
    </Slide>

    <Slide bandeau="Distinction fondatrice" droite="séance 1 · lun 24 août">
      <h2 class="e">Classifieur ou modèle génératif</h2>
      <hr class="filet" />
      <table class="compare e">
        <thead>
          <tr><th></th><th class="a">Classifieur</th><th class="b">Génératif</th></tr>
        </thead>
        <tbody>
          <tr><td class="crit">Annotations</td><td>les vôtres</td><td class="val-b">aucune</td></tr>
          <tr><td class="crit">Sortie</td><td>contrainte</td><td class="val-b">texte libre</td></tr>
          <tr><td class="crit">Reproductibilité</td><td>exacte</td><td class="val-b">fragile</td></tr>
          <tr><td class="crit">Coût</td><td>à l’entraînement</td><td class="val-b">par document</td></tr>
          <tr><td class="crit">Portée</td><td>une tâche</td><td class="val-b">toutes</td></tr>
        </tbody>
      </table>
    </Slide>

    <Slide bandeau="Une histoire de l'IA" droite="séance 1 · lun 24 août">
      <h2 class="e">Histoire de l'IA</h2>
      <Frise />
      <p class="e credits">
        Chaque repère est placé à sa date réelle. Les années 1962 à 1995 sont resserrées.
        <Cite k="turing1950" /> <Cite k="mccarthy1955" />
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Les modèles de langage" droite="séance 1 · lun 24 août">
      <h1 class="e">Comment fonctionne<br />un modèle de langage</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Les données d’entraînement" droite="séance 1 · lun 24 août">
      <h2 class="e">Ce que le modèle a lu</h2>
      <hr class="filet" />
      <ul class="barres e">
        <li class="majeur"><span class="src">CommonCrawl</span><span class="piste-b"><span class="rempli" style="width: 100%"></span></span><span class="pct">67 %</span></li>
        <li><span class="src">C4</span><span class="piste-b"><span class="rempli" style="width: 22.4%"></span></span><span class="pct">15 %</span></li>
        <li><span class="src">GitHub</span><span class="piste-b"><span class="rempli" style="width: 6.7%"></span></span><span class="pct">4,5 %</span></li>
        <li><span class="src">Wikipédia</span><span class="piste-b"><span class="rempli" style="width: 6.7%"></span></span><span class="pct">4,5 %</span></li>
        <li><span class="src">Livres</span><span class="piste-b"><span class="rempli" style="width: 6.7%"></span></span><span class="pct">4,5 %</span></li>
        <li><span class="src">ArXiv</span><span class="piste-b"><span class="rempli" style="width: 3.7%"></span></span><span class="pct">2,5 %</span></li>
        <li><span class="src">StackExchange</span><span class="piste-b"><span class="rempli" style="width: 3%"></span></span><span class="pct">2 %</span></li>
      </ul>
      <p class="e credits">Corpus d’entraînement de LLaMA <Cite k="touvron2023" />.</p>
    </Slide>

    <Slide bandeau="Mécanique" droite="séance 1 · lun 24 août">
      <h2 class="e">Tout ce qu'il fait, c'est prédire le jeton suivant</h2>
      <ProchainJeton />
    </Slide>

    <Slide bandeau="Mécanique" droite="séance 1 · lun 24 août">
      <h2 class="e">Le modèle ne voit pas des mots</h2>
      <p class="e">Il voit des jetons — des fragments, ni lettres ni mots. Essayez :</p>
      <Tokeniseur />
      <p class="e credits">
        Le surcoût vaut pour toutes les langues éloignées de l'anglais, et la qualité y baisse
        aussi <Cite k="ahia2023" />.
      </p>
    </Slide>

    <Slide bandeau="Le paramètre qui compte" droite="séance 1 · lun 24 août">
      <h2 class="e">La température</h2>
      <Deux ratio="1.1fr 1fr">
        <div>
          <p>Elle règle la façon de piger dans la distribution des jetons possibles.</p>
          <table>
            <thead><tr><th>Valeur</th><th>Comportement</th><th>Usage</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>Prend toujours le plus probable</td><td><strong>Codage, mesure</strong></td></tr>
              <tr><td>0,7</td><td>Varie raisonnablement</td><td>Rédaction assistée</td></tr>
              <tr><td>1,5</td><td>Prend des risques</td><td>Exploration créative</td></tr>
            </tbody>
          </table>
        </div>
        <Carte ton="rose" titre="Le piège à ne pas répéter">
          <p>
            Température zéro rend les sorties <em>plus stables</em>. Elle ne les rend pas
            <strong>déterministes</strong> : le calcul en virgule flottante sur GPU et le routage entre
            serveurs introduisent de la variation résiduelle.
          </p>
          <p>Écrire « résultats déterministes car température = 0 » dans un article, c'est se tromper.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Ce qu'un LLM n'est pas" droite="séance 1 · lun 24 août">
      <h2 class="e">Ce n'est pas une base de connaissances</h2>
      <Deux>
        <Carte ton="ciel" titre="Une base de données">
          <p>Stocke des faits. Les restitue à l'identique. Dit « je n'ai pas » quand elle n'a pas.</p>
        </Carte>
        <Carte ton="rose" titre="Un LLM">
          <p>Stocke des régularités statistiques dans des poids figés. Reconstitue quelque chose de plausible. Ne sait pas qu'il ne sait pas.</p>
        </Carte>
      </Deux>
      <Citation source="Le principe à retenir">
        Une référence bibliographique produite par un modèle est une <em>hypothèse de référence</em>
        jusqu'à ce que vous l'ayez vérifiée dans un catalogue.
      </Citation>
    </Slide>

    <Slide fond="encre" bandeau="Reformulation" droite="séance 1 · lun 24 août">
      <h2 class="e">L'hallucination n'est pas un bogue</h2>
      <Hallucination />
      <p class="e">Aucun prompt ne corrige ça. On le contient par un dispositif.</p>
      <p class="e credits">
        Sortie contrainte · vérification externe · validation sur vérité terrain — le programme de la
        semaine.
      </p>
    </Slide>

    <Slide fond="encre" bandeau="Les biais" droite="séance 1 · lun 24 août">
      <h1 class="e">Les biais</h1>
      <hr class="filet" />
    </Slide>

    <Slide bandeau="Biais · 1 sur 3" droite="séance 1 · lun 24 août">
      <h2 class="e">Dans les données</h2>
      <Pipeline etape="corpus" />
      <Deux>
        <Carte titre="Ce qui entre">
          <p>Deux tiers du corpus sont un balayage du web <Cite k="touvron2023" />.</p>
        </Carte>
        <Carte titre="Comment on le mesure">
          <p>En comparant les sorties du modèle à une référence externe.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Biais · 2 sur 3" droite="séance 1 · lun 24 août">
      <h2 class="e">Dans le balisage</h2>
      <Pipeline etape="balisage" />
      <Deux>
        <Carte titre="Ce qui entre">
          <p>Des humains rédigent des réponses exemplaires, puis en classent d’autres. Le modèle apprend ce qui plaît.</p>
        </Carte>
        <Carte titre="Comment on le mesure">
          <p>Par l’accord entre codeurs, sur un sous-échantillon annoté deux fois.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Biais · 3 sur 3" droite="séance 1 · lun 24 août">
      <h2 class="e">Dans le modèle</h2>
      <Pipeline etape="entrainement" />
      <Deux>
        <Carte titre="Ce qui entre">
          <p>L’optimisation retient la régularité majoritaire. La tokenisation elle-même découpe inégalement les langues.</p>
        </Carte>
        <Carte titre="Comment on le mesure">
          <p>En comparant plusieurs modèles sur la même tâche et le même corpus.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide fond="encre" bandeau="Pause" droite="séance 1 · lun 24 août">
      <h1 class="e">Pause</h1>
      <hr class="filet" />
      <div class="grand e">
        <span class="v">15</span>
        <span class="l">minutes</span>
      </div>
      <p class="lead e">Pendant la pause, allez chercher votre clé.</p>
      <ul class="cmd-liste e">
        <li>aistudio.google.com/apikey<span class="lieu">un compte Google suffit · aucune carte de crédit</span></li>
      </ul>
    </Slide>

    <Slide fond="encre" bandeau="Deuxième temps" droite="séance 1 · lun 24 août">
      <h1 class="e">Pourquoi l'API,<br />et pas le clavardage</h1>
      <hr class="filet" />
      <p class="lead e">Puis installation guidée, avec vérification pour chaque poste.</p>
    </Slide>

    <Slide bandeau="Situer la chose" droite="séance 1 · lun 24 août">
      <h2 class="e">Où vit le modèle, et ce qui voyage</h2>
      <Api />
      <p class="e">
        Le modèle ne s'installe pas sur votre poste. Votre script lui envoie du texte&nbsp;; il en
        renvoie. Un API, c'est ce point d'entrée&nbsp;: une adresse à qui on écrit, et qui répond.
      </p>
    </Slide>

    <Slide bandeau="La thèse" droite="séance 1 · lun 24 août">
      <h2 class="e">Une sortie de chatbot n'est pas une donnée</h2>
      <p class="lead e">
        Ce n'est pas une question de puissance : c'est la même famille de modèles derrière les deux.
        C'est une question de <strong>traçabilité</strong>.
      </p>
      <Deux>
        <Carte ton="rose" titre="Dans une fenêtre de clavardage">
          <ul>
            <li>Quelle version du modèle? Inconnue, et elle change sans préavis</li>
            <li>Quelle température? Inconnue</li>
            <li>Quel contexte antérieur a influencé la réponse? Toute la conversation</li>
            <li>Refaire tourner sur 500 documents? À la main</li>
          </ul>
        </Carte>
        <Carte ton="vert" titre="Par l'API">
          <ul>
            <li>Modèle épinglé et écrit dans le code</li>
            <li>Paramètres explicites</li>
            <li>Chaque document est un appel indépendant</li>
            <li>500 documents : une boucle</li>
          </ul>
        </Carte>
      </Deux>
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
      <p class="e">
        551 avis Google d'un casse-croûte de Montréal, en français et en anglais. Chacun arrive avec
        l'étoile laissée par son auteur : la <strong>vérité terrain</strong> est déjà dans la donnée.
      </p>
    </Slide>

    <Slide bandeau="Regarder avant de modéliser" droite="séance 1 · lun 24 août">
      <h2 class="e">La distribution est écrasée</h2>
      <Deux ratio="1fr 1.1fr">
        <table>
          <thead><tr><th>Note</th><th class="num-c">n</th><th class="num-c">Part</th></tr></thead>
          <tbody>
            <tr><td>5 étoiles</td><td class="num-c">384</td><td class="num-c">70 %</td></tr>
            <tr><td>4 étoiles</td><td class="num-c">81</td><td class="num-c">15 %</td></tr>
            <tr><td>3 étoiles</td><td class="num-c">29</td><td class="num-c">5 %</td></tr>
            <tr><td>2 étoiles</td><td class="num-c">16</td><td class="num-c">3 %</td></tr>
            <tr><td>1 étoile</td><td class="num-c">41</td><td class="num-c">7 %</td></tr>
          </tbody>
        </table>
        <Carte ton="rose" titre="Le piège, et il est majeur">
          <p>
            Un modèle qui répondrait <strong>« 5 »</strong> à tous les avis, sans jamais les lire,
            obtiendrait <strong>70 % d'exactitude</strong>.
          </p>
          <p>
            Vous pourriez l'écrire dans un article. Ce serait vrai. Et ce serait vide de sens.
          </p>
          <p>
            <Etiquette ton="ciel">C'est exactement le sujet de mardi</Etiquette>
          </p>
        </Carte>
      </Deux>
      <p class="e">
        Retenez le geste : <strong>regarder la distribution de sa variable cible avant de lancer quoi
        que ce soit.</strong> Ce n'est pas propre au LLM, c'est de la méthode élémentaire.
      </p>
    </Slide>

    <Slide bandeau="Avis réel · noté 5 étoiles" droite="séance 1 · lun 24 août">
      <Citation source="La Ligne Rouge, corpus de la semaine">
        Excellents gyros. Bien sûr, le service est raide, c'est fermé pour on ne sait pas quoi, mais on
        s'en fout. On n'est pas à Saint-Lambert, pas besoin de courbettes. Amenez votre monnaie papier.
      </Citation>
      <Carte ton="ambre" titre="Ce qui rend cet avis difficile">
        <p>
          Trois éléments explicitement négatifs — service raide, fermetures imprévisibles, argent
          comptant obligatoire — et pourtant cinq étoiles. Le sentiment de surface et la note ne
          coïncident pas.
        </p>
      </Carte>
    </Slide>

    <Slide bandeau="Avis réel · noté 3 étoiles" droite="séance 1 · lun 24 août">
      <Citation source="La Ligne Rouge, corpus de la semaine">
        Bon snack, service rapide, le personnel est sympa. Les frites sont bonnes et le pita aussi.
        Seuls points négatifs : la propreté des locaux et la qualité de la viande.
      </Citation>
      <Carte ton="ciel" titre="Le cas facile">
        <p>
          Structure claire, positif puis négatif, vocabulaire explicite. Tous les outils réussissent
          celui-ci — y compris un dictionnaire des années 1990. Ce n'est pas là qu'un LLM se justifie.
        </p>
      </Carte>
    </Slide>

    <Slide bandeau="Avis réel · noté 1 étoile" droite="séance 1 · lun 24 août">
      <Citation source="La Ligne Rouge, corpus de la semaine">
        Pourquoi fermer, sans le mentionner sur Google, alors qu'il a toujours été possible de commander
        à emporter ? #PetitCoeurBrisé
      </Citation>
      <Carte ton="rose" titre="Le cas qui décide de la valeur de votre mesure">
        <p>
          Une étoile — mais aucun jugement sur la nourriture, aucun mot négatif sur le restaurant, et un
          mot-clic <em>affectueux</em>. C'est un reproche de déception amoureuse, pas une critique
          culinaire.
        </p>
        <p>
          Que doit prédire votre modèle ici ? La réponse dépend de votre question de recherche, pas du
          modèle. <strong>C'est vous qui devez trancher, et l'écrire.</strong>
        </p>
      </Carte>
    </Slide>

    <Slide bandeau="Le geste, au ralenti" droite="séance 1 · lun 24 août">
      <h2 class="e">Classifier une colonne, ligne par ligne</h2>
      <Classifieur />
    </Slide>

    <Slide bandeau="Anatomie" droite="séance 1 · lun 24 août">
      <h2 class="e">Un appel, ligne par ligne</h2>
      <Code src={c_premier} />
      <Deux ratio="1fr 1fr 1fr">
        <Carte ton="ciel" titre="model"><p>Épinglé. Cité dans l'article.</p></Carte>
        <Carte ton="ciel" titre="temperature"><p>Zéro pour une tâche de mesure.</p></Carte>
        <Carte ton="ciel" titre="echo"><p>« none » : on ne veut pas 500 réponses à l'écran.</p></Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Le rôle système" droite="séance 1 · lun 24 août">
      <h2 class="e">Poser le cadre une fois, pas à chaque avis</h2>
      <Code src={c_systeme} />
      <Deux>
        <Carte ton="vert" titre="Ce qu'on y met">
          <p>Le rôle, le domaine, les interdits de forme. Ce qui vaut pour <em>tous</em> les documents.</p>
        </Carte>
        <Carte ton="ambre" titre="Ce qu'on n'y met pas">
          <p>Le document à analyser. Il change à chaque appel : il va dans le message utilisateur.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Outillage" droite="séance 1 · lun 24 août">
      <h2 class="e">ellmer, une interface pour vingt-trois fournisseurs</h2>
      <Deux ratio="1.1fr 1fr">
        <Code src={`library(ellmer)

# Le meme code, un fournisseur different:
chat_google_gemini(model = "${FOURNISSEUR.modele}")
chat_openai(model  = "gpt-4o-mini")
chat_anthropic(model = "claude-sonnet-5")
chat_openrouter(model = "${FOURNISSEUR_SECOURS.modele}")
chat_ollama(model = "gemma3")     # sur VOTRE machine`} />
        <Carte ton="ciel" titre="Pourquoi ça compte">
          <p>
            Changer de fournisseur devient une ligne. Vous pouvez donc <strong>comparer</strong> deux
            modèles sur la même tâche — ce qui est une exigence de validation, pas un luxe.
          </p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Sécurité" droite="séance 1 · lun 24 août">
      <h2 class="e">La clé se dépose dans .Renviron</h2>
      <Code src={c_renviron} />
      <Deux>
        <Carte ton="rose" titre="Jamais">
          <p>Jamais dans un script. Jamais dans un dépôt Git. Jamais dans une capture d'écran de diapositive.</p>
        </Carte>
        <Carte ton="ambre" titre="Note pour ellmer 0.4">
          <p>
            L'argument <code>api_key</code> est <strong>déprécié</strong>. On passe par la variable
            d'environnement, ou par <code>credentials</code> pour les cas particuliers.
          </p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Méthode" droite="séance 1 · lun 24 août">
      <h2 class="e">Tester sur cinq documents avant de lancer sur cinq cents</h2>
      <Deux>
        <Carte ton="vert" titre="La discipline">
          <ul>
            <li>Cinq documents, choisis pour être difficiles</li>
            <li>On lit les cinq sorties à l'œil</li>
            <li>On ajuste le schéma ou le prompt</li>
            <li><em>Puis</em> on lance le corpus</li>
          </ul>
        </Carte>
        <Carte ton="rose" titre="Ce que ça évite">
          <p>
            Découvrir après 40 minutes d'exécution et quatre dollars que le schéma retournait
            systématiquement « neutre » parce qu'une modalité était mal orthographiée.
          </p>
        </Carte>
      </Deux>
    </Slide>

    <Slide fond="encre" bandeau="Quatrième temps" droite="séance 1 · lun 24 août">
      <h1 class="e">Concevoir un prompt<br />qui tient</h1>
      <hr class="filet" />
      <p class="lead e">Puis passage de relais à la séance 2.</p>
    </Slide>

    <Slide bandeau="La formule" droite="séance 1 · lun 24 août">
      <h2 class="e">Rôle → Tâche → Contraintes → Format</h2>
      <Deux>
        <Carte ton="vert" titre="Quatre règles">
          <ul>
            <li>Dire clairement la tâche</li>
            <li>Définir le format de sortie</li>
            <li>Donner le contexte utile, et lui seul</li>
            <li>Montrer un exemple si la tâche est subtile</li>
          </ul>
        </Carte>
        <Carte ton="rose" titre="Quatre fautes">
          <ul>
            <li>Prompt vague</li>
            <li>Plusieurs tâches à la fois</li>
            <li>Format implicite</li>
            <li>Consignes contradictoires</li>
          </ul>
        </Carte>
      </Deux>
      <p class="e">
        Avec la sortie structurée, la troisième règle se règle toute seule : le schéma <em>est</em> le
        format. Un souci de moins.
      </p>
    </Slide>

    <Slide bandeau="Avant / après" droite="séance 1 · lun 24 août">
      <h2 class="e">Le même besoin, deux prompts</h2>
      <Deux>
        <div>
          <Code titre="Faible" src={`Analyse ce texte et dis-moi ce que tu en penses.`} />
          <Carte ton="rose" titre="Pourquoi">
            <p>Tâche floue, aucun critère, aucun format. La sortie sera différente à chaque appel : impossible à agréger.</p>
          </Carte>
        </div>
        <div>
          <Code titre="Solide" src={`Tu codes des avis de restaurant pour une
recherche en sciences sociales.

Attribue la note en etoiles que l'auteur a
le plus vraisemblablement laissee.

Fonde-toi sur le jugement global, pas sur le
nombre de mots positifs. Un avis peut etre
critique et genereux a la fois.

Reponds selon le schema fourni.`} />
          <Carte ton="vert" titre="Pourquoi">
            <p>Rôle, tâche, critère de décision explicite sur le cas difficile, format délégué au schéma.</p>
          </Carte>
        </div>
      </Deux>
    </Slide>

    <Slide bandeau="Un conseil qui surprend" droite="séance 1 · lun 24 août">
      <h2 class="e">Écrire le prompt en anglais fonctionne souvent mieux</h2>
      <Deux ratio="1.1fr 1fr">
        <div>
          <p>
            Les consignes techniques sont mieux suivies en anglais, parce que l'ajustement par retours
            humains a été fait massivement en anglais.
          </p>
          <p>
            Rien n'empêche d'analyser du texte français avec un prompt anglais. Les deux décisions sont
            indépendantes.
          </p>
        </div>
        <Carte ton="ambre" titre="Mais testez, ne croyez pas">
          <p>
            C'est une régularité, pas une loi. Sur votre tâche et votre corpus, la seule réponse valable
            vient d'une comparaison mesurée. <Etiquette ton="ciel">séance 2</Etiquette>
          </p>
        </Carte>
      </Deux>
    </Slide>

    <Slide bandeau="Bilan" droite="séance 1 · lun 24 août">
      <h2 class="e">Ce que vous avez construit ce matin</h2>
      <Deux ratio="1fr 1fr">
        <Carte ton="ciel" titre="Un dispositif">
          <ul>
            <li>Un environnement reproductible</li>
            <li>Un modèle épinglé</li>
            <li>Un schéma qui déclare vos variables</li>
            <li>Une boucle qui résiste aux pannes</li>
            <li>Un journal daté</li>
          </ul>
        </Carte>
        <Carte ton="ambre" titre="Et une mesure">
          <p>Une note prédite pour cinquante avis.</p>
          <p>Produite par vous, sur des données réelles, en un peu plus de deux heures.</p>
        </Carte>
      </Deux>
    </Slide>

    <Slide fond="encre" droite="séance 1 · lun 24 août">
      <h1 class="e">La mesure n’est pas encore validée</h1>
      <hr class="filet" />
      <p class="lead e">
        Pas encore. Vous n'avez aucune idée si ces cinquante notes sont bonnes. Vous ne savez pas si le
        modèle lit l'ironie, s'il traite le français comme l'anglais, ni s'il fait mieux que répondre
        « 5 » les yeux fermés — ce qui, souvenez-vous, donne déjà 70 %.
      </p>
      <Carte ton="ciel" titre="Demain matin, avec Antoine Lemor">
        <p>
          On confronte votre <code>seance1_notes.json</code> à la colonne <code>review_rating</code>.
          Métriques, benchmarks, cas ambigus. C'est là que votre mesure devient un résultat — ou qu'elle
          meurt, ce qui est aussi un résultat.
        </p>
      </Carte>
    </Slide>

    <Slide bandeau="Séance 1 · fin" droite="séance 1 · lun 24 août">
      <h2 class="e">Merci</h2>
      <hr class="filet" />
      <Deux>
        <div>
          <p>Tout le matériel, les scripts et ce deck :</p>
          <p><strong>eiom-ia.github.io</strong></p>
        </div>
        <div>
          <p>Une question, aujourd'hui ou plus tard :</p>
          <p><strong>mail@mfoisy.com</strong></p>
        </div>
      </Deux>
    </Slide>

    <Slide d={0.93} bandeau="Sources" droite="séance 1 · lun 24 août">
      <h2 class="e">Sources</h2>
      <hr class="filet" />
      <ul class="biblio e">
        {#each ORDRE_BIBLIO as k}
          <li>
            <span class="b-auteurs">{REFERENCES[k].auteurs}</span>,
            <span class="b-titre">{REFERENCES[k].titre}</span>.
            <span class="b-detail">{REFERENCES[k].detail}</span>
          </li>
        {/each}
      </ul>
      <p class="e">Bibliographie complète : <code>eiom-ia.github.io/references.bib</code></p>
      <p class="e credits">
        Images d'archives, Wikimedia Commons :
        {#each Object.values(CREDITS_IMAGES) as c, i}{i > 0 ? ' · ' : ''}{c.auteur} ({c.licence}){/each}
      </p>
    </Slide>

  {/snippet}
</Deck>
