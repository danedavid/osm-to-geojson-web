const express = require('express');
const app = express();

app.get('/geojson-data', (req, res) => {
  return res.send();
});

module.exports = app;
