// Detecte les diapos dont le contenu depasse la hauteur utile.
// Une diapo qui deborde est une diapo coupee au projecteur.
import { chromium } from '@playwright/test';

const [, , url, w = '1920', h = '1080'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(w), height: Number(h) } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
const res = await p.evaluate(() =>
  [...document.querySelectorAll('.diapo')]
    .map((d, i) => {
      const cs = getComputedStyle(d);
      const utile =
        d.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const inner = d.querySelector('.diapo-in');
      const titre =
        inner.querySelector('h1, h2')?.textContent.trim().slice(0, 46) ?? '(sans titre)';
      return { i, debord: Math.round(inner.scrollHeight - utile), titre };
    })
    .filter((x) => x.debord > 0)
);
await b.close();
console.log(`${res.length} diapo(s) débordent à ${w}x${h} :`);
for (const r of res) console.log(`  #${String(r.i).padStart(2)}  +${r.debord}px  ${r.titre}`);
process.exit(res.length ? 1 : 0);
