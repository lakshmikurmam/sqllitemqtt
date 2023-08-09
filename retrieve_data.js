const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('data.db');

// Query data from the 'sensor_data' table
db.all('SELECT * FROM Message', (err, rows) => {
  if (err) {
    console.error('Error querying data from the database:', err.message);
  } else {
    // Print the retrieved data
    console.log('Retrieved data from the database:');
    rows.forEach((row) => {
      console.log(`ID: ${row.id}, Value: ${row.value}, Timestamp: ${row.timestamp}`);
    });
  }

  // Close the database connection
  db.close();
});
