describe('Functional test - User service', () => {
  it('should create one user and return it!', async () => {
    const userMock = {
      age: 21,
      height: 1.82,
      lastName: 'Santos',
      name: 'Marcos',
      nickname: 'Marcos Santos',
      wheight: 81,
      gender: 'M',
    };

    const { body: userCreated, status } = await global.testRequest
      .post('/user')
      .send(userMock);

    expect(status).toEqual(201);
    expect(userCreated).toEqual(expect.objectContaining({
      ...userMock,
      id: expect.any(Number),
    }));
  });
});
