import React, {useState} from 'react';
import axios from "axios";
import '../styles/Form.css';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !phone ) {
            alert("Tous les champs sont obligatoires !");
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', {
                firstName, 
                lastName, 
                email, 
                password,
                phone
            });

            alert("Inscription réussie ! veuillez vous connecter");
        } catch (error) {
            console.error("Erreur lors de l'inscription : ", error.response?.data || error);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input 
                type='text' 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder='Prénom' 
                required 
            />
            <input 
                type='text' 
                value={lastName} 
                onChange={(e) => setLstName(e.target.value)} 
                placeholder='Nom' 
                required 
            />
            <input 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='Email' 
                required 
            />
            <input 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Mot de passe' 
                required 
            />
            <input 
                type='text' 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder='Téléphone'
            />
            <button type='submit'>S'inscrire</button>
        </form>
    )
}

export default RegisterForm;
