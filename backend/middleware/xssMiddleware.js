const xssClean = require("xss-clean");

// Middleware pour protéger contre les attaques XSS
const xssProtection = xssClean();

module.exports = { xssProtection };
