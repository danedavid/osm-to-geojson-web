const express = require('express');
const controller = require('./controller');

const app = express();

app.get('/geojson-data', controller.handleRequest);

module.exports = app;
