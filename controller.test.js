const controller = require('./controller');
const service = require('./service');
const { BadRequestError } = require('./errors');

jest.mock('./service');

describe('handleRequest', () => {
  const responseSend = jest.fn();
  const responseStatus = jest.fn();
  responseStatus.mockImplementation(() => ({
    send: responseSend,
  }));
  const mockRequest = {
    query: { bbox: '1,2,3,4' },
  };

  beforeEach(() => {
    responseSend.mockClear();
    responseStatus.mockClear();
    service.geoJsonService.mockReset();
  });

  it('responds with values', async () => {
    const mockResponse = { send: responseSend };
    const mockRet = { testValue: 'geojson' };
    service.geoJsonService.mockResolvedValue(mockRet);

    await controller.handleRequest(mockRequest, mockResponse);

    expect(responseSend.mock.calls.length).toBe(1);
    expect(responseSend.mock.calls[0][0]).toBe(mockRet);
  });

  it('handles bad request exception', async () => {
    const mockResponse = { status: responseStatus };
    service.geoJsonService.mockImplementation(async () => {
      return Promise.reject(new BadRequestError());
    });

    await controller.handleRequest(mockRequest, mockResponse);

    expect(responseStatus.mock.calls.length).toBe(1);
    expect(responseStatus.mock.calls[0][0]).toBe(400);
  });

  it('handles unknown exception', async () => {
    const mockResponse = { status: responseStatus };
    service.geoJsonService.mockImplementation(async () => {
      return Promise.reject('Unknown Error');
    });

    await controller.handleRequest(mockRequest, mockResponse);

    expect(responseStatus.mock.calls.length).toBe(1);
    expect(responseStatus.mock.calls[0][0]).toBe(500);
    expect(responseSend.mock.calls[0][0]).toStrictEqual({
      error: 'Internal Servor Error',
    });
  });
});
