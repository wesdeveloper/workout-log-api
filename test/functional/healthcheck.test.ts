describe('Healthcheck functional tests', () => {
  it('Should make a request and receive a statusCode 200', async () => {
    const response = await global.testRequest.get('/healthcheck');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Ok' });
  });
});
