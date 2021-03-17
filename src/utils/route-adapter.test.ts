import routeAdapter from './route-adapter';

const mockFactory = () => {
  const mockController: any = jest.fn((httpRequest) => ({
    status: 200,
    data: httpRequest.body.data,
  }));
  const mockRequest: any = { body: { data: 'teste' }, baseUrl: '/' };
  const mockResponse: any = {
    status: jest.fn((status) => ({
      send: jest.fn((data) => ({ status, data })),
    })),
  };

  return {
    controller: mockController,
    req: mockRequest,
    res: mockResponse,
  };
};

describe('Route adapter', () => {
  it('Should receive a route request and make the adapt', async () => {
    const { controller, req, res } = mockFactory();
    const result = await routeAdapter(controller)(req, res);

    expect(controller).toBeCalledWith({ body: { data: 'teste' } });
    expect(result).toEqual({ status: 200, data: 'teste' });
  });
});

describe('Route adapter', () => {
  it('Should receive a route request and make the adapt', async () => {
    const { controller, req, res } = mockFactory();
    const result = await routeAdapter(controller)(req, res);

    expect(controller).toBeCalledWith({ body: { data: 'teste' } });
    expect(result).toEqual({ status: 200, data: 'teste' });
  });
});
