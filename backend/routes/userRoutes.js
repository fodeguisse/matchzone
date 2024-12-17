const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { validateUserRegistration } = require("../middleware/validationMiddleware");
const { validationResult } = require("express-validator");
const { authMiddleware } = require("../middleware/authMiddleware");
const { csrfProtection } = require("../middleware/csrfMiddleware");
const router = express.Router();

router.post(
  "/register",
  validateUserRegistration,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

router.post("/login", loginUser);

router.post("/logout", authMiddleware, csrfProtection, logoutUser);

router.put("/update", authMiddleware, csrfProtection, updateUser);

router.delete("/delete", authMiddleware, csrfProtection, deleteUser);

module.exports = router;
