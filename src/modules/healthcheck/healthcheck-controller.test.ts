import sinon from 'sinon';
import { HttpRequest } from 'src/adapters/express-router-adapter';
import HealthcheckController from './healthcheck-controller';
import { database } from '../../config';

const healthcheckController = new HealthcheckController();

describe('Healthcheck controller', () => {
  it('Should receive a request and return 200 ok', async () => {
    const httpRequest: HttpRequest = {
      body: {},
    };

    sinon.stub(database, 'checkConnection')
      .returns(Promise.resolve());

    const result = await healthcheckController.isHealthcheck(httpRequest);

    const expectedResult = {
      status: 200,
      body: { message: 'Ok' },
    };
    expect(result).toEqual(expectedResult);
  });
});
