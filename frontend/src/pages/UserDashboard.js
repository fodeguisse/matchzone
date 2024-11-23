import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [createdMatches, setCreatedMatches] = useState([]);
  const [participations, setParticipations] = useState([]);
  const [showMatchForm, setShowMatchForm] = useState(false);
  const [showTournamentForm, setShowTournamentForm] = useState(false);

  const [newMatch, setNewMatch] = useState({
    name: "",
    adress: "",
    eventDate: "",
    image: "",
  });

  const [newTournament, setNewTournament] = useState({
    name: "",
    adress: "",
    eventDate: "",
    image: "",
    maxTeams: "",
  });

  useEffect(() => {
    fetchCreatedMatches();
    fetchParticipations();
  }, []);

  const fetchCreatedMatches = async () => {
    try {
      const response = await axios.get("/api/user/my-matches", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCreatedMatches(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des matchs créés :", error);
    }
  };

  const fetchParticipations = async () => {
    try {
      const response = await axios.get("/api/user/my-participations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setParticipations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des participations :", error);
    }
  };

  const handleInputChange = (e, setState) => {
    setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const createMatch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage du token JWT
      const userId = decodedToken.id;

      await axios.post(
        "/api/matches",
        { ...newMatch, id_user: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Match créé avec succès !");
      setShowMatchForm(false);
      fetchCreatedMatches();
    } catch (error) {
      console.error("Erreur lors de la création du match :", error);
      alert("Erreur lors de la création du match");
    }
  };

  const createTournament = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage du token JWT
      const userId = decodedToken.id;

      await axios.post(
        "/api/tournaments",
        { ...newTournament, id_user: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Tournoi créé avec succès !");
      setShowTournamentForm(false);
      fetchCreatedMatches();
    } catch (error) {
      console.error("Erreur lors de la création du tournoi :", error);
      alert("Erreur lors de la création du tournoi");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Espace Personnel</h1>

      <section className="dashboard-section">
        <h2>Matchs créés</h2>
        <div className="event-list">
          {createdMatches.map((match) => (
            <EventCard key={match.id} event={match} onParticipate={() => {}} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Matchs auxquels je participe</h2>
        <div className="event-list">
          {participations.map((participation) => (
            <EventCard
              key={participation.id}
              event={participation.Match}
              onParticipate={() => {}}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Créer un événement</h2>
        <div className="form-buttons">
          <button
            className="btn btn-primary"
            onClick={() => setShowMatchForm(!showMatchForm)}
          >
            Créer un match
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setShowTournamentForm(!showTournamentForm)}
          >
            Créer un tournoi
          </button>
        </div>

        {showMatchForm && (
          <form onSubmit={createMatch} className="event-form">
            <input
              type="text"
              name="name"
              value={newMatch.name}
              onChange={(e) => handleInputChange(e, setNewMatch)}
              placeholder="Nom du match"
              required
            />
            <input
              type="text"
              name="adress"
              value={newMatch.adress}
              onChange={(e) => handleInputChange(e, setNewMatch)}
              placeholder="Adresse"
              required
            />
            <input
              type="datetime-local"
              name="eventDate"
              value={newMatch.eventDate}
              onChange={(e) => handleInputChange(e, setNewMatch)}
              required
            />
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setNewMatch((prevState) => ({
                  ...prevState,
                  image: e.target.files[0],
                }))
              }
              accept="image/*"
              required
            />
            <button type="submit" className="btn btn-success">
              Créer
            </button>
          </form>
        )}

        {showTournamentForm && (
          <form onSubmit={createTournament} className="event-form">
            <input
              type="text"
              name="name"
              value={newTournament.name}
              onChange={(e) => handleInputChange(e, setNewTournament)}
              placeholder="Nom du tournoi"
              required
            />
            <input
              type="text"
              name="adress"
              value={newTournament.adress}
              onChange={(e) => handleInputChange(e, setNewTournament)}
              placeholder="Adresse"
              required
            />
            <input
              type="datetime-local"
              name="eventDate"
              value={newTournament.eventDate}
              onChange={(e) => handleInputChange(e, setNewTournament)}
              required
            />
            <input
              type="number"
              name="maxTeams"
              value={newTournament.maxTeams}
              onChange={(e) => handleInputChange(e, setNewTournament)}
              placeholder="Nombre maximum d'équipes"
              required
            />
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setNewTournament((prevState) => ({
                  ...prevState,
                  image: e.target.files[0],
                }))
              }
              accept="image/*"
              required
            />
            <button type="submit" className="btn btn-success">
              Créer
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
