require('dotenv').config();
const { sendMessage, consumeMessages } = require('../utils/rabbitMQUtils');
const checkConditions = require('../utils/checkConditions');
const alertService = require('./alertService');

const processSensorData = async (data, conditions) => {
  const alerts = [];
  
  // Loop through each metric in the data and check against conditions
  for (const [metric, value] of Object.entries(data)) {
    if (conditions[metric]) {
      const { threshold, operator } = conditions[metric];
      switch (operator) {
        case '>':
          if (value > threshold) {
            alerts.push({ machine_id: data.machine_id, type: metric, value, timestamp: data.timestamp });
          }
          break;
        case '<':
          if (value < threshold) {
            alerts.push({ machine_id: data.machine_id, type: metric, value, timestamp: data.timestamp });
          }
          break;
        case '>=':
          if (value >= threshold) {
            alerts.push({ machine_id: data.machine_id, type: metric, value, timestamp: data.timestamp });
          }
          break;
        case '<=':
          if (value <= threshold) {
            alerts.push({ machine_id: data.machine_id, type: metric, value, timestamp: data.timestamp });
          }
          break;
        default:
          break;
      }
    }
  }

  // Send alerts if any
  for (const alertMessage of alerts) {
    await alertService.sendAlert(alertMessage);
  }


  // Publish to the sensor-data queue
  const queue = 'sensor-data';
  const queue2 = 'power_consumption';


  await sendMessage(queue, JSON.stringify(data));
  console.log('Sensor data sent to queue:', data);

  if (data.power_consumption !== undefined && data.power_consumption !== null) {
    await sendMessage(queue2, JSON.stringify(data.power_consumption));
    console.log('Energy data sent to queue:', data.power_consumption);
  }
  
};


module.exports = { processSensorData };