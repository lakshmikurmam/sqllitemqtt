const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org:1883'; // Change this to your MQTT broker URL
const TOPIC = 'sensor_data';

// Connect to MQTT broker
const client = mqtt.connect(MQTT_BROKER_URL);

// Connect to SQLite database
const db = new sqlite3.Database('data.db');

// Handle incoming messages from MQTT
client.on('message', (topic, message) => {
  // Assuming the message is in JSON format
  const data = JSON.parse(message);

  // Store the data in the SQLite database
  db.run('INSERT INTO sensor_data (device_id, value, timestamp) VALUES (?, ?, ?)', [data.device_id, data.value, data.timestamp], (err) => {
    if (err) {
      console.error('Error inserting data into the database:', err.message);
    } else {
      console.log('Data inserted into the database.');
    }
  });
});

client.on('connect', () => {
  console.log('MQTT Consumer connected.');

  // Subscribe to the MQTT topic to consume messages
  client.subscribe(TOPIC);
});

// Close the database connection and MQTT connection when Node.js exits
process.on('exit', () => {
  db.close();
  client.end();
});
