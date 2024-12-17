const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware pour vérifier l'authentification de l'utilisateur
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou mal formé." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    req.user = { id: user.id_user, role: user.role };
    console.log("Utilisateur authentifié :", req.user);
    
    next();
  } catch (err) {
    const errorMessage =
      err.name === "TokenExpiredError"
        ? "Token expiré. Veuillez vous reconnecter."
        : "Token invalide.";
    return res.status(401).json({ message: errorMessage });
  }
};

// Middleware pour vérifier les autorisations basées sur les rôles
const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Accès refusé. Rôle insuffisant." });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };
