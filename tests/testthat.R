library(testthat)
dossier <- if (dir.exists(file.path("tests", "testthat"))) file.path("tests", "testthat") else "testthat"
test_dir(dossier)
