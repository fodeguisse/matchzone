import React from 'react';
import '../styles/EventCard.css';

function EventCard({ event, onParticipate }) {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <div className="card event-card shadow-sm">
      <img src={event.image} className="card-img-top" alt={event.name} />
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <p>{event.description}</p>
        <p>Date : {new Date(event.eventDate).toLocaleDateString()}</p>
        <p>Lieu : {event.adress}</p>
        <p>Créateur : {event.User?.firstname} {event.User?.lastname}</p>
        <div className="card-actions">
          {isLoggedIn ? (
            <button
              className="btn btn-primary"
              onClick={() => onParticipate(event.id)}
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
