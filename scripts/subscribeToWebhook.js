const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const subscribeToWebhook = async () => {
  const machines = [
    "stamping_press_001",
    "welding_robot_006"
  ];

  const callback_url = process.env.NGROK_URL;//TODO : make it in env

  for (const machine_id of machines) {
    try {
      const res = await axios.post('https://manufcaturing-challenge-production.up.railway.app/Webhook', {
        machine:machine_id,
        callback_url
      });
      console.log(res);

      console.log(`Subscribed to ${machine_id}`);
    } catch (error) {
      console.log(error);
      console.error(`Error subscribing to ${machine_id}:`, error.message);
    }
  }
};

subscribeToWebhook();