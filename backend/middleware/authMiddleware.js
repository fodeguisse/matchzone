const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modèle User pour trouver l'utilisateur par ID

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extraire le token de l'en-tête

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, veuillez vous connecter.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token
    req.user = decoded; // Attacher les données de l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalide ou expiré.' });
  }
};

// Middleware pour vérifier si l'utilisateur est un administrateur
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé, rôle insuffisant.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
