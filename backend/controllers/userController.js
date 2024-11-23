const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  // Validation des champs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log('Données reçues pour l\'inscription :', { firstName, lastName, email, password, phone });
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role: 'user', // Par défaut, rôle utilisateur
    });
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err); // Log détaillé côté serveur
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: err.message });
  }  
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }

  try {
    console.log('Recherche utilisateur avec l’email:', email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Utilisateur non trouvé pour l’email:', email);
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    console.log('Comparaison des mots de passe pour:', email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Mot de passe incorrect pour l’utilisateur:', email);
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    console.log('Utilisateur authentifié, génération du token.');
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Connexion réussie', token, user });
  } catch (err) {
    console.error('Erreur interne lors de la connexion:', err);
    res.status(500).json({ message: 'Erreur de connexion', error: err });
  }
};

const logoutUser = (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};

module.exports = { registerUser, loginUser, logoutUser };
