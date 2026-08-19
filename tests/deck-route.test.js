import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

describe('route de démonstration du deck', () => {
  it('est prérendue', () => {
    expect(existsSync('build/diapos/demo/index.html')).toBe(true);
  });

  it('rend toutes les diapos dans le HTML statique', () => {
    const html = readFileSync('build/diapos/demo/index.html', 'utf8');
    const nb = (html.match(/class="[^"]*\bdiapo\b/g) || []).length;
    expect(nb).toBe(3);
  });

  it("affiche le compteur dès le rendu statique, sans JavaScript", () => {
    const html = readFileSync('build/diapos/demo/index.html', 'utf8');
    expect(html).toContain('1 / 3');
  });
});
