# Devis de conception — Parcours IA, EIOM 2026

**Date** : 19 août 2026
**Auteur** : Laurence-Olivier M. Foisy, avec Claude
**Statut** : en attente de relecture

---

## 1. Contexte

Parcours **DKN-1289 — « L'intelligence artificielle (IA) et la recherche »**, nouveau à la 6ᵉ édition de l'École interdisciplinaire outils & méthodes (EIOM), Université Laval, du 24 au 28 août 2026. Co-animé par Laurence-Olivier M. Foisy et Antoine Lemor.

Les parcours de l'EIOM occupent le matin, **8h45 à 12h45** : cinq séances de quatre heures. Les midis-métho (13h–14h) et les ateliers (14h15–16h15) relèvent d'une autre programmation et sortent du périmètre.

Répartition convenue :

| Séance | Date | Titre | Responsable |
|---|---|---|---|
| 1 | lundi 24 août | Comprendre les LLM et y accéder pour la recherche | **LOMF** |
| 2 | mardi 25 août | Valider les LLM dans un cadre scientifique | Antoine Lemor |
| 3 | mercredi 26 août | Des sorties de modèles aux mesures scientifiques | Antoine Lemor |
| 4 | jeudi 27 août | L'IA agentique dans le flux de travail de recherche | **LOMF** |
| 5 | vendredi 28 août | Visite d'industrie + atelier intégratif | AL + **contribution LOMF (~2 h)** |

## 2. Périmètre

**Dans le périmètre.** Le contenu complet des séances 1 et 4 ; la contribution d'environ deux heures à la séance 5 ; le site du parcours dans son entièreté (coquille, navigation, système de design) ; le guide d'installation ; les jeux de données et scripts R distribués ; les gabarits de page que remplira Antoine pour les séances 2 et 3.

**Hors périmètre.** Le contenu des séances 2 et 3, qui appartient à Antoine — on ne définit que les interfaces. Les midis-métho et les ateliers de l'après-midi. La visite d'industrie qui occupe la première moitié de la séance 5.

## 3. Public et hypothèses

Chercheur·e·s et professionnel·le·s francophones en sciences sociales, tous cycles confondus, venant du Québec, du Canada et d'ailleurs.

Les compétences techniques sont **hétérogènes avec un plancher bas** : on tient pour acquis que certaines personnes n'auront jamais ouvert un terminal. R est la langue maternelle méthodologique de ce public ; Python n'intervient que là où il est incontournable.

**Conséquence dure, qui gouverne tout le reste** : la séance 1 doit se terminer avec 100 % des participant·e·s en état de travailler. Un échec d'installation le lundi matin ne dégrade pas la séance 1, il fait s'effondrer les séances 2 à 5, dont deux ne sont même pas les nôtres. Tout le design de la séance 1 découle de cette contrainte.

## 4. Décisions arrêtées

| Sujet | Décision | Motif |
|---|---|---|
| Accès aux modèles | **Google AI Studio, palier gratuit** | Seul palier gratuit majeur sans carte de crédit et sans expiration. 1 500 requêtes/jour et 15 RPM sur Flash, chaque participant·e disposant de son propre quota. Vérifié le 19 août 2026. |
| Client R | **ellmer 0.4.2** | Vérifié empiriquement sur la machine. Couvre tout le parcours : 23 fournisseurs, sortie structurée, appels parallèles, outils d'agent, images et PDF. |
| Langage | **R d'abord, Python en appui** | Langue du public. Python réservé aux modèles open weights (séance 3) et à `LLM_Tool` d'Antoine. |
| Stack du site | **SvelteKit + adapter-static** | Choix du client. Site et diapos dans la même technologie, animations agréables à écrire. |
| Hébergement | **GitHub Pages, dépôt public** | L'organisation `eiom-ia` est au plan gratuit : Pages ne publie pas depuis un dépôt privé. Dépôt basculé en public le 19 août 2026. |
| Fil rouge | **Corpus La Ligne Rouge** | Voir section 5. |

### Points techniques vérifiés, à ne pas écrire de mémoire

- Dans ellmer 0.4.2, l'argument **`api_key` est déprécié**. On enseigne la variable d'environnement `GEMINI_API_KEY` (ou `GOOGLE_API_KEY`) déposée dans `.Renviron`, et `credentials` pour les cas particuliers. Le matériel FAS1001 existant utilise l'ancien patron et doit être corrigé.
- Le modèle Gemini par défaut d'ellmer est `gemini-3.5-flash`, mais **la valeur par défaut change au fil des versions**. On épingle donc explicitement le modèle dans chaque appel. Ce n'est pas un détail de style : c'est la condition de reproductibilité d'un résultat de recherche.
- Depuis le 1ᵉʳ avril 2026, les modèles Pro ne sont plus offerts au palier gratuit. Seuls Flash et Flash-Lite le sont. Le matériel ne doit citer que des modèles Flash.
- La limite de 15 RPM interdit un `parallel_chat()` naïf. La limitation de débit devient donc un objet d'enseignement plutôt qu'un obstacle.

### Constats empiriques du 19 août 2026 — vérifiés par appel réel, pas par mémoire

Ces résultats proviennent d'appels réellement exécutés depuis la machine de développement. Ils
contredisent partiellement la documentation et les souvenirs du modèle, et doivent primer.

- **`type_enum(values, description)` prend les valeurs EN PREMIER**, la description ensuite. L'ordre
  inverse lève « @description must be a single string ». `type_object(.description, ...)` utilise des
  arguments préfixés d'un point. À écrire correctement dans tout le matériel de la séance 1.
- **GitHub Models est en cours de retrait** (« scheduled retirement brownout », HTTP 410). La piste
  `chat_github()` est morte. Ne pas l'inscrire au guide.
- **`gemini-2.5-flash` est retiré aux nouveaux usagers** (HTTP 404).
- **Tous les modèles Flash testés renvoient HTTP 429 sur la clé de développement**, avec le message
  « Your prepayment credits are depleted ». Cette clé est rattachée à un projet facturé dont les
  crédits sont épuisés : dans ce cas, **il n'y a pas de repli automatique vers le palier gratuit**.
  Il reste à établir si une clé neuve, sur un projet sans facturation, obtient bien le palier gratuit.
  **C'est la seule question ouverte du parcours, et elle est bloquante pour la séance 1.**
- **OpenRouter offre 19 modèles réellement gratuits** (prix nul à l'entrée comme à la sortie) sur les
  414 de son catalogue. Les candidats sérieux pour une salle de classe sont `google/gemma-4-31b-it:free`,
  `openai/gpt-oss-20b:free`, `z-ai/glm-5.2:free` et `openrouter/free`. Les noms de modèles gratuits
  changent souvent : toujours interroger `https://openrouter.ai/api/v1/models` plutôt que de citer
  une liste de mémoire.
- **Avantage pédagogique inattendu d'OpenRouter** : ses modèles gratuits sont en bonne partie des
  modèles *open weights* (Gemma, GPT-OSS, GLM, Nemotron). Utiliser l'un d'eux en séance 1 prépare
  concrètement l'argument de la séance 3 sur les modèles ouverts, au lieu de le contredire comme le
  ferait un modèle propriétaire.

### Une contrainte transformée en leçon

Au palier gratuit de Google, **les données transmises peuvent servir à améliorer les produits de Google**. C'est un enjeu déontologique réel dès qu'on traite des données de recherche sensibles, et il faut le dire franchement en séance 1. Cela installe naturellement l'argument central de la séance 3 d'Antoine sur les modèles open weights exécutés localement : confidentialité, reproductibilité, contrôle des coûts. La limite du dispositif pédagogique devient l'argument du lendemain.

## 5. Fil rouge : le corpus La Ligne Rouge

`ligne_rouge_cleaned.rds` — **551 avis Google du restaurant La Ligne Rouge (Montréal)**, déjà utilisé et éprouvé en classe. Colonnes utiles : `review_text` (texte libre, français et anglais mêlés), `review_rating` (note de 1 à 5), `owner_answer`, et des métadonnées d'auteur.

Pourquoi ce corpus plutôt que les données du CES :

- **La vérité terrain est native.** `review_rating` accompagne chaque texte. La validation de la séance 2 fonctionne donc immédiatement, sans aucun coût d'annotation humaine préalable — ce qui serait autrement le goulot d'étranglement de la semaine.
- **Le texte est réel et bruité.** Bilingue, familier, québécois, avec fautes et sarcasme. Ni corpus jouet, ni corpus propre.
- **La taille convient au palier gratuit.** 551 lignes se traitent dans les quotas, et un échantillon de 50 se traite pendant un bloc de cours.
- **Il est déjà éprouvé** dans l'enseignement de LOMF, donc les pièges sont connus.

**Traitement préalable obligatoire** : pseudonymiser `author_title`, qui contient des noms de personnes réelles, dans la version distribuée. Le fait même de devoir le faire devient un point d'enseignement sur les données personnelles dans les corpus moissonnés — on montre la transformation plutôt que de livrer un fichier déjà nettoyé en silence.

**Proposition à Antoine, non contraignante** : que les séances 2 et 3 réutilisent ce corpus, ce qui donnerait à la semaine un fil continu. S'il préfère le sien, la séance 1 tient sans modification — elle ne dépend d'aucun accord préalable.

## 6. Redistribution du matériel existant

C'est le point structurant de tout le devis. Le cours `fas1001/slides/8_llms` comprime en **un** cours de premier cycle ce que l'EIOM étale sur **cinq** séances de niveau gradué. Il faut donc décompresser et redistribuer, jamais transplanter — et surtout céder à Antoine ce qui lui revient.

| Contenu FAS1001 cours 8 | Destination EIOM |
|---|---|
| Qu'est-ce qu'un LLM ; les trois ingrédients ; tokenisation | Séance 1, bloc 1 — **approfondi** pour un public gradué |
| Biais : données, algorithmiques, humains ; injection de prompt | Séance 1 bloc 1 pour le cadrage, **séance 2 pour la mesure** |
| Accès par API, avantages, gestion des clés | Séance 1, bloc 2 — **refondu sur Gemini** |
| Boucles `for`, `paste0` | Séance 1, bloc 3 — **allégé**, largement remplacé par la sortie structurée |
| Conception de prompts | Séance 1, bloc 3 |
| Accuracy, F1, matrice de confusion, métriques | **Séance 2 — Antoine. À ne pas traiter en séance 1.** |
| LLM open source, Hugging Face, Ollama | **Séance 3 — Antoine. À ne pas traiter en séance 1.** |
| Cas d'usage en sciences sociales | Séance 1 bloc 0 pour la motivation, séance 5 pour la pratique |

**Ce que la séance 1 ajoute et qui manque entièrement à FAS1001** : la sortie structurée avec `type_object()` comme pont explicite vers la mesure scientifique, l'épinglage du modèle, la journalisation des appels, le coût en jetons, et la limitation de débit.

Pour la séance 4, `9_llms_agentique` fournit une bonne définition conceptuelle de l'agent — **délégation, autonomie, effectivité** — et trois schémas SVG réutilisables. Il lui manque en revanche toute la partie scientifique (fiabilité, vérifiabilité, traçabilité), qui est précisément l'apport de l'EIOM par rapport à un cours de premier cycle.

**Actifs graphiques réutilisables** : `llm_row_workflow.svg`, `accuracy_misleading.svg` (à céder à Antoine pour la séance 2), `llm_isole_texte_seulement_fr.svg`, `claude_code_pont_local_cloud_fr.svg`, `api_vs_mcp_flow.svg`, `ollama.png`, `lmarena.png`.

**À exclure** : tout ce qui porte l'identité FAS1001 ou UdeM — `structure_cours*`, `udem.png`, `tp3.png`.

## 7. Séance 1 — lundi 24 août, 8h45–12h45

**Titre** : Comprendre les LLM et y accéder pour la recherche.

**Promesse** : personne ne repart sans un environnement fonctionnel **et** un fichier de sorties structurées produit sur de vraies données.

### Bloc 0 — Ouverture (8h45–9h05, 20 min)

Le pacte du parcours : l'IA n'entre en recherche qu'accompagnée de preuves. La semaine en un coup d'œil et la place de chaque séance dans le cycle de la recherche. Trois exemples courts de travaux réels rendus possibles par les LLM, pour montrer l'enjeu avant la technique.

### Bloc 1 — Comment ça marche vraiment (9h05–10h05, 60 min)

Situer les types d'IA les uns par rapport aux autres : systèmes à règles, apprentissage supervisé, réseaux profonds, transformers, LLM. La distinction **classifieur / génératif** est posée ici parce qu'elle prépare la séance 2.

Le mécanisme : tokenisation, prédiction du prochain jeton, température et top-p, fenêtre de contexte. Le point à faire passer coûte que coûte : **les poids sont figés et ce n'est pas une base de connaissances**. L'hallucination est une propriété du dispositif, pas un défaut à corriger.

Les biais — données, algorithmes, humains — sont cadrés ici comme problème scientifique, et leur *mesure* est explicitement renvoyée à la séance 2.

Trois démonstrations jouables à même les diapos :
1. Un tokeniseur en direct sur une phrase en français, montrant que **le français consomme plus de jetons que l'anglais** — donc coûte plus cher et remplit le contexte plus vite. Point concret, mémorable, et vrai.
2. La distribution du prochain jeton sur une phrase à trou.
3. L'effet de la température sur cette distribution.

### Pause (10h05–10h20)

### Bloc 2 — Pourquoi l'API, et installation (10h20–11h20, 60 min)

D'abord l'argument, jamais l'outil avant l'argument. Ce que l'interface de conversation ne permet pas et que l'API permet : reproductibilité, systématicité sur un corpus entier, paramètres explicites, version du modèle épinglée, journalisation, coût mesurable. Une sortie de chatbot n'est pas une donnée de recherche.

Puis l'installation, menée sur **deux voies simultanées** :

- **Voie locale** — R, Positron ou RStudio, `ellmer`, clé Gemini déposée dans `.Renviron` via `usethis::edit_r_environ()`.
- **Voie filet** — un environnement dans le navigateur, sans aucune installation, pour quiconque décroche. Personne ne reste bloqué à regarder son voisin pendant une heure.

**Critère de sortie du bloc, non négociable** : la fonction `verifier_installation()` imprime un rapport vert pour tout le monde. Elle contrôle la version de R, la présence d'ellmer, la lisibilité de la clé, la connectivité, et effectue un appel réel de bout en bout.

### Bloc 3 — Premier appel sur de vraies données (11h20–12h25, 65 min)

Anatomie d'une requête : rôle système et rôle utilisateur, température, jetons maximaux, modèle épinglé. Lecture de la réponse et du décompte de jetons.

Puis le cœur méthodologique de la séance : **la sortie structurée avec `type_object()`**. Plutôt que d'extraire une note d'un texte libre à coups d'expressions régulières, on impose au modèle un schéma. C'est ce qui transforme une sortie de modèle en variable exploitable, et c'est le pont vers la séance 3.

Application : boucle sur un échantillon d'environ 50 avis du corpus La Ligne Rouge, avec limitation de débit respectant les 15 RPM, reprise sur erreur, et sauvegarde des **sorties brutes** en JSON. On journalise le modèle, les paramètres et l'horodatage — sans quoi le résultat n'est pas reproductible.

Conception de prompts : un avant/après commenté, et pourquoi la version faible est faible.

### Bloc 4 — Clôture (12h25–12h45, 20 min)

Ce que vous venez de fabriquer, et pourquoi **ça ne vaut rien tant que ce n'est pas validé**. Passage de relais explicite à Antoine : demain, on mesure si ces notes sont bonnes.

### Livrable de fin de séance

Chaque participant·e possède :

- un environnement R fonctionnel avec `ellmer` ;
- une clé Gemini opérationnelle dans `.Renviron` ;
- le corpus La Ligne Rouge en local ;
- `sorties/seance1_notes.json` — une note prédite structurée pour environ 50 avis ;
- le journal d'appels correspondant : modèle, paramètres, horodatage.

## 8. Interfaces avec les séances 2 et 3 d'Antoine

Cette section existe pour qu'Antoine puisse préparer sans coordination lourde.

**Ce sur quoi la séance 2 peut compter** : tout ce qui figure dans le livrable ci-dessus. La séance 2 démarre donc sur des données **déjà produites par les participant·e·s eux-mêmes**, et son travail consiste à valider `seance1_notes.json` contre `review_rating`. La séance 2 n'a pas à enseigner l'accès aux modèles.

**Ce que la séance 1 laisse volontairement intact pour Antoine** : les métriques de validation, les benchmarks, les cas ambigus, la validation sur images, la distinction classifieur/modèle génératif quant au choix d'un modèle, les modèles open weights et l'exécution locale.

**Ce que la séance 3 peut reprendre** : la mesure validée, transformée en variable d'analyse, puis rejouée localement pour la démonstration open weights.

Si Antoine change de corpus, seule la continuité narrative en souffre ; aucune séance ne casse.

## 9. Séance 4 — jeudi 27 août, 8h45–12h45

**Titre** : L'IA agentique dans le flux de travail de recherche.

### Bloc 1 — D'un appel à une boucle (60 min)

Un agent est une entité mandatée pour agir : **délégation, autonomie, effectivité** — la définition de FAS1001, qui est bonne, reprise et durcie. Techniquement : un LLM, des outils, une boucle, et un critère d'arrêt.

Démonstration en R avec `tool()` d'ellmer : un agent qui interroge le corpus de la semaine. On reste en R pour que le public voie que ce n'est pas de la magie extérieure à ses compétences.

Le contexte comme ressource rare et gérée.

### Bloc 2 — L'écosystème (50 min)

MCP : ce qu'est le protocole, ce qu'est un serveur, et ce que ça change concrètement. Les skills, c'est-à-dire des instructions chargées à la demande. Installation de Claude Code et branchement d'un serveur MCP Zotero.

Panorama honnête des outils, terminal et interface graphique confondus.

### Pause

### Bloc 3 — Fiabilité et vérifiabilité (65 min)

**C'est le cœur scientifique de la séance et ce qui la distingue d'une démonstration d'outil.** Un agent qui agit doit laisser une trace vérifiable. Journalisation, points de contrôle humains, tests, et ce qu'on ne délègue jamais.

Le contre-exemple traité en détail : l'agent qui fabrique une référence bibliographique plausible. On le fait arriver en direct plutôt que d'en parler.

### Bloc 4 — Applications au cycle de recherche (50 min)

Revue de littérature, collecte de données, analyse, rédaction — avec du matériel réel de LOMF à montrer (`clawd-is-lit`, `euraker`, `academic-editor`).

Atelier de clôture : chacun·e branche un agent sur une tâche de son propre projet.

## 10. Séance 5 — vendredi 28 août, contribution d'environ 2 h

La première moitié de la matinée revient à la visite d'un acteur de l'industrie. Notre contribution est l'**atelier intégratif**.

Un dépôt-gabarit, cloné par chaque participant·e, structuré selon le cycle de la recherche :

| Étape | Fichier | Séance mobilisée |
|---|---|---|
| Question mesurable | `question.md` | 1 |
| Corpus et échantillon | `01_corpus.R` | 1 |
| Mesure par LLM | `02_mesure.R` | 1 |
| Validation | `03_validation.R` | 2 |
| Analyse et figure | `04_analyse.R` | 3 |
| Note reproductible | `05_diffusion.qmd` | — |
| Traçabilité des agents | `agents.md` | 4 |

Chaque étape possède un test de passage, de sorte que personne ne s'enlise sans le savoir. Livrable : un document HTML compilé et le journal des appels.

Minutage : 15 min de cadrage, 90 min d'atelier avec points de contrôle, 15 min de mise en commun.

## 11. Le guide d'installation — chemin critique

**Ce document a une échéance plus rapprochée que les diapos.** Il doit parvenir aux participant·e·s avant le week-end, donc être terminé le **jeudi 20 août**. Il se construit donc en premier, avant tout travail de design.

Contenu, page `/avant-de-venir` du site :

1. **Ce qu'il faut faire avant lundi**, en une liste courte et datée, sans jargon.
2. **Installer R et Positron ou RStudio** — instructions séparées pour Windows et macOS, avec captures d'écran, et le piège classique de chaque plateforme nommé explicitement.
3. **Obtenir une clé Google AI Studio**, gratuite et sans carte de crédit, étape par étape.
4. **Déposer la clé dans `.Renviron`** via `usethis::edit_r_environ()`, avec l'avertissement de ne jamais la mettre dans un script ni dans un dépôt Git.
5. **Le script de vérification** : une seule ligne à copier, qui produit un rapport vert ou rouge lisible par une personne non technique, et qui dit quoi faire pour chaque rouge.
6. **La voie de secours** : si rien ne fonctionne, venez quand même, voici le lien navigateur qui ne demande aucune installation.
7. **À qui écrire** en cas de blocage, avec une date limite avant le lundi.

Le ton est délibérément non technique. Le lecteur cible est la personne qui n'a jamais ouvert un terminal — c'est elle qui fait échouer ou réussir le lundi matin.

## 12. Architecture technique

### Stack

SvelteKit avec `adapter-static`, toutes les routes prérendues, publié sur GitHub Pages depuis le dépôt public `eiom-ia/eiom-ia.github.io`. Node 26, npm 12.

`paths.relative = true` dans la configuration, pour que la sortie compilée fonctionne aussi en `file://` — condition d'un deck projetable sans réseau.

Toutes les pages sont des composants Svelte. La prose longue (guide d'installation, pages de séance) passe par un
composant `<Prose>` partagé qui porte l'échelle typographique. **`mdsvex` est écarté** : sa compatibilité avec
Svelte 5 est un risque qu'on ne veut pas porter à la veille d'une échéance dure, et il n'apporte rien que le
composant partagé ne fasse déjà.

Coloration syntaxique du R à la compilation via Shiki, donc sans JavaScript au moment de l'exécution.

### Routes

```
/                     La semaine en un coup d'œil
/avant-de-venir       Installation — la page la plus importante du site
/seances/1            Séance 1 — plan, matériel, scripts, à retenir
/seances/2            Gabarit à remplir par Antoine
/seances/3            Gabarit à remplir par Antoine
/seances/4            Séance 4
/seances/5            Séance 5 et atelier intégratif
/ressources           Clés, quotas, dépannage, lectures, glossaire
/diapos/seance-1      Deck séance 1
/diapos/seance-4      Deck séance 4
/diapos/seance-5      Deck de l'atelier intégratif
```

### Le moteur de diapos

Un composant `<Deck>` et un composant `<Slide>` partagés, portant en Svelte le comportement déjà éprouvé de `presentation_mm26` : navigation au clavier, barre de progression, navigation par points, balayage tactile, cycles de zoom, entrée échelonnée des éléments, compteurs animés. Les transitions natives de Svelte remplacent les transitions CSS écrites à la main.

Chaque deck reste projetable hors-ligne et exportable en PDF par l'impression du navigateur.

### Le point qui satisfait « site et diapos développés de la même manière »

**Un fichier unique de tokens** — `src/lib/styles/tokens.css` — consommé par le site et par les diapos. C'est la source unique de vérité pour les couleurs, la typographie, les espacements et les ombres. Le framework est le même par choix du client ; l'unité visuelle, elle, vient des tokens.

## 13. Système de design

Signature visuelle établie par `presentation_cpsa_2026` et `presentation_mm26`, qu'on reprend plutôt que d'inventer :

- **Fond papier crème** (`#f6f3ec`), grille très discrète en arrière-plan.
- **Encre presque noire** (`#16202c`), avec deux niveaux de gris pour la hiérarchie.
- **Un accent unique et fort**, plus une palette sémantique restreinte — ciel, ambre, violet, rose, vert — servant aux cartes et aux étiquettes.
- **Fraunces** en display, **Libre Franklin** en texte, **JetBrains Mono** pour le code.
- Rayon de 4 px, ombres légères, échelle typographique en `clamp()`.

**Les polices sont auto-hébergées** en woff2 via les paquets `@fontsource`. C'est une correction délibérée : `presentation_mm26` charge Google Fonts par CDN, ce qui donne une typographie cassée sur un projecteur sans réseau.

L'identité de l'EIOM et de l'Université Laval est présente avec sobriété, sans écraser la signature existante.

## 14. Risques et parades

| Risque | Gravité | Parade |
|---|---|---|
| **L'installation échoue lundi matin** | Critique — fait tomber toute la semaine | Guide envoyé le jeudi ; script de diagnostic vert/rouge ; voie filet navigateur sans installation ; blocs d'installation minutés avec critère de sortie ; quelques clés de secours en poche |
| Une personne n'a pas de compte Google | Élevée | Signalé dans le guide avec une semaine d'avance ; la voie filet ne l'exige pas |
| Le wifi de la salle tombe | Élevée | Decks fonctionnels hors-ligne ; corpus distribué en local ; **mode dégradé** avec sorties de modèle pré-enregistrées, pour que la leçon continue sans réseau |
| Le quota gratuit est atteint pendant l'atelier | Moyenne | Échantillon dimensionné à 50 avis ; limitation de débit enseignée ; sorties pré-calculées disponibles |
| Une clé API se retrouve dans le dépôt public | Moyenne | `.Renviron` jamais versionné ; `.gitignore` posé dès le premier commit ; répété à l'oral |
| Antoine diverge du corpus ou du plan | Faible | Séance 1 autosuffisante ; interfaces documentées à la section 8 |
| GitHub Pages ne publie pas | Réglé | Dépôt basculé en public le 19 août 2026 |

## 15. Calendrier

| Date | Livrable |
|---|---|
| mer. 19 août | Devis approuvé ; squelette du site debout |
| **jeu. 20 août** | **Guide d'installation publié et prêt à envoyer — échéance dure** |
| ven. 21 août | Deck de la séance 1 complet ; scripts R testés de bout en bout avec une vraie clé |
| sam. 22 – dim. 23 | Relecture, répétition minutée, mode dégradé vérifié |
| **lun. 24 août** | **Séance 1** |
| mar. 25 – mer. 26 | Deck de la séance 4 ; dépôt-gabarit de l'atelier |
| **jeu. 27 août** | **Séance 4** |
| **ven. 28 août** | **Séance 5** |

## 16. Critères de réussite

1. À 12h45 le lundi, chaque participant·e a produit un fichier de sorties structurées à partir de vraies données. C'est le critère qui compte le plus.
2. Antoine peut commencer la séance 2 sans avoir à réparer quoi que ce soit.
3. Les diapos se projettent sans réseau.
4. Tout le matériel reste accessible en ligne après la semaine, et réutilisable pour l'édition suivante.
5. Une personne n'ayant jamais ouvert un terminal le lundi matin repart le vendredi avec un flux de travail complet, de la question à la diffusion.
