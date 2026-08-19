# Test de bout en bout sans réseau ni fournisseur de modèles

racine <- normalizePath(".")
bac <- tempfile("eiom-secours-")
dir.create(bac, recursive = TRUE)
on.exit(unlink(bac, recursive = TRUE, force = TRUE), add = TRUE)

file.copy(file.path(racine, "static", "eiom.R"), bac)
file.copy(
  file.path(racine, "static", "materiel"),
  bac,
  recursive = TRUE,
  copy.mode = TRUE
)

ancien <- getwd()
on.exit(setwd(ancien), add = TRUE)
setwd(bac)
Sys.setenv(EIOM_MODE = "secours")

source(file.path("materiel", "01_mesurer.R"))
stopifnot(file.exists(file.path("sorties", "seance1_notes.json")))

setwd(file.path(bac, "materiel", "atelier-integratif"))
source("01_donnees.R")
source("02_mesure.R")
source("03_validation.R")
source("04_analyse.R")
source("verifier_atelier.R")

stopifnot(file.exists(file.path("sorties", "accord.png")))
stopifnot(nrow(utils::read.csv(file.path("sorties", "metriques.csv"))) == 4)
