const { where } = require('sequelize');
const {User, Match} = require('../models');

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

//Créer un utilisateur
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la création de l'utilisateur"}
        )
    }
};

//Récupérer les matchs crées par l'utilisateur
exports.getUserMatches = async (req, res) => {
    try {
        const userId = req.user.userId;
        const matches = await Match.findAll({
            where: {id_user: userId},
        });
        res.status(200).json(matches);
    } catch (error) {
        console.error("Erreur lors de la récupération des matchs de l'utilisateur :", error);
        res.status(500).json({error : "Erreur lors de la récupération des matchs"});
    }
};

//Récupérer les matchs auquels l'utilisateur partipe
exports.getUserParticipations = async (req, res) => {
    try {
        const userId = req.user.userId;
        const matches = await Match.findAll({
            where: {id_user: userId},
        });
        res.status(200).json(matches);
    } catch (error) {
        console.error("Erreur lors de la récupération des matchs de l'utilisateur :", error);
        res.status(500).json({error : "Erreur lors de la récupération des matchs"});
    }
};


//Créer un match
exports.createUserMatch = async (req, res) => {
    try {
        const userId = req.user.userId;
        const {name, adress, eventDate, image} = req.body;

        const match = await Match.create({
            name,
            adress,
            eventDate,
            image,
            id_user: userId,
            id_tournament,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.status(201).json({message: "Match rée avec succès", match});
    } catch (error) {
        console.error("Erreur lors de la création du match :", error);
        res.status(500).json({error: "Erreur lors de la création du match."});
    }
};