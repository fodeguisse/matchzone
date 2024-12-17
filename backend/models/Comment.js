const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Comment = sequelize.define('Comment', {
  id_comment: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_match: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_tournament: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'comment',
  timestamps: false,
});

module.exports = Comment;
