import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!token || !user) {
    // Redirige vers la page de connexion avec l'URL actuelle
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} />;
  }

  if (role && user.role !== role) {
    // Redirige les utilisateurs sans rôle approprié
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
