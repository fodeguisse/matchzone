const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/sequelize");

// Import des routes
const userRoutes = require("./routes/userRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const matchRoutes = require("./routes/matchRoutes");
const searchRoutes = require("./routes/searchRoutes");
const teamRoutes = require("./routes/teamRoutes"); // Import des routes d'équipes

// Import des middlewares
const { csrfProtection } = require("./middleware/csrfMiddleware");
const { multerErrorHandler, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// Servir les fichiers statiques du dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration générale
app.set("trust proxy", 1);  // Permet la gestion des cookies derrière un proxy (utile pour les environnements de production)
app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true // Permet l'envoi de cookies avec les requêtes CORS
}));

// Middleware global
app.use(cookieParser()); // Nécessaire pour gérer les cookies
app.use(express.json());  // Pour parser les requêtes JSON
app.use(express.urlencoded({ extended: true }));  // Pour parser les données de formulaires
app.use(helmet()); // Sécurisation avec Helmet

// Route pour fournir le token CSRF au frontend
app.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes protégées par CSRF
app.use("/api/users", csrfProtection, userRoutes);
app.use("/api/tournaments", csrfProtection, tournamentRoutes);
app.use("/api/matches", csrfProtection, matchRoutes);
app.use("/api/teams", csrfProtection, teamRoutes); // Intégration des routes d'équipes
app.use(csrfProtection, searchRoutes); // Appliquer CSRF à d'autres routes

// Gestion des erreurs spécifiques à Multer
app.use(multerErrorHandler);

// Gestion des erreurs générales
app.use(errorHandler);

// Gestion des erreurs CSRF
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    console.error("Erreur CSRF détectée :", err.message);
    return res.status(403).json({ message: "Token CSRF invalide ou manquant." });
  }
  next(err);
});

// Test de connexion à la base de données et démarrage du serveur
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
    app.listen(PORT, () => {
      console.log(`serveur à l'écoute sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

// Gestion des erreurs globales pour capturer les erreurs non gérées
app.use((err, req, res, next) => {
  console.error("Erreur interne du serveur:", err.stack || err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: "Une erreur est survenue sur le serveur.",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
