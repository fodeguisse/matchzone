import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const [createdMatches, setCreatedMatches] = useState([]);
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [createdTournaments, setCreatedTournaments] = useState([]);
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const [showMatchForm, setShowMatchForm] = useState(false);
  const [showTournamentForm, setShowTournamentForm] = useState(false);

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  useEffect(() => {
    if (userId) {
      fetchCreatedMatches();
      fetchJoinedMatches();
      fetchCreatedTournaments();
      fetchJoinedTournaments();
    }
  }, [userId]);

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Appels API pour les matchs créés par l'utilisateur
  const fetchCreatedMatches = async () => {
    try {
      const response = await axios.get(`/api/matches/user/${userId}/created`, axiosConfig);
      console.log("Données reçues :", response.data);
      setCreatedMatches(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des matchs créés :", error);
    }
  };

  // Appels API pour les matchs auxquels l'utilisateur participe
  const fetchJoinedMatches = async () => {
    try {
      const response = await axios.get(`/api/matches/user/${userId}/joined`, axiosConfig);
      console.log("Données reçues :", response.data);
      setJoinedMatches(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des matchs rejoints :", error);
    }
  };

  // Appels API pour les tournois créés par l'utilisateur
  const fetchCreatedTournaments = async () => {
    try {
      const response = await axios.get(`/api/tournaments/user/${userId}/created`, axiosConfig);
      console.log("Données reçues :", response.data);
      setCreatedTournaments(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tournois créés :", error);
    }
  };

  // Appels API pour les tournois auxquels l'utilisateur participe
  const fetchJoinedTournaments = async () => {
    try {
      const response = await axios.get(`/api/tournaments/user/${userId}/joined`, axiosConfig);
      console.log("Données reçues :", response.data);
      setJoinedTournaments(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tournois rejoints :", error);
    }
  };

  // Gestion de la création d'événements
  const createEvent = async (url, data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      await axios.post(url, formData, axiosConfig);
      alert("Événement créé avec succès !");
      fetchCreatedMatches();
      fetchCreatedTournaments();
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      alert("Erreur lors de la création de l'événement");
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Espace Personnel</h1>

      {/* Matchs créés par l'utilisateur connecté */}
      <section className="dashboard-section">
        <h2>Matchs créés</h2>
        <div className="event-list">
          {createdMatches.map((match) => (
            <EventCard key={match.id} event={match} />
          ))}
        </div>
      </section>

      {/* Matchs auxquels l'utilisateur participe */}
      <section className="dashboard-section">
        <h2>Matchs auxquels je participe</h2>
        <div className="event-list">
          {joinedMatches.map((match) => (
            <EventCard key={match.id} event={match} />
          ))}
        </div>
      </section>

      {/* Tournois créés par l'utilisateur connecté */}
      <section className="dashboard-section">
        <h2>Tournois créés</h2>
        <div className="event-list">
          {createdTournaments.map((tournament) => (
            <EventCard key={tournament.id} event={tournament} />
          ))}
        </div>
      </section>

      {/* Tournois auxquels l'utilisateur participe */}
      <section className="dashboard-section">
        <h2>Tournois auxquels je participe</h2>
        <div className="event-list">
          {joinedTournaments.map((tournament) => (
            <EventCard key={tournament.id} event={tournament} />
          ))}
        </div>
      </section>

      {/* Formulaires de création */}
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
          <EventForm
            title="Créer un Match"
            fields={[
              { name: "name", label: "Nom du match", type: "text" },
              { name: "description", label: "Description", type: "textarea" }, // Champ ajouté
              { name: "adress", label: "Adresse", type: "text" },
              { name: "eventDate", label: "Date", type: "datetime-local" },
              { name: "maxNumberPlayers", label: "Nombre maximum de joueurs", type: "number" },
              { name: "image", label: "Image", type: "file" },
            ]}
            onSubmit={(data) => createEvent("/api/matches/create", data)}
            onClose={() => setShowMatchForm(false)}
          />
        )}

        {showTournamentForm && (
          <EventForm
            title="Créer un Tournoi"
            fields={[
              { name: "name", label: "Nom du tournoi", type: "text" },
              { name: "description", label: "Description", type: "textarea" }, // Champ ajouté
              { name: "adress", label: "Adresse", type: "text" },
              { name: "eventDate", label: "Date", type: "datetime-local" },
              { name: "maxNumberTeams", label: "Nombre maximum d'équipes", type: "number" },
              { name: "image", label: "Image", type: "file" },
            ]}
            onSubmit={(data) => createEvent("/api/tournaments/create", data)}
            onClose={() => setShowTournamentForm(false)}
          />
        )}

      </section>
    </div>
  );
};

export default UserDashboard;
