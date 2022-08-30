import validator from 'validator';
import { ERROR_MESSAGES } from './constants';

const validations = {
  exists: {
    validate: (values) => {
      const { minLong, minLat, maxLong, maxLat } = values;
      return minLong && minLat && maxLong && maxLat;
    },
    errMessage: ERROR_MESSAGES.exists,
  },
  invalid: {
    validate: (values) => {
      const { minLong, minLat, maxLong, maxLat } = values;
      return (
        validator.isLatLong(`${minLat},${minLong}`) &&
        validator.isLatLong(`${maxLat},${maxLong}`)
      );
    },
    errMessage: ERROR_MESSAGES.invalid,
  },
  minMax: {
    validate: (values) => {
      const { minLong, minLat, maxLong, maxLat } = values;
      return (
        parseFloat(minLat) < parseFloat(maxLat) &&
        parseFloat(minLong) < parseFloat(maxLong)
      );
    },
    errMessage: ERROR_MESSAGES.minMax,
  },
};

export default validations;
