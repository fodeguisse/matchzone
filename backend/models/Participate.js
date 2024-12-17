const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Participate = sequelize.define('Participate', {
  id_tournament: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_team: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'participate',
  timestamps: false,
});

module.exports = Participate;
