const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

// Create a table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY,
    device_id TEXT NOT NULL,
    value REAL NOT NULL,
    timestamp DATETIME NOT NULL
  )
`);

module.exports = db;
