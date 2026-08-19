# 03 — Valider la mesure contre la référence

entrees <- file.path("sorties", c("corpus.rds", "seance1_notes.json"))
if (!all(file.exists(entrees))) stop("Exécutez d'abord 01_donnees.R et 02_mesure.R.", call. = FALSE)
if (!requireNamespace("jsonlite", quietly = TRUE)) stop("Le paquet jsonlite est requis.", call. = FALSE)

donnees <- readRDS(entrees[1])
document <- jsonlite::read_json(entrees[2], simplifyVector = FALSE)

extraire <- function(x) {
  note <- x$prediction$note
  data.frame(
    id = as.character(x$id),
    note_predite = if (is.null(note)) NA_integer_ else as.integer(note),
    valide = isTRUE(x$valide),
    erreur = if (is.null(x$erreur)) NA_character_ else as.character(x$erreur),
    stringsAsFactors = FALSE
  )
}
predictions <- do.call(rbind, lapply(document$sorties, extraire))
validation <- merge(donnees, predictions, by = "id", all.x = TRUE, sort = FALSE)

if (anyDuplicated(predictions$id)) stop("Une prédiction apparaît plus d'une fois.", call. = FALSE)
if (any(!is.na(validation$note_predite) & !validation$note_predite %in% 1:5)) {
  stop("Une prédiction est hors de l'échelle 1–5.", call. = FALSE)
}

complets <- !is.na(validation$note_predite)
resume <- data.frame(
  metrique = c("n attendu", "n prédit", "exactitude", "erreur absolue moyenne"),
  valeur = c(
    nrow(validation),
    sum(complets),
    mean(validation$note_predite[complets] == validation$review_rating[complets]),
    mean(abs(validation$note_predite[complets] - validation$review_rating[complets]))
  )
)

utils::write.csv(validation, file.path("sorties", "validation.csv"), row.names = FALSE, fileEncoding = "UTF-8")
utils::write.csv(resume, file.path("sorties", "metriques.csv"), row.names = FALSE, fileEncoding = "UTF-8")
message("PASSAGE 3/5 — validation.csv et metriques.csv produits")
