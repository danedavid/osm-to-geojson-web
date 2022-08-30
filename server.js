const path = require('path');
const express = require('express');
const routes = require('./routes');
const controller = require('./controller');
const validator = require('./validator');

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(validator);

app.get(routes.getGeoJSON, controller.handleRequest);

// all other GET requests will load the client app
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

module.exports = app;
