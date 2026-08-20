racine <- if (file.exists(file.path("static", "verifier.R"))) "." else file.path("..", "..")
source(file.path(racine, "static", "verifier.R"))

test_that(".statut_r accepte une version suffisante", {
  s <- .statut_r("4.6.1")
  expect_true(s$ok)
})

test_that(".statut_r refuse une version trop ancienne et propose un remède", {
  s <- .statut_r("3.6.0")
  expect_false(s$ok)
  expect_true(nzchar(s$remede))
})

test_that(".statut_paquet signale un paquet absent avec la commande d'installation", {
  s <- .statut_paquet("ellmer", installe = FALSE)
  expect_false(s$ok)
  expect_match(s$remede, "install.packages", fixed = TRUE)
})

test_that(".statut_paquet accepte un paquet présent", {
  expect_true(.statut_paquet("testthat", installe = TRUE)$ok)
})

test_that(".statut_commande distingue une commande présente d'une commande absente", {
  expect_true(.statut_commande("node", chemin = "/usr/bin/node")$ok)
  expect_false(.statut_commande("node", chemin = "", remede = "installer")$ok)
})

test_that(".statut_cle refuse une clé vide", {
  expect_false(.statut_cle("gemini", "")$ok)
})

test_that(".statut_cle refuse une clé faite d'espaces", {
  expect_false(.statut_cle("gemini", "   ")$ok)
})

test_that(".statut_cle accepte une clé plausible", {
  expect_true(.statut_cle("gemini", "AIzaSyDetteCleEstFactice1234567890abcd")$ok)
})

test_that(".statut_cle ne divulgue jamais la clé dans son détail", {
  cle <- "AIzaSyDetteCleEstFactice1234567890abcd"
  s <- .statut_cle("gemini", cle)
  expect_false(grepl(cle, paste(s$detail, s$remede), fixed = TRUE))
})

test_that(".statut_cle prend aussi en charge OpenRouter", {
  s <- .statut_cle("openrouter", "sk-or-cle-factice")
  expect_true(s$ok)
  expect_match(s$controle, "OpenRouter")
})

test_that(".formater_ligne marque visuellement le succès et l'échec", {
  expect_match(.formater_ligne(list(controle = "R", ok = TRUE,  detail = "4.6.1", remede = "")), "OK")
  expect_match(.formater_ligne(list(controle = "R", ok = FALSE, detail = "3.6.0", remede = "x")), "ÉCHEC")
})

source(file.path(racine, "static", "eiom.R"))

test_that("fournisseur_eiom choisit Gemini avant OpenRouter en mode auto", {
  anciennes <- Sys.getenv(c("GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENROUTER_API_KEY"), unset = NA)
  on.exit({
    for (nom in names(anciennes)) {
      if (is.na(anciennes[[nom]])) Sys.unsetenv(nom) else do.call(Sys.setenv, setNames(list(anciennes[[nom]]), nom))
    }
  })
  Sys.setenv(GEMINI_API_KEY = "gemini-factice", OPENROUTER_API_KEY = "openrouter-factice")
  expect_equal(fournisseur_eiom("auto"), "gemini")
})

test_that("fournisseur_eiom refuse de continuer sans clé", {
  anciennes <- Sys.getenv(c("GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENROUTER_API_KEY"), unset = NA)
  on.exit({
    for (nom in names(anciennes)) {
      if (is.na(anciennes[[nom]])) Sys.unsetenv(nom) else do.call(Sys.setenv, setNames(list(anciennes[[nom]]), nom))
    }
  })
  Sys.unsetenv(c("GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENROUTER_API_KEY"))
  expect_error(fournisseur_eiom("auto"), "Aucune clé")
})
