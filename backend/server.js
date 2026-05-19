const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_ERROR_MESSAGE = 'Lỗi kết nối database';

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.get('/', (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM books', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(DATABASE_ERROR_MESSAGE);
        }

        res.json({
            message: 'Backend is connected to MySQL',
            booksCount: results[0].total,
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});