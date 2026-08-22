/**
 * Contenu identique pour les quatre prototypes.
 * Chaque prototype le met en forme selon sa doctrine: la comparaison porte
 * ainsi sur le design, jamais sur le texte.
 */
export const SEMAINE = [
  { jour: 'lundi', verbe: 'Accéder', gain: 'une mesure brute, produite par vous', court: 'une mesure brute' },
  { jour: 'mardi', verbe: 'Valider', gain: 'la preuve que la mesure tient', court: 'une preuve' },
  { jour: 'mercredi', verbe: 'Mesurer', gain: "une variable d'analyse", court: "une variable" },
  { jour: 'jeudi', verbe: 'Agir', gain: 'des agents dans votre flux de travail', court: 'des agents' },
  { jour: 'vendredi', verbe: 'Intégrer', gain: 'de la question à la diffusion', court: 'un flux complet' }
];

export const CLASSIFIEUR = [
  'Entraîné sur vos données annotées, pour une tâche',
  'Sortie contrainte par construction',
  'Reproductible au bit près',
  'Exige des annotations humaines'
];

export const GENERATIF = [
  'Généraliste, utilisable sans entraînement',
  'Sortie en texte libre à contraindre',
  'Reproductibilité fragile',
  'Aucune annotation requise pour démarrer'
];

export const CODE_SCHEMA = `note_avis <- type_object(
  note = type_integer(
    "Note de 1 a 5 etoiles inferee du texte"
  ),
  sentiment = type_enum(
    c("negatif", "neutre", "positif"),
    "Tonalite generale"
  )
)

resultat <- chat$chat_structured(avis, type = note_avis)`;

export const TITRE = "L'IA en recherche";
export const SOUS_TITRE = "Parcours L'intelligence artificielle (IA) et la recherche";
export const CONTEXTE = 'EIOM 2026 · Université Laval · 24 au 28 août';
export const AUTEUR = 'Laurence-Olivier M. Foisy';
