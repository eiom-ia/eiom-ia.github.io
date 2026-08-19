# Atelier intégratif — 120 minutes

Ce gabarit assemble un flux de recherche minimal sans supposer que les séances 2 et 3 ont utilisé le même corpus.

## Déroulement

1. Formuler la question dans `question.md`.
2. Exécuter `01_donnees.R`.
3. Exécuter `02_mesure.R`.
4. Exécuter `03_validation.R`.
5. Exécuter `04_analyse.R`.
6. Rendre `methods-card.md` et `agents.md` fidèles à l'exécution.
7. Compiler `05_diffusion.qmd` avec Quarto.
8. Exécuter `verifier_atelier.R`.

Chaque script s'arrête avec un message précis si son entrée manque. Les sorties canoniques permettent de poursuivre même sans API.

## Principe

Le but n'est pas de finir un projet de recherche en deux heures. Le but est de produire la plus petite chaîne complète que quelqu'un d'autre puisse inspecter, contester et relancer.
