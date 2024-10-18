const sensorService = require('../services/SensorService');

const postSensorData = async (req, res) => {
  const data = req.body;
  console.log(data);
  //TODO: Add validation for data here if needed
  const conditions = { "temperature": { "threshold": 100, "operator": ">" } };
  await sensorService.processSensorData(data, conditions);
  res.status(200).send('Sensor data processed');
};

module.exports = { postSensorData };
