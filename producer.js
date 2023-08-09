const mqtt = require('mqtt');

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org:1883'; // Change this to your MQTT broker URL
const TOPIC = 'MC/V1/AUT/au1/OSPMS/GEN/E0009/Status_Plant_Remote';

// Connect to MQTT broker
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('MQTT Publisher connected.');

  // Sample sensor data
  const data = {
    value: 'sensor008',
    timestamp: new Date().toISOString(),
  };

  // Publish the data to the MQTT topic
  client.publish(TOPIC, JSON.stringify(data));
  console.log('Published data:', data);

  // Close the MQTT connection after publishing
  client.end();
});
