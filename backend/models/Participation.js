const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true        
        }
    },{
        tableName: 'participation',
        timestamps: false
    });

    Participation.associate = (models) => {
        Participation.belongsTo(models.User, { foreignKey : 'id_user', as: 'matches'});
        Participation.belongsTo(models.Match, { foreignKey : 'id_match', as: 'match'});
    };

    return Participation;
};