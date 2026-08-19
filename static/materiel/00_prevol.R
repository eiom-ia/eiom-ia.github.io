# Prévol du parcours IA

url_verificateur <- "https://eiom-ia.github.io/verifier.R"
fichier_local <- "verifier.R"

if (file.exists(fichier_local)) {
  source(fichier_local)
} else {
  source(url_verificateur)
}

verifier_installation()
