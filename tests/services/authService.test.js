// jest.mock('../../src/models/index', () => {
// 	const userMock = {
// 		id: 1,
// 		password_hash: 'hashedpass',
// 		createUserToken: jest.fn().mockResolvedValue(true),
// 	};

// 	return {
// 		User: {
// 			findOne: jest.fn().mockResolvedValue(userMock), // ✅ мок по умолчанию
// 		},
// 		UserToken: {
// 			createUserToken: jest.fn(),
// 			belongsTo: jest.fn(),
// 		},
// 	};
// });

// jest.mock('bcryptjs', () => ({
// 	compare: jest.fn(() => true),
// }));

// jest.mock('../../utils/jwt', () => ({
// 	generateAccessToken: jest.fn(() => 'access_token'),
// 	generateRefreshToken: jest.fn(() => 'refresh_token'),
// }));

// const authService = require('../../src/services/auth.service');
// const { User, UserToken } = require('../../src/models/index');
// const bcrypt = require('bcryptjs');
// const jwt = require('../../utils/jwt');
// const { httpError } = require('../../utils/httpError');

// describe('authService.signin', () => {
// 	const userData = { id: '+79285566780', pass: '79285566780' };
// 	const info = { ip: '127.0.0.1', userAgent: 'jest' };

// 	beforeEach(() => {
// 		jest.clearAllMocks();
// 	});

// 	it('✅ возвращает токены при успешной авторизации', async () => {
// 		const result = await authService.signin(userData, info, 'access_token');

// 		expect(result).toEqual({
// 			tokenAccess: 'access_token',
// 			tokenRefresh: 'refresh_token',
// 		});

// 		expect(User.findOne).toHaveBeenCalledWith({ where: { id: "+79285566780" } });
// 	});

// 	it('❌ пользователь не найден — 404', async () => {
// 		User.findOne.mockResolvedValue(null);

// 		// const result = await authService.signin(userData, info, '');
// 		// expect(result).toEqual(httpError(expect.any(String), 404));
// 		await expect(authService.signin(userData, info, '')).rejects.toThrow('Пользователь не найден');
// 	});

// 	it('❌ неверный пароль — 401', async () => {
// 		User.findOne.mockResolvedValue({ password_hash: 'wrong-hash' });
// 		bcrypt.compare.mockResolvedValue(false);

// 		// const result = await authService.signin(userData, info, '');
// 		// expect(result).toEqual(httpError(expect.any(String), 401));
// 		await expect(authService.signin(userData, info, '')).rejects.toThrow('Неверный пароль');

// 	});

// 	// it('❌ ошибка при создании токена — 400', async () => {
// 	// 	const user = {
// 	// 		id: 1,
// 	// 		password_hash: 'hashedpass',
// 	// 		createUserToken: jest.fn().mockRejectedValue(new Error('fail')),
// 	// 	};

// 	// 	User.findOne.mockResolvedValue(user);

// 	// 	const result = await authService.signin(userData, info, '');
// 	// 	expect(result).toEqual(httpError('fail', 400));
// 	// });
// });



jest.mock('../../src/models/index'); // автоматом подхватит __mocks__/src/models/index.js
jest.mock('bcryptjs', () => ({
	compare: jest.fn(() => true),
}));
jest.mock('../../utils/jwt', () => ({
	generateAccessToken: jest.fn(() => 'access_token'),
	generateRefreshToken: jest.fn(() => 'refresh_token'),
}));

const authService = require('../../src/services/auth.service');
const { User } = require('../../src/models/index');
const bcrypt = require('bcryptjs');
const jwt = require('../../utils/jwt');

describe('authService.signin', () => {
	const userData = { id: '+79285566780', pass: '79285566780' };
	const info = { ip: '127.0.0.1', userAgent: 'jest' };

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('✅ возвращает токены при успешной авторизации', async () => {
		const userMock = {
			id: userData.id,
			password_hash: 'hashedpass',
			createUserToken: jest.fn().mockResolvedValue(true),
		};

		User.findOne.mockResolvedValue(userMock);

		const result = await authService.signin(userData, info, 'access_token');

		expect(result).toEqual({
			tokenAccess: 'access_token',
			tokenRefresh: 'refresh_token',
		});

		expect(User.findOne).toHaveBeenCalledWith({ where: { id: userData.id } });
		expect(userMock.createUserToken).toHaveBeenCalled();
	});

	it('❌ пользователь не найден — 404', async () => {
		User.findOne.mockResolvedValue(null);

		await expect(authService.signin(userData, info, '')).rejects.toThrow('Пользователь не найден');
	});

	it('❌ неверный пароль — 401', async () => {
		User.findOne.mockResolvedValue({ password_hash: 'wrong-hash', createUserToken: jest.fn() });
		bcrypt.compare.mockResolvedValue(false);

		await expect(authService.signin(userData, info, '')).rejects.toThrow('Неверный пароль');
	});
});
