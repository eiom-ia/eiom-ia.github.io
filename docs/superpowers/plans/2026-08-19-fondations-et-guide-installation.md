# Plan 1 — Fondations du site et guide d'installation

> **Document historique.** Ce plan décrit l'échafaudage initial et conserve ses exemples pour retracer
> les décisions. L'état exécutable se trouve dans `README.md`, `static/eiom.R`, `static/materiel/` et le
> backlog Beads. Les quotas, fournisseurs et noms de modèles cités plus bas ne doivent pas être repris
> sans le prévol actuel.

> **Pour les agents exécutants :** SOUS-COMPÉTENCE REQUISE — utiliser `superpowers:subagent-driven-development` (recommandé) ou `superpowers:executing-plans` pour exécuter ce plan tâche par tâche. Les étapes utilisent la syntaxe à cases (`- [ ]`).

**But :** mettre en ligne le site du parcours IA de l'EIOM avec, comme livrable central, le guide d'installation que les participant·e·s doivent recevoir avant le week-end.

**Architecture :** un site SvelteKit prérendu en statique, publié sur GitHub Pages depuis le dépôt public `eiom-ia/eiom-ia.github.io`. Un fichier unique de tokens CSS gouverne l'apparence du site et des diapos. La logique de navigation des diapos est extraite en module pur, donc testable sans navigateur. Le script R de vérification est servi en fichier statique pour que les participant·e·s l'exécutent en une ligne.

**Pile technique :** Node 26.5.1, npm 12.0.2, Svelte 5.56.9, SvelteKit 2.70.3, `@sveltejs/adapter-static` 3.0.10, Vite 8.2.1, Vitest 4.1.11, `@fontsource` 5.3.0, R 4.6.1, ellmer 0.4.2, testthat.

**Devis :** `docs/superpowers/specs/2026-08-19-parcours-ia-eiom-design.md`

**Découpage en trois plans.** Ce plan est le premier de trois, découpés par échéance. Plan 1 (ce document, dû le 20 août) : fondations et guide d'installation. Plan 2 (dû le 21 août) : séance 1, deck et scripts R. Plan 3 (dû le 26 août) : séances 4 et 5. Chacun produit un site fonctionnel et déployable à lui seul.

## Contraintes globales

Ces contraintes s'appliquent implicitement à toutes les tâches.

- **Tout le contenu et toute l'interface sont en français.** Y compris les messages d'erreur du script R.
- **Aucune ressource externe au moment de l'exécution.** Pas de CDN, pas de Google Fonts. Les polices sont auto-hébergées via `@fontsource`. Un deck doit se projeter sans réseau.
- `paths.relative = true` dans `svelte.config.js` : la sortie compilée doit fonctionner en `file://`.
- **Aucune clé d'API dans le dépôt, jamais.** Le dépôt est public. `.Renviron` est dans `.gitignore` depuis le premier commit.
- Palette : `--paper: #f6f3ec`, `--ink: #16202c`, un accent unique, palette sémantique restreinte.
- Typographie : Fraunces en display, Libre Franklin en texte, JetBrains Mono pour le code.
- Dans tout code R montré ou distribué : **le modèle est épinglé explicitement**, jamais laissé à la valeur par défaut. Seuls des modèles Flash ou Flash-Lite, les modèles Pro n'étant plus au palier gratuit depuis le 1ᵉʳ avril 2026.
- Dans tout code R : `credentials` ou variable d'environnement, **jamais l'argument `api_key`**, déprécié dans ellmer 0.4.2.
- Commits fréquents, un par tâche au minimum.

---

### Tâche 1 : Échafaudage SvelteKit avec sortie statique relative

Le premier acquis à verrouiller est que la compilation produise des chemins **relatifs**. Sans cela, aucun deck ne se projette hors-ligne, et on ne s'en apercevrait qu'au moment de brancher le projecteur.

**Fichiers :**
- Créer : `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.html`, `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/routes/+layout.js`
- Test : `tests/build.test.js`

**Interfaces :**
- Produit : un répertoire `build/` contenant `index.html` et `_app/`, avec des références d'actifs relatives. Toutes les tâches suivantes en dépendent.

- [ ] **Étape 1 : Écrire le test qui échoue**

Créer `tests/build.test.js` :

```js
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

describe('sortie compilée', () => {
  it('produit build/index.html', () => {
    expect(existsSync('build/index.html')).toBe(true);
  });

  it("n'utilise que des chemins d'actifs relatifs, pour la projection hors-ligne", () => {
    const html = readFileSync('build/index.html', 'utf8');
    expect(html).not.toMatch(/(?:href|src)="\/_app\//);
    expect(html).toMatch(/(?:href|src)="\.[/.]/);
  });

  it("ne référence aucun hôte externe", () => {
    const html = readFileSync('build/index.html', 'utf8');
    expect(html).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\./);
  });
});
```

- [ ] **Étape 2 : Lancer le test pour vérifier qu'il échoue**

Lancer : `npx vitest run tests/build.test.js`
Attendu : ÉCHEC — `build/index.html` n'existe pas.

- [ ] **Étape 3 : Échafauder le projet**

```bash
npm init -y
npm pkg set name="eiom-ia" type="module" private=true
npm pkg set scripts.dev="vite dev" scripts.build="vite build" scripts.preview="vite preview" scripts.test="vitest run"
npm install -D @sveltejs/kit@2.70.3 @sveltejs/adapter-static@3.0.10 @sveltejs/vite-plugin-svelte svelte@5.56.9 vite@8.2.1 vitest@4.1.11
```

Créer `svelte.config.js` :

```js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({ fallback: null, strict: true }),
    // Chemins relatifs: condition pour qu'un deck compilé s'ouvre en file://
    // sur un portable sans réseau, devant une salle.
    paths: { relative: true }
  }
};
```

Créer `vite.config.js` :

```js
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  test: { include: ['tests/**/*.test.js'] }
};
```

Créer `src/app.html` :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

Créer `src/routes/+layout.js` :

```js
export const prerender = true;
export const trailingSlash = 'always';
```

Créer `src/routes/+layout.svelte` :

```svelte
<script>
  let { children } = $props();
</script>

{@render children()}
```

Créer `src/routes/+page.svelte` :

```svelte
<h1>Parcours IA — EIOM 2026</h1>
```

- [ ] **Étape 4 : Compiler puis relancer le test**

Lancer : `npm run build && npx vitest run tests/build.test.js`
Attendu : SUCCÈS pour les trois assertions.

- [ ] **Étape 5 : Committer**

```bash
git add package.json package-lock.json svelte.config.js vite.config.js src tests
git commit -m "feat: échafaudage SvelteKit avec sortie statique à chemins relatifs"
```

---

### Tâche 2 : Tokens de design et polices auto-hébergées

**Fichiers :**
- Créer : `src/lib/styles/tokens.css`, `src/lib/styles/base.css`
- Modifier : `src/routes/+layout.svelte`
- Test : `tests/styles.test.js`

**Interfaces :**
- Produit : les variables CSS `--paper`, `--paper-2`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, `--accent`, `--ciel`, `--ambre`, `--violet`, `--rose`, `--vert`, `--police-display`, `--police-texte`, `--police-mono`, `--rayon`, `--ombre`. Le deck de la tâche 4 et toutes les pages les consomment. **Aucune couleur ne doit être écrite en dur ailleurs.**

- [ ] **Étape 1 : Écrire le test qui échoue**

Créer `tests/styles.test.js` :

```js
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
    const css = cssCompile();
    expect(css).toContain('--paper:#f6f3ec');
    expect(css).toContain('--ink:#16202c');
  });

  it('auto-héberge les polices plutôt que de les charger depuis un CDN', () => {
    const css = cssCompile();
    expect(css).toMatch(/@font-face/);
    expect(css).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/);
  });
});
```

- [ ] **Étape 2 : Lancer le test pour vérifier qu'il échoue**

Lancer : `npm run build && npx vitest run tests/styles.test.js`
Attendu : ÉCHEC — les tokens sont absents du CSS compilé.

- [ ] **Étape 3 : Installer les polices et écrire les tokens**

```bash
npm install @fontsource/fraunces@5.3.0 @fontsource/libre-franklin@5.3.0 @fontsource/jetbrains-mono@5.3.0
```

Créer `src/lib/styles/tokens.css` :

```css
/* Source unique de vérité pour l'apparence du site ET des diapos.
   Aucune couleur ne doit être écrite en dur ailleurs. */
:root {
  --paper: #f6f3ec;
  --paper-2: #efece3;
  --ink: #16202c;
  --ink-2: #3a4553;
  --ink-3: #6b7684;
  --rule: #ddd8cc;
  --rule-2: #e9e5db;

  --accent: #c8102e;
  --accent-clair: #fbe9ec;

  --ciel: #0077b6;
  --ciel-clair: #e8f4f8;
  --ambre: #b45309;
  --ambre-clair: #fdf3e3;
  --violet: #5b21b6;
  --violet-clair: #ede9f8;
  --rose: #9f1239;
  --rose-clair: #fde8ee;
  --vert: #166534;
  --vert-clair: #e8f5ee;

  --police-display: 'Fraunces', Georgia, serif;
  --police-texte: 'Libre Franklin', system-ui, sans-serif;
  --police-mono: 'JetBrains Mono', ui-monospace, monospace;

  --rayon: 4px;
  --ombre: 0 1px 3px rgba(22, 32, 44, 0.06), 0 4px 16px rgba(22, 32, 44, 0.05);
  --ombre-sm: 0 1px 2px rgba(22, 32, 44, 0.05);

  --pas: 8px;
}
```

Créer `src/lib/styles/base.css` :

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { color-scheme: light; }

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--police-texte);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--police-display);
  color: var(--ink);
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 600;
}

h1 { font-size: clamp(2rem, 4vw, 3.2rem); }
h2 { font-size: clamp(1.4rem, 2.6vw, 2.1rem); }
h3 { font-size: clamp(1.05rem, 1.5vw, 1.25rem); }

p, li { color: var(--ink-2); }

code, pre { font-family: var(--police-mono); font-size: 0.88em; }

a { color: var(--accent); text-underline-offset: 3px; }
```

Modifier `src/routes/+layout.svelte` :

```svelte
<script>
  import '@fontsource/fraunces/400.css';
  import '@fontsource/fraunces/600.css';
  import '@fontsource/libre-franklin/400.css';
  import '@fontsource/libre-franklin/600.css';
  import '@fontsource/jetbrains-mono/400.css';
  import '$lib/styles/tokens.css';
  import '$lib/styles/base.css';

  let { children } = $props();
</script>

{@render children()}
```

- [ ] **Étape 4 : Compiler puis relancer le test**

Lancer : `npm run build && npx vitest run tests/styles.test.js`
Attendu : SUCCÈS pour les deux assertions.

Si l'assertion sur les tokens échoue à cause d'espaces insérés par le minificateur, ajuster l'assertion en `expect(css.replace(/\s+/g, '')).toContain('--paper:#f6f3ec')` — mais ne jamais relâcher l'assertion sur l'absence de CDN, qui est la vraie garantie hors-ligne.

- [ ] **Étape 5 : Committer**

```bash
git add package.json package-lock.json src/lib/styles src/routes/+layout.svelte tests/styles.test.js
git commit -m "feat: tokens de design partagés et polices auto-hébergées"
```

---

### Tâche 3 : Logique de navigation des diapos, en module pur

La navigation est extraite du composant pour être testable sans navigateur. C'est la partie où les erreurs de bornes se cachent, et c'est exactement ce qu'on ne veut pas découvrir en salle.

**Fichiers :**
- Créer : `src/lib/deck/navigation.js`
- Test : `tests/navigation.test.js`

**Interfaces :**
- Produit : `creerDeck(total) -> {total, index}`, `suivant(deck) -> deck`, `precedent(deck) -> deck`, `allerA(deck, n) -> deck`, `progression(deck) -> number` entre 0 et 1, `etiquette(deck) -> string` de forme `"3 / 42"`. Toutes les fonctions sont **pures** et retournent un nouvel objet. `Deck.svelte` (tâche 4) les consomme.

- [ ] **Étape 1 : Écrire les tests qui échouent**

Créer `tests/navigation.test.js` :

```js
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
  it('avance d\'une diapo', () => {
    expect(suivant(creerDeck(3)).index).toBe(1);
  });

  it('ne dépasse jamais la dernière diapo', () => {
    const fin = allerA(creerDeck(3), 2);
    expect(suivant(fin).index).toBe(2);
  });
});

describe('precedent', () => {
  it('recule d\'une diapo', () => {
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

  it('n\'est jamais nulle sur la première diapo', () => {
    expect(progression(creerDeck(4))).toBeCloseTo(0.25);
  });
});

describe('etiquette', () => {
  it('compte à partir de 1 pour l\'affichage humain', () => {
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
```

- [ ] **Étape 2 : Lancer les tests pour vérifier qu'ils échouent**

Lancer : `npx vitest run tests/navigation.test.js`
Attendu : ÉCHEC — le module `navigation.js` n'existe pas.

- [ ] **Étape 3 : Écrire l'implémentation minimale**

Créer `src/lib/deck/navigation.js` :

```js
/** Navigation de diapos, en fonctions pures: aucun état global, aucun DOM. */

export function creerDeck(total) {
  if (!Number.isInteger(total) || total < 1) {
    throw new Error('creerDeck: le total doit être un entier supérieur à zéro.');
  }
  return { total, index: 0 };
}

const borner = (n, total) => Math.min(Math.max(n, 0), total - 1);

export function allerA(deck, n) {
  return { ...deck, index: borner(n, deck.total) };
}

export function suivant(deck) {
  return allerA(deck, deck.index + 1);
}

export function precedent(deck) {
  return allerA(deck, deck.index - 1);
}

export function progression(deck) {
  return (deck.index + 1) / deck.total;
}

export function etiquette(deck) {
  return `${deck.index + 1} / ${deck.total}`;
}
```

- [ ] **Étape 4 : Lancer les tests pour vérifier qu'ils passent**

Lancer : `npx vitest run tests/navigation.test.js`
Attendu : SUCCÈS — 10 tests.

- [ ] **Étape 5 : Committer**

```bash
git add src/lib/deck/navigation.js tests/navigation.test.js
git commit -m "feat: logique de navigation des diapos en module pur testé"
```

---

### Tâche 4 : Composants Deck et Slide

Porte en Svelte le comportement éprouvé de `presentation_mm26` : clavier, barre de progression, points, balayage tactile, cycles de zoom, entrée échelonnée des éléments.

**Fichiers :**
- Créer : `src/lib/deck/Deck.svelte`, `src/lib/deck/Slide.svelte`, `src/lib/deck/deck.css`
- Créer : `src/routes/diapos/demo/+page.svelte`
- Test : `tests/deck-route.test.js`

**Interfaces :**
- Consomme : `creerDeck`, `suivant`, `precedent`, `allerA`, `progression`, `etiquette` de la tâche 3 ; les tokens de la tâche 2.
- Produit : `<Deck>{...}</Deck>` acceptant des `<Slide>` en enfants, et `<Slide>` acceptant une propriété `fond` valant `'papier'` (défaut) ou `'encre'`. Les decks des plans 2 et 3 les consomment.

- [ ] **Étape 1 : Écrire le test qui échoue**

Créer `tests/deck-route.test.js` :

```js
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
```

- [ ] **Étape 2 : Lancer le test pour vérifier qu'il échoue**

Lancer : `npm run build && npx vitest run tests/deck-route.test.js`
Attendu : ÉCHEC — la route `diapos/demo` n'existe pas.

- [ ] **Étape 3 : Écrire les composants**

Créer `src/lib/deck/deck.css` :

```css
.deck { position: fixed; inset: 0; overflow: hidden; background: var(--paper); }

.deck-grille {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--rule-2) 1px, transparent 1px),
    linear-gradient(90deg, var(--rule-2) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.5;
}

.deck-barre {
  position: fixed; top: 0; left: 0; height: 2px; z-index: 100;
  background: linear-gradient(90deg, var(--accent), var(--ciel));
  transition: width 0.4s ease;
}

.diapo {
  position: absolute; inset: 0; z-index: 10;
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(32px, 5vh, 56px) clamp(40px, 6vw, 80px);
  opacity: 0; pointer-events: none;
  transform: translateY(10px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.diapo.active { opacity: 1; pointer-events: auto; transform: none; }

.diapo.encre { background: var(--ink); color: var(--paper); }
.diapo.encre :global(h1), .diapo.encre :global(h2) { color: var(--paper); }
.diapo.encre :global(p) { color: var(--paper-2); }

/* Entrée échelonnée: chaque enfant direct marqué .e entre à son tour. */
.diapo :global(.e) {
  opacity: 0; transform: translateY(14px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.diapo.active :global(.e) { opacity: 1; transform: none; }
.diapo.active :global(.e:nth-child(1)) { transition-delay: 0.06s; }
.diapo.active :global(.e:nth-child(2)) { transition-delay: 0.14s; }
.diapo.active :global(.e:nth-child(3)) { transition-delay: 0.22s; }
.diapo.active :global(.e:nth-child(4)) { transition-delay: 0.30s; }
.diapo.active :global(.e:nth-child(5)) { transition-delay: 0.38s; }
.diapo.active :global(.e:nth-child(6)) { transition-delay: 0.46s; }

.deck-pied {
  position: fixed; bottom: 14px; right: 20px; z-index: 100;
  display: flex; align-items: center; gap: 14px;
  font-family: var(--police-mono); font-size: 0.72rem; color: var(--ink-3);
}

.deck-points { display: flex; gap: 5px; }
.point {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--rule); border: 0; padding: 0; cursor: pointer;
}
.point.on { background: var(--accent); }

@media print {
  .deck-barre, .deck-pied, .deck-grille { display: none; }
  .diapo { position: relative; opacity: 1; page-break-after: always; height: 100vh; }
  .diapo :global(.e) { opacity: 1; transform: none; }
}
```

Créer `src/lib/deck/Slide.svelte` :

```svelte
<script>
  let { fond = 'papier', actif = false, children } = $props();
</script>

<section class="diapo {fond === 'encre' ? 'encre' : ''} {actif ? 'active' : ''}">
  {@render children()}
</section>
```

Créer `src/lib/deck/Deck.svelte` :

```svelte
<script>
  import { creerDeck, suivant, precedent, allerA, progression, etiquette } from './navigation.js';
  import './deck.css';

  let { total, children } = $props();
  let deck = $state(creerDeck(total));

  const ZOOMS = [1.0, 1.3, 1.5];
  let zoom = $state(1.0);

  function auClavier(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      deck = suivant(deck);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      deck = precedent(deck);
    } else if (e.key === 'z' || e.key === 'Z') {
      e.preventDefault();
      zoom = ZOOMS[(ZOOMS.indexOf(zoom) + 1) % ZOOMS.length];
      document.documentElement.style.zoom = String(zoom);
    }
  }

  let debutX = 0;
  const auToucherDebut = (e) => (debutX = e.touches[0].clientX);
  function auToucherFin(e) {
    const dx = e.changedTouches[0].clientX - debutX;
    if (Math.abs(dx) > 50) deck = dx < 0 ? suivant(deck) : precedent(deck);
  }
</script>

<svelte:window onkeydown={auClavier} ontouchstart={auToucherDebut} ontouchend={auToucherFin} />

<div class="deck">
  <div class="deck-grille"></div>
  <div class="deck-barre" style="width: {progression(deck) * 100}%"></div>

  {@render children(deck.index)}

  <div class="deck-pied">
    <div class="deck-points">
      {#each Array(deck.total) as _, i}
        <button
          class="point {i === deck.index ? 'on' : ''}"
          aria-label="Aller à la diapo {i + 1}"
          onclick={() => (deck = allerA(deck, i))}
        ></button>
      {/each}
    </div>
    <span>{etiquette(deck)}</span>
  </div>
</div>
```

Créer `src/routes/diapos/demo/+page.svelte` :

```svelte
<script>
  import Deck from '$lib/deck/Deck.svelte';
  import Slide from '$lib/deck/Slide.svelte';
</script>

<Deck total={3}>
  {#snippet children(i)}
    <Slide actif={i === 0}>
      <h1 class="e">Parcours IA</h1>
      <p class="e">Démonstration du moteur de diapos.</p>
    </Slide>
    <Slide actif={i === 1} fond="encre">
      <h2 class="e">Fond encre</h2>
      <p class="e">Pour les diapos de transition.</p>
    </Slide>
    <Slide actif={i === 2}>
      <h2 class="e">Navigation</h2>
      <p class="e">Flèches, espace, balayage tactile, touche Z pour le zoom.</p>
    </Slide>
  {/snippet}
</Deck>
```

- [ ] **Étape 4 : Compiler puis relancer le test**

Lancer : `npm run build && npx vitest run tests/deck-route.test.js`
Attendu : SUCCÈS pour les trois assertions.

- [ ] **Étape 5 : Vérifier la projection hors-ligne à la main**

Lancer : `xdg-open build/diapos/demo/index.html`
Attendu : le deck s'affiche correctement **depuis `file://`**, polices comprises, et les flèches font défiler les diapos. C'est la vérification qui compte vraiment ; si elle échoue, revoir `paths.relative`.

- [ ] **Étape 6 : Committer**

```bash
git add src/lib/deck src/routes/diapos tests/deck-route.test.js
git commit -m "feat: moteur de diapos Deck/Slide projetable hors-ligne"
```

---

### Tâche 5 : Script R de vérification de l'installation

**C'est la pièce la plus importante du plan.** Elle est le critère de sortie du bloc 2 de la séance 1 et le filet de sécurité du week-end. Elle doit être lisible par une personne qui n'a jamais ouvert un terminal, et chaque échec doit dire quoi faire.

Elle est servie en fichier statique pour tenir en une seule ligne à copier.

**Fichiers :**
- Créer : `static/verifier.R`
- Test : `tests/testthat/test-verifier.R`, `tests/testthat.R`

**Interfaces :**
- Produit : `verifier_installation(modele = "gemini-3.5-flash", appel_reel = TRUE)` qui imprime un rapport et retourne invisiblement un `data.frame` à colonnes `controle`, `ok`, `detail`, `remede`. Les fonctions internes `.statut_r()`, `.statut_paquet()`, `.statut_cle()` et `.formater_ligne()` sont pures et testées.

- [ ] **Étape 1 : Écrire les tests qui échouent**

Créer `tests/testthat.R` :

```r
library(testthat)
source("../static/verifier.R")
test_dir("testthat")
```

Créer `tests/testthat/test-verifier.R` :

```r
source("../../static/verifier.R")

test_that(".statut_r accepte une version suffisante", {
  s <- .statut_r("4.6.1")
  expect_true(s$ok)
})

test_that(".statut_r refuse une version trop ancienne et propose un remède", {
  s <- .statut_r("3.6.0")
  expect_false(s$ok)
  expect_true(nzchar(s$remede))
})

test_that(".statut_paquet signale un paquet absent avec la commande d'installation", {
  s <- .statut_paquet("ellmer", installe = FALSE)
  expect_false(s$ok)
  expect_match(s$remede, "install.packages", fixed = TRUE)
})

test_that(".statut_paquet accepte un paquet présent", {
  expect_true(.statut_paquet("ellmer", installe = TRUE)$ok)
})

test_that(".statut_cle refuse une clé vide", {
  expect_false(.statut_cle("")$ok)
})

test_that(".statut_cle refuse une clé faite d'espaces", {
  expect_false(.statut_cle("   ")$ok)
})

test_that(".statut_cle accepte une clé plausible", {
  expect_true(.statut_cle("AIzaSyDetteCleEstFactice1234567890abcd")$ok)
})

test_that(".statut_cle ne divulgue jamais la clé dans son détail", {
  cle <- "AIzaSyDetteCleEstFactice1234567890abcd"
  s <- .statut_cle(cle)
  expect_false(grepl(cle, paste(s$detail, s$remede), fixed = TRUE))
})

test_that(".formater_ligne marque visuellement le succès et l'échec", {
  expect_match(.formater_ligne(list(controle = "R", ok = TRUE,  detail = "4.6.1", remede = "")), "OK")
  expect_match(.formater_ligne(list(controle = "R", ok = FALSE, detail = "3.6.0", remede = "x")), "ÉCHEC")
})
```

- [ ] **Étape 2 : Lancer les tests pour vérifier qu'ils échouent**

Lancer : `cd tests && Rscript testthat.R`
Attendu : ÉCHEC — `static/verifier.R` n'existe pas.

- [ ] **Étape 3 : Écrire le script**

Créer `static/verifier.R` :

```r
# Vérification de l'environnement — Parcours IA, EIOM 2026
# Usage, en une ligne dans R:
#   source("https://eiom-ia.github.io/verifier.R"); verifier_installation()

.VERSION_R_MIN <- "4.1.0"

.statut_r <- function(version = as.character(getRversion())) {
  ok <- utils::compareVersion(version, .VERSION_R_MIN) >= 0
  list(
    controle = "Version de R",
    ok = ok,
    detail = version,
    remede = if (ok) "" else paste0(
      "Votre version de R est trop ancienne (il faut au moins ", .VERSION_R_MIN,
      "). Installez la version courante depuis https://cran.r-project.org puis redémarrez."
    )
  )
}

.statut_paquet <- function(nom, installe = requireNamespace(nom, quietly = TRUE)) {
  list(
    controle = paste("Paquet", nom),
    ok = installe,
    detail = if (installe) as.character(utils::packageVersion(nom)) else "absent",
    remede = if (installe) "" else paste0(
      'Le paquet est absent. Tapez: install.packages("', nom, '")'
    )
  )
}

.statut_cle <- function(valeur = Sys.getenv("GEMINI_API_KEY", Sys.getenv("GOOGLE_API_KEY"))) {
  ok <- nzchar(trimws(valeur))
  list(
    controle = "Clé Google AI Studio",
    # On ne montre jamais la clé, seulement sa longueur.
    ok = ok,
    detail = if (ok) paste0("trouvée (", nchar(trimws(valeur)), " caractères)") else "introuvable",
    remede = if (ok) "" else paste(
      "R ne voit pas votre clé. Tapez usethis::edit_r_environ(), ajoutez la ligne",
      "GEMINI_API_KEY=votre_cle puis REDÉMARREZ R. La clé ne doit jamais être écrite",
      "dans un script ni versionnée dans Git."
    )
  )
}

.statut_appel <- function(modele) {
  if (!requireNamespace("ellmer", quietly = TRUE)) {
    return(list(controle = "Appel réel au modèle", ok = FALSE, detail = "ellmer absent",
                remede = "Réglez d'abord le contrôle précédent."))
  }
  res <- tryCatch({
    chat <- ellmer::chat_google_gemini(model = modele, echo = "none")
    r <- chat$chat("Réponds uniquement par le mot: pret")
    list(ok = TRUE, detail = trimws(substr(r, 1, 40)))
  }, error = function(e) list(ok = FALSE, detail = conditionMessage(e)))

  list(
    controle = "Appel réel au modèle",
    ok = res$ok,
    detail = res$detail,
    remede = if (res$ok) "" else paste(
      "L'appel a échoué. Vérifiez votre connexion, que la clé est valide, et que le",
      "modèle", modele, "est bien offert au palier gratuit. Écrivez-nous si le blocage persiste."
    )
  )
}

.formater_ligne <- function(s) {
  marque <- if (isTRUE(s$ok)) "[ OK   ]" else "[ ÉCHEC]"
  sprintf("%s %-28s %s", marque, s$controle, s$detail)
}

verifier_installation <- function(modele = "gemini-3.5-flash", appel_reel = TRUE) {
  controles <- list(.statut_r(), .statut_paquet("ellmer"), .statut_cle())
  if (appel_reel) controles <- c(controles, list(.statut_appel(modele)))

  cat("\n== Vérification de l'environnement — Parcours IA, EIOM 2026 ==\n\n")
  for (s in controles) cat(.formater_ligne(s), "\n")

  echecs <- Filter(function(s) !isTRUE(s$ok), controles)
  if (length(echecs) == 0) {
    cat("\nTout est en place. Vous êtes prêt·e pour lundi matin.\n\n")
  } else {
    cat("\n--- À corriger ---\n")
    for (s in echecs) cat("\n*", s$controle, ":\n  ", s$remede, "\n")
    cat("\nToujours bloqué·e? Écrivez-nous avant lundi, on règle ça ensemble.\n\n")
  }

  invisible(data.frame(
    controle = vapply(controles, `[[`, "", "controle"),
    ok       = vapply(controles, function(s) isTRUE(s$ok), TRUE),
    detail   = vapply(controles, `[[`, "", "detail"),
    remede   = vapply(controles, `[[`, "", "remede"),
    stringsAsFactors = FALSE
  ))
}
```

- [ ] **Étape 4 : Lancer les tests pour vérifier qu'ils passent**

Lancer : `cd tests && Rscript testthat.R`
Attendu : SUCCÈS — 9 tests.

- [ ] **Étape 5 : Vérifier le rapport à l'œil, sans réseau**

Lancer : `Rscript -e 'source("static/verifier.R"); verifier_installation(appel_reel = FALSE)'`
Attendu : un rapport lisible, aligné, en français, où le contrôle de la clé échoue proprement avec son remède si aucune clé n'est définie.

- [ ] **Étape 6 : Committer**

```bash
git add static/verifier.R tests/testthat.R tests/testthat/test-verifier.R
git commit -m "feat: script de vérification de l'installation, avec remèdes en français"
```

- [ ] **Étape 7 : VÉRIFICATION BLOQUANTE avec une vraie clé**

Cette étape exige une clé Google AI Studio et **ne peut pas être devinée**. Elle doit être faite avant l'envoi du guide.

```bash
GEMINI_API_KEY=<la_vraie_cle> Rscript -e 'source("static/verifier.R"); print(verifier_installation())'
Rscript -e 'library(ellmer); print(models_google_gemini())'
```

Attendu : quatre contrôles au vert, et la liste des modèles confirmant que `gemini-3.5-flash` existe bien et est offert au palier gratuit. **Si le nom du modèle diffère, corriger `.VERSION` du défaut dans `verifier_installation()` et toutes les mentions du modèle dans le guide de la tâche 6.** Ne pas publier le guide avant d'avoir fait cette vérification.

---

### Tâche 6 : Page « Avant de venir » — le livrable de jeudi

**Fichiers :**
- Créer : `src/lib/components/Prose.svelte`, `src/lib/components/Etape.svelte`, `src/routes/avant-de-venir/+page.svelte`
- Test : `tests/avant-de-venir.test.js`

**Interfaces :**
- Consomme : les tokens de la tâche 2, le script de la tâche 5.
- Produit : `<Prose>` (conteneur de prose à largeur de lecture) et `<Etape numero titre>` (une étape numérotée du guide). Les pages de séance des plans 2 et 3 les réutilisent.

- [ ] **Étape 1 : Écrire le test qui échoue**

Créer `tests/avant-de-venir.test.js` :

```js
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';

const page = () => readFileSync('build/avant-de-venir/index.html', 'utf8');

describe('guide d\'installation', () => {
  it('est prérendu', () => {
    expect(existsSync('build/avant-de-venir/index.html')).toBe(true);
  });

  it('couvre les sept sections exigées par le devis', () => {
    const html = page();
    for (const attendu of [
      'Ce qu&#39;il faut faire avant lundi',
      'Installer R',
      'Obtenir une clé',
      '.Renviron',
      'Vérifier que tout fonctionne',
      'Si rien ne fonctionne',
      'Nous écrire'
    ]) {
      expect(html).toContain(attendu);
    }
  });

  it('donne la ligne de vérification en une seule commande', () => {
    expect(page()).toContain('source("https://eiom-ia.github.io/verifier.R")');
  });

  it('avertit de ne jamais versionner la clé', () => {
    expect(page()).toMatch(/jamais.{0,80}(Git|dépôt|script)/i);
  });

  it('sert le script de vérification en statique', () => {
    expect(existsSync('build/verifier.R')).toBe(true);
  });
});
```

- [ ] **Étape 2 : Lancer le test pour vérifier qu'il échoue**

Lancer : `npm run build && npx vitest run tests/avant-de-venir.test.js`
Attendu : ÉCHEC — la route n'existe pas.

- [ ] **Étape 3 : Écrire les composants et la page**

Créer `src/lib/components/Prose.svelte` :

```svelte
<script>
  let { children } = $props();
</script>

<div class="prose">{@render children()}</div>

<style>
  .prose {
    max-width: 68ch;
    margin: 0 auto;
    padding: clamp(32px, 6vh, 72px) 24px 96px;
  }
  .prose :global(h1) { margin-bottom: 0.4em; }
  .prose :global(h2) { margin: 2em 0 0.5em; }
  .prose :global(p), .prose :global(li) { margin-bottom: 0.9em; }
  .prose :global(ul), .prose :global(ol) { padding-left: 1.4em; }
  .prose :global(pre) {
    background: var(--ink);
    color: var(--paper);
    padding: 14px 16px;
    border-radius: var(--rayon);
    overflow-x: auto;
    margin-bottom: 1.2em;
  }
  .prose :global(code) {
    background: var(--paper-2);
    padding: 1px 5px;
    border-radius: 2px;
  }
  .prose :global(pre code) { background: none; padding: 0; }
</style>
```

Créer `src/lib/components/Etape.svelte` :

```svelte
<script>
  let { numero, titre, children } = $props();
</script>

<section class="etape">
  <h2><span class="num">{numero}</span>{titre}</h2>
  {@render children()}
</section>

<style>
  .etape { margin: 2.6em 0; }
  .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7em; height: 1.7em;
    margin-right: 0.5em;
    border-radius: 50%;
    background: var(--accent);
    color: var(--paper);
    font-family: var(--police-mono);
    font-size: 0.6em;
    vertical-align: middle;
  }
</style>
```

Créer `src/routes/avant-de-venir/+page.svelte`. La rédaction complète du contenu se fait à cette étape ; la structure obligatoire est celle de la section 11 du devis, dans cet ordre, avec les sept titres exacts vérifiés par le test :

1. « Ce qu'il faut faire avant lundi » — liste courte et datée, sans jargon.
2. « Installer R et un éditeur » — Windows et macOS séparés, avec le piège classique de chaque plateforme nommé.
3. « Obtenir une clé Google AI Studio » — gratuite, sans carte de crédit, étape par étape.
4. « Déposer la clé dans `.Renviron` » — via `usethis::edit_r_environ()`, avec l'avertissement de ne jamais l'écrire dans un script ni la versionner.
5. « Vérifier que tout fonctionne » — la ligne unique `source("https://eiom-ia.github.io/verifier.R"); verifier_installation()`, et la lecture du rapport.
6. « Si rien ne fonctionne » — venez quand même, voici la voie navigateur sans installation.
7. « Nous écrire » — à qui, avec une date limite avant le lundi.

Le ton vise la personne qui n'a jamais ouvert un terminal. Aucune phrase ne suppose un acquis non enseigné dans la page elle-même.

- [ ] **Étape 4 : Compiler puis relancer le test**

Lancer : `npm run build && npx vitest run tests/avant-de-venir.test.js`
Attendu : SUCCÈS pour les cinq assertions.

- [ ] **Étape 5 : Committer**

```bash
git add src/lib/components src/routes/avant-de-venir tests/avant-de-venir.test.js
git commit -m "feat: guide d'installation, livrable central du plan 1"
```

---

### Tâche 7 : Coquille du site

Navigation, accueil, et une page par séance. Les séances 2 et 3 reçoivent un gabarit qu'Antoine remplira ; la section 8 du devis fournit le texte des interfaces à y inscrire.

**Fichiers :**
- Créer : `src/lib/components/Nav.svelte`, `src/lib/data/seances.js`
- Créer : `src/routes/seances/[numero]/+page.svelte`, `src/routes/seances/[numero]/+page.js`
- Créer : `src/routes/ressources/+page.svelte`
- Modifier : `src/routes/+page.svelte`, `src/routes/+layout.svelte`
- Test : `tests/site.test.js`

**Interfaces :**
- Consomme : `<Prose>` de la tâche 6, les tokens de la tâche 2.
- Produit : `src/lib/data/seances.js` exportant `SEANCES`, un tableau de cinq objets `{numero, date, jour, titre, formateur, resume, statut}` où `statut` vaut `'complet'` ou `'gabarit'`. Les plans 2 et 3 enrichissent ces entrées.

- [ ] **Étape 1 : Écrire le test qui échoue**

Créer `tests/site.test.js` :

```js
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { SEANCES } from '../src/lib/data/seances.js';

describe('données des séances', () => {
  it('décrit les cinq séances', () => {
    expect(SEANCES).toHaveLength(5);
  });

  it('attribue les séances 1, 4 et 5 à Foisy et les 2 et 3 à Lemor', () => {
    const par = Object.fromEntries(SEANCES.map((s) => [s.numero, s.formateur]));
    expect(par[1]).toMatch(/Foisy/);
    expect(par[4]).toMatch(/Foisy/);
    expect(par[2]).toMatch(/Lemor/);
    expect(par[3]).toMatch(/Lemor/);
  });

  it('date correctement la semaine du 24 au 28 août 2026', () => {
    expect(SEANCES.map((s) => s.date)).toEqual([
      '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28'
    ]);
  });
});

describe('routes prérendues', () => {
  for (const n of [1, 2, 3, 4, 5]) {
    it(`prérend la séance ${n}`, () => {
      expect(existsSync(`build/seances/${n}/index.html`)).toBe(true);
    });
  }

  it('prérend l\'accueil et les ressources', () => {
    expect(existsSync('build/index.html')).toBe(true);
    expect(existsSync('build/ressources/index.html')).toBe(true);
  });

  it('met en avant le guide d\'installation depuis l\'accueil', () => {
    expect(readFileSync('build/index.html', 'utf8')).toContain('avant-de-venir');
  });
});
```

- [ ] **Étape 2 : Lancer le test pour vérifier qu'il échoue**

Lancer : `npm run build && npx vitest run tests/site.test.js`
Attendu : ÉCHEC — `src/lib/data/seances.js` n'existe pas.

- [ ] **Étape 3 : Écrire les données et les routes**

Créer `src/lib/data/seances.js` :

```js
export const SEANCES = [
  {
    numero: 1,
    date: '2026-08-24',
    jour: 'lundi 24 août',
    titre: 'Comprendre les LLM et y accéder pour la recherche',
    formateur: 'Laurence-Olivier M. Foisy',
    resume:
      "Le fonctionnement des grands modèles de langue, et l'accès programmatique par API — " +
      'la condition d\'une utilisation systématique, transparente et reproductible en recherche. ' +
      'Chacun·e repart avec un environnement de travail fonctionnel.',
    statut: 'complet'
  },
  {
    numero: 2,
    date: '2026-08-25',
    jour: 'mardi 25 août',
    titre: 'Valider les LLM dans un cadre scientifique',
    formateur: 'Antoine Lemor',
    resume:
      'Métriques de validation, benchmarks, cas ambigus, validation de différents formats de ' +
      'données dont les images, et distinction entre classifieurs et modèles génératifs.',
    statut: 'gabarit'
  },
  {
    numero: 3,
    date: '2026-08-26',
    jour: 'mercredi 26 août',
    titre: 'Des sorties de modèles aux mesures scientifiques',
    formateur: 'Antoine Lemor',
    resume:
      "Traduire l'output d'un modèle en mesure valide, puis les modèles open weights exécutés " +
      'localement : sécurité des données, reproductibilité, contrôle des coûts, et leurs limites.',
    statut: 'gabarit'
  },
  {
    numero: 4,
    date: '2026-08-27',
    jour: 'jeudi 27 août',
    titre: "L'IA agentique dans le flux de travail de recherche",
    formateur: 'Laurence-Olivier M. Foisy',
    resume:
      'Les concepts fondamentaux des agents, dont les skills et les protocoles de contexte de ' +
      'modèle (MCP), et leur intégration fiable et vérifiable aux étapes du cycle de la recherche.',
    statut: 'complet'
  },
  {
    numero: 5,
    date: '2026-08-28',
    jour: 'vendredi 28 août',
    titre: "Visite d'un acteur de l'industrie et atelier intégratif",
    formateur: 'Antoine Lemor et Laurence-Olivier M. Foisy',
    resume:
      "Une rencontre avec des praticien·ne·s du domaine, puis un atelier où l'on mobilise " +
      'tous les outils de la semaine dans un flux complet, de la question de recherche à la diffusion.',
    statut: 'complet'
  }
];

export const seanceParNumero = (n) => SEANCES.find((s) => s.numero === Number(n));
```

Créer `src/routes/seances/[numero]/+page.js` :

```js
import { error } from '@sveltejs/kit';
import { SEANCES, seanceParNumero } from '$lib/data/seances.js';

export const prerender = true;

export function entries() {
  return SEANCES.map((s) => ({ numero: String(s.numero) }));
}

export function load({ params }) {
  const seance = seanceParNumero(params.numero);
  if (!seance) error(404, 'Séance inconnue');
  return { seance };
}
```

Créer `src/routes/seances/[numero]/+page.svelte` : afficher `data.seance` — le jour, le titre, le formateur, le résumé — dans un `<Prose>`. Si `statut === 'gabarit'`, afficher un encadré indiquant que le contenu sera publié par Antoine Lemor, suivi du texte des interfaces tiré de la section 8 du devis : ce sur quoi la séance peut compter à l'issue de la séance 1.

Créer `src/lib/components/Nav.svelte` : une barre de navigation vers l'accueil, « Avant de venir », les cinq séances et les ressources. « Avant de venir » est visuellement mis en avant tant que la semaine n'a pas commencé.

Modifier `src/routes/+layout.svelte` pour insérer `<Nav />` au-dessus de `{@render children()}`, sauf sur les routes commençant par `/diapos/`, où le deck occupe tout l'écran. Utiliser `$app/state` pour lire l'URL courante.

Modifier `src/routes/+page.svelte` : la semaine en un coup d'œil, une carte par séance depuis `SEANCES`, et un appel à l'action bien visible vers `avant-de-venir`.

Créer `src/routes/ressources/+page.svelte` : clés et quotas, dépannage, glossaire, lectures.

- [ ] **Étape 4 : Compiler puis relancer le test**

Lancer : `npm run build && npx vitest run tests/site.test.js`
Attendu : SUCCÈS pour les onze assertions.

- [ ] **Étape 5 : Committer**

```bash
git add src/lib/data src/lib/components/Nav.svelte src/routes tests/site.test.js
git commit -m "feat: coquille du site, cinq pages de séance et ressources"
```

---

### Tâche 8 : Publication sur GitHub Pages

`eiom-ia.github.io` est un site d'organisation : il se publie à la racine du domaine, donc sans `base` path. C'est ce qui rend valide l'URL `https://eiom-ia.github.io/verifier.R` inscrite dans le guide.

**Fichiers :**
- Créer : `.github/workflows/deploy.yml`, `static/.nojekyll`
- Test : `tests/deploiement.test.js`

**Interfaces :**
- Produit : le site publié à `https://eiom-ia.github.io/`.

- [ ] **Étape 1 : Écrire le test qui échoue**

Créer `tests/deploiement.test.js` :

```js
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
});
```

- [ ] **Étape 2 : Lancer le test pour vérifier qu'il échoue**

Lancer : `npm run build && npx vitest run tests/deploiement.test.js`
Attendu : ÉCHEC — `.nojekyll` et le workflow sont absents.

- [ ] **Étape 3 : Écrire la configuration**

```bash
touch static/.nojekyll
```

Créer `.github/workflows/deploy.yml` :

```yaml
name: Publier le site

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npx vitest run
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploiement.outputs.page_url }}
    steps:
      - id: deploiement
        uses: actions/deploy-pages@v4
```

- [ ] **Étape 4 : Compiler puis relancer le test**

Lancer : `npm run build && npx vitest run tests/deploiement.test.js`
Attendu : SUCCÈS pour les trois assertions.

- [ ] **Étape 5 : Activer Pages puis publier**

```bash
gh api -X POST repos/eiom-ia/eiom-ia.github.io/pages -f build_type=workflow
git add .github static/.nojekyll tests/deploiement.test.js
git commit -m "feat: publication automatique sur GitHub Pages"
git push
```

Ouvrir ensuite une pull request de `parcours-ia` vers `main` et la faire fusionner par Laurence-Olivier — la publication ne se déclenche que depuis `main`.

- [ ] **Étape 6 : Vérifier le site en ligne**

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://eiom-ia.github.io/
curl -sS -o /dev/null -w '%{http_code}\n' https://eiom-ia.github.io/avant-de-venir/
curl -sS https://eiom-ia.github.io/verifier.R | head -5
```

Attendu : deux fois `200`, et l'entête du script R. **Puis le test qui compte vraiment** : depuis une machine qui n'est pas celle de développement, suivre le guide de bout en bout comme le ferait un·e participant·e, et faire passer `verifier_installation()` au vert.

---

## Auto-relecture

**Couverture du devis.** Section 11 (guide d'installation) → tâches 5 et 6. Section 12 (architecture technique, routes, moteur de diapos, tokens partagés) → tâches 1, 2, 3, 4, 7. Section 13 (système de design) → tâche 2. Section 14, ligne « clé dans le dépôt public » → `.gitignore` posé au commit initial, plus l'avertissement testé à la tâche 6. Section 14, ligne « wifi tombe » → vérification `file://` à la tâche 4, étape 5. Sections 7 à 10 (contenu des séances) → **hors de ce plan, par découpage assumé** : elles relèvent des plans 2 et 3.

**Placeholders.** Aucun « TBD » ni « à compléter ». Les tâches 6 et 7 décrivent en prose le contenu rédactionnel plutôt qu'en code, ce qui est délibéré : c'est du texte français à écrire, pas de la logique, et la structure obligatoire y est énumérée et vérifiée par des assertions.

**Cohérence des types.** `creerDeck/suivant/precedent/allerA/progression/etiquette` sont définies à la tâche 3 et consommées sous ces noms exacts à la tâche 4. `SEANCES` et `seanceParNumero` sont définies à la tâche 7 et utilisées sous ces noms dans son propre test et sa route. `<Prose>` est produite à la tâche 6 et consommée à la tâche 7. `verifier_installation()`, `.statut_r()`, `.statut_paquet()`, `.statut_cle()`, `.formater_ligne()` sont définies et testées à la tâche 5, et l'URL du script est vérifiée à la tâche 6.

**Dépendance non levable sans intervention humaine.** La tâche 5, étape 7 exige une vraie clé Google AI Studio pour confirmer le nom exact du modèle Flash. Aucun test ne peut la remplacer. Elle doit être faite avant l'envoi du guide.
