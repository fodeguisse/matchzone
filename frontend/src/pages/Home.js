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
        const [matchesResponse, tournamentsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/matches"),
          axios.get("http://localhost:5000/api/tournaments"),
        ]);
  
        const matches = matchesResponse.data.map((match) => ({
          ...match,
          type: "match",
        }));
  
        const tournaments = tournamentsResponse.data.map((tournament) => ({
          ...tournament,
          type: "tournament",
        }));
  
      
        const now = new Date();
  
        const allEvents = [...matches, ...tournaments]
          .filter((event) => new Date(event.eventDate) > now)
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  
        setNextEvent(allEvents[0] || null);
        setUpcomingEvents(allEvents.slice(1, 5));
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

      const url =
        eventType === "match"
          ? "http://localhost:5000/api/matches/join"
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
