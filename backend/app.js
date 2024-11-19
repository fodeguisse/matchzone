const express = require('express');
const {sequelize} = require('./models/index');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const app = express();

app.use(express.json());

//Synchroniser les modèles avec la base de données
sequelize.sync()
    .then(()=> console.log("Base de données synchronisée"))
    .catch(()=> console.error("Erreur de synchronisation : ", error));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/tournaments', tournamentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));

// // démarrer le serveur et se connecter à la base
// const starServer = async() => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connexion à la base de données reussie !')
//     } catch (error) {
//         console.error('Impossible de se connecter à la base de données : ', error);
//     }
// }

// starServer();

