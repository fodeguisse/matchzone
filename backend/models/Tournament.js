const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Tournament = sequelize.define('Tournament', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  adress: { type: DataTypes.STRING(255), allowNull: false },
  eventDate: { type: DataTypes.DATE, allowNull: false },
  image: { type: DataTypes.STRING(255) },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
});

Tournament.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

module.exports = Tournament;
