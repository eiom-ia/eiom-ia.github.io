import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { FOURNISSEURS, URL_VERIFICATEUR } from '../src/lib/data/config.js';

const verifierR = readFileSync('static/verifier.R', 'utf8');

// config.js existe pour qu'un changement de fournisseur reste une modification
// d'un seul fichier. verifier.R est en R, donc hors de sa portée: ces
// assertions font échouer la compilation si l'un des deux dérive de l'autre.
describe('cohérence entre config.js et verifier.R', () => {
  it('décrit les mêmes fournisseurs des deux côtés', () => {
    for (const fournisseur of Object.values(FOURNISSEURS)) {
      expect(verifierR).toContain(fournisseur.modele);
      expect(verifierR).toContain(fournisseur.nom);
      expect(verifierR).toContain(fournisseur.variableEnv);
    }
  });

  it("annonce dans verifier.R l'URL à laquelle il est réellement servi", () => {
    expect(verifierR).toContain(URL_VERIFICATEUR);
  });

  it('ne laisse aucune clé d’API dans les fichiers versionnés', () => {
    expect(verifierR).not.toMatch(/AIza[0-9A-Za-z_-]{30,}/);
    expect(verifierR).not.toMatch(/sk-[0-9A-Za-z_-]{20,}/);
  });
});

// L'animation de classification affiche un extrait du vrai corpus. Si le CSV
// change et que le JSON ne suit pas, la diapo montre au public un fichier qui
// ne ressemble plus à celui qu'il ouvrira à l'atelier.
describe('cohérence entre classifieur.json et avis_exemple.csv', () => {
  const csv = readFileSync('static/materiel/donnees/avis_exemple.csv', 'utf8');
  const donnees = JSON.parse(readFileSync('src/lib/deck/demos/classifieur.json', 'utf8'));

  // Analyse minimale: les champs cités sont entre guillemets s'ils contiennent
  // une virgule, ce qui est le cas des textes d'avis.
  const lignes = csv
    .trim()
    .split('\n')
    .slice(1)
    .map((l) => {
      const champs = l.match(/(".*?"|[^,]+)/g).map((c) => c.replace(/^"|"$/g, ''));
      return { id: champs[0], texte: champs[1], note: Number(champs[2]) };
    });

  it('compte le même nombre total de lignes', () => {
    expect(donnees.total).toBe(lignes.length);
  });

  it('reprend mot pour mot les lignes affichées', () => {
    donnees.lignes.forEach((affichee, i) => {
      expect(affichee.id).toBe(lignes[i].id);
      expect(affichee.texte).toBe(lignes[i].texte);
      expect(affichee.note).toBe(lignes[i].note);
    });
  });

  it("n'invente pas de valeur hors de l'énumération enseignée", () => {
    const permises = ['negatif', 'neutre', 'positif'];
    for (const l of donnees.lignes) {
      expect(permises, `${l.id}: « ${l.sentiment} » hors du type_enum du deck`).toContain(
        l.sentiment
      );
    }
  });
});
