source("../../static/verifier.R")

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
  expect_true(.statut_paquet("ellmer", installe = TRUE)$ok)
})

test_that(".statut_cle refuse une clé vide", {
  expect_false(.statut_cle("")$ok)
})

test_that(".statut_cle refuse une clé faite d'espaces", {
  expect_false(.statut_cle("   ")$ok)
})

test_that(".statut_cle accepte une clé plausible", {
  expect_true(.statut_cle("AIzaSyDetteCleEstFactice1234567890abcd")$ok)
})

test_that(".statut_cle ne divulgue jamais la clé dans son détail", {
  cle <- "AIzaSyDetteCleEstFactice1234567890abcd"
  s <- .statut_cle(cle)
  expect_false(grepl(cle, paste(s$detail, s$remede), fixed = TRUE))
})

test_that(".formater_ligne marque visuellement le succès et l'échec", {
  expect_match(.formater_ligne(list(controle = "R", ok = TRUE,  detail = "4.6.1", remede = "")), "OK")
  expect_match(.formater_ligne(list(controle = "R", ok = FALSE, detail = "3.6.0", remede = "x")), "ÉCHEC")
})
