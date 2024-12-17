const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Join = sequelize.define('Join', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_match: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'join',
  timestamps: false,
});

module.exports = Join;
