const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { body } = require('express-validator'); // Pour la validation des champs

const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 8 }).withMessage('Le mot de passe doit comporter au moins 8 caractères')
], registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

module.exports = router;
