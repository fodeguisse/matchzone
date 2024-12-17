const rateLimit = require("express-rate-limit");

// Middleware de limitation des requêtes
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Nombre maximal de requêtes
  message: "Trop de requêtes, veuillez réessayer plus tard.",
});

module.exports = { rateLimiter };
