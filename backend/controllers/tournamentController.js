const { Tournament, Participate, User, Team } = require('../models');

// Récupérer tous les tournois
const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.findAll({
      include: [{ model: User, attributes: ['id_user', 'firstName', 'lastName'] }],
    });
    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer un tournoi par ID
const getTournamentById = async (req, res) => {
  const { id } = req.params;
  try {
    const tournament = await Tournament.findByPk(id, {
      include: [
        { model: User, attributes: ['id_user', 'firstName', 'lastName'] },
        { model: Team, attributes: ['id_team', 'name'], through: { attributes: [] } },
      ],
    });

    if (!tournament) return res.status(404).json({ message: 'Tournoi non trouvé.' });

    res.status(200).json(tournament);
  } catch (error) {
    console.error('Erreur lors de la récupération du tournoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Créer un tournoi
const createTournament = async (req, res) => {
  const { name, description, maxNumberTeams, address, eventDate } = req.body;
  try {
    if (!name || !description || !maxNumberTeams || !address || !eventDate) {
      return res.status(400).json({ message: 'Les champs obligatoires sont manquants.' });
    }

    const tournament = await Tournament.create({
      name,
      description,
      maxNumberTeams,
      address,
      eventDate,
      image: req.file ? req.file.filename : null,
      id_user: req.user.id,
    });

    res.status(201).json({ message: 'Tournoi créé avec succès.', tournament });
  } catch (error) {
    console.error('Erreur lors de la création du tournoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Participer à un tournoi
const participateTournament = async (req, res) => {
  const { idTournament, idTeam } = req.body; // Assurez-vous que ces valeurs viennent du corps de la requête
  try {
    // Vérifier si le tournoi existe
    const tournament = await Tournament.findByPk(idTournament);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournoi non trouvé.' });
    }

    // Vérifier le nombre d'équipes inscrites au tournoi
    const teamCount = await Participate.count({
      where: { id_tournament: idTournament },
    });

    if (teamCount >= tournament.maxNumberTeams) {
      return res.status(400).json({ message: 'Le nombre maximal de participants est atteint.' });
    }

    // Vérifier si l'équipe est déjà inscrite au tournoi
    const existingParticipation = await Participate.findOne({
      where: { id_team: idTeam, id_tournament: idTournament },
    });

    if (existingParticipation) {
      return res.status(400).json({ message: 'Cette équipe est déjà inscrite à ce tournoi.' });
    }

    // Ajouter l'équipe à la table participate
    await Participate.create({ id_team: idTeam, id_tournament: idTournament });
    res.status(200).json({ message: 'Inscription au tournoi réussie.' });
  } catch (error) {
    console.error('Erreur lors de l’inscription au tournoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};


// Récupérer les tournois créés par un utilisateur
const getTournamentsCreatedByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tournaments = await Tournament.findAll({
      where: { id_user: userId },
      include: [
        { model: User, attributes: ['id_user', 'firstName', 'lastName'] },
        { model: Team, through: { attributes: [] } }
      ],
    });
    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois créés par l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};


// Récupérer les tournois auxquels un utilisateur a participé
const getTournamentsJoinedByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Récupérer les équipes auxquelles l'utilisateur appartient
    const teams = await Team.findAll({
      where: { id_user: userId },
    });

    if (!teams.length) {
      return res.status(404).json({ message: 'Aucune équipe trouvée pour cet utilisateur.' });
    }

    // Récupérer les tournois auxquels ces équipes participent
    const tournaments = await Tournament.findAll({
      include: [
        {
          model: Participate,
          where: {
            id_team: teams.map(team => team.id_team),
          },
          attributes: [],
        },
      ],
    });

    res.status(200).json(tournaments);
  } catch (error) {
    console.error('Erreur lors de la récupération des tournois rejoints:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};


// Mettre à jour un tournoi
const updateTournament = async (req, res) => {
  const { id } = req.params;
  const { name, description, maxNumberTeams, address, eventDate } = req.body;

  try {
    const tournament = await Tournament.findByPk(id);
    if (!tournament) return res.status(404).json({ message: 'Tournoi non trouvé.' });

    await tournament.update({
      name,
      description,
      maxNumberTeams,
      address,
      eventDate,
      image: req.file ? req.file.filename : tournament.image,
    });

    res.status(200).json({ message: 'Tournoi mis à jour avec succès.', tournament });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du tournoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Supprimer un tournoi
const deleteTournament = async (req, res) => {
  const { id } = req.params;

  try {
    const tournament = await Tournament.findByPk(id);
    if (!tournament) return res.status(404).json({ message: 'Tournoi non trouvé.' });

    await tournament.destroy();
    res.status(200).json({ message: 'Tournoi supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du tournoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer les équipes participant à un tournoi
const getTeamsByTournament = async (req, res) => {
  const { id } = req.params;

  try {
    const tournament = await Tournament.findByPk(id, {

      include: [
        { model: User, attributes: ['id_user', 'firstName', 'lastName'] },
        { model: Team, through: { attributes: [] } },
      ],
    });

    if (!tournament) return res.status(404).json({ message: 'Tournoi non trouvé.' });

    res.status(200).json(tournament.Teams);
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes pour le tournoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = {
  getAllTournaments,
  getTournamentById,
  createTournament,
  participateTournament,
  getTournamentsCreatedByUser,
  getTournamentsJoinedByUser,
  updateTournament,
  deleteTournament,
  getTeamsByTournament,
};
