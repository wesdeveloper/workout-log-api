describe('Functional - User', () => {
  it('Should GET /user and return status code 200', async () => {
    const result = await global.testRequest.get('/user');
    expect(200).toEqual(result.status);
  });
});
