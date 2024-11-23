const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Match = require('./Match');

const Join = sequelize.define('Join', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    allowNull: false
  },
  id_match: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    allowNull: false 
  }
}, {
  tableName: 'join',
  timestamps: false,
});

// Relation entre Join et User
Join.belongsTo(User, { foreignKey: 'id', as: 'user' });

// Relation entre Join et Match
Join.belongsTo(Match, { foreignKey: 'id_match', as: 'match' });

module.exports = Join;
