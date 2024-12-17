const multer = require("multer");

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Fichier trop volumineux. Taille maximale : 5 Mo." });
    }
    return res.status(400).json({ message: "Erreur lors de l'upload du fichier", error: err.message });
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur.",
  });
};

module.exports = { multerErrorHandler, errorHandler };
