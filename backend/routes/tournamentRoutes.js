const express = require('express');
const {
  createTournament,
  participateTournament,
  getAllTournaments,
  getTournamentById,
  getTournamentsCreatedByUser,
  getTournamentsJoinedByUser,
  getTeamsByTournament,
  updateTournament,
  deleteTournament,
} = require('../controllers/tournamentController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { rateLimiter } = require("../middleware/rateLimitMiddleware.js");
const { csrfProtection } = require("../middleware/csrfMiddleware");
const { validateTournamentCreation } = require('../middleware/validationMiddleware');
const upload = require("../middleware/multerMiddleware");

const router = express.Router();

router.post(
  '/create',
  authMiddleware,
  rateLimiter,
  csrfProtection,
  upload.single('image'),
  validateTournamentCreation,
  createTournament
);

router.post(
  '/:id/participate',
  authMiddleware,
  rateLimiter,
  csrfProtection,
  participateTournament
);

router.put(
  '/:id',
  authMiddleware,
  rateLimiter,
  csrfProtection,
  upload.single('image'),
  updateTournament
);

router.delete(
  '/:id',
  authMiddleware,
  rateLimiter,
  csrfProtection,
  deleteTournament
);

// --- Routes publiques ---
router.get('/', rateLimiter, getAllTournaments);
router.get('/:id', rateLimiter, getTournamentById);

router.get(
  '/user/:userId/created',
  authMiddleware,
  rateLimiter,
  getTournamentsCreatedByUser
);

router.get(
  '/user/:userId/joined',
  authMiddleware,
  rateLimiter,
  getTournamentsJoinedByUser
);

router.get(
  '/:id/teams',
  rateLimiter,
  getTeamsByTournament
);

module.exports = router;
