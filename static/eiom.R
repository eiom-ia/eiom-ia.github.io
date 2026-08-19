# Outils partagés — Parcours IA, EIOM 2026
# Usage:
#   source("https://eiom-ia.github.io/eiom.R")
#   chat <- creer_chat_eiom()

.EIOM_FOURNISSEURS <- list(
  gemini = list(
    nom = "Google AI Studio",
    variables = c("GEMINI_API_KEY", "GOOGLE_API_KEY"),
    modele = "gemini-3.5-flash"
  ),
  openrouter = list(
    nom = "OpenRouter",
    variables = "OPENROUTER_API_KEY",
    modele = "google/gemini-3.5-flash-lite"
  )
)

fournisseur_eiom <- function(
  preference = Sys.getenv("EIOM_FOURNISSEUR", "auto"),
  exiger_cle = TRUE
) {
  choix <- tolower(trimws(preference))
  if (!choix %in% c("auto", names(.EIOM_FOURNISSEURS))) {
    stop("EIOM_FOURNISSEUR doit valoir auto, gemini ou openrouter.", call. = FALSE)
  }

  a_une_cle <- function(nom) {
    variables <- .EIOM_FOURNISSEURS[[nom]]$variables
    any(nzchar(trimws(Sys.getenv(variables))))
  }

  if (choix == "auto") {
    disponibles <- names(.EIOM_FOURNISSEURS)[vapply(
      names(.EIOM_FOURNISSEURS), a_une_cle, logical(1)
    )]
    if (length(disponibles)) choix <- disponibles[1]
  }

  if (choix == "auto" || (exiger_cle && !a_une_cle(choix))) {
    stop(
      paste(
        "Aucune clé reconnue. Ajoutez GEMINI_API_KEY ou OPENROUTER_API_KEY",
        "dans .Renviron, puis redémarrez R."
      ),
      call. = FALSE
    )
  }
  choix
}

modele_eiom <- function(fournisseur = fournisseur_eiom()) {
  variable <- paste0("EIOM_MODELE_", toupper(fournisseur))
  Sys.getenv(variable, .EIOM_FOURNISSEURS[[fournisseur]]$modele)
}

creer_chat_eiom <- function(
  system_prompt = NULL,
  fournisseur = fournisseur_eiom(),
  modele = modele_eiom(fournisseur),
  temperature = 0,
  echo = "none"
) {
  if (!requireNamespace("ellmer", quietly = TRUE)) {
    stop('Installez ellmer avec install.packages("ellmer").', call. = FALSE)
  }
  arguments <- list(
    system_prompt = system_prompt,
    model = modele,
    params = ellmer::params(temperature = temperature),
    echo = echo
  )
  do.call(
    switch(
      fournisseur,
      gemini = ellmer::chat_google_gemini,
      openrouter = ellmer::chat_openrouter
    ),
    arguments
  )
}

journal_eiom <- function(fournisseur = fournisseur_eiom(), modele = modele_eiom(fournisseur)) {
  list(
    fournisseur = fournisseur,
    modele = modele,
    horodatage = format(Sys.time(), "%Y-%m-%dT%H:%M:%S%z"),
    R = as.character(getRversion()),
    ellmer = as.character(utils::packageVersion("ellmer"))
  )
}
