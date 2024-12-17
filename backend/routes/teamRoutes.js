const express = require('express');
const { createTeam, joinTeam, deleteTeam, updateTeam, getUserTeams } = require('../controllers/teamController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { rateLimiter } = require("../middleware/rateLimitMiddleware.js");
const { csrfProtection } = require("../middleware/csrfMiddleware");

const router = express.Router();

// Créer une équipe
router.post('/create', authMiddleware, rateLimiter, csrfProtection, createTeam);

// Rejoindre une équipe
router.post('/join', authMiddleware, rateLimiter, csrfProtection, joinTeam);

// Supprimer une équipe
router.delete('/:id', authMiddleware, rateLimiter, csrfProtection, deleteTeam);

// Mettre à jour une équipe
router.put('/:id', authMiddleware, rateLimiter, csrfProtection, updateTeam);

// Récupérer les équipes de l'utilisateur connecté
router.get('/user/:userId/created', authMiddleware, rateLimiter, getUserTeams);
router.get('/user/:userId/joined', authMiddleware, rateLimiter, getUserTeams);


module.exports = router;
