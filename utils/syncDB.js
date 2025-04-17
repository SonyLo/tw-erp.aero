const { sequelize } = require('../config/db');


User = require('../src/models/user.model');
UserToken = require('../src/models/userToken.model');
File = require('../src/models/file.model');

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Подключение к БД прошло успешно.');

		await sequelize.sync({ alter: true }); // или sync({ force: true }) для удаления и создания заново
		console.log('Все модели синхронизированы.');

	} catch (error) {
		console.error('Ошибка при подключении или синхронизации:', error);
	} finally {
		await sequelize.close();
	}
})();