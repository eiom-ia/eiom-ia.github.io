# Matériel du parcours IA

Ce dossier contient le chemin minimal reproductible des séances 1, 4 et 5.

## Démarrage

1. Exécuter `00_prevol.R`.
2. Exécuter `01_mesurer.R` pour produire `sorties/seance1_notes.json`.
3. Utiliser `04_agent.R` dans un dossier bac à sable pendant la séance 4.
4. Ouvrir `atelier-integratif/05_diffusion.qmd` le vendredi.

## Deux modes

- `EIOM_MODE=api` effectue de vrais appels avec Gemini ou OpenRouter.
- `EIOM_MODE=secours` copie une sortie canonique préenregistrée et permet de continuer sans API.

Le mode `auto`, utilisé par défaut, choisit l'API lorsqu'une clé est présente et le mode secours sinon.

## Données

`donnees/avis_exemple.csv` est un petit corpus synthétique créé pour le cours. Il ne contient aucun nom, aucune donnée confidentielle et aucune information issue d'un projet participant. Le corpus complet utilisé en classe doit être accompagné séparément de sa provenance et de ses conditions de redistribution.

## Règle de sécurité

Ne placez jamais de clé dans ce dossier. Les clés vivent dans `.Renviron`. Les données brutes restent en lecture seule et tous les résultats sont écrits dans `sorties/`.
