const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateUser} = require('../middlewares/authMiddleware');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/my-matches', authenticateUser, userController.getUserMatches);
router.get('/my-participations', authenticateUser, userController.getUserParticipations);
router.get('/create-match', authenticateUser, userController.createUserMatch);


module.exports = router;
