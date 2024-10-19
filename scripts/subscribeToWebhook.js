const axios = require('axios');

const subscribeToWebhook = async () => {
  const machines = [
    "welding_robot_006",
     "stamping_press_001", "painting_robot_002","agv_003", "cnc_milling_004", "leak_test_005"
  ];

  const callback_url = 'https://a8e3-197-204-117-91.ngrok-free.app/api/sensor-data';//TODO : make it in env

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