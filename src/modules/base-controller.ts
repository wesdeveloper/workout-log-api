import { HttpRequest, HttpResponse } from '../adapters/express-router-adapter';

export interface ControllerAction {
  // eslint-disable-next-line no-unused-vars
  (httpRequest: HttpRequest): Promise<HttpResponse>
}

export default class BaseController {
  public handleInternalServerError(): HttpResponse {
    return {
      status: 500,
      body: {
        message: 'Internal server error',
      },
    };
  }
}
