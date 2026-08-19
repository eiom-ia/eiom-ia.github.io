import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FOURNISSEUR, URL_VERIFICATEUR } from '../src/lib/data/config.js';

const verifierR = readFileSync('static/verifier.R', 'utf8');

// config.js existe pour qu'un changement de fournisseur reste une modification
// d'un seul fichier. verifier.R est en R, donc hors de sa portée: ces
// assertions font échouer la compilation si l'un des deux dérive de l'autre.
describe('cohérence entre config.js et verifier.R', () => {
  it('épingle le même modèle des deux côtés', () => {
    expect(verifierR, `verifier.R ne mentionne pas ${FOURNISSEUR.modele}`).toContain(
      FOURNISSEUR.modele
    );
  });

  it('nomme le même fournisseur des deux côtés', () => {
    expect(verifierR, `verifier.R ne mentionne pas ${FOURNISSEUR.nom}`).toContain(FOURNISSEUR.nom);
  });

  it('nomme la même variable d’environnement des deux côtés', () => {
    expect(verifierR).toContain(FOURNISSEUR.variableEnv);
  });

  it("annonce dans verifier.R l'URL à laquelle il est réellement servi", () => {
    expect(verifierR).toContain(URL_VERIFICATEUR);
  });

  it('ne laisse aucune clé d’API dans les fichiers versionnés', () => {
    expect(verifierR).not.toMatch(/AIza[0-9A-Za-z_-]{30,}/);
    expect(verifierR).not.toMatch(/sk-[0-9A-Za-z_-]{20,}/);
  });
});
