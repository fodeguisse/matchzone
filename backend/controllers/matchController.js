const Match = require('../models/Match');
const { validationResult } = require('express-validator');

const createMatch = async (req, res) => {
  const { name, description, numberOfPlayers, adress, eventDate, image, id_tournament } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const match = await Match.create({
      name,
      description,
      numberOfPlayers,
      adress,
      eventDate,
      image,
      id_user: req.user.id, // L'utilisateur connecté crée le match
      id_tournament,
    });
    res.status(201).json({ message: 'Match créé avec succès', match });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création du match', error: err });
  }
};

const participateMatch = async (req, res) => {
  const { id_match } = req.params;

  try {
    const match = await Match.findByPk(id_match);
    if (!match) {
      return res.status(404).json({ message: 'Match introuvable' });
    }

    // Vérifier si l'utilisateur est déjà inscrit au match
    // Ajouter une logique de participation au match ici

    res.status(200).json({ message: 'Vous participez au match' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la participation au match', error: err });
  }
};

// Récupérer tous les matchs
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll(); // Récupérer tous les matchs
    res.status(200).json(matches); // Retourner les matchs trouvés
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des matchs', error: err });
  }
};

// Récupérer un match par son ID
const getMatchById = async (req, res) => {
  const { id_match } = req.params;

  try {
    const match = await Match.findByPk(id_match); // Récupérer un match par son ID
    if (!match) {
      return res.status(404).json({ message: 'Match introuvable' });
    }
    res.status(200).json(match); // Retourner le match trouvé
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du match', error: err });
  }
};


module.exports = { createMatch, participateMatch, getAllMatches, getMatchById };
