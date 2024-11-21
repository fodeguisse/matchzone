import React, { createContext, useState } from "react";

// Créer un contexte utilisateur
export const UserContext = createContext();

// Fournir le contexte utilisateur
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
