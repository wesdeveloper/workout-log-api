import { database } from '../../config';
import { HttpRequest, HttpResponse } from '../../adapters/express-router-adapter';
import BaseController from '../base-controller';

export default class HealthcheckController extends BaseController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async isHealthcheck(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await database.checkConnection();

      return {
        status: 200,
        body: { message: 'Ok' },
      };
    } catch {
      return this.getInternalServerError();
    }
  }
}
