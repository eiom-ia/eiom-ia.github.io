import { chromium } from '@playwright/test';
const [, , url, out, idx, nb, sel] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
await p.evaluate((n) => { const d = document.querySelector('.deck'); d.scrollTo({ top: n * d.clientHeight, behavior: 'instant' }); }, Number(idx));
await p.waitForTimeout(500);
for (let k = 1; k <= Number(nb); k++) {
  await p.mouse.click(960, 1000);
  await p.waitForTimeout(500);
  const el = await p.$(`.diapo:nth-child(${Number(idx) + 1}) ${sel}`);
  await el.screenshot({ path: `${out}/v-${k}.png` });
}
console.log('ok');
await b.close();
