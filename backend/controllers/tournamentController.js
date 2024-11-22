const Tournament = require('../models/Tournament');
const { validationResult } = require('express-validator');

const createTournament = async (req, res) => {
  const { name, description, adress, eventDate, image } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tournament = await Tournament.create({
      name,
      description,
      adress,
      eventDate,
      image,
      id_user: req.user.id, // L'utilisateur connecté crée le tournoi
    });
    res.status(201).json({ message: 'Tournoi créé avec succès', tournament });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du tournoi', error: err });
  }
};

const participateTournament = async (req, res) => {
  const { id_tournament } = req.params;

  try {
    const tournament = await Tournament.findByPk(id_tournament);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournoi introuvable' });
    }

    // Vérifier si l'utilisateur est déjà inscrit au tournoi (simplification ici)
    // Ajoutez un lien avec une table de participation si nécessaire

    res.status(200).json({ message: 'Vous participez au tournoi' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la participation au tournoi', error: err });
  }
};

module.exports = { createTournament, participateTournament };
