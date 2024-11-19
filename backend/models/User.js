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

    User.associate = (models) => {
        User.hasMany(models.Match, { foreignKey : 'id_user', as: 'matches'});
        User.hasMany(models.Tournament, { foreignKey : 'id_user', as: 'tournaments'});
        User.hasMany(models.Match, { foreignKey : 'id_user', as: 'createMatches'});
        User.hasMany(models.Participation, { foreignKey : 'id_user', as: 'participations'});
    };

    return User;
};