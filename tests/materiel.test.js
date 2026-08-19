import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';

const lire = (chemin) => readFileSync(chemin, 'utf8');

describe('matériel reproductible', () => {
  it('publie le helper, le corpus synthétique et le mode secours', () => {
    for (const chemin of [
      'build/eiom.R',
      'build/materiel/donnees/avis_exemple.csv',
      'build/materiel/sorties/seance1_notes_exemple.json',
      'build/materiel/01_mesurer.R',
      'build/materiel/04_agent.R'
    ]) {
      expect(existsSync(chemin), `${chemin} est absent du build`).toBe(true);
    }
  });

  it('garantit un appel indépendant et un identifiant stable par document', () => {
    const script = lire('static/materiel/01_mesurer.R');
    expect(script).toMatch(/for \(i in seq_len/);
    expect(script).toMatch(/chat <- creer_chat_eiom/);
    expect(script).toMatch(/id = donnees\$id\[i\]/);
    expect(script).toMatch(/conditionMessage\(essai\)/);
  });

  it('déclare explicitement que le corpus public est synthétique', () => {
    expect(lire('static/materiel/README.md')).toMatch(/corpus synthétique/i);
    expect(lire('static/materiel/donnees/avis_exemple.csv')).not.toMatch(/author|email|user/i);
  });
});

describe('atelier intégratif', () => {
  const dossier = 'static/materiel/atelier-integratif';
  const attendus = [
    'question.md',
    '01_donnees.R',
    '02_mesure.R',
    '03_validation.R',
    '04_analyse.R',
    '05_diffusion.qmd',
    'methods-card.md',
    'agents.md',
    'verifier_atelier.R'
  ];

  it('contient chaque étape et son vérificateur', () => {
    for (const fichier of attendus) {
      expect(existsSync(`${dossier}/${fichier}`), fichier).toBe(true);
      expect(existsSync(`build/materiel/atelier-integratif/${fichier}`), `build/${fichier}`).toBe(true);
    }
  });

  it('joint mesure et référence par identifiant plutôt que par position', () => {
    const validation = lire(`${dossier}/03_validation.R`);
    expect(validation).toMatch(/merge\(donnees, predictions, by = "id"/);
    expect(validation).toMatch(/anyDuplicated\(predictions\$id\)/);
  });
});
