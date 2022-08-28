const service = require('./service');
const { BadRequestError } = require('./errors');

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
    if (err instanceof BadRequestError) {
      return res.status(400).send({ error: err.message });
    }
    console.log('Error in controller: ', err);
    return res.status(500).send({ error: 'Internal Servor Error' });
  }
};

const controller = { handleRequest };

module.exports = controller;
