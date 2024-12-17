import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Appel API pour les résultats de recherche
        const response = await axios.get(`/api/search?query=${query}`);
        setResults(response.data); // Suppose que l'API retourne une liste combinée de matchs et tournois
      } catch (err) {
        setError("Erreur lors de la récupération des résultats de recherche.");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query]);

  if (loading) return <p>Chargement des résultats...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="search-results">
      <h1>Résultats de recherche pour : {query}</h1>
      {results.length > 0 ? (
        <div className="event-list">
          {results.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default SearchResults;
