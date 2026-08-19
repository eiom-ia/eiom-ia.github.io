# Vérification finale du capstone

attendus <- c(
  "question.md",
  file.path("sorties", "corpus.rds"),
  file.path("sorties", "seance1_notes.json"),
  file.path("sorties", "validation.csv"),
  file.path("sorties", "metriques.csv"),
  file.path("sorties", "accord.png"),
  file.path("sorties", "desaccords.csv"),
  "methods-card.md",
  "agents.md"
)

etat <- data.frame(fichier = attendus, existe = file.exists(attendus))
for (i in seq_len(nrow(etat))) {
  marque <- if (etat$existe[i]) "[ OK   ]" else "[ ÉCHEC]"
  cat(marque, etat$fichier[i], "\n")
}

if (all(etat$existe)) {
  cat("\nPASSAGE 5/5 — dossier de preuve complet.\n")
} else {
  stop("Le dossier est incomplet. Corrigez les lignes ÉCHEC.", call. = FALSE)
}
