const supertest = require('supertest');
const gjv = require('geojson-validation');
const server = require('./server.js');

const request = supertest(server);

const badRequestTestCases = [
  { url: '/geojson-data?bbox=-89,51.28' },
  { url: '/geojson-data' },
  { url: '/geojson-data?bbox=,,,' },
  { url: '/geojson-data?bbox=100,100,100,100' }, // invalid value for latitude
  { url: '/geojson-data?bbox=1.23,1.44,1.13,1.34' }, // min > max
  { url: '/geojson-data?bbox=-179.489,1.22,-0.516,9.286' }, // large area
];

describe('GeoJSON Endpoint', () => {
  it('should return valid GeoJSON', async () => {
    const res = await request.get('/geojson-data?bbox=-89,51.28,-88.9,51.29');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(gjv.valid(res.body)).toBe(true);
  });

  it('should return 400 for invalid query params', async () => {
    for (const testCase of badRequestTestCases) {
      const res = await request.get(testCase.url);

      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.status).toEqual(400);
    }
  });
});
