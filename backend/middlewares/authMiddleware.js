const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.authenticateUser =async (req, res, next) => {
    const token = req.headers.authorization?.split("")[1];

    if (!token) {
        return res.status(403).json({error:"token manquant: Veuillez vous connecter."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({error: "Utilisateur non touvé"});  
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Erreur d'authentification : ", error);
        return res.status(401).json({error: "Token invalide."});  
    }
}