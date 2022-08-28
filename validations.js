const { query } = require('express-validator');
const validator = require('validator');
const routes = require('./routes');

module.exports = {
  [routes.getGeoJSON]: {
    GET: [
      query('bbox')
        .isLength({ min: 7, max: 50 })
        .contains(',', { minOccurrences: 3 })
        .custom((bboxValue) => {
          const [minLong, minLat, maxLong, maxLat] = bboxValue.split(',');

          return (
            validator.isLatLong(`${minLat},${minLong}`) &&
            validator.isLatLong(`${maxLat},${maxLong}`)
          );
        }),
    ],
  },
};
