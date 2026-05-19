const bookModel = require('../models/bookModel');

const BOOKS_QUERY_ERROR_MESSAGE = 'Không thể lấy dữ liệu từ MySQL';

const getBooks = (req, res) => {
	bookModel.getAllBooks((err, results) => {
		if (err) {
			console.error('Lỗi lấy danh sách sách:', err);
			return res.status(500).json({ message: BOOKS_QUERY_ERROR_MESSAGE });
		}

		res.json(results);
	});
};

module.exports = {
	getBooks,
};
