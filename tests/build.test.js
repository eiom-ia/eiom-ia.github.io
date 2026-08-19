import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

describe('sortie compilée', () => {
  it('produit build/index.html', () => {
    expect(existsSync('build/index.html')).toBe(true);
  });

  it("n'utilise que des chemins d'actifs relatifs, pour la projection hors-ligne", () => {
    const html = readFileSync('build/index.html', 'utf8');
    expect(html).not.toMatch(/(?:href|src)="\/_app\//);
    expect(html).toMatch(/(?:href|src)="\.[/.]/);
  });

  it("ne référence aucun hôte externe", () => {
    const html = readFileSync('build/index.html', 'utf8');
    expect(html).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\./);
  });
});
