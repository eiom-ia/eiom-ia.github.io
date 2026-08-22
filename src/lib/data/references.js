/**
 * Source unique de vérité pour les citations affichées dans les decks.
 * Doit rester synchronisée avec static/references.bib — un test le vérifie.
 * Toute entrée a été vérifiée à la source: ne rien ajouter de mémoire.
 */
export const REFERENCES = {
  turing1950: {
    court: 'Turing 1950',
    auteurs: 'A. M. Turing',
    titre: 'Computing Machinery and Intelligence',
    detail: 'Mind, LIX(236), 433–460',
    lien: 'https://doi.org/10.1093/mind/LIX.236.433'
  },
  mccarthy1955: {
    court: 'McCarthy et al. 1955',
    auteurs: 'J. McCarthy, M. Minsky, N. Rochester, C. Shannon',
    titre: 'A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence',
    detail: 'Réimprimé dans AI Magazine, 27(4), 12–14, 2006',
    lien: 'https://doi.org/10.1609/aimag.v27i4.1904'
  },
  legg2007: {
    court: 'Legg et Hutter 2007',
    auteurs: 'S. Legg, M. Hutter',
    titre: 'A Collection of Definitions of Intelligence',
    detail: 'Advances in Artificial General Intelligence, 17–24 · arXiv:0706.3639',
    lien: 'https://arxiv.org/abs/0706.3639'
  },
  jordan2015: {
    court: 'Jordan et Mitchell 2015',
    auteurs: 'M. I. Jordan, T. M. Mitchell',
    titre: 'Machine learning: Trends, perspectives, and prospects',
    detail: 'Science, 349(6245), 255–260',
    lien: 'https://doi.org/10.1126/science.aaa8415'
  },
  wang2019: {
    court: 'Wang 2019',
    auteurs: 'P. Wang',
    titre: 'On Defining Artificial Intelligence',
    detail: 'Journal of Artificial General Intelligence, 10(2)',
    lien: 'https://doi.org/10.2478/jagi-2019-0002'
  },
  russell2020: {
    court: 'Russell et Norvig 2020',
    auteurs: 'S. Russell, P. Norvig',
    titre: 'Artificial Intelligence: A Modern Approach',
    detail: '4ᵉ édition, Pearson',
    lien: 'https://aima.cs.berkeley.edu/'
  },
  jones2025: {
    court: 'Jones et Bergen 2025',
    auteurs: 'C. R. Jones, B. K. Bergen',
    titre: 'Large Language Models Pass the Turing Test',
    detail: 'arXiv:2503.23674',
    lien: 'https://arxiv.org/abs/2503.23674'
  }
};

export const ORDRE_BIBLIO = [
  'turing1950',
  'mccarthy1955',
  'legg2007',
  'jordan2015',
  'wang2019',
  'russell2020',
  'jones2025'
];
