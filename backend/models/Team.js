const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Team = sequelize.define('Team', {
  id_team: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  numberOfPlayers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'team',
  timestamps: false,
});

module.exports = Team;
