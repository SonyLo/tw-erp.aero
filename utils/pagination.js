
const paginate = (query) => {
	const page = parseInt(query.page) || 1;
	const listSize = parseInt(query.list_size) || 10;
	let offset = (page - 1) * listSize

	return {
		listSize: listSize,
		offset: offset,
		page: page
	}

};

module.exports = paginate
