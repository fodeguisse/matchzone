import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import '../styles/Header.css';
import logo from '../assets/images/Matchzone.png';

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <Container fluid className="d-flex align-items-center justify-content-between header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/" className="navbar-logo d-flex align-items-center">
            <img src={logo} alt="MatchZone" className="logo" />
            <span className="brand-name">MatchZone</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <Nav className="nav-links d-flex align-items-center">
          <Nav.Link as={Link} to="/">Accueil</Nav.Link>
          <Nav.Link as={Link} to="/matches">Matchs</Nav.Link>
          <Nav.Link as={Link} to="/tournaments">Tournois</Nav.Link>
        </Nav>

        {/* Search Bar */}
        <Form className="d-flex search-form" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Rechercher..."
            className="search-input-modern"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>

        {/* User Authentication Links */}
        <Nav className="user-auth-links d-flex align-items-center">
          {user ? (
            <>
              <Nav.Link as={Link} to="/user-dashboard">Bonjour, {user.firstName}</Nav.Link>
              <Nav.Link onClick={logout}>Déconnexion</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
              <Nav.Link as={Link} to="/register">Inscription</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </header>
  );
};

export default Header;
