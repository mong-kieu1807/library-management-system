const mysql = require('mysql2');
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env'),
});

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'library_management',
};

const db = mysql.createPool(dbConfig);

const logConnectionResult = (error, connection) => {
    if (error) {
        console.error('Kết nối database thất bại:', error);
        return;
    }

    console.log('Kết nối database thành công!');
    connection.release();
};

db.getConnection(logConnectionResult);

module.exports = db;