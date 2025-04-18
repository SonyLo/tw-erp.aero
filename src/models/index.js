const User = require('./user.model');
const UserToken = require('./userToken.model');

// Объявляем связи здесь
User.hasMany(UserToken, { foreignKey: 'user_id' });
UserToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
	User,
	UserToken,
};
