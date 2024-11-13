const {User, Tournament} = require('../models');


//Récupérer tous les tournois
exports.getAllTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.findAll({
            include: [
                {model : User, attributes: ['firstName', 'lastName']}
            ]
        });
        res.json(tournaments);
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la récupération des tournois"});
    }
};


// récupérer un match par ID
exports.getAllTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findByPk(req.params.id, {
            include: [
                {model : User, attributes: ['firstName', 'lastName']},
            ]
        });
        if(tournament){
            res.json(tournament);
        } else {
            res.status(404).json({error: "Match non trouvé"});
        }
        
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la récupération du tournois"});
    }
};

// créer un nouveau tournoi
exports.createTournament = async (req, res) => {
    try {
        const tournament = await Tournament.create(req, res);
        res.status(201).json(tournament);
    } catch (error) {
        res.status(500).json({error : "Erreur lors de la création du tournoi"});
    }
}