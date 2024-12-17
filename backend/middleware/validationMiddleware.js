const { check } = require('express-validator');

// Middleware pour sécuriser les champs utilisateur
const validateUserRegistration = [
  check("firstName").notEmpty().withMessage("Le prénom est obligatoire").trim().escape(),
  check("lastName").notEmpty().withMessage("Le nom est obligatoire").trim().escape(),
  check("email").isEmail().withMessage("Email invalide").normalizeEmail(),
  check("password")
    .isLength({ min: 8 }).withMessage("Le mot de passe doit contenir au moins 8 caractères")
    .matches(/[A-Z]/).withMessage("Le mot de passe doit contenir au moins une majuscule")
    .matches(/\d/).withMessage("Le mot de passe doit contenir au moins un chiffre")
    .matches(/[@$!%*?&]/).withMessage("Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)"),
  check("phone").optional().isMobilePhone().withMessage("Numéro de téléphone invalide"),
];

// Validation pour la création de match
const validateMatchCreation = [
  check('name')
    .notEmpty()
    .withMessage('Le nom est obligatoire.')
    .trim()
    .escape(),
  check('description')
    .optional()
    .trim()
    .escape(),
  check('maxNumberPlayers')
    .isInt({ min: 2 })
    .withMessage('Le nombre de joueurs doit être au moins 2.'),
  check('adress')
    .notEmpty()
    .withMessage('L\'adresse est obligatoire.')
    .trim()
    .escape(),
  check('eventDate')
    .isISO8601()
    .withMessage('La date de l\'événement est invalide.')
];

// Validation pour la création de tournoi
const validateTournamentCreation = [
  check('name')
    .notEmpty()
    .withMessage('Le nom est obligatoire.')
    .trim()
    .escape(),
  check('description')
    .optional()
    .trim()
    .escape(),
  check('maxNumberTeams')
    .isInt({ min: 2 })
    .withMessage('Le nombre d\'équipes doit être au moins 2.'),
  check('adress')
    .notEmpty()
    .withMessage('L\'adresse est obligatoire.')
    .trim()
    .escape(),
  check('eventDate')
    .isISO8601()
    .withMessage('La date de l\'événement est invalide.')
];

module.exports = { validateUserRegistration, validateMatchCreation, validateTournamentCreation };
