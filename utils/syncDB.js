const { sequelize } = require('../config/db');


const User = require('../src/models/user.model');
const UserToken = require('../src/models/userToken.model');
const File = require('../src/models/file.model');
const BlackListToken = require('../src/models/blackListToken.model');

console.log('Зарегистрированные модели:', Object.keys(sequelize.models))
console.log(File === undefined ? 'File model not loaded' : 'File model loaded');
(async () => {
	try {
		await sequelize.authenticate();
		console.log('Подключение к БД прошло успешно.');

		await sequelize.sync({ force: true });
		// await sequelize.sync({ alter: true }); 
		console.log('Все модели синхронизированы.');

	} catch (error) {
		console.error('Ошибка при подключении или синхронизации:', error);
	} finally {
		await sequelize.close();
	}
})();