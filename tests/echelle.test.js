import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/lib/deck/deck.css', 'utf8');

// Régression observée: une échelle typographique en rem plafonnés donnait un
// corps de texte de 16 px sur un écran de 1920 px, et le contenu n'occupait
// qu'un tiers de la hauteur. Toute la typographie du deck doit rester
// proportionnelle au viewport.
describe('échelle des diapos', () => {
  it('fait dériver la taille de base des deux axes du viewport', () => {
    const base = css.match(/\.diapo \{[\s\S]*?font-size: ([^;]+);/);
    expect(base, 'aucune taille de base sur .diapo').not.toBeNull();
    expect(base[1]).toContain('vw');
    expect(base[1]).toContain('vh');
  });

  it('permet un ajustement au clavier via --zoom', () => {
    expect(css).toContain('var(--zoom, 1)');
  });

  it("n'exprime plus la typographie des diapos en rem plafonnés", () => {
    const bloc = css.slice(css.indexOf('Vocabulaire visuel'));
    const remsTypo = bloc.match(/\.diapo[^{]*\{[^}]*font-size: [\d.]+rem/g) || [];
    expect(remsTypo, `tailles en rem trouvées: ${remsTypo.join(' | ')}`).toHaveLength(0);
  });

  // La mesure de lecture se juge en caractères, pas en em. En monospace,
  // un caractère fait environ 0,6 em de sa propre taille, et le corps de
  // texte vaut 0,88 em de la base: une colonne de 40 em donne donc environ
  // 76 caractères, soit la limite haute de la plage confortable.
  it('borne la colonne de contenu à une mesure de lecture tenable', () => {
    const col = css.match(/\.diapo-in \{[\s\S]*?max-width: ([\d.]+)em/);
    expect(col).not.toBeNull();
    const em = Number(col[1]);
    const caracteres = em / (0.6 * 0.88);
    expect(caracteres, `${Math.round(caracteres)} caractères par ligne`).toBeLessThanOrEqual(80);
  });
});
