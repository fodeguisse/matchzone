const User = require('./User');
const Tournament = require('./Tournament');
const Match = require('./Match');
const Team = require('./Team');
const Comment = require('./Comment');
const Have = require('./Have');
const Join = require('./Join');
const Participate = require('./Participate');

// Relations User -> Tournament
User.hasMany(Tournament, { foreignKey: 'id_user' });
Tournament.belongsTo(User, { foreignKey: 'id_user' });

// Relations User -> Match
User.hasMany(Match, { foreignKey: 'id_user' });
Match.belongsTo(User, { foreignKey: 'id_user' });

// Relations Tournament -> Match
Tournament.hasMany(Match, { foreignKey: 'id_tournament' });
Match.belongsTo(Tournament, { foreignKey: 'id_tournament' });

// Relations User -> Team
User.hasMany(Team, { foreignKey: 'id_user' });
Team.belongsTo(User, { foreignKey: 'id_user' });

// Relations Team -> Tournament (through Participate)
Team.belongsToMany(Tournament, {
  through: Participate,
  foreignKey: 'id_team',
});
Tournament.belongsToMany(Team, {
  through: Participate,
  foreignKey: 'id_tournament',
});

// Relations Team -> Match (through Have)
Team.belongsToMany(Match, {
  through: Have,
  foreignKey: 'id_team',
});
Match.belongsToMany(Team, {
  through: Have,
  foreignKey: 'id_match',
});

// Relations User -> Comment
User.hasMany(Comment, { foreignKey: 'id_user' });
Comment.belongsTo(User, { foreignKey: 'id_user' });

// Relations Match -> Comment
Match.hasMany(Comment, { foreignKey: 'id_match' });
Comment.belongsTo(Match, { foreignKey: 'id_match' });

// Relations Tournament -> Comment
Tournament.hasMany(Comment, { foreignKey: 'id_tournament' });
Comment.belongsTo(Tournament, { foreignKey: 'id_tournament' });

// Relations Match -> Join
Match.hasMany(Join, { foreignKey: 'id_match' });
Join.belongsTo(Match, { foreignKey: 'id_match' });

// Relations User -> Join
User.hasMany(Join, { foreignKey: 'id_user' });
Join.belongsTo(User, { foreignKey: 'id_user' });

// Relations Tournament -> Participate
Tournament.hasMany(Participate, { foreignKey: 'id_tournament' });
Participate.belongsTo(Tournament, { foreignKey: 'id_tournament' });

// Relations Team -> Participate
Team.hasMany(Participate, { foreignKey: 'id_team' });
Participate.belongsTo(Team, { foreignKey: 'id_team' });

module.exports = {
  User,
  Tournament,
  Match,
  Team,
  Comment,
  Have,
  Join,
  Participate,
};
