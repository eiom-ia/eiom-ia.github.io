// Verifie qu'une diapo interactive repond bien a la telecommande: on presse
// les touches de navigation et on regarde ce qui bouge — le temps de
// l'animation ou la diapositive elle-meme.
//
// Usage: node outils/clavier.mjs <url> <index>
import { chromium } from '@playwright/test';

const [, , url, idx] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.evaluate((i) => {
  const d = document.querySelector('.deck');
  d.scrollTo({ top: i * d.clientHeight, behavior: 'instant' });
}, Number(idx));
await p.waitForTimeout(600);

const etat = () =>
  p.evaluate(() => {
    const d = document.querySelector('.deck');
    const n = document.querySelector('.pas-n');
    return {
      diapo: Math.round(d.scrollTop / d.clientHeight),
      temps: n ? n.textContent.trim() : null
    };
  });

console.log('départ        ', JSON.stringify(await etat()));
for (const k of [1, 2, 3]) {
  await p.keyboard.press('PageDown');
  await p.waitForTimeout(220);
  console.log(`PageDown x${k}   `, JSON.stringify(await etat()));
}
await p.keyboard.press('PageUp');
await p.waitForTimeout(220);
console.log('PageUp        ', JSON.stringify(await etat()));

for (let i = 0; i < 30; i++) {
  await p.keyboard.press('PageDown');
  await p.waitForTimeout(60);
}
await p.waitForTimeout(400);
console.log('après la fin  ', JSON.stringify(await etat()));
await b.close();
