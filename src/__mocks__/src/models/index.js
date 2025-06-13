const userMock = {
	id: '+79285566780',
	password_hash: 'hashedpass',
	createUserToken: jest.fn().mockResolvedValue(true),
};

module.exports = {
	User: {
		findOne: jest.fn().mockResolvedValue(userMock),
	},
	UserToken: {
		createUserToken: jest.fn(),
		belongsTo: jest.fn(),
	},
};
