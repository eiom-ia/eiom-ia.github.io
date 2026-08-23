import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { SEANCES } from '../src/lib/data/seances.js';

const lire = (n) => readFileSync(`build/diapos/${n}/index.html`, 'utf8');
const compterDiapos = (html) => (html.match(/class="diapo[ "]/g) || []).length;

describe('decks publiés', () => {
  it('publie un deck pour les séances 1, 4 et 5', () => {
    expect(existsSync('build/diapos/seance-1/index.html')).toBe(true);
    expect(existsSync('build/diapos/seance-4/index.html')).toBe(true);
    expect(existsSync('build/diapos/seance-5/index.html')).toBe(true);
  });

  // Ce test répond à « le rendu statique produit-il bien des diapos ». Le
  // compte exact est vérifié plus bas, contre le total annoncé par le deck:
  // un seuil chiffré ici ne ferait qu'échouer chaque fois qu'on retire une
  // diapositive, sans rien dire de plus.
  it('rend les diapos dans le HTML statique, sans JavaScript', () => {
    for (const n of ['seance-1', 'seance-4', 'seance-5']) {
      expect(compterDiapos(lire(n)), `${n}: aucune diapo au rendu statique`).toBeGreaterThan(1);
    }
  });

  // Le compteur et les pastilles viennent d'une constante TOTAL écrite à la
  // main dans chaque route. Elle dérive en silence dès qu'on ajoute ou retire
  // une diapo, et le public voit « 28 / 63 » sur un deck qui en compte 65.
  // Une pastille est rendue par diapo annoncée: on les compte.
  it('annonce autant de diapos qu\'il en rend', () => {
    for (const n of ['seance-1', 'seance-4', 'seance-5']) {
      const html = lire(n);
      const rendues = compterDiapos(html);
      const annoncees = (html.match(/aria-label="Aller à la diapo /g) || []).length;
      expect(annoncees, `${n}: TOTAL annonce ${annoncees} diapos, le deck en rend ${rendues}`)
        .toBe(rendues);
    }
  });

  it('colorie le code R au rendu statique', () => {
    expect(lire('seance-1')).toContain('r-fn');
    expect(lire('seance-4')).toContain('r-fn');
    expect(lire('seance-5')).toContain('r-fn');
  });

  // Les deux démonstrations chiffrées de la séance reposent sur des mesures
  // réelles. On vérifie qu'elles sont bien rendues, pas juste importées.
  it('affiche les données de tokenisation réelles', () => {
    expect(lire('seance-1')).toContain('14 jetons');
  });

  it('affiche la génération mesurée jeton par jeton', () => {
    const h = lire('seance-1');
    expect(h).toContain('gpt-3.5-turbo-instruct');
    expect(h).toContain('Avis de restaurant');
  });

  // On vise les CHARGEMENTS de ressources, pas les URL citées dans du code
  // affiché à l'écran: un exemple qui montre une requête vers Crossref n'est
  // pas une dépendance réseau du deck.
  it('ne charge aucune ressource externe', () => {
    const chargements = /(?:<link[^>]+href|<script[^>]+src|<img[^>]+src)=["']https?:\/\//g;
    const dansCss = /url\(\s*["']?https?:\/\//g;
    for (const d of ['seance-1', 'seance-4', 'seance-5']) {
      const h = lire(d);
      expect(h.match(chargements), `${d} charge une ressource externe`).toBeNull();
      expect(h.match(dansCss), `${d} charge une police ou image externe en CSS`).toBeNull();
    }
  });

  it('relie chaque deck depuis sa page de séance', () => {
    for (const s of SEANCES.filter((x) => x.deck)) {
      expect(readFileSync(`build/seances/${s.numero}/index.html`, 'utf8')).toContain(
        `diapos/${s.deck}/`
      );
    }
  });

  it('associe les decks aux bonnes séances', () => {
    const avecDeck = SEANCES.filter((s) => s.deck).map((s) => s.numero);
    expect(avecDeck).toEqual([1, 4, 5]);
  });
});
