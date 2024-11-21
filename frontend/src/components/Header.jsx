import React, { useEffect, useContext  } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/Header.css';

const Header = (()=>{
    const navigate = useNavigate();

    const context = useContext(UserContext);
    const user = context?.user || null;
    const setUser = context?.setUser || (() => {});
    

    //vérifier si l'utilisateur est connecté
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        try {
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser); // Valider si "storedUser" est valide
                if (parsedUser && typeof parsedUser === 'object') {
                    setUser(parsedUser);
                } else {
                    console.warn("Données utilisateur invalides. Réinitialisation.");
                    localStorage.removeItem('user'); // Nettoyage en cas de données incorrectes
                }
            }
            
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
            localStorage.removeItem('user'); // Nettoyage si l'erreur persiste
        }
    }, [setUser]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return(
        <header className='header'>
            <Navbar expanded="lg" className='navbar-custom'>
                <Container>
                    <Navbar.Brand href='/' className='text-white'>
                        <img src='/logo.png' alt='Logo MatchZone'></img>MatchZone
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar-nav'/>
                    <Navbar.Collapse id='navbar-nav'>
                        <Nav className='ml-auto'>
                            <Nav.Link as={Link} to="/" className="text-white">Acceuil</Nav.Link>
                            <Nav.Link as={Link} to="/matches" className="text-white">Matches</Nav.Link>
                            <Nav.Link as={Link} to="/tournaments" className="text-white">Tournois</Nav.Link>
                            {user ? (
                                <>
                                <Nav.Link  className="text-white">Bonjour, {user.firstName}</Nav.Link>
                                <Nav.Link onClick={handleLogout} className="text-white">Déconnexion</Nav.Link>
                                </>
                            ):(
                                <>
                                    <Nav.Link as={Link} to="/login" className="text-white">Connexion</Nav.Link>
                                    <Nav.Link as={Link} to="/register" className="text-white">Inscription</Nav.Link>
                                </>
                                
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='header-content'>
                <h1>Bienvenue sur MatchZone</h1>
                <p>Découvrez et participez aux évènements sportifs près de chez vous</p>
            </div>
        </header>
    )
});

export default Header;