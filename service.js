const axios = require('axios');
const queryString = require('query-string');
const osmtogeojson = require('osmtogeojson');
const { osmApi } = require('./api');
const { BadRequestError } = require('./errors');

const geoJsonService = async ({ longMin, latMin, longMax, latMax }) => {
  try {
    const stringified = queryString.stringify({
      bbox: `${longMin},${latMin},${longMax},${latMax}]`,
    });

    const response = await axios.get(osmApi(stringified));
    const geojson = osmtogeojson(response.data);

    return geojson;
  } catch (err) {
    if (err?.response?.status === 400) {
      return Promise.reject(new BadRequestError(err.response.data));
    }
    console.error('Error in geoJsonService: ', err)
    return Promise.reject();
  }
};

module.exports = {
  geoJsonService,
};
