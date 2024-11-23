import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { UserProvider } from "./context/UserContext";

import "./App.css";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Données utilisateur dans localStorage :', storedUser);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Erreur lors du parsing des données utilisateur :', err);
        setUser(null);
      }
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          {/* Error Boundary for handling unexpected errors */}
          <ErrorBoundary>
            {/* Sticky Header */}
            <Header user={user} handleLogout={handleLogout} />
          </ErrorBoundary>

          <main className="main-content">
            {/* Application routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              {/* Route protégée pour l'utilisateur */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute role="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Route protégée pour l'administrateur */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
