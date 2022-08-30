const axios = require('axios');
const osmtogeojson = require('osmtogeojson');
const service = require('./service');
const apis = require('./api');
const { BadRequestError } = require('./errors');

jest.mock('axios');
jest.mock('osmtogeojson');
jest.mock('./api');

describe('geoJsonService', () => {
  const mockValues = { longMin: 1, latMin: 2, longMax: 3, latMax: 4 };
  const mockRet = { testValue: 'geojson' };
  const mockUrl = '/test/123';
  apis.osmApi.mockReturnValue(mockUrl);
  osmtogeojson.mockReturnValue(mockRet);

  beforeEach(() => {
    axios.get.mockReset();
  });

  it('returns GeoJSON', async () => {
    axios.get.mockResolvedValue({ data: 'test' });

    const ret = await service.geoJsonService(mockValues);

    expect(axios.get.mock.calls.length).toBe(1);
    expect(axios.get.mock.calls[0][0]).toBe(mockUrl);
    expect(osmtogeojson.mock.calls.length).toBe(1);
    expect(ret).toStrictEqual(mockRet);
  });

  it('throws BadRequestError', async () => {
    axios.get.mockRejectedValue({ response: { status: 400 } });
    await expect(service.geoJsonService(mockValues)).rejects.toThrow(
      BadRequestError
    );
  });
});
