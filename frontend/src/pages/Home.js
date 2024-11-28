import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import Countdown from "../components/Countdown";
import "../styles/Home.css";

function Home() {
  const [nextEvent, setNextEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch matches and tournaments in parallel
        const [matchesResponse, tournamentsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/matches"),
          axios.get("http://localhost:5000/api/tournaments"),
        ]);

        const matches = matchesResponse.data.map((match) => ({
          ...match,
          type: "match", // Indique que cet événement est un match
        }));

        const tournaments = tournamentsResponse.data.map((tournament) => ({
          ...tournament,
          type: "tournament", // Indique que cet événement est un tournoi
        }));

        // Combine and sort all events by date
        const allEvents = [...matches, ...tournaments].sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );

        setNextEvent(allEvents[0]); // Premier événement le plus proche
        setUpcomingEvents(allEvents.slice(1, 5)); // Les 4 suivants
      } catch (err) {
        setError("Erreur lors du chargement des événements.");
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleParticipate = async (eventId, eventType) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour participer.");
        return;
      }

      // Détermine l'URL API en fonction du type d'événement
      const url =
        eventType === "match"
          ? "http://localhost:5000/api/matches/participate"
          : "http://localhost:5000/api/tournaments/participate";

      await axios.post(
        url,
        { eventId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Participation réussie !");
    } catch (error) {
      console.error("Erreur lors de la participation à l'événement :", error);
      alert("Impossible de participer à l'événement.");
    }
  };

  return (
    <div className="home-page">
      {error && <p className="error">{error}</p>}

      {/* Prochain événement */}
      {nextEvent && (
        <section className="next-event-section">
          <h2>Prochain Événement</h2>
          <div className="next-event-highlight">
            <EventCard
              event={nextEvent}
              onParticipate={(eventId) =>
                handleParticipate(eventId, nextEvent.type)
              }
            />
            <Countdown eventDate={nextEvent.eventDate} />
          </div>
        </section>
      )}

      {/* Événements suivants */}
      <section className="upcoming-events-section">
        <h3>Événements Suivants</h3>
        <div className="event-list">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onParticipate={(eventId) =>
                handleParticipate(eventId, event.type)
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
