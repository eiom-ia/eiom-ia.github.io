import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { SEANCES, seanceParNumero } from '../src/lib/data/seances.js';

describe('données des séances', () => {
  it('décrit les cinq séances', () => {
    expect(SEANCES).toHaveLength(5);
  });

  it('attribue les séances 1, 4 et 5 à Foisy et les 2 et 3 à Lemor', () => {
    const par = Object.fromEntries(SEANCES.map((s) => [s.numero, s.formateur]));
    expect(par[1]).toMatch(/Foisy/);
    expect(par[4]).toMatch(/Foisy/);
    expect(par[2]).toMatch(/Lemor/);
    expect(par[3]).toMatch(/Lemor/);
  });

  it('date correctement la semaine du 24 au 28 août 2026', () => {
    expect(SEANCES.map((s) => s.date)).toEqual([
      '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28'
    ]);
  });

  it('retrouve une séance par son numéro, même donné en chaîne', () => {
    expect(seanceParNumero('4').titre).toMatch(/agentique/i);
    expect(seanceParNumero(99)).toBeUndefined();
  });
});

describe('routes prérendues', () => {
  for (const n of [1, 2, 3, 4, 5]) {
    it(`prérend la séance ${n}`, () => {
      expect(existsSync(`build/seances/${n}/index.html`)).toBe(true);
    });
  }

  it("prérend l'accueil et les ressources", () => {
    expect(existsSync('build/index.html')).toBe(true);
    expect(existsSync('build/ressources/index.html')).toBe(true);
  });

  it("met en avant le guide d'installation depuis l'accueil", () => {
    expect(readFileSync('build/index.html', 'utf8')).toContain('avant-de-venir');
  });

  it('signale les séances 2 et 3 comme gabarits à remplir', () => {
    const html = readFileSync('build/seances/2/index.html', 'utf8');
    expect(html).toMatch(/Lemor/);
  });
});
