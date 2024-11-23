import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useUser } from '../context/UserContext'; 
import '../styles/Header.css';
import logo from '../assets/images/Matchzone.png';

const Header = () => {
  const { user, setUser } = useUser(); // Utilisation du hook useUser
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Réinitialiser l'utilisateur dans le contexte
    navigate('/');
  };

  return (
    <header className="header">
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-logo">
            <img src={logo} alt="Logo" /> MatchZone
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
    </header>
  );
};

export default Header;
