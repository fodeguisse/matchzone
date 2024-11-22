const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  numberOfPlayers: { type: DataTypes.INTEGER, allowNull: false },
});

Team.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

module.exports = Team;
