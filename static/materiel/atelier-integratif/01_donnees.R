# 01 — Préparer le corpus sans modifier les données brutes

url <- "https://eiom-ia.github.io/materiel/donnees/avis_exemple.csv"
chemins <- c(
  file.path("..", "donnees", "avis_exemple.csv"),
  file.path("materiel", "donnees", "avis_exemple.csv")
)
local <- chemins[file.exists(chemins)][1]
source_donnees <- if (length(local) && !is.na(local)) local else url

donnees <- utils::read.csv(source_donnees, encoding = "UTF-8", stringsAsFactors = FALSE)
colonnes <- c("id", "review_text", "review_rating")
if (!all(colonnes %in% names(donnees))) {
  stop("Le corpus doit contenir: ", paste(colonnes, collapse = ", "), call. = FALSE)
}
if (anyDuplicated(donnees$id)) stop("Les identifiants ne sont pas uniques.", call. = FALSE)
if (any(!donnees$review_rating %in% 1:5)) stop("Une note est hors de l'échelle 1–5.", call. = FALSE)

dir.create("sorties", showWarnings = FALSE, recursive = TRUE)
saveRDS(donnees, file.path("sorties", "corpus.rds"))
message("PASSAGE 1/5 — corpus.rds: ", nrow(donnees), " observations uniques")
