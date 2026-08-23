// Photographie une diapo pilotee au clic: on clique, on attend que les
// transitions se posent, on capture. Verifier une animation commandee a la
// main demande de la commander, pas d'attendre.
//
// Usage: node outils/clics.mjs <url> <dossier> <index> <nb-clics>
import { chromium } from '@playwright/test';

const [, , url, out, idx, n] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.evaluate((i) => {
  const d = document.querySelector('.deck');
  d.scrollTo({ top: i * d.clientHeight, behavior: 'instant' });
}, Number(idx));
await p.waitForTimeout(500);
await p.screenshot({ path: `${out}/clic-00.png` });

for (let k = 1; k <= Number(n); k++) {
  await p.evaluate((i) => {
    document.querySelectorAll('.diapo')[i].click();
  }, Number(idx));
  await p.waitForTimeout(900); // les transitions durent 0,6 s
  await p.screenshot({ path: `${out}/clic-${String(k).padStart(2, '0')}.png` });
}
await b.close();
console.log(`${n} clics capturés`);
