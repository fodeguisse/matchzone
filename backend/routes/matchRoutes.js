const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController')

router.get('/matches', matchController.getAllMatches);
router.get('/matches/:id', matchController.getAllMatchById);
router.post('/matches', matchController.createMatch);

module.exports = router;
