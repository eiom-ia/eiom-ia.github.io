// Capture la frise à plusieurs positions de défilement.
import { chromium } from '@playwright/test';
const [, , url, out, ...frac] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.evaluate(() => {
  const d = document.querySelector('.deck');
  const i = [...document.querySelectorAll('.diapo')].findIndex((s) => s.querySelector('.frise'));
  d.scrollTo({ top: i * d.clientHeight, behavior: 'instant' });
});
await p.waitForTimeout(400);
for (const f of frac) {
  await p.evaluate((f) => {
    const pi = document.querySelector('.piste');
    pi.scrollLeft = (pi.scrollWidth - pi.clientWidth) * Number(f);
  }, f);
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/frise-${f}.png` });
}
await b.close();
console.log('captures faites');
