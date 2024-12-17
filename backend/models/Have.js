const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Have = sequelize.define('Have', {
  id_team: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_match: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'have',
  timestamps: false,
});

module.exports = Have;
