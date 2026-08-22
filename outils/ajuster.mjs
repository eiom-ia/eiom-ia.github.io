// Mesure chaque diapo dans un vrai navigateur et ecrit dans la source le
// facteur d'echelle qui lui evite de deborder. Deterministe et verifiable:
// on ne devine pas une taille, on la mesure.
//
// Usage: node outils/ajuster.mjs <fichier.svelte> <url-du-build>
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';

const [, , source, url] = process.argv;
const MARGE = 0.985; // on vise juste sous la limite

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);

const mesures = await p.evaluate(() =>
  [...document.querySelectorAll('.diapo')].map((d) => {
    const cs = getComputedStyle(d);
    const utile = d.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const inner = d.querySelector('.diapo-in');
    return { utile, haut: inner.scrollHeight };
  })
);
await b.close();

let src = readFileSync(source, 'utf8');
const balises = [...src.matchAll(/<Slide\b[^>]*>/g)];
if (balises.length !== mesures.length) {
  console.error(`Décompte incohérent: ${balises.length} balises, ${mesures.length} diapos rendues.`);
  process.exit(1);
}

let modifiees = 0;
// On repart de la fin pour que les index de remplacement restent valides.
for (let i = balises.length - 1; i >= 0; i--) {
  const balise = balises[i][0];
  const actuel = Number(balise.match(/\bd=\{?"?([\d.]+)"?\}?/)?.[1] ?? 1);
  const { utile, haut } = mesures[i];
  const ratio = utile / haut;
  let neuf = ratio >= 1 ? actuel : Math.floor(actuel * ratio * MARGE * 100) / 100;
  neuf = Math.max(neuf, 0.5);
  if (Math.abs(neuf - actuel) < 0.005) continue;

  let remplacement;
  if (/\bd=/.test(balise)) {
    remplacement = balise.replace(/\bd=\{?"?[\d.]+"?\}?/, neuf === 1 ? '' : `d={${neuf}}`);
  } else {
    remplacement = neuf === 1 ? balise : balise.replace(/^<Slide/, `<Slide d={${neuf}}`);
  }
  remplacement = remplacement.replace(/\s+>/, '>').replace(/\s{2,}/g, ' ');
  src = src.slice(0, balises[i].index) + remplacement + src.slice(balises[i].index + balise.length);
  modifiees++;
}

writeFileSync(source, src);
console.log(`${modifiees} diapo(s) ajustée(s) dans ${source}`);
