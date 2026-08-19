import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';

describe('configuration de publication', () => {
  it('désactive Jekyll, qui ignorerait le répertoire _app', () => {
    expect(existsSync('build/.nojekyll')).toBe(true);
  });

  it('déclare un workflow de publication', () => {
    expect(existsSync('.github/workflows/deploy.yml')).toBe(true);
  });

  it('publie depuis la branche principale', () => {
    const wf = readFileSync('.github/workflows/deploy.yml', 'utf8');
    expect(wf).toMatch(/branches:\s*\[?\s*main/);
  });

  it('fait échouer la publication si les tests échouent', () => {
    const wf = readFileSync('.github/workflows/deploy.yml', 'utf8');
    expect(wf).toMatch(/vitest run/);
  });
});
