const express = require('express');
const cors = require("cors");
const db = require("./config/db");
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    db.query("SELECT * FROM books LIMIT 1", (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Lỗi query");
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});