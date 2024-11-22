const express = require('express');
const { createTournament, participateTournament } = require('../controllers/tournamentController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createTournament); // Seul un admin peut créer un tournoi
router.post('/:id_tournament/participate', authMiddleware, participateTournament); // Participer à un tournoi

module.exports = router;
