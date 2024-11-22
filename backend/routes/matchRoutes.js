const express = require('express');
const { createMatch, participateMatch } = require('../controllers/matchController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createMatch); // Créer un match (seulement pour l'utilisateur connecté)
router.post('/:id_match/participate', authMiddleware, participateMatch); // Participer à un match

module.exports = router;
