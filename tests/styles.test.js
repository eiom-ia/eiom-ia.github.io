import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function cssCompile() {
  const dir = 'build/_app/immutable/assets';
  return readdirSync(dir)
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(join(dir, f), 'utf8'))
    .join('\n');
}

describe('système de design', () => {
  it('publie les tokens de couleur', () => {
    const css = cssCompile().replace(/\s+/g, '');
    expect(css).toContain('--paper:#f6f3ec');
    expect(css).toContain('--ink:#16202c');
  });

  it('auto-héberge les polices plutôt que de les charger depuis un CDN', () => {
    const css = cssCompile();
    expect(css).toMatch(/@font-face/);
    expect(css).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
  });
});
