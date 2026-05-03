const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'library_management'
});
db.connect((err) => {
    if (err) {
        console.error('Kết nối database thất bại:', err);
    } else {
        console.log('Kết nối database thành công!');
    }
});
module.exports = db;