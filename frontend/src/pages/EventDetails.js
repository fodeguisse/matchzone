import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EventDetails.css';

const EventDetails = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [event, setEvent] = useState(null); // Événement à afficher
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const [matchesRes, tournamentsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/matches"),
        axios.get("http://localhost:5000/api/tournaments"),
      ]);

      const match = matchesRes.data.find((match) => match.id === Number(id));
      const tournament = tournamentsRes.data.find((tournament) => tournament.id === Number(id));

      const event = match || tournament;
      if (event) {
        setEvent(event);
        setComments(event.comments || []);
      } else {
        console.error("Événement introuvable avec l'ID :", id);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'événement :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleParticipate = async () => {
    if (!token) {
      // Redirige vers la page connexion avec retour automatique à EventDetails
      navigate(`/login?redirectTo=/event/${id}`);
      return;
    }

    const remainingPlaces =
      (event.maxNumberPlayers || event.maxNumberTeams) -
      (event.currentParticipants || 0);

    if (remainingPlaces <= 0) {
      alert("Le nombre maximum de participants est atteint.");
      return;
    }

    try {
      await axios.post(
        `/api/events/${id}/participate`, // Remplacez avec le bon endpoint
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Vous êtes inscrit avec succès !");
      fetchEventDetails(); // Met à jour l'état
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription");
    }
  };

  const handleCommentSubmit = async () => {
    if (!token) {
      // Redirige vers la page connexion avec retour automatique à EventDetails
      navigate(`/login?redirectTo=/event/${id}`);
      return;
    }

    try {
      await axios.post(
        `/api/events/${id}/comments`, // Remplacez avec le bon endpoint pour les commentaires
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchEventDetails(); // Recharge les commentaires après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
    }
  };

  if (isLoading) return <p>Chargement...</p>;
  if (!event) return <p>Événement introuvable.</p>;

  const remainingPlaces =
    (event.maxNumberPlayers || event.maxNumberTeams) -
    (event.currentParticipants || 0);

  return (
    <div className="event-details">
      <div className="event-header">
        <img src={event.image} alt={event.name} className="event-details-image" />
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
            Places restantes : <strong>{remainingPlaces}</strong> /{" "}
            {event.maxNumberPlayers || event.maxNumberTeams}
          </p>
          <button
            className="btn-participate"
            onClick={handleParticipate}
            disabled={remainingPlaces <= 0}
          >
            {token ? "Participer" : "Connectez-vous ou inscrivez-vous pour participer"}
          </button>
        </div>
      </div>

      <section className="comments-section">
        <h2>Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>
                <strong>{comment.user?.name || "Utilisateur"}</strong>:{" "}
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
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
