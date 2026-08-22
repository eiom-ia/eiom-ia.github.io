import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { REFERENCES, ORDRE_BIBLIO } from '../src/lib/data/references.js';

const bib = readFileSync('static/references.bib', 'utf8');
const clesBib = [...bib.matchAll(/@\w+\{([^,]+),/g)].map((m) => m[1].trim());

const fichiers = [
  ...readdirSync('src/routes/diapos').map((d) => `src/routes/diapos/${d}/+page.svelte`),
  ...readdirSync('src/lib/deck/demos')
    .filter((f) => f.endsWith('.svelte'))
    .map((f) => `src/lib/deck/demos/${f}`)
].filter((f) => {
  try { readFileSync(f); return true; } catch { return false; }
});

// Une référence peut être citée par une balise <Cite k="..."> ou portée par
// une donnée (p: 'cle') dans un composant comme la frise.
const citees = fichiers.flatMap((f) => {
  const t = readFileSync(f, 'utf8');
  return [
    ...[...t.matchAll(/<Cite\s+k="([^"]+)"/g)].map((m) => m[1]),
    ...[...t.matchAll(/\bp:\s*'([a-z]+\d{4})'/g)].map((m) => m[1])
  ];
});

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
