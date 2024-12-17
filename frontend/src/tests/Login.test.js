import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import Login from '../components/Login';

jest.mock('axios');

describe('Composant Login', () => {
  it('devrait afficher le formulaire de connexion', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
  });

  it('devrait afficher une erreur si la connexion échoue', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Erreur lors de la connexion.' } },
    });

    render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Se connecter'));

    const errorMessage = await screen.findByText('Erreur lors de la connexion.');
    expect(errorMessage).toBeInTheDocument();
  });
});
