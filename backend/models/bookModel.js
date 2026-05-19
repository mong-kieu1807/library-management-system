const db = require('../config/db');
const GET_ALL_BOOKS_QUERY = 'SELECT * FROM books ORDER BY book_id DESC';

const getAllBooks = (callback) => {
	db.query(GET_ALL_BOOKS_QUERY, callback);
};

module.exports = {
	getAllBooks,
};
