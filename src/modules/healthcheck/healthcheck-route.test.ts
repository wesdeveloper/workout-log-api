import HealthcheckController from './healthcheck-controller';

describe('Healthcheck', () => {
  it('Should make an request and receive ok', async () => {
    const healthcheckController = new HealthcheckController();

    const result = HealthcheckController.isOk();

    expect(result.statusCode).toEqual(200);
    expect(result.message).toEqual('Everything is ok');
  });
});
