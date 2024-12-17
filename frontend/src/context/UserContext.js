import React, { createContext, useState, useEffect, useContext } from 'react';

// Créer le contexte utilisateur
const UserContext = createContext();

// Fournisseur de contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Charger l'utilisateur depuis le localStorage au montage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => {
  return useContext(UserContext);
};
