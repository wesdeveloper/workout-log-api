import HealthcheckController from './healthcheck-controller';

const healthcheckController = new HealthcheckController();

describe('Healthcheck controller', () => {
  it('Should receive a request and return 200 ok', async () => {
    const httpRequest:any = {};
    const result = await healthcheckController.isHealthcheck(httpRequest);

    const expectedResult = {
      status: 200,
      body: { message: 'Ok' },
    };
    expect(result).toEqual(expectedResult);
  });
});
