const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactiver les logs SQL dans la console
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connecté à la base de données via Sequelize.'))
  .catch((err) => console.error('Erreur de connexion à la base de données :', err));

module.exports = sequelize;
