const express = require('express');
const {
  createTournament,
  participateTournament,
  getAllTournaments,
  getTournamentById,
} = require('../controllers/tournamentController');
const { authMiddleware } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.post('/create', authMiddleware, upload.single('image'),createTournament);

router.post('/participate', authMiddleware, participateTournament);

router.get('/', getAllTournaments);

router.get('/:id', getTournamentById);

module.exports = router;
