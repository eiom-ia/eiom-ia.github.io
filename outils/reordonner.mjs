// Réordonne les <Slide> d'un deck selon une liste de repères.
// Chaque repère est une sous-chaîne unique identifiant la diapositive.
import { readFileSync, writeFileSync } from 'node:fs';

const [, , fichier, listeJson] = process.argv;
const ordre = JSON.parse(readFileSync(listeJson, 'utf8'));
let src = readFileSync(fichier, 'utf8');

// Découpe: en-tête <script>…</script> + <svelte:head> + ouverture, puis les Slides
const debut = src.indexOf('{#snippet children()}');
const finSnip = src.lastIndexOf('{/snippet}');
const tete = src.slice(0, debut + '{#snippet children()}'.length);
const queue = src.slice(finSnip);
const corps = src.slice(debut + '{#snippet children()}'.length, finSnip);

const blocs = [];
const re = /<Slide\b[\s\S]*?<\/Slide>/g;
let m;
while ((m = re.exec(corps)) !== null) blocs.push(m[0]);

const utilises = new Set();
const sortie = [];
const manquants = [];

for (const rep of ordre) {
  if (rep.startsWith('__')) { sortie.push(rep); continue; } // marqueur de section neuve
  const i = blocs.findIndex((b, k) => !utilises.has(k) && b.includes(rep));
  if (i === -1) { manquants.push(rep); continue; }
  utilises.add(i);
  sortie.push(blocs[i]);
}

const orphelins = blocs.map((b, k) => k).filter((k) => !utilises.has(k));

console.log(`${sortie.filter((s) => !s.startsWith('__')).length} diapositives replacées`);
if (manquants.length) console.log('REPÈRES INTROUVABLES:\n  ' + manquants.join('\n  '));
if (orphelins.length) {
  console.log(`${orphelins.length} diapositive(s) non replacée(s) — elles seront retirées:`);
  for (const k of orphelins) {
    const t = blocs[k].match(/<h[12] class="e">([\s\S]*?)<\/h[12]>/);
    console.log('  · ' + (t ? t[1].replace(/<[^>]*>/g, ' ').trim().slice(0, 56) : blocs[k].slice(0, 60)));
  }
}
if (manquants.length) { console.log('\nAucune écriture: corrigez les repères.'); process.exit(1); }

const neuf = tete + '\n\n    ' + sortie.join('\n\n    ') + '\n\n  ' + queue;
writeFileSync(fichier, neuf);
console.log('écrit.');
