#!/bin/bash
# Reexporte la seance 1 vers le site personnel, qui en heberge une copie
# autonome. A relancer apres toute modification du deck, sinon les deux
# copies divergent en silence.
#
# Usage: ./outils/exporter-mfoisy.sh [chemin-du-site]
set -euo pipefail

SITE="${1:-$HOME/Projects/laurenceomfoisy.github.io}"
DEST="$SITE/presentation_eiom_2026"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

[ -d "$SRC/build/diapos/seance-1" ] || { echo "build absent — lancer npm run build" >&2; exit 1; }
[ -d "$SITE" ] || { echo "site introuvable: $SITE" >&2; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST/diapos/seance-1"
cp -r "$SRC/build/_app" "$DEST/_app"
cp -r "$SRC/build/img" "$DEST/img"
cp "$SRC/build/diapos/seance-1/index.html" "$DEST/diapos/seance-1/index.html"

# La structure diapos/ est conservee: la disposition du site masque sa barre
# de navigation en reperant « /diapos » dans le chemin. Aplatir la ferait
# reapparaitre avec des liens morts.
cat > "$DEST/index.html" <<'HTML'
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>L'IA en recherche — EIOM 2026</title>
    <link rel="canonical" href="https://www.mfoisy.com/presentation_eiom_2026/diapos/seance-1/" />
    <meta http-equiv="refresh" content="0; url=diapos/seance-1/" />
  </head>
  <body><p><a href="diapos/seance-1/">L'IA en recherche — parcours IA, EIOM 2026</a></p></body>
</html>
HTML

# grep -c compte les lignes, or tout le HTML tient sur une seule: on compte
# les occurrences.
N=$(grep -o 'aria-label="Aller à la diapo ' "$DEST/diapos/seance-1/index.html" | wc -l)
echo "exporté vers $DEST"
echo "  $(du -sh "$DEST" | cut -f1) · $N diapositives annoncées"
