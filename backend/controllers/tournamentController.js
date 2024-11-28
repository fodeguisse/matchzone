const { Tournament, Participate } = require('../models');
const { validationResult } = require('express-validator');

// Créer un tournoi
const createTournament = async (req, res) => {
  const { name, description, maxNumberTeams, adress, eventDate, image } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const tournament = await Tournament.create({
      name,
      description,
      maxNumberTeams,
      adress,
      eventDate,
      image,
      id_user: req.user.id, // ID de l'utilisateur connecté
    });

    res.status(201).json({ message: 'Tournoi créé avec succès.', tournament });
  } catch (err) {
    console.error('Erreur lors de la création du tournoi:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la création du tournoi.', error: err.message });
  }
};

// Participer à un tournoi
const participateTournament = async (req, res) => {
  const { id } = req.params;

  try {
    const tournament = await Tournament.findByPk(id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournoi introuvable.' });
    }

    const existingParticipation = await Participate.findOne({
      where: { id: id, id_user: req.user.id },
    });

    if (existingParticipation) {
      return res.status(400).json({ message: 'Vous participez déjà à ce tournoi.' });
    }

    await Participate.create({
      id: id,
      id_user: req.user.id,
    });

    res.status(200).json({ message: 'Participation au tournoi réussie.' });
  } catch (err) {
    console.error('Erreur lors de la participation au tournoi:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la participation au tournoi.', error: err.message });
  }
};

// Récupérer tous les tournois
const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.status(200).json(tournaments);
  } catch (err) {
    console.error('Erreur lors de la récupération des tournois:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des tournois.', error: err.message });
  }
};

// Récupérer un tournoi par ID
const getTournamentById = async (req, res) => {
  const { id } = req.params;

  try {
    const tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({ message: 'Tournoi introuvable.' });
    }

    res.status(200).json(tournament);
  } catch (err) {
    console.error('Erreur lors de la récupération du tournoi:', err);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du tournoi.', error: err.message });
  }
};

module.exports = { createTournament, participateTournament, getAllTournaments, getTournamentById };
