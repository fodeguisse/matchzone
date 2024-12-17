import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/EventCard.css";

function EventCard({ event, onEdit, onDelete }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  // Calcul des places restantes
  const maxParticipants = event.numberOfPlayers || event.maxNumberTeams || 0;
  const remainingPlaces = maxParticipants - (event.participants?.length || 0);

  // Vérification des données supplémentaires
  const eventAddress = event.address || "Adresse non spécifiée";
  const eventCreator = event.User?.firstName || "Créateur inconnu";


  // Vérifie si l'utilisateur actuel est le créateur de l'événement
  const isCreator = userId === event.creatorId;

  return (
    <div
      className={`card event-card shadow-sm ${
        event.type === "tournament" ? "tournament" : "match"
      }`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* Image de l'événement */}
      {event.image ? (
        <img src={event.image} className="card-img-top" alt={event.name} />
      ) : (
        <div className="card-img-placeholder">
          <div className="placeholder-content">
            <h3>{event.name || "Événement"}</h3>
            <p>{event.type === "tournament" ? "Tournoi" : "Match"}</p>
          </div>
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>

        <div className="event-meta">
          <span
            className={`event-badge ${
              event.type === "tournament" ? "tournament" : "match"
            }`}
          >
            {event.type === "tournament" ? "Tournoi" : "Match"}
          </span>
        </div>

        {/* Informations supplémentaires */}
        <p>Places restantes : {remainingPlaces >= 0 ? remainingPlaces : "Illimitées"}</p>
        <p>Date : {new Date(event.eventDate).toLocaleDateString("fr-FR")}</p>
        <p>Heure : {new Date(event.eventDate).toLocaleTimeString("fr-FR")}</p>
        <p>Lieu : {eventAddress}</p>
        <p>Créateur : {eventCreator}</p>

        {/* Boutons d'action pour le créateur */}
        {isCreator && (
          <div className="card-actions">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                Modifier
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

EventCard.defaultProps = {
  onEdit: null,
  onDelete: null,
};

export default EventCard;
