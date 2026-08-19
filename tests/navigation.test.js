import { describe, it, expect } from 'vitest';
import { creerDeck, suivant, precedent, allerA, progression, etiquette } from '../src/lib/deck/navigation.js';

describe('creerDeck', () => {
  it('commence à la première diapo', () => {
    expect(creerDeck(10)).toEqual({ total: 10, index: 0 });
  });

  it('refuse un total invalide', () => {
    expect(() => creerDeck(0)).toThrow();
    expect(() => creerDeck(2.5)).toThrow();
  });
});

describe('suivant', () => {
  it("avance d'une diapo", () => {
    expect(suivant(creerDeck(3)).index).toBe(1);
  });

  it('ne dépasse jamais la dernière diapo', () => {
    const fin = allerA(creerDeck(3), 2);
    expect(suivant(fin).index).toBe(2);
  });
});

describe('precedent', () => {
  it("recule d'une diapo", () => {
    expect(precedent(allerA(creerDeck(3), 2)).index).toBe(1);
  });

  it('ne passe jamais sous zéro', () => {
    expect(precedent(creerDeck(3)).index).toBe(0);
  });
});

describe('allerA', () => {
  it('borne les valeurs hors intervalle', () => {
    expect(allerA(creerDeck(5), 99).index).toBe(4);
    expect(allerA(creerDeck(5), -3).index).toBe(0);
  });
});

describe('progression', () => {
  it('vaut 1 sur la dernière diapo', () => {
    expect(progression(allerA(creerDeck(4), 3))).toBe(1);
  });

  it("n'est jamais nulle sur la première diapo", () => {
    expect(progression(creerDeck(4))).toBeCloseTo(0.25);
  });
});

describe('etiquette', () => {
  it("compte à partir de 1 pour l'affichage humain", () => {
    expect(etiquette(creerDeck(42))).toBe('1 / 42');
  });
});

describe('pureté', () => {
  it('ne modifie jamais le deck reçu', () => {
    const d = creerDeck(3);
    suivant(d);
    expect(d.index).toBe(0);
  });
});
