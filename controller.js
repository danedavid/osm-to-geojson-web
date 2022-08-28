const service = require('./service');

const handleRequest = async (req, res) => {
  try {
    const { bbox } = req.query;
    const [longMin, latMin, longMax, latMax] = bbox.split(',');

    const ret = await service.geoJsonService({
      longMin,
      latMin,
      longMax,
      latMax,
    });

    return res.send(ret);
  } catch (err) {
    console.log('Error in controller: ', err);
    return res.send({ error: 'Internal Servor Error' }).status(500);
  }
};

const controller = { handleRequest };

module.exports = controller;
