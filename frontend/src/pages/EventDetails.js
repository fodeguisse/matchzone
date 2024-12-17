import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  // Récupération des détails de l'événement (match ou tournoi)
  const fetchEventDetails = async () => {
    try {
      setIsLoading(true);
      let eventData = null;

      // Tentative de récupération pour un match
      try {
        const matchResponse = await axios.get(
          `http://localhost:5000/api/matches/${id}`
        );
        eventData = { ...matchResponse.data, type: "match" };
      } catch (matchError) {
        // Si ce n'est pas un match, tenter pour un tournoi
        const tournamentResponse = await axios.get(
          `http://localhost:5000/api/tournaments/${id}`
        );
        eventData = { ...tournamentResponse.data, type: "tournament" };
      }

      if (eventData) {
        setEvent(eventData);
        setComments(eventData.comments || []);
      } else {
        setError("Événement introuvable.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails :", error);
      setError("Impossible de charger les détails de l'événement.");
    } finally {
      setIsLoading(false);
    }
  };

  // Participation à un événement
  const handleParticipate = async () => {
    try {
      if (!token) {
        navigate(`/login?redirectTo=/events/${id}`);
        return;
      }

      const endpoint =
        event.type === "match"
          ? `/api/matches/join`
          : `/api/tournaments/${id}/participate`;

      await axios.post(
        `http://localhost:5000${endpoint}`,
        { eventId: event.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Participation réussie !");
      fetchEventDetails(); // Actualiser les détails après la participation
    } catch (error) {
      console.error("Erreur lors de la participation :", error);
      alert("Impossible de participer à l'événement.");
    }
  };

  // Gestion des commentaires
  const handleCommentSubmit = async () => {
    if (!token) {
      navigate(`/login?redirectTo=/events/${id}`);
      return;
    }

    try {
      await axios.post(
        `/api/events/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchEventDetails(); // Rafraîchir les commentaires
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  // Affichage en cas de chargement ou d'erreur
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Événement introuvable.</p>;

  const remainingPlaces =
    (event.maxNumberPlayers || event.maxNumberTeams) -
    (event.currentParticipants || 0);

  return (
    <div className="event-details">
      <div className="event-header">
        <img
          src={event.image || "/default-event.jpg"}
          alt={event.name}
          className="event-details-image"
        />
        <div className="event-info">
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          <p>
            Date : <strong>{new Date(event.eventDate).toLocaleDateString()}</strong>
          </p>
          <p>
            Lieu : <strong>{event.adress}</strong>
          </p>
          <p>
            Organisé par :{" "}
            <strong>{event.creator?.firstname || "Inconnu"}</strong>
          </p>
          <p>
            Places restantes : <strong>{remainingPlaces}</strong> /{" "}
            {event.maxNumberPlayers || event.maxNumberTeams}
          </p>
          <button
            className="btn-participate"
            onClick={handleParticipate}
            disabled={remainingPlaces <= 0}
          >
            {token
              ? event.type === "match"
                ? "Rejoindre le match"
                : "Participer au tournoi"
              : "Connectez-vous pour participer"}
          </button>
        </div>
      </div>

      {/* Section des commentaires */}
      <section className="comments-section">
        <h2>Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.user?.firstname || "Utilisateur"}</strong>:{" "}
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment.</p>
        )}

        {token && (
          <div className="comment-form">
            <textarea
              placeholder="Ajoutez un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Publier</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDetails;
