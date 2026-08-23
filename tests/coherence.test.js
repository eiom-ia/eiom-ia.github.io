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

// Les avis affichés viennent de ligne_rouge_cleaned.rds, qui n'est PAS dans ce
// dépôt: il contient des noms d'auteurs et le dépôt est public. On ne peut donc
// pas comparer mot pour mot en intégration continue. Ce qu'on peut vérifier, et
// qui compte davantage: qu'aucune donnée personnelle n'a fui, et qu'aucune
// valeur affichée ne sort de ce que le deck enseigne.
describe('avis réels extraits du corpus La Ligne Rouge', () => {
  const anim = JSON.parse(readFileSync('src/lib/deck/demos/classifieur.json', 'utf8'));
  const mur = JSON.parse(readFileSync('src/lib/deck/demos/avis-reels.json', 'utf8'));

  it('annonce la même taille de corpus des deux côtés, et celle du deck', () => {
    expect(anim.total).toBe(551);
    expect(mur.total).toBe(551);
    expect(Object.values(mur.repartition).reduce((a, b) => a + b, 0)).toBe(551);
  });

  it('ne laisse fuir aucune donnée personnelle dans un dépôt public', () => {
    const interdits = ['author', 'auteur', 'name', 'nom', 'author_title', 'reviews_count'];
    for (const [nom, f] of [
      ['classifieur.json', anim],
      ['avis-reels.json', mur]
    ]) {
      const cles = new Set();
      JSON.stringify(f, (k, v) => (cles.add(k.toLowerCase()), v));
      for (const i of interdits) {
        expect([...cles], `${nom}: champ « ${i} » présent`).not.toContain(i);
      }
    }
  });

  it("n'affiche que des notes réelles, de 1 à 5", () => {
    for (const a of [...anim.lignes, ...mur.avis]) {
      expect(a.note).toBeGreaterThanOrEqual(1);
      expect(a.note).toBeLessThanOrEqual(5);
      expect(Number.isInteger(a.note)).toBe(true);
    }
  });

  it("n'invente pas de valeur hors de l'énumération enseignée", () => {
    const permises = ['negatif', 'neutre', 'positif'];
    for (const l of anim.lignes) {
      expect(permises, `ligne ${l.id}: « ${l.sentiment} » hors du type_enum du deck`).toContain(
        l.sentiment
      );
    }
  });

  it('conserve la langue d’origine, sans traduire', () => {
    for (const a of mur.avis) {
      expect(['fr', 'en'], `« ${a.texte.slice(0, 30)} »`).toContain(a.langue);
    }
    expect(mur.avis.some((a) => a.langue === 'fr')).toBe(true);
    expect(mur.avis.some((a) => a.langue === 'en')).toBe(true);
  });
});
