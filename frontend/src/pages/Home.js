import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import Countdown from '../components/Countdown';
import '../styles/Home.css';

function Home() {
  const [nextEvent, setNextEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data: events } = await axios.get('http://localhost:5000/api/matches');
        const sortedEvents = events.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

        setNextEvent(sortedEvents[0]); // Premier événement le plus proche
        setUpcomingEvents(sortedEvents.slice(1, 5)); // Les 4 suivants
      } catch (err) {
        setError('Erreur lors du chargement des événements.');
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleParticipate = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vous devez être connecté pour participer.');
        return;
      }

      await axios.post('http://localhost:5000/api/matches/participate', { eventId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Participation réussie !');
    } catch (error) {
      console.error('Erreur lors de la participation à l\'événement :', error);
      alert('Impossible de participer à l\'événement.');
    }
  };

  return (
    <div className="home-page">
      {error && <p className="error">{error}</p>}

      {nextEvent && (
        <section className="next-event-section">
          <h2>Prochain Événement</h2>
          <div className="next-event-highlight">
            <EventCard event={nextEvent} onParticipate={handleParticipate} />
            <Countdown eventDate={nextEvent.eventDate} />
          </div>
        </section>
      )}

      <section className="upcoming-events-section">
        <h3>Événements Suivants</h3>
        <div className="event-list">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onParticipate={handleParticipate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
