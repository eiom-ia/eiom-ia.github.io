import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { REFERENCES, ORDRE_BIBLIO } from '../src/lib/data/references.js';

const bib = readFileSync('static/references.bib', 'utf8');
const clesBib = [...bib.matchAll(/@\w+\{([^,]+),/g)].map((m) => m[1].trim());

const decks = readdirSync('src/routes/diapos')
  .map((d) => `src/routes/diapos/${d}/+page.svelte`)
  .filter((f) => {
    try { readFileSync(f); return true; } catch { return false; }
  });
const citees = decks.flatMap((f) =>
  [...readFileSync(f, 'utf8').matchAll(/<Cite\s+k="([^"]+)"/g)].map((m) => m[1])
);

describe('bibliographie', () => {
  it('déclare les mêmes clés dans le .bib et dans le module', () => {
    expect([...clesBib].sort()).toEqual(Object.keys(REFERENCES).sort());
  });

  it('liste toutes les références dans ORDRE_BIBLIO', () => {
    expect([...ORDRE_BIBLIO].sort()).toEqual(Object.keys(REFERENCES).sort());
  });

  it('ne cite dans les diapos que des clés existantes', () => {
    const inconnues = [...new Set(citees)].filter((k) => !REFERENCES[k]);
    expect(inconnues, `clés citées mais absentes: ${inconnues.join(', ')}`).toEqual([]);
  });

  it('cite au moins une fois chaque référence de la bibliographie', () => {
    const orphelines = Object.keys(REFERENCES).filter((k) => !citees.includes(k));
    expect(orphelines, `références jamais citées: ${orphelines.join(', ')}`).toEqual([]);
  });

  it('donne un lien vérifiable à chaque référence', () => {
    for (const [k, r] of Object.entries(REFERENCES)) {
      expect(r.lien, `${k} sans lien`).toMatch(/^https:\/\//);
      expect(r.auteurs.length, `${k} sans auteur`).toBeGreaterThan(0);
    }
  });

  it('sert le .bib en statique', () => {
    expect(readFileSync('build/references.bib', 'utf8')).toContain('@article{turing1950');
  });
});
