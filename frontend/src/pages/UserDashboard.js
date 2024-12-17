import React, { useState, useEffect } from "react";
import { getData, postData } from "../services/apiService";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm";
import "../styles/UserDashboard.css";

// Composant réutilisable pour afficher une section d'événements
const EventSection = ({ title, events, onParticipate }) => (
  <section className="dashboard-section">
    <h2>{title}</h2>
    <div className="event-list">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onParticipate={onParticipate} // Fonction pour rejoindre l'événement
          />
        ))
      ) : (
        <p>Aucun événement disponible.</p>
      )}
    </div>
  </section>
);

const UserDashboard = () => {
  const [createdMatches, setCreatedMatches] = useState([]);
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [createdTournaments, setCreatedTournaments] = useState([]);
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const [createdTeams, setCreatedTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [activeForm, setActiveForm] = useState(null); // "match", "tournament" ou "team"

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const fetchData = async () => {
    try {
      const [
        matchesCreated,
        matchesJoined,
        tournamentsCreated,
        tournamentsJoined,
        teamsCreated,
        teamsJoined,
      ] = await Promise.all([
        getData(`/matches/user/${userId}/created`),
        getData(`/matches/user/${userId}/joined`),
        getData(`/tournaments/user/${userId}/created`),
        getData(`/tournaments/user/${userId}/joined`),
        getData(`/teams/user/${userId}/created`),
        getData(`/teams/user/${userId}/joined`),
      ]);

      setCreatedMatches(matchesCreated);
      setJoinedMatches(matchesJoined);
      setCreatedTournaments(tournamentsCreated);
      setJoinedTournaments(tournamentsJoined);
      setCreatedTeams(teamsCreated);
      setJoinedTeams(teamsJoined);
    } catch (error) {
      console.error("Erreur lors du chargement des événements :", error);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  const createEvent = async (endpoint, data) => {
    try {
      await postData(endpoint, data);
      alert("Événement créé avec succès !");
      fetchData();
      setActiveForm(null);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      alert("Erreur lors de la création de l'événement.");
    }
  };

  const handleParticipate = async (eventId, eventType) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour participer.");
        return;
      }
  
      let url;
      let payload;
  
      switch (eventType) {
        case "match":
          url = "/matches/join";
          payload = { matchId: eventId }; // Nom correct pour le match
          break;
        case "tournament":
          url = "/tournaments/participate";
          payload = { tournamentId: eventId }; // Nom correct pour le tournoi
          break;
        case "team":
          url = "/teams/join";
          payload = { teamId: eventId }; // Nom correct pour l'équipe
          break;
        default:
          throw new Error("Type d'événement inconnu");
      }
  
      await postData(url, payload);
      alert("Participation réussie !");
      fetchData(); // Recharger les données après participation
    } catch (error) {
      console.error("Erreur lors de la participation :", error);
      alert("Impossible de participer à l'événement.");
    }
  };
  

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Espace Personnel</h1>

      {/* Sections des événements */}
      <EventSection
        title="Matchs créés"
        events={createdMatches}
        onParticipate={(id) => handleParticipate(id, "match")}
      />
      <EventSection
        title="Matchs auxquels je participe"
        events={joinedMatches}
      />
      <EventSection
        title="Tournois créés"
        events={createdTournaments}
        onParticipate={(id) => handleParticipate(id, "tournament")}
      />
      <EventSection
        title="Tournois auxquels je participe"
        events={joinedTournaments}
      />
      <EventSection
        title="Équipes créées"
        events={createdTeams}
        onParticipate={(id) => handleParticipate(id, "team")}
      />
      <EventSection
        title="Équipes auxquelles je participe"
        events={joinedTeams}
      />

      {/* Boutons pour afficher les formulaires */}
      <section className="dashboard-section">
        <h2>Créer un événement</h2>
        <div className="form-buttons">
          <button
            className="btn btn-primary"
            onClick={() => setActiveForm(activeForm === "match" ? null : "match")}
          >
            {activeForm === "match" ? "Fermer le formulaire" : "Créer un match"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setActiveForm(activeForm === "tournament" ? null : "tournament")
            }
          >
            {activeForm === "tournament"
              ? "Fermer le formulaire"
              : "Créer un tournoi"}
          </button>
          <button
            className="btn btn-tertiary"
            onClick={() => setActiveForm(activeForm === "team" ? null : "team")}
          >
            {activeForm === "team" ? "Fermer le formulaire" : "Créer une équipe"}
          </button>
        </div>

        {/* Formulaire pour créer un match */}
        {activeForm === "match" && (
          <EventForm
            title="Créer un Match"
            fields={[
              { name: "name", label: "Nom du match", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "address", label: "Adresse", type: "text" },
              { name: "eventDate", label: "Date et heure", type: "datetime-local" },
              { name: "numberOfPlayers", label: "Nombre maximum de joueurs", type: "number" },
              { name: "image", label: "Image", type: "file" },
            ]}
            onSubmit={(data) => createEvent("/matches/create", data)}
            onClose={() => setActiveForm(null)}
          />
        )}

        {/* Formulaire pour créer un tournoi */}
        {activeForm === "tournament" && (
          <EventForm
            title="Créer un Tournoi"
            fields={[
              { name: "name", label: "Nom du tournoi", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "address", label: "Adresse", type: "text" },
              { name: "eventDate", label: "Date et heure", type: "datetime-local" },
              { name: "maxNumberTeams", label: "Nombre maximum d'équipes", type: "number" },
              { name: "image", label: "Image", type: "file" },
            ]}
            onSubmit={(data) => createEvent("/tournaments/create", data)}
            onClose={() => setActiveForm(null)}
          />
        )}

        {/* Formulaire pour créer une équipe */}
        {activeForm === "team" && (
          <EventForm
            title="Créer une Équipe"
            fields={[
              { name: "name", label: "Nom de l'équipe", type: "text" },
              { name: "numberOfPlayers", label: "Nombre de joueurs", type: "number" }, // Champ ajouté
            ]}
            onSubmit={(data) => createEvent("/teams/create", data)}
            onClose={() => setActiveForm(null)}
          />
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
