const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Tournament = sequelize.define('Tournament', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  maxNumberTeams: { type: DataTypes.INTEGER, allowNull: false },
  adress: { type: DataTypes.STRING(255), allowNull: false },
  eventDate: { type: DataTypes.DATE, allowNull: false },
  image: { type: DataTypes.STRING(255) },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'tournament',
});

module.exports = Tournament;
