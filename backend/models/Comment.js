const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Match = require('./Match');
const Tournament = require('./Tournament');

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false },
});

Comment.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
Comment.belongsTo(Match, { foreignKey: 'id_match', as: 'match' });
Comment.belongsTo(Tournament, { foreignKey: 'id_tournament', as: 'tournament' });

module.exports = Comment;
