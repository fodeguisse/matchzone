import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Tournaments.css';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tournaments');
        setTournaments(response.data);
      } catch (err) {
        setError('Impossible de charger les tournois.');
      }
    };
    fetchTournaments();
  }, []);

  return (
    <div className="tournaments">
      <h2>Liste des Tournois</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <h3>{tournament.name}</h3>
            <p>Date de début : {new Date(tournament.startDate).toLocaleDateString()}</p>
            <p>Lieu : {tournament.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tournaments;
