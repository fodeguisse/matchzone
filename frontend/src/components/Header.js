import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../styles/Header.css';
import logo from '../assets/images/Matchzone.png'; // Corrigez le chemin vers votre logo

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-logo">
          <img src="../assets/images/Matchzone.png" alt="Logo MatchZone" className="logo-img"/>
            MatchZone
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/" className="nav-link">Accueil</Nav.Link>
              <Nav.Link as={Link} to="/matches" className="nav-link">Matches</Nav.Link>
              <Nav.Link as={Link} to="/tournaments" className="nav-link">Tournois</Nav.Link>
              {user ? (
                <>
                  <Nav.Link className="nav-link disabled">
                    Bonjour, {user.firstName}
                  </Nav.Link>
                  <Nav.Link onClick={logout} className="nav-link">Déconnexion</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav-link">Connexion</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-link">Inscription</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-content">
        <Container>
          <h1>Bienvenue sur MatchZone</h1>
          <p>Découvrez et participez aux événements sportifs près de chez vous</p>
        </Container>
      </div>
    </header>
  );
};

export default Header;
