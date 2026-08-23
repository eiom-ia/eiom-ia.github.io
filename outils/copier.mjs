// Verifie que le bouton « copier » depose bien le code dans le presse-papiers.
// Usage: node outils/copier.mjs <url> <index-diapo>
import { chromium } from '@playwright/test';

const [, , url, idx] = process.argv;
const b = await chromium.launch();
const ctx = await b.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const p = await ctx.newPage({ viewport: { width: 1366, height: 768 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate((i) => {
  const d = document.querySelector('.deck');
  d.scrollTo({ top: i * d.clientHeight, behavior: 'instant' });
}, Number(idx));
await p.waitForTimeout(500);

const btn = p.locator('.diapo').nth(Number(idx)).locator('.copier').first();
console.log('bouton visible :', await btn.isVisible());
await btn.click();
await p.waitForTimeout(300);
console.log('libellé après  :', (await btn.textContent()).trim());

const colle = await p.evaluate(() => navigator.clipboard.readText());
console.log('presse-papiers :');
console.log(colle.split('\n').slice(0, 4).map((l) => '   ' + l).join('\n'));

const attendu = await p.locator('.diapo').nth(Number(idx)).locator('pre code').first().innerText();
console.log('identique au bloc affiché :', colle.trim() === attendu.trim());
await b.close();
