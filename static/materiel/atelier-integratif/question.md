# Question mesurable

## Question

Dans quelle mesure un modèle de langue retrouve-t-il la note associée à un court avis de restaurant synthétique?

## Unité d'analyse

Un avis.

## Variable cible

La note de 1 à 5 inscrite dans `review_rating`.

## Critère de réussite fixé avant l'analyse

- Toutes les observations conservent un identifiant stable.
- Toutes les prédictions sont des entiers compris entre 1 et 5.
- L'exactitude et l'erreur absolue moyenne sont rapportées.
- Les désaccords sont examinés individuellement.

## Ce que ce dispositif ne permet pas de conclure

Ce petit corpus synthétique ne mesure ni la performance générale d'un modèle, ni sa validité sur des données réelles, ni son équité entre groupes sociaux.
