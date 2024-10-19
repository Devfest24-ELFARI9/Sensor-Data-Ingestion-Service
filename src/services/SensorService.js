require('dotenv').config();
const { sendMessage, consumeMessages } = require('../utils/rabbitMQUtils');
const checkConditions = require('../utils/checkConditions');
const alertService = require('./alertService');

const processSensorData = async (data, conditions) => {
  if (checkConditions(data, conditions)) {
    const alertMessage = {
      machineId: data.machineId,
      type: data.type, // TODO: define the type of alerts in an external file
      value: data.value,
      timestamp: data.timestamp,
    };
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