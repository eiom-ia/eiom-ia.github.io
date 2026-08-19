import { describe, it, expect } from 'vitest';
import { surlignerR } from '../src/lib/deck/surligner.js';

describe('surlignerR', () => {
  it('colorie les commentaires', () => {
    expect(surlignerR('# une note')).toContain('r-com');
  });

  it('colorie les chaînes sans casser leur contenu', () => {
    const out = surlignerR('chat("bonjour")');
    expect(out).toContain('r-str');
    expect(out).toContain('bonjour');
  });

  it('distingue un appel de fonction d’un identifiant simple', () => {
    expect(surlignerR('mean(x)')).toContain('r-fn');
    expect(surlignerR('x')).not.toContain('r-fn');
  });

  it('reconnaît l’affectation R', () => {
    expect(surlignerR('x <- 1')).toContain('r-op');
  });

  it('échappe le HTML pour éviter toute injection', () => {
    const out = surlignerR('x <- "<script>alert(1)</script>"');
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
  });

  it('marque les mots-clés comme tels et non comme fonctions', () => {
    expect(surlignerR('for (i in 1:3) print(i)')).toContain('r-cle');
  });

  it('ne perd aucun caractère visible', () => {
    const src = 'df$note <- 5  # cinq';
    const texte = surlignerR(src).replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    expect(texte).toBe(src);
  });
});
