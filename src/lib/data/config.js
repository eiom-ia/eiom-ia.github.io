/**
 * Source unique de vérité pour le fournisseur de modèles.
 *
 * Le choix du fournisseur a été le point le plus incertain de la préparation:
 * GitHub Models est en cours de retrait, et les paliers gratuits changent vite.
 * Tout le matériel lit ces constantes plutôt que de citer un nom en dur, de
 * sorte qu'un changement de fournisseur reste une modification d'un seul fichier.
 */
export const FOURNISSEUR = {
  nom: 'Google AI Studio',
  fonctionR: 'chat_google_gemini',
  modele: 'gemini-3.5-flash',
  variableEnv: 'GEMINI_API_KEY',
  urlCle: 'https://aistudio.google.com/apikey',
  carteRequise: false,
  quota: '1 500 requêtes par jour, 15 requêtes par minute'
};

export const URL_VERIFICATEUR = 'https://eiom-ia.github.io/verifier.R';

export const CONTACT = 'mail@mfoisy.com';
