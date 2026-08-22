// Migration: le <p class="surtitre"> de chaque diapo devient la propriete
// bandeau de <Slide>, pour que le repere de section occupe la barre du haut
// plutot que le corps de la diapo.
import { readFileSync, writeFileSync } from 'node:fs';

const [, , fichier, droite] = process.argv;
let src = readFileSync(fichier, 'utf8');

// Chaque bloc <Slide ...> ... </Slide>
const blocs = [...src.matchAll(/<Slide\b([^>]*)>([\s\S]*?)<\/Slide>/g)];
let migrees = 0;

for (let i = blocs.length - 1; i >= 0; i--) {
  const [entier, attrs, corps] = blocs[i];
  if (/\bbandeau=/.test(attrs)) continue;

  const m = corps.match(/[ \t]*<p class="surtitre e">([\s\S]*?)<\/p>\n?/);
  const label = m ? m[1].replace(/\s+/g, ' ').trim() : '';
  const corpsNet = m ? corps.replace(m[0], '') : corps;

  const attrsNeufs =
    `${attrs}` +
    (label ? ` bandeau="${label.replace(/"/g, '&quot;')}"` : '') +
    (droite ? ` droite="${droite}"` : '');

  const remplacement = `<Slide${attrsNeufs}>${corpsNet}</Slide>`;
  src = src.slice(0, blocs[i].index) + remplacement + src.slice(blocs[i].index + entier.length);
  if (label) migrees++;
}

writeFileSync(fichier, src);
console.log(`${migrees} surtitre(s) déplacé(s) dans le bandeau — ${fichier}`);
