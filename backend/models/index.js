const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config')['development']

const sequelize = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    dialect: config.dialect
});

const db = {sequelize, Sequelize};

db.User = require('./User')(sequelize, DataTypes);
db.Match = require('./Match')(sequelize, DataTypes);
db.Tournament = require('./Tournament')(sequelize, DataTypes);
db.Tournament = require('./Participation')(sequelize, DataTypes);


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
})

module.exports = db;