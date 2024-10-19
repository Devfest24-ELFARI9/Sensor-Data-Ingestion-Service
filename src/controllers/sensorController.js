const sensorService = require('../services/SensorService');
const conditions = require('../config/conditions'); 

const postSensorData = async (req, res) => {
  const data = req.body;
  console.log(data);
  //TODO: Add validation for data here if needed
  await sensorService.processSensorData(data, conditions[data.machine_id]);
  res.status(200).send('Sensor data processed');
};

module.exports = { postSensorData };
