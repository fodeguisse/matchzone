import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import '../styles/Header.css';

const Header = (()=>{
    return(
        <header className='header'>
            <Navbar expanded="lg" className='navbar-custom'>
                <Container>
                    <Navbar.Brand href='/' className='text-white'>MatchZone</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbar-nav'/>
                    <Navbar.Collapse id='navbar-nav'>
                        <Nav className='ml-auto'>
                            <Nav.Link href="/" className="text-white">Acceuil</Nav.Link>
                            <Nav.Link href="/matches" className="text-white">Matches</Nav.Link>
                            <Nav.Link href="/tournaments" className="text-white">Tournois</Nav.Link>
                            <Nav.Link href="/login" className="text-white">Connexion</Nav.Link>
                            <Nav.Link href="/signup" className="text-white">Inscription</Nav.Link>
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