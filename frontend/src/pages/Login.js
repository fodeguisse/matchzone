import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Importer le contexte
import { postData } from '../services/apiService'; // Importer la fonction postData
import '../styles/Form.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await postData("http://localhost:5000/api/users/login", { email, password });
  
      // Déboguer la réponse du serveur
      console.log('Réponse du serveur:', response);
  
      // Vérifier si la réponse contient un token et un user
      if (response && response.token && response.user) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user); // Mettre à jour le contexte avec l'utilisateur
      } else {
        throw new Error("Token ou utilisateur manquant dans la réponse.");
      }
  
      // Récupérer le rôle de l'utilisateur
      const userRole = response.user.role;
      const redirectTo = new URLSearchParams(location.search).get("redirectTo");
      navigate(redirectTo || (userRole === "admin" ? "/admin-dashboard" : "/user-dashboard"));
    } catch (err) {
      // Gérer l'erreur et l'afficher dans la console
      console.error("Erreur lors de la connexion :", err);
      const backendError = err.message || "Erreur lors de la connexion.";
      setError(backendError);
    }
  };
  

  return (
    <div className="login">
      <h2>Connexion</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
