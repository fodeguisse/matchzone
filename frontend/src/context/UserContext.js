import React, { createContext, useContext, useState, useEffect } from 'react';

// Crée un contexte
const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupérer l'utilisateur depuis localStorage au démarrage de l'application
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

// Hook pour utiliser le contexte
export const useUser = () => useContext(UserContext);
