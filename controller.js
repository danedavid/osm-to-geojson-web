const service = require('./service');

const handleRequest = async (req, res) => {
  try {
    const { bbox } = req.query;
    const [lat_min, long_min, lat_max, long_max] = bbox.split(',');

    const ret = await service.geoJsonService({
      latMin: lat_min,
      longMin: long_min,
      latMax: lat_max,
      longMax: long_max,
    });

    return res.send(ret);
  } catch (err) {
    console.log('Error in controller: ', err);
    return res.send({ error: 'Internal Servor Error' }).status(500);
  }
};

const controller = { handleRequest };

module.exports = controller;
