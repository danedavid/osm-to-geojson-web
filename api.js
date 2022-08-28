const { OSM_BASE_URL } = require('./constants');

const osmApi = (params) => `${OSM_BASE_URL}?${params}`;

module.exports = {
  osmApi,
};
