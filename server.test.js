const supertest = require('supertest');
const gjv = require('geojson-validation');
const server = require('./server.js');

const request = supertest(server);

describe('GeoJSON Endpoint', () => {
  it('GET /geojson-data should return valid GeoJSON', async () => {
    const res = await request.get('/geojson-data?bbox=-89,51.28,-88.9,51.29');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(gjv.valid(res.body)).toBe(true);
  });
});
