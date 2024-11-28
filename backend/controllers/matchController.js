const { Match, Join, User } = require('../models');

// Créer un match
const createMatch = async (req, res) => {
  const { name, description, maxNumberPlayers, adress, eventDate} = req.body;
  
  console.log("Données reçues :", req.body);

  try {
    const match = await Match.create({
      name,
      description,
      maxNumberPlayers,
      adress,
      eventDate,
      image: req.file ? req.file.filename : null,
      id_user: req.user.id,
    });

    console.log('Utilisateur dans la requête:', req.user);

    res.status(201).json({ message: 'Match créé avec succès', match });
  } catch (error) {
    console.error('Erreur lors de la création du match:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création du match', error: error.message });
  }
};

// Rejoindre un match
const joinMatch = async (req, res) => {
  const { id_match } = req.body; // ID du match à rejoindre

  try {
    const match = await Match.findByPk(id_match);

    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé' });
    }

    // Vérifier si l'utilisateur a déjà rejoint le match
    const alreadyJoined = await Join.findOne({ where: { id: req.user.id, id_match } });

    if (alreadyJoined) {
      return res.status(400).json({ message: 'Vous avez déjà rejoint ce match' });
    }

    await Join.create({
      id: req.user.id, // ID de l'utilisateur connecté
      id_match,
    });

    res.status(200).json({ message: 'Vous avez rejoint le match avec succès' });
  } catch (error) {
    console.error('Erreur lors de la tentative de rejoindre le match:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la tentative de rejoindre le match', error: error.message });
  }
};

// Récupérer tous les matchs
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }],
    });

    res.status(200).json(matches);
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des matchs', error: error.message });
  }
};

// Récupérer un match par ID
const getMatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const match = await Match.findByPk(id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'firstName', 'lastName'] }],
    });

    if (!match) {
      return res.status(404).json({ message: 'Match non trouvé' });
    }

    res.status(200).json(match);
  } catch (error) {
    console.error('Erreur lors de la récupération du match:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du match', error: error.message });
  }
};

module.exports = {
  createMatch,
  joinMatch,
  getAllMatches,
  getMatchById,
};
