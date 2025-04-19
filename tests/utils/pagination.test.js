// const sum = require('../../src/services/sum');

const pagination = require('../../utils/pagination')

const query = {
	page: 2,
	list_size: 4
}

test('должен вернуть объект с праметрамми для пагинации', () => {
	expect(pagination(query)).toEqual({
		listSize: 4,
		offset: 4,
		page: 2
	});
});