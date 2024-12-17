import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import Countdown from "../components/Countdown";
import "../styles/Home.css";

function Tournaments() {
  const [nextTournament, setNextTournament] = useState(null);
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tournaments");
        const now = new Date();
  
        const tournaments = response.data
          .filter((tournament) => new Date(tournament.eventDate) > now)
          .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  
        setNextTournament(tournaments[0] || null);
        setUpcomingTournaments(tournaments.slice(1, 5));
      } catch (err) {
        setError("Erreur lors du chargement des tournois.");
        console.error(err);
      }
    };
  
    fetchTournaments();
  }, []);
  

  const handleParticipate = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vous devez être connecté pour participer.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/tournaments/participate",
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Participation réussie !");
    } catch (error) {
      console.error("Erreur lors de la participation au tournoi :", error);
      alert("Impossible de participer au tournoi.");
    }
  };

  return (
    <div className="home-page">
      {error && <p className="error">{error}</p>}

      {/* Prochain tournoi */}
      {nextTournament && (
        <section className="next-event-section">
          <h2>Prochain Tournoi</h2>
          <div className="next-event-highlight">
            <EventCard
              event={nextTournament}
              onParticipate={(eventId) => handleParticipate(eventId)}
            />
            <Countdown eventDate={nextTournament.eventDate} />
          </div>
        </section>
      )}

      {/* Tournois suivants */}
      <section className="upcoming-events-section">
        <h3>Tournois Suivants</h3>
        <div className="event-list">
          {upcomingTournaments.map((tournament) => (
            <EventCard
              key={tournament.id}
              event={tournament}
              onParticipate={(eventId) => handleParticipate(eventId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Tournaments;
