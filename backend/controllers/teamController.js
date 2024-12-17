const { Team, Participate, Tournament, User } = require('../models');

// Créer une équipe
const createTeam = async (req, res) => {
  const { name, numberOfPlayers } = req.body;

  try {
    if (!name || !numberOfPlayers) {
      return res.status(400).json({ message: 'Le nom et le nombre de joueurs sont requis.' });
    }

    const team = await Team.create({
      name,
      numberOfPlayers,
      id_user: req.user.id,
    });

    res.status(201).json({ message: 'Équipe créée avec succès.', team });
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipe:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Rejoindre une équipe
const joinTeam = async (req, res) => {
  const { idTeam } = req.body;

  try {
    const team = await Team.findByPk(idTeam);
    if (!team) {
      return res.status(404).json({ message: 'Équipe non trouvée.' });
    }

    // Logique pour ajouter un utilisateur dans l'équipe
    res.status(200).json({ message: 'Vous avez rejoint l\'équipe avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la participation:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Supprimer une équipe
const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ message: 'Équipe non trouvée.' });
    }

    await team.destroy();
    res.status(200).json({ message: 'Équipe supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Modifier une équipe
const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, numberOfPlayers } = req.body;

  try {
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ message: 'Équipe non trouvée.' });
    }

    await team.update({ name, numberOfPlayers });
    res.status(200).json({ message: 'Équipe mise à jour avec succès.', team });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer les équipes de l'utilisateur
const getUserTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({ where: { id_user: req.user.id } });
    res.status(200).json(teams);
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = {
  createTeam,
  joinTeam,
  deleteTeam,
  updateTeam,
  getUserTeams,
};
