const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "180705",
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