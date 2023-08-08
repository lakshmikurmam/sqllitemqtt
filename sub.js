const db = require('./database'); 
db.run('INSERT INTO sensor_data (device_id, value, timestamp) VALUES (?, ?, ?)', ['test_device', 42, new Date().toISOString()], (err) => {
    if (err) {
      console.error('Error inserting data into the database:', err.message);
    } else {
      console.log('Sample data inserted into the database.');
    }
  });
  