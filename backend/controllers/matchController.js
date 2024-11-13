const {Match, User, Tournament} = require('../models');


//Récupérer tous les matchs
exports.getAllMatches = async (req, res) => {
    try {
        const matches = await Match.findAll({
            include: [
                {model : User, attributes: ['firstName', 'lastName']},
                {model : Tournament, attributes: ['name']}
            ]
        });
        res.json(matches);
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la récupération des matches"});
    }
};

// récupérer un match par ID
exports.getAllMatchById = async (req, res) => {
    try {
        const matches = await Match.findByPk(req.params.id, {
            include: [
                {model : User, attributes: ['firstName', 'lastName']},
                {model : Tournament, attributes: ['name']}
            ]
        });
        if(match){
            res.json(match);
        } else {
            res.status(404).json({error: "Match non trouvé"});
        }
        
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la récupération du match"});
    }
};

// créer un match
exports.createMatch = async (req, res) => {
    try {
        const {name, adress, eventDate, image, id_user, id_tournament} = req.body;

        const user = await User.findByPk(id_user);
        if(!user){
            return res.status(400).json({error: "Utilisateur introuvable avec cet ID"});
        }

        const match = await Match.create({
            name,
            adress,
            eventDate,
            image,
            id_user,
            id_tournament,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Erreur lors de la création du match :", error);
        res.status(500).json({error: "Erreur lors de la création du match."});
    }
};