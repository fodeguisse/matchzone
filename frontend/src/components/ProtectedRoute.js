import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  
  if (!token || !user) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // Si l'utilisateur n'a pas le bon rôle, rediriger vers la page d'accueil (ou autre page appropriée)
    return <Navigate to="/" />;
  }

  // Si tout va bien, afficher l'enfant
  return children;
};

export default ProtectedRoute;
