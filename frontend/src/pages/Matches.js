import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Matches.css';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/matches');
        setMatches(response.data);
      } catch (err) {
        setError('Impossible de charger les matches.');
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="matches">
      <h2>Liste des Matches</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            <h3>{match.title}</h3>
            <p>Date : {new Date(match.date).toLocaleDateString()}</p>
            <p>Lieu : {match.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
