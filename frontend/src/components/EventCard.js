import { useNavigate } from 'react-router-dom';

function EventCard({ event, onParticipate }) {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  const remainingPlaces = (event.maxNumberPlayers || event.maxNumberTeams) - (event.participants?.length || 0);

  return (
    <div className="card event-card shadow-sm" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {event.image ? (
        <img src={event.image} className="card-img-top" alt={event.name} />
      ) : (
        <div className="card-img-placeholder">
          <span style={{ color: '#999' }}>Pas d'image</span>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <p>Places restantes : {remainingPlaces}</p>
        <p>Date : {new Date(event.eventDate).toLocaleDateString()}</p>
        <p>Lieu : {event.adress}</p>
        <div className="card-actions">
          {isLoggedIn ? (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation(); // Empêche la navigation sur clic du bouton
                onParticipate(event.id);
              }}
            >
              Participer
            </button>
          ) : (
            <p>
              <a href="/login">Connectez-vous</a> ou{' '}
              <a href="/register">inscrivez-vous</a> pour participer.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
