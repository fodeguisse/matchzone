const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  numberOfPlayers: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'team',
});

module.exports = Team;
