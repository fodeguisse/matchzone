const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../middleware/validationMiddleware');
const { validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateUserRegistration, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, registerUser);

router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;
