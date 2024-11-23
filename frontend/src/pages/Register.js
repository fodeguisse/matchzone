import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.');
      return;
    }
    try {
      console.log('Données envoyées pour inscription :', formData);
      await axios.post('http://localhost:5000/api/users/register', formData);
      setSuccess('Inscription réussie ! Vous pouvez vous connecter.');
      setError('');
      setFormData({ firstName: '', lastName: '', email: '', password: '', phone: '' });
    } catch (err) {
      console.error('Erreur côté frontend:', err.response?.data); // Log plus précis
      const backendError = err.response?.data?.errors || [{ msg: err.response?.data?.message || 'Erreur lors de l’inscription.' }];
      setError(backendError.map(error => error.msg).join(', '));
    }    
  };

  return (
    <div className="register">
      <h2>Inscription</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
};

export default Register;
