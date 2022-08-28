const axios = require('axios');
const queryString = require('query-string');
const osmtogeojson = require('osmtogeojson');

const { osmApi } = require('./api');

const geoJsonService = async ({ latMin, longMin, latMax, longMax }) => {
  try {
    const stringified = queryString.stringify({
      bbox: `${latMin},${longMin},${latMax},${longMax}]`,
    });

    const response = await axios.get(osmApi(stringified));
    const geojson = osmtogeojson(response.data);

    return geojson;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  geoJsonService,
};
