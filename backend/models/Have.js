const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Team = require('./Team');
const Match = require('./Match');

const Have = sequelize.define('Have', {
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
});

// Relation entre Have et Team
Have.belongsTo(Team, { foreignKey: 'id', as: 'team' });

// Relation entre Have et Match
Have.belongsTo(Match, { foreignKey: 'id_match', as: 'match' });

module.exports = Have;
