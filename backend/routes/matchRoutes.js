const express = require('express');
const {
  createMatch,
  joinMatch,
  getAllMatches,
  getMatchById,
  getMatchesCreatedByUser,
  getMatchesJoinedByUser,
  updateMatch,
  deleteMatch,
} = require('../controllers/matchController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { rateLimiter } = require("../middleware/rateLimitMiddleware");
const { csrfProtection } = require("../middleware/csrfMiddleware");
const { validateUserRegistration } = require("../middleware/validationMiddleware");
const { validateMatchCreation } = require('../middleware/validationMiddleware');
const upload = require("../middleware/multerMiddleware");

const router = express.Router();

// Middleware commun pour les routes protégées
const matchMiddleware = [authMiddleware, rateLimiter, csrfProtection];  // csurf est déjà ici

// Middleware pour valider les fichiers image
const checkImage = (req, res, next) => {
  if (req.file && !['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
    return res.status(400).json({ message: 'Format d’image non valide.' });
  }
  next();
};

// Routes protégées
router.post(
  '/create',
  ...matchMiddleware,
  upload.single('image'),
  checkImage,
  validateMatchCreation,
  validateUserRegistration,
  createMatch
);

router.post('/join', ...matchMiddleware, joinMatch); 

router.put(
  '/:id',
  ...matchMiddleware,
  upload.single('image'),
  checkImage,
  validateUserRegistration,
  updateMatch
);

router.delete('/:id', ...matchMiddleware, deleteMatch);

// Routes publiques
router.get('/', rateLimiter, getAllMatches);
router.get('/:id', rateLimiter, getMatchById);
router.get('/user/:userId/created', authMiddleware, rateLimiter, getMatchesCreatedByUser);
router.get('/user/:userId/joined', authMiddleware, rateLimiter, getMatchesJoinedByUser);

module.exports = router;
