// Capture une diapo animee a plusieurs instants, pour verifier une sequence
// et pas seulement son premier etat. Les animations du deck demarrent a
// l'arrivee sur la diapo: on s'y place, puis on photographie au fil du temps.
//
// Usage: node outils/sequence.mjs <url> <dossier> <index> <ms...>
import { chromium } from '@playwright/test';

const [, , url, out, idx, ...offsets] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.evaluate((n) => {
  const d = document.querySelector('.deck');
  d.scrollTo({ top: n * d.clientHeight, behavior: 'instant' });
}, Number(idx));

let prev = 0;
for (const ms of offsets) {
  await p.waitForTimeout(Number(ms) - prev);
  prev = Number(ms);
  await p.screenshot({ path: `${out}/seq-${ms}.png` });
}
await b.close();
console.log(`${offsets.length} instants capturés`);
