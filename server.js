const express = require('express');
const routes = require('./routes');
const controller = require('./controller');
const validator = require('./validator');

const app = express();

app.use(validator);

app.get(routes.getGeoJSON, controller.handleRequest);

module.exports = app;
