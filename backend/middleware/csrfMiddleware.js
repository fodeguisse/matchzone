const csrf = require("csurf");

// Middleware CSRF pour sécuriser les requêtes
const csrfProtection = csrf({
  cookie: {
    httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
    secure: process.env.NODE_ENV === "production", // Assure que les cookies sont sécurisés en production
    sameSite: "Strict", // Empêche les requêtes cross-site d'utiliser le cookie
    maxAge: 60 * 60 * 1000, // Durée de validité : 1 heure
  },
});

module.exports = { csrfProtection };
