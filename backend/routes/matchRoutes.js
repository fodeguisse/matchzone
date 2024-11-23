const express = require('express');
const { createMatch, participateMatch, getAllMatches, getMatchById } = require('../controllers/matchController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createMatch); // Créer un match (seulement pour l'utilisateur connecté)
router.post('/:id_match/participate', authMiddleware, participateMatch);
router.get('/', getAllMatches);
router.get('/:id_match', getMatchById); 

module.exports = router;
