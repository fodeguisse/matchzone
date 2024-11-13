const {User} = require('../models');

//Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la récupération des utilisateurs"}
        )
    }
};

//Récupérer tous les utilisateurs
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la création de l'utilisateur"}
        )
    }
};