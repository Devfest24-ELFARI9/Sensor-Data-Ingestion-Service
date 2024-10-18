require('dotenv').config();
const { sendMessage } = require('../utils/rabbitMQUtils');

const queue = 'alert-queue';

const sendAlert = async (alertMessage) => {
  try {
    await sendMessage(queue, JSON.stringify(alertMessage));
    console.log('Alert sent successfully');
  } catch (error) {
    console.error('Failed to send alert:', error);
  }
};

module.exports = sendAlert;