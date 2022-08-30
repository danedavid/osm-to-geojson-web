import axios from 'axios';

export const fetchGeoJSON = async ({ minLong, minLat, maxLong, maxLat }) => {
  try {
    const res = await axios.get(
      `/geojson-data?bbox=${minLong},${minLat},${maxLong},${maxLat}`
    );
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
};
