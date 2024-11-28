import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import Countdown from "../components/Countdown";
import "../styles/Home.css";

function Matches() {
  const [nextMatch, setNextMatch] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/matches");
        const matches = response.data.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );

        setNextMatch(matches[0]); // Prochain match
        setUpcomingMatches(matches.slice(1, 5)); // Les 4 suivants
      } catch (err) {
        setError("Erreur lors du chargement des matchs.");
        console.error(err);
      }
    };

    fetchMatches();
  }, []);

  const handleParticipate = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour participer.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/matches/participate",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Participation réussie !");
    } catch (error) {
      console.error("Erreur lors de la participation au match :", error);
      alert("Impossible de participer au match.");
    }
  };

  return (
    <div className="home-page">
      {error && <p className="error">{error}</p>}

      {/* Prochain match */}
      {nextMatch && (
        <section className="next-event-section">
          <h2>Prochain Match</h2>
          <div className="next-event-highlight">
            <EventCard
              event={nextMatch}
              onParticipate={(eventId) => handleParticipate(eventId)}
            />
            <Countdown eventDate={nextMatch.eventDate} />
          </div>
        </section>
      )}

      {/* Matchs suivants */}
      <section className="upcoming-events-section">
        <h3>Matchs Suivants</h3>
        <div className="event-list">
          {upcomingMatches.map((match) => (
            <EventCard
              key={match.id}
              event={match}
              onParticipate={(eventId) => handleParticipate(eventId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Matches;
