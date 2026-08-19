# 02 — Produire ou charger une mesure structurée

if (!file.exists(file.path("sorties", "corpus.rds"))) {
  stop("Exécutez d'abord 01_donnees.R.", call. = FALSE)
}
if (!requireNamespace("jsonlite", quietly = TRUE)) {
  stop('Installez jsonlite avec install.packages("jsonlite").', call. = FALSE)
}

cles <- c(Sys.getenv("GEMINI_API_KEY"), Sys.getenv("GOOGLE_API_KEY"), Sys.getenv("OPENROUTER_API_KEY"))
mode <- tolower(Sys.getenv("EIOM_MODE", "auto"))
if (mode == "auto") mode <- if (any(nzchar(trimws(cles)))) "api" else "secours"

if (mode == "api") {
  script <- if (file.exists(file.path("..", "01_mesurer.R"))) {
    file.path("..", "01_mesurer.R")
  } else {
    "https://eiom-ia.github.io/materiel/01_mesurer.R"
  }
  source(script, local = new.env(parent = globalenv()))
} else {
  source_secours <- if (file.exists(file.path("..", "sorties", "seance1_notes_exemple.json"))) {
    file.path("..", "sorties", "seance1_notes_exemple.json")
  } else {
    "https://eiom-ia.github.io/materiel/sorties/seance1_notes_exemple.json"
  }
  x <- jsonlite::read_json(source_secours, simplifyVector = FALSE)
  x$journal$copiee_le <- format(Sys.time(), "%Y-%m-%dT%H:%M:%S%z")
  jsonlite::write_json(
    x,
    file.path("sorties", "seance1_notes.json"),
    auto_unbox = TRUE,
    pretty = TRUE,
    null = "null"
  )
}

if (!file.exists(file.path("sorties", "seance1_notes.json"))) {
  stop("La mesure n'a pas produit sorties/seance1_notes.json.", call. = FALSE)
}
message("PASSAGE 2/5 — seance1_notes.json existe et porte un journal")
