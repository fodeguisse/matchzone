const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/sequelize');
const userRoutes = require('./routes/userRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const matchRoutes = require('./routes/matchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/matches', matchRoutes);

sequelize.sync({ alter: true }) // Crée les tables si elles n'existent pas ou les modifie si elles ont changé
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Erreur lors de la synchronisation avec la base de données :', err));
