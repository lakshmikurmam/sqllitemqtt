const mqtt = require('mqtt');
const sqlite3 = require('sqlite3').verbose();
const username = "gepc-subs";
    const password = "14d1b530";
    const clientId = "f44a7c6a-219f-417d-9a1d-f2bafd38ad53";
    const host = "10.246.0.10:1883";
const MQTT_BROKER_URL1 = 'mqtt://test.mosquitto.org:1883';
const TOPIC = 'MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote';
const MQTT_BROKER_URL='mqtt://${this.username}:${this.password}@${this.host}'
// Connect to MQTT broker
const client1 = mqtt.connect(MQTT_BROKER_URL);
const client = mqtt.connect(MQTT_BROKER_URL);
// Connect to SQLite database
const db = new sqlite3.Database('data.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Handle incoming messages from MQTT
client.on('message', (topic, message) => {
  try {
    const data = JSON.parse(message);
    console.log(data);
    // Store the data in the SQLite database
    db.run('INSERT INTO Message (value, timestamp) VALUES ( ?, ?)', [data.value, data.timestamp], (err) => {
      if (err) {
        console.error('Error inserting data into the database:', err.message);
      } else {
        console.log('Data inserted into the database.');
      }
    });
  } catch (error) {
    console.error('Error processing MQTT message:', error.message);
  }
});

client.on('connect', () => {
  console.log('MQTT Consumer connected.');

  // Subscribe to the MQTT topic to consume messages
  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error('Error subscribing to topic:', err.message);
    } else {
      console.log(`Subscribed to topic: ${TOPIC}`);
    }
  });
});

// Close the database connection and MQTT connection when Node.js exits
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });

  client.end();
});
