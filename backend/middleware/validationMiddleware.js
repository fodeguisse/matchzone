const { check } = require('express-validator');

const validateUserRegistration = [
  check('firstName').notEmpty().withMessage('Le prénom est obligatoire'),
  check('lastName').notEmpty().withMessage('Le nom est obligatoire'),
  check('email').isEmail().withMessage('Email invalide'),
  check('password')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[@$!%*?&]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial (@$!%*?&)'),
  check('phone')
    .isMobilePhone().withMessage('Numéro de téléphone invalide')
];

module.exports = { validateUserRegistration };
