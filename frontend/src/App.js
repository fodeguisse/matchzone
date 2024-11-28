import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Matches from './pages/Matches'; // Import Matches.js
import Tournaments from './pages/Tournaments'; // Import Tournaments.js
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EventDetails from './pages/EventDetails';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/matches" element={<Matches />} /> {/* Route Matches */}
              <Route path="/tournaments" element={<Tournaments />} /> {/* Route Tournaments */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user-dashboard" element={<UserDashboard />} /> {/* Route UserDashboard */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/events/:id" element={<EventDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
