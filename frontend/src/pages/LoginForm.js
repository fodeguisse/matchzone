import React, {useState, useContext} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import '../styles/Form.css';

function LoginForm() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {email, password});
            
            //Sauvergarde de l'utilisateur dans le localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            
            //alert("Connexion réussie");

            navigate('/dashboard');
        } catch (error) {
            console.error("erreur lors de la connexion : ", error);
            const errorMessage = error.response?.data?.error || "Erreur inconue lors de la connexion";
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' required />
            <button type='submit'>Se connecter</button>
        </form>
    )
}

export default LoginForm;
