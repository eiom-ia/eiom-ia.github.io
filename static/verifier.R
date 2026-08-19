# Vérification de l'environnement — Parcours IA, EIOM 2026
# Usage, en une ligne dans R:
#   source("https://eiom-ia.github.io/verifier.R"); verifier_installation()

.VERSION_R_MIN <- "4.1.0"

.fournisseurs <- list(
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

.choisir_fournisseur <- function(fournisseur = c("auto", "gemini", "openrouter")) {
  fournisseur <- match.arg(fournisseur)
  preference <- tolower(trimws(Sys.getenv("EIOM_FOURNISSEUR", "auto")))
  if (fournisseur == "auto" && preference %in% names(.fournisseurs)) fournisseur <- preference
  if (fournisseur != "auto") return(fournisseur)

  a_une_cle <- function(nom) {
    any(nzchar(trimws(Sys.getenv(.fournisseurs[[nom]]$variables))))
  }
  if (a_une_cle("gemini")) return("gemini")
  if (a_une_cle("openrouter")) return("openrouter")
  "gemini"
}

.statut_r <- function(version = as.character(getRversion())) {
  ok <- utils::compareVersion(version, .VERSION_R_MIN) >= 0
  list(
    controle = "Version de R",
    ok = ok,
    detail = version,
    remede = if (ok) "" else paste0(
      "Votre version de R est trop ancienne (il faut au moins ", .VERSION_R_MIN,
      "). Installez la version courante depuis https://cran.r-project.org puis redémarrez."
    )
  )
}

.statut_paquet <- function(nom, installe = requireNamespace(nom, quietly = TRUE)) {
  list(
    controle = paste("Paquet", nom),
    ok = installe,
    detail = if (installe) as.character(utils::packageVersion(nom)) else "absent",
    remede = if (installe) "" else paste0(
      'Le paquet est absent. Tapez: install.packages("', nom, '")'
    )
  )
}

.statut_commande <- function(nom, chemin = Sys.which(nom), remede = "") {
  ok <- nzchar(unname(chemin))
  list(
    controle = paste("Commande", nom),
    ok = ok,
    detail = if (ok) unname(chemin) else "introuvable",
    remede = if (ok) "" else remede
  )
}

# On ne montre jamais la clé elle-même, seulement sa longueur: ce rapport
# sera copié-collé dans des courriels de dépannage.
.statut_cle <- function(fournisseur = "gemini", valeur = NULL) {
  config <- .fournisseurs[[fournisseur]]
  if (is.null(valeur)) {
    valeurs <- Sys.getenv(config$variables)
    valeur <- valeurs[which(nzchar(trimws(valeurs)))[1]]
    if (length(valeur) == 0 || is.na(valeur)) valeur <- ""
  }
  ok <- nzchar(trimws(valeur))
  list(
    controle = paste("Clé", config$nom),
    ok = ok,
    detail = if (ok) paste0("trouvée (", nchar(trimws(valeur)), " caractères)") else "introuvable",
    remede = if (ok) "" else paste(
      "R ne voit pas votre clé. Tapez usethis::edit_r_environ(), ajoutez la ligne",
      paste0(config$variables[1], "=votre_cle"), "puis REDÉMARREZ R. La clé ne doit jamais être écrite",
      "dans un script ni versionnée dans Git."
    )
  )
}

.statut_appel <- function(fournisseur, modele) {
  if (!requireNamespace("ellmer", quietly = TRUE)) {
    return(list(controle = "Appel réel au modèle", ok = FALSE, detail = "ellmer absent",
                remede = "Réglez d'abord le contrôle précédent."))
  }
  res <- tryCatch({
    chat <- switch(
      fournisseur,
      gemini = ellmer::chat_google_gemini(model = modele, echo = "none"),
      openrouter = ellmer::chat_openrouter(model = modele, echo = "none")
    )
    r <- chat$chat("Réponds uniquement par le mot: pret")
    list(ok = TRUE, detail = trimws(substr(r, 1, 40)))
  }, error = function(e) list(ok = FALSE, detail = conditionMessage(e)))

  list(
    controle = "Appel réel au modèle",
    ok = res$ok,
    detail = res$detail,
    remede = if (res$ok) "" else paste(
      "L'appel a échoué. Vérifiez votre connexion, que la clé est valide, et que le",
      "modèle", modele, "est bien offert au palier gratuit. Écrivez-nous si le blocage persiste."
    )
  )
}

.formater_ligne <- function(s) {
  marque <- if (isTRUE(s$ok)) "[ OK   ]" else "[ ÉCHEC]"
  sprintf("%s %-28s %s", marque, s$controle, s$detail)
}

verifier_installation <- function(
  fournisseur = c("auto", "gemini", "openrouter"),
  modele = NULL,
  appel_reel = TRUE
) {
  fournisseur <- .choisir_fournisseur(fournisseur)
  config <- .fournisseurs[[fournisseur]]
  if (is.null(modele)) modele <- config$modele

  controles <- list(
    .statut_r(),
    .statut_paquet("ellmer"),
    .statut_paquet("jsonlite"),
    .statut_cle(fournisseur)
  )
  if (appel_reel) controles <- c(controles, list(.statut_appel(fournisseur, modele)))

  cat("\n== Vérification de l'environnement — Parcours IA, EIOM 2026 ==\n\n")
  cat("Fournisseur:", config$nom, "· Modèle:", modele, "\n\n")
  for (s in controles) cat(.formater_ligne(s), "\n")

  echecs <- Filter(function(s) !isTRUE(s$ok), controles)
  if (length(echecs) == 0) {
    cat("\nTout est en place. Vous êtes prêt·e pour lundi matin.\n\n")
  } else {
    cat("\n--- À corriger ---\n")
    for (s in echecs) cat("\n*", s$controle, ":\n  ", s$remede, "\n")
    cat("\nToujours bloqué·e? Écrivez-nous avant lundi, on règle ça ensemble.\n\n")
  }

  invisible(data.frame(
    controle = vapply(controles, `[[`, "", "controle"),
    ok       = vapply(controles, function(s) isTRUE(s$ok), TRUE),
    detail   = vapply(controles, `[[`, "", "detail"),
    remede   = vapply(controles, `[[`, "", "remede"),
    stringsAsFactors = FALSE
  ))
}

verifier_agentique <- function() {
  controles <- list(
    .statut_commande(
      "node",
      remede = "Installez la version LTS depuis https://nodejs.org puis redémarrez le terminal."
    ),
    .statut_commande(
      "opencode",
      remede = "Après Node, tapez dans un terminal: npm install -g opencode-ai"
    )
  )

  cat("\n== Prévol de la séance agentique — EIOM 2026 ==\n\n")
  for (s in controles) cat(.formater_ligne(s), "\n")
  echecs <- Filter(function(s) !isTRUE(s$ok), controles)
  if (length(echecs)) {
    cat("\n--- À corriger avant jeudi ---\n")
    for (s in echecs) cat("\n*", s$controle, ":\n  ", s$remede, "\n")
  } else {
    cat("\nLe bac à sable agentique peut être lancé avec la commande opencode.\n\n")
  }
  invisible(data.frame(
    controle = vapply(controles, `[[`, "", "controle"),
    ok = vapply(controles, function(s) isTRUE(s$ok), TRUE),
    detail = vapply(controles, `[[`, "", "detail"),
    remede = vapply(controles, `[[`, "", "remede"),
    stringsAsFactors = FALSE
  ))
}
