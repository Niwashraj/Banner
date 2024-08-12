const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'banner_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

// Get banner data
app.get('/getBanner', (req, res) => {
    const query = 'SELECT * FROM banner LIMIT 1';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Update banner data
app.post('/updateBanner', (req, res) => {
    const { description, link, timer, isVisible } = req.body;
    const query = `
        INSERT INTO banner (description, link, timer, isVisible)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE description = VALUES(description), link = VALUES(link), timer = VALUES(timer), isVisible = VALUES(isVisible)
    `;
    db.query(query, [description, link, timer, isVisible], (err, results) => {
        if (err) throw err;
        res.json({ description, link, timer, isVisible });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
