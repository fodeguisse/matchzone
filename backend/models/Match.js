const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Match', {
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
        tableName: 'match',
        timestamps: false
    });

    Match.associate = (models) => {
        Match.belongsTo(models.User, { foreignKey: 'id_user', as: 'creator' });
        //Match.belongsTo(models.Tournament, { foreignKey: 'id_tournament', as: 'tournament' });
        Match.hasMany(models.Participation, { foreignKey: 'id_match', as: 'participants' });
    };

    return Match;
}
