# Séance 4 — Un outil R borné et journalisé

if (!requireNamespace("ellmer", quietly = TRUE)) {
  stop('Installez ellmer avec install.packages("ellmer").', call. = FALSE)
}
if (!requireNamespace("jsonlite", quietly = TRUE)) {
  stop('Installez jsonlite avec install.packages("jsonlite").', call. = FALSE)
}

source(if (file.exists("eiom.R")) "eiom.R" else "https://eiom-ia.github.io/eiom.R")

source_donnees <- if (file.exists(file.path("materiel", "donnees", "avis_exemple.csv"))) {
  file.path("materiel", "donnees", "avis_exemple.csv")
} else {
  "https://eiom-ia.github.io/materiel/donnees/avis_exemple.csv"
}
donnees <- utils::read.csv(source_donnees, encoding = "UTF-8", stringsAsFactors = FALSE)
dir.create("sorties", showWarnings = FALSE, recursive = TRUE)

journaliser <- function(outil, arguments, resultat) {
  ligne <- list(
    horodatage = format(Sys.time(), "%Y-%m-%dT%H:%M:%S%z"),
    outil = outil,
    arguments = arguments,
    resultat = resultat
  )
  cat(
    jsonlite::toJSON(ligne, auto_unbox = TRUE, null = "null"),
    "\n",
    file = file.path("sorties", "journal_agent.ndjson"),
    append = TRUE
  )
}

compter_avis <- ellmer::tool(
  function(note_min = 1L, note_max = 5L) {
    stopifnot(note_min >= 1L, note_max <= 5L, note_min <= note_max)
    resultat <- sum(donnees$review_rating >= note_min & donnees$review_rating <= note_max)
    journaliser("compter_avis", list(note_min = note_min, note_max = note_max), resultat)
    resultat
  },
  name = "compter_avis",
  description = "Compte les avis dont la note est dans un intervalle fermé de 1 à 5.",
  arguments = list(
    note_min = ellmer::type_integer("Note minimale, de 1 à 5"),
    note_max = ellmer::type_integer("Note maximale, de 1 à 5")
  )
)

chat <- creer_chat_eiom(
  system_prompt = paste(
    "Tu réponds seulement aux questions que l'outil permet de vérifier.",
    "Tu n'inventes jamais un résultat et tu t'arrêtes après un appel d'outil."
  )
)
chat$register_tool(compter_avis)
chat$chat("Combien d'avis ont 2 étoiles ou moins ?")
