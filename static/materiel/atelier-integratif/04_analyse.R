# 04 — Produire une figure lisible et inspecter les désaccords

fichier <- file.path("sorties", "validation.csv")
if (!file.exists(fichier)) stop("Exécutez d'abord 03_validation.R.", call. = FALSE)
validation <- utils::read.csv(fichier, encoding = "UTF-8", stringsAsFactors = FALSE)
complets <- !is.na(validation$note_predite)

grDevices::png(file.path("sorties", "accord.png"), width = 1200, height = 900, res = 150)
graphics::plot(
  jitter(validation$review_rating[complets], amount = 0.08),
  jitter(validation$note_predite[complets], amount = 0.08),
  xlim = c(0.8, 5.2), ylim = c(0.8, 5.2), pch = 19,
  xlab = "Note de référence", ylab = "Note prédite",
  main = "Accord entre la référence et la mesure par LLM"
)
graphics::abline(0, 1, lty = 2, col = "#c0392b")
grDevices::dev.off()

desaccords <- validation[complets & validation$review_rating != validation$note_predite, ]
utils::write.csv(desaccords, file.path("sorties", "desaccords.csv"), row.names = FALSE, fileEncoding = "UTF-8")
message("PASSAGE 4/5 — accord.png et desaccords.csv produits")
