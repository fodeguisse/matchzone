const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true        
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },{
        tableName: 'user',
        timestamps: false
    });
};