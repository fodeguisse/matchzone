const express = require('express');
const { createMatch, joinMatch, getAllMatches, getMatchById } = require('../controllers/matchController');
const { authMiddleware } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.post('/create', authMiddleware, upload.single('image'), createMatch);

router.post('/join', authMiddleware, joinMatch);

router.get('/', getAllMatches);

router.get('/:id', getMatchById);

module.exports = router;
