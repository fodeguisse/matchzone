const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Modèle User pour trouver l'utilisateur par ID

// Middleware pour vérifier l'authentification
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Token reçu:', token);

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, veuillez vous connecter.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérification du token
    console.log('Token décodé:', decoded);

    const user = await User.findByPk(decoded.id); // Récupération de l'utilisateur par ID
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    req.user = { id: user.id, role: user.role }; // Attacher l'utilisateur à la requête
    console.log('Utilisateur attaché à la requête:', req.user);

    next();
  } catch (err) {
    console.error('Erreur dans le middleware authMiddleware:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré, veuillez vous reconnecter.' });
    }
    res.status(400).json({ message: 'Token invalide.' });
  }
};

// Middleware pour vérifier le rôle administrateur
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé, rôle insuffisant.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
