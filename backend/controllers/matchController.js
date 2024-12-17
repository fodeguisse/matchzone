const { Match, User, Team, Join } = require('../models');

// Récupérer tous les matchs
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [{ model: User, attributes: ['id_user', 'firstName', 'lastName'] }],
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer un match par ID
const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findByPk(id, {
      include: [
        { model: User, attributes: ['id_user', 'firstName', 'lastName'] },
        { model: Team, attributes: ['id_team', 'name'], through: { attributes: [] } },
      ],
    });
    if (!match) return res.status(404).json({ message: 'Match non trouvé.' });
    res.status(200).json(match);
  } catch (error) {
    console.error('Erreur lors de la récupération du match:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Créer un match
const createMatch = async (req, res) => {
  const { name, description, numberOfPlayers, address, eventDate, id_tournament } = req.body;
  try {
    if (!name || !description || !numberOfPlayers || !eventDate || !address) {
      return res.status(400).json({ message: 'Les champs obligatoires sont manquants.' });
    }
    const match = await Match.create({
      name,
      description,
      numberOfPlayers,
      address,
      eventDate,
      image: req.file ? req.file.filename : null,
      id_user: req.user.id,
      id_tournament: id_tournament || null,
    });
    res.status(201).json({ message: 'Match créé avec succès.', match });
  } catch (error) {
    console.error('Erreur lors de la création du match:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Rejoindre un match
const joinMatch = async (req, res) => {
  const { matchId } = req.body;
  try {
    const match = await Match.findByPk(matchId);
    if (!match) return res.status(404).json({ message: 'Match non trouvé.' });

    if (new Date(match.eventDate) < new Date()) {
      return res.status(400).json({ message: 'Ce match est déjà passé.' });
    }

    const participantsCount = await Join.count({ where: { id_match: matchId } });
    if (participantsCount >= match.numberOfPlayers) {
      return res.status(400).json({ message: 'Le nombre maximum de participants est atteint.' });
    }

    const alreadyJoined = await Join.findOne({ where: { id_user: req.user.id, id_match: matchId } });
    if (alreadyJoined) {
      return res.status(400).json({ message: 'Vous êtes déjà inscrit à ce match.' });
    }

    await Join.create({ id_user: req.user.id, id_match: matchId });
    res.status(200).json({ message: 'Vous avez rejoint le match avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l’inscription au match:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer les matchs créés par un utilisateur
const getMatchesCreatedByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const matches = await Match.findAll({
      where: { id_user: userId },
      include: [{ model: User, attributes: ['id_user', 'firstName', 'lastName'] }],
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs créés:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer les matchs auxquels un utilisateur a participé
const getMatchesJoinedByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const matches = await Match.findAll({
      include: [
        {
          model: Join,
          where: { id_user: userId },
          attributes: [],
        },
      ],
    });
    res.status(200).json(matches);
  } catch (error) {
    console.error('Erreur lors de la récupération des matchs rejoints:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Mettre à jour un match
const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { name, description, numberOfPlayers, address, eventDate } = req.body;
  try {
    const match = await Match.findByPk(id);
    if (!match) return res.status(404).json({ message: 'Match non trouvé.' });

    await match.update({
      name,
      description,
      numberOfPlayers,
      address,
      eventDate,
      image: req.file ? req.file.filename : match.image,
    });
    res.status(200).json({ message: 'Match mis à jour avec succès.', match });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du match:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Supprimer un match
const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findByPk(id);
    if (!match) return res.status(404).json({ message: 'Match non trouvé.' });

    await match.destroy();
    res.status(200).json({ message: 'Match supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du match:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  joinMatch,
  getMatchesCreatedByUser,
  getMatchesJoinedByUser,
  updateMatch,
  deleteMatch,
};
