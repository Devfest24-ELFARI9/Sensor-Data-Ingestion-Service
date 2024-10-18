const express = require('express');
const bodyParser = require('body-parser');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api', sensorRoutes);

module.exports = app;
