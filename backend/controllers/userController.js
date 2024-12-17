const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models');

// Inscription d'un utilisateur
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  // Validation des champs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Vérifie si l'email est déjà utilisé
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role: 'user', // Rôle par défaut
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.', error: err.message });
  }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
    
    const token = jwt.sign({ id: user.id_user, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('Réponse du serveur : ', { token, user });

    res.status(200).json({ message: 'Connexion réussie.', token, user });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.', error: err.message });
  }
};



// Déconnexion d'un utilisateur
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie.' });
};

// Modifier un utilisateur
const updateUser = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const updatedData = { firstName, lastName, email, phone };
    await user.update(updatedData);

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur', error: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur', error: error.message });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  logoutUser,
  updateUser,
  deleteUser 
};
