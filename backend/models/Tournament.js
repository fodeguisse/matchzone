const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Tournament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true        
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        adress: {
            type:DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type:DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type:DataTypes.DATE,
            allowNull: false
        },
        eventDate: {
            type:DataTypes.DATE,
            allowNull: false
        },
        image: {
            type:DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'tournament',
        timestamps: false
    });
}
