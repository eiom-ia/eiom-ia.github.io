import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

// Le rendu SSR échappe certaines entités; on normalise avant d'assertionner
// sur du texte français, sinon les apostrophes font échouer à tort.
const normaliser = (s) =>
  s.replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');

const page = () => normaliser(readFileSync('build/avant-de-venir/index.html', 'utf8'));

describe("guide d'installation", () => {
  it('est prérendu', () => {
    expect(existsSync('build/avant-de-venir/index.html')).toBe(true);
  });

  it('couvre les sept sections exigées par le devis', () => {
    const html = page();
    for (const attendu of [
      "Ce qu'il faut faire avant lundi",
      'Installer R',
      'Obtenir une clé',
      '.Renviron',
      'Vérifier que tout fonctionne',
      'Si rien ne fonctionne',
      'Nous écrire'
    ]) {
      expect(html, `section manquante: ${attendu}`).toContain(attendu);
    }
  });

  it('donne la ligne de vérification en une seule commande', () => {
    expect(page()).toContain('source("https://eiom-ia.github.io/verifier.R")');
  });

  it('avertit de ne jamais versionner la clé', () => {
    expect(page()).toMatch(/jamais[\s\S]{0,120}(Git|dépôt|script)/i);
  });

  it('sert le script de vérification en statique', () => {
    expect(existsSync('build/verifier.R')).toBe(true);
  });

  it('nomme Windows et macOS séparément', () => {
    const html = page();
    expect(html).toContain('Windows');
    expect(html).toMatch(/macOS|Mac/);
  });
});
