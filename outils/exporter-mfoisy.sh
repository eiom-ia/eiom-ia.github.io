#!/bin/bash
# Reexporte un deck vers le site personnel, qui en heberge une copie
# autonome. A relancer apres toute modification du deck, sinon les deux
# copies divergent en silence.
#
# Le tableau ci-dessous est le seul endroit ou un deck est declare. Deux
# scripts pour deux decks, c'est precisement la divergence que cet en-tete
# met en garde: le second finit par ne plus etre relance.
#
# Usage: ./outils/exporter-mfoisy.sh [deck] [chemin-du-site]
#   ./outils/exporter-mfoisy.sh                 # seance-1, par defaut
#   ./outils/exporter-mfoisy.sh ia-agentique
set -euo pipefail

DECK="${1:-seance-1}"
SITE="${2:-$HOME/Projects/laurenceomfoisy.github.io}"
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# deck -> dossier publie, titre de la page-relais, libelle du lien
case "$DECK" in
  seance-1)
    DOSSIER="presentation_eiom_2026"
    TITRE="L'IA en recherche — EIOM 2026"
    LIBELLE="L'IA en recherche — parcours IA, EIOM 2026"
    ;;
  ia-agentique)
    DOSSIER="presentation_ia_agentique"
    TITRE="L'IA agentique"
    LIBELLE="L'IA agentique — faire accomplir des actions à un modèle de langue"
    ;;
  *)
    echo "deck inconnu: $DECK (attendus: seance-1, ia-agentique)" >&2
    exit 1
    ;;
esac

DEST="$SITE/$DOSSIER"

[ -d "$SRC/build/diapos/$DECK" ] || { echo "build absent — lancer npm run build" >&2; exit 1; }
[ -d "$SITE" ] || { echo "site introuvable: $SITE" >&2; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST/diapos/$DECK"
cp -r "$SRC/build/_app" "$DEST/_app"
cp -r "$SRC/build/img" "$DEST/img"
cp "$SRC/build/diapos/$DECK/index.html" "$DEST/diapos/$DECK/index.html"

# La structure diapos/ est conservee: la disposition du site masque sa barre
# de navigation en reperant « /diapos » dans le chemin. Aplatir la ferait
# reapparaitre avec des liens morts.
cat > "$DEST/index.html" <<HTML
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>$TITRE</title>
    <link rel="canonical" href="https://www.mfoisy.com/$DOSSIER/diapos/$DECK/" />
    <meta http-equiv="refresh" content="0; url=diapos/$DECK/" />
  </head>
  <body><p><a href="diapos/$DECK/">$LIBELLE</a></p></body>
</html>
HTML

# grep -c compte les lignes, or tout le HTML tient sur une seule: on compte
# les occurrences.
N=$(grep -o 'aria-label="Aller à la diapo ' "$DEST/diapos/$DECK/index.html" | wc -l)
echo "exporté vers $DEST"
echo "  $(du -sh "$DEST" | cut -f1) · $N diapositives annoncées"
