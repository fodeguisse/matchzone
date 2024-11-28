const User = require('./User');
const Tournament = require('./Tournament');
const Match = require('./Match');
const Team = require('./Team');
const Comment = require('./Comment');
const Have = require('./Have');
const Join = require('./Join');
const Participate = require('./Participate');

// Relations
User.hasMany(Tournament, { foreignKey: 'id_user' });
Tournament.belongsTo(User, { foreignKey: 'id_user' });

User.hasMany(Match, { foreignKey: 'id_user' });
Match.belongsTo(User, { foreignKey: 'id_user' });

Match.belongsTo(Tournament, { foreignKey: 'id_tournament' });

Team.belongsTo(User, { foreignKey: 'id_user' });

Comment.belongsTo(User, { foreignKey: 'id_user' });
Comment.belongsTo(Match, { foreignKey: 'id_match' });
Comment.belongsTo(Tournament, { foreignKey: 'id_tournament' });

Have.belongsTo(Team, { foreignKey: 'id' });
Have.belongsTo(Match, { foreignKey: 'id_match' });

Join.belongsTo(User, { foreignKey: 'id' });
Join.belongsTo(Match, { foreignKey: 'id_match' });

Participate.belongsTo(Team, { foreignKey: 'id' });
Participate.belongsTo(Tournament, { foreignKey: 'id_tournament' });
Match.belongsTo(User, { as: 'creator', foreignKey: 'id_user' });
User.hasMany(Match, { as: 'matches', foreignKey: 'id_user' });

Join.belongsTo(Match, { foreignKey: 'id_match' });
Join.belongsTo(User, { foreignKey: 'id' });

Match.hasMany(Join, { foreignKey: 'id_match' });

Tournament.belongsTo(User, { as: 'creator', foreignKey: 'id_user' });
User.hasMany(Tournament, { as: 'tournaments', foreignKey: 'id_user' });

Participate.belongsTo(Tournament, { foreignKey: 'id_tournament' });
Participate.belongsTo(Team, { foreignKey: 'id' });

Tournament.belongsToMany(Team, {
  through: Participate,
  as: 'teams',
  foreignKey: 'id_tournament',
});
Team.belongsToMany(Tournament, {
  through: Participate,
  as: 'tournaments',
  foreignKey: 'id',
});

module.exports = { User, Tournament, Match, Team, Comment, Have, Join, Participate };
