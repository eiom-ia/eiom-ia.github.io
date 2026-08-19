# Vérification de l'environnement — Parcours IA, EIOM 2026
# Usage, en une ligne dans R:
#   source("https://eiom-ia.github.io/verifier.R"); verifier_installation()

.VERSION_R_MIN <- "4.1.0"

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

# On ne montre jamais la clé elle-même, seulement sa longueur: ce rapport
# sera copié-collé dans des courriels de dépannage.
.statut_cle <- function(valeur = Sys.getenv("GEMINI_API_KEY", Sys.getenv("GOOGLE_API_KEY"))) {
  ok <- nzchar(trimws(valeur))
  list(
    controle = "Clé Google AI Studio",
    ok = ok,
    detail = if (ok) paste0("trouvée (", nchar(trimws(valeur)), " caractères)") else "introuvable",
    remede = if (ok) "" else paste(
      "R ne voit pas votre clé. Tapez usethis::edit_r_environ(), ajoutez la ligne",
      "GEMINI_API_KEY=votre_cle puis REDÉMARREZ R. La clé ne doit jamais être écrite",
      "dans un script ni versionnée dans Git."
    )
  )
}

.statut_appel <- function(modele) {
  if (!requireNamespace("ellmer", quietly = TRUE)) {
    return(list(controle = "Appel réel au modèle", ok = FALSE, detail = "ellmer absent",
                remede = "Réglez d'abord le contrôle précédent."))
  }
  res <- tryCatch({
    chat <- ellmer::chat_google_gemini(model = modele, echo = "none")
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

verifier_installation <- function(modele = "gemini-3.5-flash", appel_reel = TRUE) {
  controles <- list(.statut_r(), .statut_paquet("ellmer"), .statut_cle())
  if (appel_reel) controles <- c(controles, list(.statut_appel(modele)))

  cat("\n== Vérification de l'environnement — Parcours IA, EIOM 2026 ==\n\n")
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
