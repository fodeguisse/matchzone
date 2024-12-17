import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Tournaments from './pages/Tournaments';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EventDetails from './pages/EventDetails';
import SearchResults from './pages/SearchResults'
import ProtectedRoute from './components/ProtectedRoute'; 
import { UserProvider } from './context/UserContext';
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Routes protégées */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events/:id"
                element={
                  <ProtectedRoute>
                    <EventDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
