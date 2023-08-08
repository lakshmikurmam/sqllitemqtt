const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 80;

// Connect to the SQLite database
const db = new sqlite3.Database('data/mydatabase.db');

// Create a table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT
  )
`);

// Insert data
db.run(`INSERT INTO users (name) VALUES ('John Doe')`);

// Retrieve data
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
