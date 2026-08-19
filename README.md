# Parcours IA — EIOM 2026

Matériel du parcours DKN-1289, « L'intelligence artificielle et la recherche », offert à l'École interdisciplinaire outils & méthodes du 24 au 28 août 2026.

## Promesse

À la fin du parcours, une personne sait décider quand utiliser un système d'IA dans une recherche, mesurer s'il fonctionne, documenter exactement son intervention et superviser ses actions sans lui déléguer l'inférence scientifique.

## Développement

```bash
npm install
npm run dev
npm run check
```

`npm run check` compile le site, exécute les tests Vitest et lance les tests R avec `testthat`.

## Structure

- `src/routes/` : site et decks des séances 1, 4 et 5.
- `src/lib/data/` : programme et configuration des fournisseurs.
- `src/lib/deck/` : moteur de présentation partagé.
- `static/materiel/` : corpus synthétique, scripts R, sorties de secours et capstone.
- `static/eiom.R` : interface commune Gemini/OpenRouter.
- `tests/` : tests du site, des decks, du matériel et du vérificateur R.

## Fournisseurs

La voie recommandée est Gemini depuis Google AI Studio. OpenRouter avec un modèle Gemini précis constitue la relève. Aucun changement de fournisseur ne se fait silencieusement : le choix, le modèle et l'horodatage entrent dans le journal de chaque exécution.

Le matériel comprend aussi une sortie canonique préenregistrée. Une panne de réseau ou de quota ne doit jamais devenir une panne pédagogique.

## Gestion du travail

Le projet utilise Beads. Exécuter `bd prime`, puis `bd ready` pour voir le travail disponible.
